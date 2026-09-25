# SEO-masterplan De Kievit - uitvoering met 4 terminals

Stand: 29 augustus 2026

Dit document vervangt de losse werkplannen. Er waren vier inhoudelijke plannen en een
eindcontrole:

1. technische/on-page SEO, Vercel en formulieren;
2. interne linkbuilding en informatiearchitectuur;
3. AI-vindbaarheid en entityduidelijkheid;
4. Google Search Quality en E-E-A-T;
5. `/controleer-light /fast` als release-gate, niet als los vijfde werkplan.

Het resultaat is dus **een masterplan met vier uitvoeringslanes en een gezamenlijke
eindcontrole**.

## 1. Huidige uitgangspositie

- Werkmap: `/Users/shahabmorshedian/website-kieviet`
- Webroot: `site/`
- Lokale versie: `http://127.0.0.1:4740/`
- 34 routes: 23 indexeerbaar, 11 `noindex,nofollow`
- 28 gerenderde pagina's bevatten nog de Web3Forms-placeholder
- Search Quality eindband: `Medium`
- Externe reputatie: sterk, ongeveer 4/5
- Geen aangetroffen Lowest-, fraude- of sitebrede spamflag
- De elf servicepagina's blijven `noindex` totdat ze afzonderlijk alle gates halen
- De werkmap bevat bestaande wijzigingen. Niemand mag resetten, stagen, stashen, committen,
  van branch wisselen of bestanden van een andere terminal overschrijven zonder expliciete
  opdracht van de hoofdterminal/eigenaar.

## 2. Beoogd eindresultaat

De productiesite moet:

- technisch crawlbaar, indexeerbaar en Vercel-proof zijn;
- iedere zoekintentie met unieke en aantoonbaar behulpzame inhoud beantwoorden;
- een sterke, logische contextuele linkgraaf hebben;
- juridisch, verzekeringstechnisch en qua identiteit intern consistent zijn;
- echte Experience, Expertise, Authoritativeness en Trust tonen;
- voor Google én AI-systemen duidelijke, citeerbare entiteiten en feiten bieden;
- geen placeholder, open launch-marker of onbewezen claim publiceren;
- per route gecontroleerd en pas daarna gefaseerd geïndexeerd worden.

## 3. Coördinatieregels voor alle vier terminals

1. Werk alleen in bronbestanden. Bewerk gegenereerde `site/**/index.html` nooit handmatig.
2. Alleen Terminal 1 draait de volledige generators en schrijft gegenereerde output.
3. Terminal 2 en 3 melden een bouwverzoek aan Terminal 1 nadat hun bronbestanden klaar zijn.
4. Terminal 4 past geen productie-inhoud aan. Terminal 4 rapporteert een fout aan de eigenaar.
5. Lees voor iedere patch het bestand opnieuw; er wordt parallel gewerkt.
6. Geen feiten, prijzen, termijnen, reviews, certificaten, diploma's of cases verzinnen.
7. Onbekende gegevens krijgen in de werkrapportage `OWNER INPUT NEEDED`, nooit in productiecopy.
8. Noindex wordt alleen per route en door Terminal 1 verwijderd na vier expliciete statussen:
   T2 `CONTENT PASS`, T3 `CLAIMS PASS`, T4 `QA PASS` en, waar echte bedrijfsinformatie of een
   case is gebruikt, `STAKEHOLDER PASS`. T1 beheert deze sign-offmatrix.
9. Een unfinished/noindex-service mag niet als volwaardige bestemming worden aangeboden.
   Bestaande navigatie- en contentlinks gaan tijdelijk naar het bijbehorende blok op
   `/diensten/`; bij routevrijgave worden ze atomair omgezet naar de service-URL.
10. Iedere terminal rapporteert na een werkbatch: bestanden, wijzigingen, tests, open punten,
    risico's en gewenste handoff.

### Bestandseigenaarschap

| Terminal | Exclusief eigendom | Niet aanpassen |
|---|---|---|
| T1 | `build_kievit.py`, `build_paginas.py`, `navigatie.py`, globale CSS/JS, Vercel-config, robots/sitemap, formulieren, globale wrappers en alle gegenereerde output | inhoudelijke broncopy van T2/T3 zonder handoff |
| T2 | de hieronder genoemde contentbronnen, nieuwe servicebronbestanden, zoekintentiebriefs, linkmatrix en contextlinks in T2-pagina's | trust/legal-pagina's van T3, builders/global build van T1 |
| T3 | `claims-register.md`, de hieronder genoemde trustbronnen, entity/NAP, AI-feitenspecificatie en schema-specificatie | servicecopy van T2, builders/globale implementatie van T1 |
| T4 | auditrapporten en nieuwe geïsoleerde scripts onder `site/_werk/seo-qa/` | productiecopy, bestaande builders en gegenereerde HTML |

**Exacte bronverdeling**

- T2: `site/_werk/paginas/diensten.html`, `inpaktips.html`, `dozencalculator.html`,
  `m3-calculator.html`, `verhuischecklist.html`, `veelgestelde-vragen.html`, `werkwijze.html`,
  `vacatures.html`, `site/_werk/blok_veelgestelde_vragen.py`, `site/_werk/blok_m3.py` en de
  elf nieuwe servicebronbestanden. Deze generators worden eerst aangepast en daarna gedraaid;
  anders overschrijven zij handmatige HTML-correcties.
- T3: `site/_werk/paginas/algemene-voorwaarden.html`, `certificeringen.html`, `contact.html`,
  `cookiebeleid.html`, `disclaimer.html`, `duurzaamheid.html`, `erkende-verhuizer.html`,
  `klachtenregeling.html`, `klantervaringen.html`, `over-ons.html`, `privacybeleid.html`,
  `toegankelijkheid.html`, `verzekering.html`, `site/_werk/blok_klantervaringen.py`, de
  reviewdata en de claimbronnen die deze pagina's voeden.
