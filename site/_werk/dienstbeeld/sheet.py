#!/usr/bin/env python3
"""Contactvel per dienst: sheets/<code>.jpg met de 7 kandidaten genummerd (bronvolgorde = SCENES-volgorde).
Draaien: python3 sheet.py [code ...]"""
import sys, pathlib
from PIL import Image, ImageDraw, ImageFont
HIER = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HIER))
import os; os.environ.setdefault("GEMINI_API_KEY", "x")
from gen_dienst import SCENES, DIENST
(HIER / "sheets").mkdir(exist_ok=True)
try:
    FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 34)
except Exception:
    FONT = ImageFont.load_default()
codes = sys.argv[1:] or list(DIENST)
CEL = 620
# een argument met een '-' erin is een losse id-lijst (komma's), anders een dienstcode
groepen = []
for c in codes:
    if "-" in c:
        groepen.append(("los", [i for i in c.split(",") if i in SCENES]))
    else:
        groepen.append((c, [n for n in SCENES if n.startswith(c)]))
for code, ids in groepen:
    rijen = (len(ids) + 3) // 4
    vel = Image.new("RGB", (4 * CEL, rijen * CEL), (40, 40, 40))
    d = ImageDraw.Draw(vel)
    for i, n in enumerate(ids):
        p = HIER / "raw" / f"{n}.png"
        x, y = (i % 4) * CEL, (i // 4) * CEL
        if p.exists():
            im = Image.open(p).convert("RGB"); im.thumbnail((CEL - 12, CEL - 12), Image.LANCZOS)
            vel.paste(im, (x + (CEL - im.width) // 2, y + (CEL - im.height) // 2))
        d.rectangle((x + 8, y + 8, x + 60, y + 52), fill=(0, 0, 0))
        d.text((x + 16, y + 10), str(i + 1), fill=(255, 213, 0), font=FONT)
        d.text((x + 70, y + 12), n, fill=(255, 255, 255), font=FONT)
    uit = HIER / "sheets" / f"{code}.jpg"
    vel.save(uit, quality=86); print(uit.name, len(ids))
