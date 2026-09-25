#!/usr/bin/env python3
"""Bouwt de hele De Bresser-site: de homepage, alle pagina's uit navigatie.py, 404.html,
sitemap.xml en robots.txt.

Sinds 24-09-2026 is dit de enige bouwer. De De Kievit-opzet (build_kievit.py knipte de homepage uit
een lander en deze bouwer knipte daar weer blokken uit) is vervangen: elke pagina is nu

    topbalk + drawer, hero met kruimelpad, de inhoud uit _werk/paginas/<route>.html, footer.

De homepage komt uit _werk/paginas/home.html, 404.html wordt hier geschreven. Het offerteformulier
(_werk/blok-offerteformulier.html) staat alleen op /offerte/, onder de inhoud; alle offerteknoppen
wijzen daarheen.

Bronbestand: HTML-fragment met secties, met bovenaan een commentaar met regels KEY: value:
    <!-- BRONBESTAND VOOR /verhuizen/
    TITEL: Verhuizen
    LEAD: een zin onder de kop (optioneel)
    DESCRIPTION: meta description, hooguit 158 tekens
    OUDER: Diensten
    HERO: bresser/<naam>     (optioneel; -1000/-1600/-1920.webp onder assets/img/)
    HERO_ALT: ...            (optioneel)
    HERO_FOCUS: 40           (optioneel; verticaal brandpunt in %, object-position 50% 40%, ook op de blogkaart)
    -->

Draaien vanuit de repo: python site/_werk/build_paginas.py
"""

import json, re, pathlib
from html import unescape

import css_min
import navigatie as nav
import snoei

css_min.schrijf()

SITE = pathlib.Path(__file__).resolve().parents[1]
WERK = SITE / "_werk"
STEMPEL = "<!-- gegenereerd door _werk/build_paginas.py -->"

# ---------------------------------------------------------------- vaste stukken
_sprite_bron = (WERK / "sprite.svg").read_text(encoding="utf-8")
SPRITE = ('<svg width="0" height="0" style="position:absolute" aria-hidden="true">\n  '
          + "\n  ".join(m.group(0) for m in re.finditer(r'<symbol id="[^"]+".*?</symbol>', _sprite_bron, re.S))
          + "\n</svg>")

FORMULIER = (WERK / "blok-offerteformulier.html").read_text(encoding="utf-8")
# Het offerteformulier in de header (goedgekeurd 25-09-2026) staat op elke pagina direct na de hero, behalve
# op /offerte/ zelf: daar staat het grote formulier al (wens gebruiker: "all page headers should have the form").
HEADERFORMULIER = ((WERK / "blok-headerformulier.html").read_text(encoding="utf-8").strip()
                   .replace("{{KV_URL}}", nav.KV_URL).replace("{{KV_CIJFER}}", nav.KV_CIJFER)
                   .replace("{{KV_AANTAL}}", nav.KV_AANTAL).replace("{{KV_AANBEVELING}}", nav.KV_AANBEVELING))
ZONDER_HEADERFORMULIER = {nav.OFFERTE}

# Kort berichtformulier onderaan een pagina (Naam, Telefoonnummer, E-mailadres, Bericht), zoals debresser.nl het onderaan
# plaats-, dienst- en blogpagina's had. Niet op pagina's met een eigen formulier: /contact/, /offerte/, /opslag/,
# /gebouwbeheer/, /meubelprojecten/ en de vacatures. 25-09-2026.
BERICHT = (WERK / "blok-bericht.html").read_text(encoding="utf-8")
BERICHT_OP = {"/verhuizen/", "/assetmanagement/", "/duurzame-werkomgeving/", "/breda/", "/roosendaal/", "/bergen-op-zoom/"}


def bericht_op(href):
    return href in BERICHT_OP or href.startswith("/verhuisbedrijf-") or href in nav.BLOG


REVEAL_JS = """// Reveal zodra een blok in beeld komt.
(function(){
  var el=[].slice.call(document.querySelectorAll('[data-reveal]'));
  var gr=[].slice.call(document.querySelectorAll('[data-reveal-groep]'));
  function aan(){el.forEach(function(e){e.classList.add('in')});gr.forEach(function(g){[].forEach.call(g.children,function(k){k.classList.add('in')})})}
  if(!('IntersectionObserver' in window)){aan();return}
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.16,rootMargin:'0px 0px -8% 0px'});
  el.forEach(function(e){io.observe(e)});
  var ioG=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;[].forEach.call(x.target.children,function(k,i){k.style.transitionDelay=Math.min(i*70,560)+'ms';k.classList.add('in')});ioG.unobserve(x.target)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  gr.forEach(function(g){ioG.observe(g)});
})();"""

SCRIPT = """<script>
""" + REVEAL_JS + """
// Balk wordt solide zodra je scrolt.
(function(){var b=document.getElementById('topbar');
 var f=function(){b.classList.toggle('is-stuck',window.scrollY>40)};f();addEventListener('scroll',f,{passive:true})})();
</script>"""

# Standaardhero per soort pagina: echte foto's van De Bresser (de-kievit-nl/fotos/).
HEROS = {
    "hero/tilburg-team": "Het team van De Bresser met verhuisdozen voor de vrachtwagens bij de vestiging in Tilburg",
    "hero/team-wagens": "Medewerkers van De Bresser met verhuisdozen voor een vrachtwagen en een bus van De Bresser",
    "hero/breda-team": "Verhuizers van De Bresser bij een Top Movers-verhuiswagen",
}


