#!/usr/bin/env python3
"""T4-baseline De Kievit. Onafhankelijk gebouwd en onafhankelijk geijkt.

    python3 _werk/seo-qa/t4/t4_baseline.py            meet 127.0.0.1:4740 -> t4-baseline.json
    python3 _werk/seo-qa/t4/t4_baseline.py --basis U  andere host
    python3 _werk/seo-qa/t4/t4_baseline.py --ijk      ijking, meet niets

Waarom niet het bestaande gereedschap:
`_werk/verify_http.py` heeft de 34 routes HARD IN DE LIJST staan. Wie daarmee telt, bevestigt
de lijst van T1 per constructie: een route die T1 vergeten is, ontbreekt dan ook in de controle
en valt nooit op. Hier komen de routes daarom uit drie bronnen die niets van elkaar weten:
het bestandssysteem, een link-crawl vanaf "/", en de lijst die navigatie.py zelf uitspreekt.
Lopen die uiteen, dan is het verschil de bevinding. Ik kies er dan geen van drie.

Meten gebeurt op de dev-server, en die is Vercel niet. Wat hier NIET bewezen kan worden:
redirects, voorkeursdomein, 404-afhandeling, X-Robots-Tag, HTTPS en trailing-slashbeleid.
`_werk/devserver.py` is een kale SimpleHTTPRequestHandler met een gzip-laag; hij verzint geen
redirect en heeft geen 404-pagina. Die punten staan in het rapport als NIET MEETBAAR en niet
als PASS, want een groene meting op de verkeerde machine is geen bewijs.
"""
import argparse, gzip, hashlib, json, pathlib, re, sys, time, urllib.error, urllib.request
from html.parser import HTMLParser

SITE = pathlib.Path(__file__).resolve().parents[3]          # .../site
UIT = pathlib.Path(__file__).resolve().parent


# ------------------------------------------------------------------ ophalen
def haal(url, methode="GET"):
    """(status, headers, tekst, ruwe bytes). -1 = verbindingsfout, uitdrukkelijk geen 404."""
    req = urllib.request.Request(url, method=methode,
                                 headers={"Accept-Encoding": "gzip", "User-Agent": "T4-baseline"})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            rauw = r.read()
            tekst = (gzip.decompress(rauw) if r.headers.get("Content-Encoding") == "gzip" else rauw)
            return r.status, dict(r.headers), tekst.decode("utf-8", "replace"), len(rauw)
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), "", 0
    except Exception as e:
        return -1, {"fout": str(e)}, "", 0


# ------------------------------------------------------------------ ontleden
WOORD = re.compile(r"[a-z0-9à-ÿ]+")
LEEG = {"br", "img", "input", "meta", "link", "hr", "source", "use", "path", "rect", "area",
        "col", "embed", "track", "wbr", "circle", "polygon", "line", "stop", "ellipse", "base"}
# Blokken die op elke route woordelijk gelijk zijn. Wie die meetelt, meet de wrapper en niet
# de pagina: elke servicepagina lijkt dan vanzelf op elke andere.
GEDEELD = ("trust", "leadblock", "offerte-overlay", "of-form", "of-trust", "lf", "lfcalc",
           "footer", "topbar", "drawer", "pk__kruim", "skiplink")


def gedeeld_blok(cls):
    """Waar of de class-lijst bij een gedeeld blok hoort.

    Matcht op HELE class-namen plus hun BEM-kinderen (`lf__field`, `footer__legal`), niet op
    losse substring. Dat scheelt precies een stille meetfout: met een kale `"lf" in cls` valt
    ook `zelfstandig`, `halfvol` of `zelfde` weg, en die tekst verdwijnt dan geruisloos uit de
    inhoudsmeting terwijl hij gewoon pagina-eigen is. Op deze site is het toevallig ongevaarlijk
    (alles met `lf` erin is hier BEM-kind van het leadformulier), maar het is een val die pas
    afgaat als iemand later een onschuldige klasse toevoegt, en dan valt hij niet op."""
    for tok in cls.split():
        for g in GEDEELD:
            if tok == g or tok.startswith(g + "__") or tok.startswith(g + "--"):
                return True
    return False


def genormaliseerd(s):
    return " ".join(WOORD.findall(s.lower()))