- T1: homepagebron/generator, globale componenten, wrappers, metadata/schema-integratie,
  assets/CSS/JS, deploymentbestanden, de HTML-sitemappagina en alle gegenereerde
  routebestanden. T1 implementeert homepagecopy uitsluitend vanuit een T2-copyhandoff en
  goedgekeurde T3-claims.
- T4: uitsluitend rapporten en nieuwe testhulpmiddelen. Een bestaand testscript mag pas na
  expliciete overdracht door T1 worden gewijzigd.

Omdat de servicecopy nu nog in `build_paginas.py` zit, voert T1 in Fase 0 een eenmalige,
output-neutrale refactor uit: ieder van de elf services krijgt een apart bronbestand dat T2
bezit. T4 vergelijkt voor en na de refactor routecount, robots en HTML-output. Pas na een parity
PASS begint T2 met herschrijven. Zo hoeft T2 nooit tegelijk met T1 in de generator te werken.

### Vaste gedeelde artefacten

- T1: `site/_werk/seo-uitvoering/route-manifest.csv` en
  `site/_werk/seo-uitvoering/service-release-manifest.csv`
- T2: `site/_werk/seo-uitvoering/intent-matrix.csv` en
  `site/_werk/seo-uitvoering/link-matrix.csv`
- T3: `site/_werk/claims-register.md`, `site/_werk/seo-uitvoering/entity-map.md`,
  `site/_werk/seo-uitvoering/schema-matrix.csv` en
  `site/_werk/seo-uitvoering/reputation-log.md`
- T4: `site/_werk/seo-qa/baseline.md`, batchrapporten en `site/_werk/seo-qa/release.md`

Geen terminal maakt een tweede concurrerende versie van deze artefacten.

Bij een onvermijdelijke overlap bepaalt Terminal 1 de volgorde. Er wordt nooit gelijktijdig in
hetzelfde bestand geschreven.

## 4. Uitvoeringsvolgorde

### Fase 0 - baseline en waarheid vastzetten

Alle terminals starten parallel, maar nog zonder brede contentproductie.

**Terminal 1**

- Leg huidige route-, robots-, status-, build- en hashbaseline vast.
- Maak `route-manifest.csv` met exact 34 routes, 23 index en 11 noindex en per route de
  huidige én beoogde eindstatus.
- Leg vast welke bestanden bron zijn en welke gegenereerd.
- Controleer welk productiedomein leidend wordt: `https://www.de-kievit.nl/` of de variant
  zonder `www`.
- Extraheer de elf servicebronnen output-neutraal uit `build_paginas.py`; T4 voert parity uit.

**Terminal 2**

- Maak voor alle 34 routes een intentiebrief: doelgroep, hoofdtaak, zoekvraag, bewijsbehoefte,
  conversie, overlap en canonieke claimpagina.
- Maak een content-/kannibalisatiematrix voor homepage, dienstenhub, elf services, FAQ,
  werkwijze, tools en gidsen.
- Leg dit vast als 34 regels in `intent-matrix.csv`, met één primaire intentie en expliciet
  besluit voor iedere overlap.

**Terminal 3**

- Maak `site/_werk/claims-register.md` als enige feitenbron met per claim:
  goedgekeurde formulering, primaire bron, eigenaar, gecontroleerd-op-datum, vervaldatum en
  routes waarop de claim mag staan.
- Verifieer eerst: juridische entiteit, handelsnaam, KvK/btw, contractpartij, telefoon,
  WhatsApp, bezoek-/kantoor-/opslagadres, openingstijden, overnamedatum, verzekering,
  lidmaatschappen, certificaten, diploma's en reviewcijfers.
- Maak in `entity-map.md` een bindende mapping voor juridische rechtspersoon, handelsnaam,
  contractpartij, vestiging, adresrollen en het externe profiel dat bij iedere node hoort.

**Terminal 4**

- Maak een onafhankelijke baseline: crawl, statuscodes, indexability, interne links,
  duplicatie, schema, mobiel, toegankelijkheid, formulieren en performance.
- Leg de huidige 34/23/11-count vast. Afwijkingen zijn daarna een blocker tenzij verklaard.

**Gate F0**

- Baseline is vastgelegd.
- `route-manifest.csv` bevat 34/34 routes plus de beoogde eindstatus.
- `intent-matrix.csv` bevat 34/34 unieke primaire intenties en alle overlapbesluiten.
- Claimregister heeft voor alle materiële claims een bron of expliciete blokkade.
- `entity-map.md` scheidt rechtspersoon, handelsnaam, contractpartij en vestiging.
- De service-extractie heeft een T4 parity-PASS zonder onverwachte outputdelta.
- Niemand heeft bestaande gebruikerswijzigingen overschreven.
- De elf servicepagina's staan nog steeds noindex.

### Fase 1 - feiten, trust en kritieke fouten herstellen

Dit gaat vóór nieuwe SEO-copy.

**Terminal 3 - trust/legal-bronnen en goedgekeurde formuleringen**

- Lever aan T2 de goedgekeurde FAQ-formulering: `all-inprijs of richtprijs`, geen `regie of
  aanneemsom` als dit niet de toepasselijke OEV-formulering is.
- Lever aan T2 de goedgekeurde opslagformulering: Nederland maximaal twaalf maanden binnen de
  toepasselijke voorwaarden; dertig dagen geldt niet als algemene Nederlandse opslagtermijn.
