#!/usr/bin/env python3
"""NBP-edit op de drie gekozen platen waar merktekst verhaspeld is.

Route uit de skill: een edit met het viercontract (CHANGE ONLY / PRESERVE / MATCH / AVOID) en daarna
alleen de gewijzigde regio terug op de bron compositen, want NBP hertekent bij een edit het hele vlak
subtiel. Het compositen zit in composit.py; dit script levert alleen de edits in edit/.

GEMINI_API_KEY=... python3 retouche_nbp.py [id ...]
"""
import base64, json, os, sys, time, pathlib
import urllib.request
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
RAW = HIER / "raw"
EDIT = HIER / "edit"
DOZEN = HIER.parent / "hero-venlo/ref-dozen.jpg"
POLO = HIER / "refs/ref-polo.jpg"

MATCH = (
" MATCH the existing perspective, light direction, shadow softness, colour temperature, sensor grain "
"and depth of field of the photo being edited exactly, so the change looks like it was always part of "
"the photograph. Real photograph, no HDR, no relighting, no sharpening."
)
AVOID = (
" AVOID: moving, resizing or restacking anything; changing the room, the furniture, the floor or the "
"light; adding any text, logo, seal or badge anywhere; tape, straps or film on a box; a changed camera "
"position."
)

TAKEN = {
 "doz1-stapel-woonkamer": dict(refs=[DOZEN], tekst=(
   "You are editing the FIRST attached photo, a real photograph of stacked Top Movers moving boxes in "
   "an empty room. The SECOND attached image shows how the real boxes are printed. "
   "CHANGE ONLY the printed lettering on the boxes, nothing else. Every small dark rounded label on a "
   "box reads exactly 'Max. 20 kg' in white, spelled M-a-x, then a full stop, then 20, then k-g, and "
   "every label on every box carries that same weight. Every wordmark reads exactly TOP on the top line "
   "and MOVERS on the line below, spelled M-O-V-E-R-S with six letters, never MOV6RS or any other "
   "variation. The two small lines under a wordmark read 'Aangesloten BIJ erkende verhuizers' where "
   "they are large enough to be legible, and stay soft where they are small. "
   "PRESERVE everything else pixel for pixel: the position, size and stacking of every box, the "
   "honeycomb hexagons, the bee, the teal swoosh, the hand holes, the hand truck, the herringbone "
   "floor, the windows, the radiator, the shoes and the long shadows.")),

 "doz2-bezorging-voordeur": dict(refs=[DOZEN], tekst=(
   "You are editing the FIRST attached photo, a real photograph of a mover wheeling Top Movers moving "
   "boxes on a hand truck to a front door. The SECOND attached image shows how the real boxes are "
   "printed. "
   "CHANGE ONLY the printed lettering on the boxes, nothing else. Every small dark rounded label on a "
   "box reads exactly 'Max. 20 kg' in white, spelled M-a-x, then a full stop, then 20, then k-g. Every "
   "wordmark reads exactly TOP on the top line and MOVERS on the line below. The two small lines under "
   "a wordmark read 'Aangesloten BIJ erkende verhuizers' where they are large enough to be legible, and "
   "stay soft where they are small. "
   "PRESERVE everything else pixel for pixel: both men, their faces, their posture, the charcoal polo "
   "and its chest print, the hand truck, the brickwork, the front door, the bicycle and the pavement.")),

 "m32-adviseur-woonkamer": dict(refs=[POLO], tekst=(
   "You are editing the FIRST attached photo, a real photograph of a moving consultant with a customer "
   "in a living room. The SECOND attached image shows the real chest print on the company polo, "
   "photographed close up. "
   "CHANGE ONLY the chest print on the charcoal polo of the man on the right, nothing else. It reads "
   "the word TOP in white heavy uppercase on the top line and the word MOVERS in white heavy uppercase "
   "on the line below and slightly to the right, spelled M-O-V-E-R-S, with one teal-green swoosh "
   "sweeping under TOP and ending in an arrow point to the right of MOVERS. No bee on the shirt. The "
   "print is crisp and correctly spelled at this size, sits on the left chest, appears exactly once, "
   "and is never mirrored. "
   "PRESERVE everything else pixel for pixel: both faces, the glasses, the tablet, the customer's blue "
   "jumper and his pointing hand, the sofa, the bookcase, the plants, the dining table, the window "
   "light and the door frame in the foreground.")),

 "chk1-keukentafel-planning": dict(refs=[], tekst=(
   "You are editing the FIRST attached photo, a real photograph of a woman at her kitchen table going "
   "through a moving checklist. "
   "CHANGE ONLY the printed sheet of paper lying on the table, nothing else. The sheet carries NO words, "
   "NO heading and NO letters at all: it shows only a column of empty square checkboxes down its right "
   "side and, next to each box, a plain horizontal ruled line in light grey where a written line would "
   "go, plus three or four of those boxes already ticked with a blue pen. It must look like an ordinary "
   "printed list seen from the wrong side of the table, at a shallow angle and slightly out of focus, so "
   "that no single word can be made out anywhere on it. "
   "PRESERVE everything else pixel for pixel: the woman, her face, her hair, her jumper, both hands, the "
   "pen and the way she holds it, her ring, the wooden table, the laptop, the mug of coffee, the moving "
   "boxes on the floor, the kitchen behind her and all the light.")),

 "m31-laadbak-vol": dict(refs=[DOZEN], tekst=(
   "You are editing the FIRST attached photo, a real photograph looking into the loading box of a moving "
   "truck filled with Top Movers boxes. The SECOND attached image shows how the real boxes are printed. "
   "CHANGE ONLY the printed lettering on the boxes, nothing else. On every box where the two small lines "
   "under the wordmark are visible they read exactly 'Aangesloten BIJ erkende verhuizers', with BIJ in "
   "yellow and the rest in dark grey, correctly spelled; where a box is too far back or too dark for that "
   "to be legible the two lines are soft and out of focus rather than made up of wrong letters. Every "
   "small dark rounded label reads exactly 'Max. 20 kg' in white, never 26 or any other number. Every "
   "wordmark reads TOP on the top line and MOVERS on the line below. "
   "PRESERVE everything else pixel for pixel: the position and stacking of every single box, the "
   "honeycomb hexagons, the bees, the teal swooshes, the hand holes, the grey blanket-wrapped furniture "
   "on both sides, the wooden floor of the loading box, the tail lift, the rear lights and the daylight "
   "falling off into the dark depth of the truck.")),
}


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


