#!/usr/bin/env python3
"""raw/<id>.png -> web/<id>-900.webp (900 px op de korte zijde... nee: 900 px breed voor staand, 1350 voor liggend),
zodat de galerij snel laadt. Draaien: python3 web.py [id-prefix ...]"""
import sys, pathlib
from PIL import Image
HIER = pathlib.Path(__file__).resolve().parent
(HIER / "web").mkdir(exist_ok=True)
wens = sys.argv[1:]
for p in sorted((HIER / "raw").glob("*.png")):
    if wens and not any(p.stem.startswith(w) for w in wens):
        continue
    if (HIER / "klaar" / p.name).exists():      # geretoucheerde versie wint
        p = HIER / "klaar" / p.name
    uit = HIER / "web" / f"{p.stem}-900.webp"
    if uit.exists() and uit.stat().st_mtime > p.stat().st_mtime:
        continue
    im = Image.open(p).convert("RGB")
    W, H = im.size
    w = 900 if H > W else 1350
    im.resize((w, round(H * w / W)), Image.LANCZOS).save(uit, quality=82, method=6)
    print(uit.name, im.size, "->", (w, round(H * w / W)))
