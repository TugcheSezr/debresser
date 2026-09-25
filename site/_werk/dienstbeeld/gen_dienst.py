#!/usr/bin/env python3
"""Beeld voor de elf dienstpagina's van De Kievit: 7 kandidaten per dienst, 77 in totaal.

Opdracht Shahab 29-08-2026: per dienstpagina 7 foto's; elke bus is een Top Movers-bus, elke verhuizer
draagt Top Movers-kleding, gezichten in een gezonde mix uit de mixbibliotheek van de skill (kop-01 t/m 19,
akkoord ligt er), dozen altijd Top Movers en er wordt NIETS op geschreven; sfeer positief maar niet
uitgelaten, zonnig maar niet fel.

Bouwt voort op _werk/paginabeeld/gen_pagina.py van sessie f4 (20 van 20 letterings goed met ref-dozen.jpg als
EERSTE referentie plus het ABSOLUTE RULE-blok). Nieuw hier: een wagen-anker met de echte zijkant als
referentie, een container-anker voor de opslag, een stemmingsblok, een buitenlicht-recept en een liggend
kader. Per dienst 5 staande (2:3, voor .blok__foto) en 2 liggende (3:2, voor hero/.dienst__nis-vakken).

Key uit de omgeving:  GEMINI_API_KEY=... python3 gen_dienst.py [id-prefix ...]   (bijv. par  of  par1 ops3)
"""
import base64, json, os, sys, time, pathlib
import urllib.request
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
UIT = HIER / "raw"
WERK = HIER.parent
SKILL = pathlib.Path.home() / ".claude/skills/foto-optimalisatie"

DOZEN = WERK / "hero-venlo/ref-dozen.jpg"
POLO = WERK / "paginabeeld/refs/ref-polo.jpg"
WAGEN = HIER / "refs/ref-wagen.jpg"
CONTAINER = HIER / "refs/ref-container.jpg"
LOGO = HIER / "refs/ref-logo.jpg"
OBJ = SKILL / "objecten"
STEEKWAGEN = OBJ / "steekwagen.png"
HONDJE_XXL = OBJ / "meubelhondje-xxl-groen.png"
HONDJE_ZWART = OBJ / "meubelhondje-zwart.png"
ROLCONTAINER = OBJ / "rolcontainer.png"
KRAT = OBJ / "krat-deksel-groen.png"
ARCHIEFBOX = OBJ / "archiefbox-beugel.png"
COMPUTERBOX = OBJ / "computerbox-deksel.png"
BUREAUROLLER = OBJ / "bureauroller.png"


def kop(n):
    return SKILL / "gezichten-mix" / f"{n}@4x.png"


# leeftijdsanker per kop (manifest), aan beide kanten vastgezet
KOPPEN = {
    "kop-01-grijze-baard-bril-rood": "a man of 45 to 55 with a full grey beard and glasses",
    "kop-02-kaal-rossige-baard": "a bald man of 30 to 40 with a reddish beard",
    "kop-03-kalend-sikje-roze": "a man of 40 to 50, balding blond, with a goatee",
    "kop-04-kaal-grijze-baard-bril": "a bald man of 40 to 50 with a full grey beard and glasses",
    "kop-05-grijs-haar-ouder": "a man of 55 to 65 with grey half-long hair",
    "kop-06-jong-blond-coupe": "a young man of 18 to 22 with a blond haircut",
    "kop-07-lach-nektattoo-hivis": "a man of 30 to 40 with a small tattoo on his neck",
    "kop-08-jong-net-donker": "a man of 25 to 32 with neat dark hair",
    "kop-09-krullen-baardje-30er": "a man of 28 to 36 with dark curls and a short beard",
    "kop-10-pet-stoppels-blauw": "a man of 28 to 38 with dark stubble and a Mediterranean look, no cap",
    "kop-11-sleek-baard-kaaklijn": "a man of 28 to 38 with hair slicked back and a beard",
    "kop-12-kaalgeschoren-stoer": "a sturdy man of 45 to 55 with a shaved head",
    "kop-13-kort-grijs-sportief": "a lean man of 45 to 55 with short grey hair",
    "kop-14-kalend-grijsbaard-overhemd": "a man of 50 to 60, balding, with a grey beard",
    "kop-15-jong-blond-bus": "a young man of 22 to 30, blond, boyish",
    "kop-16-donker-knot-snorbaard": "a dark-skinned man of 25 to 35 with shaved sides and a top knot",
    "kop-17-fors-stoppels-auto": "a heavy-set man of 35 to 45 with dark stubble",
    "kop-18-opgeschoren-baard-jong": "a man of 25 to 35 with shaved sides and a beard",
    "kop-19-bril-net-donker": "a man of 28 to 38 with glasses and neat dark hair",
}
K = {n.split("-")[1]: n for n in KOPPEN}       # "09" -> volledige naam


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


# ---- ANKERS ---------------------------------------------------------------------------------
DOOS = (
"ABSOLUTE RULE 1, THE BOXES: every moving box is EXACTLY the Top Movers box in the FIRST attached "
"reference image. Tan kraft corrugated cardboard. Along the left and right vertical edge of every "
"face runs a cluster of small hexagons in muted teal-green and warm yellow, like a honeycomb. "
"Centred on the large face is the lettering: the word TOP in heavy dark-grey uppercase on the top "
"line, the word MOVERS in heavy dark-grey uppercase on the line below and slightly to the right, a "
"small yellow cartoon bee with a dark-grey striped body hovering at the top right of TOP, and one "
"teal-green curved swoosh that sweeps under TOP and ends in an arrow point to the right of MOVERS. "
"Under the wordmark there is only bare kraft cardboard: no slogan, no sentence, no second line of text, no web "
"address, no weight label, no FSC or recycling mark, no QR code, no barcode, nothing at all. The "
"only printed things on a box are the honeycomb hexagons, the bee, the two words and the swoosh. "
"NEVER stack the wordmark differently, NEVER "
"invent another logo or brand name, NEVER leave the cardboard plain and unprinted, NEVER print the "
"whole box dark, NEVER add arrow-up symbols, padlock icons, pictograms, codes or writing lines, "
"nothing printed on the top flaps. Even a box far from the camera keeps "
"the honeycomb edges, the bee and the two-line lettering. "
"ABSOLUTE RULE 2, NO TAPE AND NOTHING WRITTEN ON A BOX: these boxes close with interlocking folded "
"flaps, a self-closing lid, and they have oval hand holes in the two short sides. There is NEVER a "
"strip of tape over the seam, never tape over the printed name, never a tape dispenser, never rope, "
"strap, stretch film or string around a box. Nobody has written anything on any box: no marker "
"words, no room names, no numbers, no stickers, no paper labels, only the printed lettering. Boxes "
"stand upright and square on their bottom, never lying on a side, never tilted. They are real "
"moving-box size, roughly 48 by 32 by 36 centimetres, clean, at most one light scuff. "
)

TEKST = (
"ABSOLUTE RULE 3, NO OTHER TEXT: no certification logo, no seal, no membership badge, no other "
"company name, no sustainability claim, no street sign with readable words anywhere in frame. Any "
"sign, poster, screen, phone display, newspaper, printed sheet, drawing, list or document is seen "
"at a shallow angle or slightly out of focus, so that it reads as a page with lines on it and no "
"single word can be made out. Licence plates are turned away or out of focus. No text is added "
"over the photograph. "
)

WAGEN_ANKER = (
"ABSOLUTE RULE 4, THE TRUCK: every truck in the picture is the Top Movers moving truck of the "
"attached truck reference photo: a modern white box truck with a white cab and a tall white box "
"body. On the side of the box body sits the lettering, painted LARGE: the word TOP in heavy near-black "
"uppercase (#111111) on the top line, the word MOVERS in heavy near-black uppercase on the line "
"below and set slightly to the right, and one teal-green swoosh (#0E9A8C) that sweeps in under TOP "
"from the left and ends in a teal arrow point to the right of MOVERS, exactly as in the attached "
"logo image. The lettering reads left to right, is never mirrored, never stacked differently, never in "
"another colour. The lettering is ALWAYS in TWO stacked lines, TOP alone on the upper line and "
"MOVERS alone on the lower line, exactly as in the truck reference photo; NEVER both words on one "
"line, never a ring or a full circle around them. The lower skirt of the box body and the rear end of the box body are solid "
"teal-green. At the BACK of the truck is a hydraulic tail lift platform with a yellow safety railing, "
"lowered flat to the ground when in use; never a lift on the side. There is no other lettering on "
"the truck: no phone number, no web address, no badges, no certification logos, no stickers on the "
"cab doors, nothing on the panel above the cab, nothing on the rear. The yellow Dutch licence "
"plate is a plain yellow rectangle without readable characters. Inside the box body the walls "
"are bare: no lashing rails with straps, no ratchet straps, no hanging straps, no nets, no cords; "
"furniture in there is wrapped only in grey blankets tucked in by hand, nothing tied around it. "
"The truck is framed so that the lettering on its side is large and crisp. "
)

