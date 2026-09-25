#!/usr/bin/env python3
"""Deterministische retouches op de GEKOZEN platen: alleen wat op weergavegrootte zichtbaar is.

Twee gereedschappen:
  kloon(box, dx, dy)  neemt een strook uit hetzelfde beeld en legt hem met een zachte rand over het vak;
                      werkt op herhalende structuur (laadbakwand met rails, muur, karton).
  diffusie(box)       Jacobi-relaxatie vanaf de rand van het vak plus ruis; werkt op een egaal vlak
                      met verloop, niet op textuur.
Resultaat gaat naar klaar/<id>.png (dat bestand wint automatisch in web.py, galerij.py en lever.py).

    python3 fix.py [id ...]
"""
import sys, pathlib
import numpy as np
from PIL import Image, ImageFilter

HIER = pathlib.Path(__file__).resolve().parent
RAW, KLAAR = HIER / "raw", HIER / "klaar"
KLAAR.mkdir(exist_ok=True)


def _rand(vorm, zacht):
    m = np.zeros(vorm, np.float32)
    m[zacht:-zacht, zacht:-zacht] = 1
    return np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(zacht * 0.7)), np.float32)[..., None] / 255


def kloon(a, box, dx=0, dy=0, zacht=8):
    x0, y0, x1, y1 = box
    bron = a[y0 + dy:y1 + dy, x0 + dx:x1 + dx].copy()
    m = _rand((y1 - y0, x1 - x0), zacht)
    a[y0:y1, x0:x1] = a[y0:y1, x0:x1] * (1 - m) + bron * m
    return a


def diffusie(a, box, iters=350, ruis=1.5, zaad=1):
    x0, y0, x1, y1 = box
    v = a[y0:y1, x0:x1].copy()
    m = np.ones(v.shape[:2], bool)
    m[0, :] = m[-1, :] = m[:, 0] = m[:, -1] = False
    for _ in range(iters):
        n = (np.roll(v, 1, 0) + np.roll(v, -1, 0) + np.roll(v, 1, 1) + np.roll(v, -1, 1)) / 4
        v[m] = n[m]
    v += np.random.default_rng(zaad).normal(0, ruis, v.shape).astype(np.float32)
    a[y0:y1, x0:x1] = v
    return a


def snijd(a, links=0, boven=0, rechts=0, onder=0):
    H, W = a.shape[:2]
    return a[boven:H - onder, links:W - rechts]


# id -> functie die het beeldarray bewerkt. Coordinaten zijn afgelezen op markeer.py-renders.
TAKEN = {
    # vignet-rand rondom wegsnijden (gemeten: donkere band tot ~25 px, zachte overgang tot ~35)
    "spo3-klant-belt-opgelucht": lambda a: snijd(a, 34, 34, 34, 34),
    # blauwe spanband tegen de laadbakwand: kloon de wandstrook rechts ernaast (zelfde rails)
    "sen5-rollator-entree": lambda a: kloon(a, (205, 930, 275, 1385), dx=78),
    # gele spanband met ratel aan de sjorrail: kloon de rail links ernaast
    "zor6-wagen-zorgcentrum-breed": lambda a: kloon(a, (1222, 530, 1352, 940), dx=-150),
    # man half afgesneden aan de rechterrand
    "ops4-inventaris-tablet": lambda a: snijd(a, rechts=118),
}


def doe(pid):
    p = RAW / f"{pid}.png"
    a = np.asarray(Image.open(p).convert("RGB")).astype(np.float32)
    voor = a.shape
    a = TAKEN[pid](a)
    Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(KLAAR / f"{pid}.png")
    return f"  {pid}: {voor[1]}x{voor[0]} -> {a.shape[1]}x{a.shape[0]}"


if __name__ == "__main__":
    wens = sys.argv[1:] or list(TAKEN)
    for pid in wens:
        print(doe(pid), flush=True)
