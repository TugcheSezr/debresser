#!/usr/bin/env python3
"""Schrijft per dienstpagina een sjabloon met alle tekstslots die veilig te vervangen zijn.

    python3 maak_tekstsjabloon.py [slug ...]

Elk slot komt als (oud, oud) in VERVANG te staan. De schrijver past alleen de TWEEDE string aan.
Zo kan de linkerkant nooit fout zijn en matcht hij per definitie exact een keer: dit script neemt
alleen slots op waarvan de inhoud precies een keer in de pagina voorkomt.

Bestaat het doelbestand al, dan wordt het NIET overschreven (daar zit dan werk van een schrijver in).
"""
import pathlib, re, sys

WERK = pathlib.Path(__file__).resolve().parent
SITE = WERK.parent
DOEL = WERK / "paginas/teksten"
DIENSTEN = ["particulier-verhuizen", "inpakservice", "montage-demontage", "inboedelopslag",
            "kantoorverhuizing", "internationale-verhuizing", "piano-verhuizen",
            "antiek-en-kunst-verhuizen", "seniorenverhuizing", "spoedverhuizing", "zorgverhuizing"]
# Deze elementen dragen tekst. class= erbij zodat het sjabloon leesbaar blijft.
SLOT = re.compile(r'<(h1|h2|h3|p|li|span)\b([^>]*)>(.*?)</\1>', re.S)
# Blokken die NIET van deze pagina zijn: menu, voetlijst en het formulier (labels horen bij de code).
OVERSLAAN = re.compile(r'(topbar|drawer|footer|jur|lf__|of-|veld|knop|btn|kruimel|keurmerk)')

def hoofd(slug):
    """Het hele document telt mee voor de uniciteitstoets, want eigen_woorden() draait daarop.
    Slots worden alleen UIT <main> gehaald, zodat menu en voetlijst niet als slot verschijnen."""
    s = (SITE / slug / "index.html").read_text(encoding="utf-8")
    i, j = s.find("<main"), s.rfind("</main>")
    return s[i:j], s

def sectienaam(html, pos):
    kop = None
    for m in re.finditer(r'<h2[^>]*>(.*?)</h2>', html[:pos], re.S):
        kop = re.sub(r"<[^>]+>", "", m.group(1)).strip()
    return kop or "hero en offertebalk"

def verzamel(html, basis, uit):
    """Zoekt de BINNENSTE tekstdragers. Een kaart is hier <li><span icoon><div><h3>+<p></div></li>;
    een enkele pass met finditer pakte die hele li en gooide hem daarna weg omdat er structuur in
    zat, waardoor precies de vier kaarten en de acht lijstitems geen slot kregen. Vandaar recursie:
    heeft de inhoud nog blokstructuur, dan gaan we erin; zo niet, dan is dit het slot."""
    for m in SLOT.finditer(html):
        tag, attrs, inhoud = m.group(1), m.group(2), m.group(3).strip()
        if not inhoud:
            continue
        binnen = set(re.findall(r"</?([a-zA-Z0-9]+)", inhoud))
        if binnen - {"a", "strong", "em", "b", "br", "span", "svg", "use"}:
            verzamel(m.group(3), basis + m.start(3), uit)
        else:
            uit.append((basis + m.start(3), tag, attrs, inhoud))

def maak(slug):
    uit = DOEL / f"{slug}.py"
    if uit.exists():
        print(f"  {slug}: bestaat al, overgeslagen")
        return
    h, heel = hoofd(slug)
    rauw = []
    verzamel(h, 0, rauw)
    regels, gezien, huidig = [], set(), None
    for pos, tag, attrs, inhoud in sorted(rauw):
        if OVERSLAAN.search(attrs) or len(inhoud) < 12:
            continue
        # Kruimelpad en losse knoplinks zijn navigatie, geen copy.
        if re.fullmatch(r'\s*<(a|span)\b[^>]*>[^<]*</(a|span)>\s*', inhoud, re.S):
            continue
        # Een icoon-span zonder tekst is geen slot.
        if not re.sub(r"<[^>]+>", "", inhoud).strip():
            continue
        if heel.count(inhoud) != 1 or inhoud in gezien:
            continue
        gezien.add(inhoud)
        sec = sectienaam(h, pos)
        if sec != huidig:
            regels.append(f'\n    # --- {sec} ---')
            huidig = sec
        kl = (re.search(r'class="([^"]*)"', attrs) or [None, ""])[1]
        regels.append(f'    # <{tag}{" class=" + kl if kl else ""}>, {len(inhoud)} tekens\n'
                      f'    ({inhoud!r},\n     {inhoud!r}),')
    uit.write_text(
        f'"""Eigen tekst voor /{slug}/ op de BESTAANDE blokken. Ontwerp blijft ongemoeid.\n\n'
        f'Pas alleen de TWEEDE string van elk paar aan. Laat je een paar ongewijzigd, dan gebeurt er\n'
        f'niets; je mag zo\'n paar ook weghalen. Voeg geen tags toe die een blok maken (section, div,\n'
        f'ul, li, p, h2, h3): build_paginas.py vergelijkt het blokskelet en faalt dan. Inline <a>,\n'
        f'<strong> en <em> mogen wel.\n\n'
        f'Bronmateriaal met de al geschreven tekst: _werk/paginas/teksten-bewaard/{slug}.html\n'
        f'Herbouwen: python3 _werk/build_paginas.py\n"""\n\n'
        f'VERVANG = [' + "\n".join(regels) + "\n]\n", encoding="utf-8")
    print(f"  {slug}: {len(gezien)} slots")

DOEL.mkdir(parents=True, exist_ok=True)
for slug in (sys.argv[1:] or DIENSTEN):
    maak(slug)
