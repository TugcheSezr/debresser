#!/usr/bin/env python3
"""Schrijft uit beeld/kandidaten.json de keuzegalerij (../galerij-beeld.html) en het manifest (../beeld-manifest.md).
Gebruik: python3 galerij.py   (na produceer.py)"""
import html
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
WERK = os.path.dirname(HERE)
K = json.load(open(os.path.join(HERE, "kandidaten.json")))

# Volgorde, doelvak en de maat waarop de galerij toont, per slot (uit brief-beeld.md).
SLOTINFO = [
    ("hero-bg", "1. Hero-achtergrond", "hero rand-tot-rand, object-fit cover center top, donkere veil eroverheen; team-cutout staat ervoor", "1920", "mobiel"),
    ("team-cutout", "2. Team-cutout in de hero", "uitgesneden team, breed, onderin de hero achter de offerte-pill; CSS height:min(420px,54%), width auto", "1600", None),
    ("dienst-compleet", "3. Dienst: complete verhuizing", "boognis, object-fit cover 332x190", "760", None),
    ("dienst-inpak", "4. Dienst: inpakservice", "boognis, object-fit cover 332x190", "760", None),
    ("dienst-montage", "5. Dienst: montage", "boognis, object-fit cover 332x190", "760", None),
    ("dienst-opslag", "6. Dienst: opslag", "boognis, object-fit cover 332x190", "760", None),
    ("dienst-zakelijk", "7. Dienst: zakelijk", "boognis, object-fit cover 332x190", "760", None),
    ("dienst-plan", "8. Dienst: verhuisplan op locatie", "boognis, object-fit cover 332x190", "760", None),
    ("duo-opslag", "9. Duo-cutout opslagblok", "cutout op de schuine band, onderkant via clip-path schuin afgesneden", "1600", None),
    ("dozen-vak", "10. Dozenkaart", "vierkant, object-fit cover center 35%", "1100", None),
    ("figuur-tafel", "11. Figuur in de boog (vensterblok)", "cutout op cream boog met gouden ring, bottom 0", "1100", None),
    ("wagen-heerlijkthuis", "12. Wagen bij de werkwijze-kop", "cutout rechts van de kop, width 100% van de kolom, drop-shadow", "1400", None),
    ("team-boog", "13. Foto in boog: verhuisteam aan het werk", "staand, object-fit cover", "1200", None),
    ("verhuisteam", "14. Teamfoto liggend", "object-fit cover, object-position 65% 50%", "1200", None),
    ("figuur-piano", "15. Staande figuur voor de ringen", "cutout, height 100% van het vak, bottom 0", "1100", None),
    ("trap-scene", "16. Scene in afgeronde rechthoek (vierkant-blok)", "object-fit cover center 34%, 340x470", "1000", None),
    ("familie", "17. Foto in boog: een verhuisbedrijf voor alles", "object-fit cover; caption 'Ook voor uw bedrijfsverhuizing'", "1200", None),
    ("huisje", "18. Foto in boog: werkgebied Venlo en Limburg", "object-fit cover", "1200", None),
    ("figuur-wasmachine-v2", "19. Figuur voor de gouden cirkel (split-blok, 'honderd jaar')", "cutout, height clamp(380px,40vw,540px), bottom 0", "1280", None),
    ("leadblock-plant", "20. Foto naast het offerteformulier", "boven 820px staand 504x775 center top, eronder 16/10 liggend 50% 30%", "1240", None),
    ("footer-avond", "21. Footer rand-tot-rand", "donkere gradient eroverheen, object-position 58% 30% (mobiel 44% 34%)", "1600", None),
    ("og", "22. Social-beeld (og.jpg)", "1200x630", "1200", None),
]

