"""FindYourBed – Mock-Scraper (MVP).

Schreibt realistische Test-Boxspringbetten in die zentrale SQLite-Datenbank
(`database.sqlite` im Repo-Root), die Prisma fuer das Next.js-Frontend nutzt.

Die Tabelle `Bed` wird von Prisma verwaltet. Vor dem ersten Lauf einmalig:

    cd web && npx prisma db push

Danach beliebig oft:

    python scraper/main.py

Spaeter ersetzen echte Shop-Scraper (Otto, IKEA, Ravensberger ...) die
`MOCK_BEDS`-Liste durch live gescrapte Daten.
"""

from __future__ import annotations

import sqlite3
import sys
from pathlib import Path
from typing import Any, TypedDict

# database.sqlite liegt im Repo-Root, eine Ebene ueber scraper/.
DB_PATH = Path(__file__).resolve().parent.parent / "database.sqlite"


class Bed(TypedDict):
    title: str
    shop: str
    price: float
    currency: str
    url: str
    imageUrl: str | None
    mattressType: str | None
    firmness: str | None
    hasHeadboard: bool
    topperType: str | None
    width: int | None
    length: int | None
    color: str | None
    inStock: bool


def img(seed: str) -> str:
    """Stabiles Platzhalterbild pro Bett (wird erst im Browser geladen)."""
    return f"https://picsum.photos/seed/{seed}/600/450"


MOCK_BEDS: list[Bed] = [
    {
        "title": "Boxspringbett Hamburg 180x200 ohne Kopfteil",
        "shop": "Otto",
        "price": 699.0,
        "currency": "EUR",
        "url": "https://www.otto.de/p/boxspringbett-hamburg-180x200",
        "imageUrl": img("hamburg"),
        "mattressType": "Tonnentaschenfederkern",
        "firmness": "H3",
        "hasHeadboard": False,
        "topperType": "Kaltschaum",
        "width": 180,
        "length": 200,
        "color": "Anthrazit",
        "inStock": True,
    },
    {
        "title": "Ravensberger Boxspring Komfort 160x200 H3",
        "shop": "Ravensberger",
        "price": 1199.0,
        "currency": "EUR",
        "url": "https://www.ravensberger-matratzen.de/p/boxspring-komfort-160x200",
        "imageUrl": img("ravensberger-komfort"),
        "mattressType": "7-Zonen-Taschenfederkern",
        "firmness": "H3",
        "hasHeadboard": True,
        "topperType": "Visco",
        "width": 160,
        "length": 200,
        "color": "Hellgrau",
        "inStock": True,
    },
    {
        "title": "IKEA DUNVIK Boxspringbett 180x200",
        "shop": "IKEA",
        "price": 949.0,
        "currency": "EUR",
        "url": "https://www.ikea.com/de/de/p/dunvik-boxspringbett-180x200",
        "imageUrl": img("dunvik"),
        "mattressType": "Tonnentaschenfederkern",
        "firmness": "H2",
        "hasHeadboard": True,
        "topperType": "Komfortschaum",
        "width": 180,
        "length": 200,
        "color": "Beige",
        "inStock": True,
    },
    {
        "title": "Boxspringbett Oslo 140x200 ohne Kopfteil",
        "shop": "Home24",
        "price": 549.0,
        "currency": "EUR",
        "url": "https://www.home24.de/p/boxspringbett-oslo-140x200",
        "imageUrl": img("oslo"),
        "mattressType": "Bonellfederkern",
        "firmness": "H2",
        "hasHeadboard": False,
        "topperType": None,
        "width": 140,
        "length": 200,
        "color": "Dunkelblau",
        "inStock": True,
    },
    {
        "title": "XXXLutz Boxspringbett Premium 200x200 H4",
        "shop": "XXXLutz",
        "price": 1499.0,
        "currency": "EUR",
        "url": "https://www.xxxlutz.de/p/boxspringbett-premium-200x200",
        "imageUrl": img("premium-200"),
        "mattressType": "7-Zonen-Taschenfederkern",
        "firmness": "H4",
        "hasHeadboard": True,
        "topperType": "Gel",
        "width": 200,
        "length": 200,
        "color": "Cremeweiß",
        "inStock": True,
    },
    {
        "title": "Amazon Basics Boxspringbett 160x200 ohne Kopfteil",
        "shop": "Amazon",
        "price": 459.0,
        "currency": "EUR",
        "url": "https://www.amazon.de/dp/boxspring-160x200-basic",
        "imageUrl": img("amazon-basic"),
        "mattressType": "Kaltschaum",
        "firmness": "H3",
        "hasHeadboard": False,
        "topperType": "Kaltschaum",
        "width": 160,
        "length": 200,
        "color": "Grau",
        "inStock": False,
    },
    {
        "title": "Boxspringbett Stockholm 180x200 H3 mit Kopfteil",
        "shop": "Otto",
        "price": 829.0,
        "currency": "EUR",
        "url": "https://www.otto.de/p/boxspringbett-stockholm-180x200",
        "imageUrl": img("stockholm"),
        "mattressType": "Tonnentaschenfederkern",
        "firmness": "H3",
        "hasHeadboard": True,
        "topperType": "Visco",
        "width": 180,
        "length": 200,
        "color": "Petrol",
        "inStock": True,
    },
    {
        "title": "Ravensberger Hotelbett 140x200 ohne Kopfteil",
        "shop": "Ravensberger",
        "price": 639.0,
        "currency": "EUR",
        "url": "https://www.ravensberger-matratzen.de/p/hotelbett-140x200",
        "imageUrl": img("hotelbett"),
        "mattressType": "Tonnentaschenfederkern",
        "firmness": "H2",
        "hasHeadboard": False,
        "topperType": "Komfortschaum",
        "width": 140,
        "length": 200,
        "color": "Sandbeige",
        "inStock": True,
    },
    {
        "title": "Boxspringbett Bergen 200x200 H4 ohne Kopfteil",
        "shop": "Home24",
        "price": 1099.0,
        "currency": "EUR",
        "url": "https://www.home24.de/p/boxspringbett-bergen-200x200",
        "imageUrl": img("bergen"),
        "mattressType": "Bonellfederkern",
        "firmness": "H4",
        "hasHeadboard": False,
        "topperType": "Gel",
        "width": 200,
        "length": 200,
        "color": "Schwarz",
        "inStock": True,
    },
    {
        "title": "IKEA TUFJORD Polsterbett 160x200",
        "shop": "IKEA",
        "price": 599.0,
        "currency": "EUR",
        "url": "https://www.ikea.com/de/de/p/tufjord-polsterbett-160x200",
        "imageUrl": img("tufjord"),
        "mattressType": "Kaltschaum",
        "firmness": "H2",
        "hasHeadboard": True,
        "topperType": None,
        "width": 160,
        "length": 200,
        "color": "Dunkelgrün",
        "inStock": True,
    },
    {
        "title": "Boxspringbett Madrid 180x200 H3 ohne Kopfteil",
        "shop": "XXXLutz",
        "price": 759.0,
        "currency": "EUR",
        "url": "https://www.xxxlutz.de/p/boxspringbett-madrid-180x200",
        "imageUrl": img("madrid"),
        "mattressType": "7-Zonen-Taschenfederkern",
        "firmness": "H3",
        "hasHeadboard": False,
        "topperType": "Kaltschaum",
        "width": 180,
        "length": 200,
        "color": "Taupe",
        "inStock": True,
    },
    {
        "title": "Premium Boxspringbett Luxus 200x200 H4 mit Kopfteil",
        "shop": "Otto",
        "price": 1349.0,
        "currency": "EUR",
        "url": "https://www.otto.de/p/boxspringbett-luxus-200x200",
        "imageUrl": img("luxus"),
        "mattressType": "Tonnentaschenfederkern",
        "firmness": "H4",
        "hasHeadboard": True,
        "topperType": "Visco",
        "width": 200,
        "length": 200,
        "color": "Silbergrau",
        "inStock": True,
    },
]


