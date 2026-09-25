"""Bouwt ../index.html met pagina.py van de image-versions-skill, met twee aanpassingen:
de grote weergave staat op donkerblauw (#020D41, de band van sectie 2) en dezelfde uitsnede staat
eronder nog eens op licht (#F4F6F9).
Gebruik: python bouw_pagina.py"""
import datetime
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path.home() / ".claude/skills/image-versions/scripts"))
import pagina  # noqa: E402

map_ = pathlib.Path(__file__).resolve().parent.parent
ronde = json.loads((map_ / "ronde.json").read_text(encoding="utf-8"))
rijen = pagina.verzamel(map_, ronde, {})
for r in rijen:
    if r["bestand"]:
        r["crop"] = {"bestand": r["bestand"], "stempel": r["stempel"], "label": "Dezelfde uitsnede op licht #F4F6F9"}
html = pagina.bouw_html(ronde, map_, rijen, datetime.datetime.now().strftime("%d-%m-%Y %H:%M"))
extra = """
.vak { background:#020D41; }
.vak img { padding:16px; }
.croprij a { background:#F4F6F9; }
.croprij img { padding:12px; }
"""
html = html.replace("</style>", extra + "</style>", 1)
doel = map_ / "index.html"
doel.write_text(html, encoding="utf-8")
print(doel.as_posix())
