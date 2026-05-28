"""Scraper fuer betten.de (Boxspringbetten).

Frei abrufbar, kein Kasada, kein Lazy-Load: die Kategorie /boxspringbetten
rendert serverseitig ~70 Produkte als Karten (.product-container) mit Titel
(img alt), aktuellem Preis (.price-final mit "ab X,XX €"), Bild, Link und
Verfuegbarkeitstext. Eine Fetch genuegt, keine Pagination.
"""

from __future__ import annotations

import re
import sys
import time

from bs4 import BeautifulSoup

import enrich
from db import Bed
from fetcher import fetch

BASE_URL = "https://www.betten.de"
SOURCES = [f"{BASE_URL}/boxspringbetten"]

_PRICE_RE = re.compile(r"(\d{1,3}(?:\.\d{3})*,\d{2})")
# Filter gegen Zubehoer/Komponenten in der Kategorieliste (z.B. Einlege-Boxen).
_BED_RE = re.compile(r"\bbox(?:spring|bett)", re.IGNORECASE)


def _parse_price(text: str) -> float | None:
    match = _PRICE_RE.search(text or "")
    if not match:
        return None
    return float(match.group(1).replace(".", "").replace(",", "."))


def _parse_card(card) -> Bed | None:
    anchor = card.find("a", href=True)
    href = anchor["href"] if anchor else ""
    if not href.endswith(".html"):
        return None
    url = BASE_URL + href.split("?")[0].split("#")[0]

    image_el = card.find("img")
    title = ((image_el.get("alt") if image_el else "") or "").strip()
    if not title:
        title = re.sub(r"\s+", " ", card.get_text(" ", strip=True))[:120].strip()
    if not title or not _BED_RE.search(title):
        return None

    price_el = card.select_one(".price-final")
    price = _parse_price(price_el.get_text(" ", strip=True)) if price_el else None
    if price is None:
        return None

    image = image_el.get("src") if image_el else None
    text = card.get_text(" ", strip=True).lower()
    in_stock = "nicht verfügbar" not in text and "ausverkauft" not in text

    bed: Bed = {
        "title": title,
        "shop": "Betten.de",
        "price": price,
        "currency": "EUR",
        "url": url,
        "imageUrl": image,
        "inStock": in_stock,
        **enrich.from_title(title),
    }
    return bed


def scrape(delay: float = 1.5) -> list[Bed]:
    beds: list[Bed] = []
    seen: set[str] = set()

    for index, source in enumerate(SOURCES):
        if index:
            time.sleep(delay)
        print(f"-> Betten.de: lade {source}")
        try:
            html = fetch(source)
        except RuntimeError as error:
            print(f"  ! {error}", file=sys.stderr)
            continue
        soup = BeautifulSoup(html, "html.parser")
        cards = soup.select(".product-container")
        added = 0
        for card in cards:
            bed = _parse_card(card)
            if bed is None or bed["url"] in seen:
                continue
            seen.add(bed["url"])
            beds.append(bed)
            added += 1
        print(f"   {added} eindeutige Produkte aus {len(cards)} Karten")

    print(f"-> Betten.de: {len(beds)} Betten extrahiert.")
    return beds


if __name__ == "__main__":
    for item in scrape():
        firm = item.get("firmness") or "--"
        topper = "Topper" if item.get("hasTopper") else "--"
        print(f"  {item['price']:>8.2f} {item['currency']} | {firm:<3} | {topper:<6} | {item['title'][:60]}")
