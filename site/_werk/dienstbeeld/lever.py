#!/usr/bin/env python3
"""Zet de gekozen platen op de slotmaten in site/assets/img/ en schrijf een plaatsingsrapport.

Bron: gekozen.json (geschreven door kiesserver.py als Shahab in de galerij klikt).
Doel per dienst: 3 staande foto's voor de .blok__foto-vakken en 1 liggende voor de hero.

Maten, gemeten aan de pagina's:
  staand  760x1140 en 1140x1710   (vak is 307-524 px breed, dus 1x en 2x met marge)
  liggend 1120x641 en 1920x1099   (hero loopt over de volle breedte)
De bron is 1696x2528 (staand) of 2528x1696 (liggend); de uitsnede gaat uit het midden, tenzij in
UITSNEDE een andere horizontale of verticale fractie staat (bijv. omdat de gezichten hoog zitten).

Draaien vanuit deze map:  python3 lever.py [--droog]
"""
import json, pathlib, sys
from PIL import Image

HIER = pathlib.Path(__file__).resolve().parent
DOEL = HIER.parents[1] / "assets/img"
KLAAR, RAW = HIER / "klaar", HIER / "raw"
DROOG = "--droog" in sys.argv

STAAND = [(760, 1140), (1140, 1710)]
# De hero volgt het bestaande patroon van build_paginas.py: hero-<naam>-1920.webp (1920x815),
# -1280.webp (1280x543) en -mobiel.webp (900x1034, staand, rond de mensen gesneden).
HERO = [(1280, 543), (1920, 815)]
HERO_MOBIEL = (900, 1034)

# id -> (horizontale fractie, verticale fractie) van het zwaartepunt; standaard midden.
# QA meldde bij een aantal liggende beelden dat de gezichten hoog zitten, daar dus hoger snijden.
UITSNEDE = {
    "par7-gezin-dozen-woonkamer": (0.50, 0.38),
    "inp6-team-woonkamer-breed": (0.50, 0.40),
    "inp7-uitpakken-nieuwe-keuken": (0.50, 0.38),
    "mon6-boxspring-deur": (0.50, 0.36),
    "mon7-dressoir-klaar": (0.50, 0.36),
    "zor7-plattegrond-manager": (0.50, 0.42),
}


def bron_van(pid):
    k = KLAAR / f"{pid}.png"
    return k if k.exists() else RAW / f"{pid}.png"


def snee_van(im, doel_ar, fx=0.5, fy=0.5):
    W, H = im.size
    if W / H > doel_ar:
        w = int(round(H * doel_ar)); h = H
    else:
        w = W; h = int(round(W / doel_ar))
    x = max(0, min(W - w, int(round(fx * W - w / 2))))
    y = max(0, min(H - h, int(round(fy * H - h / 2))))
    return im.crop((x, y, x + w, y + h))


def lever_hero(pid, naam):
    """Hero: breed 1920x815 en 1280x543 plus een staande mobiele snede 900x1034."""
    p = bron_van(pid)
    im = Image.open(p).convert("RGB")
    fx, fy = UITSNEDE.get(pid, (0.5, 0.5))
    breed = snee_van(im, HERO[0][0] / HERO[0][1], fx, fy)
    for bw, bh in HERO:
        breed.resize((bw, bh), Image.LANCZOS).save(DOEL / f"hero-{naam}-{bw}.webp", quality=84, method=6)
    mob = snee_van(im, HERO_MOBIEL[0] / HERO_MOBIEL[1], fx, fy)
    mob.resize(HERO_MOBIEL, Image.LANCZOS).save(DOEL / f"hero-{naam}-mobiel.webp", quality=84, method=6)
    return p.parent.name, breed.size, [f"hero-{naam}-1920.webp", f"hero-{naam}-mobiel.webp"]


def lever(pid, naam):
    p = bron_van(pid)
    im = Image.open(p).convert("RGB")
    W, H = im.size
    liggend = W > H
    maten = STAAND
    doel_ar = maten[0][0] / maten[0][1]
    fx, fy = UITSNEDE.get(pid, (0.5, 0.5))
    if W / H > doel_ar:                      # te breed: links en rechts weg
        w = int(round(H * doel_ar)); h = H
    else:                                    # te hoog: boven en onder weg
        w = W; h = int(round(W / doel_ar))
    x = max(0, min(W - w, int(round(fx * W - w / 2))))
    y = max(0, min(H - h, int(round(fy * H - h / 2))))
    snee = im.crop((x, y, x + w, y + h))
    uit = []
    for bw, bh in maten:
        f = DOEL / f"{naam}-{bw}.webp"
        if not DROOG:
            snee.resize((bw, bh), Image.LANCZOS).save(f, quality=84, method=6)
        uit.append(f.name)
    return p.parent.name, (w, h), uit


if __name__ == "__main__":
    keuze = json.loads((HIER / "gekozen.json").read_text())
    from gen_dienst import DIENST, SCENES
    for code, ids in keuze.items():
        if not ids:
            continue
        staand = [i for i in ids if SCENES[i]["ar"] == "2:3"]
        liggend = [i for i in ids if SCENES[i]["ar"] == "3:2"]
        print(f"\n== {DIENST[code]}  ({len(staand)} staand, {len(liggend)} liggend)")
        for n, pid in enumerate(staand, 1):
            bron, snee, bestanden = lever(pid, f"{code}-{n}")
            print(f"   {code}-{n:<2} <- {pid:38s} [{bron}] snee {snee[0]}x{snee[1]}  {bestanden[-1]}")
        for n, pid in enumerate(liggend, 1):
            naam = code if n == 1 else f"{code}{n}"
            bron, snee, bestanden = lever_hero(pid, naam)
            print(f"   hero-{naam:<6} <- {pid:38s} [{bron}] snee {snee[0]}x{snee[1]}  {bestanden[-1]}")
    print("\nDROOGLOOP, niets weggeschreven." if DROOG else f"\nGeschreven naar {DOEL}")
