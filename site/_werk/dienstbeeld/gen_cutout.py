#!/usr/bin/env python3
"""Cutout voor de vacaturepagina: verhuizers vrijstaand op magenta, om naast de kop te zetten.

Route uit /foto-optimalisatie stap 2 (cutout-generaties): chroma magenta #FF00FF, geen witte outline
meevragen, figuren binnen 75 procent van de breedte, brede marge aan alle vier de randen, knieen en
hoger. Uitknippen daarna met macOS Vision (_werk/cutout.py) plus decontaminatie.

GEMINI_API_KEY=... python3 gen_cutout.py [id ...]
"""
import base64, json, os, sys, time, pathlib
import urllib.request
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
UIT = HIER / "cutout"
SKILL = pathlib.Path.home() / ".claude/skills/foto-optimalisatie"
sys.path.insert(0, str(HIER))
os.environ.setdefault("GEMINI_API_KEY", KEY)
from gen_dienst import DOOS, TEKST, VAK, UNIFORM, KLEUR, AFWERKING, DOZEN, POLO, kop, K, KOPPEN, b64

MAGENTA = (
"BACKGROUND, ABSOLUTE: the entire background is one flat, even chroma-key magenta (#FF00FF), edge to "
"edge, nothing else. No floor, no shadow on the background, no studio backdrop, no seamless paper, no "
"cyclorama, no light grey or cream wall, no lighter rectangle or panel behind anyone, no gradient, no "
"vignette. The magenta touches the outline of every person and every object directly, including in the "
"gaps between two people and between an arm and the body. No white or light outline around anyone. "
)

KADER = (
"Framing for a cut-out figure: the people are shown from the KNEES up and together fill at most 75 "
"percent of the frame width, with a broad empty magenta margin on all four sides. No body part, no "
"elbow, no box and no piece of equipment comes near any border. The group is built in depth: different "
"heights, a little overlap, uneven spacing, never a straight row. "
)

LICHT = (
"Light: soft directional daylight from the upper left as one dominant source, colour temperature around "
"5600K, soft-edged shadows on the people themselves, no shadow falling on the background. Faces are lit "
"but not flat: each face sits half on its own shadow side. "
)

CAMERA = (
"Camera: 50mm at chest height from about three metres, f/5.6, the whole group sharp, real photograph. "
)

NEG = (
"Avoid: any background other than flat magenta; a shadow or gradient on the background; a white or light "
"outline around a person; tape, straps or writing on a box; a wide grin showing teeth; anyone looking "
"into the lens except where the scene says so; waxy or plastic skin; red blotches; extra logos; text "
"overlay; cartoon or CGI look. "
)

SCENES = {
 "vac-duo-doos": (
   f"Scene: two movers of De Kievit stand together as if pausing between two runs. On the left "
   f"{KOPPEN[K['12']]} holds a closed Top Movers box against his belly with both arms in front of his "
   f"body, his face turned three-quarter toward his colleague with a calm content expression, mouth "
   f"closed. On the right, half a step behind and clearly taller, {KOPPEN[K['09']]} rests one hand on "
   f"the aluminium hand truck beside him and looks at the box. Both wear the charcoal Top Movers polo. "
   f"The two face references are the LAST TWO attached images, in the order the two men are named. ",
   [DOZEN, POLO, SKILL / "objecten/steekwagen.png", kop(K['12']), kop(K['09'])]),
 "vac-trio-team": (
   f"Scene: three movers of De Kievit stand as a working team, not posed. In front {KOPPEN[K['18']]} "
   f"carries a closed Top Movers box against his belly, looking down at it. Behind him to the left "
   f"{KOPPEN[K['05']]}, older and a head shorter, carries a folded grey moving blanket over one forearm "
   f"and looks toward the younger man. To the right and half a step back {KOPPEN[K['16']]} holds the "
   f"aluminium hand truck upright. All three wear the charcoal Top Movers polo, mouths closed, calm and "
   f"content, nobody looking into the lens. The three face references are the LAST THREE attached "
   f"images, in the order the three men are named. ",
   [DOZEN, POLO, SKILL / "objecten/steekwagen.png", kop(K['18']), kop(K['05']), kop(K['16'])]),
 "vac-duo-lachend": (
   f"Scene: two movers of De Kievit side by side, the way colleagues stand when the job went well. On "
   f"the left {KOPPEN[K['02']]} has one hand on the shoulder of his colleague and looks at him with a "
   f"light closed-mouth smile. On the right {KOPPEN[K['15']]}, younger and a little taller, holds a "
   f"closed Top Movers box against his belly and looks toward the camera's left, not into the lens. "
   f"Both wear the charcoal Top Movers polo. The two face references are the LAST TWO attached images, "
   f"in the order the two men are named. ",
   [DOZEN, POLO, kop(K['02']), kop(K['15'])]),
 "vac-solo-steekwagen": (
   f"Scene: one mover of De Kievit, {KOPPEN[K['11']]}, stands behind the aluminium hand truck loaded "
   f"with three Top Movers boxes, both hands on the grips, the plate under the load, the hand truck "
   f"upright. He looks at the boxes with a calm content expression, mouth closed. He wears the charcoal "
   f"Top Movers polo. The face reference is the LAST attached image. ",
   [DOZEN, POLO, SKILL / "objecten/steekwagen.png", kop(K['11'])]),
}


def gen(item):
    naam, (tekst, refs) = item
    uit = UIT / f"{naam}.png"
    prompt = DOOS + TEKST + KLEUR + VAK + UNIFORM + tekst + MAGENTA + KADER + LICHT + CAMERA + AFWERKING + NEG
    parts = [{"inlineData": {"mimeType": "image/jpeg" if p.suffix in (".jpg", ".jpeg") else "image/png",
                             "data": b64(p)}} for p in refs]
    parts.append({"text": prompt})
    body = json.dumps({"contents": [{"parts": parts}],
                       "generationConfig": {"responseModalities": ["IMAGE"],
                                            "imageConfig": {"aspectRatio": "4:3", "imageSize": "2K"}}}).encode()
    for poging in (1, 2, 3):
        try:
            req = urllib.request.Request(URL, data=body,
                                         headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
            with urllib.request.urlopen(req, timeout=300) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    uit.write_bytes(base64.b64decode(p["inlineData"]["data"]))
                    return f"  {naam}: {uit.stat().st_size // 1024} kB"
            return f"  {naam}: GEEN BEELD {json.dumps(d)[:200]}"
        except Exception as e:
            if poging == 3:
                return f"  {naam}: FAALT {str(e)[:200]}"
            time.sleep(6 * poging)


if __name__ == "__main__":
    UIT.mkdir(exist_ok=True)
    wens = sys.argv[1:]
    todo = [(n, s) for n, s in SCENES.items() if not wens or any(n.startswith(w) for w in wens)]
    print(f"{len(todo)} cutout-generaties, {MODEL}, 4:3 op 2K", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        for r in ex.map(gen, todo):
            print(r, flush=True)
