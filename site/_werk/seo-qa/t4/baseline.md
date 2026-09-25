# T4 baseline De Kievit

Onafhankelijke nulmeting, Fase 0 van het masterplan. Opgesteld door Terminal 4.
Peilmoment: **30 augustus 2026, 00:24-00:29**, git HEAD `27287ea5`, BUSTER `20260830-0010a`.

Dit document legt vast wat er WAS voordat er aan het masterplan werd gewerkt. Elke afwijking
hierna is een blocker tenzij hij verklaard en aangekondigd is.

## Hoe dit gemeten is, en waarom niet met bestaand gereedschap

Alle cijfers hieronder komen uit instrumenten die ik zelf heb geschreven en zelf heb geijkt. Ik
heb geen cijfer van Terminal 1, 2 of 3 overgenomen. Waar mijn getal van het hunne afweek, staat
de verklaring erbij.

Twee stukken bestaand gereedschap heb ik bewust NIET als bron gebruikt:

- `_werk/verify_http.py` heeft de 34 routes hard in een lijst staan. Wie daarmee telt, bevestigt
  de lijst van T1 per constructie: een route die T1 vergeten is, ontbreekt dan ook in de controle.
  Mijn routes komen uit drie bronnen die niets van elkaar weten (bestandssysteem, link-crawl
  vanaf `/`, en wat `navigatie.py` zelf uitspreekt). Ze gaven alle drie hetzelfde antwoord.
- De crawler en baseline die een subagent van Terminal 1 in deze map had achtergelaten. Als het
  instrument uit het kamp komt dat ik moet toetsen, wordt hun blinde vlek mijn blinde vlek. Die
  bestanden staan nu in `_werk/_t1-scratch/` en zijn gebruikt als tweede paar ogen: waar wij
  onafhankelijk hetzelfde vonden, staat dat als bevestiging vermeld.

## Wat op deze machine NIET te meten is

De dev-server is Vercel niet. `_werk/devserver.py` is een kale `SimpleHTTPRequestHandler` met een
gzip-laag: hij verzint geen redirect en heeft geen 404-pagina. De volgende punten staan daarom als
**NIET MEETBAAR** en uitdrukkelijk niet als PASS, want een groene meting op de verkeerde machine
is geen bewijs:

redirects en ketens, voorkeursdomein en HTTPS, trailing-slashbeleid, echte 404-afhandeling,
`X-Robots-Tag`-headers, preview-noindex, CDN-gedrag en CrUX-velddata.

`/contact` (zonder slash) en `/CONTACT/` geven hier allebei 200. Dat is gedrag van deze
Python-server en zegt niets over Vercel. Op productie moet dit opnieuw.

## De vastgezette telling

Dit zijn de getallen waarop later een blocker wordt vastgesteld.

| | |
|---|---|
| routes | **34**, alle 34 status 200 |
| indexeerbaar | **23** |
| noindex | **11** (`noindex, nofollow`, de elf services) |
| canonicals | **0** |
| meta-description | **1** (alleen `/`) |
| JSON-LD-blokken | **1** (alleen `/`, type `MovingCompany`, 0 `@id`) |
| assets | **226**, alle 226 status 200 |
| titles | 34/34 aanwezig, 0 duplicaten, 1 boven 60 tekens |
| h1 | 34/34 precies een |

Let op de samenstelling van die 23: **1 route draagt `index, follow` (de homepage) en 22 dragen
helemaal geen meta-robots**. Ze zijn dus indexeerbaar bij gebrek aan richtlijn, niet bij besluit.
Voor de centralisatie in Fase 2 is dat het eigenlijke werk.

`robots.txt`, `sitemap.xml`, `llms.txt` en `favicon.ico` geven alle vier **404**.
`vercel.json` bestaat niet.

## Twee bereikbaarheidsdefinities, en waarom ze uit elkaar moeten

Dit is het belangrijkste punt van de baseline. Er zijn twee metingen die allebei juist zijn en
tegengestelde uitkomsten geven:

