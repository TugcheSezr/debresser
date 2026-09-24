# Sitebouw: subpagina's uit debresser.nl

Bouwt alle subpagina's (alles behalve `index.html`) opnieuw uit de live site.
De teksten, links, beelden, formulieren en FAQ's komen 1-op-1 van debresser.nl.
De opmaak gebruikt de componenten uit `css/style.css` (Kievit-sjabloon, merkboekkleuren).
Header, footer, CTA-band en de mobiele balk worden letterlijk uit `index.html` gehaald.
Pas ze dus daar aan en genereer daarna opnieuw.
De CTA-band staat op elke pagina vlak boven de footer, ook als de live pagina hem niet heeft
(kop met "je" of "u" volgens de toon van de pagina, zie `ctaVoorToon` in `bouw.cjs`).

## Bestanden

- `bouw.cjs` genereert de pagina's. Onderaan `NABEWERKING` staan de handmatige aanpassingen per pagina
  (nu alleen `contact.html`: vlaggen en wereldbol bij Locaties). Die blijven zo staan na opnieuw genereren.
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
