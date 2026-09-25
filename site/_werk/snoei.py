#!/usr/bin/env python3
"""Haalt uit de inline SVG-sprite van een pagina de symbolen weg die die pagina niet aanroept.

Waarom: de sprite staat inline in het document van alle 34 pagina's en wordt dus per pagina
opnieuw over de lijn gestuurd (geen cache-winst zoals bij een los bestand). build_paginas.py zet
er een vaste lijst van veertien symbolen neer, ongeacht of de pagina ze gebruikt; de homepage
erft er eenentwintig uit de Heerlijk Thuis-bron. Gemeten 29-08-2026 over alle 34 pagina's:
23.002 gzipped bytes aan symbolen die nergens werden aangeroepen, met /cookiebeleid/ als
uitschieter (16.833 -> 13.676 gzipped, 18,8% van het hele document).

Wat "gebruikt" betekent: ergens in de pagina BUITEN de sprite staat #<id>, met een grens erachter
zodat #i-google niet meeleest op #i-google-g. Er wordt bewust over de HELE pagina gezocht en niet
alleen over de markup: /klantervaringen/ zet zijn sterrenrij met JavaScript neer en heeft
<use href="#i-star"> alleen in een scriptstring staan.
"""
import re

SPRITE = re.compile(r'<svg width="0" height="0"[^>]*>.*?</svg>', re.S)
SYMBOOL = re.compile(r'<symbol id="([^"]+)".*?</symbol>', re.S)


def sprite(html):
    m = SPRITE.search(html)
    if not m:
        return html
    blok = m.group(0)
    romp = html[:m.start()] + html[m.end():]
    open_tag = re.match(r'<svg[^>]*>', blok).group(0)
    houd = [s.group(0) for s in SYMBOOL.finditer(blok)
            if re.search(rf'#{re.escape(s.group(1))}(?![A-Za-z0-9_-])', romp)]
    nieuw = open_tag + "\n  " + "\n  ".join(houd) + "\n</svg>"
    return html[:m.start()] + nieuw + html[m.end():]
