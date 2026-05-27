"""Leitet Boxspring-Attribute aus einem Produkttitel ab.

Shops liefern diese Details selten strukturiert, aber die Titel sind reich
(z.B. "... 7-Zonen-TTFK-Matratze, KS-Topper, 160x200 cm ... H3"). Diese
Heuristiken extrahieren die Felder, nach denen das Frontend filtert.
"""

from __future__ import annotations

import re

_FIRMNESS_RE = re.compile(r"(?<![A-Za-z0-9])H([1-5])\b")
_SIZE_RE = re.compile(r"(\d{2,3})\s*[x×X]\s*(\d{2,3})")

_COLORS = [
    "anthrazit", "hellgrau", "dunkelgrau", "graphit", "grau",
    "creme", "beige", "sand", "taupe",
    "schwarz", "weiß", "weiss", "silber",
    "dunkelblau", "blau", "petrol", "türkis",
    "dunkelgrün", "grün", "gruen", "oliv",
    "braun", "cognac", "rosa", "rot",
]


def firmness(title: str) -> str | None:
    match = _FIRMNESS_RE.search(title)
    return f"H{match.group(1)}" if match else None


def mattress_type(title: str) -> str | None:
    text = title.lower()
    seven_zones = "7-zonen" in text or "7 zonen" in text
    if "tonnentaschenfederkern" in text or "ttfk" in text:
        return "7-Zonen-Taschenfederkern" if seven_zones else "Tonnentaschenfederkern"
    if "taschenfederkern" in text:
        return "7-Zonen-Taschenfederkern" if seven_zones else "Tonnentaschenfederkern"
    if re.search(r"bonn?ell", text):
        return "Bonellfederkern"
    if "kaltschaum" in text:
        return "Kaltschaum"
    return None


def has_headboard(title: str) -> bool:
    return "ohne kopfteil" not in title.lower()


def has_topper(title: str) -> bool:
    return "topper" in title.lower()


def topper_type(title: str) -> str | None:
    text = title.lower()
    if "visco" in text:
        return "Visco"
    if "komfortschaum" in text:
        return "Komfortschaum"
    if "gelschaum" in text or "gel-topper" in text or "geltopper" in text:
        return "Gel"
    if "ks-topper" in text or "ks topper" in text:
        return "Kaltschaum"
    if "kaltschaum" in text and "topper" in text:
        return "Kaltschaum"
    return None


def size(title: str) -> tuple[int | None, int | None]:
    match = _SIZE_RE.search(title)
    if not match:
        return (None, None)
    width, length = int(match.group(1)), int(match.group(2))
    if 60 <= width <= 220 and 180 <= length <= 220:
        return (width, length)
    return (None, None)


def color(title: str) -> str | None:
    text = title.lower()
    for name in _COLORS:
        if name in text:
            return name.capitalize()
    return None


def from_title(title: str) -> dict:
    """Alle abgeleiteten Attribute als dict (passend zum Bed-TypedDict)."""
    width, length = size(title)
    return {
        "mattressType": mattress_type(title),
        "firmness": firmness(title),
        "hasHeadboard": has_headboard(title),
        "hasTopper": has_topper(title),
        "topperType": topper_type(title),
        "width": width,
        "length": length,
        "color": color(title),
    }
