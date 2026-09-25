"""Versie 3: het gezicht van de man links (gezicht 04) week af van de referentie (rond, jonger, andere neus).
Alleen dat gezicht opnieuw: een vierkante uitsnede rond zijn hoofd gaat met gezicht-04 als referentie naar
het model, en alleen het gezicht komt met een zachte ellips terug op het ruwe beeld van e0 (werk/versie-3-ruw-e0.jpg).
    python werk/gezicht_v3.py           # vraagt het model (kost een beeld), schrijft werk/v3-kop-model.png
    python werk/gezicht_v3.py --plak    # alleen terugplakken: werk/v3-kop-model.png -> versie-3.jpg
"""
import base64, io, pathlib, sys
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, str(pathlib.Path.home() / ".claude/skills/image-versions/scripts"))
import ronde

HIER = pathlib.Path(__file__).resolve().parent
RONDE = HIER.parent
RUW = HIER / "versie-3-ruw-e0.jpg"
REF = r"C:\Users\arnas\Git_Repos\debresser\beeldronde-debresser\gezichten\gezicht-04-twists-snor.jpg"
VAK = (481, 46, 1081, 646)          # 600x600 rond het hoofd van de man links
MODEL = HIER / "v3-kop-model.png"
PROMPT = ("Edit the first image, a crop of a photograph. Replace ONLY the face of the man in it with the face of the "
          "man in the second image, the reference portrait: the same person, recognisably, with his long narrow face, "
          "high cheekbones, straight nose, thin moustache, light stubble on the chin but no goatee, a few small dark "
          "moles on his left cheek, and deep brown skin. He is about 32. Keep everything else exactly as it is in the "
          "first image: his short twists hairstyle and hairline, the angle and position of his head, his calm expression "
          "with the lips closed and touching and no teeth visible, the daylight from the front and a little to the right, "
          "the charcoal polo collar and shoulders, and the dark warehouse background. Same framing, same size, same "
          "colours and grain; no text, no logos.")

if "--plak" not in sys.argv:
    key, _ = ronde.sleutel()
    if not key:
        raise SystemExit("geen GEMINI_API_KEY")
    buf = io.BytesIO(); Image.open(RUW).convert("RGB").crop(VAK).save(buf, "PNG")
    beelden = [("image/png", base64.b64encode(buf.getvalue()).decode()), ronde.laad_beeld(REF, "gezicht")]
    mime, data = ronde.vraag(ronde.api_basis(), "gemini-3-pro-image-preview", key, beelden, PROMPT, "1:1", "1K")
    Image.open(io.BytesIO(data)).convert("RGB").save(MODEL)
    print("model:", MODEL)

basis = Image.open(RUW).convert("RGB")
w, h = VAK[2] - VAK[0], VAK[3] - VAK[1]
kop = Image.open(MODEL).convert("RGB").resize((w, h), Image.LANCZOS)
masker = Image.new("L", (w, h), 0)
# gezicht van wenkbrauw tot kin, binnen de haarlijn; in uitsnede-px (hoofdmidden ongeveer 322,330)
ImageDraw.Draw(masker).ellipse(ELLIPS := (262, 266, 384, 430), fill=255)
masker = masker.filter(ImageFilter.GaussianBlur(9))
basis.paste(kop, VAK[:2], masker)
basis.save(RONDE / "versie-3.jpg", quality=95)
print("versie-3.jpg geschreven")