- Scheid consumentenvoorwaarden en bedrijfsverhuisvoorwaarden; voeg/verwijs AVB 2020.
- Bevestig of de vijf OEV-voorwaardensets woordelijk gepubliceerd mogen worden. Zonder
  toestemming: eigen samenvatting plus officiële links/downloads.
- Formuleer de contractpartij als geverifieerde rechtspersoon/handelsnaam, niet als
  "het Venlose team".
- Vervang `De Kievit B.V.` als daarvoor geen actueel KvK-bewijs bestaat.
- Leg Coehoornstraat, Horsterweg en eventuele opslaglocatie uit met een expliciete adresrol.
- Verifieer of `uitsluitend gediplomeerde inboedelverhuizers` aantoonbaar klopt; anders
  versmallen tot de bewezen norm en leerlingbegeleiding correct uitleggen.
- Uniformeer VCA/CO2/ISO: houder, scope, vestiging, geldigheidsdatum en bewijslink.
- Bron duurzaamheidsgetallen of verwijder/nuanceer ze.
- Los reviewwaarheid op: 779 versus 796, peildatum, actuele bron en label voor geselecteerde
  reviews.
- Actualiseer privacy pas op basis van echte Vercel-/Web3Forms-config, formuliervelden,
  bewaartermijnen, verwerkers, logging en eventuele doorgifte buiten de EER.
- Vervang op `/klachtenregeling/` de verhuisoffertefunnel door klacht/schade melden.
- Corrigeer op `/over-ons/` de dubbele organisatieszin.
- Pas de betaalclaim in T3-bestanden aan naar de goedgekeurde uitzonderingsformulering.
- Blokkeer `/verzekering/`, `/inboedelopslag/` en iedere opslag-/dekkingsclaim zolang actuele
  polis, limieten, duur en uitzonderingen niet schriftelijk zijn bevestigd.

**Terminal 2 - FAQ, services, tools en pagina-intent binnen T2-eigendom**

- Pas de twee FAQ-antwoorden in `blok_veelgestelde_vragen.py` toe vanuit de T3-formulering en
  regenereer de FAQ-bron.
- Verwijder in `/diensten/` en de elf geëxtraheerde servicebronnen de foutieve belofte dat
  reviews verderop staan, of plaats een echte relevante reviewsectie.
- Vervang de verhuisoffertefunnel op `/vacatures/` door solliciteren/open sollicitatie.
- Nuanceer de betaalclaim in T2-servicebronnen naar de goedgekeurde formulering.
- Voeg bron, modelversie, validatiemethode en beperking toe aan beide calculators.
- Voeg primaire bronnen en controledatum toe aan veranderlijke checklisttermijnen.
- Inventariseer de zeven herhaalde algemene FAQ's en de bestaande duplicate instances.
  Behoud alleen route-eigen vragen; routeer algemene vragen naar `/veelgestelde-vragen/`.
- Beoordeel CTA, microcopy en formulierrelevantie per T2-route; de gedeelde leadmodule is geen
  automatische juiste CTA voor iedere intentie.

**Terminal 1 - homepage en globale componenten**

- Pas homepage-/globale betaalcopy toe vanuit T3's goedgekeurde formulering.
- Retarget alle globale header-, drawer- en footerlinks naar unfinished services tijdelijk
  naar het exacte dienstblok op `/diensten/`.
- Implementeer T2-homepagecopy uitsluitend na een expliciete T2-handoff en T3-claimcheck.

**Gate F1**

- Nul bekende interne feitelijke tegenspraken.
- Nul onbewezen absolute diploma-, garantie-, certificaat- of duurzaamheidsclaims.
- Consument en zakelijk zijn contractueel duidelijk gescheiden.
- Reviewaantal en getoonde dataset hebben één bron van waarheid.
- Privacy beschrijft precies de werkelijk gebruikte techniek en velden.
- De twee materieel foute FAQ-antwoorden zijn gecorrigeerd in de generator én output.
- De reviewbelofte, vacatures-/klachtenfunnel, dubbele organisatieszin en betaalcopy zijn
  hersteld door de juiste bestandseigenaar.
- Calculator- en checklistmethodiek hebben bron, versie/datum en beperking.
- Algemene FAQ-duplicatie is teruggebracht tot route-eigen vragen plus canonieke verwijzingen.
- CTA en actie passen op iedere aangepaste route bij de primaire intentie.
- Globale links naar WIP-services landen tijdelijk op `/diensten/`, niet op placeholdercopy.

### Fase 2 - technische SEO, Vercel en productiebasis

Terminal 1 voert uit; Terminal 4 controleert onafhankelijk.

**Technische basis**

- Centraliseer per route: title, description, canonical, robots, OG/Twitter, breadcrumb en
  schema-input. Voorkom losse handmatige divergentie in gegenereerde HTML.
- Implementeer één voorkeursdomein, HTTPS en consistente slash-/URL-regels.
- Geef iedere indexeerbare route een self-canonical; WIP-routes behouden noindex.
- Genereer XML-sitemap uitsluitend met indexeerbare canonieke 200-URL's.
- Houd robots.txt crawlbaar voor noindex-WIP: blokkeer die URL's niet in robots.txt.
- Voorzie echte 404-afhandeling en beperkte, geteste redirects zonder ketens.
- Voeg unieke social metadata en absolute afbeeldingen toe.
- Maak previewdeployments globaal `noindex,nofollow` met deployment protection.
- Zorg dat productie nooit per ongeluk een globale noindex-header krijgt.

**Structured data en AI-machineleesbaarheid**

- Bouw vanuit `entity-map.md` één samenhangende graph met aparte stabiele `@id`'s voor de
  juridische rechtspersoon, De Kievit als handelsnaam/merk en de geverifieerde vestiging.
  Koppel ieder extern profiel alleen aan de node die het werkelijk beschrijft.
