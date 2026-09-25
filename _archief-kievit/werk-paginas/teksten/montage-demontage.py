"""Eigen tekst voor /montage-demontage/ op de BESTAANDE blokken.

Deze route draagt het gedeelde stappenplan NIET: dat beschrijft een consumentenverhuizing die
eindigt met "Thuis in uw nieuwe woning" en bij een losse montageklus is er vaak helemaal geen
verhuizing (R-001 in build_paginas.py). Er is hier dus geen werkwijzeblok om te vullen.

Herbouwen: python3 _werk/build_paginas.py
"""

BESCHRIJVING = 'Kasten, bedden en boxsprings demonteren en weer opbouwen in Venlo en omgeving. Meerwerk vooraf op papier, een jaar garantie op het werk zelf.'

VERVANG = [
    ('Waarom De Kievit',
     'Montage en demontage'),
    ('Verhuizen zonder verhuisstress',
     'Kasten, bedden en boxsprings'),
    ('Met De Kievit weet u vooraf waar u aan toe bent: wij komen langs, spreken alles met u door en leggen het vast in een offerte, zodat er op de dag zelf niets meer uitgezocht hoeft te worden. Als Erkende Verhuizer werken wij volgens de branchevoorwaarden van de Organisatie voor Erkende Verhuizers, met een Garantiecertificaat en een verzekering van uw inboedel. U houdt van de opname tot de laatste doos hetzelfde aanspreekpunt.',
     'Uit elkaar halen is het makkelijke deel; het gaat erom dat het aan de andere kant weer stevig in elkaar staat. Wij demonteren kasten, bedden, boxsprings en tafels, nemen het beslag mee in gemerkte zakjes en bouwen alles op het nieuwe adres weer op. Wij komen vooraf kijken welke meubels het betreft, want daar hangt af hoeveel tijd en hoeveel mensen er nodig zijn.'),
    ('Ons verhuisteam is in dienst en opgeleid. Van het team dat bij u inpakt, ophaalt en aflevert heeft minstens de helft een erkend verhuisdiploma; dat is de norm van Erkende Verhuizers waar wij aan gebonden zijn. Wij zijn daarnaast erkend leerbedrijf. Geen wisselende invalkrachten.',
     'Ons team is in dienst en opgeleid. Van het team dat bij u werkt heeft minstens de helft een erkend verhuisdiploma. Zij weten welke kast je beter staand verplaatst dan uit elkaar haalt, waar een boxspring op vastloopt en hoe een schroefdraad in spaanplaat zich gedraagt als hij voor de derde keer open gaat.'),
    ('Alles volgens plan',
     'Meerwerk gaat op papier'),
    ('Voor de verhuizing komen wij bij u langs en maken wij samen een plan, zodat u op de dag zelf nergens aan hoeft te denken. U weet vooraf hoe laat wij er zijn en wanneer alles op uw adres staat.',
     'Blijkt er ter plekke meer werk te zijn dan afgesproken, dan hoort u dat voor wij beginnen en leggen wij het vast. Nooit achteraf op de rekening, altijd vooraf op papier. U tekent pas voor het werk als het klaar is en u het gezien heeft.'),
    ('Verzekerd en gegarandeerd',
     'Een jaar op het werk zelf'),
    ('Uw inboedel is tijdens een verhuizing binnen Nederland verzekerd tot ten minste 100.000 euro op nieuwwaarde, en het Garantiecertificaat van Erkende Verhuizers beschermt uw aanbetaling en garandeert dat de verhuizing doorgaat.',
     'Op het montagewerk zelf zit een jaar garantie. Dat gaat over onze handeling, niet over het meubel: op materiaal dat al versleten of eerder beschadigd was kunnen wij geen garantie geven, en dat zeggen wij ter plekke als wij het zien.'),
    ('Het verhuisteam',
     'Voor u begint'),
    ('Vakmensen met een verhuisdiploma en verstand van zaken',
     'Wat wij doen, en waar wij stoppen'),
    ('De Kievit stelt hoge eisen aan haar medewerkers en materieel. Uw verhuizing wordt uitgevoerd door goed opgeleide vakmensen: gediplomeerde inboedelverhuizers die uw inboedel inpakken, uw meubels demonteren en monteren en alles veilig op de plaats van bestemming brengen. Sinds 1 juni 2024 maakt De Kievit deel uit van De Bresser Verhuizingen; het hele team uit Venlo ging daarbij mee, dus u ziet dezelfde vertrouwde gezichten aan de deur.',
     'Wij demonteren en monteren meubels. Wat wij niet doen is elektra, water en gas aansluiten, gaten boren in een huurwoning zonder toestemming van de eigenaar, of een meubel opnieuw in elkaar zetten waarvan het beslag ontbreekt of de plaat al is uitgescheurd. Zeg vooraf welke meubels het betreft en of er handleidingen zijn, dan weet u van tevoren waar de grens ligt in plaats van op de dag zelf.'),
    ('Tijdelijk of voor langere tijd: uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container. Op de afgesproken dag brengen wij alles naar uw nieuwe adres.',
     'Moet er meubilair tussendoor ergens staan? Uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container, gedemonteerd en gemerkt, tot de dag dat het weer opgebouwd kan worden.'),
    ('Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Wat dat u oplevert, staat hieronder.',
     'Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Deze acht gelden bij een verhuizing; bij een losse montageklus zonder verhuizing is de regeling korter en vertellen wij u vooraf wat er dan wel geldt.'),
    ('Bij De Kievit kunt u terecht voor uw particuliere verhuizing, een bedrijfs- of projectverhuizing, inboedelopslag en een verhuizing naar het buitenland. U krijgt dezelfde planner, hetzelfde team en dezelfde voorwaarden, of u nu een appartement in Blerick verhuist of een kantoor met dertig werkplekken.',
     'Bij De Kievit kunt u terecht voor montage en demontage bij een verhuizing, maar ook als losse klus zonder dat er iets vervoerd wordt. Daarnaast voor uw particuliere verhuizing, een bedrijfs- of projectverhuizing, inboedelopslag en een verhuizing naar het buitenland. Dezelfde planner, hetzelfde team, dezelfde voorwaarden.'),

    # --- opslagblok herbestemd 30-aug: mag per pagina een eigen onderwerp dragen
    # (verzoek Shahab). De foto toont twee verhuizers die dozen stapelen, dus het
    # onderwerp moet daar plausibel bij blijven. De gele knop wijst naar #offerte.
    ('<p class="label">Inboedelopslag</p>',
     '<p class="label">Verhuisdozen</p>'),
    ('Even geen plek? Wij slaan uw inboedel op',
     'Kasten leeg voor de schroevendraaier erin gaat'),
    ('Moet er meubilair tussendoor ergens staan? Uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container, gedemonteerd en gemerkt, tot de dag dat het weer opgebouwd kan worden.',
     'Een kast gaat pas uit elkaar als hij leeg is, en dat is het punt waarop een montagedag vaak vastloopt. Wij leveren de verhuisdozen vooraf, zodat de inhoud er al uit is als wij komen. De lege dozen halen wij later weer op.'),
    ('>Vraag opslag aan<',
     '>Vraag dozen aan<'),

    # --- werkgebied: de intro is copy en mag per pagina, de plaatschips en de kop
    # blijven bewust identiek want dat zijn lokale termen die overal gelijk horen te zijn.
    ('Vanuit Venlo verhuizen wij in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. Als lid van Top Movers regelen wij ook verhuizingen naar de rest van Nederland, samen met collega-leden die net als wij Erkende Verhuizer zijn.',
     'Voor een montageklus rijden wij dezelfde regio als voor een verhuizing: van Venray en Horst tot Tegelen, Reuver en Roermond. Omdat er geen inboedel mee hoeft, is een losse afspraak vaak sneller in te plannen dan een hele verhuisdag. Verder weg gaat via Top Movers, samen met collega-leden die net als wij Erkende Verhuizer zijn.'),

    # --- werkgebied volledig op het onderwerp van de pagina (Shahab 30-aug):
    # bovenkop, kop, slotalinea en knop. De plaatschips blijven overal gelijk, dat is
    # het werkgebied zelf. De grensstreekclaim (C13) blijft woordelijk staan.
    ('<p class="label">Werkgebied</p>',
     '<p class="label">Waar wij monteren</p>'),
    ('>App ons uw adressen<',
     '>App ons welke meubels<'),
    ('Verhuizen in Venlo en heel Noord- en Midden-Limburg',
     'Monteren en demonteren in Venlo en de hele regio'),
    ('Verhuist u naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen, geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.',
     'Moet het aan de andere kant van de grens weer opgebouwd worden? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.'),
]
