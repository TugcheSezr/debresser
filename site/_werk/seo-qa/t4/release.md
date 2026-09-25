# T4 eindmeting, de elf dienstpagina's

Gemeten 30 augustus 2026 door Terminal 4, op eigen instrumenten, na de bouw van alle elf.
Dit is de bindende toets: doelspecifiek is een eigenschap van de verzameling, dus een losse
route zegt niets tot ze er alle elf staan.

## Uitslag: 11 van 11 halen de meetbare eisen

| route | eenheden | eigen | % | capsule | eigen vragen | marge |
|---|---|---|---|---|---|---|
| /kantoorverhuizing/ | 93 | 83 | 89% | 58 | 5 | 13 |
| /particulier-verhuizen/ | 121 | 94 | 78% | 52 | 5 | 3 |
| /inpakservice/ | 115 | 88 | 77% | 54 | 5 | 1 |
| /internationale-verhuizing/ | 117 | 90 | 77% | 60 | 5 | 2 |
| /montage-demontage/ | 112 | 85 | 76% | 55 | 5 | 1 |
| /seniorenverhuizing/ | 111 | 84 | 76% | 47 | 5 | 0 |
| /antiek-en-kunst-verhuizen/ | 108 | 81 | 75% | 48 | 5 | 0 |
| /inboedelopslag/ | 114 | 86 | 75% | 57 | 5 | 0 |
| /piano-verhuizen/ | 110 | 83 | 75% | 60 | 5 | 0 |
| /spoedverhuizing/ | 108 | 81 | 75% | 53 | 5 | 0 |
| /zorgverhuizing/ | 110 | 83 | 75% | 50 | 5 | 0 |

**Serviceparen boven 0,85: 0 van 55.** Bij de baseline stonden alle 55 op 1,000.

### De uitslag is behaald, maar hij is krap

Zes routes staan op marge nul en drie op een of twee. Doelspecifiek is een eigenschap van de
verzameling: één zin die straks op twee dienstpagina's terechtkomt, telt op allebei als
niet-eigen en laat er direct twee onder de 75 procent zakken. Alleen `/kantoorverhuizing/` heeft
met 13 werkelijke speelruimte.

Praktisch: **elke volgende tekstwijziging op een dienstpagina vraagt een hermeting van alle elf**,
niet van de gewijzigde route. Wie er één aanpast en alleen die meet, ziet de schade niet.

## Bevinding R-001 (MIDDEL, eigenaar T2): het proces is generiek op tien van de elf

Tien dienstpagina's dragen woordelijk hetzelfde stappenplan, hetzelfde als op de homepage:

> Neem contact op | Opname aan huis | Inpakken en verhuizen | **Thuis in uw nieuwe woning**

Alleen `/kantoorverhuizing/` heeft een eigen proces (Wie beslist | Wat wanneer uit de lucht gaat |
De route door beide panden | Wat er op dag een moet werken).

Dit is geen gate-fout: de duplicatie-eis wordt gehaald omdat die eenheden als gedeeld meetellen en
de routes daar overheen komen. Het is wel dezelfde categorie fout die op kantoorverhuizing net is
hersteld, namelijk een consumentenbelofte op een route waar hij niet klopt. Op twee routes is de
tekst feitelijk onjuist:

- **`/inboedelopslag/`**: de reis eindigt in een opslagunit, niet thuis in een nieuwe woning, en
  "Inpakken en verhuizen" beschrijft de opslagstroom niet.
- **`/montage-demontage/`**: bij losse montage of demontage is er vaak helemaal geen verhuizing
  naar een nieuwe woning.

Op `/zorgverhuizing/` en `/antiek-en-kunst-verhuizen/` is het discutabel (een zorgverhuizing
eindigt doorgaans in een zorgkamer). Op de overige zes is het generiek maar niet onjuist.

Het masterplan eist per service "concreet proces, team, materieel en competentiegrenzen" en dat
een onbekende tester binnen drie seconden dienst en hoofdactie benoemt. Een generiek
consumentenproces werkt daartegen, ook waar het niet feitelijk fout is.

## De rest van de site

| | |
|---|---|
| routes | 34, alle 34 status 200 |
| indexeerbaar / noindex | 23 / 11 |
| canonicals | 23, exact de indexeerbare routes, 0 op een noindex-route |
| descriptions | 23, uniek, 0 afgekapt |
| JSON-LD | 23 blokken, 0 onparsebaar, 0 op noindex, precies een `#bedrijf` |
| sitemap | 23 URL's, identiek aan de verzameling canonicals |
| assets | 225, alle 225 status 200 |
| interne links | 0 dood, 0 wezen, bestandssysteem en link-crawl allebei 34 |
| duplicatieparen boven 0,30 | **0** (was 78 bij de baseline) |
| toegankelijkheid | 0 afbeeldingen zonder alt op 1.095, 0 kopniveausprongen, 0 velden zonder label op 720, 0 knoppen zonder naam, 0 positieve tabindex |
| mobiel 390px | 0 van 34 routes met horizontale overflow |
| stappenrooster | 17 pagina's x 3 breedtes plus zichtbaarheid, 0 fouten |
| navigatie | navtest groen |
| dienstfoto's | alle elf dragen hun eigen beeld, 0 dubbelingen op img-tag-niveau |
| stappenplan | 1 per dienstroute, geen tweede gedeeld blok meer |

