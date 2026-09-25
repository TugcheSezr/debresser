# Kannibalisatiematrix De Kievit

Terminal 2, Fase 0. Stand 30 augustus 2026. Gemeten op de gebouwde site `http://127.0.0.1:4740/`,
niet op de bronbestanden.

Meetwijze: per route de inhoudseenheden binnen `<main>`. Een inhoudseenheid is een
genormaliseerde `h2`, `h3`, `p`, `li` of `summary` van minimaal zes woorden, de definitie die het
masterplan zelf gebruikt voor de 75%-eis. Eenheden worden letterlijk vergeleken, niet op
gelijkenis geschat. De id-inventaris komt uit dezelfde ophaalronde, zodat elk genoemd fragment
aantoonbaar bestaat.

Een eerdere versie van dit document mat de gelijkenis met `difflib.SequenceMatcher.quick_ratio`.
Die maat is hier vervangen: `quick_ratio` negeert de volgorde van de tekst en levert een
BOVENgrens op de echte ratio. Je onderbouwt "bijna identiek" dan met een instrument dat gelijkenis
kan overschatten, dus het wees de goede kant op om de verkeerde reden. De conclusie is ongewijzigd,
de onderbouwing eronder niet.

## 1. De elf servicepagina's: geen kannibalisatie maar duplicatie

Dit is de zwaarste bevinding van Fase 0 en hij is hard gemeten.

| meting | uitkomst |
|---|---|
| aantal routes | 11 |
| omvang per route | 1.809 tot 1.817 woorden |
| inhoudseenheden per route | 60 |
| eenheden die letterlijk ook op de tien andere services staan | **60 van de 60** |
| eigen inhoudseenheden per route | **0** |
| ruwe diff `/piano-verhuizen/` tegen `/kantoorverhuizing/` | 28 verschilregels op 67 kB, na normalisatie van de dienstnaam |
| wat die 28 regels zijn | twee foto's met bijschrift, een keuze in het offerteformulier, een zin |
| id-structuur | alle elf exact 45 identieke ids |

De grens tussen "eigen blok" en "globaal blok" is hier niet gekozen maar gemeten. Over alle 34
routes komen 1.463 inhoudseenheden op precies een route voor, 8 op twee routes en 1 op vier
routes. Daarna is er niets tot 12. Tussen 5 en 11 routes zit geen enkele eenheid. De drempel ligt
dus in een leeg gebied, en dat is de ijking die deze telling draagt: zou de meting stuk zijn, dan
was die verdeling niet bimodaal.

De elf pagina's zijn dus niet elf dunne pagina's die om dezelfde term concurreren. Het zijn elf
kopieën van hetzelfde sjabloon met een andere H1 en een andere hero-foto. Er valt op dit moment
niets te ontdubbelen, want er is nog niets unieks om te behouden.

**Besluit.** Kannibalisatie is hier geen sorteerprobleem maar een schrijfprobleem. De elf routes
blijven `noindex` tot elke route eigen, eerstehands inhoud heeft. De intentiescheiding per route
staat in `intent-matrix.csv`; die is leidend bij het schrijven, zodat de duplicatie niet in
afgezwakte vorm terugkomt.

**Twee routeparen waar de scheiding vooraf wankel is en die expliciet getoetst moeten worden:**

| paar | scheidslijn die het moet dragen | terugvalbesluit |
|---|---|---|
| `/seniorenverhuizing/` en `/zorgverhuizing/` | senioren = leeftijd en vrijwillig kleiner gaan wonen; zorg = zorgindicatie of instelling, met een derde als opdrachtgever | blijkt de zorgcontext operationeel niet anders te lopen, dan gaat zorg op in senioren en vervalt de route |
| `/piano-verhuizen/` en `/antiek-en-kunst-verhuizen/` | piano = gewicht, afmeting en stemming; antiek/kunst = waarde, kwetsbaarheid en taxatie | blijken beide pagina's alleen "voorzichtig en verzekerd" te zeggen, dan samenvoegen tot één specialistische route |

## 2. Homepage, dienstenhub en de standaarddienst

| route | wat deze route exclusief mag claimen | wat er dus NIET op mag |
|---|---|---|
| `/` | de lokale merkkeuze: waarom dit bedrijf in deze regio | geen uitgeschreven dienstuitleg; diensten alleen als kaart met doorklik |
| `/diensten/` | de dienstkeuze: welke van de elf past bij mij | geen diepte-uitleg per dienst; maximaal een alinea plus doorklik |
| `/particulier-verhuizen/` | de standaard woningverhuizing van begin tot eind | geen algemene bedrijfsprofilering, die hoort op `/` en `/over-ons/` |