| meting | uitkomst |
|---|---|
| **crawlbereikbaarheid**, globale navigatie meegeteld | **34/34 bereikbaar, 0 wezen, 0 dode interne links** |
| **contextuele bereikbaarheid** vanaf `/`, alleen links binnen `<main>` | **1/34** |

Gate F4 eist "nul orphan indexable pages" en stuurt daarmee op de eerste. Fase 4 gaat over de
contextuele linkgraaf en stuurt op de tweede. Wie ze door elkaar haalt, verklaart Gate F4 groen op
de verkeerde meting.

De oorzaak van die 1/34 is scherper dan "de site heeft geen interne links". Alle 34 routes hebben
minstens een inkomende contextuele link (`/diensten/` 12, `/over-ons/` 9, `/verhuischecklist/` 9,
`/klachtenregeling/` 9). De graaf bestaat. Wat stuk is, is uitsluitend het beginpunt:

> **De homepage heeft 22 `<a>` binnen `<main>` en daarvan wijst er nul naar een interne route.**
> Het zijn 6x `wa.me`, 5x `tel:`, 4x Klantenvertellen, 4x `#offerte`, 2x Erkende Verhuizer en
> 1x `mailto:`. Van de kernlinkgraaf uit het masterplan (`/` naar diensten, werkwijze, over-ons,
> klantervaringen, contact) bestaat **0 van 5**.

Een traversal vanaf `/` sterft dus bij de eerste stap. Dat is een gerichte reparatie op een
pagina, geen sitebrede herbouw.

## Duplicatie: het zwaarste cijfer

**Alle 55 paren tussen de 11 servicepagina's scoren Jaccard 1,000 op zichtbare hoofdinhoud.**
Niet "bijna gelijk": woordelijk gelijk. Handmatig nagelopen op `/piano-verhuizen/` tegen
`/kantoorverhuizing/`: 47 inhoudseenheden elk, unified diff geeft nul verschilregels. Het enige
wat de elf pagina's onderscheidt is `<title>` en `<h1>`.

De Fase 3-gate van maximaal 85% gelijkenis wordt door alle 55 paren geschonden met de maximaal
mogelijke marge.

Meetverantwoording, want een 1,000 over de hele linie is normaal gesproken het teken dat de meting
stuk is en niet de site: gemeten op genormaliseerde H2/H3/P/LI/SUMMARY van minstens zes woorden
binnen `<main>`, met uitsluiting van nav, form, footer, header, trustbalk, offerte-overlay en
leadblock. Op de echte pagina is gecontroleerd dat de gedeelde CTA-teksten er ook werkelijk uit
vallen. Twee andere terminals kwamen langs andere methoden op hetzelfde uit (exacte
eenhedentelling: nul eigen eenheden op `/piano-verhuizen/`; ruwe bestandsdiff: 28 verschilregels
op 67 kB).

Wel dienstspecifiek zijn de **foto's in de staart**: elke service heeft 2 tot 3 eigen platen
(`par-*`, `pia-*`, `zor-*`). De tekst niet.

## Toegankelijkheid en mobiel

Statische pas over alle 34 routes:

| | |
|---|---|
| `lang="nl"` | 34/34 |
| viewport-meta | 34/34 |
| skiplink + `<main id>` | 34/34 |
| afbeeldingen zonder `alt`-attribuut | **0** van 912 |
| routes met een overgeslagen kopniveau | **0** |
| formuliervelden zonder label | **0** van 734 |
| knoppen zonder toegankelijke naam | **0** |
| `tabindex` groter dan 0 | **0** |
| horizontale overflow op 390px | **0** van 34 routes |

Dit is een schoon resultaat, en het kostte drie correcties aan mijn eigen instrument om er te
komen. Zie "Fouten in mijn eigen meting" hieronder.

**Nog niet gemeten en dus geen PASS**: kleurcontrast, focusvolgorde, toetsenbordbediening,
foutmeldingen in de formulierflow en schermlezergedrag. Die vragen een gerenderde layout en
interactie; een groene statische uitkomst zou daar een vals gevoel van dekking geven.

