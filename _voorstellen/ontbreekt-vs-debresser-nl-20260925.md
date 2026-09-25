# What is missing on the new site compared to debresser.nl

Gap check, 25-09-2026, by debresser-dc. Read-only: nothing in site/ was edited, nothing was built or committed.

This compares content, not design. Things that are dropped or merged on purpose in the plan (`sitemap-debresser/sitemap-de-bresser.md`, 49 redirects in `site/vercel.json`) are not counted as gaps. They are listed separately at the end.

## How this was checked

- **Live site.** Crawled every URL in the Yoast sitemaps of https://www.debresser.nl (`/sitemap_index.xml`): 114 NL pages plus `/author/webinet/`. Also crawled `/en/` and its 5 English subpages, and probed 6 extra URLs. `/diensten/`, `/werkgebied/`, `/algemene-voorwaarden/`, `/cookiebeleid/`, `/disclaimer/` and `/sitemap/` all return 404 on live.
- **New site.** Crawled every URL in `site/sitemap.xml` plus `404.html` (69 pages), served from `site/` by `devserver.py`.
- **Per page, both sides:**
  - title and meta tags, canonical, hreflang
  - headings, split into main content and header/footer
  - body text, links, forms (fields and labels), iframes, scripts, JSON-LD, images
  - tracking markers
- **Matching.** Every live page was mapped to its new counterpart: the same path (68 pages) or its 301 target (44 pages). Each non-template sentence on the live page was then checked word by word against that target: 2622 sentences, 551 below 50% overlap. Every sentence below 50% was read by hand. Most are rewrites, dated review quotes or generic marketing copy. The facts that really are missing are listed below.
- **Spot checks.** Specific facts (names, addresses, numbers, certificates, PDFs, social links) were checked on both sites by exact search.
- **Limits.** The scripts are in the dc session scratchpad (`gap/`), not in the repo. The calculator domain `debresser.verhuizing-offerte.nl` (linked from live) timed out, so its content is unknown.

## Top gaps, most important first