Risico: home, hub en de standaarddienst gaan alle drie over "een woning laten verhuizen". De
scheiding is niveau, niet onderwerp: keuze voor het bedrijf, keuze voor de dienst, uitvoering van
de dienst. Zolang de elf `noindex` staan is `/diensten/` de canonieke bestemming voor elke
dienstvraag.

## 3. Tools onderling

| route | uniek getal dat deze route oplevert | moment in het traject |
|---|---|---|
| `/dozencalculator/` | aantal verhuisdozen | bij het bestellen van dozen |
| `/m3-calculator/` | volume van de inboedel in m3 | bij het voorbereiden van de offerte |
| `/verhuischecklist/` | wat wanneer geregeld moet zijn | over de hele planningsperiode |

Deze drie kannibaliseren elkaar niet zolang elke pagina één getal of één uitkomst oplevert en de
andere twee alleen noemt als volgende stap. De m3-uitkomst gaat als veld mee in het
offerteformulier, het dozenaantal niet; dat verschil hoort ook in de copy zichtbaar te zijn.

## 4. Gidsen tegenover diensten

| gids | dienst | scheidslijn |
|---|---|---|
| `/inpaktips/` | `/inpakservice/` | tips = zelf doen, dienst = uitbesteden. Elke tipsectie mag eindigen met de uitbesteedoptie; de dienstpagina herhaalt de tips niet |
| `/verhuischecklist/` | `/werkwijze/` | checklist = taken van de klant, werkwijze = taken van De Kievit |

## 5. Trustcluster

| route | exclusief onderwerp | grens |
|---|---|---|
| `/over-ons/` | identiteit en historie | geen keurmerkuitleg, geen reviewcijfer als onderwerp |
| `/certificeringen/` | welke papieren wij aantoonbaar hebben | niet uitleggen wat het keurmerk voor de klant betekent |
| `/erkende-verhuizer/` | wat dat ene keurmerk de klant oplevert | niet de voorwaardentekst overnemen, wel het artikelnummer noemen |
| `/klantervaringen/` | oordeel van derden, met bron en peildatum | elders mag het cijfer alleen samengevat staan, met link hierheen |
| `/verzekering/` | dekking in gewone taal | de letterlijke tekst blijft op `/algemene-voorwaarden/` |
| `/klachtenregeling/` | de procedure na schade of onvrede | geen dekkingsbedragen, die staan op `/verzekering/` |
| `/algemene-voorwaarden/` | de woordelijke voorwaardensets | geen commerciële links in de artikelen zelf |

De vijf voorwaardensets staan met artikel-ids in de pagina (`#avvv-art-1` tot en met
`#avvv-art-26`, plus `#avvvbe-…`, `#avbv-…`, `#avhd-…` en `#pv05-…`). Daarmee kan elke andere
route naar het exacte artikel verwijzen in plaats van naar een label als "AVB". Dat is precies de
val die het masterplan noemt en die is hiermee dicht.

## 6. Aparte doelgroep

`/vacatures/` is de enige route met de werkzoekende als doelgroep. Die route mag nooit op
verhuisintentie geoptimaliseerd worden en hoort buiten de offerte-CTA-logica te blijven.

## 7. Wat NIET van Terminal 2 is maar de linkgraaf wel bepaalt

Gemeten op de gebouwde site: **alle 23 indexeerbare routes linken naar alle elf
`noindex`-services**, zonder uitzondering. Twee getallen die allebei kloppen en die niet door
elkaar gehaald moeten worden:

| telling | uitkomst |
|---|---|
| unieke bron-naar-service paren vanaf indexeerbare routes | 253 (23 x 11) |
| link-instanties vanaf indexeerbare routes | **673**, ongeveer 28 per pagina |
| link-instanties over alle 34 routes, dus inclusief de services onderling | 981 |

Die links komen niet uit de content maar uit het globale mega-menu, de drawer en de footer, en die
staan in `navigatie.py` (T1). Masterplanregel 9 zegt dat een `noindex`-service
geen volwaardige bestemming mag zijn. Dit is dus een T1-actie, niet een T2-actie; de tijdelijke
hubankers staan wel al in `link-matrix.csv`.

## 8. Twee bestemmingen uit het masterplan die op deze site niet bestaan

De Fase 4-tabel `Serviceactivatie na PASS` noemt verplichte uitgaande bestemmingen per service.
Twee daarvan zijn niet naar een bestaande route met een bestaand fragment te vertalen. Het
masterplan waarschuwt zelf voor precies deze val, en loopt er hier zelf in.

