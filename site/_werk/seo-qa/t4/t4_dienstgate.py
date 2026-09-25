#!/usr/bin/env python3
"""Fase 3-poort per servicepagina.

    python3 _werk/seo-qa/t4/t4_dienstgate.py            beoordeel de elf diensten
    python3 _werk/seo-qa/t4/t4_dienstgate.py --ijk      ijking
    python3 _werk/seo-qa/t4/t4_dienstgate.py --route /kantoorverhuizing/

Meet de drie eisen uit het masterplan die objectief te meten zijn:

  1. minstens 75% doelspecifieke inhoudseenheden;
  2. geen servicepaar boven 0,85 gelijkenis (5-gram Jaccard);
  3. een antwoordcapsule van ongeveer 40-60 woorden direct onder de H1/H2.

Plus twee tellingen die de beoordeling voeden: drie tot vijf route-eigen vragen, en of de
algemene FAQ-set niet als vervanging van dienstinhoud dienstdoet.

Wat hier NIET in zit en dus geen PASS kan opleveren: of een case echt is en toestemming heeft,
of de reviewer bestaat, en het oordeel over PQ en Needs Met. Dat zijn menselijke oordelen; een
script dat er een cijfer aan hangt, geeft een vals gevoel van dekking.

Definitie van doelspecifiek: een eenheid telt als doelspecifiek zolang zijn genormaliseerde
tekst op GEEN ENKELE andere route voorkomt. Bewust exact en niet vaag: een bijna-gelijke eenheid
glipt daar doorheen, en juist daarvoor staat de Jaccard-eis er los naast. Twee maten die
verschillende fouten vangen zijn beter dan een die beide half doet.
"""
import argparse, collections, importlib.util, json, math, pathlib, re, sys

HIER = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("t4b", HIER / "t4_baseline.py")
t4b = importlib.util.module_from_spec(spec); spec.loader.exec_module(t4b)

DREMPEL_EIGEN = 0.75
DREMPEL_PAAR = 0.85
CAPSULE_MIN, CAPSULE_MAX = 40, 60


def capsule(html):
    """Het eerste echte tekstblok binnen <main> na de H1/H2, buiten de gedeelde blokken.

    KOPPEN WORDEN OVERGESLAGEN. Het masterplan zegt "direct onder de relevante H1/H2", dus een
    kop voor de capsule is uitdrukkelijk toegestaan. De eerste versie nam blind eenheid 0 en
    las op /kantoorverhuizing/ de H2 van negen woorden als capsule: FAIL op een pagina die er
    een correcte van 58 woorden had. Erger nog was de andere kant: op de routes zonder eigen
    inhoud stond op plek 0 het GEDEELDE "waarom"-blok van 72 woorden, en dat werd tien keer als
    "de capsule" gerapporteerd. Deze eis mat dus nooit de capsule van de schrijver, in geen van
    beide richtingen. Kruimelpad, hero-lead en trustbalk vallen al af via de gedeelde-blok-
    uitsluiting; koppen moesten er apart uit.
    """
    o = t4b.Ontleder(); o.feed(html)
    for tekst, tag in zip(o.eenheden, o.eenheden_tags):
        if tag not in ("h2", "h3"):
            return tekst
    return ""


def vragen_van(html):
    hoofd = html.split("<main", 1)[-1].split("</main>")[0]
    uit = []
    for s in re.findall(r"<summary[^>]*>(.*?)</summary>", hoofd, re.S):
        tekst = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s)).strip()
        # de uitklapper van de dozencalculator in het gedeelde leadformulier is geen vraag
        if tekst and "hoeveel dozen ik nodig heb" not in tekst.lower():
            uit.append(tekst)
    return uit


