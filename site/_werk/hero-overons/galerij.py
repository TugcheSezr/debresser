#!/usr/bin/env python3
"""Keuzegalerij: per kandidaat een genummerde kaart met de 1600-webp, de scene, de koppen en een link naar de
hero-preview. Plus contactvel.jpg (2 kolommen). Draai na gen_overons.py: python3 galerij.py"""
import json, pathlib, importlib.util
from PIL import Image, ImageDraw, ImageFont
HIER = pathlib.Path(__file__).resolve().parent; UIT = HIER / "out"
spec = importlib.util.spec_from_file_location("g", HIER / "gen_overons.py")
import os; os.environ.setdefault("GEMINI_API_KEY", "x"); g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)
kaarten = []
for n, sc in enumerate(g.SCENES, 1):
    png = UIT / f"{sc['id']}.png"
    if not png.exists():
        kaarten.append(dict(nr=n, id=sc["id"], ok=False)); continue
    im = Image.open(png).convert("RGB")
    for w in (1920, 1600, 800):
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(UIT / f"{sc['id']}-{w}.webp", "WEBP", quality=86, method=6)
    kaarten.append(dict(nr=n, id=sc["id"], ok=True, maat=im.size, koppen=sc["koppen"], scene=sc["scene"][:220]))
# contactvel
oks = [k for k in kaarten if k["ok"]]
if oks:
    W = 900; kolom = 2; tegels = []
    for k in oks:
        im = Image.open(UIT / f"{k['id']}-800.webp").convert("RGB"); im = im.resize((W, round(im.height * W / im.width)))
        d = ImageDraw.Draw(im); d.rectangle([0, 0, 120, 60], fill=(34, 49, 78)); d.text((16, 12), f"{k['nr']:02d}", fill=(255, 213, 0), font=ImageFont.load_default(size=36))
        tegels.append(im)
    th = tegels[0].height; rijen = (len(tegels) + kolom - 1) // kolom
    vel = Image.new("RGB", (W * kolom + 10 * (kolom - 1), th * rijen + 10 * (rijen - 1)), (246, 244, 236))
    for i, t in enumerate(tegels):
        vel.paste(t, ((i % kolom) * (W + 10), (i // kolom) * (th + 10)))
    vel.save(HIER / "contactvel.jpg", quality=82); print("contactvel", vel.size)
html = ['<!DOCTYPE html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hero-kandidaten Over ons</title>',
        '<style>body{font:15px/1.5 -apple-system,Helvetica,Arial;background:#F6F4EC;color:#1D1D1B;margin:0;padding:24px}h1{font-size:22px;margin:0 0 6px}p.uitleg{color:#4B4B49;margin:0 0 18px}',
        '.rooster{display:grid;grid-template-columns:repeat(auto-fill,minmax(560px,1fr));gap:18px}.k{background:#fff;border:1px solid #C4E4E4;border-radius:14px;overflow:hidden}.k img{display:block;width:100%;height:auto}',
        '.k .t{padding:12px 14px}.k b{font-size:17px}.k small{color:#4B4B49;display:block;margin-top:4px}.k a{display:inline-block;margin-top:8px;font-weight:700;color:#006C68}.nr{display:inline-block;background:#22314E;color:#FFD500;font-weight:800;padding:2px 10px;border-radius:8px;margin-right:8px}.mis{padding:20px;color:#a00}</style></head><body>',
        '<h1>Hero-kandidaten Over ons: voorbereiding, lachende verhuizers, zon</h1><p class="uitleg">Kies een nummer. "In de hero" toont de plaat in de echte dienst-hero met titel en veil (desktop-crop 21:9, mobiel snijdt de CSS zelf een staand vak).</p><div class="rooster">']
for k in kaarten:
    if not k["ok"]:
        html.append(f'<div class="k"><div class="mis"><span class="nr">{k["nr"]:02d}</span> {k["id"]}: geen beeld (generatie mislukt)</div></div>'); continue
    prev = f"/_werk/hero-overons/preview.html?img=/_werk/hero-overons/out/{k['id']}-1920.webp"
    html.append(f'<div class="k"><a href="{prev}"><img src="/_werk/hero-overons/out/{k["id"]}-1600.webp" alt="" loading="lazy"></a><div class="t"><span class="nr">{k["nr"]:02d}</span><b>{k["id"]}</b><small>koppen {", ".join(k["koppen"])} &middot; {k["maat"][0]}x{k["maat"][1]}</small><small>{k["scene"]}...</small><a href="{prev}">Bekijk in de hero &rarr;</a></div></div>')
html.append('</div></body></html>')
(HIER / "galerij.html").write_text("\n".join(html), encoding="utf-8")
json.dump(kaarten, open(HIER / "kandidaten.json", "w"), indent=1, ensure_ascii=False)
print("galerij:", sum(k["ok"] for k in kaarten), "van", len(kaarten), "kandidaten")
