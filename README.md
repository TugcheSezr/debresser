# De Bresser · lokale website (3D-stijl)

Volledige, lokaal werkende versie van debresser.nl. Teksten, foto's, teamleden, reviews, vacatures,
blogartikelen en voorwaarden (PDF) komen van de live site en staan allemaal in deze map.
Er zijn geen links meer naar debresser.nl of andere websites (alleen `tel:` en `mailto:`).

## Openen

Dubbelklik `index.html`, of in VS Code: rechtsklik → **Open with Live Server**.

## Pagina's

| Bestand | Inhoud |
|---|---|
| `index.html` | Hero, keurmerken, over ons, onze diensten, werkwijze met 3D-vrachtwagen, nieuws & tips, reviews, duurzaam verhuizen, CTA |
| `diensten-verhuizen.html` | #bedrijfsverhuizen · #particulier-verhuizen · #internationale-verhuizingen · #speciale-objecten · #zorgverhuizing · #duurzaam-verhuizen |
| `diensten-opslag.html` | #zakelijk · #particulier · #diy-opslag |
| `diensten-meubelprojecten.html` | #meubeltransport · #veilingen · #montageservice |
| `diensten-gebouwbeheer.html` | #onderhoud · #verduurzamen · #huismeester |
| `diensten-assetmanagement.html` | #inventarisatie · #wms-en-meubelpaspoort · #opslag-assets · #inkoop-en-verkoop-assets · #circulair-meubilair |
| `duurzame-werkomgeving.html` | Nieuw! (rechterbanner in het mega menu) |
| `over-ons.html` | Over ons, geschiedenis, 18 teamleden |
| `vacatures.html` | 2 vacatures + sollicitatieformulier met cv-upload |
| `blog.html` | 9 artikelen met volledige tekst (klappen open) |
| `contact.html` | Contactformulier + 6 locaties |
| `offerte.html` | Offerteformulier met opslagvelden die verschijnen bij "Opslag" |
| `privacyverklaring.html` | Privacyverklaring |

## Bestanden

```
css/style.css          Globale 3D-stijl: glas, gelaagde schaduwen, hover-lift, tilt, responsive
js/main.js             Mega menu, mobiel menu, 3D-tilt, scroll-reveal, formulieren
api/verzend.php        Verstuurt formulieren naar info@debresser.nl (op een PHP-server)
assets/img/site/       Foto's van debresser.nl (verkleind voor web)
assets/img/3d-vrachtwagen.svg   3D-vrachtwagen zonder achtergrond (werkwijze)
assets/docs/           Voorwaarden-PDF's
assets/fonts/          Sora (lokaal, geen Google Fonts nodig)
css/tokens.css         Oude merkboek-tokens, niet meer gebruikt door de pagina's
docs/                  Sitemap, blokkenbibliotheek, wireframes (PDF)
```

## Formulieren

- **Lokaal (bestand geopend):** validatie, bevestiging met samenvatting, en het e-mailprogramma opent een
  ingevuld bericht aan info@debresser.nl. Een kopie wordt in de browser bewaard (localStorage).
- **Op een webserver met PHP:** `js/main.js` stuurt het formulier naar `api/verzend.php`, dat een e-mail
  verstuurt (ook met cv-bijlage, max. 2 MB). Lukt dat niet, dan valt het terug op het e-mailprogramma.
- Spambeveiliging: honeypotveld en maximaal 5 aanvragen per 10 minuten.