CONTAINER_ANKER = (
"ABSOLUTE RULE 4, THE STORAGE CONTAINERS: the storage system is white steel storage containers "
"exactly like the attached container reference photo: corrugated white steel boxes of twenty feet, "
"double doors at the end, and on the doors the same TOP MOVERS lettering painted large: TOP in heavy "
"near-black uppercase on the top line, MOVERS in heavy near-black uppercase on the line below and "
"slightly to the right, one teal-green swoosh sweeping under TOP and ending in an arrow point to "
"the right of MOVERS, exactly as in the attached logo image; the broad broken ellipse of the logo, "
"never chevrons, never a ring. Every door and every wall is plain white apart from that: no "
"container numbers, no codes, no data plates, no stickers, no other names, no small logos. The containers stand stacked two high in long rows "
"inside a tall, clean, dry warehouse with a light concrete floor, a grey steel roof structure with "
"skylights and a yellow overhead gantry crane. "
)

KLEUR = (
"COLOUR RULE FOR THE LETTERING, on every truck, container, polo and box alike: all three letters of "
"TOP and all six letters of MOVERS are ONE and the same colour (near-black on the truck and the "
"containers, white on the polo, dark grey on the boxes). The O of TOP is NEVER teal, never a ring, "
"never a different colour from the T and the P. The only teal element is the thin curved swoosh "
"that curves AROUND the two words as a broad broken ellipse with a large arrow head to the right, "
"never runs through a letter. "
)

VAK = (
"Trade rules that must hold. Anyone carrying something carries it with the belly TOWARD the load "
"and both arms in FRONT of the body; never with the back to the load, never a box or a piece of "
"furniture on a shoulder or on the back. A box is set down upright on its bottom, never slid in "
"lying on its side. Furniture travels wrapped in plain grey moving blankets held by hand, never with "
"straps, ropes, cords, film or tape. A hand truck, dolly or rolling container is exactly the plain "
"UNBRANDED one of the attached equipment reference when one is attached, used properly: the hand "
"truck with its plate under the load and the user behind it, the dolly UNDER the furniture, the "
"rolling container upright on its four wheels, nobody standing on any of them. Nobody is measuring "
"anything with a tape measure. Tools, drills and equipment carry no maker's name. Buildings, "
"stairwells and rooms are clean and well kept. No earbuds "
"in anyone's ears. "
)

UNIFORM = (
"THE MOVER'S UNIFORM: a plain charcoal-grey pique POLO shirt exactly like the attached polo "
"reference, with the Top Movers chest print on the left chest: the word TOP in white heavy "
"uppercase, MOVERS in white heavy uppercase on the line under it and slightly to the right, and one "
"teal-green swoosh sweeping under TOP and ending in an arrow point to the right of MOVERS. No bee "
"on the shirt, no third line under MOVERS, no icon beside TOP, no sleeve emblem, no epaulettes. "
"The print appears exactly ONCE on the whole outfit, never mirrored, never on the "
"back, never stacked differently. Seen from behind, the back of a polo is ONE flat field of plain "
"charcoal fabric from collar to hem, the way an unprinted shirt looks. Charcoal work trousers, sturdy dark work shoes. No other logo, no "
"hi-vis, no cap, no name tag. Every mover in the picture wears this uniform. "
)

KLANT = (
"THE CUSTOMER and every other non-mover wears ordinary everyday clothing, never workwear and never "
"any company shirt: only the movers are staff. "
)

STEMMING = (
"Mood: positive and calm. The people are relaxed and content in their work: a light natural smile "
"with the lips touching each other, or a friendly focused face; the mouth stays closed and no teeth "
"are visible on anyone, never a wide grin, never laughing, no "
"posed cheerfulness, no thumbs "
"up, nobody looking at the camera. "
)

LICHT_BUITEN = (
"Light: a bright, friendly day. The sun is out but softened by thin high cloud, so the light is "
"clearly directional from one side with soft-edged but visible shadows, colour temperature around "
"5600K, clean and neutral with a little warmth on the sunlit side. Not harsh: no blown-out midday "
"glare, no deep black shadows, no golden-hour orange, no dramatic sky. A pale blue sky with some "
"light cloud, never a flat grey overcast. Faces sit on their own shadow side or just beside the "
"sunlit patch, never evenly lit. "
)

LICHT_BINNEN = (
"Light: bright, friendly daylight falling in through a window on one side as the one dominant "
"source with a clear direction, mixed white balance with warm 3000K interior light against cool "
"5800K daylight, soft-edged shadows with real falloff into the corners of the room, a few specular "
"highlights allowed to clip. Faces are never evenly lit: the face sits on its own shadow side or "
"just beside the pool of light. Not flat, not studio, no burning lamps in daylight. "
)

CAMERA = (
"Camera: documentary photograph at 35mm from standing chest height, aperture f/5.6 so the room "
"or the street stays legible, 1/125s, natural handheld framing with a slight tilt, perspective from "
"normal standing distance. No drone view, no fisheye, no tripod-perfect symmetry. "
)

IMPERFECT = (
"Imperfect framing on purpose: something ordinary is half in the way, a door frame darkening one "
"edge, a chair or a bicycle cut off by the border, a coat over a bannister, a folded blanket on the "
"floor. Lived in and in use, not tidied up for the photograph, not symmetrical, not a magazine "
"interior, but clean and well kept. "
)

AFWERKING = (
"A real photograph, not an illustration, not 3D, not a render, not a painting. Visible sensor "
"noise, skin with pores and fine lines, healthy even skin without red patches, true-to-life muted "
"Dutch daylight colour, no HDR, no teal-and-orange grading, no glossy plastic skin, no magazine "
"perfection, no vignette, no film border or frame around the picture. The Netherlands, not America: Dutch brick houses and window frames, Dutch power "
"sockets, Dutch street furniture, yellow licence plates out of focus. "
)

KADER_STAAND = (
"Composition for a tall PORTRAIT photo on a website: the frame is upright and will be cropped a "
"little narrower and a little taller, so keep the subject in the middle band of the width and leave "
"headroom and floor room. Nobody is cut off at a hand or a foot by the border. A person who shows "
"the chest print is seen from the hips up and close enough for the print to be large. "
)

KADER_LIGGEND = (
"Composition for a wide LANDSCAPE photo on a website: a horizontal frame that may later be cropped "
"to a wider banner, so keep the subject, every face and every piece of lettering inside the middle "
"band of the height, and leave room at the left and right. Nobody is cut off at a hand or a foot by "
"the border. People who are small in the frame are seen from behind, in profile or turned to their "
"work so that their chest print is not visible; only a person close to the camera shows the print. "
)

NEG = (
"Avoid: tape, straps, ropes, cords or film on or around any box or piece of furniture; a box lying "
"on its side; handwriting, marker words, stickers or paper labels on a box; text overlay, watermark "
"or another brand's logo; certification seals; anyone looking into the lens; a posed row of people; "
"a wide grin or laughter; thumbs up; identical faces; relaxed hands under a heavy load; hands pressed "
"against empty air; waxy or plastic skin; red blotches on cheeks; a burning table lamp in daylight; "
"American houses, sockets or road signs; snow; rain; harsh glare; cartoon or CGI look. "
)


def scene(tekst, refs, ar="2:3", licht="binnen"):
    return dict(tekst=tekst, refs=refs, ar=ar, licht=licht)


F = "The face reference is the LAST attached image and is the mover's face. "
F2 = "The two face references are the LAST TWO attached images, in the order the two movers are named. "