LCP mobiel, Lighthouse-profiel (4x CPU-rem, traag-4G), drie runs, mediaan: `/klantervaringen/`
1256, `/piano-verhuizen/` 1264, `/m3-calculator/` 1444, `/` 1632, `/diensten/` 1796,
`/contact/` 2432 ms. Alle zes onder 2500. **Labwaarde op een dev-server**: geen CDN, geen echte
afstand tot de server. Ondergrens, geen voorspelling.

## Wat productie nog blokkeert

- **B-001, BLOCKER**: de Web3Forms-key staat op 27 routes op `VERVANG-DOOR-ECHTE-KEY`. Geen
  eind-tot-eindtest mogelijk. USER_EXTERNAL, alleen de eigenaar kan dit leveren.
- **B-006, klein**: vijf descriptions staan boven het eigen plafond van 158 tekens (`/`,
  `/erkende-verhuizer/` 162, `/inpaktips/` 162, `/privacybeleid/` 173, `/klantervaringen/` 174).
- **NIET MEETBAAR tot de eerste deploy**: apex naar www als 301 zonder keten, `trailingSlash`,
  de zes securityheaders, cache-immutable op /assets/, echte 404-afhandeling, `X-Robots-Tag` en
  preview-noindex. `site/vercel.json` staat op de goede plek, maar dat een configuratie er staat
  is niet hetzelfde als dat hij werkt.

## Oordeel

**QA PASS op de elf dienstpagina's**, voorwaardelijk zoals hierboven beschreven: de marges zijn
krap en R-001 staat open.

**NO-GO voor productie**, uitsluitend op B-001. Dat is geen tekortkoming van een terminal maar
een ontbrekende sleutel. Een tussentijdse publicatie moet volgens het masterplan expliciet
`PARTIAL/NO-GO FOR FULL SEO` heten.

Bij vrijgave van een route toetst T4 het atomaire release-item afzonderlijk: noindex weg,
canonical aanwezig en juist, opgenomen in de sitemap, **de hubankers `/diensten/#d-<slug>` echt
omgeklapt naar de service-URL**, drie werkelijke inkomende contextuele links, uitgaande links
actief, schema kloppend en live 200. Tot die omklap is een hubanker een belofte en geen link.


## Slotverificatie op de gepushte staat, 30-08-2026

Geverifieerd op commit `2256802`, werkboom schoon, HEAD gelijk aan `origin/main`. Niet gedeployd.

Na `4231645` (R-001 op twee routes plus de descriptions) en `2256802` (de description van
`/inpaktips/`):

- **11 van 11 diensten PASS**, serviceparen boven 0,85 nog steeds **0 van 55**.
- R-001 uitgevoerd op `/inboedelopslag/` en `/montage-demontage/`: het onjuiste consumentenproces
  is weg en er is niets voor in de plaats verzonnen. Beide routes gingen erdoor VOORUIT, van 75
  naar 79 en van 76 naar 79 procent, want er verdwenen alleen gedeelde eenheden. Daarmee staan er
  nog vier routes op marge nul in plaats van zes.
- Descriptions: 23 uniek, **0 te lang, 0 afgekapt**. De laatste twee reparatieronden zaten elk
  een fout in de staart: eerst een knip middenin een driedelige opsomming op `/inpaktips/`, daarna
  een hele zin die opende met een terugverwijzing op `/klantervaringen/`. Beide gevangen voordat
  ze bleven staan.
- Invarianten: 34 routes 200, 23 canonicals, 23 JSON-LD, 225 assets alle 200, nul dode links,
  nul wezen, duplicatieparen boven 0,30 **nul**.

**Eindstand: QA PASS op de elf dienstpagina's. PARTIAL / NO-GO FOR FULL SEO**, met B-001 (de
Web3Forms-key) als enige reden. Dat is een ontbrekende sleutel van de eigenaar en geen
tekortkoming in het werk.

Openstaand voor T4 zodra de key er is: het atomaire release-item per route, en de punten die op
een dev-server niet meetbaar zijn (apex naar www als 301 zonder keten, `trailingSlash`, de zes
securityheaders, cache-immutable op /assets/, 404-afhandeling, `X-Robots-Tag`, preview-noindex).


