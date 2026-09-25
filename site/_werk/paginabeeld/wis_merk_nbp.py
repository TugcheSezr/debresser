#!/usr/bin/env python3
"""Apple-logo van de laptop halen met een NBP-edit plus regio-composit.

Waarom niet deterministisch: drie pogingen met een vlakvulling (Jacobi, daarna een kwadratische fit
op de rand-ring) lieten allemaal een zichtbaar rechthoekig vlak achter, precies het faalpatroon dat
in de skill staat ("GEEN rechthoekige kloonvlak-wis: elke donorpatch bleef als vlak zichtbaar"). De
oorzaak is dat de doos de dekselrand en de hand raakt, dus de ring waarop je fit is geen deksel.
De route die vandaag drie keer wel werkte: edit met het viercontract, daarna alleen de gewijzigde
regio binnen een vaste doos terug op de bron.

GEMINI_API_KEY=... python3 wis_merk_nbp.py
"""
import base64, json, os, pathlib, time, urllib.request
import numpy as np
from PIL import Image, ImageFilter

KEY = os.environ["GEMINI_API_KEY"]
URL = ("https://generativelanguage.googleapis.com/v1beta/models/"
       "gemini-3-pro-image-preview:generateContent")
HIER = pathlib.Path(__file__).resolve().parent
RAW, CUT = HIER / "contact-raw", HIER / "contact-cut"

# id -> (doos in RAW-coordinaten rond het logo)
KLUSSEN = {"pc-man-a2": (1080, 1590, 1370, 1890), "pc-man-c2": (310, 1730, 600, 2030)}

PROMPT = (
"You are editing the attached photograph of a person in a charcoal polo holding a silver laptop "
"against the body, on a flat magenta background. "
"CHANGE ONLY the lid of the laptop: remove the fruit-shaped brand logo from it completely, so the "
"lid is one plain, unmarked brushed-aluminium surface with the same soft gradient and the same "
"reflections it already has. No logo, no badge, no engraving, no sticker, nothing in its place. "
"PRESERVE everything else pixel for pixel: the person, the face, the hair, the polo and its chest "
"print, both hands and every finger, the shape and edges of the laptop, the magenta background. "
"MATCH the existing light direction, the gradient across the lid, the sensor grain and the depth of "
"field exactly. AVOID: changing the laptop's shape or angle, adding any other object, sharpening, "
"a visible patch or rectangle on the lid."
)


def edit(naam):
    bron = RAW / f"{naam}.png"
    body = json.dumps({"contents": [{"parts": [
        {"inlineData": {"mimeType": "image/png",
                        "data": base64.b64encode(bron.read_bytes()).decode()}},
        {"text": PROMPT}]}],
        "generationConfig": {"responseModalities": ["IMAGE"],
                             "imageConfig": {"aspectRatio": "3:4", "imageSize": "2K"}}}).encode()
    for poging in (1, 2, 3):
        try:
            req = urllib.request.Request(URL, data=body, headers={
                "Content-Type": "application/json", "x-goog-api-key": KEY})
            with urllib.request.urlopen(req, timeout=300) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    uit = HIER / "contact-edit" / f"{naam}.png"
                    uit.parent.mkdir(exist_ok=True)
                    uit.write_bytes(base64.b64decode(p["inlineData"]["data"]))
                    return uit
            return None
        except Exception:
            if poging == 3:
                return None
            time.sleep(5 * poging)


def composit(naam, doos):
    """Alleen de gewijzigde pixels binnen de doos overnemen, op de RAW, en daarna opnieuw keyen."""
    a_im = Image.open(RAW / f"{naam}.png").convert("RGB")
    b_im = Image.open(HIER / "contact-edit" / f"{naam}.png").convert("RGB").resize(a_im.size, Image.LANCZOS)
    a, b = np.asarray(a_im, int), np.asarray(b_im, int)
    verschil = np.abs(a - b).max(2) > 25
    binnen = np.zeros(verschil.shape, bool)
    x0, y0, x1, y1 = doos
    binnen[y0:y1, x0:x1] = True
    m = Image.fromarray((verschil & binnen).astype(np.uint8) * 255)
    m = m.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(4))
    mf = np.asarray(m, float)[..., None] / 255.0
    uit = (a * (1 - mf) + b * mf).round().clip(0, 255).astype(np.uint8)
    doel = HIER / "contact-klaar" / f"{naam}.png"
    doel.parent.mkdir(exist_ok=True)
    Image.fromarray(uit).save(doel)
    return (np.asarray(m) > 8).mean() * 100


if __name__ == "__main__":
    for naam, doos in KLUSSEN.items():
        if edit(naam):
            print(f"  {naam}: edit ok, {composit(naam, doos):.2f}% overgenomen")
        else:
            print(f"  {naam}: edit FAALT")