# ---------------------------------------------------------------------------- de 77 scenes
SCENES = {

# ===== 1. particulier-verhuizen ===========================================================
"par1-laadklep-steekwagen": scene(
    f"Scene: moving day at a Dutch brick terraced house in a quiet residential street in Venlo. The "
    f"Top Movers truck stands at the kerb with its tail lift lowered at the back; the side of the box "
    f"body with the large TOP MOVERS lettering fills the right half of the frame at an angle. A mover, "
    f"{KOPPEN[K['09']]}, in the charcoal Top Movers polo, seen from the hips up, wheels the aluminium "
    f"hand truck with three Top Movers boxes from the front door toward the tail lift; his face is "
    f"turned to the boxes with a light content expression. In the open doorway the customer, a woman of "
    f"about thirty-five in a jumper and jeans, holds a potted plant and watches the boxes go, not the "
    f"camera. A child's bicycle leans against the low front wall. {F}",
    [DOZEN, POLO, WAGEN, LOGO, STEEKWAGEN, kop(K['09'])], "2:3", "buiten"),

"par2-woonkamer-doos-tillen": scene(
    f"Scene: a Dutch family living room half packed. A mover, {KOPPEN[K['18']]}, in the charcoal Top "
    f"Movers polo, lifts a closed Top Movers box from a stack with his belly toward the box and both "
    f"arms in front of his body, seen from the hips up in three-quarter, his face turned to the box "
    f"with a calm friendly expression. Around him a sofa pushed against the wall, family photos still "
    f"on the wall, a rolled-up rug and four more Top Movers boxes stacked squarely. {F}",
    [DOZEN, POLO, kop(K['18'])]),

"par3-trap-kast-dekens": scene(
    f"Scene: a Dutch staircase with a wooden bannister. Two movers in charcoal Top Movers polos carry "
    f"a tall wardrobe wrapped in grey moving blankets down the stairs: the lower one, {KOPPEN[K['12']]}, "
    f"walks backwards with his face turned up to the load and to his colleague; the upper one, "
    f"{KOPPEN[K['06']]}, holds the top end. Both hold the wardrobe with the belly toward it and both "
    f"arms in front of the body. Daylight from a landing window above puts a rim of light on their "
    f"shoulders. {F2}",
    [POLO, kop(K['12']), kop(K['06'])]),

"par4-voordeur-nieuw-huis": scene(
    f"Scene: the front door of a 1930s Dutch house with a brick facade and a small front garden on a "
    f"bright day. A mover, {KOPPEN[K['15']]}, in the charcoal Top Movers polo, carries a Top Movers box "
    f"up the two steps to the door with his belly toward the box, seen from the hips up, face to the "
    f"door. On the doorstep a couple in their thirties in ordinary clothes: she holds the door open, he "
    f"holds a bunch of keys loosely at his side; both look at the box with a quiet content expression. "
    f"At the kerb behind, the teal rear end and the lowered tail lift of the Top Movers truck are cut "
    f"off by the edge of the frame. {F}",
    [DOZEN, POLO, WAGEN, LOGO, kop(K['15'])], "2:3", "buiten"),

"par5-laadbak-inladen": scene(
    f"Scene: looking from the pavement onto the lowered tail lift at the BACK of the Top Movers truck "
    f"and into the loading box. A mover, {KOPPEN[K['02']]}, in the charcoal Top Movers polo, stands on "
    f"the tail lift and pushes a Top Movers box onto a neat wall of boxes stacked squarely to shoulder "
    f"height; on the left a two-seater sofa wrapped in grey moving blankets, on the right a mattress in "
    f"a cover. His face is in profile toward the boxes. The yellow safety railing of the lift is at the "
    f"edge of the frame. Bright soft daylight from behind the camera falls off into the depth of the "
    f"box body. {F}",
    [DOZEN, POLO, WAGEN, kop(K['02'])], "2:3", "buiten"),

"par6-straat-wagen-breed": scene(
    f"Scene: a wide view of a Dutch residential street with brick terraced houses on a bright day. The "
    f"Top Movers truck stands parked along the kerb seen from the side, the large TOP MOVERS lettering on "
    f"the box body filling the middle of the frame, tail lift lowered at the back. Two movers in "
    f"charcoal Top Movers polos work at the lift: {KOPPEN[K['11']]} rolls the aluminium hand truck with "
    f"Top Movers boxes up the platform, {KOPPEN[K['17']]} lifts a box off a stack on the pavement, both "
    f"faces turned to their work. Parked bicycles, a lamp post, a small tree, a neighbour's car cut off "
    f"by the frame edge. {F2}",
    [DOZEN, POLO, WAGEN, LOGO, kop(K['11']), kop(K['17'])], "3:2", "buiten"),

"par7-gezin-dozen-woonkamer": scene(
    "Scene: a family in their emptied Dutch living room among Top Movers moving boxes: father and "
    "mother in their late thirties in ordinary clothes and a girl of about seven. The father sets a "
    "closed Top Movers box on a stack, the girl carries a small Top Movers box with both arms in front "
    "of her, the mother folds a blanket over the back of the last armchair. Light natural smiles, "
    "faces turned to each other. Bare walls with pale patches where pictures hung, a window with the "
    "curtain taken down, daylight from that window on the right.",
    [DOZEN], "3:2"),

# ===== 2. internationale-verhuizing =======================================================
"int1-duitse-straat-laadklep": scene(
    f"Scene: a street in a German town just across the Dutch border, a rendered townhouse in pale "
    f"yellow with green shutters and a cobbled pavement. The Top Movers truck stands with its tail lift "
    f"lowered at the back, the teal rear end and a large part of the TOP MOVERS lettering on the side "
    f"visible at an angle. A mover, {KOPPEN[K['14']]}, in the charcoal Top Movers polo, wheels the "
    f"aluminium hand truck with Top Movers boxes toward the front door, face to the door. No readable "
    f"street signs. {F}",
    [DOZEN, POLO, WAGEN, LOGO, STEEKWAGEN, kop(K['14'])], "2:3", "buiten"),

"int2-exportkist-inpakken": scene(
    f"Scene: a Dutch living room. A mover, {KOPPEN[K['08']]}, in the charcoal Top Movers polo, kneels "
    f"beside an open plywood export crate on the floor and packs framed pictures into it that are "
    f"already fully wrapped in white paper and bubble wrap, nothing of the frames or the images "
    f"visible; seen from the hips up in three-quarter, face turned down to the crate. Beside the crate "
    f"a stack of Top Movers boxes and a roll of blank paper. No lettering on the crate. {F}",
    [DOZEN, POLO, kop(K['08'])]),

"int3-adviseur-tafel-stel": scene(
    f"Scene: a moving consultant, {KOPPEN[K['19']]}, in the charcoal Top Movers polo, sits at a Dutch "
    f"dining table with a couple in their forties in ordinary clothes; between them a laptop seen from "
    f"the back and a few printed sheets at a shallow angle that carry no readable words. The consultant "
    f"points at a sheet, the couple look at the sheet with a relaxed content expression. Behind them a "
    f"bookcase and a window with daylight from the left. {F}",
    [POLO, kop(K['19'])]),

"int4-laadbak-vol-lange-rit": scene(
    f"Scene: inside the loading box of the Top Movers truck, seen from the lowered tail lift at the "
    f"back. The box body is packed full for a long journey: Top Movers boxes stacked squarely to the "
    f"roof in the middle, furniture wrapped in grey moving blankets along both walls, a bicycle under a "
    f"blanket. A mover, {KOPPEN[K['16']]}, in the charcoal Top Movers polo, stands in the opening and "
    f"slides in the last box, face to the load. Daylight from behind the camera. {F}",
    [DOZEN, POLO, WAGEN, kop(K['16'])], "2:3", "buiten"),

"int5-belgische-straat-trap": scene(
    f"Scene: a street of tall narrow townhouses in Antwerp, Belgium, with a cobbled road. A mover, "
    f"{KOPPEN[K['13']]}, in the charcoal Top Movers polo, carries a Top Movers box up the front steps "
    f"with his belly toward the box, seen from the hips up; behind him at the kerb the Top Movers truck "
    f"with the tail lift lowered at the back and the TOP MOVERS lettering on the side partly visible. The "
    f"customer, a woman of about fifty in ordinary clothes, stands in the doorway and gestures inside. "
    f"No readable signs. {F}",
    [DOZEN, POLO, WAGEN, LOGO, kop(K['13'])], "2:3", "buiten"),

"int6-snelweg-wagen": scene(
    "Scene: the Top Movers truck driving on a Dutch motorway on a bright morning, seen from the side "
    "and slightly ahead from the next lane, the large TOP MOVERS lettering on the box body filling the "
    "middle of the frame, the teal skirt and the teal rear end visible. Flat green Dutch landscape "
    "with a row of poplars and a wind turbine far away, an overhead gantry far ahead out of focus with "
    "no readable text. Slight motion blur in the wheels and the road surface, the truck itself sharp.",
    [WAGEN, LOGO], "3:2", "buiten"),

"int7-gezin-vertrek-tuin": scene(
    f"Scene: a Dutch front garden on moving day. A family in ordinary clothes, parents of about forty "
    f"and two children, stand near the gate with two suitcases and a cat carrier and watch a mover, "
    f"{KOPPEN[K['04']]}, in the charcoal Top Movers polo, fold up the tail lift at the back of the Top "
    f"Movers truck at the kerb; the TOP MOVERS lettering on the side is visible at an angle. Light content "
    f"faces, the neighbour's hedge cutting off the left edge. {F}",
    [POLO, WAGEN, LOGO, kop(K['04'])], "3:2", "buiten"),

# ===== 3. seniorenverhuizing ==============================================================
"sen1-adviseur-keukentafel": scene(
    f"Scene: an elderly couple of about eighty in ordinary clothes sit at their Dutch kitchen table "
    f"with tea; across from them a moving consultant, {KOPPEN[K['14']]}, in the charcoal Top Movers "
    f"polo, with a notebook seen at a shallow angle that carries no readable words. The consultant "
    f"listens, the lady points at a cabinet; calm friendly faces. Daylight from the window on the "
    f"right, a warm interior with a plant and a clock. {F}",
    [POLO, kop(K['14'])]),

"sen2-servies-inpakken-samen": scene(
    f"Scene: a mover, {KOPPEN[K['08']]}, in the charcoal Top Movers polo, kneels at a glass cabinet "
    f"and wraps a porcelain cup in blank white paper before placing it upright into an open Top Movers "
    f"box; an elderly lady of about eighty in a cardigan stands beside him and hands him the next cup, "
    f"a light smile on her face turned to the cup. Daylight from the window on the left. {F}",
    [DOZEN, POLO, kop(K['08'])]),

"sen3-fauteuil-bungalow": scene(
    f"Scene: two movers in charcoal Top Movers polos carry an armchair wrapped in grey moving blankets "
    f"out of the front door of a Dutch single-storey bungalow, both with the belly toward the chair and "
    f"both arms in front of the body: {KOPPEN[K['12']]} walks backwards with his face turned to the "
    f"chair and his colleague, {KOPPEN[K['11']]}, holds the other end. An elderly man of about "
    f"eighty-five in a cardigan watches from the garden path with a content face. At the kerb the tail "
    f"lift of the Top Movers truck, cut off by the frame edge. {F2}",
    [POLO, WAGEN, kop(K['12']), kop(K['11'])], "2:3", "buiten"),

"sen4-boeken-nieuw-appartement": scene(
    f"Scene: a bright new senior apartment with a large window. A mover, {KOPPEN[K['03']]}, in the "
    f"charcoal Top Movers polo, places books upright into a bookcase from an open Top Movers box, while "
    f"the elderly lady of about eighty, seated in her armchair with a cup of tea, points at the shelf "
    f"where they go, a light smile. Daylight from the window behind her. {F}",
    [DOZEN, POLO, kop(K['03'])]),

"sen5-rollator-entree": scene(
    f"Scene: the entrance of a modern Dutch senior residence in brick on a bright day. An elderly lady "
    f"of about eighty with a walker walks toward the entrance beside a mover, {KOPPEN[K['15']]}, in the "
    f"charcoal Top Movers polo, who carries a Top Movers box beside her with his belly toward it; both "
    f"faces turned toward the entrance, seen from the hips up. Behind them the Top Movers truck with "
    f"the lowered tail lift at the back and part of the lettering on the side. {F}",
    [DOZEN, POLO, WAGEN, LOGO, kop(K['15'])], "2:3", "buiten"),

"sen6-koffie-fotoalbum": scene(
    "Scene: an elderly couple of about eighty at their Dutch kitchen table with coffee among closed "
    "Top Movers boxes stacked squarely in the room, in the morning; she looks at an old photo album "
    "seen at an angle, he looks at her with a quiet smile. Daylight from the window on the left, a "
    "plant on the windowsill, a coat over a chair.",
    [DOZEN], "3:2"),

"sen7-bungalow-wagen-breed": scene(
    f"Scene: in front of a Dutch bungalow on a bright day, the Top Movers truck at the kerb with the "
    f"tail lift lowered at the back and the TOP MOVERS lettering large on the side. A mover, "
    f"{KOPPEN[K['09']]}, rolls the aluminium hand truck with Top Movers boxes up the tail lift; a "
    f"second mover, {KOPPEN[K['05']]}, carries a small side table wrapped in a grey blanket; an elderly "
    f"couple of about eighty in ordinary clothes stand on the garden path and watch, content. Both "
    f"movers in charcoal Top Movers polos, faces to their work. {F2}",
    [DOZEN, POLO, WAGEN, LOGO, STEEKWAGEN, kop(K['09']), kop(K['05'])], "3:2", "buiten"),

# ===== 4. spoedverhuizing =================================================================
"spo1-planner-telefoon": scene(
    f"Scene: the planning office of the moving company: a planner, {KOPPEN[K['19']]}, in the charcoal "
    f"Top Movers polo, stands at a desk with a phone at his ear and looks at a wall planner seen at an "
    f"angle with no readable words; on the desk a monitor turned away from the camera and a coffee "
    f"mug. A friendly focused face. Daylight from an office window on the left. {F}",
    [POLO, kop(K['19'])]),

"spo2-snel-laden-laadklep": scene(
    f"Scene: two movers in charcoal Top Movers polos loading briskly at the tail lift at the back of "
    f"the Top Movers truck in a Dutch street: {KOPPEN[K['17']]} wheels the aluminium hand truck stacked "
    f"with four Top Movers boxes up the platform with brisk motion, slight motion blur in his legs; "
    f"{KOPPEN[K['16']]} takes a box from a stack on the pavement. Faces to the work, calm and "
    f"purposeful. The TOP MOVERS lettering on the box side visible at an angle. {F2}",
    [DOZEN, POLO, WAGEN, LOGO, STEEKWAGEN, kop(K['17']), kop(K['16'])], "2:3", "buiten"),

"spo3-klant-belt-opgelucht": scene(
    "Scene: a woman of about thirty in ordinary clothes in her Dutch living room, phone at her ear, a "
    "relieved light smile, looking at three Top Movers boxes that stand ready by the door; a half-packed "
    "open Top Movers box on the table, her jacket over a chair. Daylight from the window on the right.",
    [DOZEN]),

"spo4-team-stapt-af": scene(
    f"Scene: three movers in charcoal Top Movers polos step off the lowered tail lift at the back of "
    f"the Top Movers truck at a Dutch apartment building, ready to start: {KOPPEN[K['07']]} carries a "
    f"folded stack of grey moving blankets, {KOPPEN[K['10']]} pulls the aluminium hand truck, a third "
    f"is seen from behind. Calm content faces turned to the building. The teal rear end and part of "
    f"the lettering visible. {F2}",
    [POLO, WAGEN, LOGO, STEEKWAGEN, kop(K['07']), kop(K['10'])], "2:3", "buiten"),

"spo5-smalle-trap-doos": scene(
    f"Scene: a mover, {KOPPEN[K['01']]}, in the charcoal Top Movers polo, carries a closed Top Movers "
    f"box down a narrow Dutch staircase with his belly toward the box and both arms in front of his "
    f"body, seen from below and from the hips up; a colleague's hands with another box are visible "
    f"above at the landing. Daylight from a landing window. {F}",
    [DOZEN, POLO, kop(K['01'])]),

"spo6-twee-wagens-straat": scene(
    "Scene: two Top Movers trucks parked one behind the other along a Dutch street with brick "
    "apartment blocks on a bright day, both with the TOP MOVERS lettering large on the side and the tail "
    "lifts lowered at the back; four movers in charcoal Top Movers polos carry Top Movers boxes and "
    "blanket-wrapped furniture between the entrance and the trucks, seen small, faces to their work "
    "and turned away from the camera.",
    [DOZEN, POLO, WAGEN, LOGO], "3:2", "buiten"),

"spo7-laatste-doos-lege-kamer": scene(
    f"Scene: an emptied Dutch living room in the afternoon: a mover, {KOPPEN[K['13']]}, in the "
    f"charcoal Top Movers polo, carries the last Top Movers box out through the door with his belly "
    f"toward it, while the customer, a man of about forty in ordinary clothes, checks a corner of the "
    f"bare clean room with a content expression. Daylight from the window on the left. {F}",
    [DOZEN, POLO, kop(K['13'])], "3:2"),

# ===== 5. inpakservice ====================================================================
"inp1-borden-rechtop": scene(
    f"Scene: a Dutch kitchen. A mover, {KOPPEN[K['08']]}, in the charcoal Top Movers polo, seen from "
    f"the hips up, wraps a white dinner plate in blank white packing paper at the worktop; beside him "
    f"an OPEN Top Movers box with its flaps folded outward and wrapped plates standing UPRIGHT on their "
    f"edge inside, like records in a rack. Face turned down to the plate, calm and friendly. Daylight "
    f"from the kitchen window on the left. {F}",
    [DOZEN, POLO, kop(K['08'])]),

"inp2-boeken-boekendoos": scene(
    f"Scene: a mover, {KOPPEN[K['18']]}, in the charcoal Top Movers polo, kneels at a full bookcase "
    f"and packs books upright into a small Top Movers box on the floor, seen from the hips up in "
    f"three-quarter, face to the books. Two closed Top Movers boxes behind him. Daylight from the "
    f"window on the right. {F}",
    [DOZEN, POLO, kop(K['18'])]),

"inp3-garderobedoos-hangers": scene(
    f"Scene: a Dutch bedroom. A mover, {KOPPEN[K['15']]}, in the charcoal Top Movers polo, hangs "
    f"shirts on their hangers into a tall open Top Movers wardrobe box with a metal rail across the "
    f"top; the customer, a woman of about forty in ordinary clothes, hands him the next hangers, both "
    f"faces to the clothes. Daylight through the window. {F}",
    [DOZEN, POLO, kop(K['15'])]),

"inp4-televisie-deken": scene(
    f"Scene: a mover, {KOPPEN[K['04']]}, in the charcoal Top Movers polo, kneels on the living room "
    f"floor and wraps a flat television in a grey moving blanket, face to the television; beside him "
    f"a Top Movers box and a roll of blank paper. Daylight from the window on the left. {F}",
    [DOZEN, POLO, kop(K['04'])]),

"inp5-kratten-keuken": scene(
    f"Scene: a Dutch kitchen. A mover, {KOPPEN[K['02']]}, in the charcoal Top Movers polo, carries a "
    f"closed green plastic moving crate exactly like the attached crate reference, unbranded, with "
    f"both arms in front of his body, face turned to the doorway; on the worktop two more open green "
    f"crates being filled with pans and jars, a Top Movers box on the floor. Daylight from the "
    f"window. {F}",
    [DOZEN, POLO, KRAT, kop(K['02'])]),

"inp6-team-woonkamer-breed": scene(
    f"Scene: two packers in charcoal Top Movers polos in a Dutch living room: {KOPPEN[K['09']]} packs "
    f"glasses upright into a Top Movers box on the dining table, {KOPPEN[K['16']]} folds the flaps of a "
    f"full box closed on the floor; eight Top Movers boxes stacked squarely along the wall, a roll of "
    f"paper, the sofa half covered with a blanket. Faces to the work. Daylight from the window on the "
    f"left. {F2}",
    [DOZEN, POLO, kop(K['09']), kop(K['16'])], "3:2"),

"inp7-uitpakken-nieuwe-keuken": scene(
    f"Scene: a new Dutch kitchen. A mover, {KOPPEN[K['03']]}, in the charcoal Top Movers polo, sets "
    f"unwrapped glasses into an open cupboard from a Top Movers box on the worktop; the customer, a man "
    f"of about thirty-five in ordinary clothes, folds the flaps of an emptied box and looks at the "
    f"cupboard with a content face. Daylight through the window on the right. {F}",
    [DOZEN, POLO, kop(K['03'])], "3:2"),

# ===== 6. montage-demontage ===============================================================
"mon1-bed-demonteren": scene(
    f"Scene: a Dutch bedroom. A mover, {KOPPEN[K['13']]}, in the charcoal Top Movers polo, kneels at a "
    f"wooden bed frame and loosens a bolt with a cordless screwdriver; the mattress leans against the "
    f"wall in a cover, the slatted base stands on end. Face to the bolt, focused and calm, seen from "
    f"the hips up. Daylight from the window on the left. {F}",
    [POLO, kop(K['13'])]),

"mon2-kast-opbouwen": scene(
    f"Scene: two movers in charcoal Top Movers polos assemble a tall wardrobe in a new Dutch bedroom: "
    f"{KOPPEN[K['06']]} holds a side panel upright, {KOPPEN[K['12']]} drives a screw with a cordless "
    f"screwdriver; faces to the panel. Top Movers boxes stacked in the corner. Daylight from the "
    f"window on the right. {F2}",
    [DOZEN, POLO, LOGO, kop(K['06']), kop(K['12'])]),

"mon3-wasmachine-aansluiten": scene(
    f"Scene: a Dutch utility room. A mover, {KOPPEN[K['17']]}, in the charcoal Top Movers polo, "
    f"crouches beside a white washing machine and connects the water hose to the tap on the wall, face "
    f"to the tap. A Top Movers box on the floor beside him. Daylight from a small window. {F}",
    [DOZEN, POLO, kop(K['17'])]),

"mon4-tafelpoten-los": scene(
    f"Scene: a mover, {KOPPEN[K['11']]}, in the charcoal Top Movers polo, unscrews a leg from an "
    f"upturned oak dining table in a Dutch living room, the other legs already off and lying beside "
    f"him on a grey moving blanket; face to the leg, seen from the hips up. Daylight from the window "
    f"on the left. {F}",
    [POLO, kop(K['11'])]),

"mon5-handen-scharnier": scene(
    "Scene: close view of a mover's hands and forearms fitting a hinge onto a cupboard door lying on "
    "a grey moving blanket on the floor, with a cordless screwdriver; a small open toolbox beside it "
    "with screwdrivers and an Allen key set, a Top Movers box in the background out of focus. The "
    "charcoal polo is visible at the edge of the frame without the print. No face. Daylight from the "
    "side.",
    [DOZEN, POLO]),

"mon6-boxspring-deur": scene(
    f"Scene: two movers in charcoal Top Movers polos carry a boxspring base upright between them "
    f"through a Dutch bedroom doorway, both with the belly toward it and both arms in front of the "
    f"body, never on a shoulder: {KOPPEN[K['18']]} walks backwards with his face to the load and his "
    f"colleague, {KOPPEN[K['15']]}, holds the other end. The bed's headboard leans against the wall. "
    f"Daylight from the window. {F2}",
    [POLO, kop(K['18']), kop(K['15'])], "3:2"),

"mon7-dressoir-klaar": scene(
    f"Scene: a new Dutch living room with the furniture reassembled: a mover, {KOPPEN[K['05']]}, in "
    f"the charcoal Top Movers polo, checks the door of a reassembled sideboard, while the customer, a "
    f"woman of about forty-five in ordinary clothes, sets a plant on top with a content face. A folded "
    f"grey moving blanket on the floor and one Top Movers box by the door. Daylight from the window on "
    f"the left. {F}",
    [DOZEN, POLO, kop(K['05'])], "3:2"),

# ===== 7. inboedelopslag ==================================================================
"ops1-containers-deur-sluiten": scene(
    f"Scene: inside the tall storage warehouse of the moving company, rows of white steel storage "
    f"containers with the TOP MOVERS lettering on their doors, stacked two high. A mover, "
    f"{KOPPEN[K['04']]}, in the charcoal Top Movers polo, closes the double doors of one container at "
    f"floor level, seen from the hips up, face to the door. Daylight from skylights. {F}",
    [CONTAINER, LOGO, POLO, kop(K['04'])]),

"ops2-container-inladen": scene(
    f"Scene: an open white storage container at floor level in the warehouse, its doors with the TOP "
    f"MOVERS lettering swung open; inside, furniture wrapped in grey moving blankets and Top Movers boxes "
    f"stacked squarely. A mover, {KOPPEN[K['09']]}, in the charcoal Top Movers polo, carries a Top "
    f"Movers box into the container with his belly toward it, face to the load. Bright daylight from "
    f"the warehouse doors behind the camera. {F}",
    [DOZEN, CONTAINER, LOGO, POLO, kop(K['09'])]),

"ops3-fauteuil-opslagkist": scene(
    f"Scene: a mover, {KOPPEN[K['01']]}, in the charcoal Top Movers polo, places an armchair wrapped "
    f"in grey moving blankets into a large plywood storage crate with a hinged front, inside the "
    f"warehouse with white storage containers with the TOP MOVERS lettering in the background; beside the "
    f"crate a stack of Top Movers boxes and folded grey blankets. Face to the armchair. No lettering "
    f"on the crate. {F}",
    [DOZEN, CONTAINER, LOGO, POLO, kop(K['01'])]),

"ops4-inventaris-tablet": scene(
    f"Scene: a mover, {KOPPEN[K['19']]}, in the charcoal Top Movers polo, stands with a tablet in "
    f"front of an open white storage container in the warehouse and counts the Top Movers boxes and "
    f"wrapped furniture inside, the tablet screen turned away from the camera; face to the load, seen "
    f"from the hips up. Daylight from a skylight. {F}",
    [DOZEN, CONTAINER, LOGO, POLO, kop(K['19'])]),

"ops5-klant-haalt-doos": scene(
    f"Scene: in the warehouse a customer, a woman of about forty in ordinary clothes, points at a Top "
    f"Movers box inside an open white storage container while a mover, {KOPPEN[K['02']]}, in the "
    f"charcoal Top Movers polo, lifts it out for her with his belly toward it; both faces to the box, "
    f"content. Daylight from the open warehouse door behind them. {F}",
    [DOZEN, CONTAINER, LOGO, POLO, kop(K['02'])]),

"ops6-loods-overzicht-breed": scene(
    f"Scene: a wide view of the tall storage warehouse: rows of white steel storage containers with "
    f"the TOP MOVERS lettering on their doors stacked two high, the yellow overhead gantry crane above, "
    f"daylight from skylights. In the foreground a mover, {KOPPEN[K['16']]}, in the charcoal Top "
    f"Movers polo, pushes the aluminium hand truck with Top Movers boxes along the aisle, face ahead "
    f"and turned from the camera. Clean concrete floor. {F}",
    [DOZEN, CONTAINER, LOGO, POLO, STEEKWAGEN, kop(K['16'])], "3:2"),

"ops7-laaddok-wagen": scene(
    f"Scene: the loading dock of the warehouse on a bright day: the Top Movers truck backed up to the "
    f"open dock door, the large TOP MOVERS lettering on its side and the teal rear end visible; a mover, "
    f"{KOPPEN[K['12']]}, in the charcoal Top Movers polo, rolls the aluminium hand truck with Top "
    f"Movers boxes from the truck into the hall, face ahead; inside, a white storage container with the "
    f"lettering on the door. Brick and corrugated facade. {F}",
    [DOZEN, WAGEN, CONTAINER, LOGO, POLO, STEEKWAGEN, kop(K['12'])], "3:2", "buiten"),

# ===== 8. zorgverhuizing ==================================================================
"zor1-ziekenhuisbed-gang": scene(
    f"Scene: a bright corridor of a Dutch care home with a light floor and wide doors. Two movers in "
    f"charcoal Top Movers polos roll an empty hospital bed on its own wheels along the corridor, "
    f"{KOPPEN[K['13']]} at the head end and {KOPPEN[K['08']]} at the foot end, faces to the bed; along "
    f"the wall a rolling container with green crates. No readable signs. Daylight from windows on the "
    f"left. {F2}",
    [POLO, ROLCONTAINER, kop(K['13']), kop(K['08'])]),

"zor2-overleg-verpleegkundige": scene(
    f"Scene: a moving project leader, {KOPPEN[K['19']]}, in the charcoal Top Movers polo, talks with a "
    f"nurse in a white care uniform in the entrance hall of a care home; she holds a clipboard seen at "
    f"a shallow angle with no readable words and points down the corridor; friendly focused faces, "
    f"seen from the hips up. Daylight from the glass entrance. {F}",
    [POLO, kop(K['19'])]),

"zor3-rolcontainer-gang": scene(
    f"Scene: a mover, {KOPPEN[K['16']]}, in the charcoal Top Movers polo, pushes the unbranded rolling "
    f"container with two mesh sides of the attached reference, upright on its four wheels and loaded "
    f"with closed green crates, along a bright care-home corridor; face ahead, seen from the hips up. "
    f"Daylight from the windows. {F}",
    [POLO, ROLCONTAINER, KRAT, kop(K['16'])]),

"zor4-bewoner-nieuwe-kamer": scene(
    f"Scene: the new room of an elderly resident of about eighty-five in a care home: a mover, "
    f"{KOPPEN[K['03']]}, in the charcoal Top Movers polo, places her armchair by the window while a "
    f"care worker in a blue uniform helps the lady, seated on the edge of the bed, with her cardigan; "
    f"the lady looks at the chair with a content face. Her things wait in an open Top Movers box. "
    f"Daylight from the window. {F}",
    [DOZEN, POLO, kop(K['03'])]),

"zor5-kratten-gezondheidscentrum": scene(
    f"Scene: a mover, {KOPPEN[K['17']]}, in the charcoal Top Movers polo, carries a closed green "
    f"moving crate exactly like the attached crate reference through the corridor of a Dutch health "
    f"centre with light walls and wooden doors, seen from the hips up; behind him a colleague seen "
    f"from behind with the aluminium hand truck of green crates. No readable signs. {F}",
    [POLO, KRAT, STEEKWAGEN, kop(K['17'])]),

"zor6-wagen-zorgcentrum-breed": scene(
    f"Scene: the entrance of a modern Dutch care centre in brick and glass on a bright day; the Top "
    f"Movers truck at the entrance with the tail lift lowered at the back and the TOP MOVERS lettering "
    f"large on the side; two movers in charcoal Top Movers polos, {KOPPEN[K['10']]} and "
    f"{KOPPEN[K['15']]}, roll rolling containers with green crates from the lift toward the sliding "
    f"doors, faces to their work. {F2}",
    [POLO, WAGEN, LOGO, ROLCONTAINER, kop(K['10']), kop(K['15'])], "3:2", "buiten"),

"zor7-plattegrond-manager": scene(
    f"Scene: in the entrance hall of a care home a project leader, {KOPPEN[K['14']]}, in the charcoal "
    f"Top Movers polo, and the facility manager, a woman of about fifty in business clothes, look at a "
    f"floor plan drawing spread on a table, a drawing of rooms and corridors with no legible words; "
    f"behind them a rolling container with green crates and two movers seen small in the corridor. "
    f"Friendly focused faces. {F}",
    [POLO, ROLCONTAINER, kop(K['14'])], "3:2"),

# ===== 9. piano-verhuizen =================================================================
"pia1-piano-hondje-deur": scene(
    f"Scene: two movers in charcoal Top Movers polos roll an upright piano, wrapped in grey moving "
    f"blankets, on the large green furniture dolly of the attached reference through the doorway of a "
    f"Dutch living room; {KOPPEN[K['12']]} steers at the front walking backwards with his face to the "
    f"piano and his colleague, {KOPPEN[K['18']]} pushes at the back. Both hold the piano with the "
    f"belly toward it. Daylight from the window. {F2}",
    [POLO, HONDJE_XXL, kop(K['12']), kop(K['18'])]),

"pia2-vleugel-inpakken": scene(
    f"Scene: a black grand piano in a bright Dutch living room, its lid closed and all three legs still "
    f"ON it, standing on the floor; two movers in charcoal Top Movers polos wrap it in grey moving "
    f"blankets, {KOPPEN[K['14']]} smoothing a blanket over the lid, {KOPPEN[K['09']]} holding the "
    f"blanket at the side; faces to the piano. Daylight from tall windows. {F2}",
    [POLO, kop(K['14']), kop(K['09'])]),

"pia3-piano-laadklep": scene(
    f"Scene: the lowered tail lift at the BACK of the Top Movers truck in a Dutch street; on the "
    f"platform an upright piano wrapped in grey moving blankets on the large green dolly of the "
    f"attached reference, held steady by two movers in charcoal Top Movers polos, {KOPPEN[K['17']]} "
    f"and {KOPPEN[K['06']]}, both with the belly toward the piano, faces to it; the yellow safety "
    f"railing up; the TOP MOVERS lettering on the box side above them. {F2}",
    [POLO, WAGEN, LOGO, HONDJE_XXL, kop(K['17']), kop(K['06'])], "2:3", "buiten"),

"pia4-piano-op-plek": scene(
    f"Scene: a mover, {KOPPEN[K['11']]}, in the charcoal Top Movers polo, folds the last grey moving "
    f"blanket off an upright piano that now stands against the wall of a new Dutch living room; the "
    f"customer, a woman of about sixty in ordinary clothes, rests a hand on the piano lid with a "
    f"content face. Daylight from the window on the left. {F}",
    [POLO, kop(K['11'])]),

"pia5-eerste-noten": scene(
    f"Scene: a girl of about twelve in ordinary clothes plays the first notes on the upright piano in "
    f"the new Dutch living room, seen in three-quarter from behind, while a mover, {KOPPEN[K['05']]}, "
    f"in the charcoal Top Movers polo, folds a grey moving blanket in the background, slightly out of "
    f"focus. Daylight from the window on the right. {F}",
    [POLO, kop(K['05'])]),

"pia6-vleugel-op-hondje-breed": scene(
    f"Scene: a black grand piano wrapped in grey moving blankets, all three legs REMOVED and lying "
    f"wrapped beside it on the floor, resting on its long side on the large green furniture dolly of "
    f"the attached reference, in a bright Dutch living room; two movers in charcoal Top Movers polos "
    f"hold it steady, {KOPPEN[K['13']]} and {KOPPEN[K['16']]}, faces to the piano. Daylight from tall "
    f"windows on the left. {F2}",
    [POLO, HONDJE_XXL, kop(K['13']), kop(K['16'])], "3:2"),

"pia7-piano-straat-wagen": scene(
    f"Scene: a Dutch street with brick houses on a bright day; the Top Movers truck at the kerb with "
    f"the tail lift lowered at the back and the TOP MOVERS lettering large on the side; two movers in "
    f"charcoal Top Movers polos, {KOPPEN[K['02']]} and {KOPPEN[K['15']]}, roll a blanket-wrapped "
    f"upright piano on the large green dolly of the attached reference from the front door toward the "
    f"lift, both with the belly toward it, faces to the piano. {F2}",
    [POLO, WAGEN, LOGO, HONDJE_XXL, kop(K['02']), kop(K['15'])], "3:2", "buiten"),

# ===== 10. antiek-en-kunst-verhuizen ======================================================
"ant1-schilderij-ingepakt": scene(
    f"Scene: a mover, {KOPPEN[K['14']]}, in the charcoal Top Movers polo, folds a soft grey blanket "
    f"around a large painting that is already fully wrapped in white paper and bubble wrap so that "
    f"nothing of the canvas or the frame is visible, in an elegant Dutch living room with other "
    f"paintings still hanging on the walls; face to the wrapped painting, seen from the hips up. "
    f"Daylight from tall windows on the left. {F}",
    [POLO, kop(K['14'])]),

"ant2-antieke-kast-grachtenpand": scene(
    f"Scene: two movers in charcoal Top Movers polos steady an antique oak cabinet, wrapped in grey "
    f"moving blankets, on the black furniture dolly of the attached reference in the hall of an old "
    f"Dutch canal house with a tiled floor; {KOPPEN[K['12']]} at the front, {KOPPEN[K['08']]} behind, "
    f"faces to the cabinet. Daylight from the fanlight above the door. {F2}",
    [POLO, HONDJE_ZWART, kop(K['12']), kop(K['08'])]),

"ant3-kunstkist-schuim": scene(
    f"Scene: a mover, {KOPPEN[K['19']]}, in the charcoal Top Movers polo, lowers a fully wrapped "
    f"painting, nothing of the artwork visible, into a custom plywood art crate lined with foam, in a "
    f"bright Dutch room; the crate lid leans against the wall, no lettering on the crate. Face to the "
    f"crate, seen from the hips up. {F}",
    [POLO, kop(K['19'])]),

"ant4-delftse-vaas": scene(
    f"Scene: a mover, {KOPPEN[K['01']]}, in the charcoal Top Movers polo, seen from the hips up, "
    f"wraps a tall blue-and-white Delft vase in blank white paper on a dining table; an open Top "
    f"Movers box with crumpled paper waits beside him. Face turned down to the vase, focused and calm. "
    f"Daylight from the window on the left. {F}",
    [DOZEN, POLO, kop(K['01'])]),

"ant5-verzamelaar-adviseur": scene(
    f"Scene: a moving consultant, {KOPPEN[K['05']]}, in the charcoal Top Movers polo, and an art "
    f"collector, a man of about seventy in a cardigan, stand in a room with paintings on the walls and "
    f"an antique clock; the collector points at a large painting, the consultant looks at it and makes "
    f"a note on a tablet turned away from the camera. Friendly focused faces. {F}",
    [POLO, kop(K['05'])]),

"ant6-kunstverhuizing-breed": scene(
    f"Scene: a wide view of an elegant Dutch living room with high ceilings during an art move: two "
    f"movers in charcoal Top Movers polos, {KOPPEN[K['09']]} and {KOPPEN[K['16']]}, carry a fully "
    f"wrapped painting between them, nothing of the artwork visible; two plywood art crates stand open "
    f"on the floor, an antique chair wrapped in a blanket. Faces to the load. Daylight from tall "
    f"windows on the left. {F2}",
    [POLO, kop(K['09']), kop(K['16'])], "3:2"),

"ant7-kunstkist-grachtenpand-wagen": scene(
    f"Scene: in front of a stately Dutch canal house on a bright day, the Top Movers truck with the "
    f"tail lift lowered at the back and the TOP MOVERS lettering large on the side; two movers in "
    f"charcoal Top Movers polos, {KOPPEN[K['13']]} and {KOPPEN[K['06']]}, wheel a closed plywood art "
    f"crate on the black dolly of the attached reference onto the platform, faces to the crate. A "
    f"bicycle at the frame edge. {F2}",
    [POLO, WAGEN, LOGO, HONDJE_ZWART, kop(K['13']), kop(K['06'])], "3:2", "buiten"),

# ===== 11. kantoorverhuizing ==============================================================
"kan1-rolcontainers-kantoortuin": scene(
    f"Scene: an open-plan Dutch office being moved: two movers in charcoal Top Movers polos push "
    f"unbranded rolling containers with mesh sides exactly like the attached rolling-container "
    f"reference, upright on their four wheels and loaded with closed green crates, along the aisle "
    f"between desks; {KOPPEN[K['16']]} in front, {KOPPEN[K['15']]} behind; faces ahead. Monitors on the "
    f"desks turned off. Daylight from the office windows on the left. {F2}",
    [POLO, ROLCONTAINER, KRAT, kop(K['16']), kop(K['15'])]),

"kan2-computerbox-monitor": scene(
    f"Scene: a mover, {KOPPEN[K['08']]}, in the charcoal Top Movers polo, lowers a computer monitor "
    f"into a green plastic computer box with a lid exactly like the attached computer-box reference on "
    f"an office desk; a second box already closed beside it, cables coiled. Face to the monitor, seen "
    f"from the hips up. Daylight from the window. {F}",
    [POLO, COMPUTERBOX, kop(K['08'])]),

"kan3-bureau-bureauroller": scene(
    f"Scene: two movers in charcoal Top Movers polos roll a white office desk standing on its side on "
    f"the desk roller of the attached reference through an office corridor; {KOPPEN[K['12']]} steers, "
    f"{KOPPEN[K['11']]} pushes; faces to the desk. Daylight from windows. {F2}",
    [POLO, BUREAUROLLER, kop(K['12']), kop(K['11'])]),

"kan4-archief-archiefbox": scene(
    f"Scene: an archive room with grey steel shelving and rows of ring binders with blank spines; a "
    f"mover, {KOPPEN[K['01']]}, in the charcoal Top Movers polo, lifts a green archive box with a steel "
    f"handle exactly like the attached archive-box reference from the shelf into a rolling container; "
    f"face to the box, seen from the hips up. Daylight from a high window. {F}",
    [POLO, ARCHIEFBOX, ROLCONTAINER, kop(K['01'])]),

"kan5-projectleider-officemanager": scene(
    f"Scene: a project leader, {KOPPEN[K['19']]}, in the charcoal Top Movers polo, walks through a "
    f"new bright office with the office manager, a woman of about forty in business clothes, who "
    f"points at a row of desks; behind them two movers set up chairs, seen from behind; friendly "
    f"focused faces, seen from the hips up. Daylight from large windows. {F}",
    [POLO, kop(K['19'])]),

"kan6-wagen-kantoorpand-breed": scene(
    f"Scene: the entrance of a modern Dutch office building in glass and brick on a bright day; the "
    f"Top Movers truck with the tail lift lowered at the back and the TOP MOVERS lettering large on the "
    f"side; two movers in charcoal Top Movers polos, {KOPPEN[K['17']]} and {KOPPEN[K['03']]}, roll "
    f"rolling containers with green crates from the doors to the lift, faces to their work. {F2}",
    [POLO, WAGEN, LOGO, ROLCONTAINER, kop(K['17']), kop(K['03'])], "3:2", "buiten"),

"kan7-nieuw-kantoor-maandag": scene(
    f"Scene: a new open-plan office on a Monday morning with the desks set up and the chairs placed; "
    f"two movers in charcoal Top Movers polos, {KOPPEN[K['13']]} and {KOPPEN[K['09']]}, carry the last "
    f"green crates out, faces to their work; morning daylight through large windows; a plant, a coffee "
    f"machine, no readable signs. {F2}",
    [POLO, KRAT, kop(K['13']), kop(K['09'])], "3:2"),
}