def ijk():
    fouten = []
    def eis(n, ok, wat):
        (print(f"  ok   {n}: {wat}") if ok else (fouten.append(n), print(f"  DOOD {n}: {wat}")))

    a = ["de piano gaat via de takel naar buiten omdat het trappenhuis te smal is voor de vleugel",
         "onze vier verhuizers gebruiken een pianorolwagen met spanbanden en een dekenset per instrument"]
    b = ["het kantoor verhuist in fasen zodat de ict-ruimte als laatste leeg gaat en niemand stilstaat",
         "onze vier verhuizers gebruiken een pianorolwagen met spanbanden en een dekenset per instrument"]
    ga, gb = t4b.vijfgrammen(a), t4b.vijfgrammen(b)
    eis("jaccard-onder", t4b.jaccard(ga, gb) < DREMPEL_PAAR,
        f"half gedeelde tekst -> {t4b.jaccard(ga, gb):.3f}, onder {DREMPEL_PAAR}")
    eis("jaccard-boven", t4b.jaccard(ga, ga) > DREMPEL_PAAR, "identieke tekst -> 1.000, boven de drempel")

    gedeeld = collections.Counter(x for lijst in (a, b) for x in set(lijst))
    eigen = [u for u in a if gedeeld[u] == 1]
    eis("doelspecifiek", len(eigen) / len(a) == 0.5, f"1 van 2 eigen -> 50%, faalt de 75%-eis")
    eis("doelspecifiek-vol", all(collections.Counter(a)[u] == 1 for u in a),
        "een route met alleen eigen eenheden haalt 100%")
    # de afrondingsval: bij n=108 is 81 eigen exact 75% en dus genoeg, marge 0 en niet -1
    eis("marge-afronding", 81 - math.ceil(0.75 * 108) == 0 and 81 / 108 >= 0.75,
        "81 van 108 is precies 75%: PASS met marge 0, niet marge -1")
    eis("marge-echt-tekort", 80 - math.ceil(0.75 * 108) == -1 and 80 / 108 < 0.75,
        "80 van 108 is wel te weinig: marge -1 en FAIL, dus de marge kan negatief worden")

    html = ('<html><body><main><h1>Piano verhuizen</h1>'
            '<p>' + " ".join(["woord"] * 50) + '</p>'
            '<section class="leadblock"><p>' + " ".join(["gedeeld"] * 50) + '</p></section>'
            '<details><summary>Wat kost het?</summary></details>'
            '<details><summary>Ik weet nog niet hoeveel dozen ik nodig heb</summary></details>'
            '</main></body></html>')
    c = capsule(html)
    eis("capsule-lengte", len(c.split()) == 50, f"{len(c.split())} woorden gelezen")

    # de fout van 30-08: een H2 voor de capsule werd zelf als capsule gelezen
    met_kop = html.replace("<h1>Piano verhuizen</h1>",
                           "<h1>Piano verhuizen</h1><h2>Voor wie deze dienst bedoeld is hier</h2>")
    ck = capsule(met_kop)
    eis("capsule-slaat-kop-over", len(ck.split()) == 50 and "voor wie" not in ck,
        f"kop van 7 woorden ervoor -> leest nog steeds {len(ck.split())} woorden")
    o_kop = t4b.Ontleder(); o_kop.feed(met_kop)
    eis("kop-stond-er-echt-voor", o_kop.eenheden_tags[0] == "h2",
        "de ijkcase zet werkelijk een kop op plek 0, anders toetst hij niets")
    eis("capsule-niet-gedeeld", "gedeeld" not in c, "pakt niet het leadblock maar de eerste echte alinea")
    kort = capsule(html.replace(" ".join(["woord"] * 50), " ".join(["woord"] * 12)))
    eis("capsule-te-kort-valt-op", not (CAPSULE_MIN <= len(kort.split()) <= CAPSULE_MAX),
        f"{len(kort.split())} woorden valt buiten {CAPSULE_MIN}-{CAPSULE_MAX}")
    v = vragen_van(html)
    eis("vragen", v == ["Wat kost het?"], f"{v}; de dozencalculator-uitklapper telt niet mee")

    print("\nIJKING " + ("MISLUKT: " + ", ".join(fouten) if fouten else "GESLAAGD, elke eis kan afgaan"))
    return 1 if fouten else 0


