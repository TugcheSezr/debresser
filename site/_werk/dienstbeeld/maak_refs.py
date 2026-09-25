#!/usr/bin/env python3
"""Referentiebeelden voor gen_dienst.py, uit de echte Top Movers-fotografie in topmovers/fotos.

- ref-wagen.jpg: zijkant van de bakwagen met het grote TOP MOVERS-lockup, teal skirt en de laadklep
  achterop (bron 2025-09_IMG_0179.jpg). Het kleine Erkende Verhuizers-logo vooraan op de bak is
  weggewerkt met een vlak in de bakkleur, anders kopieert het model het als garble.
- ref-container.jpg: deuren van een witte opslagcontainer met het lockup (bron 2021-10_opslag-
  TOPMOVERS-46.jpg). Ledennaam, containercode, typeplaatje en het EV-logo op de deuren weggewerkt.
- ref-logo.jpg: het RGB-logo op wit (bron topmovers/logos-certificaten), als laatste 'zo ziet het
  lockup eruit'-referentie bij wagen- en containerscenes.
Dozen en polo komen ongewijzigd uit _werk/hero-venlo/ref-dozen.jpg en _werk/paginabeeld/refs/ref-polo.jpg.
"""
import pathlib
from PIL import Image, ImageDraw, ImageFilter

HIER = pathlib.Path(__file__).resolve().parent
REPO = HIER.parents[2]
FOTOS = REPO / "topmovers/fotos"
UIT = HIER / "refs"


def vlak(im, box, monster):
    """Vult box met de gemiddelde kleur rond monster (x, y), licht geblurd zodat het geen harde plak wordt."""
    x, y = monster
    kleur = im.crop((x - 12, y - 12, x + 12, y + 12)).resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    laag = Image.new("RGB", im.size, kleur)
    masker = Image.new("L", im.size, 0)
    ImageDraw.Draw(masker).rectangle(box, fill=255)
    masker = masker.filter(ImageFilter.GaussianBlur(3))
    return Image.composite(laag, im, masker)


# wagen: bron 3264x2448; bak loopt van ongeveer x=1360 tot de rechterrand, y=570..1650
w = Image.open(FOTOS / "2025-09_IMG_0179.jpg").convert("RGB")
w = vlak(w, (1440, 720, 1760, 870), (1600, 950))          # Erkende Verhuizers-logo vooraan op de bak
w = w.crop((1250, 380, 3264, 1820)).resize((1600, 1144), Image.LANCZOS)
w.save(UIT / "ref-wagen.jpg", quality=90)

# container: bron 1800x1200
c = Image.open(FOTOS / "2021-10_opslag-TOPMOVERS-46.jpg").convert("RGB")
c = vlak(c, (1225, 295, 1345, 365), (1300, 420))          # containercode rechtsboven
c = vlak(c, (1180, 525, 1380, 615), (1300, 660))          # Erkende Verhuizers op de rechterdeur
c = vlak(c, (900, 622, 1115, 722), (1000, 760))           # ledennaam linksonder
c = vlak(c, (920, 578, 972, 632), (1000, 760))            # typeplaatje
c = c.crop((840, 180, 1520, 940)).resize((1000, 1118), Image.LANCZOS)
c.save(UIT / "ref-container.jpg", quality=90)

# logo op wit
l = Image.open(REPO / "topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-RGB.png").convert("RGBA")
wit = Image.new("RGB", l.size, (255, 255, 255))
wit.paste(l, mask=l.split()[3])
rand = Image.new("RGB", (l.width + 120, l.height + 120), (255, 255, 255))
rand.paste(wit, (60, 60))
rand.save(UIT / "ref-logo.jpg", quality=92)
for p in sorted(UIT.glob("*.jpg")):
    print(p.name, Image.open(p).size)
