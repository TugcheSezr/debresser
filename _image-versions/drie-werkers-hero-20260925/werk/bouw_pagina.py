"""Bouwt ../index.html met pagina.py van de image-versions-skill; de uitsnede staat op donkerblauw (#020D41).
Mocks: scratchpad mock_trio.py (trio in de echte homehero via Playwright, niets in site/). Gebruik: python bouw_pagina.py"""
import datetime, json, pathlib, sys
sys.path.insert(0, str(pathlib.Path.home() / ".claude/skills/image-versions/scripts"))
import pagina  # noqa: E402
map_ = pathlib.Path(__file__).resolve().parent.parent
ronde = json.loads((map_ / "ronde.json").read_text(encoding="utf-8"))
html = pagina.bouw_html(ronde, map_, pagina.verzamel(map_, ronde, {}), datetime.datetime.now().strftime("%d-%m-%Y %H:%M"))
html = html.replace("</style>", "\n.vak { background:#020D41; }\n.vak img { padding:16px; }\n.croprij img { max-height:none; }\n</style>", 1)
(map_ / "index.html").write_text(html, encoding="utf-8")
print((map_ / "index.html").as_posix())