# per-id aanvullingen uit de QA-ronde van 29-aug (alleen voor de herkansingen; blijven staan als bewijs)
EXTRA = {
"ant3-kunstkist-schuim": "The painting is first wrapped in OPAQUE white acid-free paper and only then in bubble wrap; no colour or detail of the artwork shows through; the wrapped panel reads as a plain white slab. ",
"inp1-borden-rechtop": "The box is exactly the first reference: yellow bee with dark stripes, filled teal-green and yellow hexagons only along the vertical edges, dark-grey TOP and MOVERS. The polo print has NO bee, MOVERS is white. ",
"inp4-televisie-deken": "There is NO cardboard box anywhere in this picture: beside him lie only a roll of blank white paper and a folded grey moving blanket. His chest print is exactly the polo reference, two words and one swoosh, no bee, no stripes. ",
"inp6-team-woonkamer-breed": "Drinking glasses (tumblers), never spectacles. Every box is exactly the first reference with the yellow bee and the teal-green and yellow hexagon clusters along the vertical edges, never the polo print, nothing printed on the top flaps. Both men look DOWN at their hands with their mouths CLOSED and a calm face, seen in profile or three-quarter, no smile with teeth; both heads inside the middle band of the height, well below the top edge; no earrings, no ear plugs, no jewellery. ",
"int1-duitse-straat-laadklep": "The truck is seen from the SIDE so the whole TOP MOVERS lettering on the box body is in frame; the rear of the truck is plain teal without any panel, badge or lettering. The lettering is exactly the attached logo image: no icon, no frame, no dark panel, no slogan, no web address anywhere. The three boxes on the hand truck carry only the printed name with the bee and the honeycomb edges, no slogan line, no arrows, no lines. ",
"int4-laadbak-vol-lange-rit": "Only three Top Movers boxes are close to the mover and fully in view; the rest of the load is furniture under grey blankets tucked in by hand. No tape on any seam. The rear of the truck is plain teal without any text. The truck is a European Volvo. ",
"int6-snelweg-wagen": "The lettering on the side is exactly the attached logo image, in TWO stacked lines: the word TOP alone on the upper line, the word MOVERS alone on the lower line set slightly to the right, never both words side by side on one line; the broad broken teal ellipse of the logo image curving around the words with a large arrow head to the right; never both words on one line, never two arrows. The same mark appears small on the rear. ",
"kan5-projectleider-officemanager": "The office manager is a WOMAN of about forty in a blazer and blouse, clearly in the picture next to the project leader, pointing at the desks; she is the second main person. The project leader carries NOTHING; his hands are free or hold a tablet seen at an angle. There is no cardboard box anywhere in the picture. The two movers in the background wear polos with a PLAIN back, no print on the back. ",
"mon2-kast-opbouwen": "TOP and MOVERS are BOTH dark grey on the boxes and BOTH white on the polos; the teal mark is the broad broken ellipse of the logo image around the two words with a large arrow head to the right, and it never crosses a letter. The boxes are kraft with hexagons only along the vertical edges and the yellow bee, no padlock or other icons, nothing printed on the top flaps. The cordless drill is plain: no brand name on the tool or the battery. The young mover keeps his mouth closed. ",
"ops1-containers-deur-sluiten": "The mover stands three-quarter toward the camera at the door so the chest print on his left chest is visible; the back of his polo is plain, no print on the back. Container doors: letters near-black, ONE teal swoosh BELOW the letters ending in an arrow to the right of MOVERS, no chevrons, no container numbers, codes, plates or stickers on any door. ",
"ops7-laaddok-wagen": "The whole TOP MOVERS lettering on the truck side is fully inside the frame with clear space to the right; the truck stands backed up to the dock with its rear at the dock edge. The mover stands in profile ON the dock platform, rolling the hand truck from the open truck toward the hall door, feet and wheels fully in frame. The boxes carry only the printed name with one bee; no weight labels, no codes on the box sides. ",
"par5-laadbak-inladen": "The teal mark on every box and on the polo is exactly the one in the box reference: a broad broken ellipse around the two words with a large arrow head to the right. Under the wordmark every box shows only bare kraft cardboard. TOP and MOVERS are both dark grey on the boxes and both white on the polo; no web address and no other word anywhere; the bee is a yellow cartoon bee; coloured hexagons only along the vertical edges. The licence plate is a blank yellow rectangle. No small lettering anywhere on the side of the truck. The cargo bay walls are plain: no straps, rails or nets. The mover looks at the wall of boxes. ",
"par6-straat-wagen-breed": "The name appears exactly ONCE on this truck, on the flat side panel; the rear panel and both cab doors are smooth empty white surfaces, the way a freshly painted panel looks. Both movers are seen from behind or in profile so that no chest print is visible, and the BACK of every polo is plain charcoal with no print at all; the collars are plain charcoal without yellow piping. Under TOP MOVERS on the boxes nothing is printed: no lines, no pictograms, no QR code, nothing on the top flaps. No straps, ratchets or paper sheets hang in the cargo bay. The mover at the lift looks at his boxes, never toward the camera. ",
"pia1-piano-hondje-deur": "The shaved-head mover at the front walks BACKWARDS toward the camera, seen over his shoulder, both hands on the piano, belly and face toward the piano, never with his back to it. ",
"pia6-vleugel-op-hondje-breed": "The grand piano lies on its straight long side on the flat green dolly, lid toward the wall. The underside of the piano is completely bare: a smooth wooden surface with three empty round leg plates and one empty rectangular plate where the pedal lyre was, nothing sticking out of it anywhere. Beside it on the floor lie exactly three blanket-wrapped legs and one blanket-wrapped pedal lyre, all detached. ",
"sen4-boeken-nieuw-appartement": "The open Top Movers box stands upright on the floor at his feet; he lifts two or three books out with both hands and sets them upright on the shelf. Under the wordmark every box shows only bare kraft cardboard: no sentence, no weight label, no FSC mark, no QR code. The elderly lady sits in her chair with her face turned toward the bookshelf, her lips closed, and she points at the shelf, never toward the camera and never into the lens. ",
"sen6-koffie-fotoalbum": "Every box is exactly like the first reference: honeycomb hexagons along the edges, the yellow bee at the P, and only bare kraft cardboard under the wordmark, no sentence, no slogan, no weight label, no QR code; closed by folding the flaps into each other, no tape anywhere, nothing printed on the top. ",
"sen7-bungalow-wagen-breed": "The name appears exactly ONCE on this van, on the flat side panel, in TWO stacked lines with the word TOP alone above the word MOVERS, both black with the teal swoosh under them. The white panel above the rear door is one smooth empty white surface and both cab doors are smooth empty white surfaces, the way a freshly painted panel looks. Empty cargo bay without straps, blank licence plate. Under the wordmark every box shows only bare kraft cardboard. ",
"spo6-twee-wagens-straat": "Every box is EXACTLY the first reference (kraft, honeycomb hexagons along the edges, TOP over MOVERS with the yellow bee) with only bare kraft cardboard under the wordmark, all boxes identical. The blanket-wrapped furniture is held by hand, NO straps, bands, ropes or tape. Seen from behind, the back of every polo is ONE flat field of plain charcoal fabric from collar to hem, the way an unprinted shirt looks. The panel above each cab is plain white; the name appears once per truck on the side. Everyone is seen from behind or in profile, nobody looks toward the camera. ",
"zor6-wagen-zorgcentrum-breed": "The side of the truck carries ONLY the attached logo image: the O of TOP is a solid black letter like the T and the P, the broad broken teal ellipse around the words with an arrow head to the right; the cab doors are plain white; the cargo bay walls are bare without hanging straps; the tail lift has a yellow railing; the movers are seen at an angle from behind so no chest print is visible. ",
"zor7-plattegrond-manager": "The project leader's lips touch each other and no teeth are visible at all, a calm closed-mouth expression while he looks down at the plan. The mover in the corridor walks with his belly toward the wrapped sofa and his face turned to it. The polos of the two movers in the corridor are plain charcoal on the back, no print on the back. Faces a little lower in the frame for the banner crop. ",
}

