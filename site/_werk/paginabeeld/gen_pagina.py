#!/usr/bin/env python3
"""Beeld voor de vier 'Zelf voorbereiden'-pagina's: 5 kandidaten per pagina, 20 in totaal.

Waarom staand (2:3): het fotovak op deze pagina's is `.blok__foto` en dat vak REKT MEE met de
tekstkolom. Gemeten op de devserver (127.0.0.1:4740): inpaktips 479x736 op 1440px, 403x788 op
1000px, 307x384 op 390px; m3-calculator 524x917 / 435x955 / 358x448. Dus ratio 0,46 tot 0,80 en
nergens liggend. De liggende dienstfoto's (1120x641) die er nu staan verliezen daar ruim 60% van
hun breedte. 2:3 = 0,667 zit midden in het gemeten bereik.

Route: generatief (skill /foto-optimalisatie, stap 0 route B+). De dozen dragen leesbare merktekst,
dus ze komen als EERSTE referentie mee uit de echte fotografie en de kleine regels onder het
woordmerk worden bewust onscherp gevraagd; reken op naretoucheren, dat is de bekende route.
Gezichten alleen uit de mixbibliotheek (kop-01 t/m 19, akkoord ligt er); in alle andere scenes
staan mensen van achteren, in driekwart of buiten beeld gesneden.

Key uit de omgeving:  GEMINI_API_KEY=... python3 gen_pagina.py [id ...]
"""
import base64, json, os, sys, time, pathlib
import urllib.request
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
UIT = HIER / "raw"
SKILL = pathlib.Path.home() / ".claude/skills/foto-optimalisatie"
DOZEN = HIER.parent / "hero-venlo/ref-dozen.jpg"
POLO = HIER / "refs/ref-polo.jpg"
STEEKWAGEN = SKILL / "objecten/steekwagen.png"


def kop(naam):
    return SKILL / "gezichten-mix" / f"{naam}@4x.png"


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


# ---- ANKER: de doos. Overgenomen uit _werk/hero-venlo/gen_hero.py, dat werkte. ------------
DOOS = (
"ABSOLUTE RULE 1, THE BOXES: every moving box is EXACTLY the Top Movers box in the FIRST attached "
"reference image. Tan kraft corrugated cardboard. Along the left and right vertical edge of every "
"face runs a cluster of small hexagons in muted teal-green and warm yellow, like a honeycomb. "
"Centred on the large face is the lockup: the word TOP in heavy dark-grey uppercase on the top "
"line, the word MOVERS in heavy dark-grey uppercase on the line below and slightly to the right, a "
"small yellow cartoon bee with a dark-grey striped body hovering at the top right of TOP, and one "
"teal-green curved swoosh that sweeps under TOP and ends in an arrow point to the right of MOVERS. "
"Under that sit two short lines of small dark-grey text, kept small and slightly soft so they read "
"as a printed line rather than as sharp lettering. NEVER stack the wordmark differently, NEVER "
"invent another logo or brand name, NEVER leave the cardboard plain and unprinted, NEVER print the "
"whole box dark, NEVER add arrow-up symbols, writing lines or printed room labels. "
"ABSOLUTE RULE 2, NO TAPE ANYWHERE: these boxes close with interlocking folded flaps, a "
"self-closing lid, and they have oval hand holes in the two short sides. There is NEVER a strip of "
"tape over the seam, never tape over the printed name, never a tape dispenser, never rope, strap, "
"stretch film or string around a box. Boxes stand upright and square on their bottom, never lying "
"on a side, never tilted. They are real moving-box size, roughly 48 by 32 by 36 centimetres, clean, "
"at most one light scuff. "
"ABSOLUTE RULE 3, NO OTHER TEXT: no certification logo, no seal, no membership badge, no other "
"company name, no sustainability claim anywhere in frame. Any sign, poster, screen, phone display, "
"newspaper, printed sheet, list or document is seen at a shallow angle or slightly out of focus, so "
"that it reads as a page with lines on it and no single word can be made out. No text is added over "
"the photograph. "
)

VAK = (
"Trade rules that must hold. Anyone carrying something carries it with the belly TOWARD the load "
"and both arms in FRONT of the body; never with the back to the load, never a box or a piece of "
"furniture on a shoulder or on the back. A box is set down upright on its bottom, never slid in "
"lying on its side. If a hand truck is in shot it is the plain unbranded aluminium hand truck of "
"the attached hand-truck reference, its plate under the load, standing upright, nobody standing on "
"it. Nobody is measuring anything with a tape measure. Rooms, stairwells and facades are clean and "
"well kept. No earbuds in anyone's ears. "
)

