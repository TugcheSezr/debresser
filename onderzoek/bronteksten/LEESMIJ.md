# Herkomst van deze bronteksten

Alles in deze map is op 25 augustus 2026 opgehaald als bewijsmateriaal bij de hoofdstukken
een map hoger. Er is niets aan de inhoud veranderd.

## topmovers-nl/

De hele site topmovers.nl, langs twee wegen opgehaald:

- `pages/`, `posts/`, `vestigingen/`, `vacatures/`: de schone tekst per item uit de WordPress
  REST API (`wp-json/wp/v2/...`). Elk bestand begint met titel, URL, publicatiedatum,
  wijzigingsdatum en de Yoast meta title en description, daarna de inhoud: koppen als `#`,
  lijsten als `-`, links als `[tekst](url)`.
- `html/`: dezelfde 213 pagina's uit de HTML-crawl, dus inclusief menu, footer en onderaan de
  JSON-LD structured data. Hierin zitten ook de tag-, auteur- en rey-global-sections-pagina's
  die niet in de REST-sets voorkomen.
- `html-ruw/`: de onbewerkte HTML van de 49 pagina's die in de hoofdstukken worden aangehaald,
  nodig voor uitspraken over markup, CSS-klassen, formuliervelden en schema.
- `INDEX.md` geeft per bestand de titel en de URL, `urls.txt` de 213 URL's uit de sitemaps.
- `pdf/`: de documenten van topmovers.nl zelf, met tekstuittreksel (`.txt`).
- `css/`: de stylesheets, gebruikt voor kleuren, typografie en vormtaal.
- `api/`: de ruwe REST-antwoorden per contenttype.

Bestandsnaam = het URL-pad met `__` op de plaats van een `/`; `home` is de homepage. Veertien
bestanden uit de HTML-crawl hadden een `?` en een `=` in de naam (de rey-global-sections van het
thema); die tekens zijn uit de bestandsnaam gehaald zodat de repo op elk platform is uit te
checken. De URL in het bestand zelf is ongewijzigd.

Let op: `2025-02_IMG_0031.jpg` in de beeldbank heeft EXIF-orientatie 6. Dat staat los van deze map,
maar geldt bij het bewerken van dat beeld.

## voorwaarden-en-certificaten/, duurzaamheid/, ledensites/

Documenten en pagina's van derden die in de hoofdstukken 04, 05 en 06 worden aangehaald: de
voorwaardensets en certificaten (OEV, SKAO, NCI, De Bresser, De Kievit), de CO2-documenten van
Top Movers en de homepages van ledensites voor de co-brandingvergelijking. Elke PDF heeft waar
mogelijk een tekstuittreksel met dezelfde naam en de extensie `.txt`.

## kievit-faq/

Vier bestanden uit de repo `OranjeLift-Tech/kievit-faq` (het FAQ-onderzoek van 20 augustus 2026),
ongewijzigd overgenomen: `FEITEN-KIEVIT.md` van de root en `kievit-profiel-site.md`,
`kievit-profiel-extern.md` en `GAPS-A.md` uit `terminal-a/`. Ze staan hier zodat de verwijzingen
in de hoofdstukken te volgen zijn zonder die tweede repo.

## werkbestanden/ en werkbestanden-kievit/

Meetresultaten die als bron worden aangehaald: de postcoderoutering van topmovers.nl
(`postcode-map.tsv` en `postcode-kievit-fijn.tsv`, per postcode getest op de vestigingszoeker),
`vestigingen-rest.json`, de Wayback-kopieen in `wb/` waarop het ledenverloop in hoofdstuk 02
rust, en de bij hoofdstuk 07 opgehaalde kopieen van de-kievit.nl en debresser.nl.