DIENST = {"par": "particulier-verhuizen", "int": "internationale-verhuizing", "sen": "seniorenverhuizing",
          "spo": "spoedverhuizing", "inp": "inpakservice", "mon": "montage-demontage",
          "ops": "inboedelopslag", "zor": "zorgverhuizing", "pia": "piano-verhuizen",
          "ant": "antiek-en-kunst-verhuizen", "kan": "kantoorverhuizing"}


def prompt_van(s, naam=""):
    refs = s["refs"]
    delen = []
    if refs and refs[0] == DOZEN:
        delen.append(DOOS)
    delen.append(TEKST)
    if WAGEN in refs:
        delen.append(WAGEN_ANKER)
    if CONTAINER in refs:
        delen.append(CONTAINER_ANKER)
    delen.append(KLEUR)
    delen.append(VAK)
    if POLO in refs:
        delen.append(UNIFORM)
    delen.append(KLANT)
    delen.append(s["tekst"] + " " + EXTRA.get(naam, ""))
    delen.append(STEMMING)
    delen.append(KADER_LIGGEND if s["ar"] == "3:2" else KADER_STAAND)
    delen.append(LICHT_BUITEN if s["licht"] == "buiten" else LICHT_BINNEN)
    delen += [CAMERA, IMPERFECT, AFWERKING, NEG]
    return "".join(delen)


