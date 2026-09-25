"""Top Movers-borstlogo op versie 2 van werkers-aan-het-werk (goedgekeurd 24-09-2026, ronde 1), volgens het
merkhandboek (#kleding) en dereus/_ai-beelden/gereedschap/MERK-OP-KLEDING.md: breedte 0,165 x schouderbreedte,
0,22 x schouderbreedte naast de knoopsluiting, op de hoogte van de onderste knoop, meegedraaid met de borst.

Kopie van beeldronde-debresser/werkers/werk/merk_borst.py (debresser-58). Anders dan daar: de bron is versie-2.jpg
hiernaast (het goedgekeurde beeld zonder logo, ongewijzigd), er kan per beeld meer dan een man in borst.json staan (de uitvoer
van de ene is de bron van de volgende, zoals in drie-werkers/werk/merk_drie.py), en dx schuift het logo zijwaarts
om van een naad of arm af te blijven.

    python werk/merk_borst.py

borst.json: {"2": {"schouder": px, "uit": bestand, "crop": bestand, "mannen": [{"wie": .., "knoop": [x, y],
"draai": graden, "dx": px}]}}, met de hand gemeten op een 2x-, 3x- en 5x-raster van versie-2.jpg (ronde 2; die uitsneden zijn niet bewaard).
knoop = onderste knoop van de knoopsluiting; schouder = breedte van het silhouet over de schouders, mouwen
inbegrepen; draai: + = linkerborst draait weg (logo smaller), - = linkerborst draait naar de camera, 0 = recht.
Schrijft <uit> en <crop> hiernaast (het logo op minimaal 3x). Daarna merk-op-wagen.py en opdruk-op-doos.py:
zie ../prompts.md.
"""
import json
import math
import pathlib
import shutil
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image
from scipy import ndimage

HIER = pathlib.Path(__file__).resolve().parent
RONDE = HIER   # sinds het archiveren (25-09-2026) staat het ruwe beeld in werk/
SCRIPT = r"C:\users\arnas\git_repos\dereus\_ai-beelden\gereedschap\merk-op-doos.py"
LOGO = HIER / "logo-topmovers-borst.png"


def gedraaid_logo(schouder, draai, pad):
    """Ongewijzigd uit merk_borst.py. Vervormt het logo voor een romp die `draai` graden gedraaid staat.
    Geeft (breedte in beeld, x-verschuiving van het logomidden ten opzichte van de knoopsluiting)."""
    R = 0.36 * schouder
    phi0 = math.degrees(math.asin(0.22 * schouder / R))
    plat = 0.165 * schouder
    dphi = plat / R
    phi_c = math.radians(phi0 + draai)
    phi_l, phi_r = phi_c - dphi / 2, phi_c + dphi / 2
    s0 = math.sin(math.radians(draai))
    x_l, x_r = R * (math.sin(phi_l) - s0), R * (math.sin(phi_r) - s0)
    l0, r0 = phi0 - math.degrees(dphi) / 2, phi0 + math.degrees(dphi) / 2
    w0 = R * (math.sin(math.radians(r0)) - math.sin(math.radians(l0)))
    o0 = R * (math.sin(math.radians(r0)) + math.sin(math.radians(l0))) / 2
    kw, ko = plat / w0, 0.22 * schouder / o0
    bron = np.asarray(Image.open(LOGO).convert("RGBA"), float) / 255.0
    Lh, Lw = bron.shape[:2]
    Wn = max(8, round(Lw * kw * (x_r - x_l) / plat))
    xo = (np.arange(Wn) + 0.5) / Wn
    s = math.sin(phi_l) + xo * (math.sin(phi_r) - math.sin(phi_l))
    kol = (np.arcsin(s) - phi_l) / (phi_r - phi_l) * Lw - 0.5
    rijen, kols = np.meshgrid(np.arange(Lh), kol, indexing="ij")
    alfa = bron[..., 3]
    pm = bron[..., :3] * alfa[..., None]
    a = ndimage.map_coordinates(alfa, [rijen, kols], order=1, mode="constant")
    rgb = np.stack([ndimage.map_coordinates(pm[..., k], [rijen, kols], order=1, mode="constant") for k in range(3)], -1)
    rgb = np.where(a[..., None] > 1e-4, rgb / np.maximum(a[..., None], 1e-4), 0)
    Image.fromarray((np.dstack([rgb, a]).clip(0, 1) * 255).round().astype("uint8"), "RGBA").save(pad)
    return kw * (x_r - x_l), ko * (x_l + x_r) / 2


borst = json.loads((HIER / "borst.json").read_text())
for nr in sys.argv[1:] or sorted(borst):
    b, S = borst[nr], borst[nr]["schouder"]
    with tempfile.TemporaryDirectory() as tmp:
        tmp = pathlib.Path(tmp)
        bron = RONDE / f"versie-{nr}.jpg"
        for i, m in enumerate(b["mannen"]):
            kx, ky = m["knoop"]
            draai = m.get("draai", 0)
            if draai:
                logo = tmp / f"logo-{i}.png"
                breed, dx = gedraaid_logo(S, draai, logo)
            else:
                logo, breed, dx = LOGO, 0.165 * S, 0.22 * S
            mx, h = kx + dx + m.get("dx", 0), breed  # vierkant van 2 x logobreedte, --breedte 0.5
            hoeken = f"{mx-h:.1f},{ky-h:.1f} {mx+h:.1f},{ky-h:.1f} {mx+h:.1f},{ky+h:.1f} {mx-h:.1f},{ky+h:.1f}"
            uit = tmp / f"stap-{i}.png"
            r = subprocess.run([sys.executable, SCRIPT, str(bron), "--hoeken", hoeken,
                                "--logo", str(logo), "--breedte", "0.5", "--korrel", "0.15",
                                "--uit", str(uit), "--crop", str(tmp / f"crop-{i}.png")],
                               capture_output=True, text=True)
            if r.returncode:
                raise SystemExit(r.stdout + r.stderr)
            bron = uit
            print(f"versie {nr} {m['wie']}: logo {breed:.0f}px breed (plat {0.165 * S:.0f}), "
                  f"x {mx - breed / 2:.0f} tot {mx + breed / 2:.0f}, y {ky}, draai {draai}, dx {m.get('dx', 0)}")
        shutil.copy(bron, RONDE / b["uit"])
        shutil.copy(tmp / f"crop-{len(b['mannen']) - 1}.png", RONDE / b["crop"])