def beeld_srcset(naam):
    """(src, srcset) voor een hero-naam als 'hero/tilburg-team' of 'bresser/x', uit wat er op schijf staat.
    Alleen <naam>-<breedte>.webp: de glob vangt ook langere namen (de-bresser-verhuizingen-brabant-1600)."""
    stam = re.escape(naam.rsplit("/", 1)[-1])
    breedtes = sorted(int(m.group(1)) for p in (SITE / "assets/img").glob(naam + "-*.webp")
                      if (m := re.fullmatch(stam + r"-(\d+)\.webp", p.name)))
    assert breedtes, f"geen beeld gevonden voor {naam}"
    src = f"/assets/img/{naam}-{max(b for b in breedtes if b <= 1920)}.webp"
    return src, ", ".join(f"/assets/img/{naam}-{b}.webp {b}w" for b in breedtes)


def og_beeld(naam):
    """(pad, breedte, hoogte) van het deelbeeld (og:image) voor een hero: een jpg van 1200 x 630 in
    assets/img/og/, midden uitgesneden uit de grootste webp van precies die hero. Geen nieuw beeld, alleen
    een uitsnede van wat al op de pagina staat; kleiner dan 1200 breed wordt niet opgeschaald."""
    from PIL import Image
    stam = naam.rsplit("/", 1)[-1]
    bronnen = [p for p in (SITE / "assets/img").glob(naam + "-*.webp") if re.fullmatch(re.escape(stam) + r"-\d+\.webp", p.name)]
    assert bronnen, f"geen beeld gevonden voor {naam}"
    bron = max(bronnen, key=lambda p: Image.open(p).size[0])
    doel = SITE / "assets/img/og" / (naam.replace("/", "-") + ".jpg")
    if not doel.exists() or doel.stat().st_mtime < bron.stat().st_mtime:
        im = Image.open(bron).convert("RGB")
        w, h = im.size
        if w * 630 <= h * 1200:
            hh = round(w * 630 / 1200)
            im = im.crop((0, (h - hh) // 2, w, (h - hh) // 2 + hh))
        else:
            ww = round(h * 1200 / 630)
            im = im.crop(((w - ww) // 2, 0, (w - ww) // 2 + ww, h))
        if im.width > 1200:
            im = im.resize((1200, 630), Image.LANCZOS)
        doel.parent.mkdir(exist_ok=True)
        im.save(doel, "JPEG", quality=82, optimize=True, progressive=True)
    w, h = Image.open(doel).size
    return "/" + doel.relative_to(SITE).as_posix(), w, h


def standaard_hero(href):
    if href in nav.OUDERS and nav.OUDERS[href][0] == "Diensten":
        return "hero/team-wagens"
    if href in (nav.OFFERTE, "/contact/", "/faq/"):
        return "hero/breda-team"
    return "hero/tilburg-team"


def hero_naam(href, meta, home=False):
    return meta.get("HERO") or ("hero/tilburg-team" if home else standaard_hero(href))


# ---------------------------------------------------------------- bronbestanden
def bron_meta(href):
    """(meta, inhoud) uit _werk/paginas/<route>.html. meta = de KEY: value-regels uit het kopcommentaar."""
    pad = WERK / "paginas" / ("home.html" if href == "/" else f"{href.strip('/')}.html")
    tekst = pad.read_text(encoding="utf-8")
    meta = {}
    m = re.search(r"<!--\s*BRONBESTAND VOOR.*?-->", tekst, re.S)
    if m:
        for regel in m.group(0).splitlines()[1:]:
            k = re.match(r"\s*([A-Z_]+):\s*(.*?)\s*(?:-->)?$", regel)
            if k and k.group(2):
                meta[k.group(1)] = k.group(2)
        tekst = tekst.replace(m.group(0), "", 1)
    return meta, tekst.strip()


def zonder_commentaar(html):
    """Interne commentaren (GAT-notities, briefings) horen niet in de uitvoer; script en style blijven heel."""
    bewaard = []
    def _park(m):
        bewaard.append(m.group(0))
        return f"\x00{len(bewaard)-1}\x00"
    html = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", _park, html, flags=re.S)
    html = re.sub(r"\n?[ \t]*<!--(?!\s*gegenereerd door).*?-->", "", html, flags=re.S)
    return re.sub(r"\x00(\d+)\x00", lambda m: bewaard[int(m.group(1))], html)


def beschrijving_uit(inhoud):
    """Eerste alinea van minstens vijftien woorden, geknipt op een zinsgrens binnen 158 tekens."""
    for m in re.finditer(r"<p[^>]*>(.*?)</p>", inhoud, re.S):
        t = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", m.group(1))).strip()
        if len(t.split()) < 15:
            continue
        uit = ""
        for z in re.findall(r"[^.!?]*[.!?]", t) or [t]:
            if len((uit + z).strip()) > 158:
                break
            uit = (uit + z).strip() + " "
        return uit.strip() or t[:155].rsplit(" ", 1)[0] + "…"
    return ""


def faq_uit(inhoud):
    """[(vraag, antwoord)] als platte tekst uit de vraagblokken (<details> met een faq__tk) op de pagina."""
    def _tekst(s):
        return unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s))).strip()
    uit = []
    for m in re.finditer(r"<details\b[^>]*>\s*<summary\b[^>]*>(.*?)</summary>(.*?)</details>", inhoud, re.S):
        if "faq__tk" in m.group(1):
            uit.append((_tekst(m.group(1)), re.sub(r"\s+([.,;:!?])", r"\1", _tekst(m.group(2)))))
    return uit


def esc(t):
    return t.replace("&", "&amp;").replace('"', "&quot;").replace("&amp;amp;", "&amp;")


# ---------------------------------------------------------------- stukken van de pagina
def kruimels(href, titel):
    uit = [("Home", "/")]
    if href in nav.OUDERS:
        uit.append(nav.OUDERS[href])
    uit.append((titel, None))
    return uit


# Hero-video, alleen op de homepage (zoals de-kievit.nl): echte beelden van De Bresser uit de eigen YouTube-films
# (Algemeen 2015, Inboedelopslag 2016); bronnen en knipregels in hero/video/debresser/. De bron komt pas als de film
# echt getoond wordt (vanaf 761px, geen reduced-motion), de 1280-versie tot 1280px breed; telefoon en reduced-motion
# houden de foto. WCAG 2.2.2: de film duurt 30 s en herhaalt zich, dus er hoort een pauzeknop bij.
# Sinds 25-09-2026 (d5) de homeheader van Tugche (github TugcheSezr/debresser, index.html .hero), op wens van de
# gebruiker: "add the header from the tugche, keep the form from mine". Haar film hero-compleet(-1280).mp4 met de
# poster home-compleet-*.webp, haar teamuitsnede, de wisselkop "Geweldig in ..." en de ruit en het Top Movers-
# beeldmerk als decor. De oude film hero-debresser-*.mp4 blijft in assets staan.
HERO_VIDEO = """
  <video class="hero__video" muted loop playsinline preload="none" aria-hidden="true" data-src="/assets/video/hero-compleet.mp4" data-src-klein="/assets/video/hero-compleet-1280.mp4"></video>"""
HERO_DECOR = """
  <svg class="art-ruit art-ruit--hero" viewBox="0 0 100 100" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" d="M50 3 97 50 50 97 3 50Z"/></svg>
  <img class="art-h1" src="/assets/img/merk/beeldmerk-topmovers.svg" alt="" width="813" height="225" loading="lazy" decoding="async">"""
HERO_VIDEOKNOP = """
  <button class="hero__videoknop" id="heroVideoKnop" type="button" hidden aria-pressed="false">
    <svg viewBox="0 0 12 14" aria-hidden="true"><rect x="1" y="1" width="3.5" height="12" rx="1"/><rect x="7.5" y="1" width="3.5" height="12" rx="1"/></svg>
    <span class="hero__videoknop__lbl">Film pauzeren</span>
  </button>
  <script>
  (function(){var v=document.querySelector('.hero__video'),k=document.getElementById('heroVideoKnop');if(!v||!k)return;
   var mq=matchMedia('(min-width:761px) and (prefers-reduced-motion:no-preference)');
   var PAUZE='<rect x="1" y="1" width="3.5" height="12" rx="1"/><rect x="7.5" y="1" width="3.5" height="12" rx="1"/>',SPEEL='<path d="M2 1l9 6-9 6z"/>';
   function toon(){k.hidden=!mq.matches||!v.src}
   function start(){if(!mq.matches||v.src)return;v.src=v.dataset[innerWidth>1280?'src':'srcKlein'];v.play().catch(function(){});toon()}
   k.addEventListener('click',function(){var uit=!v.paused;if(uit)v.pause();else v.play().catch(function(){});
    k.setAttribute('aria-pressed',uit?'true':'false');k.querySelector('.hero__videoknop__lbl').textContent=uit?'Film afspelen':'Film pauzeren';k.querySelector('svg').innerHTML=uit?SPEEL:PAUZE});
   if(document.readyState==='complete')start();else addEventListener('load',start);
   mq.addEventListener('change',function(){if(!mq.matches&&v.src)v.pause();start();toon()})})();
  </script>"""


# Drie werkers in de homehero, zoals de-kievit.nl (goedgekeurd 25-09-2026: uitsnede 1, drie-werkers-hero-20260925).
# Uitsnede van de goedgekeurde groepsfoto beeldronde-debresser/drie-werkers/drie-werkers-1-terrein-dekens.png; de
# vrijstaande versie staat ernaast (-uitsnede.png). Opmaak in het d1-blok van style.css (homehero-trio).
# 25-09-2026 (d5, na overleg met d1): de drie werkers zijn vervangen door Tugches uitsnede van het echte team
# (hero-team.webp, 730x500); de drie-werkers-*.webp blijven in assets staan.
HERO_TRIO = """
  <picture class="hero__pic"><img class="hero__person" src="/assets/img/hero/home-team-730.webp" width="730" height="500" alt="Het verhuisteam van De Bresser" decoding="async"></picture>"""


def hero(href, titel, meta, home=False, formulier=False):
    naam = hero_naam(href, meta, home)
    src, srcset = beeld_srcset(naam)
    alt = meta.get("HERO_ALT") or HEROS.get(naam, "")
    focus = f' style="object-position:50% {meta["HERO_FOCUS"]}%"' if meta.get("HERO_FOCUS") else ""
    lead = f'\n      <p class="hero__sub">{meta["LEAD"]}</p>' if meta.get("LEAD") and not home else ""
    if home:
        # Tugches poster (een beeld uit haar film) in plaats van de gewone homefoto; alleen hier gebruikt.
        src = "/assets/img/hero/home-compleet-1920.webp"
        srcset = ", ".join(f"/assets/img/hero/home-compleet-{w}.webp {w}w" for w in (900, 1280, 1920))
        alt = "Vrachtwagens van De Bresser aan de laaddocks van een bedrijfshal, van bovenaf gezien"
    kop = (f'<h1 class="hero__title hero__title--merk" id="hero-titel">'
           '<span class="sb-verborgen">Geweldig in verhuizen, opslag en logistiek. </span>'
           '<span aria-hidden="true">Geweldig in <span class="hero__wissel" data-woorden="verhuizen|opslag|logistiek">verhuizen</span></span>'
           f'<span class="hero__title__sub">{titel}</span></h1>') if home else f'<h1 class="hero__title" id="hero-titel">{titel}</h1>'
    # Geen knoppen: onder de hero staat het offerteformulier (blok-headerformulier.html, #prijs) over de
    # onderrand, met het telefoonnummer eronder (goedgekeurd 25-09-2026). hf1-hero maakt daar ruimte voor.
    if home:
        kruim = knoppen = ""
    else:
        items = []
        for t, h in kruimels(href, titel):
            if h is None and t == titel:
                items.append(f'          <li><span aria-current="page">{t}</span></li>')
            elif h and nav.live(h):
                items.append(f'          <li><a href="{h}">{t}</a></li>')
            else:
                items.append(f'          <li><span>{t}</span></li>')
        kruim = ('\n      <nav class="pk__kruim" aria-label="Kruimelpad">\n        <ol>\n'
                 + "\n".join(items) + "\n        </ol>\n      </nav>")
        knoppen = ""
    return f'''<section class="hero hero--pagina{' hero--home' if home else ''}{' hf1-hero' if formulier else ''}" aria-labelledby="hero-titel">
  <picture class="hero__bg">
    <img src="{src}" srcset="{srcset}" sizes="100vw" width="1600" height="900" alt="{esc(alt)}"{focus} fetchpriority="high" decoding="async">
  </picture>{HERO_VIDEO if home else ''}
  <div class="hero__veil" aria-hidden="true"></div>{HERO_TRIO if home else ''}{HERO_VIDEOKNOP if home else ''}
  <div class="wrap">
    <div class="hero__content">{kruim}
      {kop}{lead}{knoppen}
    </div>
  </div>{HERO_DECOR if home else ''}
</section>'''


def schema(href, titel, beschrijving, beeld=None, faq=None):
    """JSON-LD voor de kop. Alleen wat ook op de pagina staat: het bedrijf met zijn vestigingen (homepage),
    de pagina met kruimelpad, een Service op de dienstpagina's, de vragen van een FAQ-blok, en de datum
    van een blogbericht. beeld = de hero-src van de pagina, faq = faq_uit(inhoud)."""
    u = nav.absoluut(href)
    routes = getattr(nav, "ROUTEPLANNER", {})
    if href == "/":
        bedrijf = {
            "@type": "MovingCompany", "@id": nav.DOMEIN + "/#bedrijf", "name": "De Bresser",
            "legalName": "De Bresser B.V.", "url": nav.DOMEIN + "/", "logo": nav.DOMEIN + nav.LOGO,
            "image": nav.DOMEIN + beeld_srcset("hero/tilburg-team")[0], "telephone": "+31135282372",
            "email": nav.MAIL, "foundingDate": "1923", "vatID": nav.BTW, "slogan": nav.PAYOFF.replace("&amp;", "&"),
            "address": {"@type": "PostalAddress", "streetAddress": "Herastraat 9", "postalCode": "5047 TX",
                        "addressLocality": "Tilburg", "addressCountry": "NL"},
            **({"hasMap": routes[nav.VESTIGINGEN[0][0]]} if nav.VESTIGINGEN[0][0] in routes else {}),
            "department": [{"@type": "MovingCompany", "name": f"De Bresser {n.split(' (')[0]}",
                            "address": {"@type": "PostalAddress", "streetAddress": s,
                                        "postalCode": pc.split(",")[0].rsplit(" ", 1)[0] if "België" not in pc else "1140",
                                        "addressLocality": pc.split(",")[0].split(" ")[-1] if "België" not in pc else "Evere",
                                        "addressCountry": "BE" if "België" in pc else "NL"},
                            **({"telephone": nav.telhref(t)[4:]} if t else {}),
                            **({"hasMap": routes[n]} if n in routes else {})}
                           for n, s, pc, t, _ in nav.VESTIGINGEN[1:]],
        }
        # De profielen staan in de footer van elke pagina (navigatie.SOCIAL).
        if getattr(nav, "SOCIAL", None):
            bedrijf["sameAs"] = [url for _, url in nav.SOCIAL]
        pagina = {"@type": "WebPage", "@id": u + "#pagina", "url": u, "name": titel, "description": beschrijving,
                  "isPartOf": {"@id": nav.DOMEIN + "/#website"}, "about": {"@id": nav.DOMEIN + "/#bedrijf"},
                  "inLanguage": "nl-NL"}
        g = [{"@type": "WebSite", "@id": nav.DOMEIN + "/#website", "url": nav.DOMEIN + "/", "name": "De Bresser",
              "inLanguage": "nl-NL", "publisher": {"@id": nav.DOMEIN + "/#bedrijf"}}, bedrijf, pagina]
    else:
        lijst = [{"@type": "ListItem", "position": i + 1, "name": t, "item": nav.absoluut(h) if h else u}
                 for i, (t, h) in enumerate(k for k in kruimels(href, titel) if k[1] is not None or k[0] == titel)]
        pagina = {"@type": "WebPage", "@id": u + "#pagina", "url": u, "name": titel,
                  "isPartOf": {"@id": nav.DOMEIN + "/#website"}, "about": {"@id": nav.DOMEIN + "/#bedrijf"},
                  "inLanguage": "nl-NL", "breadcrumb": {"@id": u + "#kruimels"}}
        if beschrijving:
            pagina["description"] = beschrijving
        g = [pagina, {"@type": "BreadcrumbList", "@id": u + "#kruimels", "itemListElement": lijst}]
        d = re.match(r"^/(\d{4})/(\d{2})/(\d{2})/", href)
        if d:
            g.append({"@type": "BlogPosting", "@id": u + "#bericht", "headline": titel,
                      "datePublished": "-".join(d.groups()), "mainEntityOfPage": {"@id": u + "#pagina"},
                      "author": {"@id": nav.DOMEIN + "/#bedrijf"}, "publisher": {"@id": nav.DOMEIN + "/#bedrijf"},
                      "inLanguage": "nl-NL", **({"image": nav.DOMEIN + beeld} if beeld else {})})
        # Dienstpagina's (ouder Diensten in het menu): de dienst zelf, geleverd door De Bresser.
        if nav.OUDERS.get(href, ("",))[0] == "Diensten":
            dienst = {"@type": "Service", "@id": u + "#dienst", "name": titel, "serviceType": titel, "url": u,
                      "provider": {"@type": "MovingCompany", "@id": nav.DOMEIN + "/#bedrijf", "name": "De Bresser",
                                   "url": nav.DOMEIN + "/"},
                      "mainEntityOfPage": {"@id": u + "#pagina"}}
            if beschrijving:
                dienst["description"] = beschrijving
            if beeld:
                dienst["image"] = nav.DOMEIN + beeld
            g.append(dienst)
    # Een FAQ-blok op de pagina: dan is de pagina een FAQPage (een soort WebPage) met die vragen.
    if faq:
        pagina["@type"] = "FAQPage"
        pagina["mainEntity"] = [{"@type": "Question", "name": v, "acceptedAnswer": {"@type": "Answer", "text": a}}
                                for v, a in faq]
    return ('<script type="application/ld+json">'
            + json.dumps({"@context": "https://schema.org", "@graph": g}, ensure_ascii=False, separators=(",", ":"))
            + "</script>")


def document(href, titel, main, beschrijving="", index=True, doc_titel=None, beeld=None, faq=None):
    """beeld = (hero-naam, alt) voor og:image en de schema; faq = faq_uit(inhoud)."""
    kop = [f"<title>{doc_titel or titel + ' - De Bresser'}</title>"]
    if index:
        kop.append('<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">')
        if beschrijving:
            kop.append(f'<meta name="description" content="{esc(beschrijving)}">')
        kop.append(f'<link rel="canonical" href="{nav.absoluut(href)}">')
        # Delen (Open Graph en X): titel, tekst en de hero van de pagina als 1200 x 630.
        datum = re.match(r"^/(\d{4})/(\d{2})/(\d{2})/", href)
        og = [f'<meta property="og:type" content="{"article" if datum else "website"}">',
              '<meta property="og:locale" content="nl_NL">', '<meta property="og:site_name" content="De Bresser">',
              f'<meta property="og:title" content="{esc(titel)}">', f'<meta property="og:url" content="{nav.absoluut(href)}">']
        if beschrijving:
            og.append(f'<meta property="og:description" content="{esc(beschrijving)}">')
        if beeld:
            pad, w, h = og_beeld(beeld[0])
            og += [f'<meta property="og:image" content="{nav.DOMEIN}{pad}">', f'<meta property="og:image:width" content="{w}">',
                   f'<meta property="og:image:height" content="{h}">']
            if beeld[1]:
                og.append(f'<meta property="og:image:alt" content="{esc(beeld[1])}">')
        if datum:
            og.append(f'<meta property="article:published_time" content="{"-".join(datum.groups())}">')
        og.append(f'<meta name="twitter:card" content="{"summary_large_image" if beeld else "summary"}">')
        kop.append("\n".join(og))
        kop.append(schema(href, titel, beschrijving, beeld_srcset(beeld[0])[0] if beeld else None, faq))
    else:
        kop.append('<meta name="robots" content="noindex, follow">')
    html = f"""<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
{chr(10).join(kop)}
<meta name="theme-color" content="#020D41">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/assets/img/merk/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/merk/apple-touch-icon.png">
<script>document.documentElement.className+=' js'</script>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/sora-400-700-latin.woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.min.css?v={nav.BUSTER}">
<script src="/assets/js/site.js?v={nav.BUSTER}" defer></script>
</head>
<body>
{STEMPEL}

{SPRITE}

{nav.topbar_html(huidig=href)}

{nav.drawer_html(huidig=href)}

<main id="top" tabindex="-1">

{main}

</main>

{nav.footer_html()}

{nav.mcta_html()}

{SCRIPT}
</body>
</html>
"""
    # De Web3Forms-key staat op een plek: navigatie.WEB3FORMS.
    html, nk = re.subn(r'(name="access_key" value=")[^"]*(")', rf'\g<1>{nav.WEB3FORMS}\g<2>', html)
    assert nk <= html.count('action="https://api.web3forms.com/submit"'), f"{href}: access_key zonder formulier"
    return zonder_commentaar(snoei.sprite(html))


MAANDEN = "januari februari maart april mei juni juli augustus september oktober november december".split()


# Contactpersonen per vestiging, letterlijk van debresser.nl/de-bresser-brussel/ (25-09-2026): "Aanvragen, contact
# en planning verloopt via Niels van Gestel en Aaron Mutsaers." Alleen op /contact/ ({{VESTIGINGEN_PERSONEN}}).
CONTACTPERSONEN = {"Brussel": [("Niels van Gestel", "niels@debresser.nl"), ("Aaron Mutsaers", "aaron@debresser.nl")]}


def vestigingen_html(personen=False):
    kaarten = []
    for n, s, pc, t, p in nav.VESTIGINGEN:
        naam = f'<a href="{p}">{n}</a>' if p and nav.live(p) else n
        tel = (f'<a class="bh-vest__tel" href="{nav.telhref(t)}"><svg aria-hidden="true"><use href="#i-phone"/></svg>{t}</a>'
               if t else "")
        wie = ""
        if personen and n in CONTACTPERSONEN:
            wie = ('<p class="bh-vest__personen">Aanvragen en planning: '
                   + " en ".join(f'<a href="mailto:{m}">{x}</a>' for x, m in CONTACTPERSONEN[n]) + "</p>")
        kaarten.append(f'      <li class="bh-vest__kaart"><h3>{naam}</h3><p>{s}<br>{pc}</p>{wie}{tel}</li>')
    return ('<ul class="bh-vest__grid" data-reveal-groep>\n' + "\n".join(kaarten) + '\n    </ul>\n'
            f'    <p class="bh-vest__algemeen" data-reveal>Algemeen nummer <a href="{nav.TELHREF}">{nav.TEL}</a> '
            f'&middot; <a href="mailto:{nav.MAIL}">{nav.MAIL}</a></p>')


def vestigingen_route_html(personen=False):
    """Beeld en haltestrook van .sb-route (sectiebibliotheek branch-route-stops): de goedgekeurde wagen 3 onderweg
    met de uitsnede pixelgelijk erop, en de vestigingen uit nav.VESTIGINGEN als haltes op een route, elk met adres,
    telefoon en een routelink uit nav.ROUTEPLANNER. Gedeeld ontwerp voor vestigingenlijsten (afspraak met d1, 25-09):
    home #vestigingen via {{VESTIGINGEN_ROUTE}}; /contact/ kan {{VESTIGINGEN_ROUTE_PERSONEN}} gebruiken, met de
    contactpersonen van Brussel als regel onder de haltes."""
    haltes = []
    for n, s, pc, t, p in nav.VESTIGINGEN:
        plaats, _, extra = n.partition(" (")
        naam = f'<a href="{p}">{plaats}</a>' if p and nav.live(p) else plaats
        tag = f' <span class="sb-route__tag">{extra.rstrip(")").capitalize()}</span>' if extra else ""
        tel = (f'<a class="sb-route__tel" href="{nav.telhref(t)}"><svg aria-hidden="true"><use href="#i-phone"/></svg>{t}</a>'
               if t else "")
        route = (f'<a class="sb-route__route" href="{nav.ROUTEPLANNER[n]}" target="_blank" rel="noopener" '
                 f'aria-label="Route naar De Bresser {plaats} (Google Maps)">Route<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>')
        klasse = "sb-route__stop sb-route__stop--hoofd" if extra else "sb-route__stop"
        haltes.append(f'        <li class="{klasse}"><span class="sb-route__pin" aria-hidden="true"></span><h3>{naam}{tag}</h3>'
                      f'<p>{s}<br>{pc}</p><p class="sb-route__links">{tel}{route}</p></li>')
    wie = ""
    if personen:
        wie = "".join(f'\n      <p class="sb-route__personen">{n.partition(" (")[0]}, aanvragen en planning: '
                      + " en ".join(f'{x} (<a href="mailto:{m}">{m}</a>)' for x, m in CONTACTPERSONEN[n]) + "</p>"
                      for n in CONTACTPERSONEN)
    return f'''<div class="sb-route__beeld">
      <img class="sb-route__foto" src="/assets/img/footer/wagen-onderweg-1200.webp" srcset="/assets/img/footer/wagen-onderweg-800.webp 800w, /assets/img/footer/wagen-onderweg-1200.webp 1200w, /assets/img/footer/wagen-onderweg-1600.webp 1600w" sizes="(max-width:900px) 100vw, 700px" width="1600" height="842" alt="Vrachtwagen van De Bresser onderweg op een weg in Brabant" loading="lazy" decoding="async">
      <img class="sb-route__wagen" src="/assets/img/beeld/wagen-onderweg-uitsnede-1100.webp" srcset="/assets/img/beeld/wagen-onderweg-uitsnede-700.webp 700w, /assets/img/beeld/wagen-onderweg-uitsnede-1100.webp 1100w" sizes="(max-width:900px) 72vw, 500px" width="1100" height="781" alt="" aria-hidden="true" loading="lazy" decoding="async">
    </div>
    <div class="sb-route__strook" data-reveal>
      <ol class="sb-route__lijst" data-reveal-groep>
{chr(10).join(haltes)}
      </ol>{wie}
    </div>'''


def werkgebied_html():
    """Alle plaats- en vestigingspagina's (nav.PLAATSEN, alfabetisch) als lijst voor #werkgebied op /contact/."""
    items = [f'<li><a href="{h}">{l}</a></li>' for h, l in nav.PLAATSEN if nav.live(h)]
    return ('<div class="sb-werkgebied__plaat" data-reveal>\n      <ul class="sb-werkgebied__lijst">\n        '
            + "\n        ".join(items) + '\n      </ul>\n    </div>')


def kaartbeeld(naam, sizes, alt="", focus=None, klasse="bl-kaart__foto"):
    """<img> voor een kaart uit de webp's van een hero: srcset met de echte breedtes (naam en breedte
    verschillen soms: een -1600 kan 1500 breed zijn), src de kleinste, width/height van dat bestand."""
    from PIL import Image
    stam = re.escape(naam.rsplit("/", 1)[-1])
    per_maat = {}
    for p in sorted((SITE / "assets/img").glob(naam + "-*.webp"), key=lambda p: int(p.stem.rsplit("-", 1)[1]) if p.stem.rsplit("-", 1)[1].isdigit() else 0):
        if re.fullmatch(stam + r"-\d+\.webp", p.name):
            per_maat.setdefault(Image.open(p).size, p)
    assert per_maat, f"geen beeld gevonden voor {naam}"
    maten = sorted(per_maat, key=lambda m: m[0])
    pad = lambda p: "/" + p.relative_to(SITE).as_posix()
    srcset = (f' srcset="{", ".join(f"{pad(per_maat[m])} {m[0]}w" for m in maten)}" sizes="{sizes}"') if len(maten) > 1 else ""
    w, h = maten[0]
    stijl = f' style="object-position:50% {focus}%"' if focus else ""
    return f'<img class="{klasse}" src="{pad(per_maat[maten[0]])}"{srcset} width="{w}" height="{h}" alt="{alt}"{stijl} loading="lazy" decoding="async">'


def blog_html(aantal=3):
    """Home #blog: "Nieuws & Tips" uit de repository van Tugche (debresser-github, index.html #nieuws), wens
    gebruiker 25-09: "keep it 3 only with read more button". Haar kaart: foto van rand tot rand bovenin, titel,
    korte tekst en "Lees meer". De foto is de hero van het bericht zelf (wens gebruiker 25-09: "use blogpost images
    for this section"), de tekst de LEAD van het bericht; de knop gaat naar /blog/. Leeg als er nog geen berichten
    live staan. Alt alleen als het bericht er een heeft; anders decoratief, de titel staat ernaast."""
    berichten = [h for h in nav.BLOG if nav.live(h)][:aantal]
    if not berichten:
        return ""
    kaarten = []
    for h in berichten:
        meta = bron_meta(h)[0]
        naam = hero_naam(h, meta)
        beeld = kaartbeeld(naam, "(max-width:560px) 92vw, (max-width:900px) 42vw, (max-width:1300px) 31vw, 400px",
                           esc(meta.get("HERO_ALT") or HEROS.get(naam, "")), meta.get("HERO_FOCUS"), klasse="bh-nieuws__foto")
        lead = f'\n          <p>{meta["LEAD"]}</p>' if meta.get("LEAD") else ""
        kaarten.append(f'''      <li class="bh-nieuws__kaart">
        <div class="bh-nieuws__beeld">{beeld}</div>
        <div class="bh-nieuws__tekst">
          <h3><a href="{h}">{meta.get("TITEL") or h}</a></h3>{lead}
          <span class="bh-nieuws__meer" aria-hidden="true">Lees meer<svg aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </div>
      </li>''')
    meer = ('\n    <p class="bh-nieuws__voet" data-reveal><a class="btn" href="/blog/">Bekijk alle berichten</a></p>'
            if nav.live("/blog/") else "")
    return f'''<section class="sectie bh-nieuws" id="blog" aria-labelledby="blog-kop">
  <div class="wrap">
    <div class="sectiekop" data-reveal>
      <p class="label">Blog</p>
      <h2 class="kop" id="blog-kop">Nieuws &amp; Tips</h2>
    </div>
    <ul class="bh-nieuws__raster" data-reveal-groep>
{chr(10).join(kaarten)}
    </ul>{meer}
  </div>
</section>'''


def kaart_van(m):
    """{{KAARTBEELD /route/ | sizes}}: de hero van die pagina als kaartfoto (de kaarten op /blog/ tonen de hero
    van hun eigen bericht, wens gebruiker 25-09: elke header een eigen foto, de kaart volgt)."""
    href, sizes = (x.strip() for x in m.group(1).split("|", 1))
    meta = bron_meta(href)[0]
    naam = hero_naam(href, meta)
    return kaartbeeld(naam, sizes, esc(meta.get("HERO_ALT") or HEROS.get(naam, "")), meta.get("HERO_FOCUS"))


def pagina(href):
    meta, inhoud = bron_meta(href)
    inhoud = re.sub(r"\{\{KAARTBEELD ([^}]+)\}\}", kaart_van, inhoud)
    inhoud = (inhoud.replace("{{VESTIGINGEN_ROUTE_PERSONEN}}", vestigingen_route_html(personen=True))
              .replace("{{VESTIGINGEN_ROUTE}}", vestigingen_route_html())
              .replace("{{VESTIGINGEN_PERSONEN}}", vestigingen_html(personen=True))
              .replace("{{VESTIGINGEN}}", vestigingen_html()).replace("{{WERKGEBIED}}", werkgebied_html())
              .replace("{{BLOG}}", blog_html())
              .replace("{{DIENSTEN_WIT}}", (WERK / "blok-dienstkaarten-wit.html").read_text(encoding="utf-8").strip())
              .replace("{{DIENSTEN}}", (WERK / "blok-dienstkaarten.html").read_text(encoding="utf-8").strip())
              .replace("{{KV_URL}}", nav.KV_URL).replace("{{KV_CIJFER}}", nav.KV_CIJFER)
              .replace("{{KV_STERREN}}", nav.KV_STERREN).replace("{{KV_AANTAL}}", nav.KV_AANTAL)
              .replace("{{KV_AANBEVELING}}", nav.KV_AANBEVELING))
    titel = meta.get("TITEL") or nav.LABELS.get(href) or href.strip("/")
    beschrijving = " ".join(meta.get("DESCRIPTION", "").split()) or beschrijving_uit(inhoud)
    assert len(beschrijving) <= 160, f"{href}: DESCRIPTION is {len(beschrijving)} tekens"
    formulier = href not in ZONDER_HEADERFORMULIER
    delen = [hero(href, titel, meta, home=href == "/", formulier=formulier)] + ([HEADERFORMULIER] if formulier else []) + [inhoud]
    # Onder de inhoud: de /offerte/-tekst zegt "met het formulier onderaan deze pagina".
    if href == nav.OFFERTE:
        delen.append(FORMULIER)
    if bericht_op(href):
        # andere achtergrond dan de laatste sectie, anders lopen ze in elkaar over
        laatste = re.findall(r'<section class="([^"]*)"', inhoud)
        creme = not laatste or "sectie--creme2" not in laatste[-1]
        delen.append(BERICHT.replace("{{ACHTERGROND}}", " sectie--creme2" if creme else ""))
    naam = hero_naam(href, meta, home=href == "/")
    return document(href, titel, "\n\n".join(delen), beschrijving,
                    doc_titel=("De Bresser - " + nav.PAYOFF.replace("&amp;", "&")) if href == "/" else None,
                    beeld=(naam, meta.get("HERO_ALT") or HEROS.get(naam, "")), faq=faq_uit(inhoud))


def pagina_404():
    # met "Alle diensten" (/diensten/) voorop, zoals het menu en de footer (wens gebruiker 25-09)
    diensten = "\n".join(f'        <li><a href="{h}">{l}</a></li>' for h, l in nav._diensten_links())
    main = f'''<section class="pk pk--404">
  <div class="wrap">
    <h1>Pagina niet gevonden</h1>
    <p class="pk__lead">Deze pagina kon niet worden gevonden. Het lijkt erop dat er niets is gevonden op deze locatie.</p>
  </div>
</section>

<section class="sectie" aria-labelledby="nf-kop">
  <div class="wrap nf">
    <h2 class="kop" id="nf-kop">Misschien zocht u dit</h2>
    <ul class="nf__links">
      <li><a href="/">Home</a></li>
{diensten}
      <li><a href="/contact/">Contact</a></li>
    </ul>
    <p><a class="btn btn--offerte btn--lg" href="{nav.offerte_href()}"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte aanvragen</a></p>
  </div>
</section>'''
    return document("/404", "Pagina niet gevonden", main, index=False,
                    doc_titel="Pagina niet gevonden - De Bresser")


# ---------------------------------------------------------------- bouwen
gebouwd = ["/"]
(SITE / "index.html").write_text(pagina("/"), encoding="utf-8")
for href in nav.paginas():
    if not nav.live(href):
        continue
    doel = SITE / href.strip("/") / "index.html"
    doel.parent.mkdir(parents=True, exist_ok=True)
    doel.write_text(pagina(href), encoding="utf-8")
    gebouwd.append(href)
(SITE / "404.html").write_text(pagina_404(), encoding="utf-8")
print(f"{len(gebouwd)} pagina's gebouwd (homepage meegeteld) plus 404.html; "
      f"nog niet vrijgegeven: {len(nav.paginas()) + 1 - len(gebouwd)}")

# Oude uitvoer die niet meer bij de boom hoort: melden, niet stil laten staan.
for p in sorted(SITE.glob("**/index.html")):
    rel = "/" + p.parent.relative_to(SITE).as_posix() + "/"
    if rel == "/./" or rel.startswith("/_werk/") or rel.startswith("/assets/"):
        continue
    if rel not in gebouwd:
        print("  LET OP, oude pagina die niet in de boom staat: " + rel)

# ---------------------------------------------------------------- controles
kapot = {}
for href in gebouwd + ["/404"]:
    f = SITE / ("404.html" if href == "/404" else "index.html" if href == "/" else href.strip("/") + "/index.html")
    h = f.read_text(encoding="utf-8")
    assert '<main id="top" tabindex="-1">' in h and 'class="skiplink"' in h, f"skiplink/main mist op {href}"
    assert "novalidate" not in h, f"novalidate op {href}"
    if 'id="lfForm"' in h:
        assert 'id="lf-foutlijst"' in h, f"formulier zonder foutenlijst op {href}"
    # Headerformulier: precies een keer, direct na de hero; niet op /offerte/ en 404.
    verwacht = 0 if href in ZONDER_HEADERFORMULIER or href == "/404" else 1
    assert h.count('id="ofForm"') == verwacht and h.count('id="prijs"') == verwacht, f"headerformulier {verwacht}x verwacht op {href}"
    if verwacht:
        assert re.search(r'class="hero [^"]*\bhf1-hero\b.*?</section>\s*<section class="offerte-overlay hf1"', h, re.S), f"headerformulier niet na de hero op {href}"
    # De voorwaarden staan in /downloads/; het oude WordPress-adres gaat alleen via de 301 in vercel.json.
    assert "/wp-content/" not in h, f"link naar /wp-content/ op {href}: gebruik /downloads/ (navigatie.VOORWAARDEN)"
    for link in re.findall(r'<a\b[^>]*\bhref="(/[^"#?]*)', h):
        if link.startswith(("/assets/", "/downloads/")):
            if not (SITE / link.lstrip("/")).exists():
                kapot.setdefault(link, set()).add(href)
        elif not nav.live(link):
            kapot.setdefault(link, set()).add(href)
    for bron in (re.findall(r'(?:src|href)="(/assets/[^"?]+)', h) + re.findall(r'(/assets/[^" ,]+\.(?:webp|png|jpg|svg)) \d+w', h)
                 + re.findall(r'<meta property="og:image" content="' + re.escape(nav.DOMEIN) + r'(/[^"]+)"', h)):
        if not (SITE / bron.lstrip("/")).exists():
            kapot.setdefault(bron, set()).add(href)
    if href != "/404":
        assert 'property="og:image"' in h and 'name="twitter:card"' in h, f"og:image of twitter:card mist op {href}"
        for blok in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
            json.loads(blok)
for link, waar in sorted(kapot.items()):
    print(f"  DODE LINK {link} op {', '.join(sorted(waar))}")
print("interne links: " + ("alle doelen bestaan" if not kapot else f"{len(kapot)} dode doelen"))

# ---------------------------------------------------------------- robots.txt en sitemap.xml
(SITE / "robots.txt").write_text(
    "User-agent: *\nAllow: /\nDisallow: /_werk/\n\nSitemap: " + nav.DOMEIN + "/sitemap.xml\n", encoding="utf-8")
(SITE / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "\n".join(f"  <url><loc>{nav.absoluut(h)}</loc></url>" for h in gebouwd) + "\n</urlset>\n", encoding="utf-8")
print(f"robots.txt en sitemap.xml: {len(gebouwd)} routes op {nav.DOMEIN}")
