#!/usr/bin/env python3
"""Verhaspelde kleine doosopdruk onleesbaar maken.

Nano Banana krijgt het TOP MOVERS-logo goed maar niet de twee kleine regels eronder
("Aangesloten BIJ erkende verhuizers" werd "orkuoke verhutzers"). Dat is het bekende
faalpatroon uit de foto-optimalisatie-skill; verbieden in de prompt helpt er niet tegen,
naretoucheren wel. Op heroformaat is die regel ~6px hoog, dus een lokale blur maakt hem
onleesbaar zonder dat je op de pagina iets ziet veranderen. Wil je het beeld ooit groot
gebruiken (druk, social), dan moet de tekst er echt op geplakt worden.

Rechthoeken zijn met de hand opgemeten op 100 procent, per variant.
Draaien: python3 retouche.py d1-markt-avondlicht
"""
import sys, pathlib
from PIL import Image, ImageFilter

VLAKKEN = {
    # (links, boven, rechts, onder) in de originele 3168x1344
    "d1-markt-avondlicht": [
        (1452, 490, 1592, 534),    # twee regels doos 1
        (1464, 690, 1606, 741),    # doos 2
        (1464, 892, 1608, 943),    # doos 3
        (1464, 1094, 1616, 1146),  # doos 4
        (1318, 356, 1382, 386),    # flaplabel doos 1
        (1318, 556, 1388, 586),    # doos 2
        (1318, 758, 1391, 788),    # doos 3
        (1318, 960, 1391, 990),    # doos 4
        (2020, 560, 2160, 700),    # de doos in de armen van de verhuizer
    ],
    # a2 staat verder weg en de dozen hangen gekanteld op de steekwagen, dus de kleine regels
    # zijn er al half onleesbaar; deze vlakken maken de rest af.
    # a2 staat verder weg en de dozen hangen gekanteld op de steekwagen, dus de kleine regels
    # zijn er al half onleesbaar. Krap opmeten: een ruimer vak veegt het woordmerk of het
    # honingraatpatroon mee en dat zie je wel.
    "a2-markt-verhuizer": [
        (2133, 646, 2222, 675),    # twee regels bovenste doos
        (2076, 850, 2172, 883),    # middelste doos
        (2016, 1050, 2118, 1081),  # onderste doos
        (2233, 926, 2332, 951),    # doos achter de steekwagen
        (2263, 456, 2352, 478),    # achterkant bovenste doos
        (2122, 712, 2146, 738),    # flaplabels
        (2067, 917, 2091, 943),
        (2012, 1116, 2036, 1142),
    ],
}


def schoon(naam, straal=2.6):
    bron = pathlib.Path(f"{naam}.png")
    im = Image.open(bron).convert("RGB")
    vlakken = VLAKKEN.get(naam)
    assert vlakken, f"geen opgemeten vlakken voor {naam}; eerst op 100 procent uitmeten"
    for vak in vlakken:
        im.paste(im.crop(vak).filter(ImageFilter.GaussianBlur(straal)), vak)
    uit = pathlib.Path(f"{naam}-schoon.png")
    im.save(uit)
    print(f"{uit} ({len(vlakken)} vlakken, blur {straal})")
    return uit


if __name__ == "__main__":
    for naam in sys.argv[1:] or ["d1-markt-avondlicht"]:
        schoon(naam)
