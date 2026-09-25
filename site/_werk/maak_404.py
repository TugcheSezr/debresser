#!/usr/bin/env python3
"""Stelt site/404.html samen: de shell van de site met een eigen <main>.

    python3 _werk/maak_404.py          # los draaien
    import maak_404; maak_404.bouw_404()   # vanuit een bouwer, NA het schrijven van de pagina's

WAAROM DIT SCRIPT BESTAAT, EN WAAROM JE DE MARKUP NIET MOET OVERTYPEN.
Een 404-pagina hoort dezelfde balk, sprite, voetlijst en knoppenbalk te dragen als de rest van de
site. Die met de hand overnemen levert een tweede waarheid op: verandert het menu of de voetlijst,
dan loopt de 404 stil achter en merkt niemand het, want niemand bezoekt hem tijdens het werk.
Daarom haalt dit script die onderdelen WOORDELIJK uit een al gegenereerde pagina. Dezelfde regel
die build_paginas.py zelf hanteert als het sprite en footer uit site/index.html leest.

WAT WAARVANDAAN KOMT
  head        eigen. Titel, en robots op noindex, follow. Bewust GEEN canonical: een 404 mag
              zichzelf niet als de te indexeren versie aanwijzen. Geen description en geen JSON-LD
              evenmin, want de pagina komt nooit in een zoekresultaat terecht.
  css en js   uit de head van de bronpagina, inclusief de cachebuster. Daarom moet dit script
              draaien NA de bouw: anders wijst de 404 naar een oude buster.
  sprite,     woordelijk uit de bronpagina, alles tussen <body> en <main>. De sprite is daar al
  balk, menu  door snoei.sprite() teruggesnoeid tot wat die pagina aanroept; onze <main> gebruikt
              met opzet geen enkel symbool daarbuiten, dus er ontstaat geen leeg vakje zoals
              destijds met i-pin op de dienstpagina's.
  voetlijst   woordelijk uit de bronpagina, alles vanaf </main>.
  main        eigen tekst, hieronder in LINKS en in de sjabloon.

BRONPAGINA is /sitemap/ en niet de homepage: die laatste draagt een sprite van eenentwintig
symbolen en een scriptblok voor de hero-video, allebei dood gewicht op een 404.

De uitvoer draagt met opzet maar een korte verwijzing als HTML-comment. Interne uitleg hoort hier
te staan en niet op de website; build_paginas.zonder_werkcommentaar() haalt comments boven de
zestig tekens er sowieso uit.
"""
import pathlib

SITE = pathlib.Path(__file__).resolve().parents[1]
BRON_ROUTE = "sitemap"
DOEL = SITE / "404.html"
STEMPEL = "<!-- Gegenereerd door _werk/maak_404.py -->\n"

# De drie kolommen van de pagina. Een route erbij is een regel erbij.
LINKS = [
    ("Verhuizen", [
        ("/diensten/", "Alle verhuisdiensten"),
        ("/particulier-verhuizen/", "Particuliere verhuizing"),
        ("/kantoorverhuizing/", "Bedrijfs- en kantoorverhuizing"),
        ("/inpakservice/", "Inpakservice"),
        ("/inboedelopslag/", "Inboedelopslag"),
        ("/internationale-verhuizing/", "Verhuizen naar het buitenland"),
    ]),
    ("Voorbereiden", [
        ("/verhuischecklist/", "Verhuischecklist"),
        ("/inpaktips/", "Inpaktips"),
        ("/m3-calculator/", "Hoeveel kubieke meter heeft u"),
        ("/dozencalculator/", "Hoeveel dozen heeft u nodig"),
        ("/veelgestelde-vragen/", "Veelgestelde vragen"),
    ]),
    ("Over De Kievit", [
        ("/over-ons/", "Over ons"),
        ("/werkwijze/", "Onze werkwijze"),
        ("/erkende-verhuizer/", "Erkende Verhuizer"),
        ("/klantervaringen/", "Klantervaringen"),
        ("/contact/", "Contact"),
        ("/sitemap/", "Alle pagina's op een rij"),
    ]),
]

# Adressen die ooit hebben bestaan en waarvan wij weten waar ze nu horen. LET OP: dit levert een
# AANWIJZING op de 404 op en GEEN redirect; de pagina blijft een 404 en de linkwaarde van het oude
# adres gaat verloren. Een echte 301 hoort in vercel.json en houdt die waarde wel vast.
OUDE_ADRESSEN = {"/over-de-kievit/": ("/over-ons/", "Over ons")}

WA = ("https://wa.me/31773232100?text=Hallo%2C%20ik%20stuur%20u%20foto%27s%20van%20mijn"
      "%20woning%20voor%20een%20prijsindicatie.")


