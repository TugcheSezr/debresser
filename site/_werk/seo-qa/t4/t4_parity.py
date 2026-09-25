#!/usr/bin/env python3
"""Parity-toets: is een refactor werkelijk output-neutraal?

    python3 _werk/seo-qa/t4/t4_parity.py            vergelijk huidige output met snapshot-voor.json
    python3 _werk/seo-qa/t4/t4_parity.py --ijk      ijking

Waarom niet alleen sha256: dat is de sterkste toets die er is, maar hij zegt alleen JA of NEE.
Slaat hij om, dan wil je meteen weten waarop. En er is een tweede reden. De elf servicepagina's
zijn woordelijk identiek op titel en H1 na (gemeten: Jaccard 1.000 over alle 55 paren). Een
generator die per ongeluk twee services verwisselt, levert dan twee routes op die allebei nog
geldig ogen. Daarom worden H1 en hero apart uitgelezen en per route vergeleken, inclusief de
DESKTOP-bron: wie alleen de mobiele <source> pakt, mist juist het beeld dat de bezoeker ziet.
"""
import argparse, hashlib, json, pathlib, re, subprocess, sys

SITE = pathlib.Path(__file__).resolve().parents[3]
SNAP = pathlib.Path(__file__).resolve().parent / "snapshot-voor.json"


def kenmerken(tekst):
    """De velden waarop een verwisseling zichtbaar wordt."""
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", tekst, re.S)
    titel = re.search(r"<title[^>]*>(.*?)</title>", tekst, re.S)
    # desktop: de <img> in de hero-picture. mobiel: de <source media="(max-width:760px)">.
    desktop = re.search(r'<picture class="hero__bg">.*?<img[^>]+src="([^"]+)"', tekst, re.S)
    mobiel = re.search(r'<picture class="hero__bg">.*?<source[^>]+srcset="([^"]+)"', tekst, re.S)
    alt = re.search(r'<picture class="hero__bg">.*?<img[^>]+alt="([^"]*)"', tekst, re.S)
    rob = re.search(r'<meta[^>]+name=["\']robots["\'][^>]*>', tekst, re.I)
    robw = ""
    if rob:
        c = re.search(r'content=["\']([^"\']*)["\']', rob.group(0), re.I)
        robw = c.group(1).strip().lower() if c else ""
    return {
        "h1": re.sub(r"<[^>]+>", "", h1.group(1)).strip() if h1 else None,
        "titel": titel.group(1).strip() if titel else None,
        "hero_desktop": desktop.group(1) if desktop else None,
        "hero_mobiel": mobiel.group(1) if mobiel else None,
        "hero_alt": alt.group(1) if alt else None,
        "robots": robw or None,
    }


def ijk():
    """Elke vergelijking draait op een moedwillige verwisseling en MOET omslaan."""
    fouten = []

    def eis(naam, ok, wat):
        (print(f"  ok   {naam}: {wat}") if ok else (fouten.append(naam), print(f"  DOOD {naam}: {wat}")))

    piano = ('<title>Piano verhuizen | X</title><meta name="robots" content="noindex, nofollow">'
             '<section class="hero"><picture class="hero__bg">'
             '<source media="(max-width:760px)" srcset="/assets/img/hero-pia-mobiel.webp">'
             '<img src="/assets/img/hero-pia-1920.webp" alt="Een piano"></picture>'
             '<h1 class="hero__title">Piano verhuizen</h1></section>')
    a = kenmerken(piano)
    eis("leest-h1", a["h1"] == "Piano verhuizen", f"h1={a['h1']!r}")
    eis("leest-desktop", a["hero_desktop"].endswith("hero-pia-1920.webp"), f"{a['hero_desktop']}")
    eis("leest-mobiel", a["hero_mobiel"].endswith("hero-pia-mobiel.webp"), f"{a['hero_mobiel']}")
    eis("leest-robots", a["robots"] == "noindex, nofollow", f"{a['robots']!r}")

    # de val waar T1 om vroeg: alleen de DESKTOP-plaat verwisselen. Mobiel blijft gelijk, dus
    # wie alleen <source> leest ziet niets.
    verwisseld = piano.replace('src="/assets/img/hero-pia-1920.webp"',
                               'src="/assets/img/hero-zor-1920.webp"')
    b = kenmerken(verwisseld)
    eis("vangt-desktopwissel", a["hero_desktop"] != b["hero_desktop"],
        "alleen de desktopplaat gewisseld -> verschil gezien")
    eis("mobiel-blijft-gelijk", a["hero_mobiel"] == b["hero_mobiel"],
        "en de mobiele bron was inderdaad ONgewijzigd, dus daarop alleen toetsen is blind")

    c = kenmerken(piano.replace("Piano verhuizen</h1>", "Zorgverhuizing</h1>"))
    eis("vangt-h1wissel", a["h1"] != c["h1"], "h1 gewisseld -> verschil gezien")
    d = kenmerken(piano.replace('content="noindex, nofollow"', 'content="index, follow"'))
    eis("vangt-robotswissel", a["robots"] != d["robots"], "robots gewisseld -> verschil gezien")
    e = kenmerken(piano)
    eis("geen-vals-alarm", a == e, "identieke invoer geeft GEEN verschil")

    print("\nIJKING " + ("MISLUKT: " + ", ".join(fouten) if fouten
                         else "GESLAAGD, alle vergelijkingen kunnen afgaan"))
    return 1 if fouten else 0


