"""Borstlogo Top Movers zoals het merkhandboek het voorschrijft (brandbook-de-bresser.html, #kleding):
witte letters, turquoise swoosh #009881, op antraciet. Er is geen kant-en-klaar bestand in die kleuren,
dus het wordt gebouwd uit het kleurbestand: de zwarte letters worden wit, de swoosh blijft #009881.

In ronde 1 kwam het borstlogo uit een andere bron en had de swoosh #009FB4 (te blauw); dit vervangt het.

    python maak_logo.py      # schrijft logo-topmovers-borst.png (813 px breed, zoals het vorige)
"""
import pathlib

import numpy as np
from PIL import Image

HIER = pathlib.Path(__file__).resolve().parent
BRON = HIER.parents[2] / "de-kievit-nl" / "logos" / "2024-03_De-Bresser-Top-movers.png"
TURQUOISE = np.array([0, 152, 129], float)   # #009881
WIT = np.array([255, 255, 255], float)
BREEDTE = 813

bron = np.asarray(Image.open(BRON).convert("RGBA"), float)
rgb, alfa = bron[..., :3], bron[..., 3]
# de bron bevat alleen zwart en #009881 (plus randpixels ertussen): het groen zegt hoeveel swoosh een pixel is
t = np.clip(rgb[..., 1:2] / TURQUOISE[1], 0, 1)
kleur = t * TURQUOISE + (1 - t) * WIT
logo = Image.fromarray(np.dstack([kleur, alfa]).round().astype("uint8"), "RGBA")
# Pillow verkleint RGBA voorvermenigvuldigd (via RGBa), dus de randen lopen niet donker aan
hoog = round(logo.height * BREEDTE / logo.width)
logo.resize((BREEDTE, hoog), Image.LANCZOS).save(HIER / "logo-topmovers-borst.png")
print(f"{BRON.name} -> logo-topmovers-borst.png {BREEDTE}x{hoog}")
