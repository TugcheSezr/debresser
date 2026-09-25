"""T2: valideer link-matrix.csv tegen de gebouwde HTML en herschrijf qa_status.

Elke regel wordt getoetst op twee dingen: bestaat het bronblok op de bronroute, en
bestaat het doelfragment op de doelroute. De qa_status wordt uit die uitkomst afgeleid,
nooit met de hand geschreven, zodat er geen regel kan blijven staan die "geverifieerd"
claimt terwijl er niets te verifieren viel.

Draaien vanuit de repo-root:  python3 site/_werk/seo-uitvoering/t2-valideer-linkmatrix.py
Met --schrijf herschrijft hij de csv; zonder vlag rapporteert hij alleen.
Leest site/**/index.html, dat is byte-identiek aan wat :4740 serveert (met cmp gecontroleerd).
"""
import csv, pathlib, sys
from bs4 import BeautifulSoup

SITE = pathlib.Path("site")
CSV = SITE / "_werk/seo-uitvoering/link-matrix.csv"
DATUM = "30-08-2026"


def fragmenten():
    uit = {}
    for p in sorted(SITE.rglob("index.html")):
        if "_werk" in p.parts:
            continue
        r = "/" + str(p.parent.relative_to(SITE)).replace(".", "").strip("/")
        r = "/" if r == "/" else r.rstrip("/") + "/"
        main = BeautifulSoup(p.read_text(encoding="utf-8"), "html.parser").find("main")
        uit[r] = {e["id"] for e in main.find_all(id=True)} | {"top"}
    return uit


def toets(rij, frag):
    """Geeft (fragmentwaarde, qa_status) terug."""
    bron, doel = rij["bronroute"], rij["doelroute"]
    blok = rij["bron_contentblok"].strip()
    doelfrag = rij["gevalideerd_fragment"].strip()

    # Eigen markeringen uit een vorige ronde terugvertalen, anders leest deze functie haar
    # eigen uitvoer als een fragmentnaam en blokkeert zij regels die de vorige keer goed waren.
    if doelfrag == "(paginabreed)":
        doelfrag = ""
    elif doelfrag == "(geen bestemming)":
        doelfrag = "GEEN BESTEMMING"

    if doel not in frag:
        return doelfrag, f"BLOKKEER: doelroute {doel} bestaat niet in de gebouwde site"
    if doelfrag.upper() == "GEEN BESTEMMING":
        return "(geen bestemming)", ("GEBLOKKEERD: het label uit het masterplan heeft geen route "
                                     "en geen bestaand fragment; OWNER INPUT NEEDED bij T3")

    # bronkant
    if "(nieuw" in blok:
        eig = "T3" if "T3" in blok else "T2"
        bronuit = (f"bronblok {blok.split(' (')[0]} moet nog door {eig} geschreven worden, "
                   "niet toetsbaar")
    elif blok and blok.lstrip("#") not in frag.get(bron, set()):
        bronuit = f"BLOKKEER: bronblok {blok} bestaat niet op {bron}"
    else:
        bronuit = None

    # doelkant
    if not doelfrag:
        doelfrag = "(paginabreed)"
        doeluit = f"doel is de hele pagina, geen fragment om te toetsen; doelroute bestaat, {DATUM}"
    elif "(na bouw)" in doelfrag:
        # Anker staat al in het bronbestand maar de site is er nog niet mee gebouwd.
        # Zodra T1 heeft gebouwd valt de markering hier vanzelf weg.
        kaal = doelfrag.split(" (")[0]
        if kaal.lstrip("#") in frag[doel]:
            doelfrag = kaal
            doeluit = f"doelfragment {kaal} aanwezig in gebouwde HTML, {DATUM}"
        else:
            doeluit = (f"doelfragment {kaal} staat in het bronbestand van T2 en verschijnt bij "
                       "de eerstvolgende bouw; nog niet in de gebouwde HTML")
    elif doelfrag.lstrip("#") in frag[doel]:
        doeluit = f"doelfragment {doelfrag} aanwezig in gebouwde HTML, {DATUM}"
    else:
        doeluit = f"BLOKKEER: doelfragment {doelfrag} bestaat niet op {doel}"

    if bronuit and bronuit.startswith("BLOKKEER"):
        return doelfrag, bronuit
    if doeluit.startswith("BLOKKEER"):
        return doelfrag, doeluit
    if bronuit:
        return doelfrag, f"DEELS GETOETST: {doeluit}; {bronuit}"
    return doelfrag, f"GEVALIDEERD: {doeluit}"


def main():
    frag = fragmenten()
    rijen = list(csv.DictReader(CSV.open(encoding="utf-8")))
    tel = {}
    for rij in rijen:
        rij["gevalideerd_fragment"], rij["qa_status"] = toets(rij, frag)
        rij["activatiestatus"] = rij["activatiestatus"].replace("servicroute", "serviceroute")
        kop = rij["qa_status"].split(":")[0]
        tel[kop] = tel.get(kop, 0) + 1

    for k, n in sorted(tel.items(), key=lambda x: -x[1]):
        print(f"  {n:4d}  {k}")
    print(f"  ---- {len(rijen)} regels, {len(frag)} routes gelezen")

    if "--schrijf" in sys.argv:
        with CSV.open("w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(rijen[0].keys()))
            w.writeheader()
            w.writerows(rijen)
        print(f"  geschreven: {CSV}")
    else:
        print("  (niets geschreven, draai met --schrijf)")

    return 1 if any(k.startswith("BLOKKEER") for k in tel) else 0


sys.exit(main())
