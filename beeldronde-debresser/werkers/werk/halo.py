"""Halo-meting volgens site/_werk/BEELDREGELS.md ("Halo meten: elke randpixel tegen zijn EIGEN buur"), plus een
controlebeeld voor de keuzepagina.

    python halo.py                # alle ../werker-N-...-uitsnede.png
    python halo.py --controle     # plus een controlebeeld per uitsnede in werk/

Per randpixel (0,15 < alfa < 0,85) de helderheid tegen die van het materiaal er direct naast:
buur = grey_dilation(L waar alfa > 0,95, size 9). Telt de pixels die lichter zijn dan buur + 20 en het grootste
aaneengesloten cluster, apart voor de buitencontour (grenst aan transparant dat de beeldrand raakt) en voor
interne doorkijkjes. IJk uit BEELDREGELS: duizenden pixels met clusters van honderden = halo; tientallen met
clusters onder de tien = schoon.

Met --controle schrijft het werk/werker-N-controle.png: de figuur op weergavegrootte (700 px hoog) op licht en op donker, en het
hoofd en de schouders op 200 procent daarvan, op donker (daar valt een lichte franje het eerst op).
"""
import pathlib
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

HIER = pathlib.Path(__file__).resolve().parent
RONDE = HIER.parent
LICHT, DONKER = (244, 242, 238), (29, 29, 27)
LETTER = ImageFont.truetype("segoeuib.ttf", 22)


def meet(pad):
    im = np.asarray(Image.open(pad).convert("RGBA"), float)
    a = im[..., 3] / 255
    L = np.asarray(Image.open(pad).convert("RGBA").convert("L"), float)
    buur = ndimage.grey_dilation(np.where(a > 0.95, L, 0), size=9)
    band = (a > 0.15) & (a < 0.85)
    licht = band & (L > buur + 20)
    # buitencontour: randpixels naast transparante gebieden die de beeldrand raken
    lab, _ = ndimage.label(a < 0.15)
    rand = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    buiten = ndimage.binary_dilation(np.isin(lab, rand[rand > 0]), iterations=3)
    uit = {}
    for naam, m in (("buiten", licht & buiten), ("intern", licht & ~buiten)):
        cl, k = ndimage.label(m, structure=np.ones((3, 3)))
        uit[naam] = (int(m.sum()), int(ndimage.sum(m, cl, range(1, k + 1)).max()) if k else 0)
    return uit, int(band.sum())


def controle(pad, doel):
    fig = Image.open(pad).convert("RGBA")
    H = 700
    klein = fig.resize((round(fig.width * H / fig.height), H), Image.LANCZOS)
    panelen = []
    for kleur in (LICHT, DONKER):
        p = Image.new("RGBA", klein.size, kleur + (255,)); p.alpha_composite(klein); panelen.append(("", p))
    # hoofd en schouders: bovenste 30 procent van de figuur, op 200 procent van de weergavegrootte
    kop = klein.crop((0, 0, klein.width, round(H * 0.30)))
    kop = kop.resize((kop.width * 2, kop.height * 2), Image.LANCZOS)
    p = Image.new("RGBA", kop.size, DONKER + (255,)); p.alpha_composite(kop); panelen.append(("", p))
    kopb = 40
    vel = Image.new("RGB", (sum(p.width for _, p in panelen) + 16 * 2, max(p.height for _, p in panelen) + kopb), (255, 255, 255))
    d, x = ImageDraw.Draw(vel), 0
    for tekst, (_, p) in zip(("op licht", "op donker", "hoofd en schouders, 200%"), panelen):
        vel.paste(p.convert("RGB"), (x, kopb)); d.text((x + 6, 8), tekst, fill=(20, 20, 20), font=LETTER); x += p.width + 16
    vel.save(doel)


for pad in sorted(RONDE.glob("werker-*-uitsnede.png")):
    nr = pad.name.split("-")[1]
    (bn, bc), (inn, ic) = (m := meet(pad))[0]["buiten"], m[0]["intern"]
    # ijk BEELDREGELS: 659/70 schoon, 1.523/281 "rest onzichtbaar", 4.369/639 en 6.100/231 dikke halo. Boven
    # "schoon" beslist de telling niet alleen: zoek de clusters op en kijk op weergavegrootte (BEELDREGELS punt 2 en 4)
    oordeel = ("schoon" if bn < 700 and bc < 100 else
               "rest: clusters nakijken op weergavegrootte" if bn < 3000 and bc < 400 else "halo")
    print(f"werker {nr}: {Image.open(pad).size[0]}x{Image.open(pad).size[1]}, randband {m[1]} px | lichter dan buur+20: "
          f"buitencontour {bn} px (grootste cluster {bc}), intern {inn} px (cluster {ic}) -> {oordeel}")
    if "--controle" in sys.argv:
        controle(pad, HIER / f"werker-{nr}-controle.png")
