#!/usr/bin/env python3
"""Render een beeld met genummerde markeringen op de retouche-vakken, in ORIGINELE coordinaten.
Eerst kijken, dan pas snijden (les: coordinaten nooit op het oog).
    python3 markeer.py <id> x0,y0,x1,y1 [x0,y0,x1,y1 ...]
"""
import sys, pathlib
from PIL import Image, ImageDraw, ImageFont
HIER = pathlib.Path(__file__).resolve().parent
pid = sys.argv[1]
p = HIER / "klaar" / f"{pid}.png"
if not p.exists():
    p = HIER / "raw" / f"{pid}.png"
im = Image.open(p).convert("RGB")
d = ImageDraw.Draw(im)
try:
    F = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 40)
except Exception:
    F = ImageFont.load_default()
for n, arg in enumerate(sys.argv[2:], 1):
    x0, y0, x1, y1 = map(int, arg.split(","))
    d.rectangle((x0, y0, x1, y1), outline=(255, 0, 0), width=5)
    d.text((x0 + 6, max(0, y0 - 46)), str(n), fill=(255, 0, 0), font=F)
uit = HIER / "qa/crops" / f"mark-{pid}.png"
im.thumbnail((1400, 1400), Image.LANCZOS)
im.save(uit)
print(uit, im.size)
