"""Gemeinsame Datenbank-Schicht fuer alle Scraper.

Die Tabelle `Bed` wird von Prisma verwaltet (siehe web/prisma/schema.prisma).
SQLite vergibt `id` (AUTOINCREMENT) und `scrapedAt` (DEFAULT CURRENT_TIMESTAMP)
selbst, daher muessen Scraper diese Felder nicht setzen.
"""

from __future__ import annotations

import sqlite3
import sys
from pathlib import Path
from typing import Any, TypedDict

# database.sqlite liegt im Repo-Root, eine Ebene ueber scraper/.
DB_PATH = Path(__file__).resolve().parent.parent / "database.sqlite"


class Bed(TypedDict, total=False):
    title: str
    shop: str
    price: float
    currency: str
    url: str
    imageUrl: str | None
    mattressType: str | None
    firmness: str | None
    hasHeadboard: bool
    hasTopper: bool
    topperType: str | None
    width: int | None
    length: int | None
    color: str | None
    inStock: bool


_UPSERT_SQL = """
    INSERT INTO Bed (
        title, shop, price, currency, url, imageUrl,
        mattressType, firmness, hasHeadboard, hasTopper, topperType,
        width, length, color, inStock, scrapedAt
    ) VALUES (
        :title, :shop, :price, :currency, :url, :imageUrl,
        :mattressType, :firmness, :hasHeadboard, :hasTopper, :topperType,
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
        hasTopper    = excluded.hasTopper,
        topperType   = excluded.topperType,
        width        = excluded.width,
        length       = excluded.length,
        color        = excluded.color,
        inStock      = excluded.inStock,
        scrapedAt    = CURRENT_TIMESTAMP
"""


def connect() -> sqlite3.Connection:
    if not DB_PATH.exists():
        print(
            f"Fehler: {DB_PATH} existiert nicht.\n"
            "Bitte zuerst das Prisma-Schema anwenden:\n\n"
            "    cd web && npx prisma db push\n",
            file=sys.stderr,
        )
        raise SystemExit(1)
    return sqlite3.connect(DB_PATH)


def ensure_table(conn: sqlite3.Connection) -> None:
    row = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Bed'"
    ).fetchone()
    if row is None:
        print(
            "Fehler: Tabelle 'Bed' existiert nicht.\n"
            "Bitte zuerst ausfuehren:  cd web && npx prisma db push\n",
            file=sys.stderr,
        )
        raise SystemExit(1)


def _row(bed: Bed) -> dict[str, Any]:
    return {
        "title": bed["title"],
        "shop": bed["shop"],
        "price": float(bed["price"]),
        "currency": bed.get("currency") or "EUR",
        "url": bed["url"],
        "imageUrl": bed.get("imageUrl"),
        "mattressType": bed.get("mattressType"),
        "firmness": bed.get("firmness"),
        "hasHeadboard": 1 if bed.get("hasHeadboard", True) else 0,
        "hasTopper": 1 if bed.get("hasTopper", bed.get("topperType") is not None) else 0,
        "topperType": bed.get("topperType"),
        "width": bed.get("width"),
        "length": bed.get("length"),
        "color": bed.get("color"),
        "inStock": 1 if bed.get("inStock", True) else 0,
    }


def upsert_beds(conn: sqlite3.Connection, beds: list[Bed]) -> tuple[int, int]:
    """Fuegt Betten ein bzw. aktualisiert sie anhand der eindeutigen URL.

    Liefert (neu_eingefuegt, gesamt_in_db) zurueck.
    """
    before = conn.execute("SELECT COUNT(*) FROM Bed").fetchone()[0]
    conn.executemany(_UPSERT_SQL, [_row(bed) for bed in beds])
    conn.commit()
    after = conn.execute("SELECT COUNT(*) FROM Bed").fetchone()[0]
    return after - before, after
