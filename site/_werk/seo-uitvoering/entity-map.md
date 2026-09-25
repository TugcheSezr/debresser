# Entitymap De Kievit

Eigenaar: Terminal 3. Bindend voor schema, NAP, footer, contactpagina en iedere externe koppeling.
Terminal 1 implementeert geen JSON-LD dat hiervan afwijkt.

Waarom dit bestand bestaat: rond de naam De Kievit lopen drie KvK-nummers, twee Venlose adressen en
drie bedrijfsnamen door elkaar. De oude site zet in de footer "De Kievit B.V." bij KvK 18014730, en
die combinatie bestaat niet: dat nummer hoort bij De Bresser. Bron voor alles hieronder is
`onderzoek/07-de-kievit-en-de-bresser.md` en `onderzoek/02-leden-en-vestigingen.md`, met de
registervindplaatsen die daar per regel staan.

---

## De knopen

### N1 - Rechtspersoon en contractpartij
- De Bresser Verhuizingen B.V.
- KvK 18014730, vestigingsnummer 000019332211, btw NL0055.15.452.B.01
- Herastraat 9, 5047 TX Tilburg
- moeder: VLB Holding B.V., KvK 64698238
- rol: contractpartij, werkgever, verwerkingsverantwoordelijke
- bewijs: de privacyverklaring op de-kievit.nl noemt deze rechtspersoon voluit met adres en
  KvK-nummer; dezelfde KvK- en btw-nummers staan in de footer van debresser.nl

### N2 - Handelsnaam en merk
- De Kievit Verhuizingen; in registers en op profielen ook "de Kievit Verhuizingen Top Movers"
- rol: handelsnaam waaronder N1 in Venlo werkt. GEEN rechtspersoon
- schema: `name` "De Kievit Verhuizingen", `alternateName` "De Kievit Verhuizingen Top Movers"
- VERBODEN: "De Kievit B.V.". Die naam staat in geen enkel register en de oude site koppelt hem aan
  het KvK-nummer van N1. Nergens gebruiken, ook niet in schema of in een e-mailhandtekening

### N3 - Vestiging Venlo
- Van Coehoornstraat 11, 5916 PH Venlo
- rol: bezoekadres en het adres waarop de OEV-ledenpagina en de Top Movers-vestigingspagina staan
- schrijfwijze: MET "Van". De registers, de OEV-ledenpagina en Top Movers schrijven Van
  Coehoornstraat; debresser.nl laat het weg. Wij volgen het register, anders koppelt geen enkele
  bron ons adres aan hetzelfde pand
- telefoon: +31 77 32 32 100
- openingstijden: maandag tot en met vrijdag 08:00 tot 17:00, bevestigd door de klant op
  30-08-2026 en zo ook in schema. openingstijden.nl noemt 07:30 en moet worden bijgewerkt
- onze bronnen staan hier goed: twintig keer "Van Coehoornstraat", twee keer zonder "Van" (een
  Google Maps-link op de contactpagina); die twee horen ook om

### N4 - Horsterweg 217, 5928 ND Venlo
- rol: HISTORIE. Niet meer in gebruik. Bevestigd door de klant op 30-08-2026
- het adres staat nog op de contactpagina van de oude de-kievit.nl en op de-bresser.be, en dat is
  precies waarom het hier staat: wie het daar tegenkomt moet weten dat het niet meer geldt
- dit adres komt NERGENS meer in: niet in schema, niet in de footer, niet als bezoekadres, niet in
  een externe vermelding. Alleen als historie op `/over-ons/` is toegestaan
- actiepunt naar buiten: waar dit adres nog in een profiel of vermelding staat, hoort het eruit

### N5 - Historische rechtspersonen, allebei opgeheven
- Jac. de Kievit en Zn. B.V., KvK 12015298, Voltastraat 27 Venlo. Handelsnamen De Kievit Top Movers
  en De Kievit Verhuizingen
- De Kievit (VOF), KvK 56937164, Maasschriksel Venlo
- rol: uitsluitend historie op `/over-ons/`. Nooit als contractpartij, nooit in schema
- let op: het CO2-certificaat van 2023 noemt in de organisatiegrens nog deze oude entiteit, dus dat
  certificaat dekt niet vanzelf de huidige situatie. Zie C6 in het claimsregister

### N6 - Top Movers Nederland B.V.
- rol: houder van ISO 9001, ISO 14001, VCA** en de CO2-Prestatieladder, en het landelijke
  samenwerkingsverband waar N2 vestiging van is
- schema: `memberOf`, nooit samenvoegen met N1 of N2
- wij zijn aangesloten vestiging, niet certificaathouder. Iedere zin die dat omdraait is fout

---

## Welke knoop hoort bij welk extern profiel

| profiel | knoop | let op |
|---|---|---|
| OEV-ledenpagina "de Kievit Verhuizingen Top Movers" | N2 op N3, contractpartij N1 | adres met "Van", KvK 18014730 |
| Klantenvertellen profiel 1034282 | N2 op N3 | de reviews gaan over de vestiging, niet over N1 als geheel |
| Top Movers vestigingspagina De Kievit Verhuizingen | N2 op N3, netwerk N6 | |
| LinkedIn de-kievit-verhuizingen | N2 | |
| Google Maps-vermelding Venlo | N3 | hier moet de schrijfwijze van het adres exact gelijk zijn |
| debresser.nl | N1 | dat is de moedersite, niet een profiel van ons |

## Vaste `@id`-namen

Eén set voor de hele site, absolute URL plus fragment:

- `https://www.de-kievit.nl/#organisatie` - N1, type `Organization`
- `https://www.de-kievit.nl/#bedrijf` - N2 op N3, type `MovingCompany`
- `https://www.de-kievit.nl/#website` - type `WebSite`
- per pagina `<pagina-URL>#pagina` - type `WebPage`
- per pagina `<pagina-URL>#kruimels` - type `BreadcrumbList`

`#bedrijf` verwijst met `parentOrganization` naar `#organisatie` en met `memberOf` naar N6. Er is
precies één `#bedrijf` op de hele site en die staat op de homepage; andere pagina's verwijzen
ernaar met `@id`, ze herhalen hem niet.

## Wat er nu staat

De homepage heeft één JSON-LD-blok van het type `MovingCompany`. Dat blok klopt inhoudelijk al:
juiste handelsnaam, `alternateName`, `parentOrganization` De Bresser Verhuizingen B.V., `memberOf`
Top Movers, adres met "Van Coehoornstraat 11", en vier `sameAs`-profielen. Wat ontbreekt zijn de
`@id`'s, waardoor niets ernaar kan verwijzen. Verder heeft geen enkele andere pagina schema.
