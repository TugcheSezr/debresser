#!/usr/bin/env python3
"""Hero-beeld dienstenpagina's: Top Movers-verhuisdozen op een herkenbare plek in Venlo.

Zes varianten, 21:9 op 2K (de dozen dragen tekst, dus geen 1K en geen 4K-herontwerp).
De dozen komen als referentie mee uit de echte Top Movers-fotografie
(topmovers/fotos/2025-12_header-verhuisdozen.jpg), want een verzonnen doosopdruk drift
altijd. Reken op naretoucheren van de opdruk; dat is de bekende route.

Key uit de omgeving: GEMINI_API_KEY=... python3 gen_hero.py
"""
import base64, json, os, sys, time, pathlib
import urllib.request

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
PROPS = pathlib.Path.home() / ".claude/skills/foto-optimalisatie/objecten"


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


# ---- ANKER: wat er absoluut moet kloppen -----------------------------------
ANKER = (
"ABSOLUTE RULE 1, THE BOXES: the moving boxes are EXACTLY the Top Movers boxes in the FIRST "
"attached reference image. Tan kraft corrugated cardboard. Along the left and right vertical edge "
"of every face runs a cluster of small hexagons in muted teal-green and warm yellow, like a "
"honeycomb. Centred on the large face is the lockup: the word TOP in heavy dark-grey uppercase on "
"the top line, the word MOVERS in heavy dark-grey uppercase on the line below and slightly to the "
"right, a small yellow cartoon bee with a dark-grey striped body hovering at the top right of TOP, "
"and one teal-green curved swoosh that sweeps under TOP and ends in an arrow point to the right of "
"MOVERS. Under that, two short lines of small bold dark-grey text. NEVER stack the wordmark "
"differently, NEVER invent other logos or brand names, NEVER leave the cardboard plain and "
"unprinted, NEVER print the whole box dark, NEVER add arrows-up symbols or writing lines or "
"handwritten room labels. "
"ABSOLUTE RULE 2, NO OTHER TEXT: any shop sign, poster, banner, menu board or licence plate in the "
"background is out of focus and unreadable. No text is added anywhere over the photograph. "
"ABSOLUTE RULE 3, THE BOXES ARE ALWAYS UPRIGHT, stacked squarely on their bottom, never lying on "
"a side, never tilted, never wrapped in film and never held together with straps, ropes or tape "
"bands. They are real moving-box size, roughly 48 by 32 by 36 centimetres, clean, at most one "
"light scuff. "
)

VAK = (
"Trade rules: if a hand truck is in shot it is the unbranded aluminium hand truck of the SECOND "
"attached reference, plate under the load, upright, nobody standing on it. If a mover is in shot he "
"is seen from behind or in three-quarter from a distance, his face is never turned to the camera, "
"he carries with his belly toward the load and his arms in front of his body, never with a box on "
"his shoulder or his back to the load. He wears plain dark workwear without any readable logo. No "
"earbuds. "
)

LICHT = (
"Light: one dominant source, a low early-morning sun coming from the right, raking across the "
"scene and throwing long soft-edged shadows; mixed white balance, warm 3000K sunlight on the brick "
"against cool 6000K blue shade in the doorways; a few specular highlights on wet cobblestones are "
"allowed to clip. Not flat, not evenly lit. "
)

CAMERA = (
"Camera: 35mm documentary photograph from chest height, aperture f/8 so the architecture stays "
"legible, 1/125s, slight handheld tilt, natural perspective from standing distance, no drone view, "
"no fisheye. "
)

IMPERFECT = (
"Imperfect framing on purpose: something ordinary is half in the way, a bicycle leaning at the very "
"edge of the frame, a bollard cut off by the border, a puddle and a few fallen leaves on the "
"pavement. Not tidied up, not symmetrical, not a postcard. "
)

AFWERKING = (
"Real photograph, not an illustration, not 3D, not a render, not a painting. Visible sensor noise, "
"true-to-life muted Dutch daylight colour, no HDR, no teal-and-orange grading, no glossy plastic "
"look, no magazine perfection. Netherlands, not America: Dutch brickwork, Dutch street furniture, "
"Dutch bicycles, yellow Dutch licence plates but unreadable. "
)

KADER = (
"Composition for a website banner: the frame is very wide and will be cropped to a shallow "
"horizontal band, so keep everything that matters in the middle band of the height. The LEFT THIRD "
"of the frame stays calm, darker and low in detail because a white headline is placed there later; "
"put the stack of Top Movers boxes and the visual interest in the RIGHT HALF, large enough that the "
"printed lockup on the front box is clearly readable. "
)