def ensure_table(conn: sqlite3.Connection) -> None:
    row = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Bed'"
    ).fetchone()
    if row is None:
        print(
            "Fehler: Tabelle 'Bed' existiert nicht.\n"
            "Bitte zuerst das Prisma-Schema anwenden:\n\n"
            "    cd web && npx prisma db push\n",
            file=sys.stderr,
        )
        raise SystemExit(1)


def upsert_beds(conn: sqlite3.Connection, beds: list[Bed]) -> tuple[int, int]:
    """Fuegt Betten ein bzw. aktualisiert sie anhand der eindeutigen URL."""
    before = conn.execute("SELECT COUNT(*) FROM Bed").fetchone()[0]

    sql = """
        INSERT INTO Bed (
            title, shop, price, currency, url, imageUrl,
            mattressType, firmness, hasHeadboard, topperType,
            width, length, color, inStock, scrapedAt
        ) VALUES (
            :title, :shop, :price, :currency, :url, :imageUrl,
            :mattressType, :firmness, :hasHeadboard, :topperType,
            :width, :length, :color, :inStock, CURRENT_TIMESTAMP
        )
        ON CONFLICT(url) DO UPDATE SET
            title        = excluded.title,
            shop         = excluded.shop,
            price        = excluded.price,
            currency     = excluded.currency,
            imageUrl     = excluded.imageUrl,
            mattressType = excluded.mattressType,
            firmness     = excluded.firmness,
            hasHeadboard = excluded.hasHeadboard,
            topperType   = excluded.topperType,
            width        = excluded.width,
            length       = excluded.length,
            color        = excluded.color,
            inStock      = excluded.inStock,
            scrapedAt    = CURRENT_TIMESTAMP
    """

    for bed in beds:
        params: dict[str, Any] = dict(bed)
        params["hasHeadboard"] = 1 if bed["hasHeadboard"] else 0
        params["inStock"] = 1 if bed["inStock"] else 0
        conn.execute(sql, params)

    conn.commit()
    after = conn.execute("SELECT COUNT(*) FROM Bed").fetchone()[0]
    return after - before, after


def main() -> None:
    if not DB_PATH.exists():
        print(
            f"Hinweis: {DB_PATH} existiert noch nicht – sie wird beim ersten "
            "`prisma db push` erzeugt.\n"
            "Bitte zuerst ausfuehren:  cd web && npx prisma db push\n",
            file=sys.stderr,
        )
        raise SystemExit(1)

    print(f"-> Verbinde mit Datenbank: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    try:
        ensure_table(conn)
        inserted, total = upsert_beds(conn, MOCK_BEDS)
    finally:
        conn.close()

    print(f"-> {len(MOCK_BEDS)} Betten verarbeitet ({inserted} neu).")
    print(f"-> Insgesamt {total} Betten in der Datenbank.")
    print("Fertig.")


if __name__ == "__main__":
    main()
