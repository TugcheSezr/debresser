#!/usr/bin/env python3
"""Statische pas: formulieren, placeholders en de toegankelijkheidspunten die je zonder
browser hard kunt vaststellen.

    python3 _werk/seo-qa/t4/t4_statisch.py [--ijk]

Bewust NIET hierin: contrast, focusvolgorde, toetsenbordbediening en alles wat een gerenderde
layout nodig heeft. Die kun je niet uit HTML afleiden en een groene statische uitkomst zou daar
een vals gevoel van dekking geven. Die staan in de baseline als aparte, nog te draaien pas.
"""
import argparse, json, pathlib, re, sys, urllib.request, gzip
from html.parser import HTMLParser

BASIS = "http://127.0.0.1:4740"
UIT = pathlib.Path(__file__).resolve().parent

# Wat als productieplaceholder telt. De Web3Forms-sleutel is het scherpst: die staat in het
# masterplan als USER_EXTERNAL en blokkeert productie.
SLEUTEL_PAT = re.compile(r'name="access_key"[^>]*value="([^"]*)"')
# Alleen op ZICHTBARE tekst en op HTML-commentaar zoeken, nooit op de ruwe HTML. Eerste versie
# van deze lijst zocht in de bron en meldde 231 treffers op 34 routes: allemaal vals. `placeholder`
# is gewoon het HTML-attribuut (`placeholder="Straat, nr + plaats"`) en "Vul in" is Nederlandse
# knoptekst. Een marker-zoeker die de opmaak meeneemt, meet de taal van HTML en niet de staat van
# de site. Daarom valt het woord PLACEHOLDER er ook uit: op een Nederlandstalige site levert het
# alleen ruis, en de echte placeholder die ertoe doet (de Web3Forms-sleutel) heeft zijn eigen check.
MARKERS = re.compile(r"\b(TODO|FIXME|LOREM IPSUM|VERVANG[ _-]?DOOR|NOG[ _-]?IN[ _-]?TE[ _-]?VULLEN)\b", re.I)
ZIN_MARKERS = re.compile(r"(wordt nog gebouwd|volgt nog|binnenkort beschikbaar|coming soon)", re.I)
SLEUTEL_ECHT = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")


# Een woordenlijst kan in het Nederlands niet uitmaken of een slotwoord een voorzetsel is of een
# scheidbaar werkwoordpartikel. "Vraag gratis een offerte aan." is compleet, "spullen waar ze aan."
# is afgekapt, en het slotwoord is in beide gevallen "aan". Daarom twee bakken in plaats van een
# oordeel dat precisie voorwendt die de methode niet heeft: ZEKER afgekapt bij een lidwoord,
# voegwoord of betrekkelijk voornaamwoord, want die kunnen nooit een zin afsluiten, en TWIJFEL bij
# een woord dat allebei kan zijn. De twijfelbak gaat met de hand langs; hij is kort genoeg.
ZEKER_NIET_SLOT = {"de", "het", "een", "en", "of", "maar", "want", "die", "dat", "welke",
                   "waarin", "waarop", "waaraan", "wiens", "zodat", "omdat", "terwijl"}
TWIJFEL_SLOT = {"aan", "op", "in", "uit", "door", "over", "mee", "af", "toe", "voor", "bij",
                "om", "te", "van", "naar", "waar", "er", "dan", "als"}
DESC_MAX = 158


def description_oordeel(tekst):
    """(te_lang, afgekapt, twijfel). Leeg oordeel als er geen description is."""
    if not tekst:
        return (False, False, False)
    laatste = re.sub(r"[^a-zà-ÿ]", "", tekst.rstrip().rstrip(".").split()[-1].lower())
    return (len(tekst) > DESC_MAX, laatste in ZEKER_NIET_SLOT, laatste in TWIJFEL_SLOT)


def zichtbaar_en_commentaar(html):
    """(zichtbare tekst, commentaartekst). Scripts en styles vallen weg."""
    comm = " ".join(re.findall(r"<!--(.*?)-->", html, re.S))
    kaal = re.sub(r"<!--.*?-->", " ", html, flags=re.S)
    kaal = re.sub(r"<(script|style)\b.*?</\1>", " ", kaal, flags=re.S | re.I)
    return re.sub(r"<[^>]+>", " ", kaal), comm


