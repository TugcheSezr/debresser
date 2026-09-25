#!/usr/bin/env python3
"""Beeldproductie homepage De Kievit: crops en cutouts uit de Top Movers-bank naar de exacte HT-slots.

Gebruik:  python3 produceer.py [slot ...]      (zonder argument: alle slots)
Uitvoer:  beeld/kandidaten/<slot>/<kand>-<maat>.webp voor elke kandidaat,
          ../../assets/img/<bestand>-<maat>.webp voor de kandidaat met default=True,
          beeld/kandidaten.json met alles wat de galerij en het manifest nodig hebben.

Nummers verwijzen naar het contactvel (sheet1/sheet2): 0-85 = topmovers/fotos op ASCII-alfabet
(Python sorted), 86-95 = de-kievit-nl/fotos-kievit. Cutouts komen uit beeld/cut/raw-<n>.png
(macOS Vision via ../cutout.py, of BiRefNet + matting via ../cutout_mat.py); foto's worden direct uit de bron gesneden.
Een crop is (cx, cy, breedte): middelpunt als fractie van de bron en de cropbreedte in bronpixels;
de hoogte volgt uit de doelverhouding, alles wordt binnen de bron geklemd.
Een maat met hoogte None (team-cutout) krijgt de hoogte die de figuur oplevert bij die breedte.
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))          # ~/website-kieviet
IMG = os.path.join(ROOT, "site", "assets", "img")
KAND = os.path.join(HERE, "kandidaten")
TM = sorted(os.listdir(os.path.join(ROOT, "topmovers", "fotos")))
KV = sorted(os.listdir(os.path.join(ROOT, "de-kievit-nl", "fotos-kievit")))


def bronpad(n):
    if n < 86:
        return os.path.join(ROOT, "topmovers", "fotos", TM[n])
    return os.path.join(ROOT, "de-kievit-nl", "fotos-kievit", KV[n - 86])


def bron(n):
    im = ImageOps.exif_transpose(Image.open(bronpad(n)))
    if im.mode in ("P", "RGBA", "LA"):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        bg.alpha_composite(im)
        im = bg
    return im.convert("RGB")


def raw(n):
    return Image.open(os.path.join(HERE, "cut", f"raw-{n}.png")).convert("RGBA")


# ---------- foto's ----------
def cropbox(im, w, h, cx, cy, breedte):
    """Grootste crop met verhouding w:h van hoogstens `breedte` px breed, rond (cx,cy), binnen de bron."""
    aspect = w / h
    bw = min(breedte, im.width, im.height * aspect)
    bh = bw / aspect
    x0 = min(max(cx * im.width - bw / 2, 0), im.width - bw)
    y0 = min(max(cy * im.height - bh / 2, 0), im.height - bh)
    return (int(round(x0)), int(round(y0)), int(round(x0 + bw)), int(round(y0 + bh)))


def maak_foto(im, w, h, crop):
    box = cropbox(im, w, h, *crop)
    uit = im.crop(box).resize((w, h), Image.LANCZOS)
    if box[2] - box[0] > w:                                       # verkleind: heel licht verscherpen
        uit = uit.filter(ImageFilter.UnsharpMask(radius=1.0, percent=45, threshold=2))
    schaal = w / (box[2] - box[0])
    return uit, box, schaal


# ---------- cutouts ----------
def bleed(rgb, known, passes=14):
    """Kleur van de rand naar buiten laten lopen onder alfa nul, tegen randzweem bij resampling."""
    col = rgb * known[..., None]
    w = known.astype(np.float32).copy()
    out = rgb.copy()
    for _ in range(passes):
        cs = ndimage.uniform_filter(col, size=(3, 3, 1))
        ws = ndimage.uniform_filter(w, size=3)
        new = (ws > 0) & (w == 0)
        out[new] = cs[new] / ws[new][:, None]
        col[new] = out[new]
        w[new] = 1.0
    return out


def maak_cutout(rgba, w, h, snij_onder=None, snij_rechts=None, retouche=None, marge_boven=0):
    """Past de figuur in een canvas van w x h: schalen op de knellende zijde, onderaan en in het midden.
    h=None: hoogte volgt uit de figuur bij breedte w. snij_onder = y in raw-coordinaten waar de figuur recht
    wordt afgesneden (heupen), optioneel; marge_boven = transparante rand boven de kruin (na schalen)."""
    if retouche:
        rgba = retouche(rgba)
    if snij_onder:
        rgba = rgba.crop((0, 0, rgba.width, snij_onder))
    if snij_rechts:
        rgba = rgba.crop((0, 0, snij_rechts, rgba.height))
    a = np.asarray(rgba).astype(np.float32)
    ys, xs = np.where(a[..., 3] > 8)
    rgba = rgba.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    a = np.asarray(rgba).astype(np.float32)
    rgb = bleed(a[..., :3], a[..., 3] > 12)
    rgba = Image.fromarray(np.dstack([np.clip(rgb, 0, 255), a[..., 3]]).astype(np.uint8), "RGBA")
    if h is None:
        schaal = w / rgba.width
        h = int(round(rgba.height * schaal)) + marge_boven
    else:
        schaal = min(w / rgba.width, (h - marge_boven) / rgba.height)
    nw, nh = max(1, int(round(rgba.width * schaal))), max(1, int(round(rgba.height * schaal)))
    fig = rgba.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    canvas.paste(fig, ((w - nw) // 2, h - nh))
    return canvas, (rgba.width, rgba.height), schaal


def vul_diffusie(im, box=None, poly=None, iters=500, ruis=1.5):
    """Wist een vlak deterministisch: het gebied (rechthoek `box` of veelhoek `poly`) wordt gevuld door de
    randkleuren naar binnen te laten lopen (Jacobi-relaxatie), plus fijne ruis. Werkt op egale vlakken met een
    zacht verloop (cabinezijde, dorpel, doosvlak), niet op textuur."""
    a = np.asarray(im).astype(np.float32)
    if poly:
        xs = [p[0] for p in poly]; ys = [p[1] for p in poly]
        box = (min(xs), min(ys), max(xs), max(ys))
    x0, y0, x1, y1 = [int(v) for v in box]
    pad = 6
    sub = a[y0 - pad:y1 + pad, x0 - pad:x1 + pad].copy()
    if poly:
        m = Image.new("L", (sub.shape[1], sub.shape[0]), 0)
        ImageDraw.Draw(m).polygon([(px - x0 + pad, py - y0 + pad) for px, py in poly], fill=255)
        mask = np.asarray(m) > 0
    else:
        mask = np.zeros(sub.shape[:2], bool)
        mask[pad:-pad, pad:-pad] = True
    sub[mask] = sub[~mask].mean(axis=0)
    for _ in range(iters):
        blur = ndimage.uniform_filter(sub, size=(3, 3, 1))
        sub[mask] = blur[mask]
    rng = np.random.default_rng(7)
    sub[mask] += rng.normal(0, ruis, sub[mask].shape)
    a[y0 - pad:y1 + pad, x0 - pad:x1 + pad] = sub
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), im.mode)


def retouche_rgba(rgba, stappen):
    rgb = rgba.convert("RGB")
    for st in stappen:
        rgb = vul_diffusie(rgb, **st)
    return Image.fromarray(np.dstack([np.asarray(rgb), np.asarray(rgba)[..., 3]]), "RGBA")


def retouche_37(rgba):
    """Wagen 37: CO2-Neutraal-logo en de kleine EPV-tekst op de cabinezijde weg (De Kievit voert geen van beide).
    raw-37 = bron min (471, 24): de bbox die cutout_mat.py print is al inclusief de marge van 40 px.
    Coordinaten gemeten met gridoverlay op de bron; de offset opnieuw geverifieerd met een markeringsrender
    na het hersnijden met cutout_mat.py (28-aug)."""
    dx, dy = 471, 24
    return retouche_rgba(rgba, [dict(box=(1196 - dx, 372 - dy, 1262 - dx, 440 - dy)),      # EPV-tekst met sterlogo
                                dict(box=(1208 - dx, 552 - dy, 1262 - dx, 662 - dy))])     # CO2 Neutraal-logo


def retouche_2(rgba):
    """Figuur 2: EU-keurmerklogo ('European Association of Official Registered Movers') onderaan de doos weg.
    raw-2 = bron min (415, 146) (bbox uit cutout.py is inclusief marge)."""
    dx, dy = 415, 146
    return retouche_rgba(rgba, [dict(box=(770 - dx, 1240 - dy, 1012 - dx, 1327 - dy))])


def retouche_66(im):
    """og-beeld 66: het jubileumlogo '100 VAN DER ENT GROUP' (ander Top Movers-lid) op de cabinedeur weg."""
    return vul_diffusie(im, box=(664, 146, 782, 240))


def retouche_31(im):
    """Opslag 31: het adreslabel 'P.A. van Rooyen, Uithoorn, tel.' (ander lid) op de SCHILDERIJBOX weg."""
    return vul_diffusie(im, box=(722, 664, 918, 716))


def retouche_72(im):
    """Familie/compleet 72: het ledenlogo 'VAN DER ENT' op de verhuisdoos op de laadklep weg."""
    return vul_diffusie(im, box=(760, 603, 804, 668))


def retouche_25(im):
    """Inpak 25: EU-keurmerklogo ('European Association of Official Registered Movers') op de bovenste doos weg."""
    return vul_diffusie(im, box=(897, 783, 958, 812))


def retouche_6(im):
    """Footer 6: de belettering '100% elektrisch' (cabinedeur) en '100% elektrische verhuizingen' (dorpel) weg;
    De Kievit rijdt niet elektrisch. Veelhoeken volgen de schuine belettering, gemeten met gridoverlay."""
    im = vul_diffusie(im, poly=[(905, 574), (1118, 612), (1118, 664), (905, 636)])   # deur: '100% elektrisch'
    im = vul_diffusie(im, poly=[(510, 866), (880, 804), (880, 874), (510, 936)])    # dorpel: '100% elektrische verhuizingen'
    im = vul_diffusie(im, box=(393, 922, 442, 960))                                  # dorpel links: stekker-e-logo
    return im


def medaillon(n, crop, w, h, rand=0.03, zacht=0.06):
    """Scene als ovaal medaillon met zachte alfarand (historische foto op de gouden cirkel)."""
    im = bron(n)
    foto, box, schaal = maak_foto(im, w, h, crop)
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / (w / 2 * (1 - rand))) ** 2 + ((yy - h / 2) / (h / 2 * (1 - rand))) ** 2)
    alpha = np.clip((1 - r) / zacht, 0, 1) * 255
    return Image.fromarray(np.dstack([np.asarray(foto), alpha.astype(np.uint8)]), "RGBA"), box, schaal


# ---------- slots ----------
# maten: lijst van (suffix, w, h). soort: foto | cutout | medaillon. Per kandidaat: id, bron, crop of raw-opties, opm.
TEGEL = [("1120", 1120, 641), ("760", 760, 435), ("400", 400, 229)]
SLOTS = {
    "hero-bg": dict(bestand="hero-bg", soort="foto", q={"1920": 72, "1280": 72, "mobiel": 64},   # LCP-budget regie: max 200/120/78 KB
        maten=[("1920", 1920, 1280), ("1280", 1280, 853), ("mobiel", 900, 1200)],
        kandidaten=[
            dict(id="laaddok", bron=22, default=True, crop={"*": (0.5, 0.5, 1800), "mobiel": (0.494, 0.5, 900)},
                 opm="Echte foto (2021-10_TOPMOVERS-56): open bakwagen aan een laaddok bij een bedrijfspand, drie verhuizers in TM-polo met witte TM-dozen. Opschaling 1,07x naar 1920."),
            dict(id="landweg", bron=76, crop={"*": (0.5, 0.5, 2589), "mobiel": (0.5, 0.5, 1294)},
                 opm="Marketingcomposiet (2026-01_lets-move-to-zero): TM-truck frontaal op een landweg tussen bloemenvelden; geen elektrisch-tekst zichtbaar, wel campagnebeeld van de elektrische truck. Verkleind vanaf 3077px."),
            dict(id="verhuislift", bron=28, crop={"*": (0.5, 0.5, 1920), "mobiel": (0.42, 0.5, 960)},
                 opm="Echte foto (2021-10_Verhuur-verhuislift): Sprinter met verhuislift bij een flat, topmovers.nl op de motorkap; exact 1920x1280. Claim '35 meter werkhoogte' op de lift, klein."),
            dict(id="ai-header-afgekeurd", bron=85, crop={"*": (0.5, 0.5, 1514), "mobiel": (0.45, 0.5, 757)},
                 opm="AFGEKEURD: de kandidaat uit de brief (2026-08_tm-header-3) is AI-gegenereerd: dozentekst en kenteken zijn wartaal op 100%. Alleen ter vergelijking in de galerij."),
        ]),
    "team-cutout": dict(bestand="team-cutout", soort="cutout",
        maten=[("1600", 1600, None), ("900", 900, None)],
        kandidaten=[
            dict(id="bank-echt-heupen", raw=66, default=True, snij_onder=632, marge_boven=14,
                 opm="Echte foto (2025-11_TopMovers-mannen-header3): drie verhuizers op een bank met een witte TM-doos ('aanpakkers met impact!'), TM-logo op de polo's; uitgesneden van kruin tot net onder de doos en de handen (heuphoogte), bank en benen weg."),
            dict(id="bank-outpaint-heupen", raw=81, snij_onder=596, marge_boven=14,
                 opm="Zelfde opname, maar 2026-08_TopMovers-header1 is een AI-outpaint van 66 (correlatie 0,96 op schaal 0,93); met de heupsnede zit er geen bijgetekend deel meer in, wel iets meer lucht rond de figuren."),
            dict(id="trio-heupen", raw=67, snij_onder=1240 - 406, marge_boven=14,
                 opm="Echte telefoonfoto (2025-12_Alkmaar-1): drie mannen in TM-polo/sweater met duim omhoog, afgesneden op de heupen."),
        ]),
    "dienst-compleet": dict(bestand="dienst-compleet", soort="foto", maten=TEGEL,
        kandidaten=[
            dict(id="kast-dragen", bron=3, default=True, crop=(0.492, 0.375, 943),
                 opm="Echte foto (2021-09_unnamed-file): twee verhuizers dragen een kast door een woonkamer, TM-doos op de voorgrond. Crop houdt de ledennaam 'Holverda' en het EPV-logo onderaan de doos buiten beeld. Opschaling 1,19x."),
            dict(id="lift-balkon", bron=39, crop=(0.389, 0.417, 1400),
                 opm="Echte foto (2021-10_topmovers-51): verhuislift naar een balkon, verhuizer neemt een kist aan, TM-bakwagen met 'Erkende Verhuizers'. Crop laat de ledennaam rechtsonder buiten beeld."),
            dict(id="laadklep-kast", bron=72, crop=(0.417, 0.517, 1600), retouche="retouche_72",
                 opm="Echte telefoonfoto (2025-12_GLR2): twee verhuizers rijden een kast op een hondje bij de laadklep, tweede TM-truck erachter. RETOUCHE: ledenlogo 'VAN DER ENT' op een doos op de klep weggevuld."),
        ]),
    "dienst-inpak": dict(bestand="dienst-inpak", soort="foto", maten=TEGEL,
        kandidaten=[
            dict(id="plant-inpakken", bron=25, default=True, crop=(0.672, 0.698, 1180), retouche="retouche_25",
                 opm="Echte foto (2021-10_TOPMOVERS-ZAKELIJK): verhuizer pakt een plant in noppenfolie, collega vult een TM-doos, stapel witte TM-dozen ('max. 20 kg', klein Erkende Verhuizers-logo). RETOUCHE: EU-keurmerklogo op de bovenste doos weggevuld."),
            dict(id="plant-inpakken-breed", bron=14, crop=(0.361, 0.698, 1180),
                 opm="Zelfde opstelling als 25, ander kader (2021-10_TM-zakelijk). Niet samen met 25 op een pagina gebruiken."),
            dict(id="doos-dragen", bron=2, crop=(0.45, 0.547, 1500),
                 opm="Echte foto (2021-09_topmovers-9): verhuizer draagt een witte TM-'VERHUISDOOS' naar binnen; EU-keurmerklogo onderaan de doos valt buiten de crop, kleine gedraaide EPV-regel op de bovenkant van de doos is op tegelmaat onleesbaar."),
        ]),
    "dienst-montage": dict(bestand="dienst-montage", soort="foto", maten=TEGEL,
        kandidaten=[
            dict(id="lamp-ophangen", bron=19, default=True, crop=(0.608, 0.275, 3500),
                 opm="Echte foto (2021-10_TOPMOVERS-39, 6000px): verhuizer hangt een hanglamp op onder een open trap, groene fauteuils, houten kisten. Geen logo's in beeld."),
            dict(id="lamp-bank", bron=77, crop=(0.515, 0.5, 1279),
                 opm="Echte foto (2026-02_Handyman2): zelfde ruimte, verhuizer hangt een lamp op naast een gele bank."),
            dict(id="lamp-onder", bron=18, crop=(0.5, 0.48, 1800),
                 opm="Echte foto (2021-10_TOPMOVERS-37): kikvorsperspectief, verhuizer draait een lamp vast onder de trap."),
        ]),
    "dienst-opslag": dict(bestand="dienst-opslag", soort="foto", maten=TEGEL,
        kandidaten=[
            dict(id="container-open", bron=31, default=True, crop=(0.5, 0.5, 1800), retouche="retouche_31",
                 opm="Echte foto (2021-10_opslag-TOPMOVERS-44): open opslagcontainer in een loods, deuren met 'Erkende Verhuizers', binnenin TM-dozen (o.a. 'SCHILDERIJBOX') en ingepakte inboedel. RETOUCHE: adreslabel van een ander lid (P.A. van Rooyen, Uithoorn) op de schilderijbox weggevuld."),
            dict(id="container-kraan", bron=33, crop=(0.5, 0.5, 1920),
                 opm="Echte foto (2021-10_opslag-46weglogo): TM-container hangt aan de loodskraan tussen gestapelde containers."),
            dict(id="container-nieuw-logo", bron=21, crop=(0.5, 0.5, 1920),
                 opm="Echte foto (2021-10_TOPMOVERS-44new-logos): dezelfde open container als 31 met nieuwere logo's."),
        ]),
    "dienst-zakelijk": dict(bestand="dienst-zakelijk", soort="foto", maten=TEGEL,
        kandidaten=[
            dict(id="kratten-kantoor", bron=15, default=True, crop=(0.583, 0.408, 1500),
                 opm="Echte foto (2021-10_TOPMOVERS-21): verhuizer duwt een rolwagen met drie groene verhuiskratten door een kantoor. Crop laat de klantnaam op de muur links buiten beeld."),
            dict(id="handdruk-kratten", bron=53, crop=(0.5, 0.5, 3264),
                 opm="Echte telefoonfoto (2025-02_IMG_0045): overdracht met handdruk bij stapels groene kratten, twee TM-medewerkers en twee klanten."),
            dict(id="ict-kabels", bron=11, crop=(0.5, 0.5, 1800),
                 opm="Echte foto (2021-10_ICT-TOPMOVERS-11): handen bundelen netwerkkabels (ICT-verhuizing)."),
        ]),
    "dienst-plan": dict(bestand="dienst-plan", soort="foto", maten=TEGEL,
        kandidaten=[
            dict(id="handdruk-gang", bron=68, default=True, crop=(0.5, 0.45, 2560),
                 opm="Echte telefoonfoto (2025-12_Alkmaar2): verhuisadviseur in TM-polo schudt een klant de hand, beiden duim omhoog, in een kantoorgang met ingepakte meubels."),
            dict(id="overleg-tafel", bron=64, crop=(0.5, 0.5, 1280),
                 opm="Echte telefoonfoto (2025-11_TopMovers-mannen-header): twee TM-medewerkers aan een tafel in een hal vol verhuismaterieel."),
            dict(id="zwaaien-truck", bron=57, crop=(0.55, 0.5, 1752),
                 opm="Echte foto (2025-06_facilitair-regisseur): medewerker zwaait vanuit de deur van de wagen; kijkt in de lens."),
        ]),
    "duo-opslag": dict(bestand="duo-opslag", soort="cutout", q={"1600": 74},
        maten=[("1600", 1600, 1663), ("1000", 1000, 1039)],
        kandidaten=[
            dict(id="kraftdozen-duo", raw=78, default=True,
                 opm="Echte foto (2026-03_TopMovers_CTWC, 4000x6000): verhuizer vouwt de flappen van een kraft TM-doos in elkaar (kliksluiting, geen plakband), collega stapelt er nog zes ('TOP MOVERS' met bij, 'Max. 20 kg', 'Aangesloten BIJ erkende verhuizers'); zeecontainers op de achtergrond zijn weggesneden. Verkleind 0,45x. Uitgesneden met ../cutout_mat.py (BiRefNet + closed-form matting + randdecontaminatie, 28-aug): zachte rand 2,5%, randhelderheid gelijk aan het binnenwerk. De eerdere Vision-uitsnede (cutout.py) had een zachte rand van 8% met lichte halo en hield witte container tussen mouw en doos en vloer onder de dozen vast."),
            dict(id="laaddok-duo", raw=22,
                 opm="Echte foto (2021-10_TOPMOVERS-56): verhuizer met TM-doos in de laadbak en collega leunend op een stapel witte TM-dozen; derde man in de bak viel weg. LET OP: bron is maar 831x835 op dit uitsnijgebied, 1600-variant is 1,9x opgeschaald (bij voorkeur niet kiezen)."),
        ]),
    "dozen-vak": dict(bestand="dozen-vak", soort="foto",
        maten=[("1100", 1100, 1100), ("700", 700, 700)],
        kandidaten=[
            dict(id="dozen-laadklep", bron=75, default=True, crop=(0.464, 0.5, 1180),
                 opm="Echte foto (2025-12_header-verhuisdozen): kraft TM-verhuisdozen (bij-logo, 'Aangesloten BIJ erkende verhuizers') op de laadklep van de verhuislift, verhuizer ernaast."),
            dict(id="doos-gevel", bron=36, crop=(0.611, 0.5, 1200),
                 opm="Echte foto (2021-10_topmovers-4): witte TM-doos op het liftplateau, grachtenpand erachter."),
            dict(id="dozen-containers", bron=78, crop=(0.5, 0.567, 4000),
                 opm="Echte foto (2026-03_TopMovers_CTWC, 4000x6000): verhuizer sluit een kraft TM-doos (flappen in elkaar, geen plakband) tussen zeecontainers, collega stapelt; is de standaard voor duo-opslag, dus alleen hier als die wisselt. Klein ledenlabel 'VAN DER ENT' op een container linksboven."),
        ]),
    "figuur-tafel": dict(bestand="figuur-tafel", soort="cutout",
        maten=[("1100", 1322, 1100), ("700", 841, 700)],
        kandidaten=[
            dict(id="handdruk-vier", raw=53, default=True,
                 opm="Echte telefoonfoto (2025-02_IMG_0045): vier personen, twee TM-medewerkers (zwarte polo, bruine TM-jas) en twee klanten (roze trui, donkerblauwe trui) schudden elkaar de hand; groene kratten zijn weggesneden; afgesneden op de knieen (beeldrand)."),
            dict(id="doos-aangeven", raw=9,
                 opm="Echte foto (2021-10_Home-part-topmovers-14): verhuizer bukt over de liftrand en geeft een witte TM-'VERHUISDOOS' aan een lachende collega. LET OP: de rug van de bovenste man is aan de rechterkant recht afgesneden door de beeldrand."),
            dict(id="laaddok-duo", raw=22,
                 opm="Echte foto (2021-10_TOPMOVERS-56): twee verhuizers met witte TM-dozen. LET OP: 1,3x opgeschaald op de 1100-variant."),
        ]),
    "wagen-heerlijkthuis": dict(bestand="wagen-werkwijze", soort="cutout",
        maten=[("1400", 1400, 883), ("900", 900, 568)],
        kandidaten=[
            dict(id="volvo-driekwart", raw=37, retouche="retouche_37", default=True,
                 opm="Echte foto (2021-10_topmovers-47-NO-NAME-vrij): witte Volvo FL bakwagen driekwart van voren, 'TOP MOVERS' groot op de laadbak, klein 'Erkende Verhuizers'-logo op de hoek, kenteken 27-BKK-9, chauffeur in TM-polo achter het raam. RETOUCHE: CO2-Neutraal-logo en kleine EPV-tekst op de cabinezijde deterministisch weggevuld (De Kievit voert die niet). Uitgesneden met ../cutout_mat.py (BiRefNet + closed-form matting, 28-aug): randhelderheid 128 tegen binnenwerk 130, waar de Vision-uitsnede een lichte halo van +35 rond de hele wagen had. ONDERKANT 29-aug hersteld met wagen_onderkant.py: in een band van 16 px rond de BiRefNet-contour (bron y >= 880) vervangt het geblurde BiRefNet-masker de matting-alfa, die onder de banden de JPEG-blokken van de grondschaduw volgde (trapjes) en schaduwmist onder chassis en rolluikbox vasthield; knikken in de onderrand 126 naar 35, mistpixels 7.033 naar 3.900, op de pagina op 200% schoon."),
            dict(id="volvo-front", raw=76,
                 opm="Marketingcomposiet (2026-01_lets-move-to-zero): TM-truck frontaal, 'TOP MOVERS' op het dak en 'topmovers.nl' op de zonneklep, chauffeur zichtbaar."),
            dict(id="actros-front", raw=0,
                 opm="Echte foto (2021-09_TM-truck.png, 947px): Mercedes Actros frontaal met 'topmovers.nl' en kenteken 'LET'S MOVE!'; klein bestand, alleen voor de 900-variant scherp genoeg."),
        ]),
    "team-boog": dict(bestand="team-boog", soort="foto", q={"1200": 74},
        maten=[("1200", 1200, 1789), ("800", 800, 1193)],
        kandidaten=[
            dict(id="lachen-magazijn", bron=61, default=True, crop=(0.5, 0.45, 2705),
                 opm="Echte telefoonfoto (2025-09_lachen, 3024x4032): twee lachende mannen in een magazijn met stellingen, een in TM-polo, een in oranje veiligheidshesje (klant/magazijnmedewerker)."),
            dict(id="laden-stelling", bron=56, crop=(0.5, 0.5, 1073),
                 opm="Echte telefoonfoto (2025-04_Snel-en-efficient-laden): verhuizer schuift materiaal in de stellingen van de laadbak, verhuisdekens op de voorgrond. Opschaling 1,12x."),
            dict(id="team-trap-nap", bron=59, crop=(0.67, 0.5, 1642),
                 opm="Echte telefoonfoto (2025-09_IMG_0207): vier mannen (drie in TM-shirt) poseren op een trap naast een NAP-meetlat."),
        ]),
    "verhuisteam": dict(bestand="verhuisteam", soort="foto",
        maten=[("1200", 1200, 800), ("800", 800, 533)],
        kandidaten=[
            dict(id="overleg-tafel", bron=64, default=True, crop=(0.5, 0.5, 1280),
                 opm="Echte telefoonfoto (2025-11_TopMovers-mannen-header): twee TM-medewerkers in grijze TM-jassen aan een tafel in een hal vol verhuismaterieel (rolcontainers, dozen). Verkleind 0,94x."),
            dict(id="trio-duim", bron=67, crop=(0.5, 0.5, 2560),
                 opm="Echte telefoonfoto (2025-12_Alkmaar-1): drie TM-medewerkers met duim omhoog in een kantoorgang."),
            dict(id="lachen-liggend", bron=61, crop=(0.5, 0.35, 3024),
                 opm="Echte telefoonfoto (2025-09_lachen), liggende crop van de twee lachende mannen (standaard van team-boog, dus niet samen kiezen)."),
        ]),
    "figuur-piano": dict(bestand="figuur-piano", soort="cutout",
        maten=[("1100", 808, 1100), ("700", 514, 700)],
        kandidaten=[
            dict(id="kratten-rolwagen", raw=15, default=True,
                 opm="Echte foto (2021-10_TOPMOVERS-21): verhuizer in TM-polo duwt een rolwagen met drie groene verhuiskratten (label 'PLAATS LABEL HIER'), ten voeten uit."),
            dict(id="doos-dragen", raw=2, retouche="retouche_2",
                 opm="Echte foto (2021-09_topmovers-9): lachende verhuizer met bril draagt een witte TM-'VERHUISDOOS'. RETOUCHE: EU-keurmerklogo onderaan de doos weggevuld; kleine gedraaide EPV-regel op de bovenkant blijft (op figuurmaat onleesbaar)."),
            dict(id="stofzuigen", raw=16,
                 opm="Echte foto (2021-10_TOPMOVERS-25): verhuizer stofzuigt het tapijt van een kantoor (oplevering)."),
        ]),
    "trap-scene": dict(bestand="trap-scene", soort="foto",
        maten=[("1000", 1000, 1339), ("640", 640, 857)],
        kandidaten=[
            dict(id="doos-aangeven-lift", bron=9, default=True, crop=(0.72, 0.5, 896),
                 opm="Echte foto (2021-10_Home-part-topmovers-14): verhuizer geeft een witte TM-'VERHUISDOOS' aan zijn collega bij de verhuislift, bewoner kijkt toe vanaf het bordes van een grachtenpand. Opschaling 1,12x. Klein Erkende Verhuizers-logo op de doos."),
            dict(id="doos-gevel", bron=36, crop=(0.6, 0.5, 896),
                 opm="Echte foto (2021-10_topmovers-4): witte TM-doos op het liftplateau, grachtenpand erachter."),
            dict(id="lift-balkon", bron=39, crop=(0.45, 0.45, 896),
                 opm="Echte foto (2021-10_topmovers-51): verhuislift naar een balkon, verhuizer neemt een kist aan; ledennaam rechtsonder buiten de crop."),
        ]),
    "familie": dict(bestand="familie", soort="foto",
        maten=[("1200", 1200, 800), ("800", 800, 533)],
        kandidaten=[
            dict(id="laadklep-kast", bron=72, default=True, crop=(0.417, 0.5, 1600), retouche="retouche_72",
                 opm="Echte telefoonfoto (2025-12_GLR2): twee verhuizers rijden een kast op een hondje bij de laadklep van de TM-bakwagen, kantoorspullen op de klep, tweede TM-truck erachter; past bij 'Ook voor uw bedrijfsverhuizing'. RETOUCHE: ledenlogo 'VAN DER ENT' op een doos op de klep weggevuld."),
            dict(id="kantoor-inpakken", bron=25, crop=(0.62, 0.62, 1500),
                 opm="Echte foto (2021-10_TOPMOVERS-ZAKELIJK): inpakken op kantoor, TM-dozen; is de standaard van dienst-inpak, dus niet samen kiezen."),
            dict(id="handdruk-kratten", bron=53, crop=(0.5, 0.5, 3264),
                 opm="Echte telefoonfoto (2025-02_IMG_0045): overdracht met handdruk bij groene kratten."),
        ]),
    "huisje": dict(bestand="huisje", soort="foto",
        maten=[("1200", 1200, 900), ("800", 800, 600)],
        kandidaten=[
            dict(id="landweg", bron=76, default=True, crop=(0.5, 0.5, 2301),
                 opm="Marketingcomposiet (2026-01_lets-move-to-zero): TM-truck frontaal op een landweg tussen bloemenvelden, 'topmovers.nl' op de zonneklep; is ook hero-alternatief, dus niet samen kiezen."),
            dict(id="truck-pand", bron=58, crop=(0.55, 0.5, 3264),
                 opm="Echte telefoonfoto (2025-09_IMG_0179): TM-bakwagen ('TOP MOVERS', 'Erkende Verhuizers') met laadklep bij een bakstenen pand."),
            dict(id="gracht-bovenaf", bron=35, crop=(0.5, 0.5, 1707),
                 opm="Echte foto (2021-10_topmovers-28-header): van bovenaf langs de verhuislift op een TM-bakwagen aan een gracht."),
        ]),
    "figuur-wasmachine-v2": dict(bestand="figuur-wasmachine-v2", soort="medaillon",
        maten=[("1280", 1280, 1278), ("820", 820, 819)],
        kandidaten=[
            dict(id="medaillon-1910-wagen", bron=90, default=True, crop=(0.6, 0.55, 1300),
                 opm="Historische foto van De Kievit (fotos-kievit, zwart-wit): paard en wagen met kinderen erop en een jongen ernaast voor het pand 'W. de Kievit Expeditie en Verhuizingen'; als ovaal medaillon met zachte rand voor de gouden cirkel bij 'Meer dan honderd jaar verhuizen vanuit Venlo'."),
            dict(id="medaillon-oude-trucks", bron=89, crop=(0.5, 0.55, 1433),
                 opm="Historische foto (fotos-kievit, zwart-wit): twee vrachtwagens 'Firma W. de Kievit & Zonen, intern. transporten en verhuizingen, Venlo' bij flats; ovaal medaillon."),
        ]),
    "leadblock-plant": dict(bestand="leadblock-plant", soort="foto", q={"1240": 74},
        maten=[("1240", 1240, 1848), ("820", 820, 1222)],
        kandidaten=[
            dict(id="trio-duim-staand", bron=67, default=True, crop=(0.512, 0.6, 1130),
                 opm="Echte telefoonfoto (2025-12_Alkmaar-1): drie TM-medewerkers (grijze sweater, zwarte polo's met TM-logo) met duim omhoog in een kantoorgang met glaswand. Staande crop, koppen bovenin (object-position center top)."),
            dict(id="handdruk-staand", bron=53, crop=(0.54, 0.5, 1643),
                 opm="Echte telefoonfoto (2025-02_IMG_0045): handdruk bij groene kratten, staande crop op de handdruk."),
            dict(id="laden-stelling", bron=56, crop=(0.5, 0.5, 1073),
                 opm="Echte telefoonfoto (2025-04_Snel-en-efficient-laden): verhuizer in de stellingen van de laadbak. Opschaling 1,16x."),
        ]),
    "footer-avond": dict(bestand="footer-avond", soort="foto",   # voor bron 58 (baksteen) zou q={"1600":66,"900":72}, blur={"1600":0.8,"900":0.5} nodig zijn (535 -> 197 KB)
        maten=[("1600", 1600, 1073), ("900", 900, 604)],
        kandidaten=[
            dict(id="truck-avondlucht", bron=6, default=True, crop=(0.5, 0.5, 1800), retouche="retouche_6",
                 opm="Echte foto (2021-10_100-elektrisch-Top-Mover-truck): TM-bakwagen driekwart op een landweg onder een oranje-blauwe avondlucht, 'TOP MOVERS' groot op de bak, klein Erkende Verhuizers-logo. RETOUCHE: '100% elektrisch' op de deur en '100% elektrische verhuizingen' op de dorpel deterministisch weggevuld."),
            dict(id="truck-pand", bron=58, crop=(0.5, 0.45, 3264),
                 opm="Echte telefoonfoto (2025-09_IMG_0179): TM-bakwagen ('TOP MOVERS' groot op de zijkant, klein 'Erkende Verhuizers'-logo) met laadklep bij een bakstenen bedrijfspand, daglicht; cabine schuilt achter de hoek van het pand. Geen ledennaam, EPV of CO2 in beeld. Was 28-aug kort de default toen de avondtruck nog in de hero-video zat; sinds de video zonder wagen speelt is bron 6 weer de footer."),
            dict(id="gracht-bovenaf", bron=35, crop=(0.5, 0.5, 1920),
                 opm="Echte foto (2021-10_topmovers-28-header): van bovenaf langs de verhuislift op een TM-bakwagen aan een gracht."),
        ]),
    "og": dict(bestand="og", soort="foto", formaat="jpg",
        maten=[("1200", 1200, 630)],
        kandidaten=[
            dict(id="team-doos", bron=66, default=True, crop=(0.5, 0.45, 1280), retouche="retouche_66",
                 opm="Echte foto (2025-11_TopMovers-mannen-header3): drie verhuizers op een bank met TM-doos ('aanpakkers met impact!') voor een Mercedes Actros met 'topmovers.nl', liggende social-crop. RETOUCHE: jubileumlogo '100 Van der Ent Group' (ander lid) op de cabinedeur weggevuld."),
            dict(id="laaddok", bron=22, crop=(0.5, 0.45, 1800),
                 opm="Echte foto (2021-10_TOPMOVERS-56): drie verhuizers met TM-dozen bij de laadbak aan het dok."),
        ]),
}


def maak_slot(naam, meta):
    uit = []
    os.makedirs(os.path.join(KAND, naam), exist_ok=True)
    for k in meta["kandidaten"]:
        rec = dict(slot=naam, id=k["id"], default=bool(k.get("default")), opm=k["opm"], bestanden={}, cutout=meta["soort"] != "foto")
        n = k.get("bron", k.get("raw"))
        rec["bron"] = n; rec["bronbestand"] = os.path.basename(bronpad(n)); rec["bronmaat"] = bron(n).size
        ret = globals().get(k.get("retouche", ""), None)
        if meta["soort"] == "foto":
            im = bron(n)
            if ret:
                im = ret(im)
        elif meta["soort"] == "cutout":
            im = raw(n)
        ext = "jpg" if meta.get("formaat") == "jpg" else "webp"
        for suffix, w, h in meta["maten"]:
            if meta["soort"] == "foto":
                crop = k["crop"]
                if isinstance(crop, dict):
                    crop = crop.get(suffix, crop["*"])
                res, box, schaal = maak_foto(im, w, h, crop); q = 84
            elif meta["soort"] == "cutout":
                res, box, schaal = maak_cutout(im, w, h, snij_onder=k.get("snij_onder"), snij_rechts=k.get("snij_rechts"),
                                               retouche=ret, marge_boven=k.get("marge_boven", 0)); q = 88
            else:
                res, box, schaal = medaillon(n, k["crop"], w, h); q = 86
            q = meta.get("q", {}).get(suffix, q)
            if meta.get("blur", {}).get(suffix):        # decoratief vlak onder een gradient: lichte blur haalt de textuurbytes weg
                res = res.filter(ImageFilter.GaussianBlur(meta["blur"][suffix]))
            p = os.path.join(KAND, naam, f"{k['id']}-{suffix}.{ext}")
            opties = dict(quality=q, method=6) if ext == "webp" else dict(quality=q, optimize=True)
            res.save(p, "WEBP" if ext == "webp" else "JPEG", **opties)
            rec["bestanden"][suffix] = dict(pad=os.path.relpath(p, os.path.join(ROOT, "site")), w=res.width, h=res.height, crop=[int(v) for v in box], schaal=round(schaal, 3))
            if k.get("default"):
                doel = os.path.join(IMG, f"{meta['bestand']}.{ext}" if naam == "og" else f"{meta['bestand']}-{suffix}.{ext}")
                res.save(doel, "WEBP" if ext == "webp" else "JPEG", **opties)
        uit.append(rec)
        print(f"{naam}/{k['id']}: " + ", ".join(f"{s} {b['w']}x{b['h']} schaal {b['schaal']}" for s, b in rec["bestanden"].items()) + (" [default]" if k.get("default") else ""))
    return uit


def main():
    wens = sys.argv[1:] or list(SLOTS)
    jp = os.path.join(HERE, "kandidaten.json")
    alles = json.load(open(jp)) if os.path.exists(jp) else {}
    for naam in wens:
        alles[naam] = maak_slot(naam, SLOTS[naam])
    json.dump(alles, open(jp, "w"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