CSS = """
body{font:15px/1.45 -apple-system,Helvetica,Arial,sans-serif;margin:0;background:#f4f2ee;color:#222}
header{background:#1c2a38;color:#fff;padding:18px 28px}header h1{margin:0 0 4px;font-size:22px}header p{margin:0;opacity:.85}
section{padding:22px 28px;border-bottom:1px solid #ddd}h2{margin:0 0 4px;font-size:19px}.vak{color:#555;margin:0 0 12px;font-size:14px}
.rij{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
.kaart{background:#fff;border:1px solid #ddd;border-radius:10px;padding:10px;width:420px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.kaart.gekozen{border:2px solid #0a7d4b}.kaart.afgekeurd{opacity:.75;border-style:dashed}
.kaart figure{margin:0 0 8px;background:#e9e6df;border-radius:6px;overflow:hidden;display:flex;justify-content:center}
.kaart.donker figure{background:#3d3a35 url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><rect width=%2210%22 height=%2210%22 fill=%22%23454138%22/><rect x=%2210%22 y=%2210%22 width=%2210%22 height=%2210%22 fill=%22%23454138%22/></svg>')}
.kaart img{max-width:100%;height:auto;display:block;max-height:340px}
.kaart h3{margin:0 0 4px;font-size:15px}.badge{display:inline-block;background:#0a7d4b;color:#fff;font-size:11px;padding:2px 7px;border-radius:99px;margin-left:6px;vertical-align:middle}
.badge.rood{background:#b3261e}.kaart p{margin:4px 0;font-size:13px}.meta{color:#666;font-size:12px}
.ontbreekt{color:#b3261e;font-style:italic}
"""


def kaart(rec, slot, toon, extra=None):
    b = rec["bestanden"].get(toon) or list(rec["bestanden"].values())[0]
    cls = "kaart" + (" gekozen" if rec["default"] else "") + (" afgekeurd" if "afgekeurd" in rec["id"] else "") + (" donker" if rec.get("cutout") else "")
    badge = '<span class="badge">GEKOZEN (staat in assets/img)</span>' if rec["default"] else ('<span class="badge rood">afgekeurd</span>' if "afgekeurd" in rec["id"] else "")
    maten = ", ".join(f"{s}: {v['w']}x{v['h']} (schaal {v['schaal']})" for s, v in rec["bestanden"].items())
    src = html.escape(b["pad"].replace("_werk/", ""))
    return (f'<div class="{cls}"><figure><img src="{src}" alt="" loading="lazy"></figure>'
            f'<h3>{html.escape(rec["id"])}{badge}</h3>'
            f'<p>{html.escape(rec["opm"])}</p>'
            f'<p class="meta">bron nr {rec["bron"]}: {html.escape(rec["bronbestand"])} ({rec["bronmaat"][0]}x{rec["bronmaat"][1]})<br>{html.escape(maten)}<br>crop {toon}: {b["crop"]}</p></div>')


def galerij():
    delen = [f"<!doctype html><meta charset=utf-8><title>Keuzegalerij beeld De Kievit</title><style>{CSS}</style>",
             "<header><h1>Keuzegalerij beeld homepage De Kievit (Top Movers-bank)</h1><p>Per slot 2-3 kandidaten; de groene kaart staat nu in site/assets/img/. Cutouts op donker geblokt vlak. Nummers = contactvel sheet1/sheet2. Kies per slot een kandidaat-id; omwisselen is een regel in produceer.py (default=True) en opnieuw draaien.</p></header>"]
    for slot, titel, vak, toon, toon2 in SLOTINFO:
        delen.append(f"<section id='{slot}'><h2>{html.escape(titel)} <span class='meta'>({slot})</span></h2><p class='vak'>Doelvak: {html.escape(vak)}</p>")
        recs = K.get(slot)
        if not recs:
            delen.append("<p class='ontbreekt'>Nog niet gemaakt.</p></section>")
            continue
        delen.append("<div class='rij'>" + "".join(kaart(r, slot, toon) for r in recs) + "</div>")
        if toon2:
            delen.append(f"<p class='vak' style='margin-top:14px'>Zelfde kandidaten, variant {toon2}:</p><div class='rij'>" + "".join(kaart(r, slot, toon2) for r in recs) + "</div>")
        delen.append("</section>")
    open(os.path.join(WERK, "galerij-beeld.html"), "w").write("\n".join(delen))