## Performance

LCP, mobiel 390px, met het mobiele profiel van Lighthouse (4x CPU-rem, traag-4G: 1,6 Mbit down,
150 ms RTT), drie runs per sjabloon, mediaan:

| route | LCP | spreiding |
|---|---|---|
| `/klantervaringen/` | 1244 ms | 1236-1244 |
| `/piano-verhuizen/` | 1348 ms | 1344-1348 |
| `/m3-calculator/` | 1440 ms | 1432-1468 |
| `/` | 1620 ms | 1616-1624 |
| `/contact/` | 2424 ms | 2420-2436 |
| `/diensten/` | 2464 ms | 2452-2472 |

Alle zes onder de drempel van 2500 ms, maar `/diensten/` en `/contact/` zitten er met 36 en 76 ms
tegenaan. De spreiding is onder 50 ms, dus de meting is stabiel.

**Lees dit als een ondergrens, niet als een voorspelling.** Het is een LABwaarde op een
dev-server: geen CDN, geen echte afstand tot de server, geen concurrentie op de lijn. Op productie
komt er latentie bij, nooit af. De eerste ronde zonder rem gaf 60-76 ms; dat getal is als groen
rapporteren misleidender dan niet meten, en is daarom vervangen.

## Formulieren

De Web3Forms `access_key` staat op **28 routes** op de placeholder `VERVANG-DOOR-ECHTE-KEY`. Dat
is de enige echte productieplaceholder op de site: gezocht op zichtbare tekst en op HTML-
commentaar naar TODO, FIXME, LOREM IPSUM, VERVANG-DOOR en "wordt nog gebouwd" leverde **0**
treffers op.

Een eind-tot-eindtest van het formulier is daarmee **niet uitvoerbaar**. Status: `USER_EXTERNAL`.

## Bevindingen

Ernst: BLOCKER blokkeert productie, HOOG blokkeert de betreffende gate, LAAG is een verbeterpunt.