- Laat HTML en JSON-LD exact overeenkomen voor naam, adresrol, telefoon, werkgebied,
  parentOrganization en sameAs.
- sameAs uitsluitend naar exact attribueerbare profielen: Google Maps, Klantenvertellen,
  Erkende Verhuizers, Top Movers en andere geverifieerde eigen profielen.
- Geen AggregateRating publiceren voordat bron/licentie/policy en zichtbaarheid zijn
  gecontroleerd.
- Geen schema toevoegen voor inhoud die niet zichtbaar op de pagina staat.
- `llms.txt` is optioneel en geen vervanging voor crawlbare, unieke HTML.
- T3 specificeert in `schema-matrix.csv` per route welke typen en `@id`'s zijn toegestaan:
  Organization/vestiging, Service, BreadcrumbList, FAQPage of geen aanvullend type. T1
  implementeert uitsluitend deze matrix; T4 controleert dubbele/conflicterende nodes.

**Performance en UX**

- Meet mobiel eerst: LCP, INP en CLS op homepage, dienstenhub, service, calculator, review- en
  contactpagina.
- Optimaliseer alleen vanuit metingen: hero/preload, responsive images, fontloading,
  CSS/JS-budget, video en third-party requests.
- Behoud zichtbare focus, labels, foutmeldingen, 390px-layout en toetsenbordbediening.
- Voorkom dat sticky CTA's hoofdinhoud of formulierfeedback bedekken.
- Prelaunch-labprofiel: drie Lighthouse mobile-runs per representatief template, mediaan
  Performance minimaal 90, Accessibility minimaal 95, Best Practices minimaal 95, SEO 100,
  LCP maximaal 2,5 s, CLS maximaal 0,10 en TBT maximaal 200 ms. Afwijkingen krijgen bewijs en
  eigenaar; een functionele/accessibility-regressie is altijd blocker. Na livegang gelden de
  CrUX-good-drempels op p75 zodra voldoende velddata bestaan: LCP <=2,5 s, INP <=200 ms en
  CLS <=0,10.

**Web3Forms - USER_EXTERNAL**

- Eén broncomponent/config; nooit 28 losse HTML-edits.
- Kies expliciet de datastroom `browser -> Web3Forms`; bouw geen Vercel-proxy zonder nieuwe
  privacy-/securityreden. De Web3Forms access key is in de browser zichtbaar en dus geen
  serversecret. Houd hem desgewenst uit git als operationele configuratie, maar vertrouw voor
  beveiliging op toegestane productiedomeinen, honeypot/spambeveiliging en rate controls.
- Preview gebruikt testconfig of uitgeschakelde verzending.
- Privacy en formulier moeten exact dezelfde velden beschrijven.
- CSP staat uitsluitend de vereiste Web3Forms `connect-src`/`form-action` toe; Vercel verwerkt
  of logt de formulierpayload niet bij deze directe datastroom.
- Na levering: test HTTP-success, foutpad, bedankstatus, inboxontvangst, reply-to en dat er geen
  formulierinhoud in Vercel-logs belandt.

**Gate F2**

- Canonicals, robots, sitemap, redirects en schema zijn consistent.
- `schema-matrix.csv`, JSON-LD en zichtbare HTML zijn per route gelijk; entitynodes zijn niet
  samengevoegd.
- Preview is noindex; productie is niet globaal noindex.
- Geen onverwachte statuscode of ontbrekend kernasset.
- Het gedefinieerde Lighthouse-profiel is zonder onverklaarde regressie uitgevoerd.
- Web3Forms mag open blijven tijdens bouw, maar blokkeert productie zolang de user-key en
  echte eind-tot-eindtest ontbreken.

### Fase 3 - elf unieke servicepagina's

Terminal 2 schrijft; Terminal 3 verifieert feiten; Terminal 1 bouwt; Terminal 4 beoordeelt.

De bestaande noindex blijft tijdens het hele proces staan.

#### Batch A - breed commercieel

- `/particulier-verhuizen/`
- `/kantoorverhuizing/`
- `/internationale-verhuizing/`
- `/inboedelopslag/`

#### Batch B - aanvullende dienstverlening

- `/inpakservice/`
- `/montage-demontage/`
- `/seniorenverhuizing/`
- `/spoedverhuizing/`

#### Batch C - specialistisch en trustgevoelig

- `/zorgverhuizing/`
- `/piano-verhuizen/`
- `/antiek-en-kunst-verhuizen/`

Iedere servicepagina bevat minimaal:

- boven de vouw een duidelijke dienstbelofte en direct onder de relevante H1/H2 een
  antwoordcapsule van ongeveer 40-60 woorden voor wie de dienst geschikt is;
- dienstspecifieke intakevragen en toegangs-/planningsrisico's;
- concreet proces, team, materieel en competentiegrenzen;
- wat wel/niet inbegrepen is en gecontroleerde prijsfactoren, zonder bedragen te verzinnen;
- toepasselijke voorwaarden, dekking en uitsluitingen in gewone taal;
- één echte case met vastgelegde toestemming: plaats/regio, situatie, probleem, aanpak en
  resultaat. Exact adres, zorginformatie, waardegegevens en andere persoonsgegevens worden
  weggelaten/geanonimiseerd; het toestemmingslog bevat scope en intrekkingsroute;
- drie tot vijf unieke vragen die echt bij deze dienst horen;
- passende vervolgactie en links naar hub, werkwijze, gids/tool, bewijs en contact.

Serviceaccenten:

