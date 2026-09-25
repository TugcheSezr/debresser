"""Top Movers-borstlogo op de vijf werkers, volgens het merkhandboek (#kleding) en
dereus/_ai-beelden/gereedschap/MERK-OP-KLEDING.md: breedte 0,165 x schouderbreedte, 0,22 x schouderbreedte
naast de knoopsluiting, op de hoogte van de onderste knoop, meegedraaid met de borst.

    python merk_borst.py            # werker 6 t/m 9 uit borst-6-9.json
    python merk_borst.py 7 9        # alleen deze

borst-6-9.json: {"6": {"knoop": [x, y], "schouder": px, "draai": graden, "uit": bestandsnaam}, ...}, met de
hand gemeten op werk/werker-N.jpg (ruw, zonder logo; ronde werkers-gezichten-20260924, versie N-5).
knoop = onderste knoop van de knoopsluiting; schouder = breedte van het silhouet over de
schouders; draai = hoe ver de romp gedraaid staat: + naar rechts in beeld (linkerborst draait weg, logo
smaller), - naar links in beeld (linkerborst draait naar de camera), 0 = recht, logo plat.

Gedraaid: het logo wordt eerst vervormd alsof het op een cilinder ligt (romp met straal 0,36 x schouder),
zoals bij de goedgekeurde werker 4 (beeldronde-debresser/werkers/werk/draai_logo.py), en dan met een
vierkant vlak op de stof gelegd. Anders dan daar is de cilinder geijkt op de rechte romp (draai 0 = het
platte logo), zodat een licht gedraaide figuur niet ineens een veel kleiner logo krijgt. Schrijft ../<uit>.
"""
import json
import math
import pathlib
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
    """Vervormt het logo voor een romp die `draai` graden gedraaid staat. Geeft (breedte in beeld, x-verschuiving
    van het logomidden ten opzichte van de knoopsluiting)."""
    R = 0.36 * schouder
    phi0 = math.degrees(math.asin(0.22 * schouder / R))
    plat = 0.165 * schouder
    dphi = plat / R
    phi_c = math.radians(phi0 + draai)
    phi_l, phi_r = phi_c - dphi / 2, phi_c + dphi / 2
    s0 = math.sin(math.radians(draai))
    x_l, x_r = R * (math.sin(phi_l) - s0), R * (math.sin(phi_r) - s0)
    # geijkt op de rechte romp: bij draai 0 is het logo precies zo breed en staat het precies zo ver van de
    # knoopsluiting als het platte logo (0,165 en 0,22 x schouder), zoals bij een frontale figuur
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


borst = json.loads((HIER / "borst-6-9.json").read_text())
for nr in sys.argv[1:] or sorted(borst):
    b = borst[nr]
    kx, ky = b["knoop"]
    S, draai = b["schouder"], b.get("draai", 0)
    with tempfile.TemporaryDirectory() as tmp:
        if draai:
            logo = pathlib.Path(tmp) / "logo.png"
            breed, dx = gedraaid_logo(S, draai, logo)
        else:
            logo, breed, dx = LOGO, 0.165 * S, 0.22 * S
        mx, h = kx + dx, breed  # vierkant van 2 x logobreedte, --breedte 0.5
        hoeken = f"{mx-h:.1f},{ky-h:.1f} {mx+h:.1f},{ky-h:.1f} {mx+h:.1f},{ky+h:.1f} {mx-h:.1f},{ky+h:.1f}"
        r = subprocess.run([sys.executable, SCRIPT, str(HIER / f"werker-{nr}.jpg"), "--hoeken", hoeken,
                            "--logo", str(logo), "--breedte", "0.5", "--korrel", "0.15",
                            "--uit", str(RONDE / b["uit"]),
                            "--crop", str(pathlib.Path(tmp) / "crop.png")], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(r.stdout + r.stderr)
    print(f"werker {nr}: logo {breed:.0f}px breed (plat {0.165 * S:.0f}), midden x {mx:.0f} y {ky}, draai {draai}")
