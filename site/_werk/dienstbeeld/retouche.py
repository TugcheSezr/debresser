#!/usr/bin/env python3
"""NBP-edit met het viercontract, daarna alleen de gewijzigde regio (binnen vaste dozen) terug op de
bron compositen: edit/<id>.png -> klaar/<id>.png. Patroon van _werk/paginabeeld/retouche_nbp.py + composit.py.

GEMINI_API_KEY=... python3 retouche.py [id ...]
"""
import base64, json, os, sys, time, pathlib
import urllib.request
import numpy as np
from PIL import Image, ImageFilter

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
RAW, EDIT, KLAAR = HIER / "raw", HIER / "edit", HIER / "klaar"
WAGEN = HIER / "refs/ref-wagen.jpg"
LOGO = HIER / "refs/ref-logo.jpg"
POLO = HIER.parent / "paginabeeld/refs/ref-polo.jpg"
DOZEN = HIER.parent / "hero-venlo/ref-dozen.jpg"

MATCH = (" MATCH the existing perspective, light direction, shadow softness, colour temperature, sensor grain "
         "and depth of field of the photo being edited exactly, so the change looks like it was always part of "
         "the photograph. Real photograph, no HDR, no relighting, no sharpening.")
AVOID = (" AVOID: moving, resizing or restacking anything; changing people, faces, vehicles, rooms or light; "
         "adding any text, logo, seal or badge anywhere; tape, straps or film; a changed camera position.")

# id -> refs, tekst, dozen (lijst van (x0,y0,x1,y1) in bron-coordinaten waar de edit mag doorwerken)
TAKEN = {
 "sen3-fauteuil-bungalow": dict(refs=[], dozen=[(600, 1050, 880, 1320)], vol=True, tekst=(
   "You are editing the FIRST attached photo, a real photograph of two movers carrying an armchair out "
   "of a bungalow. CHANGE ONLY the back of the charcoal polo of the mover on the left, the one seen from "
   "behind: the large printed wordmark between his shoulder blades disappears completely, leaving plain "
   "charcoal pique fabric with the same folds, creases and light as the rest of his shirt. PRESERVE "
   "everything else pixel for pixel: both men, the armchair in its grey blanket, the elderly man, the "
   "bungalow, the truck and the light.")),
 "par4-voordeur-nieuw-huis": dict(refs=[POLO], dozen=[(1065, 1145, 1235, 1275)], vol=True, tekst=(
   "You are editing the FIRST attached photo, a real photograph of a mover carrying a box to a front "
   "door. The SECOND attached image shows the real chest print on the company polo. CHANGE ONLY the "
   "printing on his charcoal polo: the print that now sits on his RIGHT chest disappears into plain "
   "charcoal fabric, and on his LEFT chest appears the correct print, the word TOP in white heavy "
   "uppercase with the word MOVERS in white heavy uppercase on the line below and slightly to the right, "
   "and one teal-green swoosh sweeping under the words and ending in an arrow point right of MOVERS. "
   "PRESERVE everything else pixel for pixel: his face, his arms, the box he carries and its printing, "
   "the couple in the doorway, the brickwork and the light.")),
 "mon5-handen-scharnier": dict(refs=[], dozen=[(1440, 300, 1650, 530)], vol=True, tekst=(
   "You are editing the FIRST attached photo, a close view of hands fitting a hinge on a cupboard door. "
   "CHANGE ONLY the charcoal polo visible at the right edge of the frame: the small printed mark on the "
   "chest disappears completely, leaving plain charcoal pique fabric with the same folds and light. "
   "PRESERVE everything else pixel for pixel: both hands, the hinge, the screwdriver, the toolbox, the "
   "blanket, the box in the background and all the light.")),
 "mon1-bed-demonteren": dict(refs=[], dozen=[(520, 1520, 840, 1940)], tekst=(
   "You are editing the FIRST attached photo, a real photograph of a mover taking a bed apart with a "
   "cordless drill. CHANGE ONLY the lettering on the drill: the brand name on the body of the drill and "
   "the small lettering on its battery disappear, leaving plain unmarked plastic in the same colours "
   "with the same reflections. PRESERVE everything else pixel for pixel: his hands, his face, the polo "
   "and its chest print, the bed frame, the mattress and the light.")),
 # int3 teruggedraaid: het vak zat op de polo in plaats van op de laptop en verhaspelde de
 # borstprint (TOP POVES). Het Apple-logo op de laptopdeksel is klein en blijft staan.
 "ant7-kunstkist-grachtenpand-wagen": dict(refs=[], dozen=[(1160, 590, 1320, 860), (1240, 880, 1330, 960), (840, 980, 900, 1035)], tekst=(
   "You are editing the FIRST attached photo, a real photograph of two movers wheeling a plywood art "
   "crate to a moving truck. CHANGE ONLY three things: (1) the blue and orange straps hanging on the "
   "lashing rail inside the cargo bay disappear, leaving the plain pale cargo wall and its rail; (2) the "
   "small white sticker on the top right of the plywood crate disappears into plain plywood; (3) the "
   "small white sticker on the left of the crate behind the arm disappears into plain plywood. PRESERVE "
   "everything else pixel for pixel: both movers, the crate, the dolly, the truck and its lettering, the "
   "canal house, the bicycle and the light.")),
 "pia7-piano-straat-wagen": dict(refs=[], dozen=[(1560, 470, 1760, 900), (1900, 560, 2180, 900)], tekst=(
   "You are editing the FIRST attached photo, a real photograph of two movers rolling a blanket-wrapped "
   "upright piano to a moving truck. CHANGE ONLY the inside of the cargo bay: the orange and blue "
   "lashing straps against the left inner wall disappear, leaving the plain pale wall with its rail, and "
   "the green strap lying diagonally over the rolling container on the right disappears, leaving the "
   "container as it is. PRESERVE everything else pixel for pixel: both movers, the piano and its "
   "blanket, the dolly, the truck and its lettering, the street and the light.")),
 "int4-laadbak-vol-lange-rit": dict(refs=[], dozen=[(170, 1040, 270, 1130), (170, 1600, 270, 1700), (1290, 860, 1370, 1010)], tekst=(
   "You are editing the FIRST attached photo, a real photograph looking into a loaded moving truck. "
   "CHANGE ONLY the strips of packing tape stuck on the grey moving blankets: each strip disappears, "
   "leaving the grey blanket fabric continuous with the same weave, folds and light. PRESERVE everything "
   "else pixel for pixel: the mover, the boxes and their printing, the blankets themselves, the bicycle, "
   "the truck and the daylight.")),
}


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


