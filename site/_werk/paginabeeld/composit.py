#!/usr/bin/env python3
"""Zet alleen de gewijzigde regio uit edit/ terug op raw/ en schrijf het resultaat in klaar/.

Waarom niet gewoon de hele edit gebruiken: NBP hertekent bij een edit het HELE vlak subtiel. Gemeten
op doz2 was diff>30 over 6,1% van het beeld, en de kroeshaar van de verhuizer was volledig opnieuw
getekend terwijl er alleen doosopdruk gevraagd was. Recept uit de skill: diff-masker BINNEN een vaste
doos rond de plek die je wilde wijzigen, sluiten, feather, en dan pas mengen. Buiten die doos blijft
de bron pixel voor pixel staan.

Doosgrenzen zijn afgelezen op een gridrender met ORIGINELE coordinaten (grid-*.jpg in de scratchpad),
niet gegokt.
"""
import pathlib
import numpy as np
from PIL import Image, ImageFilter

HIER = pathlib.Path(__file__).resolve().parent
KLAAR = HIER / "klaar"

# id -> (x0, y0, x1, y1) in bron-coordinaten, het gebied waarbinnen de edit mag doorwerken
DOZEN = {
    "doz1-stapel-woonkamer":   (330, 1060, 1280, 1930),   # de hele dozenstapel
    "doz2-bezorging-voordeur": (580, 1170, 1280, 2130),   # de dozen op de steekwagen
    "m32-adviseur-woonkamer":  (990, 1080, 1180, 1240),   # de borstprint op de polo
    "chk1-keukentafel-planning": (690, 1720, 1330, 2260),  # het vel papier op tafel
    "m31-laadbak-vol": (450, 720, 1270, 1710),   # alleen de dozenwand achterin, niet de dekens
}
DREMPEL = 25


def composit(naam, doos):
    raw = Image.open(HIER / f"raw/{naam}.png").convert("RGB")
    edit = Image.open(HIER / f"edit/{naam}.png").convert("RGB").resize(raw.size, Image.LANCZOS)
    a, b = np.asarray(raw, int), np.asarray(edit, int)

    verschil = np.abs(a - b).max(2) > DREMPEL
    binnen = np.zeros(verschil.shape, bool)
    x0, y0, x1, y1 = doos
    binnen[y0:y1, x0:x1] = True
    m = Image.fromarray((verschil & binnen).astype(np.uint8) * 255)
    m = m.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(4))
    mf = np.asarray(m, float)[..., None] / 255.0

    uit = (a * (1 - mf) + b * mf).round().clip(0, 255).astype(np.uint8)
    Image.fromarray(uit).save(KLAAR / f"{naam}.png")
    return (np.asarray(m) > 8).mean() * 100


if __name__ == "__main__":
    KLAAR.mkdir(exist_ok=True)
    for naam, doos in DOZEN.items():
        print(f"  {naam}: {composit(naam, doos):.2f}% van het beeld overgenomen uit de edit")