class Ontleder(HTMLParser):
    """Haalt uit een pagina wat een SEO-baseline nodig heeft.

    Twee dingen bewust anders dan een naieve parser:
    - ALLE meta-robots en ALLE canonicals worden bewaard, niet de eerste. Twee tegenstrijdige
      robots-tags is een echte fout die je nooit ziet als je stopt bij de eerste treffer.
    - Inhoudseenheden worden alleen binnen <main> geteld en niet binnen een gedeeld blok,
      script of style. Zonder die uitsluiting meet duplicatie de huisstijl.
    """

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stapel = []                 # [(tag, uitgesloten)]
        self.lang = None
        self.titel = None
        self.beschrijving = None
        self.robots = []
        self.canonical = []
        self.og = {}
        self.viewport = None
        self.jsonld = []
        self.koppen = []                 # (niveau, tekst)
        self.links = []                  # (href, anker, in_main)
        self.assets = []
        self.formulieren = []
        self.eenheden = []               # genormaliseerde tekst van H2/H3/P/LI/SUMMARY in main
        self.eenheden_tags = []          # het tag per eenheid, zelfde volgorde; nodig om een kop
                                         # van een alinea te onderscheiden zonder opnieuw te parsen
        self._buf = None                 # (tag, [stukjes]) van de lopende eenheid
        self._script = None
        self._titelbuf = None

    # -- hulp
    def _in_main(self):
        return any(t == "main" for t, _ in self.stapel)

    def _uitgesloten(self):
        return any(u for _, u in self.stapel)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "") or ""
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "meta":
            naam = (a.get("name") or "").lower()
            prop = (a.get("property") or "").lower()
            inh = (a.get("content") or "").strip()
            if naam == "robots":
                self.robots.append(inh.lower())
            elif naam == "description":
                if self.beschrijving is None:
                    self.beschrijving = inh
            elif naam == "viewport":
                self.viewport = inh
            elif prop.startswith("og:") or naam.startswith("twitter:"):
                self.og[prop or naam] = inh
        elif tag == "link":
            rel = (a.get("rel") or "").lower()
            if "canonical" in rel:
                self.canonical.append(a.get("href", ""))
            # preload/prefetch/icon tellen mee: het zijn echte requests die de bezoeker maakt.
            # Alleen op <link rel=stylesheet> filteren laat de voorgeladen fonts buiten beeld,
            # en juist die zijn LCP-relevant.
            if a.get("href") and any(k in rel for k in ("stylesheet", "preload", "prefetch", "icon")):
                self.assets.append(a["href"])
        elif tag == "script":
            if (a.get("type") or "").lower() == "application/ld+json":
                self._script = []
            if a.get("src"):
                self.assets.append(a["src"])
        elif tag == "title":
            self._titelbuf = []
        elif tag in ("img", "source"):
            # ALLE srcset-kandidaten, niet alleen de eerste. Een kapotte 1920w-variant valt
            # anders nooit op, terwijl dat juist de plaat is die een desktopbezoeker krijgt.
            if a.get("src"):
                self.assets.append(a["src"])
            for kandidaat in (a.get("srcset") or "").split(","):
                kandidaat = kandidaat.strip().split(" ")[0]
                if kandidaat:
                    self.assets.append(kandidaat)
        elif tag == "a" and a.get("href"):
            self.links.append([a["href"], "", self._in_main()])
        elif tag == "form":
            self.formulieren.append({"id": a.get("id"), "action": a.get("action"),
                                     "method": (a.get("method") or "get").lower()})
        elif tag in ("h1", "h2", "h3", "h4"):
            self.koppen.append([int(tag[1]), ""])

        uitgesloten = (tag in ("nav", "form", "footer", "header", "script", "style", "template",
                               "svg", "noscript")
                       or gedeeld_blok(cls))
        if tag not in LEEG:
            self.stapel.append((tag, uitgesloten))
        if tag in ("h2", "h3", "p", "li", "summary") and self._in_main() and not self._uitgesloten():
            self._buf = [tag, []]

    def handle_endtag(self, tag):
        if tag == "title":
            self.titel = "".join(self._titelbuf or []).strip()
            self._titelbuf = None
        if tag == "script" and self._script is not None:
            self.jsonld.append("".join(self._script))
            self._script = None
        if self._buf and tag == self._buf[0]:
            tekst = genormaliseerd(" ".join(self._buf[1]))
            if len(tekst.split()) >= 6:
                self.eenheden.append(tekst)
                self.eenheden_tags.append(self._buf[0])
            self._buf = None
        if tag in LEEG:
            return
        for i in range(len(self.stapel) - 1, -1, -1):
            if self.stapel[i][0] == tag:
                del self.stapel[i:]
                break

    def handle_data(self, d):
        if self._titelbuf is not None:
            self._titelbuf.append(d)
        if self._script is not None:
            self._script.append(d)
        if self._buf is not None:
            self._buf[1].append(d)
        if self.koppen and self.stapel and self.stapel[-1][0] in ("h1", "h2", "h3", "h4"):
            self.koppen[-1][1] += d
        if self.links and self.stapel and any(t == "a" for t, _ in self.stapel):
            self.links[-1][1] += d


