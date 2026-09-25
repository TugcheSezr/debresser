"""Kleine retouches op de ruwe beelden van e0, voor het logo erop gaat. Deterministisch; bron is altijd
werk/versie-N-ruw-e0.jpg, uitvoer versie-N.jpg in de rondemap.
    versie 1: tape over de onderrand van de doos (x 572-600) en een paar verzonnen drukletters op de doos weg
    versie 2: kenteken effen geel (de wazige tekens weg), en een klein embleempje op de borst van de man rechts weg
    python werk/retouche.py
"""
import pathlib
import numpy as np
from PIL import Image, ImageFilter

HIER = pathlib.Path(__file__).resolve().parent
RONDE = HIER.parent


def kloon(a, vak, dx, dy, zacht=3):
    """Vult vak (x1,y1,x2,y2) met de pixels op (x+dx, y+dy), met een zachte rand."""
    x1, y1, x2, y2 = vak
    m = np.zeros(a.shape[:2], np.float32)
    m[y1:y2, x1:x2] = 1
    m = np.asarray(Image.fromarray((m * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(zacht)), np.float32)[..., None] / 255
    bron = np.roll(a, (-dy, -dx), axis=(0, 1))
    return a * (1 - m) + bron * m


def effen_plaat(a, vak, zacht=2):
    """Kenteken: per rij het gemiddelde van de gele pixels, dan licht vervaagd; tekens verdwijnen."""
    x1, y1, x2, y2 = vak
    p = a[y1:y2, x1:x2].copy()
    geel = (p[..., 0] > 150) & (p[..., 1] > 110) & (p[..., 2] < 90)
    vul = p.copy()
    for r in range(p.shape[0]):
        sel = geel[r]
        kleur = p[r][sel].mean(0) if sel.sum() > 3 else p[r].mean(0)
        vul[r, :] = kleur
    vul = np.asarray(Image.fromarray(vul.clip(0, 255).astype("uint8")).filter(ImageFilter.GaussianBlur(zacht)), np.float32)
    m = np.zeros(p.shape[:2], np.float32)
    m[2:-2, 2:-2] = 1
    m = np.asarray(Image.fromarray((m * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.5)), np.float32)[..., None] / 255
    a[y1:y2, x1:x2] = p * (1 - m) + vul * m
    return a


def laad(nr):
    return np.asarray(Image.open(HIER / f"versie-{nr}-ruw-e0.jpg").convert("RGB"), np.float32)


def bewaar(a, nr):
    Image.fromarray(a.clip(0, 255).round().astype("uint8")).save(RONDE / f"versie-{nr}.jpg", quality=95)
    print(f"versie-{nr}.jpg geschreven")


a = laad(1)
a = kloon(a, (572, 908, 601, 992), 34, 4)        # tape over de onderrand
a = kloon(a, (779, 722, 800, 760), -22, 0, 2)    # drukletters
bewaar(a, 1)

a = laad(2)
a = effen_plaat(a, (247, 1009, 304, 1044))       # kenteken
a = kloon(a, (1699, 655, 1719, 670), 0, 16, 2)   # embleempje op de borst, man rechts
bewaar(a, 2)
