#!/usr/bin/env python3
"""Echte hero-kandidaten: vrijstaande verhuizers uit de Top Movers-bank (en fotos-kievit 86).

Gebruik: python3 hero.py [id ...]     (zonder argument: alle kandidaten)
Per kandidaat in site/_werk/hero/echt/: <id>.png (RGBA, volle bruikbare resolutie), <id>-1600.webp en
<id>-900.webp (breedte max 1600/900, nooit opgeschaald: kleiner als de bron kleiner is), <id>-origineel.jpg
(bronfoto, max 1600 breed). Lijst in site/_werk/hero/kandidaten.json met exact de velden die terminal -64
verwacht: id, bron, origineel, cutout1600, cutout900, breedte, hoogte, personen, omschrijving, opmerking.
Paden zijn root-relatief voor de devserver (site/ = root): /_werk/hero/echt/...
Raws komen uit site/_werk/beeld/cut/raw-<n>.png (macOS Vision via site/_werk/cutout.py); retouches en
bleed uit site/_werk/beeld/produceer.py."""
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
WERK = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(WERK, "beeld"))
import produceer as P  # noqa: E402

UIT = os.path.join(HERE, "echt")
os.makedirs(UIT, exist_ok=True)


def retouche_40(rgba):
    """Vrouw met BOEKENDOOS: het grote EPV-logo op de linkerzijde van de doos weg (raw-40 = bron min (0,0)).
    Veelhoek laat de handschoen rechtsonder (x>540, y>860) met rust; gemeten met gridoverlay op de raw."""
    return P.retouche_rgba(rgba, [dict(poly=[(476, 560), (648, 560), (648, 870), (628, 890), (600, 922), (586, 932), (560, 946), (528, 948), (528, 978), (476, 978)])])


def retouche_86(rgba):
    """Kievit-footerfiguur: kleine gedraaide EPV-regel op de rechterzijde van de doos weg (onderrand = beeldrand)."""
    return P.retouche_rgba(rgba, [dict(box=(248, 436, 282, 500))])


def component(rgba, kies):
    """Houdt een samenhangend deel van de alfa: kies='links' = component met de kleinste x, 'rechts' = grootste."""
    a = np.asarray(rgba).astype(np.uint8)
    lab, n = ndimage.label(a[..., 3] > 30)
    if n < 2:
        return rgba
    sizes = ndimage.sum(a[..., 3] > 30, lab, range(1, n + 1))
    groot = [i + 1 for i, s in enumerate(sizes) if s > 5000]
    xs = {i: np.where(lab == i)[1].mean() for i in groot}
    doel = min(xs, key=xs.get) if kies == "links" else max(xs, key=xs.get)
    houd = ndimage.binary_dilation(lab == doel, iterations=3)
    a[..., 3] = np.where(houd, a[..., 3], 0)
    return Image.fromarray(a, "RGBA")


