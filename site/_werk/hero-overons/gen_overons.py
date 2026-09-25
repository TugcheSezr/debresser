#!/usr/bin/env python3
"""Tien hero-kandidaten voor /over-de-kievit/: voorbereiding, lachende verhuizers, zon.

Opzet volgt site/_werk/hero-venlo/gen_hero.py (21:9 op 2K, gemini-3-pro-image-preview): de vaste
blokken DOOS (gen_pagina.py), UNIFORM/BLIK/HANDEN (gen_contact.py) en KADER/CAMERA/IMPERFECT/
AFWERKING (gen_hero.py) worden bij het draaien uit die bestanden gelezen, zodat er een waarheid blijft.
Eigen aan deze serie: zonlicht in plaats van ochtendschemer, lachend in de lens (vraag van Shahab),
kadrering vanaf de heupen (borstprint blijft heel) en per scene een andere mix van koppen 01 t/m 19.
Referenties, in deze volgorde: 1 dozen, 2 polo, 3.. koppen, laatste = steekwagen als die in beeld is.
Key uit de omgeving: GEMINI_API_KEY=... python3 gen_overons.py [scene-id ...]
"""
import ast, base64, json, os, pathlib, re, sys, time
import urllib.request
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image-preview"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
HIER = pathlib.Path(__file__).resolve().parent
WERK = HIER.parent
UIT = HIER / "out"; UIT.mkdir(exist_ok=True)
SKILL = pathlib.Path.home() / ".claude/skills/foto-optimalisatie"
KOPPEN = SKILL / "gezichten-mix"
PROPS = SKILL / "objecten"


def blok(bestand, naam):
    """Leest `NAAM = ( "..." "..." )` uit een bestaand script als een string."""
    s = pathlib.Path(bestand).read_text(encoding="utf-8")
    m = re.search(rf'^{naam}\s*=\s*\((.*?)^\)', s, re.S | re.M)
    assert m, f"{naam} niet gevonden in {bestand}"
    return ast.literal_eval("(" + m.group(1) + ")")


DOOS = blok(WERK / "paginabeeld/gen_pagina.py", "DOOS")
UNIFORM = blok(WERK / "paginabeeld/gen_contact.py", "UNIFORM").replace(
    "the attached polo reference", "the SECOND attached reference image (the polo)")
BLIK = blok(WERK / "paginabeeld/gen_contact.py", "BLIK").replace("the person looks", "every mover looks")
CAMERA = blok(WERK / "hero-venlo/gen_hero.py", "CAMERA")
IMPERFECT = blok(WERK / "hero-venlo/gen_hero.py", "IMPERFECT")
AFWERKING = blok(WERK / "hero-venlo/gen_hero.py", "AFWERKING")

HANDEN = (
"Hands: every finger is countable and correctly jointed, five per hand. A hand that holds a box "
"grips its hand hole or its bottom edge with visible tension in the fingers; a hand on a blanket, a "
"clipboard or a hand truck handle wraps around it; no hand presses against empty air. "
)
VAK = (
"Trade rules: anyone carrying does it with the belly toward the load and the arms in front of the "
"body, never a box on the shoulder, never the back to the load. A hand truck, if present, is EXACTLY "
"the unbranded aluminium hand truck of the LAST attached reference, plate under the load, upright, "
"nobody standing on it. Moving blankets are plain grey quilted blankets, loosely folded, never "
"strapped. The moving truck, if present, is a plain white box truck seen from the rear with its "
"roller door open and the tail lift down, no lettering and no decals anywhere on it. No earbuds, "
"no hi-vis, no caps. "
)
LICHT = (
"Light: bright, cheerful high-summer sunshine, one dominant sun from the upper right, about 40 "
"degrees above the horizon, clear blue sky with a few small white clouds; crisp sunlit faces with "
"real, sharp-edged shadows, warm sunlight on the brick, cooler blue in the open shade under the "
"truck and in doorways; highlights on skin and cardboard are allowed to clip a little. Not flat, "
"not overcast, not golden-hour orange. "
)
KADER = (
"Composition for a very wide website banner (21:9) that is later cropped to a shallow horizontal "
"band: keep every face and every hand inside the middle 70 percent of the height, nothing important "
"in the top 15 percent. The people stand in the RIGHT HALF of the frame, framed from the HIPS UP so "
"the chest print stays large and legible; the LEFT HALF shows the street, the truck or the house "
"with less detail, because a headline is placed over the middle later. Everything each person holds "
"stays inside the width of their OWN SHOULDERS, and no person and no object touches any border. "
)
NEG = (
"Avoid: any text overlay, watermark, logo of another brand, tape on any box, straps or ropes, "
"plastic wrap, pallets, boxes lying flat, cartoon or CGI look, plastic skin, HDR halos, held or "
"posed stock smiles, American houses, road signs or licence plates, snow, rain. "
)