| Service | Verplichte information gain |
|---|---|
| Particulier | woningtoegang, pakketkeuze, planning, prijsfactoren |
| Kantoor | downtime, IT/archief, fasering, projectleiding, AVB |
| Internationaal | landen, douane/UK-documenten, groupage/direct, timing |
| Opslag | capaciteit, beveiliging/klimaat, toegang, ophalen, dekking, termijn |
| Inpakservice | materialen, breekbare categorieën, labels, verantwoordelijkheid |
| Montage | inclusies, uitsluitingen, bevoegdheidsgrenzen en voorbereiding |
| Senioren | familie/zorgcoördinatie, tempo, ontspullen, eerste-nachtinrichting |
| Spoed | echte capaciteit, triage, minimale voorbereiding, toeslag/fallback |
| Zorg | bewonerscontinuïteit, privacy, stakeholders en veiligheid |
| Piano | maat/gewicht, toegang, hulpmiddelen, team, stemming, dekking |
| Antiek/kunst | conditierapport, verpakking, waardering en chain of custody |

**Gate per individuele service**

- Een onbekende tester benoemt binnen drie seconden dienst, doelgroep en hoofdactie; de
  antwoordcapsule staat vóór algemene bedrijfsinformatie.
- Minimaal 75% purpose-specifieke inhoudseenheden. T4 meet dit op zichtbare main-content na
  uitsluiting van globale header, navigatie, footer, formulier, trustbar en gedeelde CTA.
  Een eenheid is een genormaliseerde H2/H3/P/LI/SUMMARY met minimaal zes woorden.
- Geen servicepaar met meer dan 85% gelijkenis. T4 vergelijkt genormaliseerde zichtbare
  main-content met pairwise 5-gram Jaccard en publiceert corpus, script en resultaat.
- Minimaal één controleerbaar firsthand-bewijs/case.
- Case-toestemming, anonimisering en intrekkingsroute zijn gedocumenteerd.
- Geen algemene FAQ-set als vervanging voor service-inhoud.
- Er staat een echte inhoudelijke reviewer met rol, kwalificatie/relevantie, reviewdatum,
  brondocumentversie en volgende controledatum in het reviewlog.
- PQ minimaal `Medium+` en Needs Met minimaal `Moderately Meets` voor de exacte intentie.
  Vocabulaire staat vast: PQ gebruikt Lowest t/m Highest met plusbanden; Needs Met gebruikt
  Fails to Meet, Slightly Meets, Moderately Meets, Highly Meets en Fully Meets.
- Mobiel, claims, links, schema, formulier, T2-, T3-, T4- en stakeholderstatus zijn PASS.
- Vrijgave is één atomair route-item: noindex verwijderen, sitemap opnemen, minimaal drie
  inkomende contextlinks activeren, uitgaande links activeren, schema/canonical controleren en
  daarna live 200/indexability testen. Bij één fout wordt het hele route-item teruggedraaid.
  Geen bulk-unlock.

### Fase 4 - interne linkbuilding

Terminal 2 beheert de linkmatrix. Iedere bestandseigenaar implementeert de links in zijn eigen
bronbestanden. Terminal 4 valideert de resulterende crawlgraph.

`link-matrix.csv` bevat verplicht: bronroute, exact contentblok, doelroute, gevalideerd
fragment, primaire/alternatieve ankervariant, reden/volgende gebruikersvraag, bestandseigenaar,
indexvoorwaarde, activatiestatus en QA-status. Een label als `AVB` of `zakelijke FAQ` is geen
geldige bestemming zonder exacte route en bestaand fragment.

#### Regels

- Alleen links die de volgende gebruikersvraag logisch beantwoorden.
- Geen `klik hier`, geen onnatuurlijke exact-match herhaling en geen gelinkte hele alinea's.
- Richtgetal voor een gewone commerciële/supportpagina: drie tot vijf contextuele links. Een
  echte hub zoals `/diensten/` mag naar alle relevante gepubliceerde children linken; relevantie
  en scanbaarheid zijn daar de gate, niet het richtgetal.
- Iedere gepubliceerde service krijgt minimaal drie relevante contextuele inkomende links.
- Iedere service linkt terug naar dienstenhub, relevante gids/tool, bewijs/trust en contact.
- Juridische bronkopieën niet met commerciële links vervuilen; links alleen in eigen intro of
  uitleg eromheen.
- T1 retarget eerst globale WIP-links; T2/T3 retargeten bestaande contentlinks naar het exacte
  dienstblok op `/diensten/`. Activeer de service-URL pas in het atomaire release-item.
- Geen geforceerde ankerpercentages per pagina. Sitebreed variëren tussen beschrijvend,
  contextueel en actie/uitkomst.

#### Kernlinkgraaf

- `/` -> `/diensten/`, `/werkwijze/`, `/over-ons/`, `/klantervaringen/`, `/contact/`
- `/diensten/` -> `/werkwijze/`, `/verhuischecklist/`, `/verzekering/`,
  `/veelgestelde-vragen/`, `/contact/`
- `/werkwijze/` -> `/verhuischecklist/`, `/m3-calculator/`, `/verzekering/`,
  `/klantervaringen/`, `/contact/`
- `/verhuischecklist/` -> `/dozencalculator/`, `/inpaktips/`, `/m3-calculator/`,
  `/werkwijze/`, `/contact/`
- `/inpaktips/` -> `/dozencalculator/`, `/verhuischecklist/`, `/verzekering/`,
  `/veelgestelde-vragen/`, `/contact/`
- `/dozencalculator/` <-> `/m3-calculator/`; beide -> checklist, werkwijze en contact
- `/over-ons/` -> `/erkende-verhuizer/`, `/certificeringen/`, `/duurzaamheid/`,
  `/werkwijze/`, `/vacatures/`
- `/erkende-verhuizer/` -> certificeringen, verzekering, toepasselijke voorwaarden en
  klachtenregeling
