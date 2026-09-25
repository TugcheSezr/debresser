#!/usr/bin/env python3
"""Contactpagina: drie figuren om uit te knippen, drie varianten per figuur (9 platen).

Opdracht Shahab 29-08-2026: een man en een vrouw in Top Movers-kleding die met een smartphone
bellen en lachend IN DE LENS kijken, plus een man achter de pc. Dat "in de lens" is een expliciete
klantinstructie en overschrijft de documentaire regel uit de skill; het staat daarom als eigen blok
in de prompt in plaats van in de negative.

Route: cutout-standaard uit de skill. Magenta #FF00FF, geen schaduw op de achtergrond, ruime marge
links/rechts/boven, figuur van de HEUPEN af (niet knieen: dan is de borstprint groter en leesbaarder,
de Sprint-les), alleen de onderrand mag geraakt worden. Geen witte outline meevragen. Uitsnijden
gebeurt daarna met Vision plus keykleur-decontaminatie.

Gezichten: de mixbibliotheek bevat 42 koppen en die zijn ALLEMAAL man, dus de vrouw krijgt geen
gezichtsreferentie en het model verzint haar gezicht. Dat gebruikt niemands gelijkenis, wat voor
portretrecht juist de veiligste variant is, maar het wijkt af van beeldregel 4 en staat daarom
gemeld in de galerij.

GEMINI_API_KEY=... python3 gen_contact.py [id ...]
"""
import base64, json, os, sys, time, pathlib
import urllib.request
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
UIT = HIER / "contact-raw"
POLO = HIER / "refs/ref-polo.jpg"
KOPPEN = pathlib.Path.home() / ".claude/skills/foto-optimalisatie/gezichten-mix"


def kop(naam):
    return KOPPEN / f"{naam}@4x.png"


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


def mime(p):
    return "image/jpeg" if pathlib.Path(p).suffix in (".jpg", ".jpeg") else "image/png"


# ---- cutout-anker ---------------------------------------------------------
CUTOUT = (
"ABSOLUTE RULE 1, THE BACKGROUND: the entire background is one flat, even, fully saturated MAGENTA "
"field, hex #FF00FF, edge to edge, with nothing else in it. No studio backdrop, no seamless paper, "
"no cyclorama, no light grey or cream wall, no lighter rectangle or panel behind the person, no "
"floor, no horizon line, no vignette, no gradient, no props, no furniture except what is named in "
"the scene. The magenta touches the contour of the person directly all the way around, including "
"the gap between an arm and the body and the gap under a raised elbow. The person casts NO shadow "
"onto the background at all. Not hot pink, not purple, not darker: pure magenta. "
"ABSOLUTE RULE 2, THE FRAMING: one person only, seen from the HIPS UP, filling at most 75 percent "
"of the frame width, standing upright and centred. There is a generous band of empty magenta along "
"the LEFT edge, the RIGHT edge and the TOP edge, and no elbow, hand, shoulder, hair or object comes "
"near any of those three borders. Only the bottom edge of the frame crosses the body, at the hips. "
"ABSOLUTE RULE 3, NO TEXT: no lettering anywhere except the chest print described below. Any screen, "
"phone display, badge, lanyard, mug or sign is blank, turned away or out of view. No watermark. "
)

UNIFORM = (
"THE UNIFORM: a plain charcoal-grey pique POLO shirt with a collar, exactly like the attached polo "
"reference, clean and well fitting. On the LEFT CHEST it carries the Top Movers print and nothing "
"else: the word TOP in white heavy uppercase on the top line, the word MOVERS in white heavy "
"uppercase on the line below and slightly to the right, and one teal-green swoosh that sweeps under "
"TOP and ends in an arrow point to the right of MOVERS. No bee on the shirt. The print appears "
"exactly ONCE on the whole outfit, never on a sleeve, never on the back, never mirrored or reversed, "
"every letter reads left to right. Because the person is framed from the hips up the print is large "
"and completely legible. Charcoal work trousers, no hi-vis, no cap, no lanyard, no earbuds. "
)

BLIK = (
"THE EXPRESSION, and this is deliberate: the person looks STRAIGHT INTO THE CAMERA LENS and laughs "
"a real, warm, open laugh with the eyes creasing, the kind of laugh that happens mid-conversation "
"and not a held smile for a photographer. Both eyes are open and catch the same small highlight. "
"Approachable, relaxed shoulders, no stiff posture, no crossed arms. "
)

LICHT = (
"Light: one dominant soft source from the front left at about 45 degrees, like a large window, with "
"a gentle falloff to the right side of the face so the face is NOT evenly lit; a soft rim along the "
"right shoulder separates the figure from the background. Neutral daylight around 5200K. Highlights "
"on the forehead may just clip. No ring light, no flat beauty lighting, no coloured light. "
)