# kop-id -> korte beschrijving uit gezichten-mix/MANIFEST.md (leeftijd aan beide kanten vastgezet)
KOP = {
 "01": "45 to 55 years old, full grey beard, glasses", "02": "30 to 40, bald, reddish beard",
 "03": "40 to 50, thinning blond hair, goatee", "04": "40 to 50, bald, full grey beard, glasses",
 "05": "55 to 65, grey mid-length hair", "06": "17 to 22, blond haircut, boyish",
 "07": "30 to 40, broad laugh, neck tattoo", "08": "25 to 32, neat dark hair",
 "09": "28 to 36, dark curls, short beard", "10": "28 to 38, stubble, mediterranean look, no cap",
 "11": "28 to 38, sleek hair combed back, beard, strong jawline", "12": "45 to 55, shaved head, rugged",
 "13": "45 to 55, short grey hair, lean and sporty", "14": "50 to 60, thinning hair, grey beard",
 "15": "22 to 30, blond, boyish", "16": "25 to 35, dark-skinned man, undercut with a top knot, moustache and beard",
 "17": "35 to 45, heavy build, dark stubble", "18": "25 to 35, undercut, beard, young",
 "19": "28 to 38, glasses, neat, office look",
}
ORD = ["THIRD", "FOURTH", "FIFTH", "SIXTH"]


def kopbestand(nr):
    return next(KOPPEN.glob(f"kop-{nr}-*@4x.png"))


def mensen(koppen, rollen):
    """Blok dat elke verhuizer aan zijn referentiekop koppelt; rollen = korte plaatsbeschrijving per persoon."""
    t = f"THE PEOPLE: exactly {len(koppen)} Top Movers movers"
    t += (", plus one customer in plain everyday clothes with no logo, whose face is not any reference. "
          if "klant" in rollen else ". ")
    for i, (nr, rol) in enumerate(zip(koppen, rollen.get("verhuizers", []))):
        t += (f"The mover {rol} has EXACTLY the face of the {ORD[i]} attached reference image: {KOP[nr]}, "
              f"same age as in that reference, no younger and no older, slim, not heavier or rounder. ")
    t += "Each face is a different man; no two men look alike. "
    return t


SCENES = [
 dict(id="01-briefing-laadklep", koppen=["07", "13", "06"], rollen=dict(verhuizers=["on the left", "in the middle", "on the right"]),
      scene="Scene: early on a moving day in a residential street of Dutch brick terraced houses in Venlo. The open rear of a plain white moving truck with its tail lift down stands at the kerb on the left. In the right half three movers stand close together at the tail lift, the middle one holding a clipboard with the moving plan that the other two lean in to look at; all three have just burst out laughing and look straight into the lens. Two Top Movers boxes stand on the tail lift beside them."),
 dict(id="02-dozen-bezorgen", koppen=["09"], rollen=dict(verhuizers=["with the hand truck"], klant=True), steekwagen=True,
      scene="Scene: the front door of a 1930s Dutch brick house with a small front garden in Venlo, a bicycle against the fence. A mover wheels a hand truck stacked with three Top Movers boxes up the garden path to the open front door where a customer in a plain sweater stands laughing; the mover turns his head to the camera and laughs into the lens. Bright sun, sharp shadows on the path."),
 dict(id="03-dekens-vouwen", koppen=["02", "15"], rollen=dict(verhuizers=["on the left", "on the right"]),
      scene="Scene: beside the open rear of a plain white moving truck on a sunny Dutch street, two movers fold a big grey quilted moving blanket between them, each holding two corners, a stack of already folded blankets and four Top Movers boxes on the tail lift behind them; both laugh into the lens mid-fold."),
 dict(id="04-inpakken-keuken", koppen=["11"], rollen=dict(verhuizers=["at the table"], klant=True),
      scene="Scene: a bright Dutch kitchen with sun streaming through a large window, a wooden table with plates, glasses and sheets of white packing paper, two open Top Movers boxes on the table. A mover wraps a plate in paper and looks up laughing into the lens; a customer in a plain shirt beside him laughs too, holding a mug. Half-packed shelves behind, not tidy."),
 dict(id="05-kast-laadklep", koppen=["17", "18"], rollen=dict(verhuizers=["at the front", "at the back"]),
      scene="Scene: two movers carry a tall wooden cabinet wrapped in grey quilted moving blankets up the tail lift of a plain white moving truck, bellies toward the cabinet, arms in front, fingers visibly gripping; both grin broadly into the lens while carrying. Sunlit Dutch brick houses across the street, Top Movers boxes stacked on the pavement."),
 dict(id="06-opname-handdruk", koppen=["14"], rollen=dict(verhuizers=["in the polo"], klant=True),
      scene="Scene: the doorstep of a Dutch brick house in the sun. A moving adviser in the Top Movers polo shakes hands with a customer in plain clothes in the open doorway; the adviser looks into the lens laughing, the customer laughs too. A folder with the moving plan under the adviser's arm, a neat stack of three Top Movers boxes just inside the hall."),
 dict(id="07-team-straat", koppen=["01", "08", "12"], rollen=dict(verhuizers=["pushing the hand truck", "carrying a box", "on the right"]), steekwagen=True,
      scene="Scene: three movers walk toward the camera along a sunlit street of old Dutch brick houses in the centre of Venlo, one pushing a hand truck with three Top Movers boxes, one carrying a single Top Movers box in front of his belly with both hands, one walking beside them with a folded blanket over his arm; all three laugh into the lens as if the photographer just said something funny. Cobblestones, a bicycle against a facade, long sharp shadows."),
 dict(id="08-doos-aangeven", koppen=["03", "16"], rollen=dict(verhuizers=["standing on the tail lift", "standing on the street"]),
      scene="Scene: at the open rear of a plain white moving truck in the sun, one mover stands on the tail lift and takes a Top Movers box that his colleague on the street hands up to him, both gripping the box with visible tension; both laugh into the lens. More Top Movers boxes stacked neatly inside the truck behind them."),
 dict(id="09-koffie-laadklep", koppen=["04", "10", "19"], rollen=dict(verhuizers=["on the left", "in the middle", "on the right"]),
      scene="Scene: before the work starts, three movers sit and stand on the lowered tail lift of a plain white moving truck in the morning sun with paper coffee cups, a thermos and a bag of bread rolls beside them, a stack of Top Movers boxes and folded grey blankets inside the truck behind them; all three laugh into the lens, relaxed and at ease."),
 dict(id="10-plan-keukentafel", koppen=["05", "13"], rollen=dict(verhuizers=["on the left", "on the right"], klant=True),
      scene="Scene: a sunny living room half packed for a move, Top Movers boxes stacked along the wall, a sofa under a grey blanket. At a dining table by the window a moving adviser and a colleague sit with a customer in plain clothes over a printed moving plan and a tablet, all three laughing into the lens; a mug and a pen on the table."),
]


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