- `/certificeringen/` -> over-ons/De Bresser, erkende-verhuizer, duurzaamheid en voorwaarden
- `/verzekering/` -> toepasselijke voorwaarden, klachtenregeling en erkende-verhuizer
- `/duurzaamheid/` -> relevante certificaatankers en over-ons/De Bresser
- `/klachtenregeling/` -> verzekering en de toepasselijke voorwaardenartikelen
- `/klantervaringen/` -> werkwijze, over-ons, erkende-verhuizer en contact
- `/veelgestelde-vragen/` -> per antwoord de canonieke bewijs-/taakpagina: werkwijze,
  checklist, tools, verzekering, klachten, voorwaarden of contact
- `/contact/` -> diensten, werkwijze en veelgestelde-vragen; geen extra links die de
  contacttaak verdringen
- `/vacatures/` -> over-ons, certificeringen en de echte sollicitatieactie
- `/algemene-voorwaarden/` -> uitsluitend vanuit eigen intro/nawoord naar verzekering,
  klachtenregeling en erkende-verhuizer
- `/privacybeleid/` -> cookiebeleid, toegankelijkheid en contact waar inhoudelijk nodig
- `/cookiebeleid/` -> privacybeleid en contact
- `/disclaimer/` -> privacybeleid, voorwaarden en de broncontext van reviewclaims
- `/toegankelijkheid/` -> contact en privacybeleid
- `/sitemap/` -> alle en alleen publiceerbare routes; geen WIP-service en geen kunstmatige
  ankeroptimalisatie

#### Serviceactivatie na PASS

| Service | Minimaal inkomend vanaf | Verplicht uitgaand |
|---|---|---|
| Particulier | home, diensten, checklist | werkwijze, checklist, verzekering, contact |
| Kantoor | diensten, certificeringen, zakelijke FAQ | werkwijze, duurzaamheid, AVB, contact |
| Internationaal | diensten, FAQ, voorwaardenintro | AVVV-BE, verzekering, m3, contact |
| Opslag | home, diensten, opslag-FAQ | AVBV, verzekering, m3, contact |
| Inpakservice | diensten, inpaktips, checklist | inpaktips, dozen, checklist, contact |
| Montage | diensten, FAQ, checklist | AVHD, werkwijze, verzekering, contact |
| Senioren | diensten, echte case/review | werkwijze, reviews, contact |
| Spoed | diensten, contact, FAQ | werkwijze, verzekering, contact |
| Zorg | diensten, later senioren | werkwijze, over-ons, reviews, contact |
| Piano | diensten, verzekering | werkwijze, verzekering, contact |
| Antiek/kunst | diensten, inpaktips, verzekering | inpaktips, verzekering, contact |

**Gate F4**

- Nul orphan indexable pages.
- Nul interne links naar redirect of 404; WIP-services komen alleen als tijdelijke hubankers
  voor en niet als volwaardige routebestemming.
- Belangrijke pagina's zijn logisch binnen maximaal drie klikken bereikbaar.
- Ieder linkanker past semantisch bij de omringende zin en doelpagina.
- Iedere matrixregel heeft exacte route, bestaand fragment, eigenaar, indexvoorwaarde en
  activatiestatus; T4 vergelijkt matrix en gebouwde graph.
- Linktelling is een diagnose, geen doel op zichzelf; relevantie wint altijd.

### Fase 5 - E-E-A-T, reputatie en AI-vindbaarheid afmaken

Terminal 3 leidt; Terminal 1 implementeert globale schema-/entitydata; Terminal 2 verwerkt
goedgekeurde feiten in content; Terminal 4 controleert.

- Toon bij services, verzekering, voorwaarden, klachten, privacy, certificeringen,
  duurzaamheid, calculators en checklist alleen echte inhoudelijke verantwoordelijkheid:
  daadwerkelijke reviewer, rol, relevante kwalificatie/ervaring, primaire bronversie,
  reviewdatum en volgende controledatum in het interne reviewlog. Een generiek `team` telt niet
  als specialistische goedkeuring.
- Voeg geen decoratieve bylines toe zonder echt reviewproces.
- Maak korte antwoordblokken en tabellen citeerbaar, maar altijd vanuit unieke menselijke
  expertise en zonder AEO-vulling.
- Zorg dat historie, overname en huidige organisatie niet door elkaar lopen.
- Leg in `entity-map.md` bindend vast: `legalName`, handelsnaam/merk, parentOrganization,
  contractpartij, vestiging, adresrollen en per extern profiel de juiste entitynode.
- Maak een externe NAP-actielijst voor Google Business, Erkende Verhuizers, Top Movers en
  oude directories met Horsterweg/Voltastraat.
- Controleer Google Business afzonderlijk op eigenaarschap/verificatiestatus, duplicaten,
  primaire categorie, openingstijden, servicegebied, adreszichtbaarheid, pinpositie, website,
  telefoon en reviewbron. Accountwijzigingen blijven `USER_EXTERNAL` totdat toegang bestaat.
- Verifieer Google-rating rechtstreeks voordat die als actueel cijfer wordt herhaald.
- Label Klantenvertellen-cijfers met bron en peildatum.
- Schrijf actuele opslagdekking en uitzonderingen schriftelijk en opdrachtgebonden uit.
- Frame de brand van 2023 niet als fraude of huidig kwaliteitsbewijs; gebruik het historische
  signaal uitsluitend om actuele verzekeringsinformatie zorgvuldig te verifiëren.
- Schrijf geen negatieve Top Movers-netwerkscore aan De Kievit toe zonder bedrijfsspecifiek
  bewijs.