NEG = (
"Avoid: any text overlay, watermark, logo of another brand, straps or ropes around the boxes, "
"plastic wrap, pallets, boxes lying flat, cartoon or CGI look, plastic skin, HDR halos, faces "
"looking into the lens, American houses or road signs, snow. "
)

SCENES = [
 ("a1-markt-stadhuis",
  "Scene: the Markt square in the old centre of Venlo, Netherlands, early morning, almost empty. "
  "Behind the boxes stands the historic Venlo city hall: a late-sixteenth-century Renaissance "
  "building in warm red brick with pale sandstone banding, a tall decorated stepped gable in the "
  "middle, two slender square corner towers each capped with a grey slate onion dome and a small "
  "golden weathervane, and a wide double outdoor staircase leading to the front door. In the right "
  "half of the frame a neat stack of four Top Movers moving boxes stands on the cobblestones next to "
  "an unbranded aluminium hand truck."),
 ("a2-markt-verhuizer",
  "Scene: the same Markt square in Venlo with the red-brick Renaissance city hall with its stepped "
  "gable and two onion-domed corner towers behind. In the right half a mover in plain dark workwear, "
  "seen from behind, wheels a hand truck stacked with three Top Movers moving boxes across the "
  "cobbles toward an old town house door; his face is not visible. Soft morning light, long shadows."),
 ("b1-maasboulevard",
  "Scene: the Maasboulevard quay in Venlo along the river Maas, early morning, the wide grey-green "
  "river on the left and the long steel arch road bridge over the Maas in the far background. In the "
  "right half a stack of four Top Movers moving boxes stands on the stone quay beside an unbranded "
  "aluminium hand truck, with the brick quayside houses of Venlo catching the low sun behind them."),
 ("c1-oude-binnenstad",
  "Scene: a narrow old shopping street in the historic centre of Venlo with Dutch stepped-gable and "
  "bell-gable brick facades on both sides, and the tall brick tower of the medieval Saint Martin "
  "church rising above the rooftops in the background. In the right half a stack of Top Movers moving "
  "boxes on the pavement next to a doorway, an unbranded hand truck leaning against the wall."),
 ("d1-markt-avondlicht",
  "Scene: the Markt in Venlo late on a golden afternoon, warm low sun grazing the red brick of the "
  "Renaissance city hall with its stepped gable and two onion-domed towers. On the right the open "
  "tailgate of a plain white moving truck, with Top Movers moving boxes stacked on the cobbles beside "
  "it, long shadows stretching to the left across the square."),
 ("e1-q4-kade",
  "Scene: the modern Q4 quarter of Venlo on the Maas waterfront, contemporary Dutch brick "
  "architecture with steep zinc roofs and tall narrow windows along a stone quay, the river on one "
  "side. In the right half a stack of four Top Movers moving boxes on the quay beside an unbranded "
  "aluminium hand truck, soft morning light from the right."),
]

REFS = [HIER / "ref-dozen.jpg", PROPS / "steekwagen.png"]


def gen(naam, scene):
    parts = [{"inlineData": {"mimeType": "image/jpeg" if p.suffix in (".jpg", ".jpeg") else "image/png",
                             "data": b64(p)}} for p in REFS]
    parts.append({"text": ANKER + VAK + scene + " " + KADER + LICHT + CAMERA + IMPERFECT + AFWERKING + NEG})
    body = json.dumps({
        "contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["IMAGE"],
                             "imageConfig": {"aspectRatio": "21:9", "imageSize": "2K"}},
    }).encode()
    for poging in (1, 2, 3):
        try:
            req = urllib.request.Request(URL, data=body,
                                         headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
            with urllib.request.urlopen(req, timeout=300) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    uit = HIER / f"{naam}.png"
                    uit.write_bytes(base64.b64decode(p["inlineData"]["data"]))
                    print(f"  {naam}: {uit.stat().st_size // 1024} kB")
                    return True
            print(f"  {naam}: geen beeld in antwoord ({json.dumps(d)[:200]})")
        except Exception as e:
            print(f"  {naam}: poging {poging} faalt: {str(e)[:200]}")
            time.sleep(4 * poging)
    return False


if __name__ == "__main__":
    kies = sys.argv[1:] or [n for n, _ in SCENES]
    for naam, scene in SCENES:
        if naam in kies:
            gen(naam, scene)
