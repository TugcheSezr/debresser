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

## Calculator en browsercache (vaste regel)

`vercel.json` geeft alles onder `/assets/` `Cache-Control: public, max-age=31536000, immutable`: een browser haalt
zo'n bestand een jaar lang niet opnieuw op. Daarom laadt elke calculatorpagina de calculatorbestanden met een
versie: `data-strings`, `data-strings-prive` en `data-inboedel` eindigen op `?v=<eerste 12 tekens van de sha256
van het bestand>`, net als `intl-m3.js` en `private-m3.js`.

Verander je een bestand in `assets/calculator/` of een calculatorscript, zet dan in dezelfde commit op alle
pagina's die het laden de nieuwe `?v=`. Anders zien terugkerende bezoekers, en jijzelf, tot een jaar de oude tekst
of de oude volumes. Controle: dit moet per bestand precies één versie tonen, gelijk aan de sha256 van dat bestand.

```
grep -rhoE 'calculator/[a-z-]+\.json\?v=[0-9a-f]+|[a-z-]+-m3\.js\?v=[0-9a-f]+' --include=index.html . | sort | uniq -c
```

Sinds 27-10-2026 zijn de calculatorteksten rechtstreeks in deze JSON-bestanden aangepast: geen liters, en
"bescherming" in plaats van "verpakking". De bronbestanden in het internationale dossier (`inhoud-ee/m3`,
ITEMDEFINITIES) hebben nog de oude teksten. Bouw de JSON dus niet opnieuw op uit die bronnen.

## Formulier

Web3Forms, key in `navigatie.WEB3FORMS`. LET OP: die key bezorgt nog op de inbox van de vorige
site; De Bresser heeft een eigen key nodig voor info@debresser.nl.

## Lokaal

```
python site/_werk/devserver.py <poort> site
```