CAMERA = (
"Camera: a real photograph taken with an 85mm lens from about three metres, at chest height, "
"aperture f/5.6 so the whole person is sharp, 1/200s. Natural perspective, no wide-angle distortion, "
"the head not tilted back. "
)

AFWERKING = (
"A real photograph of a real person, not an illustration, not 3D, not a render, not AI-looking. Skin "
"with visible pores, fine lines around the eyes and a little natural shine, never waxy or plastic, "
"never airbrushed. Visible sensor noise. Natural teeth, not blue-white. True-to-life colour, no HDR, "
"no teal-and-orange grading, no magazine retouching. A real working person from the Netherlands. "
)

HANDEN = (
"Hands: every finger is countable and correctly jointed, five per hand. The hand that holds the "
"phone wraps around it with the thumb on the near side and the fingers curled behind it, the phone "
"body resting against the palm; no hand presses against empty air. "
)

NEG = (
"Avoid: a second person, a visible floor or shadow on the background, a backdrop or wall of any "
"kind, a white or coloured outline around the person, cropped fingers or elbows at the left, right "
"or top border, text on any screen, a stiff stock-photo pose, folded arms, a thumbs-up, a headset "
"unless named, sunglasses, a cap, jewellery on the phone hand, waxy skin, teal-and-orange grading, "
"cartoon or CGI look, extra fingers, a mirrored chest print. "
)

TELEFOON = (
"The smartphone is a plain modern black smartphone with no visible brand mark and a screen that is "
"not visible to the camera, held to the ear on the side away from the camera-facing chest print so "
"the print stays fully visible. The arm is bent naturally, the elbow stays well inside the frame. "
)