def voor_tekst(route, v, head):
    """De 'voor'-inhoud, bij voorkeur uit git want dat is buiten mijn eigen json om te
    controleren. Lukt dat niet (untracked bestand), dan alleen de werkboom EN alleen als de
    hash nog gelijk is aan de snapshot; anders weet ik niet wat ik lees."""
    b = subprocess.run(["git", "show", f"{head}:site/{v['bestand']}"],
                       capture_output=True, cwd=SITE.parent)
    if b.returncode == 0 and hashlib.sha256(b.stdout).hexdigest() == v["sha256"]:
        return b.stdout.decode("utf-8", "replace"), "git"
    p = SITE / v["bestand"]
    if p.exists() and hashlib.sha256(p.read_bytes()).hexdigest() == v["sha256"]:
        return p.read_text(encoding="utf-8", errors="replace"), "werkboom-ongewijzigd"
    return None, "GEEN BETROUWBARE VOOR-TEKST"


def toets():
    snap = json.loads(SNAP.read_text())
    head = snap["git_head"]
    afwijkend, onmeetbaar, gelijk = [], [], 0
    nu_noindex = 0
    for route, v in sorted(snap["routes"].items()):
        p = SITE / v["bestand"]
        if not p.exists():
            afwijkend.append((route, "ROUTE VERDWENEN", "-", "-")); continue
        na_rauw = p.read_bytes()
        na_hash = hashlib.sha256(na_rauw).hexdigest()
        na = kenmerken(na_rauw.decode("utf-8", "replace"))
        if na["robots"] and "noindex" in na["robots"]:
            nu_noindex += 1
        if na_hash == v["sha256"]:
            gelijk += 1
            continue
        vt, herkomst = voor_tekst(route, v, head)
        if vt is None:
            onmeetbaar.append((route, herkomst)); continue
        vo = kenmerken(vt)
        verschillen = [f"{k}: {vo[k]!r} -> {na[k]!r}" for k in vo if vo[k] != na[k]]
        afwijkend.append((route, "sha256 anders", ", ".join(verschillen) or
                          "GEEN verschil in h1/titel/hero/robots, dus elders in het document",
                          f"{v['bytes']} -> {len(na_rauw)} bytes"))

    # nieuwe routes die er in de snapshot nog niet waren
    nu = {("/" if str(q.relative_to(SITE).parent) == "." else "/" + str(q.relative_to(SITE).parent) + "/")
          for q in SITE.rglob("index.html") if "_werk" not in q.parts}
    nieuw = sorted(nu - set(snap["routes"]))

    print(f"snapshot 'voor': {snap['genomen_op']}  HEAD {head[:8]}  BUSTER {snap['buster']}")
    print(f"routes vergeleken : {len(snap['routes'])}")
    print(f"  sha256 gelijk   : {gelijk}")
    print(f"  sha256 anders   : {len(afwijkend)}")
    print(f"  niet te toetsen : {len(onmeetbaar)}")
    print(f"  nieuwe routes   : {len(nieuw)} {nieuw if nieuw else ''}")
    print(f"noindex voor {snap['aantal_noindex']}  ->  nu {nu_noindex}")
    for r, wat, det, *rest in afwijkend:
        print(f"\n  AFWIJKING {r}\n    {wat} {rest[0] if rest else ''}\n    {det}")
    for r, w in onmeetbaar:
        print(f"\n  NIET TE TOETSEN {r}: {w}")
    schoon = not afwijkend and not onmeetbaar and nu_noindex == snap["aantal_noindex"] and not nieuw
    print("\nPARITY: " + ("PASS, nul outputdelta" if schoon else "FAIL, zie hierboven"))
    return 0 if schoon else 1


if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--ijk", action="store_true")
    sys.exit(ijk() if ap.parse_args().ijk else toets())