def _stukken_uit_de_bron():
    """De drie stukken shell uit de al gegenereerde bronpagina."""
    bron_bestand = SITE / BRON_ROUTE / "index.html"
    assert bron_bestand.exists(), (
        f"{bron_bestand} bestaat niet. Draai eerst build_paginas.py: dit script leest de balk, de "
        f"sprite en de voetlijst uit een al gegenereerde pagina.")
    bron = bron_bestand.read_text(encoding="utf-8")

    kop_i, kop_j = bron.find('<meta name="theme-color"'), bron.find("</head>")
    body_i, main_i, main_j = bron.find("<body>"), bron.find('<main id="top" tabindex="-1">'), bron.rfind("</main>")
    assert 0 < kop_i < kop_j and 0 < body_i < main_i < main_j, (
        f"De opbouw van /{BRON_ROUTE}/ is veranderd; dit script vindt zijn ankerpunten niet meer.")

    boven = bron[body_i:main_i].replace(
        "<!-- lege pagina, gegenereerd door _werk/build_paginas.py -->\n", "")
    return bron[kop_i:kop_j].rstrip(), boven, bron[main_j:]


def _main_blok():
    blokken = []
    for kop, rijen in LINKS:
        regels = "\n".join('        <li><a href="%s">%s</a></li>' % (u, t) for u, t in rijen)
        blokken.append('    <section class="jur__blok">\n'
                       '      <h2>%s</h2>\n'
                       '      <ul class="jur__lijst">\n%s\n      </ul>\n'
                       '    </section>' % (kop, regels))
    tabel = ", ".join('"%s": ["%s", "%s"]' % (oud, nieuw, naam)
                      for oud, (nieuw, naam) in OUDE_ADRESSEN.items())
    return '''<main id="top" tabindex="-1">
<section class="pk">
  <div class="wrap">
    <nav class="pk__kruim" aria-label="Kruimelpad">
      <ol>
        <li><a href="/">Home</a></li>
        <li><span aria-current="page">Pagina niet gevonden</span></li>
      </ol>
    </nav>
    <h1>Deze pagina bestaat niet</h1>
  </div>
</section>
<section class="jur" aria-label="Verder op deze site">
  <div class="wrap">
    <div class="jur__intro">
      <p>U volgde een link of typte een adres dat wij niet kennen. Misschien is de pagina
        verhuisd, misschien staat er een tikfout in het adres. Hieronder staat waar bezoekers
        meestal naartoe willen. Komt u er niet uit, bel dan 077 - 32 32 100 of mail
        <a href="mailto:info@de-kievit.nl">info@de-kievit.nl</a>, dan wijzen wij u de weg.</p>
      <p id="oud-adres" hidden></p>
    </div>
%s
    <section class="jur__blok">
      <h2>Meteen iets regelen</h2>
      <p>Vraag een gratis en vrijblijvende offerte aan, of stuur ons foto&#39;s van uw woning
        voor een eerste prijsindicatie.</p>
      <p class="pk__knoppen">
        <a class="btn btn--goud btn--lg" href="/#offerte"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte aanvragen</a>
        <a class="btn btn--wa btn--lg btn--groen" href="%s" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>App ons de foto&#39;s</a>
      </p>
    </section>
  </div>
</section>
<script>
// Aanwijzing bij een adres dat ooit bestond. Geen redirect: de pagina blijft een 404.
(function(){
  var OUD = {%s};
  var doel = OUD[location.pathname.replace(/\\/?$/, "/")];
  if (!doel) return;
  var p = document.getElementById("oud-adres");
  p.innerHTML = "Zocht u <b>" + doel[1] + "</b>? Die pagina staat nu op " +
                "<a href=\\"" + doel[0] + "\\">" + doel[0] + "</a>.";
  p.hidden = false;
})();
</script>
''' % ("\n".join(blokken), WA, tabel)


def bouw_404():
    """Schrijft site/404.html. Idempotent: gelijke bron levert een gelijk bestand op.

    Schrijft niet opnieuw als de inhoud al klopt, zodat de mtime niet nodeloos verspringt in een
    werkkopie die door meerdere sessies tegelijk wordt bekeken. Geeft het pad terug.
    """
    assets, boven, onder = _stukken_uit_de_bron()
    head = ('<!doctype html>\n<html lang="nl">\n<head>\n'
            '<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<title>Pagina niet gevonden | De Kievit Verhuizingen</title>\n'
            '<meta name="robots" content="noindex, follow">\n'
            '%s\n</head>\n' % assets)
    html = head + boven.replace("<body>\n", "<body>\n" + STEMPEL, 1) + _main_blok() + onder

    if not (DOEL.exists() and DOEL.read_text(encoding="utf-8") == html):
        DOEL.write_text(html, encoding="utf-8")
    return DOEL


if __name__ == "__main__":
    pad = bouw_404()
    print("%s: %d bytes" % (pad.relative_to(SITE), pad.stat().st_size))