SCENES = {
 # ---------- man aan de telefoon ----------
 "bel-man-a": dict(refs=[POLO, kop("kop-02-kaal-rossige-baard")], tekst=(
   "A man of about thirty five, shaven head and a short reddish beard, no younger and no older, slim "
   "build and not heavier, stands and takes a phone call. The face reference is the LAST attached "
   "image and is his face. " + TELEFOON +
   "His free hand rests relaxed at his side, slightly away from the body.")),
 "bel-man-b": dict(refs=[POLO, kop("kop-13-kort-grijs-sportief")], tekst=(
   "A man of about fifty, short grey hair, lean and sporty, clean shaven, no younger and no older, "
   "stands and takes a phone call. The face reference is the LAST attached image and is his face. "
   + TELEFOON +
   "His free hand is half raised in a small open gesture, as if he is explaining something on the "
   "phone; the palm stays well inside the frame.")),
 "bel-man-c": dict(refs=[POLO, kop("kop-16-donker-knot-snorbaard")], tekst=(
   "A man of about thirty, dark hair shaved at the sides and tied in a small knot, a moustache and "
   "short beard, no younger and no older, stands and takes a phone call. The face reference is the "
   "LAST attached image and is his face. " + TELEFOON +
   "His free hand holds a small unbranded notepad low at his hip, held flat so no writing is visible.")),

 # ---------- vrouw aan de telefoon (geen gezichtsreferentie, zie kop van dit bestand) ----------
 "bel-vrouw-a": dict(refs=[POLO], tekst=(
   "A woman of about thirty, Dutch, light brown hair in a practical ponytail with a few loose "
   "strands, no make-up to speak of, slim, stands and takes a phone call. " + TELEFOON +
   "Her free hand rests relaxed at her side.")),
 "bel-vrouw-b": dict(refs=[POLO], tekst=(
   "A woman of about forty two, Dutch, dark blonde hair in a short bob tucked behind one ear, small "
   "silver stud earrings, stands and takes a phone call. " + TELEFOON +
   "Her free hand is half raised in a small open gesture, as if she is confirming an appointment; "
   "the palm stays well inside the frame.")),
 "bel-vrouw-c": dict(refs=[POLO], tekst=(
   "A woman of about fifty five, Dutch, short grey-blonde hair, fine lines around the eyes, thin "
   "modern glasses, stands and takes a phone call. " + TELEFOON +
   "Her free hand holds a small unbranded notepad low at her hip, held flat so no writing is "
   "visible.")),

 # ---------- man achter de pc ----------
 "pc-man-a": dict(refs=[POLO, kop("kop-11-sleek-baard-kaaklijn")], tekst=(
   "A man of about thirty five with dark hair combed back and a short beard, no younger and no "
   "older, sits on a plain dark office chair with an open silver laptop resting on his forearm and "
   "left hand, his right hand on the keyboard. The face reference is the LAST attached image and is "
   "his face. The laptop screen is tilted away from the camera so nothing on it is visible; the "
   "laptop lid is plain with no logo. No desk, no monitor and no cables in frame: only the man, the "
   "chair back behind his shoulder and the laptop. His body is turned about twenty degrees to the "
   "left while his face turns back to the lens.")),
 "pc-man-b": dict(refs=[POLO, kop("kop-14-kalend-grijsbaard-overhemd")], tekst=(
   "A man of about fifty five, balding with a trimmed grey beard, no younger and no older, sits "
   "behind a desk at a computer. He is seen in three-quarter view so the SLIM DESKTOP MONITOR stands "
   "beside him with its BACK toward the camera and its screen completely out of view; the monitor is "
   "plain dark grey with no logo. Both hands rest on a plain grey keyboard on the desk. Only the "
   "front edge of the light wooden desk crosses the very bottom of the frame; there is nothing else "
   "on the desk and no cables. The face reference is the LAST attached image and is his face.")),
 "pc-man-c": dict(refs=[POLO, kop("kop-19-bril-net-donker")], tekst=(
   "A man of about thirty two with dark hair and thin glasses, no younger and no older, stands "
   "leaning with one hand on the top edge of a slim desktop monitor that is turned with its BACK to "
   "the camera so the screen is not visible; the monitor is plain dark grey with no logo. His other "
   "hand holds a plain black smartphone down at his hip, screen not visible. Nothing else in frame, "
   "no desk and no cables. The face reference is the LAST attached image and is his face.")),

 "bel-man-b2": dict(refs=[POLO, kop("kop-13-kort-grijs-sportief")], tekst=(
   "A man of about fifty, short grey hair, lean and sporty, clean shaven, no younger and no older, "
   "stands and takes a phone call. The face reference is the LAST attached image and is his face. "
   + TELEFOON +
   "His free hand is half raised in a small open gesture close to his own chest, the whole hand well "
   "inside the width of his own shoulders and nowhere near the right border.")),
 "pc-man-a2": dict(refs=[POLO, kop("kop-11-sleek-baard-kaaklijn")], tekst=(
   "A man of about thirty five with dark hair combed back and a short beard, no younger and no "
   "older, sits on a plain dark office chair holding a small open silver laptop against his chest "
   "with both hands, as if he has just turned away from his desk. The face reference is the LAST "
   "attached image and is his face. The laptop is SMALL in the frame, held high against the body and "
   "entirely inside the width of his own shoulders; its screen is tilted away so nothing on it is "
   "visible and the lid is plain with no logo. No desk, no monitor, no cables, nothing else.")),
 "pc-man-b2": dict(refs=[POLO, kop("kop-14-kalend-grijsbaard-overhemd")], tekst=(
   "A man of about fifty five, balding with a trimmed grey beard, no younger and no older, is seen "
   "from the hips up sitting at a computer, but the desk is NOT in frame at all. A slim desktop "
   "monitor stands beside his shoulder with its BACK toward the camera and its screen out of view; "
   "the monitor is plain dark grey with no logo and stays entirely inside the width of his own "
   "shoulders, well away from the right border. One hand rests on the back edge of the monitor, the "
   "other is relaxed at his side. The face reference is the LAST attached image and is his face.")),
 "pc-man-c2": dict(refs=[POLO, kop("kop-19-bril-net-donker")], tekst=(
   "A man of about thirty two with dark hair and thin glasses, no younger and no older, stands "
   "holding a plain silver laptop closed under one arm against his ribs and a plain black smartphone "
   "in the other hand down at his hip, screen not visible. The laptop is entirely inside the width of "
   "his own shoulders. No desk, no monitor, no cables, nothing else in frame. The face reference is "
   "the LAST attached image and is his face.")),
}


def gen(item):
    naam, s = item
    uit = UIT / f"{naam}.png"
    telefoon_handen = HANDEN if "phone call" in s["tekst"] or "smartphone" in s["tekst"] else ""
    prompt = (CUTOUT + UNIFORM + BLIK + s["tekst"] + " " + telefoon_handen + LICHT + CAMERA
              + AFWERKING + NEG)
    parts = [{"inlineData": {"mimeType": mime(r), "data": b64(r)}} for r in s["refs"]]
    parts.append({"text": prompt})
    body = json.dumps({"contents": [{"parts": parts}],
                       "generationConfig": {"responseModalities": ["IMAGE"],
                                            "imageConfig": {"aspectRatio": "3:4", "imageSize": "2K"}}}).encode()
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
    print(f"{len(todo)} generaties, {MODEL}, 3:4 op 2K, magenta cutout", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        for r in ex.map(gen, todo):
            print(r, flush=True)
