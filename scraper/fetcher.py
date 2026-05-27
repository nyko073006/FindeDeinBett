"""Gemeinsamer HTTP-Helfer fuer alle Scraper: hoeflicher GET mit Retry/Backoff.

Bewusst NICHT 'http.py' genannt - das wuerde das gleichnamige Standardbibliotheks-
Paket ueberschatten und requests/urllib3 kaputt machen.
"""

from __future__ import annotations

import sys
import time

import requests

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "de-DE,de;q=0.9",
}


def _request(url: str, headers: dict | None, retries: int, timeout: int) -> requests.Response:
    merged = {**DEFAULT_HEADERS, **(headers or {})}
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            response = requests.get(url, headers=merged, timeout=timeout)
            response.raise_for_status()
            return response
        except requests.RequestException as error:
            last_error = error
            wait = 2 ** attempt
            print(f"  ! Request fehlgeschlagen ({error}); neuer Versuch in {wait}s", file=sys.stderr)
            time.sleep(wait)
    raise RuntimeError(f"Konnte {url} nach {retries} Versuchen nicht laden: {last_error}")


def fetch(url: str, headers: dict | None = None, retries: int = 3, timeout: int = 25) -> str:
    return _request(url, headers, retries, timeout).text


def fetch_bytes(url: str, headers: dict | None = None, retries: int = 3, timeout: int = 30) -> bytes:
    return _request(url, headers, retries, timeout).content