| nr | ernst | bevinding | eigenaar |
|---|---|---|---|
| B-001 | BLOCKER | Web3Forms-key is een placeholder op 28 routes; geen eind-tot-eindtest mogelijk | gebruiker (USER_EXTERNAL) |
| B-002 | ~~BLOCKER~~ GESLOTEN | Voorkeursdomein. **Besloten door de gebruiker**: eerst `de-kievit.nl` zonder www geantwoord, daarna gecorrigeerd naar "doe www. via vercel". Dus `https://www.de-kievit.nl` met apex-redirect. Doorgevoerd in 23 canonicals, 23 `@id`'s, sitemap, robots.txt en de redirect. Bron: gebruiker, niet een terminal | gebruiker (USER_EXTERNAL) |
| B-003 | BLOCKER | 55 van 55 serviceparen op Jaccard 1,000; elf pagina's met identieke hoofdinhoud | T2 |
| B-004 | ~~HOOG~~ GESLOTEN | `robots.txt` en `sitemap.xml` bestaan niet (404). Opgelost: beide 200, sitemap 23 URL's identiek aan de verzameling canonicals, 0 WIP-diensten, robots blokkeert de WIP-routes bewust niet | T1 |
| B-005 | ~~HOOG~~ GESLOTEN | 0 canonicals op 23 indexeerbare routes. Opgelost: 23/23 precies een juiste canonical, 0 op een noindex-route. Staat wel op de aanname uit B-002 | T1 |
| B-006 | HOOG | 1 meta-description op 34 routes | T1 / T2 |
| B-007 | ~~HOOG~~ GESLOTEN | Homepage had 0 uitgaande contextuele links en 0 van 5 kernlinkgraaf-verbindingen. Opgelost en op eigen meting bevestigd: 5 uitgaande, kernlinkgraaf 5/5, contextuele bereikbaarheid vanaf `/` van 1/34 naar **34/34**, nul routes zonder inkomende en nul zonder uitgaande contextuele link, 245 links totaal (7,2 per route) | T1 / T2 |
| B-015 | HOOG | Slechts **4 van de 11 diensten** hebben drie of meer inkomende contextuele links. Fase 4 eist er minimaal drie per gepubliceerde service en het atomaire release-item eist activering ervan. Zeven diensten staan op 2 en kunnen dus niet vrijgegeven worden, hoe goed hun tekst ook is | T2 |
| B-016 | HOOG | **Vijf dienstpagina's zijn hun eigen dienstfoto's kwijtgeraakt** bij het herschrijven: senioren, opslag, zorg, piano en antiek dragen geen enkele `<slug>-N`-foto meer. Particulier ging van drie naar een (alleen `par-3`), inpakservice idem (`inp-3`). Het gaat om beeld dat Shahab zelf per dienst heeft gekozen (commit 6c4f35a). In `assets/img` liggen nu 81 van de 201 bestanden ongebruikt | T2 / T1 |
| B-008 | MIDDEL | 22 van de 23 indexeerbare routes hebben geen expliciete meta-robots | T1 |
| B-009 | ~~MIDDEL~~ GESLOTEN | JSON-LD op 1 route, 0 `@id`. Opgelost: 23 blokken, 0 onparsebaar, 0 op noindex, precies een `#bedrijf`, rechtspersoon (`#organisatie`) en vestiging (`#bedrijf`) gescheiden, alle waarden komen voor in de zichtbare HTML | T1 / T3 |
| B-010 | LAAG | `/sitemap/` linkt naar 11 noindex-WIP-services; masterplan wil daar alleen publiceerbare routes | T1 |
| B-011 | LAAG | `/algemene-voorwaarden/`, `/certificeringen/` en `/privacybeleid/` bevatten elk een commerciele servicelink; masterplan wil juridische bronkopieen niet vervuilen | T3 |
| B-012 | LAAG | `favicon.ico` geeft 404 | T1 |
| B-013 | ~~HOOG~~ GESLOTEN | `vercel.json` stond in de repo-root, niet in `site/`. Verplaatst naar `site/vercel.json`; werking blijft NIET MEETBAAR tot de eerste deploy. De Root Directory moet `site/` worden (repo-root heeft geen `index.html` of `assets/`, en alle paden zijn absoluut), en dan negeert Vercel dit bestand: geen apex-redirect, geen `trailingSlash`, geen cache-immutable, geen van de zes securityheaders. Valt niet op als fout, want de site werkt gewoon door | T1 |

### Opgelost tijdens Fase 0

- **F0-001** (proces): `seo-qa/` bevatte bij overdracht artefacten van een subagent van T1,
  waaronder een `baseline.md` onder mijn naam. Herkomst herleid in het sessietranscript.
  Opgelost: subagents hard gestopt, bestanden verplaatst naar `_werk/_t1-scratch/`, map is nu
  exclusief van T4.
- **F0-002**: `VRIJGEGEVEN` zonder inhoudseis kon een lege pagina publiceren. Aangetoond in een
  wegwerpkloon. T1 heeft de regel aangescherpt naar `vrijgegeven EN inhoud`.

### Geen bevinding, wel een besluit om te herzien

De elf servicepagina's delen dezelfde hero: `hero-zor-1920.webp`, met een alt-tekst die
uitdrukkelijk een zorginstelling beschrijft. Dat is **geen generatorfout**. `_werk/dienstfotos.py`
r15 legt vast: *"Shahab, 29-08-2026: ALLE dienstpagina's krijgen dezelfde hero, de zorgfoto"*, en de
elf eigen hero's (`hero-par`, `hero-pia`, ...) liggen bewust ongebruikt in `assets/img`.

Ook geen WCAG-fout: de alt beschrijft de afbeelding correct, want het IS die foto.

Wat het wel raakt is de Fase 3-gate "een onbekende tester benoemt binnen drie seconden dienst,
doelgroep en hoofdactie". Een foto van een zorgverhuizing boven de vouw op `/piano-verhuizen/`
werkt daartegen. De vervangende platen bestaan al. Dit is een besluit van de gebruiker en gaat
niet als defect naar een terminal; het hoort opnieuw op tafel bij Fase 3.

