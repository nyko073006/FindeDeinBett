"""Mock-Datenquelle (Fallback / Demo).

Realistische Test-Boxspringbetten, falls kein echter Scraper laufen soll
(z.B. offline). Nutzbar via:  python scraper/main.py --source mock
"""

from __future__ import annotations

from db import Bed


def _img(seed: str) -> str:
    return f"https://picsum.photos/seed/{seed}/600/450"


BEDS: list[Bed] = [
    {"title": "Boxspringbett Hamburg 180x200 ohne Kopfteil", "shop": "Otto", "price": 699.0,
     "currency": "EUR", "url": "https://www.otto.de/p/boxspringbett-hamburg-180x200",
     "imageUrl": _img("hamburg"), "mattressType": "Tonnentaschenfederkern", "firmness": "H3",
     "hasHeadboard": False, "topperType": "Kaltschaum", "width": 180, "length": 200,
     "color": "Anthrazit", "inStock": True},
    {"title": "Ravensberger Boxspring Komfort 160x200 H3", "shop": "Ravensberger", "price": 1199.0,
     "currency": "EUR", "url": "https://www.ravensberger-matratzen.de/p/boxspring-komfort-160x200",
     "imageUrl": _img("ravensberger-komfort"), "mattressType": "7-Zonen-Taschenfederkern",
     "firmness": "H3", "hasHeadboard": True, "topperType": "Visco", "width": 160, "length": 200,
     "color": "Hellgrau", "inStock": True},
    {"title": "IKEA DUNVIK Boxspringbett 180x200", "shop": "IKEA", "price": 949.0,
     "currency": "EUR", "url": "https://www.ikea.com/de/de/p/dunvik-boxspringbett-180x200",
     "imageUrl": _img("dunvik"), "mattressType": "Tonnentaschenfederkern", "firmness": "H2",
     "hasHeadboard": True, "topperType": "Komfortschaum", "width": 180, "length": 200,
     "color": "Beige", "inStock": True},
    {"title": "Boxspringbett Oslo 140x200 ohne Kopfteil", "shop": "Home24", "price": 549.0,
     "currency": "EUR", "url": "https://www.home24.de/p/boxspringbett-oslo-140x200",
     "imageUrl": _img("oslo"), "mattressType": "Bonellfederkern", "firmness": "H2",
     "hasHeadboard": False, "topperType": None, "width": 140, "length": 200,
     "color": "Dunkelblau", "inStock": True},
    {"title": "XXXLutz Boxspringbett Premium 200x200 H4", "shop": "XXXLutz", "price": 1499.0,
     "currency": "EUR", "url": "https://www.xxxlutz.de/p/boxspringbett-premium-200x200",
     "imageUrl": _img("premium-200"), "mattressType": "7-Zonen-Taschenfederkern", "firmness": "H4",
     "hasHeadboard": True, "topperType": "Gel", "width": 200, "length": 200,
     "color": "Creme", "inStock": True},
    {"title": "Amazon Basics Boxspringbett 160x200 ohne Kopfteil", "shop": "Amazon", "price": 459.0,
     "currency": "EUR", "url": "https://www.amazon.de/dp/boxspring-160x200-basic",
     "imageUrl": _img("amazon-basic"), "mattressType": "Kaltschaum", "firmness": "H3",
     "hasHeadboard": False, "topperType": "Kaltschaum", "width": 160, "length": 200,
     "color": "Grau", "inStock": False},
    {"title": "Boxspringbett Stockholm 180x200 H3 mit Kopfteil", "shop": "Otto", "price": 829.0,
     "currency": "EUR", "url": "https://www.otto.de/p/boxspringbett-stockholm-180x200",
     "imageUrl": _img("stockholm"), "mattressType": "Tonnentaschenfederkern", "firmness": "H3",
     "hasHeadboard": True, "topperType": "Visco", "width": 180, "length": 200,
     "color": "Petrol", "inStock": True},
    {"title": "Ravensberger Hotelbett 140x200 ohne Kopfteil", "shop": "Ravensberger", "price": 639.0,
     "currency": "EUR", "url": "https://www.ravensberger-matratzen.de/p/hotelbett-140x200",
     "imageUrl": _img("hotelbett"), "mattressType": "Tonnentaschenfederkern", "firmness": "H2",
     "hasHeadboard": False, "topperType": "Komfortschaum", "width": 140, "length": 200,
     "color": "Sand", "inStock": True},
    {"title": "Boxspringbett Bergen 200x200 H4 ohne Kopfteil", "shop": "Home24", "price": 1099.0,
     "currency": "EUR", "url": "https://www.home24.de/p/boxspringbett-bergen-200x200",
     "imageUrl": _img("bergen"), "mattressType": "Bonellfederkern", "firmness": "H4",
     "hasHeadboard": False, "topperType": "Gel", "width": 200, "length": 200,
     "color": "Schwarz", "inStock": True},
    {"title": "IKEA TUFJORD Polsterbett 160x200", "shop": "IKEA", "price": 599.0,
     "currency": "EUR", "url": "https://www.ikea.com/de/de/p/tufjord-polsterbett-160x200",
     "imageUrl": _img("tufjord"), "mattressType": "Kaltschaum", "firmness": "H2",
     "hasHeadboard": True, "topperType": None, "width": 160, "length": 200,
     "color": "Dunkelgrün", "inStock": True},
    {"title": "Boxspringbett Madrid 180x200 H3 ohne Kopfteil", "shop": "XXXLutz", "price": 759.0,
     "currency": "EUR", "url": "https://www.xxxlutz.de/p/boxspringbett-madrid-180x200",
     "imageUrl": _img("madrid"), "mattressType": "7-Zonen-Taschenfederkern", "firmness": "H3",
     "hasHeadboard": False, "topperType": "Kaltschaum", "width": 180, "length": 200,
     "color": "Taupe", "inStock": True},
    {"title": "Premium Boxspringbett Luxus 200x200 H4 mit Kopfteil", "shop": "Otto", "price": 1349.0,
     "currency": "EUR", "url": "https://www.otto.de/p/boxspringbett-luxus-200x200",
     "imageUrl": _img("luxus"), "mattressType": "Tonnentaschenfederkern", "firmness": "H4",
     "hasHeadboard": True, "topperType": "Visco", "width": 200, "length": 200,
     "color": "Silber", "inStock": True},
]


def scrape() -> list[Bed]:
    return BEDS