# ------------------------------------------------------------------ routes
def routes_bestandssysteem():
    uit = {}
    for p in sorted(SITE.rglob("index.html")):
        if "_werk" in p.parts:
            continue
        r = str(p.relative_to(SITE).parent)
        uit["/" if r == "." else "/" + r + "/"] = str(p.relative_to(SITE))
    return uit


def routes_navigatie():
    """Wat navigatie.py zelf zegt te bouwen. Een claim, geen bron."""
    try:
        bron = (SITE / "_werk/navigatie.py").read_text()
    except OSError:
        return set()
    return {m if m.endswith("/") else m + "/"
            for m in re.findall(r'["\'](/[a-z0-9\-/]*/)["\']', bron)}


def intern(href):
    """Interne routes alleen. Geen mailto/tel/http/#, geen bestand met extensie."""
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:", "http://", "https://",
                                    "//", "data:")):
        return None
    pad = href.split("#")[0].split("?")[0]
    if not pad.startswith("/") or re.search(r"\.[a-z0-9]{2,5}$", pad, re.I):
        return None
    return pad if pad.endswith("/") else pad + "/"


def linkcrawl(basis):
    gezien, wachtrij, kapot = {}, ["/"], []
    while wachtrij:
        pad = wachtrij.pop(0)
        if pad in gezien:
            continue
        st, _, tekst, _ = haal(basis + pad)
        gezien[pad] = st
        if st != 200:
            kapot.append(pad)
            continue
        o = Ontleder(); o.feed(tekst)
        for href, _, _ in o.links:
            r = intern(href)
            if r and r not in gezien:
                wachtrij.append(r)
    return gezien, kapot


# ------------------------------------------------------------------ duplicatie
def vijfgrammen(eenheden):
    w = " ".join(eenheden).split()
    return {tuple(w[i:i + 5]) for i in range(max(0, len(w) - 4))}


def jaccard(a, b):
    return len(a & b) / len(a | b) if (a or b) else 0.0


# ------------------------------------------------------------------ ijking
def ijk():
    """Elke controle draait op moedwillig kapotte invoer en MOET omslaan.

    Een controle die niets kan vinden bewijst niets. Dit is geen unittest van de parser maar
    het bewijs dat de assertie in het rapport uberhaupt kan afgaan.
    """
    fouten = []

    def eis(naam, voorwaarde, wat):
        (print(f"  ok   {naam}: {wat}") if voorwaarde
         else (fouten.append(naam), print(f"  DOOD {naam}: {wat}")))

    goed = ('<html lang="nl"><head><title>T</title><meta name="description" content="D">'
            '<meta name="robots" content="index,follow"><link rel="canonical" href="/x/">'
            '<script type="application/ld+json">{"@type":"X"}</script></head><body>'
            '<main><h1>Kop</h1><p>Dit is een echte alinea met ruim voldoende woorden erin.</p>'
            '<nav><a href="/weg/">weg</a></nav>'
            '<section class="leadblock"><p>Deze gedeelde tekst mag niet meetellen hier.</p></section>'
            '</main><footer><p>Voettekst met genoeg woorden om mee te tellen anders.</p></footer>'
            '</body></html>')
    o = Ontleder(); o.feed(goed)
    eis("lang", o.lang == "nl", f"leest lang={o.lang!r}")
    eis("titel", o.titel == "T", f"leest titel={o.titel!r}")
    eis("robots", o.robots == ["index,follow"], f"leest {o.robots}")
    eis("canonical", o.canonical == ["/x/"], f"leest {o.canonical}")
    eis("jsonld", len(o.jsonld) == 1, f"{len(o.jsonld)} blok")

    # de kern: gedeelde blokken, nav en footer mogen GEEN inhoudseenheid worden
    eis("eenheid-main", any("echte alinea" in e for e in o.eenheden), "alinea in main telt mee")
    eis("uitsluiting-leadblock", not any("gedeelde tekst" in e for e in o.eenheden),
        "leadblock telt niet mee")
    eis("uitsluiting-footer", not any("voettekst" in e for e in o.eenheden), "footer telt niet mee")

    # tweede robots-tag moet zichtbaar worden, niet weggeslikt
    o2 = Ontleder(); o2.feed(goed.replace("</head>", '<meta name="robots" content="noindex"></head>'))
    eis("dubbele-robots", len(o2.robots) == 2, f"ziet er {len(o2.robots)}")

    # ontbrekende zaken moeten leeg terugkomen en niet stilletjes de vorige waarde houden
    o3 = Ontleder(); o3.feed("<html><body><main><p>kaal</p></main></body></html>")
    eis("geen-titel", o3.titel is None and not o3.robots and not o3.canonical,
        "lege pagina levert None/[] op")

    # uitsluiting mag alleen hele class-namen en BEM-kinderen pakken, geen losse substring
    eis("bem-kind", gedeeld_blok("lf__field") and gedeeld_blok("footer__legal"),
        "lf__field en footer__legal gelden als gedeeld")
    eis("geen-substring", not gedeeld_blok("zelfstandig") and not gedeeld_blok("halfvol")
        and not gedeeld_blok("sectie--creme2"),
        "zelfstandig, halfvol en sectie--creme2 blijven pagina-eigen")
    o4 = Ontleder(); o4.feed('<html><body><main><p class="zelfstandig">Een zelfstandig blok met '
                             'ruim genoeg woorden erin om mee te tellen.</p></main></body></html>')
    eis("substring-val", len(o4.eenheden) == 1, "alinea met class zelfstandig telt gewoon mee")

    # intern() moet extern en bestanden weigeren
    eis("intern-filter",
        intern("/a/") == "/a/" and intern("https://x.nl/") is None
        and intern("/a.css") is None and intern("#top") is None and intern("/b") == "/b/",
        "extern, bestand en anker vallen af; /b krijgt slash")

    # jaccard moet echt onderscheiden
    a, b = vijfgrammen(["de kat zat op de mat en keek naar buiten heel lang"]), None
    b = vijfgrammen(["een hond liep door het park en blafte naar een vogel daar"])
    eis("jaccard-verschil", jaccard(a, b) < 0.05, f"ongelijke tekst -> {jaccard(a, b):.3f}")
    eis("jaccard-gelijk", jaccard(a, a) == 1.0, "identieke tekst -> 1.000")

    print("\nIJKING " + ("MISLUKT: " + ", ".join(fouten) if fouten else "GESLAAGD, alle controles kunnen afgaan"))
    return 1 if fouten else 0