## Fouten in mijn eigen meting

Vijf keer meldde mijn instrument iets wat niet waar was. Vier daarvan gevonden voordat ze in een rapport
kwamen; de vijfde niet, die stond al in een afgegeven oordeel en is door T1 gemeld. Alle vijf nu
vastgelegd als ijkcase in de vorm van de echte bron.

1. **Uitsluiting op losse substring.** `"lf" in class` sloot ook `zelfstandig` en `halfvol` uit.
   Op deze site toevallig zonder schade, maar de val gaat pas af als iemand later een onschuldige
   klasse toevoegt, en dan geruisloos. Nu op hele class-namen plus BEM-kinderen.
2. **485 van 734 velden "zonder label".** Vals: elk veld staat binnen een `<label>`. Impliciete
   labeling is even geldig als `for=`. Werkelijke uitkomst: 0.
3. **34 knoppen "zonder naam".** Vals: het is een `<button class="drawer__scrim" tabindex="-1"
   aria-hidden="true">`, met opzet uit de toegankelijkheidsboom. Werkelijke uitkomst: 0.
4. **231 TODO/placeholder-treffers.** Vals: `placeholder` is het HTML-attribuut en "Vul in" is
   Nederlandse knoptekst. Een markerzoeker die de opmaak meeneemt, meet de taal van HTML en niet
   de staat van de site. Nu alleen op zichtbare tekst en op commentaar. Werkelijke uitkomst: 0.

5. **De capsule-eis mat nooit een capsule.** `capsule()` nam blind de eerste inhoudseenheid, en
   die is niet altijd de capsule. Twee kanten op fout: op `/kantoorverhuizing/` las hij de H2 van
   negen woorden en zou hij FAIL melden op een pagina met een correcte capsule van 58 woorden; op
   de tien routes zonder eigen inhoud las hij het GEDEELDE "waarom"-blok van 72 woorden en
   rapporteerde dat tien keer als "de capsule". Het masterplan zegt "direct onder de relevante
   H1/H2", dus een kop ervoor is toegestaan; de poort strafte een opzet af die het plan expliciet
   toelaat. **Dit raakte een oordeel dat al was afgegeven**: de PASS op `/kantoorverhuizing/` van
   01:0x noemde "capsule 44 woorden", en die 44 woorden waren de gedeelde USP-alinea, niet de
   capsule van de schrijver. Gemeld door T1, niet zelf gevonden. Nu slaat `capsule()` koppen over,
   en de ijkcase zet met opzet een H2 op plek 0 en eist dat de meting daar niet in trapt.

Daarnaast twee tellingen die niet fout maar onvolledig waren: assets (216 -> 226, ik pakte alleen
de eerste srcset-kandidaat en alleen `rel=stylesheet`, waardoor een kapotte `-1920.webp` nooit zou
opvallen), en LCP zonder rem (60-76 ms, betekenisloos).

## Instrumenten

Alle vier hebben een `--ijk`-modus die elke controle op moedwillig kapotte invoer draait en eist
dat hij omslaat. Een controle die niets KAN vinden bewijst niets.

| bestand | doet |
|---|---|
| `t4_baseline.py` | routes, status, indexability, meta, links, schema, assets, duplicatie |
| `t4_parity.py` | outputdelta per route: sha256 plus h1, title, hero-desktop, hero-mobiel, hero-alt, robots |
| `t4_statisch.py` | toegankelijkheid, formulieren, placeholders |
| `t4_mobiel.mjs` | 390px overflow en LCP via CDP |

Bij `t4_parity.py` wisselt de ijkcase met opzet ALLEEN de desktopplaat en eist dat de controle
omslaat, plus een tweede eis dat de mobiele bron daarbij aantoonbaar ongewijzigd bleef. Dat is de
val waar T1 zelf in liep: wie alleen de mobiele `<source>` leest, mist juist het beeld dat de
bezoeker krijgt. Bij elf pagina's die op `<title>` en `<h1>` na woordelijk gelijk zijn, glipt een
verwisseling van twee services anders door elke oppervlakkige vergelijking heen.