- Houd in `reputation-log.md` een reproduceerbare peildatum, queryset, bron-URL en uitkomst bij
  voor ten minste Klantenvertellen, Erkende Verhuizers, Google Business, Top Movers, Radar,
  ACM, Consumentenbond, Rechtspraak, insolventiesignalen en Internet Archive/domeinhistorie.
  Een afwezig zoekresultaat wordt als `niet aangetroffen`, niet als bewijs van afwezigheid,
  geformuleerd.
- Reputatie blijft maximaal `sterk (4/5)` totdat KvK/entity, adresrollen, actuele
  opslagdekking, primaire Google-data en voldoende bedrijfsspecifieke reviewdiversiteit zijn
  bevestigd. Een betrouwbare gemiddelde bedrijfsscore onder 4,0 of materiële negatieve
  primaire bron triggert een nieuwe PQ-capbeoordeling.
- Maak een vaste retrievaltest met branded vragen (naam, contact, adresrol, juridische
  entiteit, erkenning, reviews) en non-branded vragen (verhuisbedrijf Venlo, kosten, opslag,
  senioren, kantoor, piano en tools). Controleer Google/Bing-indexering, passagevindbaarheid en
  of teruggevonden feiten de juiste entity/peildatum hebben. AI-antwoorden zijn
  niet-deterministisch: leg prompt, datum, systeem en bronverwijzingen vast en behandel dit als
  observatie, niet als gegarandeerde rankingtest.

**Gate F5**

- HTML, footer, contact, schema en externe primaire profielen volgen dezelfde goedgekeurde
  entitymapping zonder rechtspersoon, handelsnaam en vestiging samen te voegen.
- Geen onverklaarde adres- of juridische-naamsverschillen.
- Iedere materiële claim is reproduceerbaar via het claimsregister en nul materiële claims
  zijn verlopen op releasedatum.
- Iedere sameAs-bestemming resolveert via hoogstens een gecontroleerde redirect naar het
  juiste, stabiele profiel; consent/JS bij Google Maps mag geen foutieve alternatieve URL
  afdwingen.
- AI-feitenblokken en JSON-LD bevatten geen niet-zichtbare of onbewezen gegevens.
- Google Business is volledig gecontroleerd of staat per ontbrekend accountpunt expliciet op
  `USER_EXTERNAL`.
- `reputation-log.md` en de vaste branded/non-branded retrievaltest zijn gedateerd en
  reproduceerbaar uitgevoerd.

### Fase 6 - onafhankelijke finale controle en release

Terminal 4 voert de finale controle uit. Terminal 4 repareert niet zelf, maar routeert ieder
probleem naar T1, T2 of T3 en hercontroleert daarna.

#### Verplichte controles

1. Draai `/controleer-light /fast` op de volledige, vers gebouwde snapshot.
2. Crawl alle routes en assets op 200/redirect/404, canonical, robots en indexability.
3. Controleer exact verwachte route- en noindexdelta.
4. Controleer sitemap versus indexeerbare canonieke 200-routes.
5. Test alle interne links, ankers, formulieren, calculators, menu's en mobiele CTA's.
6. Test 390px mobiel, toetsenbord, focus, labels, foutstatus en horizontale overflow.
7. Valideer JSON-LD en vergelijk iedere entitywaarde met zichtbare HTML/claimsregister.
8. Meet CWV/Lighthouse op representatieve templates; rapporteer labwaarden als labwaarden.
9. Herhaal Search Quality: PQ, Needs Met, Helpful Content, E-E-A-T, reputatie en spamflags.
10. Zoek sitebreed naar placeholders, `TODO`, `OPEN`, foutzinnen, verouderde reviewcijfers en
    onbewezen absolute claims.
11. Vergelijk de live indexability per route exact met `route-manifest.csv` en
    `service-release-manifest.csv`; geen impliciete status of onverklaarde delta.
12. Controleer vervaldatums, reviewerlogs en case-toestemmingen/anonimisering.

#### Harde productiegates

- 0 Blockers.
- 0 onverwachte 4xx/5xx, redirectketens, orphans of kapotte ankers.
- 0 productieplaceholders of open launch-markers.
- 0 materiële feitelijke tegenspraken.
- 0 onbewezen absolute trustclaims.
- 0 verlopen materiële claims, certificaten, verzekeringsclaims of ongedateerde mutable
  reviewcijfers.
- 0 unfinished servicepagina's indexeerbaar.
- De volledige opdracht is pas klaar wanneer alle elf bedoelde services individueel PASS en
  volgens het eindmanifest indexeerbaar zijn; elf permanent noindex-routes is geen voltooid
  resultaat. Een tussentijdse release moet expliciet `PARTIAL/NO-GO FOR FULL SEO` heten.
- Iedere vrijgegeven service minimaal `PQ Medium+` en `Needs Met: Moderately Meets`.
- Iedere commerciële, trust- en adviespagina minimaal PQ Medium+; homepage, contact,
  over-ons, erkende-verhuizer, kernservices en werkende tools hebben High als doel. Echte
  utilitypagina's zoals de HTML-sitemap worden op hun beperkte doel beoordeeld.
- Preview globaal noindex; productie niet globaal noindex.
- Web3Forms echte end-to-endtest PASS zodra de gebruiker de key levert.
- Productieformulier, mailbox, privacy en logging sluiten op elkaar aan.
- De sign-offmatrix bevat per service T2 CONTENT PASS, T3 CLAIMS PASS, T4 QA PASS en waar
  vereist STAKEHOLDER PASS.
- Definitieve rapportage bevat per gate `PASS`, `FAIL` of `USER_EXTERNAL` met bewijs.

Bij één FAIL is de release-uitkomst `NO-GO`. `USER_EXTERNAL` mag alleen worden gebruikt voor
werkelijk externe input zoals Web3Forms-key, accounttoegang, KvK-uittreksel, certificaat of
stakeholdergoedkeuring; het mag geen verborgen technisch/contentprobleem maskeren.