# id -> raw-nummer of bronbestand, bewerking en beschrijving
KAND = [
    dict(id="66-trio-bank", raw=66, snij_onder=632, personen=3,
         omschrijving="Drie verhuizers op een bank, de middelste met een witte TM-doos ('aanpakkers met impact!'), TM-logo op de polo's, allemaal lachend in de lens; van kruin tot net onder de doos (heupen).",
         opmerking="Huidige hero-cutout. Bron 1280 px breed: figuur 1040 px breed, dus geen 1600-variant zonder opschaling."),
    dict(id="67-trio-duim", raw=67, snij_onder=834, personen=3,
         omschrijving="Drie TM-medewerkers naast elkaar met duim omhoog (grijze sweater, twee zwarte polo's met TM-logo), heupversie.",
         opmerking="Telefoonfoto 2560 px; figuur 1478 px breed, scherp."),
    dict(id="22-man-doos-laadbak", raw=22, component="links", snij_onder=430, personen=1,
         omschrijving="Verhuizer in TM-polo met een witte TM-doos in beide handen (klein Erkende Verhuizers-logo op de doos), heupversie; stond in de laadbak.",
         opmerking="Bron 1800 px maar de man staat ver weg: figuur ~190 px breed, ~430 px hoog. Alleen bruikbaar als kleine figuur."),
    dict(id="2-man-verhuisdoos", raw=2, retouche="retouche_2", personen=1,
         omschrijving="Lachende verhuizer met bril draagt een witte TM-'VERHUISDOOS' voor zich uit, afgesneden op de dijen (beeldrand).",
         opmerking="RETOUCHE: EU-keurmerklogo onderaan de doos weggevuld; kleine gedraaide EPV-regel op de bovenkant van de doos blijft, op figuurmaat onleesbaar. Figuur 1188x1187."),
    dict(id="22-man-leunend-dozen", raw=22, component="rechts", personen=1,
         omschrijving="Verhuizer leunt met een arm op een stapel van drie witte TM-dozen, ten voeten uit.",
         opmerking="Zelfde verre opname als 22-man-doos-laadbak: figuur ~560 px breed, ~700 px hoog. Klein."),
    dict(id="9-duo-doos-aangeven", raw=9, personen=2,
         omschrijving="Verhuizer bukt voorover en geeft een witte TM-'VERHUISDOOS' aan een lachende collega die hem van onderen aanpakt.",
         opmerking="LET OP: de rug van de bovenste man is rechts recht afgesneden door de beeldrand; klein Erkende Verhuizers-logo en gedraaide EPV-regel op de doos (onleesbaar op figuurmaat). Figuur 1237x1091."),
    dict(id="61-duo-lachen", raw=61, snij_onder=2300, personen=2,
         omschrijving="Twee lachende mannen, arm om de schouder: links een man in oranje veiligheidshesje (geen TM-kleding, vermoedelijk klant of magazijnmedewerker), rechts een verhuizer in grijs TM-poloshirt; heupversie.",
         opmerking="Telefoonfoto 3024x4032, figuur 2954x2300, zeer scherp. Alleen de rechterman draagt TM-kleding."),
    dict(id="64-duo-tafel", raw=64, personen=2,
         omschrijving="Twee TM-medewerkers in grijze TM-jassen, handen op een tafel (tafel weggesneden), hoofd en romp.",
         opmerking="Onderrand is de tafelrand, dus de handen eindigen recht. Figuur 887x734 (bron 1280 px)."),
    dict(id="78-duo-kraftdozen", raw=78, personen=2,
         omschrijving="Verhuizer bukt en vouwt de flappen van een kraft TM-doos in elkaar (kliksluiting, geen plakband), collega stapelt er zes ('TOP MOVERS' met bij, 'Max. 20 kg', 'Aangesloten BIJ erkende verhuizers'); ten voeten uit.",
         opmerking="Bron 4000x6000, figuur 3562x3672; staat ook als duo-opslag op de pagina, dus niet twee keer gebruiken."),
    dict(id="15-man-kratten", raw=15, personen=1,
         omschrijving="Verhuizer in TM-polo duwt een rolwagen met drie groene verhuiskratten, ten voeten uit.",
         opmerking="Figuur 447x1053 (smal); staat ook als figuur-piano op de pagina."),
    dict(id="16-man-stofzuiger", raw=16, personen=1,
         omschrijving="Verhuizer in TM-polo stofzuigt (oplevering), ten voeten uit.",
         opmerking="Figuur 413x988."),
    dict(id="19-man-lamp", raw=19, snij_onder=2000, personen=1,
         omschrijving="Verhuizer met beide armen omhoog hangt een grote witte hanglamp op (montage), heupversie.",
         opmerking="Bron 6000x4000, figuur 1078x2000, scherp; lamp hangt boven zijn handen (deel van de figuur)."),
    dict(id="40-vrouw-boekendoos", raw=40, retouche="retouche_40", personen=1,
         omschrijving="Vrouw in TM-polo met tatoeages en werkhandschoenen houdt een witte TM-'BOEKENDOOS' vast en kijkt ernaar; close-up van bovenaf.",
         opmerking="RETOUCHE: groot EPV-logo op de doos weggevuld (klein Erkende Verhuizers-logo onderaan blijft); het retouchevlak blijft zichtbaar als een zachte grijze vlek op de beschaduwde dooszijde en vlak boven de handschoenrand zit nog een letterrest van ~20 px. Rug en armen zijn aan de linker- en onderrand afgesneden door het beeld; close-up, geen staande figuur."),
    dict(id="44-duo-dozen-klein", raw=44, personen=2,
         omschrijving="Twee verhuizers in TM-polo naast elkaar, de linker met twee witte TM-dozen op elkaar in de armen, ten voeten uit.",
         opmerking="Bron maar 1080x639: figuur 445x578, alleen bruikbaar als kleine figuur."),
    dict(id="86-kievit-man-doos", bestand=os.path.join(P.ROOT, "de-kievit-nl", "fotos-kievit", "2024-04_footer-foto.png"), personen=1, retouche="retouche_86",
         omschrijving="Lachende verhuizer in TM-polo met een witte verhuisdoos met het De Kievit-logo ('DE KIEVIT VERHUIZINGEN', footerfoto van de-kievit.nl), al vrijstaand aangeleverd.",
         opmerking="Enige figuur met Kievit-merk, maar maar 336x506 px: alleen bruikbaar klein, en de onderrand raakt de beeldrand. RETOUCHE: kleine EPV-regel op de zijkant van de doos weggevuld."),
]