UNIFORM = (
"THE MOVER'S UNIFORM: a plain charcoal-grey pique POLO shirt exactly like the attached polo "
"reference, with the Top Movers chest print on the left chest: the word TOP in white heavy "
"uppercase, MOVERS in white heavy uppercase on the line under it and slightly to the right, and one "
"teal-green swoosh sweeping under TOP and ending in an arrow point to the right of MOVERS. No bee "
"on the shirt. The print appears exactly ONCE on the whole outfit, never mirrored, never on the "
"back, never stacked differently. Charcoal work trousers. No other logo, no hi-vis, no cap. "
)

KLANT = (
"THE CUSTOMER wears ordinary everyday home clothing, never workwear and never any company shirt: "
"the customer is not staff. "
)

LICHT = (
"Light: one dominant source with a clear direction, daylight falling in through a window on one "
"side, mixed white balance with warm 3000K interior light against cool 5800K daylight, soft-edged "
"shadows with real falloff into the corners of the room, a few specular highlights allowed to clip. "
"Faces are never evenly lit: the face sits on its own shadow side or just beside the pool of light. "
"Not flat, not evenly lit, not studio. "
)

CAMERA = (
"Camera: documentary photograph at 35mm from standing chest height, aperture f/5.6 so the room "
"stays legible, 1/125s, natural handheld framing with a slight tilt, perspective from normal "
"standing distance. No drone view, no fisheye, no tripod-perfect symmetry. "
)

IMPERFECT = (
"Imperfect framing on purpose: something ordinary is half in the way, a door frame darkening one "
"edge, a chair cut off by the border, a coat over a bannister, a pair of shoes on the floor. Lived "
"in, not tidied up for the photograph, not symmetrical, not a magazine interior. "
)

AFWERKING = (
"A real photograph, not an illustration, not 3D, not a render, not a painting. Visible sensor "
"noise, skin with pores and fine lines, true-to-life muted Dutch daylight colour, no HDR, no "
"teal-and-orange grading, no glossy plastic skin, no magazine perfection. The Netherlands, not "
"America: Dutch interiors and window frames, Dutch power sockets, Dutch brickwork outside. "
)

KADER = (
"Composition for a tall PORTRAIT photo on a website: the frame is upright and will be cropped a "
"little narrower and a little taller, so keep the subject in the middle band of the width and leave "
"headroom and floor room. Nobody is cut off at a hand or a foot by the border. "
)

NEG = (
"Avoid: tape, straps, ropes or film on or around any box; a box lying on its side; text overlay, "
"watermark or another brand's logo; certification seals; anyone looking into the lens; a posed row "
"of people; identical grins; relaxed hands under a heavy load; hands pressed against empty air; "
"waxy or plastic skin; red blotches on cheeks; a burning table lamp in daylight; American houses, "
"sockets or road signs; snow; cartoon or CGI look. "
)


def scene(tekst, refs, kader=KADER):
    return dict(tekst=tekst, refs=refs, kader=kader)


