# Website De Bresser (site/)

Website van De Bresser B.V. (Herastraat 9, Tilburg), voor www.debresser.nl. Gebouwd op de opzet van
een eerdere site; merk, inhoud en structuur zijn van De Bresser. Huisstijl:
`../brandbook-debresser/brandbook-de-bresser.html`, feiten: `../brandbook-debresser/bevindingen.md` §3,
paginaboom: `../sitemap-debresser/sitemap-de-bresser.md`.

## Opzet

- Alle HTML wordt GEGENEREERD door `_werk/build_paginas.py` (vanuit de repo-root:
  `python site/_werk/build_paginas.py`). Bronbestanden per pagina staan in `_werk/paginas/`
  (`home.html` is de homepage), menu, footer, vestigingen en plaatsen in `_werk/navigatie.py`.
  Een route komt pas in menu, footer en sitemap als hij in `navigatie.VRIJGEGEVEN` staat en zijn
  bron bestaat.
- CSS: de bron met commentaar is `_werk/style.css`; de bouw schrijft `assets/css/style.min.css`.
  Cachebuster `navigatie.BUSTER` bij ELKE css-wijziging bumpen.
- Lettertype Sora, zelf gehost in `assets/fonts/`. Merkbestanden in `assets/img/merk/`.
- Omleidingen van de oude debresser.nl-adressen staan in `vercel.json`.
- `_werk/` gaat niet mee met een deploy (`.vercelignore`).

## Formulier

Web3Forms, key in `navigatie.WEB3FORMS`. LET OP: die key bezorgt nog op de inbox van de vorige
site; De Bresser heeft een eigen key nodig voor info@debresser.nl.

## Lokaal

```
python site/_werk/devserver.py <poort> site
```