| # | What is missing | Where it is on debresser.nl | Why it matters |
|---|---|---|---|
| 1 | **Form mail goes to De Kievit.** The Web3Forms key in `site/_werk/navigatie.py:28-30` still delivers to info@de-kievit.nl. Known gap. | All forms on live deliver to De Bresser. | From day one, every contact and quote request on the new site ends up in the wrong company's inbox. This is the only gap that loses customers directly. |
| 2 | **The 6 terms PDFs are not hosted on the new site.** The new site links to them as absolute `https://www.debresser.nl/wp-content/uploads/...` URLs: 6 footer links × 69 pages, plus 18 links in body text (the first version said 16). They are not in `site/`, and `vercel.json` has no `/wp-content/*` rule. | Footer "Voorwaarden" block on every page: AVVV-PV05-AVBV-AVHD.pdf, 6010-Algemene-Vervoerscondities-A4-web-2.pdf, Algemene-voorwaarden-voor-Bedrijfsverhuizingen.pdf, Logistieke-Services-Voorwaarden-LSV-2.pdf, CMR-Conditions-English-2.pdf, Nederlandse-Opslagvoorwaarden-De-Bresser-opslag-zakelijk.pdf | When the domain switches to Vercel, all 6 links return 404. The terms are part of every contract and quote, so they must stay reachable. Fix: copy the PDFs into `site/` (e.g. `/downloads/`) and point the links there. Keep a 301 from the old wp-content paths too, because quotes and e-mails already sent link to them. |
| 3 | **No analytics, ad conversion tracking or consent banner.** The new site loads none of these. | Every page: GTM-KW9T4MD → GA4 G-4SC19GL438, Google Ads, Leadinfo, Microsoft Clarity, Smartlook, Promptwatch, and a Cookiebot banner. | At switchover, all measurement stops. That includes Google Ads conversions, so any running campaign loses its signal. This may be a deliberate choice, but it needs an explicit decision. If tracking comes back, a consent banner has to come back with it. Note that on live, trackers load before consent. |
| 4 | **Redirects missing for indexed live URLs that have no new page.** | 6 English pages, all 200 and indexable, linked by hreflang from every NL page: `/en/`, `/en/about-us/`, `/en/auction/`, `/en/contact/`, `/en/england/`, `/en/work-at-de-bresser/`. Also: `/logistiek-full-service/`, `/2024/03/29/logistieke-dienstverlening/`, `/author/webinet/`, and the old dated `/2019/09/06/handyman-services/` (live 301s it to `/handyman-services/`; linked from live `/bergen-op-zoom/`). | These 10 URLs return 404 after switchover, and their search ranking and backlinks are lost. Dropping English and logistics is planned. The missing 301s are not. Suggested targets: EN pages → closest NL page (`/en/contact/` → `/contact/`, `/en/work-at-de-bresser/` → `/overzicht-vacatures/`, `/en/auction/` → `/meubelprojecten/#veilingen`, `/en/england/` → `/verhuizen/#internationaal`, like the NL `/internationale-verhuizing/engeland/`; the rest → `/`). Logistics → `/opslag/` or `/`. Author → `/blog/`. Old handyman URL → `/gebouwbeheer/#handyman`. |
| 5 | **No job application form with CV upload.** The new vacancy pages only offer a mailto to pz@debresser.nl (4 links). | `/vacature/verhuizer/`, `/vacature/chauffeur-verhuizingen-c-ce/`, `/tekenbonus/`. The form has: Volledige naam, E-mailadres, Telefoonnummer, Motivatie en CV (file upload, max 2 MB), Opmerkingen. | Recruitment is an active need: there is a signing bonus, and the new site promotes it on 3 pages. Applying by e-mail is a bigger step, especially on a phone. As far as I know, file upload is a paid (Pro) feature in Web3Forms. Check that, because it may also need a decision on the form service. |
| 6 | **Fewer places to send a message.** The new site has forms only on `/contact/` and `/offerte/`. | A short contact form (Naam, Telefoonnummer, E-mailadres, Bericht) at the bottom of 81 live pages: blog posts, place pages and service pages. Also the B2B **Quick Scan** form on `/quick-scan/` (Voor- en achternaam, Bedrijfsnaam, Locatie, E-mail, Telefoon). It now redirects to `/gebouwbeheer/#quick-scan`, and that section has no form. | Visitors who land on a place or blog page from Google have no form in view. They get a button to `/offerte/` or a phone number instead. The header quote form is in progress and covers part of this. The Quick Scan is the only B2B lead form for gebouwbeheer, and it is gone. |
| 7 | **Brussels contact persons are missing.** The new `/de-bresser-brussel/` has the address and the main phone number (+31 (0)13 52 82 372, the same number live's Brussels page gives), but no contact persons. *(Corrected on 25-09: the first version of this report wrongly said the new page has no phone number and that live's Brussels page gives +32.)* | `/de-bresser-brussel/`: "Aanvragen, contact en planning verloopt via Niels van Gestel en Aaron Mutsaers", with niels@debresser.nl and aaron@debresser.nl, and phone "0031 13 528 2372". The +32 (0)26 – 701894 number appears only in the second branch list on live `/contact/`. | Belgian customers get no named contact. But the page source already marks this as a deliberate gap (`site/_werk/paginas/de-bresser-brussel.html:8,55`): Brussels was a logistics hub, and De Bresser Logistiek B.V. was sold per 16-09-2024 (`onderzoek/bronnen.md:326`). So the client has to confirm that these two people still handle Belgium. The +32 number also needs the client. |
| 8 | **Social previews and structured data are thinner.** | Live, on about 114 pages: `og:image`, `og:description`, `twitter:card`. Organization schema on every page. Service schema on 16 pages. FAQPage schema on 12 pages. | The new site has `og:title`, description and canonical, but no `og:image` or `og:description`. A link shared on WhatsApp or LinkedIn therefore shows no picture. MovingCompany schema is on the homepage only, there is no Service schema, and there is no FAQPage schema even where the new pages have FAQs. The effect is on SEO and rich results, not on visitors. |

## Lesser gaps (10)

1. **No De Bresser social media links.**
   - Live links Instagram (`instagram.com/de_bresser`), Facebook (`facebook.com/debresserverhuizingen`) and LinkedIn (`linkedin.com/company/debresser-verhuizingen-logistiek`), but only on `/100-jarig-jubileum/`.
   - The new site links none of them.
   - The only LinkedIn link on the new site is the designer credit (see "On the new site but not on live").
2. **Google Maps route link.**
   - Live has a "route" pin (`maps.app.goo.gl/fiTtYM83db5SjHLLA`) in the contact block on 98 pages. It is the only map link on live. It opens the Google Maps place "De Bresser" at Schijfstraat 13, Oisterwijk (checked by resolving the link and reverse geocoding it), not Herastraat 9, Tilburg.
   - The new site has one "Route plannen" link, on `/contact/`.
   - The embedded map is a known gap.