## Stand na Fase 0 en de eerste technische ronde

Na de baseline zijn drie aangekondigde wijzigingen van T1 geverifieerd.

**Service-extractie: PARITY PASS.** 34 van 34 routes byte-identiek, noindex 11 voor en na. Eerst
vastgesteld dat de build echt gedraaid heeft (alle 34 outputs mtime 00:32), want "34 hashes gelijk"
kan ook betekenen dat er niets is gebeurd en dan certificeer je een build die nooit liep.
Tegenproef van de noindex-ontkoppeling in een wegwerpkloon, vier gevallen: inhoud zonder
vrijgave houdt `noindex, nofollow`; vrijgave haalt hem weg en brengt het totaal op 10; de hub
`/diensten/` blijft in alle gevallen indexeerbaar.

**Linkretarget: geverifieerd.** Van 981 href-instanties naar noindex-services naar **29**, van 374
routeparen naar 29, en de wrapper wijst er nul meer heen. Alle elf `d-<slug>`-ankers op
`/diensten/` bestaan werkelijk, dus er wordt niet naar een verzonnen fragment gelinkt. De delta op
`/contact/` is 56 regels en alle 56 bevatten een servicelink: nul onaangekondigde wijziging. Alle
11 servicepagina's bestaan nog en alle 34 routes geven 200.

De resterende 29 links staan in `<main>` op zes routes: `/diensten/` 11, `/sitemap/` 11,
`/veelgestelde-vragen/` 4, en een elk op `/algemene-voorwaarden/`, `/certificeringen/` en
`/privacybeleid/`. Zie B-010 en B-011.

**De contextuele graaf beweegt hier niet van mee**: `/` heeft nog steeds 0 uitgaande contextuele
links en de bereikbaarheid vanaf `/` blijft 1/34. B-007 staat open.


## Geverifieerde delta, Fase 2-ronde van T1

Aangekondigd en nagemeten. Alles PASS behalve B-013 hierboven.

- **Canonicals** 23/23 juist, 0 op noindex. **Sitemap** 23 `<loc>`, verzameling identiek aan de
  canonicals, 0 duplicaten, 0 WIP, 0 URL's zonder route. **robots.txt** 200 en blokkeert de elf
  WIP-routes bewust niet, want wat Google niet mag ophalen kan hij ook niet als noindex lezen.
- **Entitygraph** 23 blokken, 0 onparsebaar, 0 op een noindex-route, precies een `#bedrijf`, alle
  `@id`'s op `www.de-kievit.nl`. Geen FAQPage, HowTo, JobPosting, AggregateRating of Review, in
  lijn met het schemabesluit. De 22 tegen 23 BreadcrumbList is de homepage, die er terecht geen
  heeft. Schemawaarden komen voor in de zichtbare HTML (telefoon, Top Movers, De Bresser).
- **`/kantoorverhuizing/`** schoon: 0 treffers op de vier consumentenclaims, AVB 2020 / 50.000 per
  wagenzending / CMR aanwezig. Tegenproef op `/piano-verhuizen/`: daar staan ze er nog (2, 7, 1, 1),
  dus er is alleen kantoor geraakt en niet per ongeluk sitebreed geschrapt.
- **Duplicatie** van 78 paren boven 0,30 naar 55, en die 55 zijn exact de serviceparen. Van die 55
  staan er nog 45 op 1,000; de tien paren met kantoorverhuizing zijn gezakt.
- **FAQ-ontdubbeling** geverifieerd op vraagteksten: geen enkele vraag staat nog op drie of meer
  routes. Vijf vragen staan op precies twee routes, steeds `/` en `/veelgestelde-vragen/`, wat de
  bewuste homepage-uitzondering is. Dat blijft wel zes vragen woordelijk op twee indexeerbare
  routes en hoort als expliciet overlapbesluit in `intent-matrix.csv`, niet als "verwacht" in een
  rapportage.