def bron_info(k):
    if "raw" in k:
        return k["raw"], os.path.basename(P.bronpad(k["raw"])), P.bron(k["raw"])
    return 86, os.path.basename(k["bestand"]), P.bron(86)


def maak(k):
    n, bronnaam, origineel = bron_info(k)
    rgba = P.raw(n) if "raw" in k else Image.open(k["bestand"]).convert("RGBA")
    if k.get("component"):
        rgba = component(rgba, k["component"])
    ret = globals().get(k.get("retouche", ""), None) or getattr(P, k.get("retouche", ""), None)
    if ret:
        rgba = ret(rgba)
    if k.get("snij_onder"):
        rgba = rgba.crop((0, 0, rgba.width, k["snij_onder"]))
    a = np.asarray(rgba).astype(np.float32)
    ys, xs = np.where(a[..., 3] > 8)
    rgba = rgba.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    a = np.asarray(rgba).astype(np.float32)
    rgb = P.bleed(a[..., :3], a[..., 3] > 12)
    rgba = Image.fromarray(np.dstack([np.clip(rgb, 0, 255), a[..., 3]]).astype(np.uint8), "RGBA")
    png = os.path.join(UIT, f"{k['id']}.png")
    rgba.save(png, optimize=True)
    paden = {}
    for maat in (1600, 900):
        w = min(maat, rgba.width)
        h = int(round(rgba.height * w / rgba.width))
        fig = rgba if w == rgba.width else rgba.resize((w, h), Image.LANCZOS)
        p = os.path.join(UIT, f"{k['id']}-{maat}.webp")
        fig.save(p, "WEBP", quality=86, method=6)
        paden[maat] = (p, fig.size)
    o = origineel.copy()
    o.thumbnail((1600, 1600))
    op = os.path.join(UIT, f"{k['id']}-origineel.jpg")
    o.save(op, quality=86)
    chk = Image.new("RGBA", rgba.size, (34, 34, 36, 255)); chk.alpha_composite(rgba); c = chk.convert("RGB"); c.thumbnail((900, 900))
    c.save(os.path.join(UIT, f"{k['id']}-check.jpg"), quality=85)
    web = lambda p: "/" + os.path.relpath(p, os.path.join(P.ROOT, "site"))
    maatnoot = "; ".join(f"{m}-variant is {s[0]}x{s[1]} (bron kleiner, niet opgeschaald)" for m, (p, s) in paden.items() if s[0] < m)
    rec = dict(id=k["id"], bron=f"{n} {bronnaam}", origineel=web(op), cutout1600=web(paden[1600][0]), cutout900=web(paden[900][0]),
               breedte=rgba.width, hoogte=rgba.height, personen=k["personen"], omschrijving=k["omschrijving"],
               opmerking=(f"Figuur {rgba.width}x{rgba.height} px (hero toont 420 px hoog, dus {'opschaling %.2fx' % (420 / rgba.height) if rgba.height < 420 else 'geen opschaling'}). "
                          + k["opmerking"] + (" " + maatnoot if maatnoot else "")).strip())
    print(f"{k['id']}: png {rgba.width}x{rgba.height}, 1600 {paden[1600][1]}, 900 {paden[900][1]}")
    return rec


def main():
    wens = sys.argv[1:] or [k["id"] for k in KAND]
    jp = os.path.join(HERE, "kandidaten.json")
    lijst = json.load(open(jp)) if os.path.exists(jp) else []
    for k in KAND:
        if k["id"] in wens:
            rec = maak(k)
            lijst = [r for r in lijst if r["id"] != rec["id"]] + [rec]
    volgorde = {k["id"]: i for i, k in enumerate(KAND)}
    lijst.sort(key=lambda r: volgorde.get(r["id"], 99))
    json.dump(lijst, open(jp, "w"), indent=1, ensure_ascii=False)
    print(f"{len(lijst)} kandidaten in kandidaten.json")


if __name__ == "__main__":
    main()