def gen(item):
    naam, s = item
    uit = UIT / f"{naam}.png"
    parts = [{"inlineData": {"mimeType": "image/jpeg" if p.suffix in (".jpg", ".jpeg") else "image/png",
                             "data": b64(p)}} for p in s["refs"]]
    parts.append({"text": prompt_van(s, naam)})
    body = json.dumps({
        "contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["IMAGE"],
                             "imageConfig": {"aspectRatio": s["ar"], "imageSize": "2K"}},
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
            return f"  {naam}: GEEN BEELD {json.dumps(d)[:300]}"
        except Exception as e:
            if poging == 3:
                return f"  {naam}: FAALT {str(e)[:300]}"
            time.sleep(8 * poging)


if __name__ == "__main__":
    UIT.mkdir(exist_ok=True)
    for p in {r for s in SCENES.values() for r in s["refs"]}:
        assert p.exists(), f"referentie ontbreekt: {p}"
    wens = sys.argv[1:]
    todo = [(n, s) for n, s in SCENES.items() if not wens or any(n.startswith(w) for w in wens)]
    if os.environ.get("ALLEEN_PROMPT"):
        for n, s in todo:
            print(f"### {n} [{s['ar']}, {s['licht']}, refs={[r.name for r in s['refs']]}]\n{prompt_van(s, n)}\n")
        sys.exit()
    print(f"{len(todo)} generaties, {MODEL}, 2K", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        for regel in ex.map(gen, todo):
            print(regel, flush=True)
