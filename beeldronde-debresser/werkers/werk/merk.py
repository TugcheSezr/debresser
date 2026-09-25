"""Zet het Top Movers-borstlogo op versie 5, volgens dereus/_ai-beelden/gereedschap/MERK-OP-KLEDING.md:
merkbreedte 0,165 x schouderbreedte, vlak = vierkant van 2 x merkbreedte om het merkmidden,
--breedte 0.5, --korrel 0.15. Versie 5 staat recht voor de camera, dus het logo ligt plat.
Versie 4 staat gedraaid en gaat via draai_logo.py.

    python merk.py

borst.json: {"5": {"midden": [x, y], "schouder": px}}, met de hand gemeten op werk/versie-5.png (ronde 1).
Schrijft ../werker-5-armen-over-elkaar.png en werk/versie-5-crop.png.
"""
import json
import pathlib
import subprocess
import sys

HIER = pathlib.Path(__file__).resolve().parent
RONDE = HIER.parent
SCRIPT = r"C:\users\arnas\git_repos\dereus\_ai-beelden\gereedschap\merk-op-doos.py"

b = json.loads((HIER / "borst.json").read_text())["5"]
mx, my = b["midden"]
breed = 0.165 * b["schouder"]
h = breed  # halve zijde van het vierkant
hoeken = f"{mx-h:.0f},{my-h:.0f} {mx+h:.0f},{my-h:.0f} {mx+h:.0f},{my+h:.0f} {mx-h:.0f},{my+h:.0f}"
r = subprocess.run([sys.executable, SCRIPT, str(HIER / "versie-5.png"), "--hoeken", hoeken,
                    "--logo", str(HIER / "logo-topmovers-borst.png"), "--breedte", "0.5", "--korrel", "0.15",
                    "--uit", str(RONDE / "werker-5-armen-over-elkaar.png"), "--crop", str(HIER / "versie-5-crop.png")],
                   capture_output=True, text=True)
print(f"versie 5: merk {breed:.0f}px breed |",
      " / ".join(l for l in (r.stdout + r.stderr).splitlines() if "karton" not in l))