# ---------------------------------------------------------------------------- de 20 scenes
SCENES = {

# ------ 1. Verhuischecklist: plannen, overzicht, wat wanneer -------------------------------
"chk1-keukentafel-planning": scene(
    "Scene: a Dutch kitchen table at home in the morning. A woman in her late thirties in an "
    "ordinary sweater sits at the table with a printed moving checklist in front of her, a few "
    "lines already ticked off with a pen, a laptop half closed beside it and a mug of coffee. Her "
    "eyes are on the sheet of paper, her face is turned three-quarters away from the camera and "
    "partly in her own shadow. On the floor next to her chair stand two closed Top Movers moving "
    "boxes. Behind her a kitchen counter with a plant and a tea towel.",
    [DOZEN]),

"chk2-adviseur-opname": scene(
    "Scene: a moving consultant is walking through a customer's living room to take stock. The "
    "consultant, a man in his early fifties with a short grey beard, wears the charcoal Top Movers "
    "polo and holds a tablet on which he is making notes; his face is turned to the bookcase, not "
    "to the camera. Beside him the customer, a woman of about sixty in a cardigan, points at the "
    "tall bookcase they are discussing. They stand a normal step apart, at different heights in the "
    "frame, the consultant slightly behind and to the right. Daylight through the window on the "
    "left. The face reference is the LAST attached image and is the consultant's face.",
    [DOZEN, POLO, kop("kop-14-kalend-grijsbaard-overhemd")]),

"chk3-dozen-labels": scene(
    "Scene: no people. A half packed Dutch living room in the morning. Three Top Movers moving "
    "boxes stand stacked squarely on a wooden floor; on the top box lies a printed checklist with "
    "several lines ticked off and a thick black marker on top of it. On the side of the boxes "
    "someone has written the words KEUKEN and SLAAPKAMER by hand in thick black marker, in real "
    "handwriting, nothing else written anywhere. Behind them a sofa pushed away from the wall, a "
    "rolled up rug and a stripped bookcase. Low morning sun rakes in from a window on the right and "
    "throws long shadows across the floor.",
    [DOZEN]),

"chk4-stel-lijst-hal": scene(
    "Scene: the hallway of a Dutch terraced house on moving day. Two people in their thirties in "
    "ordinary clothes: one of them stands near the front door holding an A4 moving checklist and "
    "reads it, seen in three-quarter from behind so the face is barely visible; the other is "
    "lifting a Top Movers moving box from the floor with the belly toward the box and both arms in "
    "front of the body. A bunch of keys and a roll of packing paper lie on the hall cabinet, coats "
    "on the hooks. Daylight falls in through the glass of the front door and makes a bright pool on "
    "the floor while the two figures stay in the cooler shade.",
    [DOZEN]),

"chk5-zolder-sorteren": scene(
    "Scene: an attic under a sloping roof in a Dutch house, daylight falling steeply through a roof "
    "window. A man of about fifty in an old jumper is sorting: on his left a pile of things that "
    "will go along, on his right a pile that will be given away, and an open Top Movers moving box "
    "in front of him that he is filling. He is crouched, seen in three-quarter from behind, his "
    "face turned down toward the box and mostly out of view. Dust in the beam of light, a few old "
    "suitcases and a bicycle wheel against the knee wall.",
    [DOZEN]),

# ------ 2. Inpaktips: zelf inpakken, per kamer ---------------------------------------------
"inp1-borden-op-kant": scene(
    "Scene: close view of a Dutch kitchen worktop. Two hands, a woman's hands with short nails, are "
    "wrapping a white dinner plate in a sheet of blank white packing paper. Beside the hands stands "
    "an OPEN Top Movers moving box, its four top flaps folded outward, and inside it a row of "
    "already wrapped plates standing UPRIGHT ON THEIR EDGE like records in a rack, never lying "
    "flat. A stack of unwrapped plates and a loose pile of packing paper wait on the worktop. Only "
    "the hands, the forearms and part of the torso are in frame, no face. Daylight from a kitchen "
    "window on the left, the far side of the worktop falling into shadow.",
    [DOZEN]),

"inp2-stift-label": scene(
    "Scene: a hand writing with a thick black marker on the side of a closed Top Movers moving box "
    "that stands on a wooden floor in a living room. The word being written is KEUKEN in ordinary "
    "capital handwriting, and nothing else is written on the box. The top of the box is closed by "
    "its four flaps folded into each other, no tape anywhere. The person is crouching and only the "
    "arm, the shoulder and the edge of the body are in frame, no face. Behind, two more Top Movers "
    "boxes and a half emptied cupboard. Warm afternoon light from the side.",
    [DOZEN]),

"inp3-garderobedoos": scene(
    "Scene: a Dutch bedroom with an open wardrobe. A tall Top Movers wardrobe moving box stands "
    "open on the floor with a metal hanging rail across the top; shirts and a coat hang from it on "
    "their own hangers, still hanging straight. A woman of about forty in ordinary clothes is "
    "lifting two more hangers from the wardrobe into the box, her face turned to the clothes and "
    "away from the camera. On the bed a folded pile of jumpers and a closed Top Movers box. "
    "Daylight through a window with the curtain half drawn.",
    [DOZEN]),

"inp4-glaswerk": scene(
    "Scene: a dining table in a Dutch house, late afternoon light low from the side. Two hands roll "
    "a drinking glass into a sheet of blank white packing paper. Beside them a SMALL Top Movers "
    "moving box, its flaps folded outward, with wrapped glasses standing UPRIGHT inside it and "
    "crumpled paper filling the gaps between them. More glasses wait on the table next to a "
    "half empty crate. Only hands and forearms in frame, no face. The far end of the table falls "
    "into shadow.",
    [DOZEN]),

"inp5-inpakservice": scene(
    "Scene: a professional packer of the moving company at work in a customer's living room. A man "
    "in his late twenties wearing the charcoal Top Movers polo kneels in front of a bookcase and "
    "packs books upright into a small Top Movers moving box on the floor beside him. He is seen in "
    "three-quarter from behind and slightly above; his face is in profile and turned to the books, "
    "never to the camera. Two more closed Top Movers boxes stand behind him. Daylight from a window "
    "on the right, the bookcase side of the room in shadow. The face reference is the LAST attached "
    "image and is the packer's face.",
    [DOZEN, POLO, kop("kop-18-opgeschoren-baard-jong")]),

# ------ 3. Dozencalculator: hoeveel dozen ---------------------------------------------------
"doz1-stapel-woonkamer": scene(
    "Scene: no people. An almost empty, light Dutch living room with a herringbone wooden floor and "
    "tall windows. In the middle of the room stands a neat block of Top Movers moving boxes, about "
    "fifteen of them, stacked three high in a few short stacks, LARGE boxes and clearly SMALLER "
    "boxes mixed so the difference in size is obvious. All of them upright and square, all closed "
    "by their folded flaps. Beside the stack an unbranded aluminium hand truck leaning against the "
    "wall. Morning sun from the left throws the long shadows of the stacks across the floor. A "
    "radiator and a bare picture hook on the wall behind.",
    [DOZEN, STEEKWAGEN]),

"doz2-bezorging-voordeur": scene(
    "Scene: the front door of a Dutch brick terraced house, seen from the pavement. A mover in his "
    "early thirties wearing the charcoal Top Movers polo wheels an unbranded aluminium hand truck "
    "loaded with five Top Movers moving boxes up to the doorstep; he is seen in three-quarter from "
    "behind, his face in profile toward the boxes. In the doorway the customer, a man in ordinary "
    "home clothes, holds the door open and looks at the boxes, not at the camera. A bicycle leans "
    "at the very edge of the frame. Overcast Dutch daylight with one brighter break in the cloud "
    "from the left. The face reference is the LAST attached image and is the mover's face.",
    [DOZEN, POLO, kop("kop-09-krullen-baardje-30er")]),

"doz3-twee-maten": scene(
    "Scene: no people except one hand. Two Top Movers moving boxes stand side by side on a dining "
    "table in the light of a window: one clearly LARGER and one clearly SMALLER, both upright, both "
    "closed by their folded flaps, so the difference between the two sizes is the subject of the "
    "photograph. A hand comes into frame from the right and rests on the smaller box as if about to "
    "lift it. Next to them a thick black marker and a loose stack of blank packing paper. The "
    "background of the room is soft and a little darker.",
    [DOZEN]),

"doz4-dragen-gang": scene(
    "Scene: the hallway and staircase of a Dutch house. A man of about thirty five in ordinary "
    "clothes carries a stack of three Top Movers moving boxes through the hall, holding them with "
    "his belly toward the boxes and both arms in front of his body, his chin just above the top "
    "box. His face is turned down to the load and is half in the shadow of the stairwell; he never "
    "looks at the camera. Behind him the open door of a room with more boxes on the floor. Daylight "
    "from the front door behind him gives him a rim of light along one shoulder.",
    [DOZEN]),

"doz5-tellen-woonkamer": scene(
    "Scene: a Dutch living room halfway through packing. A woman of about thirty stands with her "
    "back three-quarters to the camera, a phone loosely in one hand held down at her side with the "
    "screen turned away and unreadable, and counts the Top Movers moving boxes in front of her; the "
    "other hand points at the stack. About ten boxes stand in loose stacks around her, some closed, "
    "one still open. Her face is turned away toward the boxes. Late afternoon light through the "
    "window puts her in half silhouette against the bright glass.",
    [DOZEN]),

# ------ 4. M3-calculator: volume, wat gaat er mee -------------------------------------------
"m31-laadbak-vol": scene(
    "Scene: no people. The view from the tail lift into the loading box of a plain white moving "
    "truck, half loaded. Furniture wrapped in grey moving blankets is stacked along both sides, and "
    "in the middle a wall of Top Movers moving boxes is stacked squarely almost to the roof, so the "
    "sheer VOLUME is the subject. The tail lift is at the BACK of the truck, lowered, with one more "
    "box standing on it. No lettering anywhere on the truck, no straps or ropes over the boxes. "
    "Daylight comes in from behind the camera and falls off into the dark depth of the loading box.",
    [DOZEN]),

"m32-adviseur-woonkamer": scene(
    "Scene: a moving consultant taking stock in a furnished Dutch living room. A man in his "
    "mid-thirties with glasses, wearing the charcoal Top Movers polo, stands with a tablet and "
    "notes down what is going along; he looks at the sofa and the cabinet, never at the camera. "
    "Beside him the customer, a man of about forty five in ordinary clothes, points at a large "
    "sideboard. They stand at slightly different distances from the camera and their heads are at "
    "different heights. The room is fully furnished: sofa, dining table, plants, a full bookcase. "
    "Daylight from the window behind them, so they are lit against the light. The face reference is "
    "the LAST attached image and is the consultant's face.",
    [DOZEN, POLO, kop("kop-19-bril-net-donker")]),

"m33-woonkamer-compleet": scene(
    "Scene: no people. A fully furnished Dutch living room photographed from the doorway, so the "
    "whole contents of the room are visible at once: a three-seater sofa, an armchair, a coffee "
    "table, a dining table with chairs, a sideboard, a full bookcase and two large plants. Two "
    "closed Top Movers moving boxes stand ready by the door in the foreground, one corner of the "
    "door frame darkening the edge of the frame. Late morning light through the window on the left, "
    "the far corner of the room in shadow.",
    [DOZEN]),

"m34-bank-dragen": scene(
    "Scene: two movers carry a three-seater sofa out of the front door of a Dutch terraced house "
    "and down the step to the pavement. Both wear the charcoal Top Movers polo, both hold the sofa "
    "with the belly toward it and both arms in front of the body; the man walking backwards keeps "
    "his face turned to the sofa and to his colleague, never to the camera. The sofa is wrapped in "
    "a grey moving blanket at the corners. One of the two is clearly taller than the other and they "
    "overlap in depth. Behind them the open front door and a stack of Top Movers boxes in the hall. "
    "Overcast Dutch daylight with a brighter patch from the left. The two face references are the "
    "LAST TWO attached images.",
    [DOZEN, POLO, kop("kop-12-kaalgeschoren-stoer"), kop("kop-06-jong-blond-coupe")]),

"m35-bakwagen-laadklep": scene(
    "Scene: a plain WHITE box truck stands in front of a Dutch brick terraced house with its tail "
    "lift down at the BACK of the truck. The flat side panel of the truck is completely blank: no "
    "lettering, no decals, no logo, no company name anywhere on it, and the licence plate is out of "
    "focus and unreadable. On the lowered tail lift stands a Top Movers moving box; inside the "
    "loading box more boxes and blanket-wrapped furniture are stacked. A mover in a charcoal polo, "
    "seen small and from behind at the far end of the tail lift, is pushing a box further in. Low "
    "afternoon sun from the right rakes along the brickwork and throws the shadow of the truck "
    "across the street. A parked bicycle is cut off by the edge of the frame.",
    [DOZEN, POLO]),
}

PAGINA = {"chk": "verhuischecklist", "inp": "inpaktips", "doz": "dozencalculator", "m3": "m3-calculator"}


def gen(item):
    naam, s = item
    uit = UIT / f"{naam}.png"
    prompt = (DOOS + VAK + (UNIFORM if POLO in s["refs"] else "") + KLANT + s["tekst"] + " "
              + s["kader"] + LICHT + CAMERA + IMPERFECT + AFWERKING + NEG)
    parts = [{"inlineData": {"mimeType": "image/jpeg" if p.suffix in (".jpg", ".jpeg") else "image/png",
                             "data": b64(p)}} for p in s["refs"]]
    parts.append({"text": prompt})
    body = json.dumps({
        "contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["IMAGE"],
                             "imageConfig": {"aspectRatio": "2:3", "imageSize": "2K"}},
    }).encode()
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
            time.sleep(5 * poging)


if __name__ == "__main__":
    UIT.mkdir(exist_ok=True)
    wens = sys.argv[1:]
    todo = [(n, s) for n, s in SCENES.items() if not wens or any(n.startswith(w) for w in wens)]
    print(f"{len(todo)} generaties, {MODEL}, 2:3 op 2K", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        for regel in ex.map(gen, todo):
            print(regel, flush=True)
