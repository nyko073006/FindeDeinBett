"""Ingester fuer Affiliate-Produktfeeds (CSV/XML, z.B. AWIN, belboon, Google).

Warum Feeds? Sie liefern sauber strukturierte Felder (Preis, Bild, Deeplink,
Verfuegbarkeit) und ueber den Deeplink die Provisions-Verguetung - der legitime,
wartungsarme Weg fuer einen Preisvergleich. Specs, die der Feed nicht als eigene
Spalte mitliefert, ergaenzen wir wie bei den Scrapern aus Titel/Beschreibung.

Der eigentliche Anmelde-Schritt ist manuell und kann nur der Betreiber machen:
  1. Beim Affiliate-Netzwerk anmelden (Otto laeuft in DE z.B. ueber AWIN).
  2. Fuer das jeweilige Shop-Programm bewerben/freischalten lassen.
  3. Im Netzwerk einen Produktfeed bauen ("Create-a-Feed") und die Download-URL
     kopieren (enthaelt meist einen API-Key) ODER den Feed lokal speichern.
  4. Die URL/den Pfad als Umgebungsvariable setzen (siehe FEEDS unten), z.B.:
         export OTTO_FEED_URL="https://productdata.awin.com/datafeed/download/...csv.gz"
     und dann:  python scraper/main.py --source feed

Die Feed-URL gehoert NICHT in den Code (API-Key!) -> sie kommt aus der Env-Var.
Ein lokaler Dateipfad ist als Quelle ebenfalls erlaubt (zum Testen).
"""

from __future__ import annotations

import csv
import gzip
import io
import os
import re
import sys
import xml.etree.ElementTree as ET

import enrich
from db import Bed
from fetcher import fetch_bytes

# Pro Feed: Name (= shop), Env-Var mit URL/Pfad, Format und Feld-Mapping.
# "field_map" bildet UNSER Feld -> Spalten-/Tag-Name im Feed ab. Spaltennamen je
# nach Netzwerk anpassen. Typische Namen:
#   AWIN-CSV:   product_name, search_price, currency, aw_deep_link,
#               merchant_image_url, in_stock, description, colour
#   Google-XML: title, price, link, image_link, availability, description, color
FEEDS: list[dict] = [
    {
        "name": "Otto",
        "url_env": "OTTO_FEED_URL",
        "format": "auto",  # auto | csv | xml
        "delimiter": ",",
        "field_map": {
            "title": "product_name",
            "price": "search_price",
            "currency": "currency",
            "url": "aw_deep_link",
            "imageUrl": "merchant_image_url",
            "availability": "in_stock",
            "description": "description",
            "color": "colour",
        },
    },
]

_OUT_OF_STOCK = {
    "0", "no", "false", "out of stock", "outofstock", "oos",
    "nicht verfügbar", "nicht lieferbar", "nicht auf lager", "ausverkauft",
}


def _parse_price(raw: str) -> float | None:
    cleaned = re.sub(r"[^\d.,]", "", raw or "")
    if not cleaned:
        return None
    if "." in cleaned and "," in cleaned:
        # Das hintere Trennzeichen ist der Dezimaltrenner.
        if cleaned.rfind(",") > cleaned.rfind("."):
            cleaned = cleaned.replace(".", "").replace(",", ".")  # 1.129,00 (de)
        else:
            cleaned = cleaned.replace(",", "")  # 1,129.00 (en)
    elif "," in cleaned:
        # Nur Komma: "849,90" = Dezimal, "1,129" = Tausender.
        cleaned = cleaned.replace(",", ".") if re.search(r",\d{2}$", cleaned) else cleaned.replace(",", "")
    try:
        return float(cleaned)
    except ValueError:
        return None


def _read_source(source: str) -> bytes:
    """Laedt den Feed (URL oder lokaler Pfad) und entpackt gzip transparent.

    Liefert bewusst Bytes: XML-Feeds haben oft eine encoding-Deklaration, die
    ElementTree nur aus Bytes (nicht aus str) korrekt verarbeitet.
    """
    if source.startswith(("http://", "https://")):
        data = fetch_bytes(source)
    else:
        with open(source, "rb") as handle:
            data = handle.read()
    if data[:2] == b"\x1f\x8b":  # gzip-Magic
        data = gzip.decompress(data)
    return data


def _parse_rows(data: bytes, fmt: str, delimiter: str) -> list[dict]:
    if fmt == "auto":
        fmt = "xml" if data.lstrip()[:1] == b"<" else "csv"
    if fmt == "xml":
        return _parse_xml(data)
    text = data.decode("utf-8", errors="replace")
    return list(csv.DictReader(io.StringIO(text), delimiter=delimiter))


def _parse_xml(data: bytes) -> list[dict]:
    root = ET.fromstring(data)
    rows: list[dict] = []
    for element in root.iter():
        local = element.tag.split("}")[-1].lower()  # Namespace (g:) abstreifen
        if local not in ("item", "product", "entry"):
            continue
        row: dict[str, str] = {}
        for child in element:
            key = child.tag.split("}")[-1].lower()
            if child.text and child.text.strip():
                row[key] = child.text.strip()
        if row:
            rows.append(row)
    return rows


def _row_to_bed(row: dict, field_map: dict, shop: str) -> Bed | None:
    def value(field: str) -> str:
        column = field_map.get(field)
        return (row.get(column) or "").strip() if column else ""

    title = value("title")
    price = _parse_price(value("price"))
    url = value("url")
    if not title or price is None or not url:
        return None

    availability = value("availability").lower()
    description = value("description")

    bed: Bed = {
        "title": title,
        "shop": shop,
        "price": price,
        "currency": value("currency") or "EUR",
        "url": url,
        "imageUrl": value("imageUrl") or None,
        "inStock": availability not in _OUT_OF_STOCK,
        # Specs aus Titel + Beschreibung ableiten (Feed liefert sie selten als Spalte).
        **enrich.from_title(f"{title} {description}".strip()),
    }
    # Strukturierte Feed-Spalte schlaegt die Heuristik, wenn vorhanden.
    color = value("color")
    if color:
        bed["color"] = color.capitalize()
    return bed


def scrape() -> list[Bed]:
    beds: list[Bed] = []
    configured = False

    for feed in FEEDS:
        source = os.environ.get(feed["url_env"])
        if not source:
            print(f"-> Feed {feed['name']}: ${feed['url_env']} nicht gesetzt – übersprungen")
            continue
        configured = True
        print(f"-> Feed {feed['name']}: lade {source.split('?')[0]}")
        try:
            data = _read_source(source)
            rows = _parse_rows(data, feed.get("format", "auto"), feed.get("delimiter", ","))
        except (OSError, RuntimeError, ET.ParseError) as error:
            print(f"  ! {error}", file=sys.stderr)
            continue

        before = len(beds)
        for row in rows:
            bed = _row_to_bed(row, feed["field_map"], feed["name"])
            if bed is not None:
                beds.append(bed)
        print(f"   {len(beds) - before} Betten aus {len(rows)} Feed-Zeilen")

    if not configured:
        print(
            "  Hinweis: Kein Feed konfiguriert. Feed-URL als Env-Var setzen "
            "(siehe FEEDS in scraper/feed.py).",
            file=sys.stderr,
        )
    print(f"-> Feed: {len(beds)} Betten extrahiert.")
    return beds


if __name__ == "__main__":
    for item in scrape():
        print(f"  {item['price']:>8.2f} {item['currency']} | {item['shop']:<12} | {item['title'][:55]}")
