"""Eigen tekst voor /zorgverhuizing/ op de BESTAANDE blokken. Ontwerp blijft ongemoeid.

Pas alleen de TWEEDE string van elk paar aan. Laat je een paar ongewijzigd, dan gebeurt er
niets; je mag zo'n paar ook weghalen. Voeg geen tags toe die een blok maken (section, div,
ul, li, p, h2, h3): build_paginas.py vergelijkt het blokskelet en faalt dan. Inline <a>,
<strong> en <em> mogen wel.

Bronmateriaal met de al geschreven tekst: _werk/paginas/teksten-bewaard/zorgverhuizing.html
Herbouwen: python3 _werk/build_paginas.py
"""

BESCHRIJVING = 'Zorgverhuizing in Venlo en omgeving. Wie de opdracht geeft bepaalt welke voorwaarden gelden; wij stemmen af met de locatie voor er iets beweegt.'

VERVANG = [
    # --- Uw offerte, gratis en vrijblijvend ---
    # <span>, 64 tekens
    ('<b>9,4 op Klantenvertellen</b>779 beoordelingen, 99% beveelt aan',
     '<b>9,4 op Klantenvertellen</b>779 beoordelingen, 99% beveelt aan'),
    # <span>, 70 tekens
    ('<b>Erkende Verhuizer</b>met Garantiecertificaat en verzekerde inboedel',
     '<b>Erkende Verhuizer</b>met Garantiecertificaat en verzekerde inboedel'),
    # <span>, 63 tekens
    ('<b>Sinds 1910 in Venlo</b>meer dan honderd jaar verhuiservaring',
     '<b>Sinds 1910 in Venlo</b>meer dan honderd jaar verhuiservaring'),
    # <span>, 71 tekens
    ('<b>Lid van Top Movers</b>landelijk netwerk van erkende verhuisbedrijven',
     '<b>Lid van Top Movers</b>landelijk netwerk van erkende verhuisbedrijven'),
    # <p class=label>, 16 tekens
    ('Waarom De Kievit',
     'Voor wie het regelt'),
    # <h2 class=kop>, 30 tekens
    ('Verhuizen zonder verhuisstress',
     'Wie de opdracht geeft, telt hier'),

    # --- Verhuizen zonder verhuisstress ---
    # <p class=intro>, 426 tekens
    ('Met De Kievit weet u vooraf waar u aan toe bent: wij komen langs, spreken alles met u door en leggen het vast in een offerte, zodat er op de dag zelf niets meer uitgezocht hoeft te worden. Als Erkende Verhuizer werken wij volgens de branchevoorwaarden van de Organisatie voor Erkende Verhuizers, met een Garantiecertificaat en een verzekering van uw inboedel. U houdt van de opname tot de laatste doos hetzelfde aanspreekpunt.',
     'Bij een zorgverhuizing is degene die verhuist meestal niet degene die de opdracht geeft: een familielid of een organisatie regelt het en de bewoner merkt vooral het resultaat. Die scheiding bepaalt met wie wij afspreken en welke voorwaarden gelden. Geeft de bewoner de opdracht, dan is het een particuliere verhuizing met Garantiecertificaat; geeft de organisatie hem, dan gelden de <a href="/algemene-voorwaarden/#avb">Algemene Voorwaarden Bedrijfsverhuizingen</a>. Wij vragen dat vooraf en zetten het in de offerte.'),
    # <h3>, 19 tekens
    ('Opgeleid eigen team',
     'Verhuizers, geen zorgverleners'),
    # <p>, 279 tekens
    ('Ons verhuisteam is in dienst en opgeleid. Van het team dat bij u inpakt, ophaalt en aflevert heeft minstens de helft een erkend verhuisdiploma; dat is de norm van Erkende Verhuizers waar wij aan gebonden zijn. Wij zijn daarnaast erkend leerbedrijf. Geen wisselende invalkrachten.',
     'Ons verhuisteam is in dienst en opgeleid; van het team dat inpakt, ophaalt en aflevert heeft minstens de helft een erkend verhuisdiploma. Zorg verlenen doen wij niet: geen hulp bij opstaan, kleden of medicatie. Is de bewoner erbij, dan gaan wij ervan uit dat de begeleiding geregeld is.'),
    # <h3>, 18 tekens
    ('Alles volgens plan',
     'Eerst afstemmen'),
    # <p>, 192 tekens
    ('Voor de verhuizing komen wij bij u langs en maken wij samen een plan, zodat u op de dag zelf nergens aan hoeft te denken. U weet vooraf hoe laat wij er zijn en wanneer alles op uw adres staat.',
     'Bij een zorgverhuizing zit het werk in de afstemming en niet in de rit. Wij willen vooraf weten wie op de dag beslist, wanneer de deuren open zijn en op welke uren er niet gewerkt kan worden.'),
    # <h3>, 25 tekens
    ('Verzekerd en gegarandeerd',
     'Wat er verzekerd is'),
    # <p>, 225 tekens
    ('Uw inboedel is tijdens een verhuizing binnen Nederland verzekerd tot ten minste 100.000 euro op nieuwwaarde, en het Garantiecertificaat van Erkende Verhuizers beschermt uw aanbetaling en garandeert dat de verhuizing doorgaat.',
     'Geeft de bewoner de opdracht, dan is de inboedel binnen Nederland verzekerd tot ten minste 100.000 euro op nieuwwaarde, met Garantiecertificaat. Geeft de organisatie de opdracht, dan gelden andere grenzen en is er geen Garantiecertificaat.'),
    # <p>, 210 tekens
    ('Klanten geven De Kievit op Klantenvertellen een 9,4 uit 779 beoordelingen en 99 procent beveelt ons aan. Die beoordelingen staan met naam, woonplaats en datum op <a href="/klantervaringen/">klantervaringen</a>.',
     'Klanten geven De Kievit op Klantenvertellen een 9,4 uit 779 beoordelingen en 99 procent beveelt ons aan. Die beoordelingen staan met naam, woonplaats en datum op <a href="/klantervaringen/">klantervaringen</a>.'),
    # <p class=label>, 15 tekens
    ('Het verhuisteam',
     'Onze mensen'),
    # <h2 class=kop>, 54 tekens
    ('Vakmensen met een verhuisdiploma en verstand van zaken',
     'Vakmensen die weten hoe het in een zorggebouw werkt'),

    # --- Vakmensen met een verhuisdiploma en verstand van zaken ---
    # <p class=intro>, 437 tekens
    ('De Kievit stelt hoge eisen aan haar medewerkers en materieel. Uw verhuizing wordt uitgevoerd door goed opgeleide vakmensen: gediplomeerde inboedelverhuizers die uw inboedel inpakken, uw meubels demonteren en monteren en alles veilig op de plaats van bestemming brengen. Sinds 1 juni 2024 maakt De Kievit deel uit van De Bresser Verhuizingen; het hele team uit Venlo ging daarbij mee, dus u ziet dezelfde vertrouwde gezichten aan de deur.',
     'De Kievit stelt hoge eisen aan haar medewerkers en materieel. Uw verhuizing wordt uitgevoerd door gediplomeerde inboedelverhuizers die inpakken, meubels demonteren en monteren en alles veilig op de plaats van bestemming brengen. In een gebouw waar mensen wonen houden zij de gang vrij en werken zij met korte aanvoer in plaats van alles in &eacute;&eacute;n keer neer te zetten. Bewoners spreken zij niet aan over hun situatie.'),
    # <span>, 46 tekens
    ('lid van de Organisatie voor Erkende Verhuizers',
     'lid van de Organisatie voor Erkende Verhuizers'),
    # <span>, 41 tekens
    ('SBB-leerbedrijf voor chauffeur wegvervoer',
     'SBB-leerbedrijf voor chauffeur wegvervoer'),
    # <h2 class=kop>, 40 tekens
    ('Even geen plek? Wij slaan uw inboedel op',
     'Wat niet mee kan, kan de opslag in'),

    # --- Even geen plek? Wij slaan uw inboedel op ---
    # <p class=intro>, 172 tekens
    ('Tijdelijk of voor langere tijd: uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container. Op de afgesproken dag brengen wij alles naar uw nieuwe adres.',
     'Een verhuizing naar &eacute;&eacute;n kamer betekent bijna altijd dat er dingen achterblijven. Wat niet mee kan maar ook niet weg hoeft, gaat in houten opslagkisten of een eigen container.'),
    # <span class=eyebrow>, 26 tekens
    ('Wij zijn Erkende Verhuizer',
     'Wij zijn Erkende Verhuizer'),
    # <h2>, 42 tekens
    ('Acht zekerheden die u er gratis bij krijgt',
     'Acht zekerheden die u er gratis bij krijgt'),

    # --- Acht zekerheden die u er gratis bij krijgt ---
    # <p>, 249 tekens
    ('Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Wat dat u oplevert, staat hieronder.',
     'Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Wat dat u oplevert, staat hieronder.'),
    # <li>, 227 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>In het register van Erkende Verhuizers</b>Met een eigen vermelding in het ledenregister van de Organisatie voor Erkende Verhuizers.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>In het register van Erkende Verhuizers</b>Met een eigen vermelding in het ledenregister van de Organisatie voor Erkende Verhuizers.</span>'),
    # <li>, 216 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Garantiecertificaat bij elke verhuizing</b>Verplicht bij elke particuliere verhuizing, en tegelijk uw verzekeringspolis.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Garantiecertificaat bij elke verhuizing</b>Verplicht bij elke particuliere verhuizing, en tegelijk uw verzekeringspolis.</span>'),
    # <li>, 192 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Verzekerd tot 100.000 euro</b>Uw verhuisgoederen zijn binnen Nederland verzekerd op nieuwwaarde.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Verzekerd tot 100.000 euro</b>Uw verhuisgoederen zijn binnen Nederland verzekerd op nieuwwaarde.</span>'),
    # <li>, 211 tekens
    # <li>, 199 tekens
    # <li>, 226 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Opslag meeverzekerd</b>Bij een verhuizing binnen Nederland is opslag de eerste twaalf maanden verzekerd als tijdens de verhuizing.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Opslag meeverzekerd</b>Bij een verhuizing binnen Nederland is opslag de eerste twaalf maanden verzekerd als tijdens de verhuizing.</span>'),
    # <li>, 225 tekens
    # <li>, 223 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Ook net over de grens</b>Verhuizingen naar Nedersaksen en Noordrijn-Westfalen vallen onder het Nederlandse Garantiecertificaat.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Ook net over de grens</b>Verhuizingen naar Nedersaksen en Noordrijn-Westfalen vallen onder het Nederlandse Garantiecertificaat.</span>'),
    # <p class=zeker__bron>, 127 tekens
    ('Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025) en het Garantiecertificaat van de Organisatie voor Erkende Verhuizers.',
     'Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025) en het Garantiecertificaat van de Organisatie voor Erkende Verhuizers.'),
    # <p class=label>, 12 tekens
    ('Zo werkt het',
     'De dag zelf'),
    # <h2 class=kop>, 25 tekens
    ('Zo verloopt uw verhuizing',
     'Zo verloopt een zorgverhuizing'),

    # --- Zo verloopt uw verhuizing ---
    # <p class=intro>, 223 tekens
    ('Vier stappen, en bij elke stap weet u waar u aan toe bent. Van het eerste telefoontje tot het moment dat de laatste doos binnen staat houdt u hetzelfde aanspreekpunt in Venlo, zodat u nooit opnieuw uw verhaal hoeft te doen.',
     'Vier stappen, en het meeste werk zit in de voorbereiding. Wij komen langs, spreken met degene die het regelt en zetten de afspraken op papier, inclusief op wiens naam de opdracht staat. Daarna is de dag zelf vooral uitvoering.'),
    # <h3>, 15 tekens
    ('Neem contact op',
     'Bel zodra de datum er is'),
    # <p>, 227 tekens
    ('Bel 077 - 32 32 100 of vraag online een offerte aan. Vertel kort waar u vandaan komt, waar u naartoe gaat en wanneer u wilt verhuizen. Wij kijken meteen of die datum nog vrij is en wat er nodig is aan mensen, materiaal en tijd.',
     'Bel 077 - 32 32 100 zodra u de datum weet, ook als er nog niets is besloten over wat er mee gaat. Bij een zorgverhuizing staat die datum er vaak eerder dan het besluit. Moet het binnen dagen, kijk dan bij <a href="/spoedverhuizing/">spoedverhuizing</a>.'),
    # <h3>, 15 tekens
    ('Opname aan huis',
     'Opname en opdracht'),
    # <p>, 244 tekens
    ('Onze verhuisadviseur komt bij u langs en maakt een plan: welke meubels uit elkaar moeten, wat er ingepakt wordt en waar de wagen kan staan. U ontvangt daarna een gratis en vrijblijvende offerte waarin precies staat wat wij doen en wat het kost.',
     'Wij komen langs op beide locaties: de route door het gebouw, de maten van de nieuwe kamer, wat er mee gaat en wie beslist. Daarna volgt de offerte, met een all-in prijs of een richtprijs, en met de naam van de opdrachtgever erin.'),
    # <h3>, 21 tekens
    ('Inpakken en verhuizen',
     'Bed en kast eerst'),
    # <p>, 254 tekens
    ('Op de verhuisdag pakt het team in, demonteert wat nodig is en brengt alles veilig naar uw nieuwe adres. Kwetsbare stukken gaan in verhuisdekens de wagen in en de dozen komen per kamer bij elkaar te staan, zodat u op het nieuwe adres niet hoeft te zoeken.',
     'Eerst het bed en de kast, want die bepalen de indeling; daarna de rest. Wat uit elkaar moet om door de deur te passen, zetten wij aan de andere kant weer in elkaar. Van medische apparatuur en alles met een instelling erin blijven wij af; dat doet de leverancier.'),
    # <h3>, 25 tekens
    ('Thuis in uw nieuwe woning',
     'De eerste avond klopt'),
    # <p>, 170 tekens
    ('Meubels gemonteerd, wasmachine aangesloten, dozen op hun plek. U betaalt pas na de verhuizing, per bank op factuur, en de lege verhuisdozen halen wij later weer bij u op.',
     "De set voor de eerste avond gaat als laatste in de wagen en als eerste eruit: bed opgemaakt, stoel op zijn plek, bril en foto's binnen bereik. Daarna lopen wij samen rond."),
    # <p class=label>, 23 tekens
    ('Particulier en zakelijk',
     'Particulier en zakelijk'),
    # <h2 class=kop>, 51 tekens
    ('E&eacute;n verhuisbedrijf voor alles wat u verhuist',
     'E&eacute;n verhuisbedrijf, twee soorten opdrachtgever'),

    # --- E&eacute;n verhuisbedrijf voor alles wat u verhuist ---
    # <p class=intro>, 301 tekens
    ('Bij De Kievit kunt u terecht voor uw particuliere verhuizing, een bedrijfs- of projectverhuizing, inboedelopslag en een verhuizing naar het buitenland. U krijgt dezelfde planner, hetzelfde team en dezelfde voorwaarden, of u nu een appartement in Blerick verhuist of een kantoor met dertig werkplekken.',
     'Bij De Kievit kunt u terecht voor uw particuliere verhuizing, een bedrijfs- of projectverhuizing, inboedelopslag en een verhuizing naar het buitenland. Bij een zorgverhuizing bepaalt de naam op de opdracht het verschil: die van de bewoner geeft de particuliere voorwaarden, die van de organisatie de <a href="/algemene-voorwaarden/#avb">zakelijke</a>, met begrensde aansprakelijkheid en zonder automatische verzekering.'),
    # <span>, 20 tekens
    ('van studio tot villa',
     'van studio tot villa'),
    # <span>, 26 tekens
    ('kantoor, zorg en onderwijs',
     'kantoor, zorg en onderwijs'),
    # <span>, 26 tekens
    ('opslagkisten en containers',
     'opslagkisten en containers'),
    # <span>, 34 tekens
    ('Duitsland, Belgi&euml; en Engeland',
     'Duitsland, Belgi&euml; en Engeland'),
    # <h2 class=kop>, 51 tekens

    # --- Verhuizen in Venlo en heel Noord- en Midden-Limburg ---
    # <p class=intro>, 287 tekens
    ('Vanuit Venlo verhuizen wij in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. Als lid van Top Movers regelen wij ook verhuizingen naar de rest van Nederland, samen met collega-leden die net als wij Erkende Verhuizer zijn.',
     'Vanuit Venlo verhuizen wij in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. Gaat een bewoner binnen hetzelfde gebouw naar een andere kamer, dan is de route door de gangen belangrijker dan de rit; ook dan komen wij eerst kijken.'),
    # <li>, 55 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Venlo',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Venlo'),
    # <li>, 57 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Blerick',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Blerick'),
    # <li>, 57 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Tegelen',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Tegelen'),
    # <li>, 57 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Belfeld',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Belfeld'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Reuver',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Reuver'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Velden',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Velden'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Venray',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Venray'),
    # <li>, 55 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Horst',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Horst'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Lottum',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Lottum'),
    # <li>, 58 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Maasbree',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Maasbree'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Baarlo',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Baarlo'),
    # <li>, 59 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Panningen',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Panningen'),
    # <li>, 58 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Roermond',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Roermond'),
    # <li>, 54 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Echt',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Echt'),
    # <li>, 60 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Nederweert',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Nederweert'),
    # <p>, 194 tekens
    # <h2 class=kop>, 16 tekens
    ('Goed om te weten',
     'Wat familie en organisaties vragen'),

    # --- Goed om te weten ---
    # <p class=faq__door>, 253 tekens
    ('De vragen die het vaakst terugkomen over kosten, verhuisdozen,\n      opslag, verzekering en planning staan bij elkaar op\n      <a href="/veelgestelde-vragen/">veelgestelde vragen</a>. Staat uw vraag er niet bij, bel dan\n      077 - 32 32 100 of app ons.',
     'De vragen die het vaakst terugkomen over kosten, verhuisdozen, opslag, verzekering en planning staan bij elkaar op <a href="/veelgestelde-vragen/">veelgestelde vragen</a>. Verhuist iemand op leeftijd zelf, kijk dan bij <a href="/seniorenverhuizing/">seniorenverhuizing</a>; anders bel 077 - 32 32 100.'),
    # <span class=eyebrow>, 20 tekens
    ('Vraag uw offerte aan',
     'Laat iemand langskomen'),
    # <h2>, 32 tekens
    ('Klaar om zorgeloos te verhuizen?',
     'Eerst langskomen, dan pas data'),

    # --- Klaar om zorgeloos te verhuizen? ---
    # <p class=lead-p>, 145 tekens
    ('Vul uw gegevens in, dan ontvangt u een gratis en vrijblijvende offerte. Hoe meer u kwijt kunt over uw woning en inboedel, hoe preciezer de prijs.',
     'Vul uw gegevens in, dan komen wij langs voordat er data worden vastgelegd. Vertel er kort bij op wiens naam de opdracht komt te staan.'),
    # <span class=lead-google__stars>, 35 tekens
    ('&#9733;&#9733;&#9733;&#9733;&#9733;',
     '&#9733;&#9733;&#9733;&#9733;&#9733;'),
    # <span class=lead-google__cnt>, 41 tekens
    ('uit 779 beoordelingen op Klantenvertellen',
     'uit 779 beoordelingen op Klantenvertellen'),
    # <span>, 16 tekens
    ('Weet ik nog niet',
     'Weet ik nog niet'),
    # <span>, 37 tekens
    ('Hoe heeft u ons gevonden? (optioneel)',
     'Hoe heeft u ons gevonden? (optioneel)'),
    # <span class=lfcalc__titel>, 43 tekens
    ('Ik weet nog niet hoeveel dozen ik nodig heb',
     'Ik weet nog niet hoeveel dozen ik nodig heb'),
    # <span>, 13 tekens
    ('Woonoppervlak',
     'Woonoppervlak'),
    # <span>, 15 tekens
    ('Hoeveel spullen',
     'Hoeveel spullen'),
    # <span>, 21 tekens
    ('Zolder of berging vol',
     'Zolder of berging vol'),
    # <span>, 12 tekens
    ('Hobbyspullen',
     'Hobbyspullen'),
    # <p>, 46 tekens
    ('Er ontbreekt nog iets. Controleer deze velden:',
     'Er ontbreekt nog iets. Controleer deze velden:'),

    # --- opslagblok: bovenkop en knop per pagina (verzoek Shahab 30-aug). Kop en intro
    # stonden al paginaspecifiek; deze twee waren nog op alle elf gelijk.
    ('<p class="label">Inboedelopslag</p>',
     '<p class="label">Wat thuis blijft</p>'),
    ('>Vraag opslag aan<',
     '>Opslag voor thuisspullen<'),

    # --- werkgebied volledig op het onderwerp van de pagina (Shahab 30-aug):
    # bovenkop, kop, slotalinea en knop. De plaatschips blijven overal gelijk, dat is
    # het werkgebied zelf. De grensstreekclaim (C13) blijft woordelijk staan.
    ('<p class="label">Werkgebied</p>',
     '<p class="label">Waar wij zorglocaties rijden</p>'),
    ('>App ons uw adressen<',
     '>App ons de locatie<'),
    ('Verhuizen in Venlo en heel Noord- en Midden-Limburg',
     'Zorgverhuizingen in Venlo en heel Noord- en Midden-Limburg'),
    ('Verhuist u naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen, geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.',
     'Gaat de verhuizing naar een locatie net over de grens? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.'),
]