class A11y(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = None; self.viewport = None
        self.img_zonder_alt = 0; self.img_totaal = 0
        self.koppen = []            # niveaus op volgorde
        self.velden = []            # (tag, id, type, heeft_label_of_aria)
        self.labels = set(); self.arialabels = {}
        self.skiplink = 0; self.main_id = None
        self.knoppen_zonder_naam = 0
        self.in_label = 0           # diepte, voor IMPLICIETE labels: <label><span>Van</span><input></label>
        self._knopdiepte = 0; self._knop_heeft_tekst = False; self._knop_telt = False
        self.tabindex_positief = 0
        self._veldbuf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag == "meta" and (a.get("name") or "").lower() == "viewport": self.viewport = a.get("content")
        if tag == "img":
            self.img_totaal += 1
            if a.get("alt") is None: self.img_zonder_alt += 1
        if tag in ("h1","h2","h3","h4","h5","h6"): self.koppen.append(int(tag[1]))
        if tag == "label" and a.get("for"): self.labels.add(a["for"])
        if tag == "main": self.main_id = a.get("id")
        if "skiplink" in (a.get("class") or ""): self.skiplink += 1
        try:
            if int(a.get("tabindex", "0")) > 0: self.tabindex_positief += 1
        except ValueError: pass
        if tag in ("input","select","textarea"):
            t = (a.get("type") or "text").lower()
            if t not in ("hidden","submit","button","reset"):
                # Een veld is gelabeld door een <label for>, door aria-*, OF doordat het BINNEN een
                # <label> staat. Die derde vorm is even geldig als de eerste en wordt hier op elk
                # formulier van deze site gebruikt; wie hem niet meet, meldt 485 valse fouten.
                gelabeld = bool(a.get("aria-label") or a.get("aria-labelledby")) or self.in_label > 0
                self._veldbuf.append((tag, a.get("id"), t, gelabeld))
        if tag == "label": self.in_label += 1
        if tag == "button":
            # aria-hidden of tabindex=-1 haalt de knop uit de toegankelijkheidsboom; die HOORT
            # geen naam te hebben. De drawer-scrim op deze site is precies dat geval.
            verborgen = a.get("aria-hidden") == "true" or a.get("tabindex") == "-1"
            self._knop_telt = not verborgen and not (a.get("aria-label") or a.get("aria-labelledby"))
            self._knopdiepte = 1; self._knop_heeft_tekst = False

    def handle_data(self, d):
        if self._knopdiepte and d.strip():
            self._knop_heeft_tekst = True

    def handle_endtag(self, tag):
        if tag == "label" and self.in_label: self.in_label -= 1
        if tag == "button":
            if self._knop_telt and not self._knop_heeft_tekst:
                self.knoppen_zonder_naam += 1
            self._knopdiepte = 0; self._knop_telt = False


def desc_van(html):
    m = re.search(r'<meta[^>]+name="description"[^>]*content="([^"]*)"', html, re.I)
    return m.group(1) if m else ""


def haal(pad):
    r = urllib.request.urlopen(urllib.request.Request(BASIS + pad, headers={"Accept-Encoding":"gzip"}), timeout=20)
    raw = r.read()
    return (gzip.decompress(raw) if r.headers.get("Content-Encoding")=="gzip" else raw).decode("utf-8","replace")


def sprongen(niveaus):
    """Overgeslagen kopniveaus, bv. h2 -> h4. Alleen naar BENEDEN springen is een fout."""
    fout = []
    for a, b in zip(niveaus, niveaus[1:]):
        if b > a + 1: fout.append(f"h{a}->h{b}")
    return fout


def ijk():
    fouten = []
    def eis(n, ok, wat): (print(f"  ok   {n}: {wat}") if ok else (fouten.append(n), print(f"  DOOD {n}: {wat}")))
    p = A11y(); p.feed('<html lang="nl"><body><img src="a.png"><img src="b.png" alt="">'
                       '<h1>a</h1><h3>b</h3><label for="x">L</label><input id="x">'
                       '<input id="y"><button></button><button>Tekst</button>'
                       '<a class="skiplink" href="#top">Naar inhoud</a><main id="top"></main></body></html>')
    eis("alt-ontbreekt", p.img_zonder_alt == 1, f"1 van {p.img_totaal} img zonder alt-attribuut")
    eis("alt-leeg-telt-niet", p.img_totaal == 2, 'alt="" is geldig en telt niet als ontbrekend')
    eis("kopsprong", sprongen(p.koppen) == ["h1->h3"], f"{sprongen(p.koppen)}")
    eis("geen-valse-kopsprong", sprongen([1,2,2,3,2]) == [], "h1,h2,h2,h3,h2 is in orde")
    eis("label", p.labels == {"x"}, f"labels voor {p.labels}")
    eis("knop-zonder-naam", p.knoppen_zonder_naam == 1, f"{p.knoppen_zonder_naam} lege knop gezien")
    eis("skiplink", p.skiplink == 1 and p.main_id == "top", "skiplink en main#top gevonden")
    # de drie valse alarmen van 30-08-2026, elk als vaste ijkcase in de vorm van de echte bron
    q = A11y(); q.feed('<label class="of-field"><span>Van</span>'
                       '<input id="of-van" type="text" placeholder="Straat, nr + plaats"></label>'
                       '<button class="drawer__scrim" tabindex="-1" aria-hidden="true"></button>'
                       '<button class="x"></button><input id="los" type="text">')
    eis("impliciet-label", q._veldbuf[0][3] is True, "input binnen <label> geldt als gelabeld")
    eis("los-veld-valt-op", q._veldbuf[1][3] is False, "input zonder enig label valt wel op")
    eis("verborgen-knop", q.knoppen_zonder_naam == 1,
        "aria-hidden/tabindex=-1 knop telt niet, de kale knop wel")
    zicht, comm = zichtbaar_en_commentaar(
        '<input placeholder="Vul in"><!-- TODO: nog doen --><p>Vul in het formulier</p>')
    eis("marker-niet-in-attribuut", not MARKERS.search(zicht),
        'placeholder="Vul in" en de zin "Vul in het formulier" geven geen treffer')
    eis("marker-wel-in-commentaar", bool(MARKERS.search(comm)), "TODO in commentaar wordt wel gezien")

    # descriptions: afgekapte zin herkennen zonder een correcte zin af te keuren
    eis("desc-zeker-afgekapt", description_oordeel("de voorwaarden die de Organisatie voor de")[1],
        'eindigend op "de" is zeker afgekapt')
    eis("desc-geen-vals-alarm",
        not description_oordeel("Op een avond dat de winkel net dicht is.")[1]
        and not description_oordeel("Wij verhuizen in heel Limburg.")[1],
        "een correcte zin geldt niet als zeker afgekapt")
    eis("desc-twijfel", description_oordeel("Vraag gratis een offerte aan.")[2]
        and description_oordeel("je gaat om met spullen waar ze aan.")[2],
        'beide "aan"-gevallen komen in de twijfelbak, niet in de foutbak')
    eis("desc-lengte", description_oordeel("x" * 174)[0] and not description_oordeel("x" * 150)[0],
        "174 tekens te lang, 150 niet")

    eis("sleutelvorm", not SLEUTEL_ECHT.match("VUL-JE-KEY-IN") and
        SLEUTEL_ECHT.match("1a2b3c4d-1234-1234-1234-123456789abc") is not None,
        "placeholder valt af, echte uuid niet")
    print("\nIJKING " + ("MISLUKT: "+", ".join(fouten) if fouten else "GESLAAGD"))
    return 1 if fouten else 0


def meet():
    routes = sorted(json.loads((UIT/"t4-baseline.json").read_text())["paginas"])
    rap = {}
    sleutels = {}
    for r in routes:
        t = haal(r)
        p = A11y(); p.feed(t)
        zonder_label = [v for v in p._veldbuf if not (v[1] in p.labels or v[3])]
        zicht, comm = zichtbaar_en_commentaar(t)
        gevonden = {}
        for naam, tekst, pat in (("marker-zichtbaar", zicht, MARKERS),
                                 ("marker-commentaar", comm, MARKERS),
                                 ("nog-te-doen-zin", zicht, ZIN_MARKERS)):
            m = pat.findall(tekst)
            if m: gevonden[naam] = len(m)
        km = SLEUTEL_PAT.search(t)
        if km:
            sleutels.setdefault(km.group(1), []).append(r)
        te_lang, afgekapt, twijfel = description_oordeel(desc_van(t))
        rap[r] = {"description_te_lang": te_lang, "description_afgekapt": afgekapt,
                  "description_twijfel": twijfel,
                  "lang": p.lang, "viewport": bool(p.viewport),
                  "img": p.img_totaal, "img_zonder_alt": p.img_zonder_alt,
                  "kopsprongen": sprongen(p.koppen),
                  "velden": len(p._veldbuf), "velden_zonder_label": len(zonder_label),
                  "skiplink": p.skiplink, "main_id": p.main_id,
                  "knoppen_zonder_naam": p.knoppen_zonder_naam,
                  "tabindex_positief": p.tabindex_positief,
                  "placeholders": gevonden}
    (UIT/"t4-statisch.json").write_text(json.dumps(rap, indent=1, ensure_ascii=False))

    def tel(v): return sum(1 for x in rap.values() if v(x))
    print(f"routes: {len(rap)}")
    print(f"  lang=nl op alle routes        : {tel(lambda x: x['lang']=='nl')}/{len(rap)}")
    print(f"  viewport-meta                 : {tel(lambda x: x['viewport'])}/{len(rap)}")
    print(f"  skiplink + main[id]           : {tel(lambda x: x['skiplink'] and x['main_id'])}/{len(rap)}")
    print(f"  img zonder alt-attribuut      : {sum(x['img_zonder_alt'] for x in rap.values())} "
          f"(op {sum(x['img'] for x in rap.values())} afbeeldingen)")
    print(f"  routes met kopniveau-sprong   : {tel(lambda x: x['kopsprongen'])}")
    print(f"  formuliervelden zonder label  : {sum(x['velden_zonder_label'] for x in rap.values())} "
          f"(op {sum(x['velden'] for x in rap.values())} velden)")
    print(f"  knoppen zonder naam           : {sum(x['knoppen_zonder_naam'] for x in rap.values())}")
    print(f"  tabindex > 0                  : {sum(x['tabindex_positief'] for x in rap.values())}")
    tl = [r for r, x in rap.items() if x["description_te_lang"]]
    af = [r for r, x in rap.items() if x["description_afgekapt"]]
    print(f"  description langer dan {DESC_MAX}    : {len(tl)} {tl}")
    tw = [r for r, x in rap.items() if x["description_twijfel"]]
    print(f"  description zeker afgekapt    : {len(af)} {af}")
    print(f"  description twijfel, nakijken : {len(tw)} {tw}")
    print("\n  Web3Forms access_key:")
    for k, rs in sleutels.items():
        echt = "ECHTE UUID" if SLEUTEL_ECHT.match(k) else "PLACEHOLDER"
        print(f"    {echt:<12} {k!r} op {len(rs)} routes")
    for n in ("marker-zichtbaar", "marker-commentaar", "nog-te-doen-zin"):
        tot = sum(x['placeholders'].get(n, 0) for x in rap.values())
        wa = [r for r, x in rap.items() if x['placeholders'].get(n)]
        print(f"  {n:<20}: {tot} treffer(s){' op ' + str(len(wa)) + ' routes' if wa else ''}")
    for r,x in rap.items():
        if x['kopsprongen']: print(f"    kopsprong {r}: {x['kopsprongen']}")
    return 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--ijk", action="store_true")
    sys.exit(ijk() if ap.parse_args().ijk else meet())
