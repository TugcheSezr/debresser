# GAPS-A, dekkingscheck terminal-a/ruw

Peildatum 19-08-2026. 23 bestanden, 5.046 vragen, allemaal valide JSON.

Methode: elke vraag is met Nederlandse trefwoordregels tegen de subthema-lijst uit COORDINATIE.md gelegd.
Kolom "corpus" = treffers in de hele oogst, kolom "in-cat" = treffers waarvan `categorie_gok` ook op het
bovenliggende thema staat. Een vraag kan meerdere subthema's raken.

## Bestandsvalidatie

Geen kapotte bestanden. Alle 23 bestanden parsen als JSON-array, alle 5.046 records hebben exact
dezelfde 5 sleutels (`vraag`, `bron_url`, `bron_type`, `bron_antwoord_kern`, `categorie_gok`),
alle `categorie_gok`- en `bron_type`-waarden vallen binnen de enum, geen lege `vraag` of `bron_url`,
alle URL's beginnen met http.

Aandachtspunten, geen blockers:

- `vraag_origineel` komt in 0 records voor. Optioneel veld, maar bij Engelstalige bronnen (expat, VK) zou het gevuld moeten zijn.
- 186 records hebben een lege `bron_antwoord_kern`. Schema staat dat toe, maar dit zijn 186 vragen zonder brontekst om een antwoord op te baseren. Zwaarste gevallen: landelijk-1.json (31 van 169), prov-noord-holland.json (15 van 94), kievit-eigen-faq.json (8 van 56).
- 436 overtollige regels door dubbele vraagteksten, 207 daarvan over meerdere bestanden heen. Conform de afspraak, ontdubbeling gebeurt centraal in fase 2.
- `bron_type` gebruikt maar 3 van de 7 enum-waarden: faq-pagina 3.589, artikel 1.405, review 52. Logisch voor de A-taak, paa/autocomplete/ahrefs/forum zijn Terminal B.

## Dekking per subthema

| thema | subthema | corpus | in-cat | oordeel |
|---|---|---|---|---|
| particulier | kosten-offerte | 800 | 484 | ruim |
| particulier | plannen-voorbereiden | 265 | 217 | ruim |
| particulier | inpakken-materiaal | 207 | 194 | ruim |
| particulier | verhuisdag | 225 | 175 | ruim |
| particulier | verzekering-schade | 483 | 369 | ruim |
| particulier | regelzaken | 256 | 216 | ruim |
| zakelijk | kantoorverhuizing | 71 | 65 | voldoende |
| zakelijk | projectverhuizing | 34 | 21 | voldoende |
| zakelijk | archiefverhuizing en -opslag | 7 | 5 | DUN |
| zakelijk | ICT-verhuizing | 9 | 9 | DUN |
| internationaal | binnen EU | 25 | 24 | DUN, zie hieronder |
| internationaal | overzees | 2 | 2 | GAT |
| internationaal | douane | 16 | 14 | DUN |
| internationaal | emigratie | 35 | 34 | voldoende |
| opslag-specialistisch | opslag en inboedelopslag | 264 | 243 | ruim |
| opslag-specialistisch | verhuislift | 183 | 131 | ruim |
| opslag-specialistisch | piano, kluis, zwaar | 119 | 112 | ruim |
| opslag-specialistisch | senioren | 109 | 67 | ruim |
| opslag-specialistisch | spoed | 61 | 45 | voldoende |
| opslag-specialistisch | student | 46 | 19 | voldoende |
| bedrijf | werkgebied | 14 | 11 | DUN |
| bedrijf | keurmerken | 234 | 62 | ruim |
| bedrijf | offerte aanvragen | 65 | 27 | voldoende |
| bedrijf | annuleren | 23 | 9 | krap |
| bedrijf | betalen | 61 | 19 | voldoende |
| bedrijf | verzekerd zijn | 98 | 2 | zie labelnotitie |

Geen enkel subthema ontbreekt volledig. Eén subthema zit onder de 5 vragen: internationaal/overzees.

## Wat er per gat mist

**internationaal/overzees (2 vragen)**
Het enige echte gat. Aanwezig zijn alleen "Kan een Erkende Verhuizer mij helpen bij verhuizen buiten
Europa of overzee?" en "Hoe lang is mijn overzeese verhuizing onderweg naar mijn bestemming?".
Bestemmingen in de hele oogst geteld: Amerika en Canada 0, Australie en Nieuw-Zeeland 0, Azie 0,
Afrika 1, Caribisch gebied 3. Ontbreekt: zeevracht versus luchtvracht, FCL versus LCL en groupage,
transittijden per bestemming, containermaten en beladingsgraad, havenkosten en demurrage,
verzekering bij zeetransport, quarantaine-eisen (Australie, Nieuw-Zeeland), auto of huisdier meesturen
overzee, opslag in het land van bestemming.
Let op: zoeken op "container" levert 25 treffers, maar dat zijn vrijwel allemaal opslagcontainers
uit de self-storage-vragen, geen zeecontainers. Niet meetellen als dekking.