def manifest():
    r = ["# Beeld-manifest homepage De Kievit (Top Movers-bank)", "",
         "Per slot: gekozen bron, crop (bronpixels x0,y0,x1,y1), schaalfactor naar de grootste maat en wat er te zien is, voor alt-teksten en claims. "
         "Nummers = contactvel sheet1/sheet2 (0-85 topmovers/fotos op ASCII-alfabet, 86-95 fotos-kievit). "
         "Alle bestanden staan op de exacte HT-namen en -maten in site/assets/img/; alle kandidaten in site/_werk/beeld/kandidaten/. "
         "Werkwijze: echte foto's uit de bank, cutouts met macOS Vision (site/_werk/cutout.py), geen generatief beeld; retouches staan per slot vermeld.", ""]
    for slot, titel, vak, toon, toon2 in SLOTINFO:
        r.append(f"## {titel} (`{slot}`)")
        r.append(f"Doelvak: {vak}.")
        recs = K.get(slot)
        if not recs:
            r.append("Nog niet gemaakt."); r.append(""); continue
        for rec in recs:
            if not rec["default"]:
                continue
            maten = "; ".join(f"{s} {v['w']}x{v['h']} (schaal {v['schaal']}, crop {v['crop']})" for s, v in rec["bestanden"].items())
            r.append(f"- GEKOZEN: `{rec['id']}`, bron nr {rec['bron']} `{rec['bronbestand']}` ({rec['bronmaat'][0]}x{rec['bronmaat'][1]}).")
            r.append(f"  - Te zien: {rec['opm']}")
            r.append(f"  - Maten: {maten}")
        alts = [x for x in recs if not x["default"]]
        if alts:
            r.append("- Alternatieven: " + "; ".join(f"`{x['id']}` (nr {x['bron']}: {x['opm'].split('.')[0]})" for x in alts) + ".")
        r.append("")
    r.append("## Losse figuren buiten de 22 slots")
    r.append("Later toegevoegd door de regie-sessie uit de hero-kandidatenronde; niet uit produceer.py, wel hier vastgelegd.")
    r.append("")
    r.append("- `figuur-duo-dozen-1600/900.webp` (1600x976, 900x549), ringen-blok \"Lokaal verhuisbedrijf, landelijk netwerk\". "
             "Bron: AI-variant AI-02 uit `_werk/hero/ai/cut/hero-02.png` (Nano Banana Pro, gezichten uit de mixbibliotheek, geen echte medewerkers). "
             "Te zien: twee verhuizers in donkere TM-polo, links een man met een witte TM-doos voor de borst, rechts een man met twee gestapelde dozen; "
             "borstprint en dozenlogo op 100 procent gecontroleerd, TOP MOVERS correct. LET OP: de dozen zijn met tape dichtgeplakt, "
             "wat tegen beeldregel 1 ingaat (Top Movers-dozen sluiten met een kliksluiting); staat als open punt bij Shahab.")
    r.append("- `figuur-duo-lachen-1100/700.webp` (1100x907, 700x577), venster-blok \"Benieuwd naar de kosten\". "
             "Bron: `_werk/hero/ai61/cut/duo61-02-fix2.png`, een GEGENEREERDE plaat op magenta van de regie-sessie, gebaseerd op foto 61 "
             "`2025-09_lachen.jpg` (zelfde twee mannen, hesje en TM-polo); het zijn dus geen echte medewerkers en de gelijkenis is nagemaakt. "
             "Te zien: twee lachende mannen met de arm om elkaars schouder, links een man in oranje veiligheidshesje (GEEN TM-kleding), "
             "rechts een verhuizer in grijs TM-poloshirt met borstlogo. 28-aug bijgewerkt met `randfix.py --despill 6 --trim 0.06` omdat de "
             "magenta-key een paarse gloed langs hoofd en schouders had achtergelaten die op het donkerblauwe vlak oplichtte "
             "(35.181 px langs de contour geneutraliseerd; alleen magenta-achtige pixels, dus hesje en navy mouw ongemoeid). "
             "Kadrering identiek aan de goedgekeurde versie (silhouet-IoU 0,983). Backups in `_werk/beeld/orig/`: "
             "`-voor-randfix` is de versie met gloed, `-echte-foto-variant` is dezelfde uitsnede uit de ECHTE foto 61 via `raw-61.png`, "
             "die klaarstaat als Shahab liever geen gegenereerde gezichten wil.")
    r.append("")
    open(os.path.join(WERK, "beeld-manifest.md"), "w").write("\n".join(r))


if __name__ == "__main__":
    galerij(); manifest(); print("galerij-beeld.html en beeld-manifest.md geschreven")