| label in het masterplan | wat er op de site staat | besluit |
|---|---|---|
| `AVB`, genoemd bij Kantoor | bestaat niet. De vijf gepubliceerde sets zijn AVVV, AVVV-BE, AVBV, AVHD en PV05 | GEBLOKKEERD. Een aansprakelijkheidsverzekering voor bedrijven is iets anders dan een voorwaardenset. OWNER INPUT NEEDED bij T3: bestaat die polis, en mag ernaar verwezen worden |
| `AVVV-BE`, genoemd bij Internationaal | `#avvvbe` heet voluit "Algemene Voorwaarden voor Internationale Verhuizingen (buiten Europa)". `#avvv` geldt "binnen NL en Europa" | GEBLOKKEERD. De dienst bedient Duitsland, Belgie en Engeland, alle drie binnen Europa, dus de tabel wijst waarschijnlijk naar de verkeerde set. OWNER INPUT NEEDED bij T3 |

Het tweede geval is dezelfde soort fout als de opslagtermijn die T1 en T3 eerder deze avond
rechtzetten: de naam klopt op zichzelf, maar hij is aan het verkeerde gebied gehangen. Er wordt
hierover niets in copy geschreven tot T3 het heeft vastgesteld.

## 9. Intentiefouten die nu op de gebouwde site staan

Gemeten, niet aangenomen. Dit is de werklijst voor Fase 1 binnen T2-eigendom.

| route(s) | wat er mis is | meting |
|---|---|---|
| 11 services plus `/diensten/` | beloven "Die reviews staan verderop op deze pagina", terwijl geen van de twaalf een reviewsectie heeft | de zin staat op 12 routes; alleen `/` heeft een `#reviews` |
| `/vacatures/` | draagt twee offertetrechters (`#prijs` en `#offerte`) terwijl de doelgroep de werkzoekende is | beide blokken aanwezig in de gebouwde HTML |
| `/spoedverhuizing/` | conversiedoel is bellen, maar de pagina biedt alleen het gedeelde offerteformulier | geen telefoon-CTA in de main buiten het globale blok |
| `/m3-calculator/` | had buiten `#prijs` en `#offerte` geen sectieankers; de `m3-`koppen dragen ze wel, dus contextuele links kunnen landen | 25 ids in main, waarvan 6 bruikbaar als sectiedoel |

## 10. Consument en zakelijk lopen door elkaar op `/kantoorverhuizing/`

Gevonden op 30-08-2026 op de gebouwde site, na de bouw van 00:44. Dit is geen kannibalisatie maar
het raakt de intentie van de route, dus het staat hier tot T3 het in het claimsregister heeft.

`/kantoorverhuizing/` richt zich op een zakelijke opdrachtgever en draagt tegelijk de volledige
consumentenformulering:

| wat er op `/kantoorverhuizing/` staat | waar die regel vandaan komt |
|---|---|
| "verzekerd tot ten minste 100.000 euro op nieuwwaarde" | AVVV 2025, de particuliere set |
| "Garantiecertificaat bij elke verhuizing. Verplicht bij elke particuliere verhuizing" | idem, en de zin noemt zichzelf particulier |
| "Opslag meeverzekerd. Bij een verhuizing binnen Nederland is opslag de eerste twaalf maanden verzekerd" | AVVV 2025 artikel 4, de particuliere set |

Onze eigen FAQ zegt op `/veelgestelde-vragen/#vgv-zakelijk` iets anders: voor bedrijven en
instellingen gelden de bedrijfsverhuisvoorwaarden, met de aansprakelijkheid beperkt tot 50.000 euro
per wagenzending. Een zakelijke lezer krijgt op de kantoorpagina dus bescherming voorgespiegeld die
hij volgens onze eigen FAQ niet heeft.

Wat het scherper maakt: van de elf services is `/kantoorverhuizing/` de enige die de bronregel
"Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025)" NIET draagt; de andere tien en twee
trustpagina's wel. Dat is op zichzelf terecht, want AVVV geldt daar niet. Maar de bronregel is
weggehaald terwijl de claims die eruit voortkomen zijn blijven staan. Daarmee is de fout minder
zichtbaar geworden in plaats van opgelost: nu staat de verkeerde claim er zonder de verwijzing die
zou verraden dat hij verkeerd is.

Dit valt onder Gate F1, "Consument en zakelijk zijn contractueel duidelijk gescheiden". Het blok
staat in `build_paginas.py`, dus de ingreep ligt bij T1, en de goedgekeurde zakelijke formulering
bij T3. T2 schrijft hier niets.
