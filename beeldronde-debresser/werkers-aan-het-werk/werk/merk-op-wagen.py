"""Zet de De Bresser-belettering op een gegenereerde wagen (goedgekeurd in ronde 4 van wagen-debresser).

Alle logo's komen uit de echte bestanden in logos/ (kopie van de-kievit-nl/logos/). Alleen de losse tekstregels
(GROUP OF COMPANIES, de slogan, de vestigingen) zijn gezet in Bahnschrift, omdat daar geen bestand van is.
De vlakken worden met een homografie op de laadbak gezet en krijgen de schaduw van de wagen mee.

KOPIE voor werkers-aan-het-werk-r3 (25-09-2026); het origineel in beeldronde-debresser/wagens/werk/ is niet
aangeraakt. Tekst, kleuren, logo's en lettergrootte-verhoudingen zijn gelijk; anders is alleen de wagen:
- een bakwagen gezien vanaf de achterhoek, cabine rechts. De band begint hier aan de ACHTERkant en valt naar
  de cabine toe uiteen. De indeling hangt aan de band, dus op het plat-canvas is hij gelijk aan de vrachtwagen
  (A en B links boven bij het begin van de band, slogan in de band vlak voor de blokjes, E onderaan), maar op
  de wagen zelf gespiegeld: A en B staan nu achteraan in plaats van voorin.
- de bakzijde is 1,35 : 1 in plaats van 2,7 : 1 (afgelezen van het beeld zelf: met 1,35 zijn de gegenereerde
  blokjes vierkant en is het achterwiel een cirkel); de vakken zijn in bakhoogte gelijk, E is kleiner zodat
  de drie vestigingen tussen de achterkant en de blokjes passen.
- D (groot logo) staat aan de blokjeskant; daar zitten de blokjes en een gegenereerd groen vlak, dus geen D.
  De cabinedeur en de voorkant zijn niet in beeld: geen deur, beeldmerk of front.
- het beeld heeft al het Top Movers-borstlogo van ronde 2 (versie-<nr>-merk.png); dat blijft pixel voor pixel.

    python merk-op-wagen.py <rondemap> <nr> [uitvoerbestand]     leest versie-<nr>-merk.png, schrijft versie-<nr>-wagen.png
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

LOGOS = Path(__file__).resolve().parent / "logos"
FONT = "C:/Windows/Fonts/bahnschrift.ttf"   # Windows-systeemlettertype, niet meegekopieerd

NAVY = (3, 39, 97)          # Erkende Verhuizers-tekst, gemeten op 2024-03_De-Bresser-Verhuisbedrijf-Tilburg.jpg
ORANJE = (252, 120, 43)     # Erkende Verhuizers-embleem, idem
BLAUW = (0, 125, 194)       # tweede regel van het logo 2024
DONKER = (40, 40, 40)
GRIJS = (70, 70, 70)

# Tekst in de vakken. Dit is wat er nu op de echte wagen staat (zie de lead van de ronde): nog open.
SLOGAN = ["ONS VERVOER WORDT", "ENKEL UITGEVOERD MET", "DE SCHOONSTE MOTOREN!!!"]
VESTIGINGEN = [("OISTERWIJK", "013 - 528 23 72"), ("TILBURG", "013 - 542 59 35"), ("BREDA", "076 - 8200233")]

# Per versie: de vier hoeken van de laadbakzijde in beeldpixels, in de volgorde van het canvas: het begin van
# de band boven, het blokjeseind boven, blokjeseind onder, begin onder. Bij deze wagen is het begin van de band
# de achterkant (links in beeld) en het blokjeseind de voorkant van de bak (tegen de cabine).
# Achter-boven valt buiten beeld (y < 0): doorgetrokken langs de bovenrand, die bij x 1921 het beeld in komt.
# Onder is de naad boven de onderste lijst (1675,1306)-(2281,1144), niet de lijst zelf.
VERSIES = {
    2: {"bak": [(1668, -156), (2293, 230), (2293, 1141), (1668, 1308)], "W": 1350},
}

H = 1000   # de laadbakzijde plat; de lengte (W) staat per versie


def font(size, stijl="Bold"):
    """Bahnschrift is een variabel font; de stijlnamen werken hier niet, de assen wel."""
    gewicht = {"Light": 300, "SemiLight": 350, "Regular": 400, "SemiBold": 600, "Bold": 700}
    breedte = 87.5 if "SemiCondensed" in stijl else 75 if "Condensed" in stijl else 100
    naam = stijl.replace(" SemiCondensed", "").replace(" Condensed", "")
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_axes([gewicht.get(naam, 400), breedte])
    return f


def tekst(regels, size, kleur, stijl="Bold", spatie=0, regelafstand=1.15):
    """Tekst als RGBA-vlak, met optionele letterafstand."""
    f = font(size, stijl)
    breed = max(sum(f.getlength(c) + spatie for c in r) for r in regels)
    hoog = int(size * regelafstand * len(regels) + size * 0.3)
    im = Image.new("RGBA", (int(breed) + 4, hoog), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for i, r in enumerate(regels):
        x = 0
        for c in r:
            d.text((x, i * size * regelafstand), c, font=f, fill=kleur + (255,))
            x += f.getlength(c) + spatie
    return im.crop(im.getbbox())


def bijsnijden(im):
    return im.crop(im.getbbox())


def logo_2024():
    lg = Image.open(LOGOS / "2024-07_De-Bresser-Logo-2024.png").convert("RGBA")
    a = np.array(lg)
    a[:1700, 1750:, 3] = 0          # kroon en "SINDS 1923" eraf: op de wagen staat het logo zonder kroon
    return Image.fromarray(a)


def logo_zonder_kroon():
    return bijsnijden(logo_2024())


def woordmerk_met_regels():
    lg = logo_2024()
    return bijsnijden(lg.crop((0, 1740, lg.width, lg.height)))


def woordmerk():
    lg = logo_2024()
    return bijsnijden(lg.crop((0, 1740, lg.width, 2200)))


def beeldmerk():
    lg = logo_2024()
    return bijsnijden(lg.crop((0, 0, 1750, 1700)))


def erkende():
    e = Image.open(LOGOS / "2024-06_Erkende-verhuizers-De-Bresser@300x.png").convert("RGBA")
    a = np.array(e)
    a[:, :, :3] = NAVY
    # het embleem (katrol met touwen) staat los links van de E: lege kolommen 2090-2145,
    # en het eindigt boven rij 560, waar VERHUIZERS begint
    a[:560, :2118, :3] = ORANJE
    e = Image.fromarray(a)
    return bijsnijden(e.crop((1640, 0, e.width, e.height)))    # "Zeker bij |" eraf


def group_of_companies(hoogte):
    wm = woordmerk()
    bm = beeldmerk()
    wm = wm.resize((int(wm.width * hoogte / wm.height), hoogte), Image.LANCZOS)
    goc = tekst(["GROUP OF COMPANIES"], int(hoogte * 0.62), BLAUW, "SemiBold", spatie=hoogte * 0.02)
    goc = goc.resize((int(wm.width * 0.86), int(goc.height * wm.width * 0.86 / goc.width)), Image.LANCZOS)
    bh = int(hoogte * 1.55)
    bm = bm.resize((int(bm.width * bh / bm.height), bh), Image.LANCZOS)
    gap = int(hoogte * 0.25)
    vlak = Image.new("RGBA", (wm.width + gap + bm.width, max(bh, hoogte + gap // 2 + goc.height)), (0, 0, 0, 0))
    vlak.alpha_composite(wm, (0, 0))
    vlak.alpha_composite(goc, (int((wm.width - goc.width) / 2), hoogte + gap // 2))
    vlak.alpha_composite(bm, (wm.width + gap, 0))
    return vlak


def vestiging(naam, nummer, hoogte):
    n = tekst([naam], hoogte, DONKER, "SemiBold", spatie=hoogte * 0.35)
    t = tekst([nummer], int(hoogte * 0.9), GRIJS, "Regular", spatie=hoogte * 0.3)
    vlak = Image.new("RGBA", (max(n.width, t.width), n.height + int(hoogte * 0.45) + t.height), (0, 0, 0, 0))
    vlak.alpha_composite(n, (0, 0))
    vlak.alpha_composite(t, (0, n.height + int(hoogte * 0.45)))
    return vlak


def plaats(canvas, vlak, x0, y0, x1, y1, uitlijn="links"):
    s = min((x1 - x0) / vlak.width, (y1 - y0) / vlak.height)
    v = vlak.resize((max(1, int(vlak.width * s)), max(1, int(vlak.height * s))), Image.LANCZOS)
    x = x0 if uitlijn == "links" else int(x0 + (x1 - x0 - v.width) / 2)
    canvas.alpha_composite(v, (int(x), int(y0)))


def bak_canvas(W):
    """De laadbakzijde plat, indeling afgelezen van de wagen op 2024-03_De-Bresser-Verhuisbedrijf-Tilburg.jpg.
    Vakken even groot als op de vrachtwagen (in bakhoogte); A en B 55 lager, want links boven valt de bak
    buiten beeld (canvas y < 100 bij de achterkant). Plat-canvas van deze bak: zie meet-bak-plat.png."""
    c = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    plaats(c, erkende(), 90, 140, 410, 260)                                   # A, Erkende Verhuizers
    plaats(c, group_of_companies(60), 90, 320, 550, 425)                      # A, De Bresser Group of Companies
    plaats(c, bijsnijden(Image.open(LOGOS / "2024-03_De-Bresser-Top-movers.png").convert("RGBA")),
           660, 140, 1040, 320)                                              # B, Top Movers
    # D (groot logo zonder kroon) niet: aan de blokjeskant zitten de blokjes (x 910-1275) en het groene vlak
    for (naam, nummer), cx in zip(VESTIGINGEN, (175, 485, 795)):            # E, vestigingen, tussen band en
        v = vestiging(naam, nummer, 26)                                      # onderrand, voor de blokjes
        c.alpha_composite(v, (int(cx - v.width / 2), 900))
    return c


def slogan_canvas(band, W):
    """De slogan, wit, in het massieve deel van de groene band (band = x0, y0, x1, y1 op het canvas)."""
    c = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    x0, y0, x1, y1 = band
    h = y1 - y0
    s = tekst(SLOGAN, 120, (255, 255, 255), "Bold", regelafstand=1.18)
    breedte = 0.5 * (x1 - x0)
    rechts = x1 - 0.06 * (x1 - x0)
    plaats(c, s, rechts - breedte, y0 + 0.2 * h, rechts, y1 - 0.18 * h)
    return c


def homografie(van, naar):
    """Coefficienten voor Image.transform(PERSPECTIVE): elk punt in 'naar' wijst naar een punt in 'van'."""
    A, b = [], []
    for (x, y), (u, v) in zip(naar, van):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return np.linalg.solve(np.array(A, float), np.array(b, float))


def punt(h, x, y):
    """Beeldpunt -> canvaspunt met de coefficienten uit homografie()."""
    a, b_, c, d, e, f, g, hh = h
    n = g * x + hh * y + 1
    return (a * x + b_ * y + c) / n, (d * x + e * y + f) / n


def warp(vlak, hoeken, grootte):
    # eerst met Lanczos verkleinen tot ongeveer de doelmaat: bicubisch vanaf 2700 px slaat pixels over
    # en breekt kleine letters (V werd Y, O werd D)
    (a, b, c, d) = hoeken
    lang = lambda p, q: ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2) ** 0.5
    bw, bh = 1.3 * max(lang(a, b), lang(d, c)), 1.3 * max(lang(a, d), lang(b, c))
    f = min(1.0, max(bw / vlak.width, bh / vlak.height))
    if f < 1.0:
        vlak = vlak.resize((round(vlak.width * f), round(vlak.height * f)), Image.LANCZOS)
    rect = [(0, 0), (vlak.width, 0), (vlak.width, vlak.height), (0, vlak.height)]
    co = homografie(rect, hoeken)
    return vlak.transform(grootte, Image.PERSPECTIVE, tuple(co), Image.BICUBIC)


def frontvlak(hoeken, breedte=0.46, dx=0):
    """De groepsnaam midden op de witte plaat onder de voorruit (ronde 3: "the de bresser brand should be
    centered"). Gecentreerd op een plat vlak dat daarna in het perspectief van die plaat wordt gezet."""
    gc = group_of_companies(120)
    gc = gc.crop(gc.getbbox())
    (a, b, c, d) = hoeken
    lang = lambda p, q: ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2) ** 0.5
    fw = 2400
    fh = round(fw * (lang(a, d) + lang(b, c)) / (lang(a, b) + lang(d, c)))
    vlak = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    w = int(fw * breedte)
    g = gc.resize((w, round(gc.height * w / gc.width)), Image.LANCZOS)
    vlak.alpha_composite(g, ((fw - g.width) // 2 + round(dx), (fh - g.height) // 2))
    return vlak


def front_op_as(cfg, grootte):
    """Ronde 4 ("still not centered, more to the left"): het midden van de wagen is de as van
    Renault-logo, sleuf en grille, niet het midden van de witte plaat; die zit in deze beelden
    rechts van de as. Het hele logo (naam en beeldmerk) wordt op die as gecentreerd, in beeld gemeten."""
    hoeken = cfg["frontvlak"]
    per_px = 2400 / (hoeken[1][0] - hoeken[0][0])    # canvaspixels per beeldpixel, ongeveer
    dx = 0.0
    for _ in range(6):
        laag = warp(frontvlak(hoeken, dx=dx), hoeken, grootte)
        xs = np.nonzero(np.asarray(laag)[:, :, 3].max(0) > 40)[0]
        fout = cfg["as"] - (xs.min() + xs.max()) / 2
        if abs(fout) < 0.5:
            break
        dx += fout * per_px
    print(f"front: logo x {xs.min()}-{xs.max()}, midden {(xs.min() + xs.max()) / 2:.1f}, as {cfg['as']}")
    return laag


def cabinevlak(vlak, x, y, w, h, helling):
    if h is None:
        h = w * vlak.height / vlak.width
    return vlak, [(x, y), (x + w, y + w * helling), (x + w, y + w * helling + h), (x, y + h)]


def samenvoegen(beeld, laag, basis):
    """Laag op het beeld, met de schaduw van de wagen: kleur x (lokale helderheid / helderheid eronder)."""
    b = np.asarray(beeld).astype(float)
    l = np.asarray(laag).astype(float)
    alfa = l[:, :, 3:4] / 255.0
    lum = np.asarray(beeld.convert("L").filter(ImageFilter.GaussianBlur(3))).astype(float)
    schaduw = np.clip(lum / basis, 0.55, 1.06)[:, :, None]
    uit = b * (1 - alfa) + np.clip(l[:, :, :3] * schaduw, 0, 255) * alfa
    return Image.fromarray(uit.round().astype(np.uint8))


def main(map_, nr, doelpad=None):
    cfg = VERSIES[nr]
    W = cfg["W"]
    beeld = Image.open(Path(map_) / f"versie-{nr}-merk.png").convert("RGB")
    grootte = beeld.size
    rect = [(0, 0), (W, 0), (W, H), (0, H)]
    # alleen de bakzijde telt: hier staan ook groene struiken en een groene cabine in beeld
    bak = np.asarray(warp(Image.new("RGBA", (W, H), (255, 255, 255, 255)), cfg["bak"], grootte))[:, :, 3] > 128

    # waar ligt de gegenereerde groene band op het canvas?
    a = np.asarray(beeld).astype(int)
    groen = (a[:, :, 1] > a[:, :, 0] + 50) & (a[:, :, 1] > a[:, :, 2] + 50) & bak
    # De groene pixels plat op het canvas gezet, niet als beeldpunten geteld: de bak loopt hier zo sterk weg
    # dat een beeldpixel vooraan drie keer zoveel canvas dekt als achteraan, en dan lijkt de band halverwege
    # op te houden. Onder 0,55 H: het groene vlak rechtsboven op de bak hoort niet bij de band.
    plat = np.asarray(Image.fromarray(groen.astype(np.uint8) * 255).transform(
        (W, H), Image.PERSPECTIVE, tuple(homografie(cfg["bak"], rect)), Image.NEAREST)) > 128
    plat[: int(0.55 * H)] = False
    ys = np.nonzero(plat)[0]
    y0, y1 = np.percentile(ys, 8), np.percentile(ys, 92)
    # het massieve deel: de kolommen die over die rijen (bijna) helemaal groen zijn, tot de eerste onderbreking
    vol = np.nonzero(plat[int(y0):int(y1)].mean(0) > 0.9)[0]
    breuk = np.nonzero(np.diff(vol) > 3)[0]
    x0, x1 = vol[0], (vol[breuk[0]] if len(breuk) else vol[-1])
    band = (x0, y0, x1, y1)
    print(f"versie {nr}: band op canvas x {x0:.0f}-{x1:.0f}, y {y0:.0f}-{y1:.0f}")

    wit = np.asarray(beeld.convert("L")).astype(float)
    witbasis = np.percentile(wit[bak & ~groen & (wit > 170)], 75)
    bandbasis = np.median(wit[groen])
    print(f"witbasis {witbasis:.0f}, bandbasis {bandbasis:.0f}")

    laag = warp(bak_canvas(W), cfg["bak"], grootte).filter(ImageFilter.GaussianBlur(0.45))
    uit = samenvoegen(beeld, laag, witbasis)
    laag = warp(slogan_canvas(band, W), cfg["bak"], grootte).filter(ImageFilter.GaussianBlur(0.45))
    uit = samenvoegen(uit, laag, bandbasis)
    # geen cabinezones: deur, beeldmerk en front zijn in dit beeld niet te zien

    doel = Path(doelpad) if doelpad else Path(map_) / f"versie-{nr}-wagen.png"
    uit.save(doel)
    print(doel)


if __name__ == "__main__":
    main(sys.argv[1], int(sys.argv[2]), sys.argv[3] if len(sys.argv) > 3 else None)