def edit(naam, t):
    bron = RAW / f"{naam}.png"
    im = Image.open(bron); ar = "3:2" if im.width > im.height else "2:3"
    parts = [{"inlineData": {"mimeType": "image/png", "data": b64(bron)}}]
    parts += [{"inlineData": {"mimeType": "image/jpeg" if r.suffix == ".jpg" else "image/png", "data": b64(r)}} for r in t["refs"]]
    parts.append({"text": t["tekst"] + MATCH + AVOID})
    body = json.dumps({"contents": [{"parts": parts}],
                       "generationConfig": {"responseModalities": ["IMAGE"],
                                            "imageConfig": {"aspectRatio": ar, "imageSize": "2K"}}}).encode()
    for poging in (1, 2, 3):
        try:
            req = urllib.request.Request(URL, data=body, headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
            with urllib.request.urlopen(req, timeout=300) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    (EDIT / f"{naam}.png").write_bytes(base64.b64decode(p["inlineData"]["data"]))
                    return True
            print(f"  {naam}: GEEN BEELD {json.dumps(d)[:200]}"); return False
        except Exception as e:
            if poging == 3:
                print(f"  {naam}: FAALT {str(e)[:200]}"); return False
            time.sleep(5 * poging)


def composit(naam, dozen, drempel=25, vol=False):
    """vol=True neemt het hele vak over (nodig als er anders een spookbeeld van de oude opdruk
    blijft staan: de diff-drempel laat juist de lichtste pixels van een print staan)."""
    raw = Image.open(RAW / f"{naam}.png").convert("RGB")
    ed = Image.open(EDIT / f"{naam}.png").convert("RGB").resize(raw.size, Image.LANCZOS)
    a, b = np.asarray(raw, int), np.asarray(ed, int)
    verschil = np.abs(a - b).max(2) > drempel
    binnen = np.zeros(verschil.shape, bool)
    for x0, y0, x1, y1 in dozen:
        binnen[y0:y1, x0:x1] = True
    if vol:
        m = Image.fromarray(binnen.astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(14))
    else:
        m = Image.fromarray((verschil & binnen).astype(np.uint8) * 255)
        m = m.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(4))
    mf = np.asarray(m, float)[..., None] / 255.0
    uit = (a * (1 - mf) + b * mf).round().clip(0, 255).astype(np.uint8)
    Image.fromarray(uit).save(KLAAR / f"{naam}.png")
    return (np.asarray(m) > 8).mean() * 100


if __name__ == "__main__":
    EDIT.mkdir(exist_ok=True); KLAAR.mkdir(exist_ok=True)
    wens = sys.argv[1:]
    for naam, t in TAKEN.items():
        if wens and not any(naam.startswith(w) for w in wens):
            continue
        if edit(naam, t):
            print(f"  {naam}: {composit(naam, t['dozen'], vol=t.get('vol', False)):.2f}% van het beeld uit de edit", flush=True)