def beoordeel(basis, alleen=None):
    d = json.loads((HIER / "t4-baseline.json").read_text())
    diensten = sorted(d["noindex_routes"])
    eenheden, htmls, vragen = {}, {}, {}
    for r in sorted(d["paginas"]):
        st, _, t, _ = t4b.haal(basis + r)
        htmls[r] = t
        o = t4b.Ontleder(); o.feed(t)
        eenheden[r] = o.eenheden
        vragen[r] = vragen_van(t)

    overal = collections.Counter(u for lijst in eenheden.values() for u in set(lijst))
    vragen_overal = collections.Counter(v for lijst in vragen.values() for v in set(lijst))
    grammen = {r: t4b.vijfgrammen(eenheden[r]) for r in diensten}

    print(f"{'route':<32}{'eenh':>5}{'eigen':>7}{'%':>7}{'capsule':>9}{'vragen':>8}  gate")
    uitslag = {}
    for r in diensten:
        if alleen and r != alleen:
            continue
        n = len(eenheden[r])
        eigen = sum(1 for u in eenheden[r] if overal[u] == 1)
        pct = eigen / n if n else 0
        cw = len(capsule(htmls[r]).split())
        eigen_vragen = sum(1 for v in vragen[r] if vragen_overal[v] == 1)
        ergste = max(((t4b.jaccard(grammen[r], grammen[x]), x) for x in diensten if x != r),
                     default=(0, "-"))
        redenen = []
        if pct < DREMPEL_EIGEN: redenen.append(f"doelspecifiek {pct:.0%} < 75%")
        if ergste[0] > DREMPEL_PAAR: redenen.append(f"gelijk aan {ergste[1]} op {ergste[0]:.2f}")
        if not (CAPSULE_MIN <= cw <= CAPSULE_MAX): redenen.append(f"capsule {cw} woorden")
        if not (3 <= eigen_vragen <= 5): redenen.append(f"{eigen_vragen} eigen vragen")
        # Hoeveel eenheden mag deze route nog verliezen voor hij onder de 75% zakt. Dit is geen
        # sier: de eis is een eigenschap van de VERZAMELING, niet van de pagina. Zodra een andere
        # route dezelfde zin krijgt, wordt hij op allebei niet-eigen en zakt deze route zonder dat
        # er iets aan veranderd is. Een PASS op een losse route is dus voorwaardelijk zolang de
        # overige tien nog geschreven worden.
        # ceil en niet int()+1: de eis is "minstens 75%", dus bij n=108 is 81 eigen precies
        # genoeg. De eerste versie rekende met int(0.75*n)+1 en gaf dan marge -1 naast een
        # terechte PASS, wat elkaar tegensprak. Alleen fout wanneer 0.75*n rond uitkomt, en
        # juist dat gebeurde op twee van de elf routes.
        marge = eigen - math.ceil(DREMPEL_EIGEN * n) if n else 0
        uitslag[r] = {"eenheden": n, "eigen": eigen, "pct": round(pct, 3), "capsule_woorden": cw,
                      "eigen_vragen": eigen_vragen, "ergste_paar": [ergste[1], round(ergste[0], 3)],
                      "marge_eenheden": marge,
                      "gate": "PASS" if not redenen else "FAIL", "redenen": redenen}
        vlag = (f"PASS (marge {marge} eenh.)" if not redenen else "FAIL: " + "; ".join(redenen))
        print(f"{r:<32}{n:>5}{eigen:>7}{pct:>6.0%}{cw:>9}{eigen_vragen:>8}  {vlag}")

    paren = [(t4b.jaccard(grammen[a], grammen[b]), a, b)
             for i, a in enumerate(diensten) for b in diensten[i + 1:]]
    boven = [p for p in paren if p[0] > DREMPEL_PAAR]
    print(f"\nserviceparen boven {DREMPEL_PAAR}: {len(boven)} van {len(paren)}")
    for j, a, b in sorted(boven, reverse=True)[:8]:
        print(f"   {j:.3f}  {a} <-> {b}")
    (HIER / "t4-dienstgate.json").write_text(json.dumps(
        {"uitslag": uitslag, "paren_boven_drempel": len(boven), "paren_totaal": len(paren)},
        indent=1, ensure_ascii=False))
    geslaagd = sum(1 for v in uitslag.values() if v["gate"] == "PASS")
    print(f"\n{geslaagd} van {len(uitslag)} diensten halen de meetbare eisen.")
    print("Niet gemeten en dus geen PASS: echtheid van de case, toestemming en anonimisering,")
    print("de inhoudelijke reviewer, en het oordeel over PQ en Needs Met.")
    print("LET OP: doelspecifiek is een eigenschap van de VERZAMELING. Een route die nu slaagt kan")
    print("zakken zodra een andere route dezelfde zin krijgt. Een losse PASS is voorwaardelijk tot")
    print("alle elf er staan; het eindoordeel gaat over de elf tegelijk.")
    return 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--basis", default="http://127.0.0.1:4740")
    ap.add_argument("--route"); ap.add_argument("--ijk", action="store_true")
    a = ap.parse_args()
    sys.exit(ijk() if a.ijk else beoordeel(a.basis.rstrip("/"), a.route))
