"""Scraper fuer ravensberger-matratzen.de (Boxspringbetten).

Anders als Otto ist dieser Shop (Shopware) frei abrufbar - auch Produktseiten,
kein Kasada. Dafuer gibt es KEIN JSON-LD; Daten stehen im HTML.

Wichtig: Ravensberger-Betten sind konfigurierbar (Haertegrad/Groesse als
Auswahl), daher lassen sich pro Produkt nur Name, Preis, Bild und Verfuegbarkeit
zuverlaessig auslesen. Specs wie Haertegrad/Groesse bleiben offen (None), weil
sie der Kunde waehlt - das ist ehrlicher als zu raten.
"""

from __future__ import annotations

import sys
import time

from bs4 import BeautifulSoup

import enrich
from db import Bed
from fetcher import fetch

BASE_URL = "https://www.ravensberger-matratzen.de"
SOURCES = [f"{BASE_URL}/boxspringbetten"]


def _parse_price(text: str) -> float | None:
    text = text.strip()
    try:
        return float(text)
    except ValueError:
        pass
    text = text.replace(".", "").replace(",", ".")
    try:
        return float(text)
    except ValueError:
        return None


def product_links(category_html: str) -> list[str]:
    soup = BeautifulSoup(category_html, "html.parser")
    links: list[str] = []
    seen: set[str] = set()
    for anchor in soup.select('a.product-name, a[class*="product-name"]'):
        href = anchor.get("href") or ""
        if not href:
            continue
        url = href if href.startswith("http") else BASE_URL + href
        url = url.split("?")[0]
        if "stoffmuster" in url.lower():  # Stoffmuster sind keine Betten
            continue
        if url in seen:
            continue
        seen.add(url)
        links.append(url)
    return links


def parse_product(html: str, url: str) -> Bed | None:
    soup = BeautifulSoup(html, "html.parser")

    heading = soup.find("h1")
    name = heading.get_text(" ", strip=True) if heading else None
    if not name:
        return None

    price_meta = soup.find("meta", attrs={"itemprop": "price"})
    price = _parse_price(price_meta["content"]) if price_meta and price_meta.get("content") else None
    if price is None:
        price_el = soup.select_one(".product-detail-price")
        if price_el:
            price = _parse_price(price_el.get_text(strip=True).replace("€", ""))
    if price is None:
        return None

    currency_meta = soup.find("meta", attrs={"itemprop": "priceCurrency"})
    currency = (currency_meta.get("content") if currency_meta else None) or "EUR"

    image_meta = soup.find("meta", attrs={"property": "og:image"})
    image = image_meta.get("content") if image_meta else None

    text = soup.get_text(" ", strip=True).lower()
    in_stock = "nicht verfügbar" not in text and "ausverkauft" not in text
    has_topper = "topper" in text and "ohne topper" not in text

    bed: Bed = {
        "title": name,
        "shop": "Ravensberger",
        "price": price,
        "currency": currency,
        "url": url,
        "imageUrl": image,
        "inStock": in_stock,
        # Specs aus dem (kurzen) Namen ableiten - meist leer, daher danach gezielt setzen.
        **enrich.from_title(name),
        "hasHeadboard": True,  # Boxspringbetten dieses Shops haben ein Kopfteil
        "hasTopper": has_topper,
    }
    return bed


def scrape(delay: float = 2.0) -> list[Bed]:
    beds: list[Bed] = []
    seen: set[str] = set()

    for index, source in enumerate(SOURCES):
        if index:
            time.sleep(delay)
        print(f"-> Ravensberger: lade Kategorie {source}")
        try:
            category_html = fetch(source)
        except RuntimeError as error:
            print(f"  ! {error}", file=sys.stderr)
            continue

        links = product_links(category_html)
        print(f"   {len(links)} Produktlinks gefunden")
        for link in links:
            if link in seen:
                continue
            seen.add(link)
            time.sleep(delay)  # hoeflich: jede Produktseite einzeln
            try:
                product_html = fetch(link)
            except RuntimeError as error:
                print(f"  ! {error}", file=sys.stderr)
                continue
            bed = parse_product(product_html, link)
            if bed is not None:
                beds.append(bed)

    print(f"-> Ravensberger: {len(beds)} Betten extrahiert.")
    return beds


if __name__ == "__main__":
    for item in scrape():
        print(f"  {item['price']:>8.2f} {item['currency']} | "
              f"{'Topper' if item.get('hasTopper') else '--':<6} | {item['title'][:60]}")
