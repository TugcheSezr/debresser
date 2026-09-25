#!/usr/bin/env python3
"""Integratiecontrole over de vier voorbereidingspagina's, na het werk van de losse sessies.

Wat een sessie zelf niet kan zien: of zijn tekst uniek is tegenover de andere drie en tegenover
de homepage. Daarnaast de harde regels die voor alle vier gelden.

Draaien: python3 site/_werk/kruiscontrole.py   (vanuit ~/website-kieviet)
"""
import collections, html, pathlib, re, sys

SITE = pathlib.Path(__file__).resolve().parents[1]
# Alle pagina's met handgeschreven inhoud, plus de pagina's die nog moeten komen. Zo groeit de
# controle vanzelf mee met elke ronde in plaats van dat iemand deze lijst moet bijwerken.
VERWACHT = ["verhuischecklist", "inpaktips", "dozencalculator", "m3-calculator",
            "over-ons", "werkwijze", "duurzaamheid", "vacatures",
            "erkende-verhuizer", "certificeringen", "verzekering", "klachtenregeling",
            "klantervaringen", "veelgestelde-vragen"]
PAGINAS = sorted({p.stem for p in (pathlib.Path(__file__).resolve().parent / "paginas").glob("*.html")}
                 | set(VERWACHT))
fouten = []
wacht = []


def zichtbare_tekst(h):
    """Alleen wat de bezoeker als PROZA leest.

    Commentaar, script en style eruit, en ook de knoppen: elke pagina heeft een offerteknop en
    hetzelfde telefoonnummer, en zonder leesteken plakt de tekstextractie die labels aan elkaar
    tot een schijnzin ("Offerte aanvragen Bel 077 - 32 32 100"). Dat leverde vals alarm op twee
    paginaparen op. Knoppen dragen allemaal class="btn"; tekstlinks in een lopende zin niet, dus
    die blijven wel meedoen.
    """
    h = re.sub(r"<!--.*?-->", " ", h, flags=re.S)
    h = re.sub(r"<(script|style)\b.*?</\1>", " ", h, flags=re.S | re.I)
    h = re.sub(r'<a\b[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>.*?</a>', " ", h, flags=re.S | re.I)
    h = re.sub(r"<button\b.*?</button>", " ", h, flags=re.S | re.I)
    h = re.sub(r"<[^>]+>", " ", h)
    return re.sub(r"\s+", " ", html.unescape(h)).strip()


def zinnen(tekst, minwoorden=7):
    return {z.strip() for z in re.split(r"(?<=[.!?])\s+", tekst)
            if len(z.split()) >= minwoorden}


bron = {}
for naam in PAGINAS:
    f = SITE / naam / "index.html"
    if not f.exists():
        fouten.append(f"{naam}: pagina bestaat niet")
        continue
    bron[naam] = f.read_text(encoding="utf-8")

# de gedeelde staart en de balk staan op elke pagina; alleen het eigen inhoudsdeel vergelijken
eigen = {}
for naam, h in bron.items():
    hand = SITE / "_werk/paginas" / f"{naam}.html"
    if not hand.exists():
        wacht.append(naam)          # nog niet geschreven; dat is geen fout tijdens de rit
        continue
    eigen[naam] = zichtbare_tekst(hand.read_text(encoding="utf-8"))
    if not eigen[naam]:
        fouten.append(f"{naam}: _werk/paginas/{naam}.html staat leeg")

home = zinnen(zichtbare_tekst((SITE / "index.html").read_text(encoding="utf-8")))
alle = {n: zinnen(t) for n, t in eigen.items() if t}

for n, z in alle.items():
    gedeeld = z & home
    if gedeeld:
        fouten.append(f"{n}: {len(gedeeld)} zin(nen) letterlijk van de homepage, bv. {list(gedeeld)[0][:80]!r}")
for a, b in [(a, b) for i, a in enumerate(alle) for b in list(alle)[i + 1:]]:
    gedeeld = alle[a] & alle[b]
    if gedeeld:
        fouten.append(f"{a} en {b}: {len(gedeeld)} zin(nen) identiek, bv. {list(gedeeld)[0][:80]!r}")

for naam, h in {n: bron[n] for n in eigen}.items():
    if "—" in h or "–" in h:
        fouten.append(f"{naam}: em- of en-dash gevonden")
    dubbel = [k for k, v in collections.Counter(re.findall(r'\sid="([^"]+)"', h)).items() if v > 1]
    if dubbel:
        fouten.append(f"{naam}: dubbele id's {dubbel}")
    dood = sorted({a for a in re.findall(r'<a\b[^>]*?href="#([a-z0-9-]+)"', h)} - set(re.findall(r'\sid="([^"]+)"', h)))
    if dood:
        fouten.append(f"{naam}: ankers zonder doel {dood}")
    for link in re.findall(r'<a\b[^>]*?href="(/[^"#]*)"', h):
        p = SITE / link.strip("/")
        if link != "/" and not (p / "index.html").exists() and not p.exists():
            fouten.append(f"{naam}: dode link {link}")
    for src in re.findall(r'src="(/assets/[^"]+)"', h):
        # ?v=<buster> hoort bij de cache, niet bij het pad: /assets/js/kievit.js?v=... staat op
        # schijf als /assets/js/kievit.js. Zonder deze knip meldt de controle elk bestand met een
        # cachebuster als ontbrekend (29-08-2026, bij het samenvoegen aan het licht gekomen).
        if not (SITE / src.split("?")[0].lstrip("/")).exists():
            fouten.append(f"{naam}: ontbrekend bestand {src}")

# Feiten die op elke pagina hetzelfde moeten zijn. Losse sessies kunnen dit niet zien: elk van
# hen kiest een variant uit de bronnen en pas naast elkaar botsen ze. Signalen zijn geen fouten,
# want een oud adres of jaartal mag in een historisch verhaal wel staan; ze moeten alleen bekeken.
SIGNALEN = {
    "beginjaar 1895 (de site houdt 1910 aan)": r"\b1895\b",
    "adres Horsterweg (registers zeggen Van Coehoornstraat 11)": r"Horsterweg",
    "adres Voltastraat (alleen geldig als historie)": r"Voltastraat",
    "ander telefoonnummer dan 077 - 32 32 100": r"0(?!77 - 32 32 100)\d\d[ -]?\d{2}[ -]?\d{2}[ -]?\d{3}\b",
    "andere score dan 9,4": r"\b9,[0-35-9]\b",
    "ander aantal beoordelingen dan 779": r"\b(?!779)\d{3}\s+beoordelingen",
}
signalen = []
for naam, tekst in eigen.items():
    for wat, patroon in SIGNALEN.items():
        for m in re.finditer(patroon, tekst):
            rond = tekst[max(0, m.start() - 45):m.end() + 45].strip()
            signalen.append(f"{naam}: {wat} -> ...{rond}...")

woorden = {n: len(t.split()) for n, t in eigen.items()}
print("woorden eigen inhoud:", woorden)
if wacht:
    print("nog niet geschreven:", wacht)
print()
if signalen:
    print(f"{len(signalen)} signaal(en) om te bekijken, geen fouten:")
    for x in signalen:
        print("  ?", x)
    print()
if fouten:
    print(f"{len(fouten)} bevinding(en):")
    for f in fouten:
        print("  -", f)
    sys.exit(1)
print("kruiscontrole schoon")
