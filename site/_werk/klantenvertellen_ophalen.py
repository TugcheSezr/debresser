#!/usr/bin/env python3
"""Haalt ALLE reviews van het Klantenvertellen-profiel 1034282 (De Kievit Verhuizingen Top Movers) op en schrijft
ze letterlijk naar site/_werk/klantenvertellen-reviews-<datum>.json, in het schema dat blok_klantervaringen.py leest
(naam, plaats, datum, cijfer, titel, tekst) plus id en beveelt_aan.

De profielpagina pagineert met ?lang=nl&limit=25&pageNumber=N, N vanaf 0 (nieuwste eerst); voorbij de laatste
pagina begint hij weer bij 0, vandaar de stop op "geen nieuwe id's". Per pagina staan de 25 reviews twee keer: als
schema.org Review in de ld+json (auteur, datum, kop, tekst met regeleinden, cijfer) en als HTML-kaart met
data-review-id (daarin ook de woonplaats en "Beveelt aan"). Beide worden gelezen en op volgorde gekoppeld; wijkt
naam of cijfer af, dan stopt het script. Niets wordt herschreven.
Draaien vanuit de repo-root: python3 site/_werk/klantenvertellen_ophalen.py [--uit pad.json]"""
import html, json, re, sys, time, urllib.request
from datetime import date
from pathlib import Path

WERK = Path(__file__).resolve().parent
LOC = 1034282
BRON = f"https://www.klantenvertellen.nl/reviews/{LOC}/erkende_verhuizer_de_kievit_verhuizingen_top+movers"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"


def haal(pagina):
    req = urllib.request.Request(f"{BRON}?lang=nl&limit=25&pageNumber={pagina}", headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")


def ld_reviews(s):
    uit = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        d = json.loads(m.group(1))
        def walk(o):
            if isinstance(o, dict):
                if o.get("@type") == "Review":
                    uit.append(o)
                for v in o.values():
                    walk(v)
            elif isinstance(o, list):
                for v in o:
                    walk(v)
        walk(d)
    return uit


def html_kaarten(s):
    s = re.sub(r"<svg.*?</svg>", "", s, flags=re.S)
    # ids zijn uuid's (2025-2026) of KV1-<nummer> (ouder); alles behalve een aanhalingsteken
    delen = re.split(r'<div id="review-([^"]+)" data-review-id="\1"', s)
    uit = []
    for i in range(1, len(delen), 2):
        rid, blok = delen[i], delen[i + 1]
        blok = blok.split('<div id="review-', 1)[0]
        cijfer = re.search(r'font-bold text-white"[^>]*>(\d+)</span>', blok)
        naam = re.search(r'<div class="text-xs font-bold"><p>(.*?)</p>', blok, re.S)
        plaats = re.search(r'<div class="text-xs font-light"><p>(.*?)</p>', blok, re.S)
        uit.append(dict(id=rid, cijfer=int(cijfer.group(1)) if cijfer else None,
                        naam=html.unescape(naam.group(1)).strip() if naam else "",
                        plaats=html.unescape(plaats.group(1)).strip() if plaats else "",
                        beveelt_aan="Beveelt aan" in blok))
    return uit


def profiel(s):
    m = re.search(r'"aggregateRating":\{"@type":"AggregateRating","ratingValue":([\d.]+),"reviewCount":(\d+)', s)
    return dict(cijfer=m.group(1).replace(".", ","), beoordelingen=int(m.group(2))) if m else {}


def main():
    uit = WERK / f"klantenvertellen-reviews-{date.today():%Y%m%d}.json"
    if "--uit" in sys.argv:
        uit = Path(sys.argv[sys.argv.index("--uit") + 1])
    alle, gezien, prof = [], set(), {}
    for p in range(0, 200):
        s = haal(p)
        if not prof:
            prof = profiel(s)
        ld, kaarten = ld_reviews(s), html_kaarten(s)
        if not ld:
            break
        if len(ld) != len(kaarten):
            sys.exit(f"pagina {p}: {len(ld)} ld+json-reviews tegen {len(kaarten)} HTML-kaarten")
        nieuw = 0
        for r, k in zip(ld, kaarten):
            if r["author"]["name"].strip() != k["naam"] or int(r["reviewRating"]["ratingValue"]) != k["cijfer"]:
                sys.exit(f"pagina {p}: ld+json en HTML lopen uit elkaar bij {r['author']['name']!r} / {k['naam']!r}")
            if k["id"] in gezien:
                continue
            gezien.add(k["id"]); nieuw += 1
            alle.append(dict(id=k["id"], naam=k["naam"], plaats=k["plaats"], datum=r["datePublished"][:10],
                             cijfer=k["cijfer"], titel=r.get("headline", "").strip(), tekst=r.get("reviewBody", ""),
                             beveelt_aan=k["beveelt_aan"]))
        print(f"pagina {p}: {len(ld)} reviews, {nieuw} nieuw, totaal {len(alle)}", flush=True)
        if nieuw == 0 or len(ld) < 25:
            break
        time.sleep(0.4)
    data = dict(bron=BRON, opgehaald=f"{date.today():%Y-%m-%d}", profiel=prof, reviews=alle)
    uit.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(alle)} reviews naar {uit}; profiel {prof}")


if __name__ == "__main__":
    main()
