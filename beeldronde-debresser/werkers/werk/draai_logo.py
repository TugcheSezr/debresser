"""Borstlogo dat meedraait met een romp die van de camera wegdraait (werker 4, goedgekeurd 24-09-2026).

merk-op-doos.py houdt altijd de eigen verhouding van het logo aan: een smaller vlak maakt het logo
alleen kleiner, niet schuiner. Daarom wordt het logo hier eerst zelf vervormd, alsof het op een
cilinder (de borst) ligt die over `draai` graden weggedraaid staat, en daarna met een vierkant vlak
(geen extra perspectief) op de stof gelegd, met de schaduw en korrel van merk-op-doos.

Model: romp = cilinder met straal R px. Het logo ligt in het lichaamsvlak op hoek phi0 naast de
knoopsluiting en is even lang (booglengte) als het platte merk: 0,165 x schouderbreedte. In beeld is
x = R * sin(hoek + draai), dus de kant van het logo die van de camera af draait wordt smaller.

    python draai_logo.py
"""
import math
import pathlib
import subprocess
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

HIER = pathlib.Path(__file__).resolve().parent
RONDE = HIER.parent
SCRIPT = r"C:\users\arnas\git_repos\dereus\_ai-beelden\gereedschap\merk-op-doos.py"

# gemeten op werk/versie-4.png (2x-raster): knoopsluiting x 807, onderste knoop y 690,
# schouderbreedte 470, armsgatnaad aan de verre kant x ~935 (op 2x nagemeten in de uitsnede;
# een eerste lezing van 902 op het grove raster gaf 26 graden en een te smal logo, 0,55x)
KNOOP_X, KNOOP_Y, SCHOUDER = 807, 690, 470
R = 0.36 * SCHOUDER                  # rompstraal: borstbreedte ~72% van de schouders met mouwen
DRAAI = 14.0                         # uit R*(1 - sin draai) = 935 - 807
PHI0 = math.degrees(math.asin(0.22 * SCHOUDER / R))   # de gewone 0,22 x schouder naast de knoopsluiting

plat = 0.165 * SCHOUDER              # breedte van het platte merk (booglengte op de borst)
dphi = plat / R
phi_c = math.radians(PHI0 + DRAAI)
phi_l, phi_r = phi_c - dphi / 2, phi_c + dphi / 2
s0 = math.sin(math.radians(DRAAI))
x_l = KNOOP_X + R * (math.sin(phi_l) - s0)
x_r = KNOOP_X + R * (math.sin(phi_r) - s0)
breed = x_r - x_l
midden_x = (x_l + x_r) / 2
print(f"plat {plat:.0f}px -> gedraaid {breed:.0f}px ({breed / plat:.2f}x), van x {x_l:.0f} tot {x_r:.0f}, "
      f"rechterrand {math.degrees(phi_r):.0f} graden van de kijkrichting")

# het logo vervormen: per uitvoerkolom de hoek op de cilinder terugrekenen naar een bronkolom
bron = np.asarray(Image.open(HIER / "logo-topmovers-borst.png").convert("RGBA"), float) / 255.0
Lh, Lw = bron.shape[:2]
Wn = max(8, round(Lw * breed / plat))
xo = (np.arange(Wn) + 0.5) / Wn
s = math.sin(phi_l) + xo * (math.sin(phi_r) - math.sin(phi_l))
u = (np.arcsin(s) - phi_l) / (phi_r - phi_l)
kol = u * Lw - 0.5
rijen, kols = np.meshgrid(np.arange(Lh), kol, indexing="ij")
alfa = bron[..., 3]
pm = bron[..., :3] * alfa[..., None]
uit_a = ndimage.map_coordinates(alfa, [rijen, kols], order=1, mode="constant")
uit_pm = np.stack([ndimage.map_coordinates(pm[..., k], [rijen, kols], order=1, mode="constant") for k in range(3)], -1)
uit_rgb = np.where(uit_a[..., None] > 1e-4, uit_pm / np.maximum(uit_a[..., None], 1e-4), 0)
logo = np.dstack([uit_rgb, uit_a])
pad_logo = HIER / "logo-topmovers-borst-gedraaid-v4.png"
Image.fromarray((logo.clip(0, 1) * 255).round().astype("uint8"), "RGBA").save(pad_logo)

# vierkant vlak van 2 x de gedraaide breedte: --breedte 0.5 geeft dan precies die breedte
h = breed
hoeken = (f"{midden_x-h:.1f},{KNOOP_Y-h:.1f} {midden_x+h:.1f},{KNOOP_Y-h:.1f} "
          f"{midden_x+h:.1f},{KNOOP_Y+h:.1f} {midden_x-h:.1f},{KNOOP_Y+h:.1f}")
r = subprocess.run([sys.executable, SCRIPT, str(HIER / "versie-4.png"), "--hoeken", hoeken, "--logo", str(pad_logo),
                    "--breedte", "0.5", "--korrel", "0.15", "--uit", str(RONDE / "werker-4-tablet.png"),
                    "--crop", str(HIER / "versie-4-crop-gedraaid.png")], capture_output=True, text=True)
print("\n".join(l for l in (r.stdout + r.stderr).splitlines() if "karton" not in l))
