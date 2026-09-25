# Sitebouw: subpagina's uit debresser.nl

Bouwt alle subpagina's (alles behalve `index.html`) opnieuw uit de live site.
De teksten, links, beelden, formulieren en FAQ's komen 1-op-1 van debresser.nl.
De opmaak gebruikt de componenten uit `css/style.css` met de merkboekkleuren van De Bresser.
Header, footer, CTA-band en de mobiele balk worden letterlijk uit `index.html` gehaald.
Pas ze dus daar aan en genereer daarna opnieuw.
De CTA-band staat op elke pagina vlak boven de footer, ook als de live pagina hem niet heeft
(kop met "je" of "u" volgens de toon van de pagina, zie `ctaVoorToon` in `bouw.cjs`).

## Bestanden

- `bouw.cjs` genereert de pagina's. Onderaan `NABEWERKING` staan de handmatige aanpassingen per pagina
  (onder andere `contact.html`: vlaggen en wereldbol bij Locaties). Die blijven zo staan na opnieuw genereren.
- `contact-kop.cjs` maakt van het eerste blok op `contact.html` de opzet van De Reus: telefoon, e-mail en een kaart
  van Oisterwijk links, het formulier met kantoorfoto rechts (CSS in `css/contact-kop.css`). Wordt vanuit
  `NABEWERKING` aangeroepen; los draaien kan met `node contact-kop.cjs ../../contact.html`.
- `diensten-overzicht.cjs` zet de vijf dienstoverzichten (`diensten-verhuizen`, `-opslag`, `-meubelprojecten`,
  `-gebouwbeheer`, `-assetmanagement`) om: aanbodknoppen worden genummerde fotokaarten (foto = pagina-hero van de
  doelpagina), werkwijze wordt genummerde stappen, het formulier een leadblock. Teksten en links blijven gelijk.
  CSS in `css/diensten-overzicht.css`. Wordt vanuit `NABEWERKING` aangeroepen.
- `duurzaam-initiatieven.cjs` voegt op `duurzaam-verhuizen.html` de kop "Samen werken aan een betere wereld" en de
  zeven initiatieven (live drie losse secties met icoontjes) samen tot één sectie met fotokaarten 01-07.
  CSS in `css/duurzaam-initiatieven.css`, foto's in `assets/img/duurzaam-initiatieven/`. Wordt vanuit `NABEWERKING` aangeroepen.
- `internationaal-europa.cjs` zet op `internationale-verhuizing.html` het blok "Internationale verhuizing binnen Europa"
  om naar tekst links en rechts een foto van een eigen wagen in een bergdorp, die links onder uit het kader komt, met een
  kaartje met de vlaggen van Nederland, België en Luxemburg. CSS in `css/internationaal-europa.css`. Wordt vanuit
  `NABEWERKING` aangeroepen; los draaien kan met `node internationaal-europa.cjs ../../internationale-verhuizing.html`.
- `parse.js` zet live Elementor-HTML om in blokken. Overgenomen uit `docs/tools/live-sync/build.js` van
  github.com/OranjeLift-Tech/debresser, aangevuld met blogoverzichten en het team op over-ons.
- `site.js` bevat de koppeling van live URL naar lokaal bestand (`/verhuizen/` wordt `diensten-verhuizen.html`).
- `pariteit.cjs` vergelijkt per pagina de tekst met debresser.nl en schrijft `pariteit.txt`.

## Gebruik

Nodig: Node 18 of nieuwer, en `npm i cheerio` in deze map.

```sh
# 1. live pagina's ophalen (naar ./live)
node haal-live.cjs

# 2. repo met hero-foto's en beelden ernaast zetten (naar ./ol-debresser)
git clone --depth 1 https://github.com/OranjeLift-Tech/debresser.git ol-debresser

# 3. alles bouwen, of een paar pagina's
node bouw.cjs
node bouw.cjs --only=contact.html,faq.html

# 4. controleren of de tekst gelijk is aan debresser.nl
node pariteit.cjs
```

Stand 24 september 2026: 114 pagina's, geen ontbrekende zinnen. De enige meldingen zijn interfaceteksten
(pijltjes van de paginering, "Kies bestand" van het uploadveld, de schermlezertekst van de teamslider).
