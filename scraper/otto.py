"""Echter Scraper fuer otto.de (Boxspringbetten).

Strategie: Otto rendert pro Listing-Seite ~18 Produkte als schema.org-
JSON-LD (<script type="application/ld+json">) serverseitig ins HTML. Das ist
deutlich robuster zu parsen als CSS-Klassen. Boxspring-Details (Haertegrad,
Matratzentyp, Topper, Groesse) stehen nicht strukturiert drin und werden aus
dem Titel abgeleitet (siehe enrich.py).

robots.txt-Stand: Listing-/Kategorieseiten sind fuer den generischen
User-Agent erlaubt (nur /gate/, /onex/, /cdn-cgi/ sind disallowed).
Der Scraper ist bewusst hoeflich: wenige Requests, Pause dazwischen.
"""

from __future__ import annotations

import json
import sys
import time

from bs4 import BeautifulSoup

import enrich
from db import Bed
from fetcher import fetch

BASE_URL = "https://www.otto.de"

# Otto rendert nur ~18 Produkte pro Listing-URL serverseitig (der Rest wird per
# JS nachgeladen). Mehr Abdeckung holen wir daher ueber mehrere Listing-/Such-
# URLs und deduplizieren anschliessend nach Produkt-URL.
SOURCES = [
    "https://www.otto.de/moebel/betten/boxspringbetten/",
    "https://www.otto.de/suche/boxspringbett/",
    "https://www.otto.de/suche/boxspringbett%20180x200/",
    "https://www.otto.de/suche/boxspringbett%20ohne%20kopfteil/",
    "https://www.otto.de/suche/boxspringbett%20h3/",
]

def extract_jsonld_products(html: str) -> list[dict]:
    """Alle JSON-LD-Bloecke vom @type 'Product' aus dem HTML lesen."""
    soup = BeautifulSoup(html, "html.parser")
    products: list[dict] = []
    for tag in soup.find_all("script", attrs={"type": "application/ld+json"}):
        raw = tag.string or tag.get_text()
        if not raw:
            continue
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            continue
        for entry in data if isinstance(data, list) else [data]:
            if isinstance(entry, dict) and entry.get("@type") == "Product":
                products.append(entry)
    return products


def _first_offer(product: dict) -> dict | None:
    offers = product.get("offers")
    if isinstance(offers, list):
        return offers[0] if offers else None
    if isinstance(offers, dict):
        return offers
    return None


def _to_bed(product: dict) -> Bed | None:
    name = product.get("name")
    offer = _first_offer(product)
    if not name or offer is None:
        return None

    price_raw = offer.get("price") or offer.get("lowPrice")
    try:
        price = float(price_raw)
    except (TypeError, ValueError):
        return None

    url = offer.get("url") or product.get("url") or ""
    if url.startswith("/"):
        url = BASE_URL + url
    url = url.split("?")[0]  # variationId entfernen -> Dedup je Produkt
    if not url.startswith("http"):
        return None

    image = product.get("image")
    if isinstance(image, list):
        image = image[0] if image else None

    availability = str(offer.get("availability", "")).lower()
    in_stock = "outofstock" not in availability and "soldout" not in availability

    bed: Bed = {
        "title": name.strip()[:500],
        "shop": "Otto",
        "price": price,
        "currency": offer.get("priceCurrency") or "EUR",
        "url": url,
        "imageUrl": image,
        "inStock": in_stock,
        **enrich.from_title(name),
    }
    return bed


def scrape(urls: list[str] | None = None, delay: float = 1.5) -> list[Bed]:
    """Scrapt die Listing-Quellen und liefert deduplizierte Betten (per URL)."""
    sources = urls or SOURCES
    seen: set[str] = set()
    beds: list[Bed] = []

    for index, url in enumerate(sources):
        if index:
            time.sleep(delay)  # hoeflich bleiben
        print(f"-> Otto: lade {url}")
        try:
            html = fetch(url)
        except RuntimeError as error:
            print(f"  ! {error}", file=sys.stderr)
            continue

        products = extract_jsonld_products(html)
        print(f"   {len(products)} Produkte im JSON-LD gefunden")
        for product in products:
            bed = _to_bed(product)
            if bed is None or bed["url"] in seen:
                continue
            seen.add(bed["url"])
            beds.append(bed)

    print(f"-> Otto: {len(beds)} eindeutige Betten extrahiert.")
    return beds


if __name__ == "__main__":
    for item in scrape():
        print(f"  {item['price']:>7.2f} {item['currency']} | "
              f"{item.get('firmness') or '--'} | "
              f"{'ohne KT' if not item.get('hasHeadboard') else 'mit KT '} | "
              f"{item['title'][:70]}")