## Live-verificatie na de eerste deploy, 30-08-2026

`https://de-kievit.vercel.app`, commit `f8ecd6e`. Zes van de zeven punten die op een dev-server
niet meetbaar waren, zijn hier alsnog gemeten en goed bevonden:

| punt | uitkomst |
|---|---|
| zes securityheaders | alle zes aanwezig |
| cache-immutable op /assets/ | `public, max-age=31536000, immutable` |
| trailingSlash | `/piano-verhuizen` -> **308** naar de slash-variant |
| 404-afhandeling | `/bestaat-niet-t4/` -> **404** |
| X-Robots-Tag | `noindex, nofollow` op de vercel.app-host |
| preview-noindex | zelfde mechanisme |
| apex naar www | **NIET TE METEN**, `www.de-kievit.nl` is nog niet gekoppeld |

Hubankers: nul `/diensten/#d-` over op de veertien gecontroleerde routes. `ankers_omklappen()`
werkt. Dat gat was reëel: veertien contextuele links stonden met de hand in de bronbestanden,
buiten het bereik van `toon_href()`, en zonder de omklap waren acht van de elf diensten hun derde
inkomende link kwijt geweest bij een vrijgave die er groen uitzag.

### B-001 is live gegaan en is niet opgelost

**27 van de 34 live routes dragen `VERVANG-DOOR-ECHTE-KEY`.** Een ingevuld offerteformulier komt
nergens aan. Wat wél is vastgesteld: de key is de placeholder en geen geldige sleutel. Wat NIET is
vastgesteld: de precieze foutmelding die de bezoeker ziet. Een server-side POST naar Web3Forms
wordt op de methode geweigerd en niet op de key, en headless bewijst hier niets; dat vraagt een
headful test zodra de echte key er is.

**Wat de bezoeker ziet is nagemeten en het is niet stil.** Gecontroleerd in de live `kievit.js`
(regels 70-91): er zijn precies twee uitgangen, `if(!res.success)return mis()` en `.catch(mis)`,
allebei naar dezelfde `mis()`, die de knop herstelt en het foutvak toont. Het bedankpad zit
daarachter en vereist `res.success===true`, wat met een placeholder niet kan. De bezoeker leest
dan, uit de live HTML: *"Het versturen is niet gelukt. Bel ons op 077 - 32 32 100 of mail naar
info@de-kievit.nl."*, in een `<p role="alert">`, dus ook hoorbaar voor een schermlezer.

Dat maakt het **degraded en eerlijk, niet stil**. Een eerdere formulering in dit rapport ("weg
zonder dat iemand het merkt") was te breed: dat geldt voor de aanvraag, want er is geen
foutrapportage die bij De Kievit terechtkomt, maar niet voor de bezoeker. Telefoon, WhatsApp en
mailto staan bovendien op elke pagina, en de vercel.app-URL is nergens gelinkt.

Methodische noot: dit is een RENDERvraag en geen key-vraag. Uit een mislukte verzending in een
testbrowser mag je niets concluderen over de key of de domeinkoppeling (zie
`feedback_web3forms_headless_test`), maar wel welk vak zichtbaar wordt. De succeskant is hiermee
niet aangetoond en kan alleen headful met de echte key.

### De volgorde is nu het risico

Er zit precies één ding tussen deze site en Google: `X-Robots-Tag: noindex, nofollow` op de
vercel.app-host. Ondertussen draagt de HTML op alle 34 routes `index, follow`, staan alle 34 in de
sitemap en zijn de elf diensten vrijgegeven.

**Koppel `www.de-kievit.nl` niet voordat de Web3Forms-key erin staat.** Op het moment van koppelen
verdwijnt die header daar terecht, en dan is de site in één klap volledig indexeerbaar met een
formulier dat niet werkt: verkeer binnen, aanvragen weg. Dit is een volgorde-eis, geen procedureel
puntje.

Bij het domeinmoment hertoetsen: `X-Robots-Tag` moet weg zijn op `www` en blijven staan op de
vercel.app-URL, plus de apex-redirect als 301 zonder keten.


### Herkomst van B-001, hard vastgesteld

Er is **nooit** een echte Web3Forms-key in deze repo geweest. Over de hele git-historie komt in de
gebouwde HTML precies één waarde voor:

    name="access_key" value="VERVANG-DOOR-ECHTE-KEY"

21 van de 49 commits dragen hem; de overige zijn van voor het formulier. Elke deploy die ooit van
deze repo is gemaakt droeg dus de placeholder. Dat maakt B-001 een openstaande levering van de
eigenaar en uitdrukkelijk geen regressie van een deploy: eerdere formuleringen in dit rapport die
suggereerden dat de deploy van 30-08 het formulier kapot naar buiten bracht, waren onjuist en zijn
hierboven al rechtgezet.