### Fase 7 - monitoring na productie

- T1 controleert na 1 uur en 24 uur: Vercel-fouten, redirects, globale robotsheaders,
  sitemap, formulierlevering en onverwachte 4xx/5xx.
- T2 controleert na 7 en 28 dagen Search Console-query/landingdata, indexering en interne
  zoekvraagdekking; wijzigingen volgen alleen uit bewijs, niet uit dagelijkse rankfluctuatie.
- T3 controleert na 7 en 28 dagen entity-/NAP-weergave, reviewpeildata, verlopen claims,
  externe profielen en branded/non-branded retrievaltests.
- T4 herhaalt op dag 7 en 28 de route/indexability/linkcrawl en rapporteert regressies aan de
  eigenaar. CrUX wordt beoordeeld zodra voldoende velddata beschikbaar zijn.
- Geen automatische noindex-verwijdering of contentuitrol op basis van monitoring; iedere
  nieuwe delta doorloopt opnieuw de relevante gates.

## 5. Terminalspecifieke startprompts

### Terminal 1 - Lead, technisch, build en release

> Jij bent de enige integrator en bouwer. Lees dit hele masterplan en
> `site/_werk/open-punten.md`. Leg eerst de baseline en het route/indexability-manifest vast.
> Bewaak bestandseigenaarschap. Voer technische SEO, Vercel, globale schema/entity-integratie,
> formulieren en builds uit. Extraheer eerst de elf servicebronnen met parity-PASS. Verwijder
> noindex uitsluitend via het atomaire route-item na T2-, T3-, T4- en vereiste stakeholder-PASS.
> Implementeer geen onbewezen feiten. Rapporteer na iedere build de gewijzigde bronbestanden,
> gegenereerde delta, routecount, indexabilitydelta, tests en open dependencies.

### Terminal 2 - Content, zoekintentie en linkbuilding

> Jij bezit servicecontent, zoekintentie en de contextuele linkgraaf. Werk alleen in jouw
> toegewezen bronbestanden; draai geen globale build en bewerk geen gegenereerde HTML. Start
> met route-intentiebriefs en herstel intentiefouten. Schrijf daarna de elf services in drie
> batches met echte eerstehandsinformatie. Maak en beheer de linkmatrix; vraag andere owners
> hun eigen pagina-links toe te passen. Gebruik voor WIP alleen `/diensten/`-ankers en laat
> noindex staan. Meld iedere claim zonder bewijs als
> OWNER INPUT NEEDED aan T3 en lever iedere afgeronde batch aan T1/T4.

### Terminal 3 - E-E-A-T, entity, claims, reputatie en AI

> Jij bent eigenaar van de feitenlaag. Bouw eerst het claimsregister en verifieer juridische
> entiteit, NAP/adresrollen, verzekering, voorwaarden, certificaten, diploma's en reviews.
> Herstel trust/legal-pagina's binnen jouw bestandscope. Lever aan T1 een eenduidige
> entitymapping, route-schema-matrix en reputation-log en aan T2 alleen goedgekeurde
> formuleringen. Voeg zichtbare
> bronnen en echte reviewverantwoordelijkheid toe waar dat inhoudelijk nodig is. Markeer
> externe account- of documentafhankelijkheden als USER_EXTERNAL en keur geen service vrij
> met onbewezen claims.

### Terminal 4 - Onafhankelijke QA, Search Quality en vrijgave

> Jij bent onafhankelijk en standaard read-only voor productiecode. Leg eerst de baseline
> vast. Controleer iedere batch op crawl, indexability, links, mobiel, toegankelijkheid,
> formulieren, schema, performance, duplicatie, Helpful Content, PQ, Needs Met en E-E-A-T.
> Repareer geen productieprobleem zelf: routeer het naar de eigenaar en retest. Geef per
> service en per release uitsluitend PASS/FAIL/USER_EXTERNAL met reproduceerbaar bewijs.
> Controleer ook de atomaire link/index/sitemapdelta. Eindig met `/controleer-light /fast`;
> één FAIL betekent NO-GO en herhaal de regressiecontrole op dag 7 en 28.

## 6. Handoff-formaat

Iedere terminal gebruikt steeds dit korte formaat:

```text
TERMINAL: T1/T2/T3/T4
BATCH/FASE:
STATUS: PASS / FAIL / USER_EXTERNAL / IN PROGRESS
BRONBESTANDEN GEWIJZIGD:
GEGENEREERDE BESTANDEN: alleen T1
TESTS EN RESULTATEN:
CLAIMS/BRONNEN GECONTROLEERD:
OPEN RISICO'S:
HANDOFF NAAR:
NOINDEX-ADVIES PER ROUTE: KEEP / RELEASE / NVT
```

## 7. Externe input die niet mag worden verzonnen

- Web3Forms-productiekey en ontvangende mailbox
- definitief Vercel-project, voorkeursdomein en DNS-toegang
- actueel KvK-uittreksel en goedgekeurde contractpartijformulering
- functie van Coehoornstraat, Horsterweg en eventuele opslaglocatie
- WhatsApp-beschikbaarheid op 077-3232100
- actuele verzekeringsdocumenten en opslagdekking
- originele certificaten en precieze scope/houder
- bewijs rond diploma's en leerlingbegeleiding
- toestemming om voorwaarden, reviews, logo's, personen en gegenereerde beelden te gebruiken
- echte cases, prijsvoorbeelden en operationele dienstdetails
- Google Business-/Search Console-/Bing-toegang

Totdat een afhankelijkheid is aangeleverd, blijft de bijbehorende claim, functie of route
geblokkeerd. Een nette placeholder in een intern rapport is toegestaan; een placeholder in de
productiesite niet.
