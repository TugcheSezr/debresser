"""Top Movers-borstlogo op de drie mannen van de twee goedgekeurde groepsfoto's (ronde drie-werkers-poseren, r2).

Kopie van beeldronde-debresser/werkers/werk/merk_borst.py (debresser-58), aangepast voor drie mensen per beeld:
de uitvoer van de ene man is de bron van de volgende. Regels zoals daar, volgens het merkhandboek (#kleding) en
dereus/_ai-beelden/gereedschap/MERK-OP-KLEDING.md: breedte 0,165 x schouderbreedte, 0,22 x schouderbreedte naast
de knoopsluiting, op de hoogte van de onderste knoop, meegedraaid met de borst.

    python werk/merk_drie.py          # versie 1 en 2
    python werk/merk_drie.py 2        # alleen deze

borst.json: {"1": {"schouder": px, "uit": bestandsnaam, "mannen": [{"wie": "B", "knoop": [x, y], "draai": graden, "dx": px}, ...]}}
met de hand gemeten op een 2x-raster van werk/versie-N.jpg (ruw, zonder logo). Eén schouderbreedte per beeld: de drie staan even ver
van de camera en dragen hetzelfde logo, dus ze horen even grote logo's te krijgen. draai: + = linkerborst draait
weg (logo smaller), - = linkerborst draait naar de camera, 0 = recht; geschat uit de afstand van de knoopsluiting
tot de twee armsgaten. dx (optioneel) schuift het logo zijwaarts om van een naad of arm af te blijven.
Schrijft ../<uit> (overschrijft het goedgekeurde beeld; opnieuw draaien geeft hetzelfde bestand).
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
RONDE = HIER.parent
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
    S = borst[nr]["schouder"]
    with tempfile.TemporaryDirectory() as tmp:
        tmp = pathlib.Path(tmp)
        bron = HIER / f"versie-{nr}.jpg"
        for i, m in enumerate(borst[nr]["mannen"]):
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
                  f"midden x {mx:.0f} y {ky}, draai {draai}")
        shutil.copy(bron, RONDE / borst[nr]["uit"])
