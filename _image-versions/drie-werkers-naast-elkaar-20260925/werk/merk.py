"""Top Movers-borstlogo op de drie mannen van de vijf versies van ronde drie-werkers-naast-elkaar (25-09-2026).

Kopie van beeldronde-debresser/drie-werkers/werk/merk_drie.py (het gereedschap van de goedgekeurde trio-foto's),
aangepast voor deze ronde: bron is versie-N.jpg in de rondemap (na werk/retouche.py en werk/gezicht_v3.py),
uitvoer versie-N-merk.png plus versie-N-merkcrop.png (de drie borsten op 3x) in de rondemap.
Regels zoals daar, volgens het merkhandboek (#kleding): breedte 0,165 x schouderbreedte, 0,22 x schouderbreedte
naast de knoopsluiting, op de hoogte van de onderste knoop, meegedraaid met de borst. Het logobestand is dat van
de goedgekeurde trio-foto's (niet opnieuw gemaakt).

    python werk/merk.py          # alle versies
    python werk/merk.py 3        # alleen deze

borst.json: {"1": {"schouder": px, "mannen": [{"wie": "04 links", "knoop": [x, y], "draai": graden, "dx": px}, ...]}}
met de hand gemeten op een 1,6x-raster van versie-N.jpg. Eén schouderbreedte per beeld (ongeveer het gemiddelde van
de drie): de drie staan even ver van de camera en dragen hetzelfde logo. draai: + = linkerborst draait weg, - = naar
de camera.
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
LOGO = pathlib.Path("C:/users/arnas/git_repos/debresser/beeldronde-debresser/drie-werkers/werk/logo-topmovers-borst.png")


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
        bron = RONDE / f"versie-{nr}.jpg"
        vakken = []
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
            vakken.append((mx, ky, breed))
            print(f"versie {nr} {m['wie']}: logo {breed:.0f}px breed (plat {0.165 * S:.0f}), "
                  f"midden x {mx:.0f} y {ky}, draai {draai}")
        shutil.copy(bron, RONDE / f"versie-{nr}-merk.png")
        # controle: de drie borsten naast elkaar op 3x, na het beeld gemaakt (de pagina toont hem dan)
        beeld = Image.open(RONDE / f"versie-{nr}-merk.png").convert("RGB")
        tegels = []
        for x0, y0, b in vakken:
            t = beeld.crop((round(x0 - 1.4 * b), round(y0 - 0.9 * b), round(x0 + 1.4 * b), round(y0 + 0.9 * b)))
            tegels.append(t.resize((round(t.width * 3), round(t.height * 3)), Image.LANCZOS))
        hoog = max(t.height for t in tegels)
        tegels = [t.resize((round(t.width * hoog / t.height), hoog), Image.LANCZOS) for t in tegels]
        crop = Image.new("RGB", (sum(t.width for t in tegels) + 12 * (len(tegels) - 1), hoog), "white")
        x = 0
        for t in tegels:
            crop.paste(t, (x, 0)); x += t.width + 12
        crop.save(RONDE / f"versie-{nr}-merkcrop.png")
