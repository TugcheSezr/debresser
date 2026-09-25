"""De De Bresser-opdruk op de verhuisdoos in versie 2 (werkers-aan-het-werk-r4, 25-09-2026).

Notitie van de gebruiker bij ronde 3: "add branding to the box ." De doos is de witte verhuisdoos die de
jonge man aangeeft; de laadbak heeft zijn belettering al.

Opdruk zoals op de echte De Bresser-doos (2024-03_De-Bresser-Verhuizingen.jpg, brandbook #dozen): op de
lange zijde het logo zonder kroon (beeldmerk, DE BRESSER, de twee regels) en onderaan www.debresser.nl. Het
logo is het echte bestand, via logo_zonder_kroon() uit merk-op-wagen.py, dezelfde uitsnede als zone D op de
goedgekeurde wagens; alleen www.debresser.nl is gezet in Bahnschrift, omdat daar geen bestand van is.
Het Erkende (Project) Verhuizers-merk op de korte zijde niet: er is alleen een bestand van Erkende Verhuizers.

Het vlak wordt met een homografie op de lange zijde gezet en alleen gedrukt waar karton te zien is: de mouw en
de onderarm van de jonge man blijven ervoor (omtrek met de hand gemeten, meet-doos-mouw.png; op kleur
gaat het niet, de mouw en het karton in de schaduw zijn allebei grijs). De lange zijde staat in de schaduw
(136,128,141 tegen 245 voor wit karton in de zon), dus de inkt wordt per kanaal vermenigvuldigd met
karton / wit karton in de zon, en niet met samenvoegen() uit merk-op-wagen.py: die rekent met het vlak zelf als
wit en klemt op 0,55, en dan ligt de opdruk er in zonlicht op.

    python opdruk-op-doos.py <rondemap> <nr>      leest versie-<nr>-wagen.png, schrijft versie-<nr>-doos.png
"""
import importlib.util
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

_spec = importlib.util.spec_from_file_location("wagen", Path(__file__).resolve().parent / "merk-op-wagen.py")
wagen = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(wagen)

# De lange zijde van de doos (links, in de schaduw), in beeldpixels: linksboven, rechtsboven, rechtsonder,
# linksonder. Gemeten: de bovenrand, de voorste staande rand (tot de hand bij y 1090, daarna doorgetrokken) en
# de onderrand tussen x 780 en 843, net boven de onderarm. De hoek linksonder zit achter de mouw: de achterste
# rand evenwijdig aan de voorste.
# "voor": wat voor de doos zit (mouw, bovenarm, onderarm, hand), als veelhoek in beeldpixels.
VERSIES = {2: {"zijde": [(653, 848), (935, 872), (971, 1150), (689, 1124)],
               "voor": [(630, 903), (662, 930), (673, 940), (693, 963), (703, 983), (713, 1003), (720, 1023),
                        (727, 1043), (740, 1063), (753, 1077), (760, 1087), (770, 1110), (780, 1132),
                        (843, 1142), (950, 1120), (963, 1090), (990, 1070), (990, 1160), (630, 1160)],
               "wit": 245.0}}   # wit karton in de zon: mediaan van de korte zijde rechts, x 1010-1150, y 930-1050

W, H = 1333, 1000   # lange zijde van een verhuisdoos, 48 x 36 cm
WEB = "www.debresser.nl"


def zijde_canvas():
    c = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wagen.plaats(c, wagen.logo_zonder_kroon(), 0, 110, W, 770, "midden")    # beeldmerk, DE BRESSER, 2 regels
    web = wagen.tekst([WEB], 120, wagen.DONKER, "SemiBold", spatie=4)
    breed = 0.40 * W
    wagen.plaats(c, web, (W - breed) / 2, 835, (W + breed) / 2, 900, "midden")
    return c


def zichtbaar(grootte, voor):
    """0..1: waar de doos niet door de jonge man wordt afgedekt, met een zachte rand van ongeveer 1 px."""
    m = Image.new("L", grootte, 255)
    ImageDraw.Draw(m).polygon(voor, fill=0)
    return np.asarray(m.filter(ImageFilter.GaussianBlur(0.8))).astype(float) / 255.0


def drukken(beeld, laag, wit):
    """Inkt op karton: inktkleur x (karton / wit karton in de zon), per kanaal, zodat de opdruk de schaduw en
    de paarse zweem van de zijde meekrijgt."""
    b = np.asarray(beeld).astype(float)
    l = np.asarray(laag).astype(float)
    alfa = l[:, :, 3:4] / 255.0
    licht = np.asarray(beeld.filter(ImageFilter.GaussianBlur(3))).astype(float) / wit
    inkt = np.clip(l[:, :, :3] * np.clip(licht, 0.3, 1.06), 0, 255)
    return Image.fromarray((b * (1 - alfa) + inkt * alfa).round().astype(np.uint8))


def main(map_, nr, doelpad=None):
    cfg = VERSIES[nr]
    beeld = Image.open(Path(map_) / f"versie-{nr}-wagen.png").convert("RGB")
    grootte = beeld.size

    laag = wagen.warp(zijde_canvas(), cfg["zijde"], grootte).filter(ImageFilter.GaussianBlur(0.5))
    l = np.asarray(laag).copy()
    l[:, :, 3] = (l[:, :, 3] * zichtbaar(grootte, cfg["voor"])).round().astype(np.uint8)
    uit = drukken(beeld, Image.fromarray(l), cfg["wit"])

    doel = Path(doelpad) if doelpad else Path(map_) / f"versie-{nr}-doos.png"
    uit.save(doel)
    print(doel)


if __name__ == "__main__":
    main(sys.argv[1], int(sys.argv[2]), sys.argv[3] if len(sys.argv) > 3 else None)