**internationaal/binnen EU (25 vragen, scheve verdeling)**
Getal lijkt acceptabel, maar de landenspreiding is scheef. Genoemde bestemmingen: Engeland en VK 38,
Duitsland 5, Frankrijk 5, Italie 3, Belgie 2, Spanje 2, Oostenrijk 1, Scandinavie 1, Portugal 0.
Het VK is de best gedekte bestemming terwijl dat sinds Brexit juist geen EU is. Voor De Kievit in Venlo,
op de Duitse grens, zijn Duitsland en Belgie de commercieel belangrijkste bestemmingen en die staan op
5 en 2. Ontbreekt: grensverhuizing Venlo naar Noordrijn-Westfalen, Anmeldung en Abmeldung,
Duitse en Belgische adresregistratie, zorgverzekering en belasting bij grensarbeid, btw-regels binnen de EU,
cabotage en vergunningen, kentekenoverschrijving naar Duitsland of Belgie.

**internationaal/douane (16 vragen)**
Boven de grens maar mager voor een thema met veel harde regels. Ontbreekt: verhuisboedelvrijstelling
in detail (voorwaarden, termijnen, 12-maandsregel), inventarislijst in het Engels, accijnsgoederen
zoals drank, wapens, medicijnen en planten, ATA-carnet, douane-agent versus zelf aangeven,
en wat er gebeurt bij een douanecontrole of vertraging.

**zakelijk/archiefverhuizing en -opslag (7 vragen, 5 in categorie)**
Ligt precies op de grens. Aanwezige vragen gaan over archiefopslag en archiefvernietiging bij Deudekom.
Ontbreekt: AVG en vertrouwelijkheid tijdens transport, verzegelde archiefwagens, keten van
verantwoordelijkheid en overdrachtsprotocol, bewaartermijnen, digitaliseren voor of na de verhuizing,
terugvraagtijd van een dossier uit externe opslag, kosten per strekkende meter.

**zakelijk/ICT-verhuizing (9 vragen)**
Alle 9 staan correct op zakelijk. Ze dekken los- en aankoppelen van werkplekken en servers.
Ontbreekt: downtime en verhuizen buiten kantoortijden, ESD- en schokbescherming, serverracks en UPS,
back-up voor vertrek, aansprakelijkheid bij dataverlies, verzekering van ICT boven de normale
inboeddellimiet, testen en opleveren na de verhuizing.
Let op: breed zoeken op computer of apparatuur geeft 27 treffers, maar het merendeel is
consumentenelektronica en modems van de provider, geen zakelijke ICT.

**bedrijf/werkgebied (14 vragen, 11 in categorie)**
Dun en dit is nu juist een Kievit-specifiek subthema dat de bot vaak zal krijgen. Ontbreekt:
precieze dekking Noord- en Midden-Limburg, wel of niet buiten de regio, verhuizen naar de rest van
Nederland vanuit Venlo, voorrijkosten of kilometertoeslag buiten het werkgebied, dekking in Duitsland
en Belgie vanuit Venlo, plaatsnaamvragen (Venlo, Venray, Roermond, Weert, Horst, Panningen).
Breed zoeken op regio of gemeente geeft 38 treffers, maar dat zijn vooral gemeentelijke regelzaken
zoals waterregio en gemeentebelasting, geen werkgebiedvragen.

**bedrijf/annuleren (23 corpus, 9 in categorie)**
Net boven de grens en inhoudelijk redelijk (annuleringskosten, AVVV 2025, bedenktijd, datum wijzigen).
Ontbreekt: annuleren door het verhuisbedrijf zelf, overmacht en weer, ziekte van de klant,
verschuiven van de sleuteloverdracht, en of een aanbetaling terugkomt.

## Labelnotitie, geen inhoudelijk gat

**bedrijf/verzekerd zijn**: 98 vragen in de oogst, maar slechts 2 staan op `categorie_gok: bedrijf`.
De rest zit onder particulier/verzekering-schade. Inhoudelijk goed gedekt, wel opletten bij de merge:
vragen als "Zijn jullie verzekerd?" horen in de bot bij het bedrijfsblok, niet bij het schadeblok.

## Kievit-specifiek

Slechts 49 van de 5.046 vragen noemen De Kievit expliciet (20 particulier, 19 bedrijf,
4 opslag-specialistisch, 3 internationaal, 3 zakelijk). Voor een bot die namens De Kievit praat is dat
mager op precies de vragen die het meest gesteld worden: openingstijden, contact en bereikbaarheid,
hoe snel een offerte, welke betaalmethoden, wat kost een verhuizing in Venlo of Roermond.
Dit is een taak voor fase 2 (Kievit-specifieke antwoorden), niet voor de harvest.

## Advies, prioriteit voor bijoogst

1. internationaal/overzees, van 2 naar minimaal 25 vragen. Enige echte gat.
2. internationaal/binnen EU, gericht op Duitsland en Belgie vanuit Venlo, minimaal 20 vragen.
3. bedrijf/werkgebied, Kievit en Noord- en Midden-Limburg, minimaal 15 vragen.
4. zakelijk/archiefverhuizing en ICT-verhuizing, elk naar minimaal 15 vragen.
5. internationaal/douane naar minimaal 25 vragen.
6. De 186 records met lege `bron_antwoord_kern` alsnog van brontekst voorzien of laten vallen.
