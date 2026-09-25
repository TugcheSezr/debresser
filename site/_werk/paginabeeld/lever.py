#!/usr/bin/env python3
"""Zet de acht gekozen platen op de slotmaten in site/assets/img/.

Bron is 1696x2528 (ratio 1,491), doel is exact 2:3, dus er gaat 11 px breedte af. Per beeld staat
de horizontale zwaartepunt-fractie erbij; die bepaalt WAAR die 11 px vandaan komt en is dus vrijwel
altijd 0,5. Twee maten: 760x1140 en 1140x1710, precies de twee breedtes die het staande fotovak op
deze pagina's vraagt (gemeten 307-524 px breed, dus 1x en 2x met marge).

Draaien vanuit ~/website-kieviet:  python3 site/_werk/paginabeeld/lever.py
"""
import pathlib
from PIL import Image

HIER = pathlib.Path(__file__).resolve().parent
BRON = HIER / "klaar"          # geretoucheerde platen; valt terug op raw/
RAW = HIER / "raw"
DOEL = HIER.parents[1] / "assets/img"

# doelnaam -> (bron-id, horizontale fractie voor de uitsnede)
PLATEN = {
    "checklist-keukentafel": ("chk1-keukentafel-planning", 0.50),
    "checklist-dozen":       ("chk3-dozen-labels",         0.50),
    "inpak-borden":          ("inp1-borden-op-kant",       0.50),
    "inpak-service":         ("inp5-inpakservice",         0.50),
    "dozen-stapel":          ("doz1-stapel-woonkamer",     0.50),
    "dozen-bezorging":       ("doz2-bezorging-voordeur",   0.50),
    "m3-laadbak":            ("m31-laadbak-vol",           0.50),
    "m3-opname":             ("m32-adviseur-woonkamer",    0.50),
}
MATEN = [(760, 1140), (1140, 1710)]


def bron_van(pid):
    klaar = BRON / f"{pid}.png"
    return klaar if klaar.exists() else RAW / f"{pid}.png"


for naam, (pid, fx) in PLATEN.items():
    p = bron_van(pid)
    im = Image.open(p).convert("RGB")
    W, H = im.size
    w = min(W, int(round(H * 2 / 3)))
    h = min(H, int(round(w * 3 / 2)))
    x = max(0, min(W - w, int(round(fx * W - w / 2))))
    snee = im.crop((x, 0, x + w, h))
    for bw, bh in MATEN:
        uit = DOEL / f"{naam}-{bw}.webp"
        snee.resize((bw, bh), Image.LANCZOS).save(uit, quality=84, method=6)
    print(f"{naam:22s} <- {p.name:28s} {w}x{h}  {(DOEL / f'{naam}-1140.webp').stat().st_size // 1024} kB")