Vijfde fout in mijn eigen meting, hier gevonden: ik telde eerst `<summary>`-elementen en zag 15
routes die er nog vijf of meer droegen, alsof het gedeelde blok niet verplaatst was. Dat telt de
uitklapper van de dozencalculator in het gedeelde leadformulier mee (`<details class="lfcalc">`,
op 27 routes). Een widget, geen FAQ. Op de vraagteksten meten gaf het juiste antwoord.


## Besluit van de eigenaar, 30-08-2026: geen klantcases

Shahab heeft de eis van een echte case per servicepagina laten vervallen ("vergeet dat verhaal"),
nadat T4 hem had voorgelegd als de enige openstaande blokkade op `/kantoorverhuizing/`.

Wat dit intrekt uit de Fase 3-gate:
- "minimaal een controleerbaar firsthand-bewijs/case";
- "case-toestemming, anonimisering en intrekkingsroute zijn gedocumenteerd";
- de STAKEHOLDER PASS, die alleen gold waar een case of echte bedrijfsinformatie werd gebruikt.

De overige eisen blijven onverkort staan: 75 procent doelspecifiek, hoogstens 0,85 gelijkenis per
paar, antwoordcapsule 40-60 woorden, drie tot vijf route-eigen vragen, en de controles op claims,
links, schema, mobiel en formulier.

Gevolg dat hierbij hoort en dat niet verdwijnt door het besluit: de servicepagina's steunen voor
hun geloofwaardigheid nu volledig op de gedeelde signalen (reviewcijfer, keurmerken, voorwaarden)
en op de vakinhoud zelf. Er staat op geen enkele dienstpagina een controleerbaar voorbeeld dat De
Kievit die specifieke dienst heeft uitgevoerd. Dat is een bewuste keuze van de eigenaar, geen
tekortkoming van een terminal, en T4 rapporteert er niet opnieuw over.

Een reviewcitaat blijft daarmee OOK geen oplossing en is geen alternatieve invulling: het citaat
uit `/kantoorverhuizing/` is verwijderd omdat onze eigen kopie afgekapt is en omdat toestemming
voor publicatie met naam en woonplaats ontbreekt. Beide redenen staan los van dit besluit.


## Besluit van de eigenaar, 30-08-2026: reviewcitaat met naam en plaats toegestaan

Rechtstreeks aan Shahab voorgelegd door T4 en door hem beantwoord: een Klantenvertellen-review
mag letterlijk op de dienstpagina's worden geciteerd, **met voornaam en woonplaats**. Daarmee
vervalt de USER_EXTERNAL-blokkade op reviewgebruik.

Bevestigd langs de eigenaar zelf en niet via de doorgeefketen, om dezelfde reden als bij B-002
(voorkeursdomein): een USER_EXTERNAL-item kan geen terminal sluiten, ook niet met drie schakels
ertussen.

Wat hiermee NIET is afgedaan, en wat T4 per citaat blijft toetsen:
- **volledigheid van de bron.** Systematische afkapping is uitgesloten: de lengteverdeling van de
  796 records toont geen piek op een limiet (langste 1121, de twaalf langste lopen vloeiend op) en
  nul records bevatten nog een `#`.
- **het restant in het enige afgekapte record.** `schoon()` haalde de hashtagregel weg maar liet
  een zwevende `⁹` staan: de tekst van Huub Hendrickx eindigt op `professionaliteit! ⁹`. Van de
  796 records is dat het enige met zo'n teken. Letterlijk citeren uit de opgeschoonde JSON zet dat
  teken op de pagina.
- **de regel in C15 zelf.** "Controleer dat de tekst op een hele zin eindigt" is niet bruikbaar:
  212 van de 796 records eindigen zonder leesteken en dat zijn gewone korte reviews. Die regel
  verwerpt een kwart van het corpus. De lengteverdeling discrimineert wel.
