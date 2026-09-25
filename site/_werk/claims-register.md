# Claimsregister De Kievit

Eigenaar: Terminal 3. Dit is de enige feitenbron voor claims die op de site mogen staan.
Niemand publiceert een claim uit dit register in een andere formulering, en niemand voegt een
claim toe zonder primaire bron.

Kolommen: de goedgekeurde formulering staat woordelijk in de tabel, de primaire bron is een
vindplaats die iemand anders kan naslaan, en de vervaldatum zegt wanneer de claim opnieuw
tegen de bron moet worden gelegd.

Statuswaarden: `GOEDGEKEURD` (mag live), `GEBLOKKEERD` (mag niet live tot de bron er is),
`USER_EXTERNAL` (wacht op iets dat alleen de klant kan leveren).

---

## C1 - Hoe de prijs in de offerte wordt berekend

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD |
| goedgekeurde formulering | `De offerte vermeldt altijd de werkzaamheden, de prijs inclusief btw, of wij met een all-in prijs of met een richtprijs werken, het moment...` (de rest van het bestaande antwoord blijft staan) |
| verboden formulering | `of er op regie of op aanneemsom wordt gewerkt` |
| primaire bron | AVVV 2025 artikel 3 (De offerte), het lid over de prijsvorming: "de wijze waarop de prijs wordt berekend (all in prijs of richtprijs)". Uitgewerkt in artikel 3 onder a en b: een all-in prijs (methode aanneming van werk) en een richtprijs (begroting op basis van tarieven per volume, afstand of tijdsduur) |
| vindplaats bij ons | `site/_werk/paginas/algemene-voorwaarden.html` regels 78, 133 en 134; dezelfde bepaling staat op 413, 433 en 434 in de AVVV-BE 2025 (buiten Europa), niet in een zakelijke set |
| controle | de termen `regie` en `aanneemsom` komen nul keer voor in alle vijf gepubliceerde voorwaardensets; `richtprijs` tien keer, `all-in` twee keer |
| eigenaar van de tekst | Terminal 2, `site/_werk/blok_veelgestelde_vragen.py` regel 27 |
| gecontroleerd op | 30-08-2026 |
| vervaldatum | bij de eerstvolgende wijziging van de OEV-voorwaarden, uiterlijk 01-01-2027 |
| toegestane routes | overal waar de prijsopbouw wordt uitgelegd |

## C2 - Hoe lang opslag tijdens een verhuizing verzekerd is

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD, met de gebiedssplitsing als voorwaarde |
| goedgekeurde formulering | `Gaat de opslag mee als onderdeel van een verhuizing binnen Nederland, dan zijn uw spullen de eerste twaalf maanden verzekerd op dezelfde voorwaarden als tijdens de verhuizing. Bij een verhuizing binnen Europa geldt die dekking de eerste dertig dagen. Wilt u daarna verzekerd blijven, dan kan dat tegen vergoeding; spreek dat af voordat de termijn afloopt.` |
| verboden formulering | dertig dagen noemen bij een verhuizing binnen Nederland, en twaalf maanden noemen zonder erbij te zeggen dat het om Nederland gaat |
| primaire bron | AVVV 2025 artikel 4 (Verzekering verhuisgoederen binnen Nederland), het lid dat begint met "Bij bewaarneming als onderdeel van de verhuizing binnen Nederland", en artikel 5 (Verzekering verhuisgoederen tijdens verhuizing binnen Europa) voor de dertig dagen; beide samengevat in artikel 3 (offerte) en artikel 8 (Garantiecertificaat); nogmaals bevestigd in PV05 artikel 2 |
| vindplaats bij ons | `site/_werk/paginas/algemene-voorwaarden.html` regel 108 (NL twaalf maanden), 124 (Europa dertig dagen), 82 en 83 (offerte), 175 (Garantiecertificaat), 1064 en 1065 (PV05) |
| let op | na afloop van de verzekerde termijn blijft de aansprakelijkheid van de bewaarnemer hoe dan ook beperkt op grond van AVBV 2025 artikelen 2, 15 en 18. Wij mogen dus nergens suggereren dat na twaalf maanden vanzelf volledige dekking doorloopt |
| eigenaar van de tekst | Terminal 2, `site/_werk/blok_veelgestelde_vragen.py` regel 71. Dat antwoord noemt nu dertig dagen bij een verhuizing binnen Nederland en is daarmee materieel fout |
| al correct | `site/_werk/paginas/verzekering.html`, de tabel Verzekerde bedragen per gebied, splitst Nederland en Europa al goed |
| gecontroleerd op | 30-08-2026 |
| vervaldatum | bij wijziging van de OEV-voorwaarden of de polis, uiterlijk 01-01-2027 |
| toegestane routes | `/verzekering/`, `/veelgestelde-vragen/`, `/inboedelopslag/` zodra die route vrijkomt |

