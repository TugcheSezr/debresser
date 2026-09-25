#!/usr/bin/env python3
"""Rendert de drie tekst-sterren tot EEN bestand per stuk, zodat ze als los artifact te verschuiven en te
schalen zijn (de CSS-versie schaalt zijn tekst niet mee met een breedte in px).
Schrijft _werk/sterren-render.html; daarna:
  node site/_werk/shoot_el.mjs http://127.0.0.1:4740/_werk/sterren-render.html 2 "#s-1910=..." ...
Draaien vanuit de repo-root."""
from pathlib import Path

STERREN = [
    ('s-1910', 'tmster', 480, '<span class="tmster__ster"><span>Zorgeloos</span><span>verhuizen</span>'
                              '<span class="tmster__m">sinds</span><span class="tmster__xl">1910</span></span>'
                              '<img class="tmster__bij" src="/assets/img/deco/bij.svg" alt="">'),
    ('s-sinds', 'ster ster--teal', 260, '<small>Sinds</small><b>1910</b>'),
    ('s-gratis', 'ster ster--geel', 260, '<b>Gratis</b><small>offerte</small>'),
]
# de bij steekt boven het sterrenvak uit; het ID staat daarom op een omhullend vak met marge,
# anders knipt de element-screenshot hem af (gemeten 28-08)
blokken = ''.join(
    f'<div id="{i}" class="vak" style="padding:{int(w * 0.26) if k == "tmster" else 0}px">'
    f'<span class="{k}" style="--w:{w}px;width:{w}px">{h}</span></div>'
    for i, k, w, h in STERREN)
Path('site/_werk/sterren-render.html').write_text(f'''<!doctype html><html lang="nl"><head><meta charset="utf-8">
<link rel="stylesheet" href="/assets/css/style.css?v=sterren">
<style>body{{background:transparent;margin:0;padding:0}}
/* geen flexbox: als de vakken samen breder zijn dan het venster krimpen ze, en dan staat de tekst
   op maat van --w in een kleiner geworden ster (gemeten 28-08: vak 480 -> 246) */
.vak{{display:block;width:max-content;margin:0 0 40px}}
.tmster{{display:block}} .ster{{width:var(--w)!important;font-size:calc(var(--w) * .052)}}
.ster b{{font-size:calc(var(--w) * .13)}}</style></head><body>{blokken}</body></html>''')
print('sterren-render.html geschreven')