3. **Luxemburgstraat 7, 5061 JW Oisterwijk.** This address is in the second branch list on live `/contact/` and is not on the new site. The new site shows the first list (Schijfstraat 13). Live is inconsistent here too (`bevindingen.md:110`). Confirm with the client whether this location still exists.
4. **Veilingen form.**
   - Live `/veilingen/` has its own contact form with a service choice and a privacy checkbox.
   - That page now redirects to `/meubelprojecten/#veilingen`, which has no form.
5. **Videogesprek form.**
   - Live `/videogesprek/` has a short form to request a video call, with a service choice.
   - That page now redirects to `/offerte/#videogesprek`. Check that the offerte form lets people choose a video call. The form is being reworked, so this is noted rather than tested.
6. **Private storage form.**
   - Live `/particuliere-opslag/` has a contact form with a dropdown.
   - That page now redirects to `/opslag/#particulier`, which has no form (same pattern as gap 6).
7. **Company size claim.** "Met jaarlijks ruim drieduizend verhuizingen in binnen- en buitenland" (live `/100-jarig-jubileum/`) appears nowhere on the new site. It is a strong, concrete fact for `/over-ons/` or the homepage.
8. **Anniversary thank-you.** Most of `/100-jarig-jubileum/` is merged into `/over-ons/#geschiedenis`. Not carried over: the thank-you to customers and partners, and the social media call to action. Low value. Listed only for completeness.
9. **Site search.** Live has WordPress search (and SearchAction schema). The new site has none. With 69 pages and a clear menu this is fine, so it is listed only for completeness.
10. **Case-study-style review quotes.**
    - Live shows 3 dated review quotes in a "Succesverhalen" block on `/`, `/contact/`, `/offerte/` and more. Examples: "Maarten, Oisterwijk 07-04-2026", "Toine, Oisterwijk 26-03-2024".
    - The new site has none yet. They are covered by the reviews work (d5); see "In progress". Listed here so the quotes can be reused.

## Known gaps (already in NOTES-FOR-TOMORROW.md), confirmed still open

- **"sb-gat" placeholders visible to visitors:**
  - home "Beeld volgt: historische foto"
  - `/over-ons/` "Beeld volgt: vrijstaand groepsportret" + 4× "Naam volgt / Functie volgt"
  - `/contact/` "Openingstijden volgen", "Kaart volgt: Herastraat 9", "Portret volgt" for Ineke Brands, and one "Naam volgt / Functie volgt / Korte tekst volgt" card
- **Team names.** The live `/over-ons/` already has names and roles for the office staff:
  - Patrick (offertes)
  - Jeanine Schoenmakers, Carla van Roessel, Tatjana Ihnatava (financieel)
  - Eric van der Schans (planning)
  - Niels van Gestel, Aaron Mutsaers, Henry Stolk (buitenland)
  - Femke van Hamond (HR)
  - Yvonne de Bresser (KAM: "ISO, OEV en EPV Certificering")
  - Barry Brocken (sales & operations)
  - and more

  These can fill the placeholders once the client confirms who is still employed. Yvonne's role is also the only place live mentions ISO/OEV/EPV. The new site mentions none of these three (a check for EPV: 0 matches).
- **Other known gaps:** the review score and reviews, opening hours, WhatsApp, the Web3Forms key (top gap 1), and the logistics PDF.
  - On opening hours and WhatsApp: live has no opening hours and no WhatsApp contact either (only WhatsApp share buttons in the Elementor config). So these are wishes, not things that disappear.

## Not a gap vs live (checked)