## C3 - Contrast en toegankelijkheid van de site zelf

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD |
| goedgekeurde formulering | zoals die nu op `/toegankelijkheid/` staat: de menubalk over de foto is op de werkelijk getekende beeldpunten gemeten, de rest is uit de stylesheet gerekend |
| primaire bron | `site/_werk/contrast-live-20260829.txt` (meting 30-08-2026 00:10, twaalf pagina's, 1440 en 1920px, met ijking) en `site/_werk/contrast.txt` (kleurparen uit style.css) |
| let op | `contrast.txt` regel 63 noemde de knoprand als `#C7A400`; de code gebruikt `--geel-rand-aa` `#A88A00`. Op creme is dat 3,03:1 tegen 2,18:1, dus alleen de werkelijk gebruikte kleur haalt de eis van 3:1 voor vormen. Gecorrigeerd door Terminal 1 |
| gecontroleerd op | 30-08-2026 |
| vervaldatum | bij iedere wijziging in de kleurtokens of de topbalk |
| toegestane routes | `/toegankelijkheid/` |

## C4 - Wie het contract met de klant sluit

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD en door de klant bevestigd op 30-08-2026 (U1) |
| goedgekeurde formulering | `De Kievit Verhuizingen` als handelsnaam, en waar de rechtspersoon genoemd moet worden: `onderdeel van De Bresser Verhuizingen B.V., KvK 18014730, btw NL0055.15.452.B.01` |
| verboden formulering | `De Kievit B.V.` |
| waarom verboden | die naam bestaat in geen enkel register. De oude site zet hem in de footer bij KvK 18014730, en dat nummer hoort bij De Bresser Verhuizingen B.V. De twee oude Kievit-rechtspersonen (Jac. de Kievit en Zn. B.V. KvK 12015298 en De Kievit VOF KvK 56937164) staan allebei als opgeheven geregistreerd |
| primaire bron | `onderzoek/07-de-kievit-en-de-bresser.md` sectie 1.2, met de registervindplaatsen per regel; de privacyverklaring op de oude de-kievit.nl noemt De Bresser Verhuizingen B.V. voluit als verwerkingsverantwoordelijke |
| uitwerking | `site/_werk/seo-uitvoering/entity-map.md`, knopen N1 tot en met N6 |
| gecontroleerd op | 30-08-2026 |
| vervaldatum | bij iedere wijziging in de bedrijfsstructuur |

## C5 - Zijn alle verhuizers gediplomeerd

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD op 30-08-2026. Eerder geblokkeerd wegens een tegenspraak in onze eigen pagina.s |
| bron | eigenaarsverklaring Shahab, 30-08-2026: alle verhuizers zijn gediplomeerd |
| goedgekeurde formulering | `Onze verhuizers zijn gediplomeerd.` Sterker nog, met de norm ernaast: `Het keurmerk eist dat minstens de helft van het team een erkend verhuisdiploma heeft; bij ons zijn het er alle.` Dat is een verkoopargument en het is waar |
| de leerlingzin die erbij hoort | wij zijn erkend leerbedrijf, dus er lopen leerlingen mee die het diploma nog halen. Dat is geen uitzondering op de claim zolang erbij staat dat een leerling MEELOOPT en dat de verantwoordelijkheid bij de vaste, gediplomeerde mensen ligt. Zonder die toevoeging spreken "uitsluitend gediplomeerd" en "haal je diploma bij ons terwijl je meedraait" elkaar tegen binnen een alinea |
| doorgevoerd | `erkende-verhuizer.html`: de norm en onze eigen situatie staan er nu naast elkaar, met de leerlingzin erbij. `over-ons.html` regel 105 en 187 stonden al goed; 187 had de leerlingnuance zelfs al |
| eigenaar van de tekst | Terminal 2 voor `/vacatures/` regel 60 |
| als er ooit bewijs gevraagd wordt | een verklaring is geen personeelslijst. Bij een aanbesteding of een geschil is de diplomaregistratie het bewijsstuk |
| gecontroleerd op | 30-08-2026 |

## C6 - Certificaten: wie is de houder

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD. Besluit van de klant op 30-08-2026 |
| goedgekeurde formulering | uniform voor ISO, VCA en CO2: de houder noemen, daarna `onze vestiging valt hieronder via De Bresser`. GEEN certificaatnummer, GEEN einddatum, GEEN ingangsjaar |
| waarom zonder nummers en data | wij zijn niet de houder. Een nummer en een einddatum wekken de indruk dat het certificaat op ons staat, en de organisatiegrens van het CO2-certificaat uit 2023 noemt bovendien nog de opgeheven entiteit Jac. de Kievit en Zn. B.V. Zonder die details is de zin waar onder elke lezing |
| de keten | Top Movers Nederland B.V. is houder; De Bresser Verhuizingen B.V. is aangesloten; De Kievit is sinds 1 juni 2024 een vestiging van De Bresser. Beide schakels staan in `onderzoek/02-leden-en-vestigingen.md` |
| let op, blijft staan | de scopezin bij ISO, "geldt voor werk dat onder het landelijke Top Movers-contract valt". Dat is geen datum maar een beperking, en die hoort erbij |
| doorgevoerd op | `certificeringen.html` (ISO, VCA en CO2, drie blokken) en `duurzaamheid.html` (vijf plekken, waaronder het FAQ-antwoord dat nu zegt dat wij niet zelf de houder zijn). Nul certificaatnummers en nul einddata over in de T3-bronnen |
| Erkende Verhuizer blijft anders | dat keurmerk staat WEL op naam van De Kievit zelf, met een eigen vermelding in het ledenregister. Die regel is bewust niet aangepast |
| gecontroleerd op | 30-08-2026 |

## C7 - Duurzaamheidscijfers

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD |
| wat er staat | 36 procent minder afval in 2025 ten opzichte van 2024, 35.000 bespaarde dozen, ruim 15 procent van het wagenpark elektrisch na drie extra voertuigen in 2025, zes hubs in Nederland en Belgie |
| waarom dit mag | de cijfers staan woordelijk op debresser.nl, en onze pagina schrijft ze ook aan De Bresser toe: het blok heet "Wat De Bresser over 2025 rapporteert" en zegt erbij dat ze voor De Bresser als geheel gelden en niet zijn uitgesplitst naar Venlo. De pagina sluit af met de mededeling dat wij over onze eigen locatie geen uitspraak doen omdat wij daar geen harde cijfers over hebben |
| voorwaarde | die toeschrijving is onderdeel van de claim. Wordt het kader weggehaald, dan vervalt de goedkeuring, want dan lezen de cijfers als die van de Venlose vestiging |
| primaire bron | `onderzoek/05-duurzaamheid-mvo-werkgever.md` regel 55 en de afvalregel, met de debresser.nl-vindplaats en een archiefversie |
| gecontroleerd op | 30-08-2026 |
| vervaldatum | zodra De Bresser nieuwe jaarcijfers publiceert |

## C8 - Beoordelingen: 9,4 uit 779

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD, met peildatum verplicht |
| goedgekeurde formulering | `9,4 uit 779 beoordelingen op Klantenvertellen, peildatum 28 augustus 2026` en `99 procent beveelt ons aan` |
| het verschil 779 tegenover 796 | geen tegenspraak maar twee tellingen op hetzelfde profiel: de teller van Klantenvertellen stond op 779, de profiellijst bevatte 796 losse beoordelingen. Dat staat gedocumenteerd in `site/_werk/blok_klantervaringen.py` regel 14. Wij voeren overal het tellergetal |
| bewaakt door | `site/_werk/kruiscontrole.py` geeft een fout bij ieder ander getal dan 779 |
| ook zo bij Google | 4,5 uit 42, afgelezen op de vermelding op 29-08-2026; reviewteksten van Google staan er niet, want de Places API is niet ingeschakeld |
| openstaand | USER_EXTERNAL, alleen bij verversing: Klantenvertellen toonde op 29-08 zelf "100%" bij de aanbeveling terwijl wij 99 procent voeren. Bij de volgende peiling moet dat opnieuw worden afgelezen en overal tegelijk worden bijgewerkt |
| gecontroleerd op | 30-08-2026 |

## C10 - Welke voorwaardenset hoort bij welke dienst

| veld | inhoud |
|---|---|
| status | OPGELOST voor de vraag welke set geldt (klant bevestigde op 30-08 dat AVB 2020 wordt gehanteerd). De reparatie van de tekst op `/kantoorverhuizing/` loopt, zie C11 |
| de vijf sets die wij publiceren | AVVV 2025 (verhuizing binnen Nederland en binnen Europa), AVVV-BE 2025 (internationale verhuizing BUITEN Europa), AVBV 2025 (bewaarneming), AVHD 2025 (handymandiensten), PV05 2025 (verzekeringsvoorwaarden) |
| vindplaats | `site/_werk/paginas/algemene-voorwaarden.html` regel 27, 363, 640 en 873, met per set de eigen aanhaalbepaling op 360, 637 en 1032 |
| goed gekoppeld | `/internationale-verhuizing/` noemt AVVV 2025 en bedient Duitsland en Engeland. Dat is juist: AVVV-BE geldt uitsluitend BUITEN Europa. Het masterplan koppelt die route aan AVVV-BE en dat zou een fout introduceren |
| extra bij die route | de grensstreek telt voor het Garantiecertificaat als Nederland: Nedersaksen en Noordrijn-Westfalen, Vlaanderen en Luxemburg. Dat mag genoemd worden, met AVVV 2025 als grond |
| FOUT gekoppeld | `/kantoorverhuizing/` draagt dezelfde gegenereerde zin als de particuliere routes: "Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025) en het Garantiecertificaat van de Organisatie voor Erkende Verhuizers." Dat is twee keer mis voor een zakelijke klant |
| waarom mis | ten eerste bestaat er voor bedrijfsverhuizingen een eigen set van de OEV, de Algemene Voorwaarden Bedrijfsverhuizingen 2020 (AVB 2020, in werking 1 mei 2020), en die publiceren wij niet en noemen wij nergens. Ten tweede is het Garantiecertificaat een consumenteninstrument: de garantieregeling en de nakomingsgarantie in artikel 23 gelden voor consumenten, en de bijsluiters heten consumentenbijsluiters. Een zakelijke opdrachtgever kan er geen beroep op doen |
| primaire bron | `onderzoek/04-certificaten-garanties-voorwaarden.md` sectie 3.1 (Garantiecertificaat, particulier) en sectie 3.3 met de tabelregel voor AVB 2020; onze eigen voorwaardenpagina regel 176 en artikel 23 voor de consumentenbeperking |
| wat er moet gebeuren | AVB 2020 opnemen of er expliciet naar verwijzen, en de zin op `/kantoorverhuizing/` losknippen van de particuliere sjabloonzin. Zolang dat niet is gebeurd, mag die route niet uit noindex: het raakt Gate F1, "consument en zakelijk zijn contractueel duidelijk gescheiden" |
| beantwoord | De Kievit hanteert AVB 2020. Of die set woordelijk gepubliceerd mag worden of alleen als verwijzing, staat nog open (U9) |
| eigenaar | Terminal 3 voor de voorwaardenpagina, Terminal 1 voor de gegenereerde zin op de servicepagina.s |
| gecontroleerd op | 30-08-2026 |

## C11 - Wat een zakelijke klant wel en niet krijgt (AVB 2020)

Deze claim vervangt op `/kantoorverhuizing/` en op elke andere zakelijke route de particuliere
zin over AVVV 2025 en het Garantiecertificaat. Bron is de volledige tekst van AVB 2020 in
`onderzoek/bronteksten/voorwaarden-en-certificaten/tm-AVB-2020.txt`, artikel 5 en artikel 6.

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD |
| goedgekeurde formulering | `Voor een bedrijfsverhuizing gelden de Algemene Voorwaarden Bedrijfsverhuizingen 2020 van de Organisatie voor Erkende Verhuizers, niet de voorwaarden voor particuliere verhuizingen. Onze aansprakelijkheid is daarin beperkt tot 50.000 euro per wagenzending, en tot 50.000 euro per verhuizing als alles binnen een gebouw blijft. Gaat er iets de grens over, dan geldt de limiet uit het CMR-verdrag. Ligt de waarde van uw inventaris hoger, geef die dan vooraf schriftelijk op: spreken wij dat af, dan treedt dat bedrag in de plaats van de limiet. Uw zaken zijn niet automatisch verzekerd zoals bij een particuliere verhuizing; wij sluiten op uw verzoek en voor uw rekening een aparte verzekering af voor de risico's waarvoor wij niet aansprakelijk zijn. Zichtbare schade meldt u schriftelijk bij of direct na aanneming, niet-zichtbare schade binnen een week.` |
| wat er expliciet NIET geldt | het Garantiecertificaat, de geschillencommissie voor consumenten en de nakomingsgarantie. AVB 2020 kent die instrumenten niet; ze staan in AVVV 2025 en zijn daar aan consumenten gebonden. Ook de verzekering tot ten minste 100.000 euro op nieuwwaarde is een particuliere regeling en geldt hier niet |
| waarom dat zo hard moet | `/kantoorverhuizing/` beloofde tot 30-08 het tegenovergestelde: de particuliere sjabloonzin met AVVV 2025 en het Garantiecertificaat. Een zakelijke opdrachtgever kan zich daar niet op beroepen, dus dat was een belofte die bij een schadegeval niet houdt |
| vindplaats per bedrag | aansprakelijkheidslimieten en CMR in artikel 6 lid 8 onder a, b en c; hogere waarde opgeven in artikel 6 lid 9; aparte verzekering op verzoek en voor rekening van de opdrachtgever in artikel 5 lid 12; meldtermijnen voor schade in artikel 7 (Schademelding en schadeclaim) lid 1 en 2; artikel 8 gaat over schadeherstel |
| al goed elders | de FAQ noemt de 50.000 euro per wagenzending en de meldtermijnen al correct, alleen zonder de set bij naam en zonder te zeggen wat vervalt. Die twee toevoegingen zijn het verschil |
| eigenaar van de tekst | Terminal 1 voor de gegenereerde zin op de servicepagina.s, Terminal 3 voor `/verzekering/` en de voorwaardenpagina |
| gecontroleerd op | 30-08-2026 |

## C12 - Besluiten van de klant die claims wegnemen

| besluit | gevolg |
|---|---|
| Horsterweg 217 is alleen historie en niet meer in gebruik | het adres komt nergens meer in: niet in schema, niet in de footer, niet als bezoekadres. Alleen als historie op `/over-ons/` toegestaan. N4 in de entitymap is daarmee gesloten |
| de brand van mei 2023 wordt niet genoemd | geen vermelding op `/over-ons/` of elders |
| de PPV-claim vervalt | stond op de oude site, komt niet mee naar de nieuwe |
| geen eigen dekkingsclaims | wij verwijzen naar de voorwaarden en doen geen uitspraak over de opslaglocatie. `/inboedelopslag/` blijft daarmee beperkt en op noindex |
| openingstijden 08:00 tot 17:00 | bevestigd, ook in schema. U6 gesloten |
| oprichtingsjaar blijft 1910 | met de advertentie van 12 maart 1910 als bron. De externe profielen die 1895 noemen moeten worden bijgewerkt; dat blijft open als NAP-punt |
| geen Search Console, Bing, GA4 of GTM | bewuste keuze. Gevolg: geen conversiemeting en na livegang geen indexeringscontrole. Dat is geen omissie in de oplevering maar een beperking die genoemd moet worden bij de release |
| Google Business-toegang komt later | de NAP-controle op de vermelding kan daarmee pas na oplevering |
| externe profielen worden NIET bijgewerkt | openingstijden.nl blijft 07:30 zeggen, LinkedIn blijft 1895 noemen en Horsterweg 217 blijft in oude directories staan. Besluit van de klant op 30-08. Gevolg voor de vindbaarheid: onze eigen gegevens zijn intern consistent, maar wijken op die drie punten af van wat elders staat, en dat verzwakt de koppeling tussen de bronnen. Dit hoort als beperking in het eindrapport, niet als openstaande taak |
| de Web3Forms-key is er alsnog (07-09-2026) | het besluit "voorlopig niet" van 30-08 is vervallen: Shahab leverde de key `f013806d-8e11-45d3-ba3e-9f4cb07a72c8` aan en die staat op alle 27 routes met een formulier. Daarmee is de blokkade op livegang weg. Wat nog niet is aangetoond is de BEZORGING: dat vraagt een verzendtest in een gewone browser op het uiteindelijke domein |
| AVB 2020 mag woordelijk gepubliceerd | doorgevoerd op 30-08: de zesde set staat op `/algemene-voorwaarden/`, dertien artikelen, met eigen ankers `#avb` en `#avb-art-1` tot en met `#avb-art-13`. U9 daarmee beantwoord voor deze set |

## C13 - Het juridisch kader per dienst

Voor Terminal 2, die de elf dienstpagina.s uniek gaat schrijven. Dit is per dienst de goedgekeurde
kern, met de vindplaats erbij. Alles hieronder staat sinds 30-08-2026 woordelijk op
`/algemene-voorwaarden/`, dus elke verwijzing landt op een bestaande bestemming.

| dienst | welke set | wat je mag schrijven |
|---|---|---|
| kantoorverhuizing en elke zakelijke route | AVB 2020 | de volledige formulering staat in C11. Kern: 50.000 euro per wagenzending, 50.000 euro per verhuizing binnen een gebouw, CMR over de grens, hogere waarde vooraf schriftelijk, geen automatische verzekering, en GEEN Garantiecertificaat, geschillencommissie of nakomingsgarantie |
| internationale verhuizing | AVVV 2025 binnen Europa, AVVV-BE 2025 daarbuiten | de route bedient Duitsland en Engeland, dus AVVV 2025. AVVV-BE geldt uitsluitend BUITEN Europa; die twee nooit verwisselen. Binnen Europa spreken wij het verzekerde bedrag samen af met een ondergrens van 5.000 euro, binnen Nederland ligt het op ten minste 100.000 euro |
| internationale verhuizing, extra | grensstreekregeling | voor het Garantiecertificaat telt de grensstreek als Nederland: Nedersaksen, Noordrijn-Westfalen, Vlaanderen en Luxemburg. Een verhuizing naar Noordrijn-Westfalen valt dus onder de Nederlandse regeling, en dat is een echt onderscheidend punt voor Venlo |
| inboedelopslag | AVBV 2025, met AVVV 2025 voor de verhuizing eromheen | twaalf maanden dezelfde dekking binnen Nederland, dertig dagen binnen Europa, daarna alleen verzekerd tegen vergoeding en vooraf afgesproken. Zeg er altijd bij dat de aansprakelijkheid van de bewaarnemer hoe dan ook beperkt blijft op grond van AVBV 2025 artikelen 2, 15 en 18. Geen uitspraken over de opslaglocatie zelf, dat is een besluit van de klant |
| montage en demontage, klusdiensten | AVHD 2025 | eigen set voor handymandiensten, dus niet automatisch de verhuisvoorwaarden |
| piano, antiek en kunst | AVVV 2025, let op de waardegrenzen | binnen Nederland geldt de verzekering op nieuwwaarde, tenzij de dagwaarde onder 40 procent van de nieuwwaarde ligt; bij kostbare zaken wordt op marktwaarde uitgekeerd. Bij diefstal van lijfsieraden geldt binnen Nederland maximaal 5.000 euro per gebeurtenis en binnen Europa maximaal 20 procent van het verzekerde bedrag. Wie een vleugel of een collectie laat verhuizen moet de waarde dus vooraf opgeven; dat is het inhoudelijke punt van die pagina |
| alle particuliere routes | AVVV 2025 | all-in prijs of richtprijs (C1), Garantiecertificaat, en de annuleringsstaffel |

Regel voor T2: noem de set bij naam, link naar het anker op `/algemene-voorwaarden/`, en schrijf
er bij een grens altijd bij wat er NIET onder valt. Een grens zonder de keerzijde leest als een
belofte. Vraag het na bij T3 als een dienst een bedrag of termijn nodig heeft dat hier niet staat.

## C14 - Welk bronbestand is leidend per voorwaardenset

Een vindplaatsregel, want in `onderzoek/bronteksten/voorwaarden-en-certificaten/` liggen edities
door elkaar. Wie uit de verkeerde put schrijft een set van tien tot twintig jaar oud op de pagina,
en dat valt bij geen enkele controle op omdat de tekst er plausibel uitziet.

| bronbestand | bevat | gebruiken |
|---|---|---|
| `oev-AVVV-2025.txt` | AVVV, AVBV, AVHD en PV05 in de editie 2025 | JA, leidend |
| `db-AVVV.txt` | dezelfde vier sets, editie 2025 | JA, als tweede lezing |
| `tm-AVB-2020.txt` | AVB 2020 | JA, leidend en de enige bron voor deze set |
| `tm-AVVV-PV05-AVBV-AVHD.txt` | AVVV 2006 en 2015, AVBV 2006 en 2015, AVHD 2015 | NEE. Verouderd |
| `kv-AVVV-PV05-AVBV-AVHD-2.txt` | dezelfde oude edities | NEE. Verouderd |

Zelf nagegaan op 30-08-2026 door in elk bestand op de jaartallen te zoeken. De site publiceert
AVVV 2025, AVVV-BE 2025, AVBV 2025, AVHD 2025, PV05 2025 en AVB 2020; iedere andere jaargang die
ergens opduikt is een signaal dat er uit een verkeerd bestand is geschreven. Controle die iedereen
kan doen: `grep -o "AVVV 20[0-9][0-9]" <bestand> | sort -u`.

## C15 - Zijn de opgeslagen reviews compleet

| veld | inhoud |
|---|---|
| status | ONDERZOCHT en opgelost. Geen reden om de hele ophaal te wantrouwen |
| aanleiding | T2 vond een review die midden in een hashtag ophoudt en vroeg zich af of onze crawl vaker halve teksten bevat |
| wat ik heb gemeten | alle 796 records in `_werk/klantenvertellen-reviews-20260829.json`. Er is GEEN vaste afkaplengte: de langste tekst is 1121 tekens en er zit geen ophoping op een grenswaarde, wat je bij een limiet altijd ziet. 212 teksten eindigen zonder leesteken, maar dat zijn vrijwel allemaal korte reviews die nu eenmaal zo geschreven zijn ("Heel goed", "Deskundige verhuizers, keurig en netjes") |
| het echte geval | precies EEN record is afgekapt: Huub Hendrickx, 19-06-2026, eindigt op "#venlo #ste", midden in Steyl. De review zelf is compleet: twee alinea.s die eindigen op "inzet en professionaliteit!". Alleen de hashtagregel eronder is halverwege gestopt |
| wat ik heb gedaan | in `blok_klantervaringen.py` een functie `schoon()` die een afsluitende regel met uitsluitend hashtags weghaalt, met de hele redenering in de docstring. Hashtags zijn geen onderdeel van wat de klant over ons zegt, dus die regel valt weg in plaats van dat wij een half woord publiceren of zelf aanvullen. Er is nagegaan dat dit het enige record met zo.n regel is |
| gevolg | de gepubliceerde `assets/data/klantenvertellen-reviews.json` is opnieuw geschreven; die review eindigt nu op de laatste hele zin |
| toestemming | GEGEVEN op 30-08-2026: reviews mogen met naam en woonplaats geciteerd worden, het profiel is openbaar en het is onze eigen review. Daarmee is de blokkade op `/kantoorverhuizing/` weg |
| regel bij citeren, HERZIEN 30-08 | citeer alleen uit `assets/data/klantenvertellen-reviews.json`, dus de opgeschoonde uitvoer. Handmatig nakijken hoef je alleen bij een review van 195 tekens of meer die NIET op een leesteken eindigt: dat zijn er 14 van de 648 met tekst, en die zijn alle veertien gewoon compleet. De eerdere formulering, "kijk of de tekst op een hele zin eindigt", was onbruikbaar: die verwerpt 212 van de 648 records, want korte reviews als "Heel goed" eindigen nu eenmaal zonder punt. De lengtedrempel maakt het verschil |
| correctie op mijn eigen cijfer | ik noemde eerder 212 van 796. De juiste noemer is 648, want 148 klanten gaven alleen een cijfer zonder toelichting |
| twee dingen die het script nu zelf afvangt | een afsluitende regel met uitsluitend hashtags, en achterblijvend renderresidu in de vorm van een superscriptcijfer (unicodecategorie No). Dat laatste kwam aan het licht doordat de review van Huub Hendrickx na het weghalen van de hashtagregel eindigde op "professionaliteit!" met een losse superscript-negen erachter. Categorie No komt in geen enkele andere review aan het eind voor; tekens die de klant wel bedoeld heeft, zoals een duim-emoji, vallen in categorie So en blijven staan |
| gecontroleerd op | 30-08-2026 |

## C16 - Hoe en wanneer de klant betaalt

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD. Eigenaarsfeit van 30-08-2026 |
| goedgekeurde formulering | `Pas na de verhuizing, per bank.` Geen contant, geen pin, en nooit vooruit |
| verboden formulering | `per pin of contant`, en elke variant die suggereert dat contant kan |
| is dit strijdig met de voorwaarden | NEE, en dat is belangrijk voor wie de voorwaardenpagina ernaast legt. AVVV 2025 zegt dat betaling in contanten of per pin plaatsvindt bij aflevering, maar met de woorden "tenzij anders is overeengekomen", en de bepaling direct daaronder regelt precies dat geval met een termijn van veertien dagen na factuurdatum. Bovendien rekent diezelfde bepaling bijschrijven van het bedrag uitdrukkelijk tot contante betaling. Wat De Kievit doet is dus de in de voorwaarden voorziene uitzondering, als vaste afspraak |
| gevolg voor de voorwaardentekst | die blijft ongewijzigd. Alleen onze eigen copy zegt wat wij doen. Vindplaats van de bepalingen: `algemene-voorwaarden.html` regels 270 en 272, en 562 en 564 voor de set buiten Europa |
| doorgevoerd | `over-ons.html` regel 109. `werkwijze.html` stond al goed |
| gecontroleerd op | 30-08-2026 |

## C17 - Hoe de opslag eruitziet

| veld | inhoud |
|---|---|
| status | GOEDGEKEURD op 30-08-2026. Eerder geblokkeerd, gedeblokkeerd door de eigenaar |
| goedgekeurde formulering | `De spullen gaan in houten opslagkisten of in een eigen 20 ft- of 25 ft-container, in een verwarmd pand dat beveiligd is tegen brand en inbraak. Wat er tijdens de opslag verzekerd is en hoe lang, staat in de voorwaarden voor bewaarneming; zie ook onze verzekeringspagina.` |
| bron | eigenaarsverklaring Shahab, 30-08-2026, letterlijk: dit is een feit, dat kun je aannemen. Dat is precies het soort gegeven dat alleen de eigenaar kan leveren, en daarmee is het gestaafd |
| waarom het eerder geblokkeerd stond | `open-punten.md` regel 17 hield de claim tegen omdat de opslaglocatie na de brand van 2023 onbekend was, en er lag geen document onder. Dat was terecht zolang er niets over gezegd was; de verklaring van de eigenaar heft het op |
| wat WEL beperkt blijft | het onderscheid dat overeind blijft is dat tussen het pand en de dekking. Over het pand doen wij nu een uitspraak. Over wat er verzekerd is blijven wij verwijzen naar de voorwaarden en doen wij geen eigen dekkingsclaim (C12) |
| als er ooit bewijs gevraagd wordt | bij een zakelijke aanbesteding of een schadegeval is een verklaring geen document. Dan is de polis of het certificaat van het pand het bewijsstuk. Dat is geen reden om de zin niet te voeren, wel om te weten wat eronder ligt |
| eigenaar van de tekst | Terminal 2, `blok_veelgestelde_vragen.py` regel 82. De zin was op mijn eerdere instructie verwijderd en mag terug |
| ook toegestaan op | `/inboedelopslag/` zodra die route vrijkomt |
| gecontroleerd op | 30-08-2026 |

## C18 - Het stappenplan op twee dienstpagina.s ontbreekt

| veld | inhoud |
|---|---|
| status | OPEN. Vraagt kennis van de werkvloer, niet van de voorwaarden |
| wat er is gebeurd | tien dienstpagina.s droegen woordelijk hetzelfde consumentenstappenplan, dat eindigt op "Thuis in uw nieuwe woning". Op `/inboedelopslag/` klopt dat niet, want de rit eindigt in een opslagpand, en bij `/montage-demontage/` is er vaak helemaal geen verhuizing. Terminal 1 heeft het blok op die twee routes weggehaald (R-001) |
| waarom er niets voor in de plaats kwam | terecht, en om dezelfde reden waarom ik bij C10 alleen liet schrappen: een onjuiste bewering weghalen mag zonder de klant te raadplegen, een nieuwe bewering over hoe het bedrijf werkt verzinnen niet. Een stappenplan is precies zo.n bewering |
| gevolg nu | die twee pagina.s beschrijven wel de voorwaarden, de termijnen en de grenzen, maar niet hoe een opdracht praktisch verloopt. Dat is een gat in de inhoud, geen onjuistheid |
| wat er nodig is | van Shahab: hoe loopt een opslagopdracht van opname tot inslag tot teruggave, en hoe loopt een losse montageklus. Vier tot zes stappen per dienst is genoeg. Daarna schrijft T3 ze en gelden ze als claim |
| let ook op de andere acht | daar staat het gedeelde stappenplan nog. Het is generiek maar niet onjuist, dus het hoeft niet weg. Een eigen stappenplan per dienst zou wel de laatste echte dubbeling opheffen |
| opgevoerd op | 30-08-2026 |

## C9 - Wat nog op de klant wacht

Deze punten kunnen wij niet in de repo oplossen. Ze staan hier zodat ze in een keer kunnen worden
afgehandeld en nergens als aanname op de site belanden.

| # | wat | waarom het klemt |
|---|---|---|
| ~~U1~~ | BEANTWOORD 30-08: De Bresser Verhuizingen B.V., KvK 18014730, is de contractpartij | C4 staat |
| ~~U2~~ | BEANTWOORD 30-08: Horsterweg 217 is historie, niet meer in gebruik | adres nergens meer opnemen |
| ~~U3~~ | BEANTWOORD 30-08: alle verhuizers zijn gediplomeerd, bevestigd door de eigenaar | C5 staat op GOEDGEKEURD |
| ~~U4~~ | VERVALLEN 30-08: wij noemen geen certificaatnummers of data meer, alleen dat onze vestiging er via De Bresser onder valt | C6 |
| U5 | actuele polis met limieten, duur en uitzonderingen | `/verzekering/` en iedere opslagdekkingsclaim; `/inboedelopslag/` blijft tot die tijd noindex |
| ~~U6~~ | BEANTWOORD 30-08: 08:00 tot 17:00, ook in schema | openingstijden.nl noemt 07:30 en moet worden bijgewerkt |
| U7 | oprichtingsjaar op de externe profielen | BESLOTEN 30-08: de site houdt 1910 aan met de advertentie als bron. Openstaand is het bijwerken van LinkedIn en de profielen die 1895 noemen; zolang die iets anders zeggen, verzwakt dat de entiteit |
| U8 | WhatsApp op 077 32 32 100 | alleen aanbieden als het nummer het echt ontvangt |
| U9 | toestemming voor het woordelijk publiceren van de voorwaardensets, en of AVB 2020 erbij komt | staat nu voluit op `/algemene-voorwaarden/`; zonder toestemming wordt het een eigen samenvatting met links naar de officiele documenten |
| U10 | Web3Forms-productiekey en de ontvangende mailbox | 28 gerenderde pagina's dragen nu een placeholder; geen enkel formulier komt aan |