# ------------------------------------------------------------------ meten
def meet(basis):
    t0 = time.time()
    fs = routes_bestandssysteem()
    crawl, kapot_in_crawl = linkcrawl(basis)
    nav = routes_navigatie()

    paginas = {}
    alle_assets = {}
    for route in sorted(set(fs) | set(crawl)):
        st, kop, tekst, n = haal(basis + route)
        p = {"status": st, "bytes_over_de_lijn": n, "bron_fs": route in fs,
             "bron_crawl": route in crawl}
        if st == 200 and tekst:
            o = Ontleder(); o.feed(tekst)
            uitgaand = [intern(h) for h, _, _ in o.links]
            p.update({
                "titel": o.titel, "titel_lengte": len(o.titel or ""),
                "beschrijving": o.beschrijving,
                "meta_robots": o.robots, "canonical": o.canonical,
                "lang": o.lang, "viewport": o.viewport,
                "og_aantal": len(o.og),
                "jsonld_blokken": len(o.jsonld),
                "jsonld_typen": [],
                "h1": [k[1].strip() for k in o.koppen if k[0] == 1],
                "koppen_totaal": len(o.koppen),
                "links_totaal": len(o.links),
                "links_intern": sorted({u for u in uitgaand if u}),
                "links_intern_in_main": sorted({intern(h) for h, _, m in o.links if m and intern(h)}),
                "formulieren": o.formulieren,
                "inhoudseenheden": len(o.eenheden),
                "_eenheden": o.eenheden,
                "sha256": hashlib.sha256(tekst.encode()).hexdigest(),
            })
            for blok in o.jsonld:
                try:
                    d = json.loads(blok)
                except Exception:
                    p["jsonld_typen"].append("ONPARSEBAAR")
                    continue
                for item in (d if isinstance(d, list) else [d]):
                    if isinstance(item, dict):
                        p["jsonld_typen"].append(item.get("@type", "GEEN-@type"))
                        for sub in item.get("@graph", []) or []:
                            if isinstance(sub, dict):
                                p["jsonld_typen"].append("graph:" + str(sub.get("@type")))
            for a in o.assets:
                if a.startswith("/"):
                    alle_assets.setdefault(a.split("?")[0], set()).add(route)
        paginas[route] = p

    # assets een keer per uniek pad
    assets = {}
    for a in sorted(alle_assets):
        st, _, _, n = haal(basis + a, "GET")
        assets[a] = {"status": st, "bytes": n, "gebruikt_op": len(alle_assets[a])}

    # losse probes: dit zijn de dingen die op Vercel anders zullen zijn
    probes = {}
    for pad in ("/robots.txt", "/sitemap.xml", "/llms.txt", "/favicon.ico",
                "/deze-route-bestaat-niet-t4/", "/contact", "/CONTACT/"):
        st, kop, _, _ = haal(basis + pad)
        probes[pad] = {"status": st, "x_robots_tag": kop.get("X-Robots-Tag")}

    # linkgraaf
    inkomend = {r: set() for r in paginas}
    for r, p in paginas.items():
        for doel in p.get("links_intern", []):
            if doel in inkomend:
                inkomend[doel].add(r)
    dood = sorted({d for p in paginas.values() for d in p.get("links_intern", [])
                   if d not in paginas})
    wezen = sorted(r for r, bron in inkomend.items()
                   if not (bron - {r}) and r != "/" and paginas[r].get("status") == 200)

    # duplicatie op zichtbare main-inhoud
    grammen = {r: vijfgrammen(p["_eenheden"]) for r, p in paginas.items() if p.get("_eenheden")}
    paren = []
    sleutels = sorted(grammen)
    for i, a in enumerate(sleutels):
        for b in sleutels[i + 1:]:
            j = jaccard(grammen[a], grammen[b])
            if j >= 0.30:
                paren.append({"a": a, "b": b, "jaccard": round(j, 3)})
    paren.sort(key=lambda x: -x["jaccard"])

    for p in paginas.values():
        p.pop("_eenheden", None)

    tweehonderd = {r for r, p in paginas.items() if p["status"] == 200}
    noindex = sorted(r for r in tweehonderd
                     if any("noindex" in x for x in paginas[r].get("meta_robots", [])))
    return {
        "basis": basis, "gemeten_op": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "duur_s": round(time.time() - t0, 1),
        "telling": {
            "routes_totaal": len(paginas),
            "routes_bestandssysteem": len(fs),
            "routes_linkcrawl": len(crawl),
            "status_200": len(tweehonderd),
            "noindex": len(noindex),
            "indexeerbaar": len(tweehonderd) - len(noindex),
            "met_canonical": sum(1 for p in paginas.values() if p.get("canonical")),
            "met_description": sum(1 for p in paginas.values() if p.get("beschrijving")),
            "met_jsonld": sum(1 for p in paginas.values() if p.get("jsonld_blokken")),
            "assets_uniek": len(assets),
            "assets_kapot": sum(1 for a in assets.values() if a["status"] != 200),
        },
        "verschil_fs_crawl": {
            "alleen_op_schijf": sorted(set(fs) - set(crawl)),
            "alleen_in_crawl": sorted(set(crawl) - set(fs)),
        },
        "verschil_navigatie": {
            "navigatie_noemt_maar_bestaat_niet": sorted(nav - set(fs) - {"/"}),
        },
        "noindex_routes": noindex,
        "dode_interne_links": dood,
        "wezen": wezen,
        "kapot_in_crawl": kapot_in_crawl,
        "duplicatie_paren_vanaf_0.30": paren,
        "probes": probes,
        "assets": assets,
        "paginas": paginas,
    }


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--basis", default="http://127.0.0.1:4740")
    ap.add_argument("--ijk", action="store_true")
    ap.add_argument("--uit", default=str(UIT / "t4-baseline.json"))
    arg = ap.parse_args()
    if arg.ijk:
        sys.exit(ijk())
    d = meet(arg.basis.rstrip("/"))
    pathlib.Path(arg.uit).write_text(json.dumps(d, indent=1, ensure_ascii=False))
    t = d["telling"]
    print(f"{t['routes_200']  if 'routes_200' in t else t['status_200']} routes 200 van "
          f"{t['routes_totaal']} | noindex {t['noindex']} | indexeerbaar {t['indexeerbaar']}")
    print(f"canonical {t['met_canonical']} | description {t['met_description']} | "
          f"json-ld {t['met_jsonld']} | assets {t['assets_uniek']} ({t['assets_kapot']} kapot)")
    print(f"fs={t['routes_bestandssysteem']} crawl={t['routes_linkcrawl']} "
          f"alleen-op-schijf={d['verschil_fs_crawl']['alleen_op_schijf']}")
    print(f"dode links {len(d['dode_interne_links'])} | wezen {len(d['wezen'])} | "
          f"duplicatieparen>=0.30 {len(d['duplicatie_paren_vanaf_0.30'])}")
    print(f"-> {arg.uit}  ({d['duur_s']}s)")