- **Certificates and memberships.** VCA and NEN are on new `/meubelprojecten/`, as on live `/meubelmontage/`. Erkende Verhuizers, Erkende Projectverhuizers, Top Movers, Fedemac and IAM logos are all in the new footer (79's rework). Live has no ISO or NEN number, and no NIWO or Eurovergunning.
- **Branches.** Tilburg (hoofdkantoor), Oisterwijk, Breda, Venlo, Reeuwijk and Brussel all have the same addresses as the first live list. The phone numbers match live's first list. In the branch list (footer, /contact/, /over-ons/), Brussel and Reeuwijk deliberately have no number, because live gives two different ones (`navigatie.py` VESTIGINGEN: "Telefoon None = niet eenduidig"). The Brussels page itself shows +31 (0)13 52 82 372, like live's Brussels page (top gap 7).
- **Legal details.** KvK 18014730 and the Btw number are in the new footer, and `/privacyverklaring/` exists. Live `/cookiebeleid/`, `/disclaimer/` and `/algemene-voorwaarden/` are 404 on live too.
- **Facts carried over:**
  - Circulaire Hub / 7.000 m²
  - "40 tot 90%" CO2
  - quality-scan
  - tekenbonus
  - seniorenverhuizing
  - elektrische voertuigen
  - inboedelopslag
  - videogesprek
  - veilingen
  - Brocken Verhuizingen (19-11-2025)
- **Calculator.** Live links to `debresser.verhuizing-offerte.nl`, which timed out: a dead link on live.
- **`_werk` leak.** `site/.vercelignore` excludes `_werk`, so the `Disallow: /_werk/` line in `robots.txt` is not a leak.
- **De Kievit remnants.** No "Kievit" in the visible text, links or images of any new page. The only remnant is the form key (top gap 1).

## In progress (not counted as gaps)

- Reviews and rating button (d5): live has Klantenvertellen (ID 1038076) and Trustoo/Google widgets, plus "9,0" / "1.400 reviews" claims on 8 place pages. The new site has no score claim. Only `/verhuisbedrijf-waalwijk/` names Klantenvertellen, Trustoo and Google and shows local review quotes. Check that page once the reviews source is final.
- Footer partner brands (79).
- Library sections (89).
- Header quote form: 5 versions waiting for the user. This partly covers top gap 6.
- Diensten menu (7a).

## On the new site but not on live: worth a look

- **Designer credit.** "Gemaakt door Shan Morshedian" links to a personal LinkedIn profile in the footer of all 69 pages. It is not on live. Fine if agreed with the client. Note that it is currently the only LinkedIn link on the site, while De Bresser's own company page is not linked (lesser gap 1).
- **Phone number format.** `/privacyverklaring/` writes the main number as "+31 (0)13 528 23 72"; everywhere else it is "+31 (0)13 52 82 372". Live's privacy page uses the same odd format. Cosmetic only.
- **The Qwiek.snooze blog post** is retitled on the new site, with no "Qwiek" left in the text. This looks deliberate and correct.

## Dropped or merged on purpose (per plan, not gaps)

- **Merged.** 44 live pages redirect (301) into 68 kept pages, per `site/vercel.json`. Examples: `/particuliere-opslag/` → `/opslag/#particulier`, `/100-jarig-jubileum/` → `/over-ons/#geschiedenis`, `/tekenbonus/` → `/overzicht-vacatures/#tekenbonus`, `/quick-scan/` → `/gebouwbeheer/#quick-scan`, `/veilingen/` → `/meubelprojecten/#veilingen`.
  - Content check of the merges: the redirect targets cover the live facts, apart from the forms listed above (top gap 6, lesser gaps 4-6).
- **Dropped: logistics.** `/logistiek-full-service/` and `/2024/03/29/logistieke-dienstverlening/`. The live footer PDF "Voorwaarden logistieke services" is still linked on the new site. Decide whether it stays now that logistics is dropped (the "logistiek PDF" known gap).
- **Out of scope: English** (plan, kanttekening 7). All 6 `/en/` pages, the hreflang tags and the NL/EN switch in the header. Only the missing 301s are a gap (top gap 4).
- **Scrapped in the plan:** `/diensten/`, `/werkgebied/`, `/algemene-voorwaarden/`. All 3 are 404 on live too.
- **Decided earlier:** the CBS statistics FAQs on place pages are not carried over. The live Breda inhabitant figure is wrong anyway.

## Side notes about the live site (for the client, not for the new build)

- Live has a mailto typo, `info@bresser.nl`, in the body text of `/2024/03/29/interne-verhuizing/` and `/2024/03/29/spullen-weg-doen-waarom-is-het-zo-moeilijk/`. It is already corrected on the new site.
- On live, the trackers load before the Cookiebot consent.
- Live `/contact/` gives two different branch lists, with different phone numbers for Reeuwijk and Brussel.
- Live's only route pin opens Schijfstraat 13, Oisterwijk, while the privacy statement and the new site name Herastraat 9, Tilburg as the main address.

## Update, later on 25-09 (dc)

- **Added to the page sources** (visible after the next build):
  - Lesser gap 1: De Bresser's own Instagram, Facebook and LinkedIn links are now the last item in the footer column "De Bresser" (`navigatie.py`, new `SOCIAL` list).
  - Lesser gaps 7 and 8: the drieduizend fact and the anniversary thank-you are in the `/over-ons/#geschiedenis` intro.
- **Handed to other sessions:**
  - PDFs, redirects, meta, schema and route links: 79.
  - Forms: d5.
- **Top gap 7:** not added, because the client has to confirm the contact persons first (see the corrected row above).