def mime(p):
    return "image/jpeg" if p.suffix.lower() in (".jpg", ".jpeg") else "image/png"


def gen(sc):
    refs = [WERK / "hero-venlo/ref-dozen.jpg", WERK / "paginabeeld/refs/ref-polo.jpg"] + [kopbestand(n) for n in sc["koppen"]]
    if sc.get("steekwagen"):
        refs.append(PROPS / "steekwagen.png")
    parts = [{"inlineData": {"mimeType": mime(p), "data": b64(p)}} for p in refs]
    tekst = (DOOS + UNIFORM + mensen(sc["koppen"], sc["rollen"]) + BLIK + HANDEN + VAK + sc["scene"] + " "
             + KADER + LICHT + CAMERA + IMPERFECT + AFWERKING + NEG)
    # prompts NAAST out/, want out/ staat in _werk/.gitignore (zelfde afspraak als de eerdere
    # generatorrondes) en dan zou de tekst van elke plaat niet bewaard blijven
    PROMPTS = HIER / "prompts"; PROMPTS.mkdir(exist_ok=True)
    (PROMPTS / f"{sc['id']}.txt").write_text(tekst + "\n\nREFS: " + ", ".join(p.name for p in refs), encoding="utf-8")
    parts.append({"text": tekst})
    body = json.dumps({"contents": [{"parts": parts}],
                       "generationConfig": {"responseModalities": ["IMAGE"],
                                            "imageConfig": {"aspectRatio": "21:9", "imageSize": "2K"}}}).encode()
    for poging in (1, 2, 3):
        try:
            req = urllib.request.Request(URL, data=body, headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
            t0 = time.time()
            with urllib.request.urlopen(req, timeout=420) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    uit = UIT / f"{sc['id']}.png"
                    uit.write_bytes(base64.b64decode(p["inlineData"]["data"]))
                    print(f"  {sc['id']}: {uit.stat().st_size // 1024} kB in {time.time() - t0:.0f}s", flush=True)
                    return True
            print(f"  {sc['id']}: geen beeld in antwoord ({json.dumps(d)[:300]})", flush=True)
        except Exception as e:
            print(f"  {sc['id']}: poging {poging} faalt: {str(e)[:300]}", flush=True)
            time.sleep(6 * poging)
    return False


if __name__ == "__main__":
    kies = sys.argv[1:] or [s["id"] for s in SCENES]
    todo = [s for s in SCENES if s["id"] in kies]
    print(f"{len(todo)} scenes, 3 parallel, model {MODEL}", flush=True)
    with ThreadPoolExecutor(max_workers=3) as ex:
        res = list(ex.map(gen, todo))
    print(f"klaar: {sum(res)} van {len(todo)} gelukt", flush=True)
