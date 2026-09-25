#!/usr/bin/env python3
"""Wis een klein merklogo uit een vlak met verloop, deterministisch.

Voor de contact-cutouts: het model tekende op twee laptops een Apple-logo, en een merk van derden
mag daar niet op. Het deksel is een egaal aluminium vlak met een zacht verloop, precies het geval
waar Jacobi-relaxatie vanaf de rand voor werkt (vul_diffusie in _werk/beeld/produceer.py); op
textuur zou het uitsmeren.

Coordinaten zijn afgelezen op een gridrender met ORIGINELE labels, niet gegokt.
Draaien: python3 wis_merk.py
"""
import pathlib
import numpy as np
from PIL import Image, ImageFilter

HIER = pathlib.Path(__file__).resolve().parent
CUT = HIER / "contact-cut"

# bestand -> (x0, y0, x1, y1) rond het logo
KLUSSEN = {
    "pc-man-a2": (1160, 1670, 1290, 1810),
    "pc-man-c2": (390, 1810, 520, 1950),
}


def wis(naam, doos):
    p = CUT / f"{naam}.png"
    im = Image.open(p).convert("RGBA")
    a = np.asarray(im, float).copy()
    x0, y0, x1, y1 = doos
    rand = 12
    vak = a[y0 - rand:y1 + rand, x0 - rand:x1 + rand, :3].copy()
    h, w = vak.shape[:2]
    gat = np.zeros((h, w), bool)
    gat[rand:h - rand, rand:w - rand] = True

    # Het deksel is een glad verloop, dus fit een KWADRATISCH vlak per kanaal op de rand-ring en
    # evalueer dat binnen het gat. Dat is exact voor een verloop en heeft geen convergentieprobleem;
    # Jacobi-relaxatie had bij 400 passes de donkere vorm in het midden nog niet weggewerkt.
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    yn, xn = yy / h, xx / w
    basis = np.stack([np.ones_like(xn), xn, yn, xn * xn, xn * yn, yn * yn], -1)
    ring = ~gat
    A = basis[ring]
    u = vak.copy()
    for k in range(3):
        coef, *_ = np.linalg.lstsq(A, vak[ring, k], rcond=None)
        u[gat, k] = (basis[gat] @ coef)

    # korrel terug, anders is het vlak zichtbaar gladder dan de rest van het deksel
    ruis = np.random.default_rng(7).normal(0, 1.6, u.shape)
    u[gat] = np.clip(u[gat] + ruis[gat], 0, 255)

    a[y0 - rand:y1 + rand, x0 - rand:x1 + rand, :3] = u
    uit = Image.fromarray(a.round().clip(0, 255).astype(np.uint8), "RGBA")
    uit.save(p)
    rest = float(np.abs(u[gat] - vak[gat]).max())
    return f"  {naam}: {x1-x0}x{y1-y0} px gevuld, grootste correctie {rest:.0f}"


if __name__ == "__main__":
    for naam, doos in KLUSSEN.items():
        print(wis(naam, doos))