def mime(p):
    return "image/jpeg" if pathlib.Path(p).suffix in (".jpg", ".jpeg") else "image/png"


def edit(item):
    naam, t = item
    bron = RAW / f"{naam}.png"
    parts = [{"inlineData": {"mimeType": "image/png", "data": b64(bron)}}]
    parts += [{"inlineData": {"mimeType": mime(r), "data": b64(r)}} for r in t["refs"]]
    parts.append({"text": t["tekst"] + MATCH + AVOID})
    body = json.dumps({"contents": [{"parts": parts}],
                       "generationConfig": {"responseModalities": ["IMAGE"],
                                            "imageConfig": {"aspectRatio": "2:3", "imageSize": "2K"}}}).encode()
    for poging in (1, 2, 3):
        try:
            req = urllib.request.Request(URL, data=body,
                                         headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
            with urllib.request.urlopen(req, timeout=300) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    uit = EDIT / f"{naam}.png"
                    uit.write_bytes(base64.b64decode(p["inlineData"]["data"]))
                    return f"  {naam}: {uit.stat().st_size // 1024} kB"
            return f"  {naam}: GEEN BEELD {json.dumps(d)[:200]}"
        except Exception as e:
            if poging == 3:
                return f"  {naam}: FAALT {str(e)[:200]}"
            time.sleep(5 * poging)


if __name__ == "__main__":
    EDIT.mkdir(exist_ok=True)
    wens = sys.argv[1:]
    todo = [(n, t) for n, t in TAKEN.items() if not wens or any(n.startswith(w) for w in wens)]
    print(f"{len(todo)} edits", flush=True)
    with ThreadPoolExecutor(max_workers=3) as ex:
        for r in ex.map(edit, todo):
            print(r, flush=True)
