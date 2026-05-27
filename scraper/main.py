"""FindYourBed – Scraper-Orchestrator.

Sammelt Boxspringbetten aus einer Quelle und schreibt sie in die zentrale
SQLite-Datenbank (`database.sqlite` im Repo-Root), die Prisma fuer das
Next.js-Frontend nutzt.

Voraussetzung (einmalig): das Prisma-Schema anwenden ->

    cd web && npx prisma db push

Danach:

    python scraper/main.py                       # Otto (Standard)
    python scraper/main.py --source ravensberger # nur Ravensberger
    python scraper/main.py --source all          # alle echten Shops (Otto + Ravensberger)
    python scraper/main.py --source mock         # Demo-/Fallback-Daten

Neue Shops als eigenes Modul mit `scrape() -> list[Bed]` ergaenzen und unten in
SCRAPERS (und ggf. REAL_SHOPS) eintragen.
"""

from __future__ import annotations

import argparse

import db
import mock
import otto
import ravensberger

SCRAPERS = {
    "otto": otto.scrape,
    "ravensberger": ravensberger.scrape,
    "mock": mock.scrape,
}

# "all" = echte Shops (ohne Mock-Demodaten).
REAL_SHOPS = ["otto", "ravensberger"]


def collect(source: str) -> list[db.Bed]:
    names = REAL_SHOPS if source == "all" else [source]
    beds: list[db.Bed] = []
    for name in names:
        beds.extend(SCRAPERS[name]())
    # quellenuebergreifend nach URL deduplizieren (letzter Treffer gewinnt)
    unique: dict[str, db.Bed] = {bed["url"]: bed for bed in beds}
    return list(unique.values())


def main() -> None:
    parser = argparse.ArgumentParser(description="FindYourBed Scraper")
    parser.add_argument(
        "--source",
        choices=[*SCRAPERS, "all"],
        default="otto",
        help="Datenquelle (Standard: otto)",
    )
    args = parser.parse_args()

    conn = db.connect()
    try:
        db.ensure_table(conn)
        beds = collect(args.source)
        if not beds:
            print(
                "Keine Betten gefunden – evtl. blockiert oder Seitenstruktur geaendert.\n"
                "Fallback:  python scraper/main.py --source mock",
            )
            raise SystemExit(2)
        inserted, total = db.upsert_beds(conn, beds)
    finally:
        conn.close()

    print(f"-> {len(beds)} Betten verarbeitet ({inserted} neu).")
    print(f"-> Insgesamt {total} Betten in der Datenbank.")
    print("Fertig.")


if __name__ == "__main__":
    main()
