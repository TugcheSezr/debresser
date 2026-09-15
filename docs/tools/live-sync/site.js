/* Gedeelde gegevens: live-URL naar lokaal bestand, menu, header en footer.
   Bron van alle teksten: debresser.nl (september 2026). */

const LIVE = 'https://www.debresser.nl';

/* Live pad (zonder slashes aan begin/eind) -> lokaal bestand */
const SPECIAL = {
  '': 'index.html',
  'verhuizen': 'diensten-verhuizen.html',
  'opslag': 'diensten-opslag.html',
  'meubelprojecten': 'diensten-meubelprojecten.html',
  'gebouwbeheer': 'diensten-gebouwbeheer.html',
  'assetmanagement': 'diensten-assetmanagement.html',
  'overzicht-vacatures': 'vacatures.html',
  /* oude URL's die op de live site met een 301 doorsturen */
  'opslag-zakelijk': 'zakelijke-opslag.html',
  'opslag-particulier': 'particuliere-opslag.html',
  'montage-service': 'meubelmontage.html',
  'zakelijk-verhuizen': 'zakelijke-verhuizing.html',
  'en': null,
  /* links die live een 404 of 301 geven: naar de pagina met dezelfde bedoeling */
  'videochat': 'videogesprek.html',
  'videogesprek-2': 'videogesprek.html',
  'werkwijze': 'diensten-verhuizen.html',
  '2019/09/06/handyman-services': 'handyman-services.html'
};

function fileFor(p) {
  p = String(p || '').replace(/^\/+|\/+$/g, '');
  if (p in SPECIAL) return SPECIAL[p];
  let m = p.match(/^\d{4}\/\d{2}\/\d{2}\/([^/]+)$/);
  if (m) return 'blog-' + m[1] + '.html';
  m = p.match(/^vacature\/([^/]+)$/);
  if (m) return 'vacature-' + m[1] + '.html';
  return p.replace(/\//g, '-') + '.html';
}

/* Zet een live-link om naar een lokale link. Geeft null terug als de link extern moet blijven. */
function localHref(href) {
  if (!href) return href;
  href = href.trim();
  if (/^(tel:|mailto:|#)/.test(href)) return href;
  let u;
  try { u = new URL(href, LIVE + '/'); } catch (e) { return href; }
  if (!/(^|\.)debresser\.nl$/.test(u.hostname)) return href;
  const path = decodeURIComponent(u.pathname);
  if (/\/wp-content\/uploads\/.+\.pdf$/i.test(path)) return 'assets/docs/' + path.split('/').pop();
  if (/\/wp-content\/uploads\//.test(path)) return 'assets/img/site/' + path.split('/').pop();
  if (/^\/en(\/|$)/.test(path)) return null;
  const f = fileFor(path);
  return f ? f + (u.hash || '') : href;
}

const svg = (d, cls = '') => `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const P = {
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  phone: '<path d="M5 3.5h3.5l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5C10.6 20.5 3.5 13.4 3.5 5A1.5 1.5 0 0 1 5 3.5z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  star: '<path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
  truck: '<path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4l3 3.5v3h-7"/><circle cx="6.5" cy="17.5" r="1.9"/><circle cx="16.8" cy="17.5" r="1.9"/>',
  box: '<path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4z"/><path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9"/>',
  sofa: '<path d="M5 10.5V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2.5"/><path d="M3 11h3v3.5h12V11h3v5.5H3z"/><path d="M5 16.5v2M19 16.5v2"/>',
  building: '<path d="M4.5 20.5v-16h9.5v16M14 9.5h5.5v11M2.5 20.5h19"/><path d="M7.5 8h3M7.5 12h3M7.5 16h3M16.5 13h.5M16.5 16.5h.5"/>',
  clipboard: '<path d="M8.5 3.5h7v3h-7z"/><path d="M8.5 5H5.5v15.5h13V5h-3"/><path d="m8.8 13.2 2.4 2.4 4.3-4.6"/>',
  leaf: '<path d="M5 19c0-8 5-13.5 14.5-14.5C18.5 14 13 19 5 19z"/><path d="M5 19 13 11"/>',
  video: '<rect x="3" y="6.5" width="12.5" height="11" rx="2"/><path d="m15.5 10.5 5-3v9l-5-3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><path d="M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.8c1.9.6 3.1 2.1 3.5 4.7"/>',
  question: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.6"/><path d="M12 16.6h.01"/>'
};
const ruit = (cls) => `<svg class="bg-ruit ${cls}" viewBox="0 0 460 450" aria-hidden="true"><polygon points="190,114 340,34 340,234 190,316"/><polygon points="58,294 208,214 346,297 186,378"/><polygon points="268,134 422,220 422,402 268,318"/></svg>`;

/* Hoofdmenu zoals op debresser.nl */
const MENU = [
  { title: 'Verhuizen', href: 'diensten-verhuizen.html', icon: 'truck', items: [
    ['Zakelijk', 'zakelijke-verhuizing.html'], ['Particulier', 'particuliere-verhuizing.html'],
    ['Internationaal', 'internationale-verhuizing.html'], ['Zorgverhuizing', 'zorg-verhuizing.html'],
    ['Duurzaam verhuizen', 'duurzaam-verhuizen.html']] },
  { title: 'Opslag', href: 'diensten-opslag.html', icon: 'box', items: [
    ['Zakelijk', 'zakelijke-opslag.html'], ['Particulier', 'particuliere-opslag.html'], ['DIY-opslag', 'particuliere-opslag.html#diy-opslag']] },
  { title: 'Meubelprojecten', href: 'diensten-meubelprojecten.html', icon: 'sofa', items: [
    ['Meubeltransport', 'meubeltransport.html'], ['Veilingen', 'veilingen.html'], ['Montageservice', 'meubelmontage.html']] },
  { title: 'Gebouwbeheer', href: 'diensten-gebouwbeheer.html', icon: 'building', items: [
    ['Onderhoud', 'gebouwbeheer-onderhoud.html'], ['Verduurzamen', 'gebouwbeheer-verduurzamen.html'], ['Huismeester', 'gebouwbeheer-huismeester.html']] },
  { title: 'Assetmanagement', href: 'diensten-assetmanagement.html', icon: 'clipboard', items: [
    ['Inventarisatie', 'assetmanagement-inventarisatie.html'], ['WMS en Meubelpaspoort', 'assetmanagement-wms-en-meubelpaspoort.html'],
    ['Opslag assets', 'assetmanagement-opslag-assets.html'], ['Inkoop en verkoop assets', 'assetmanagement-inkoop-en-verkoop-assets.html'],
    ['Circulair meubilair', 'assetmanagement-circulair-meubilair.html']] }
];
const TOP = [['Over ons', 'over-ons.html'], ['Vacatures', 'vacatures.html'], ['Contact', 'contact.html'], ['Offerte', 'offerte.html'], ['Blog', 'blog.html']];

const SNELMENU = [
  ['Kantoor verhuizen', 'kantoor-verhuizen.html'], ['Zakelijk verhuizen', 'zakelijke-verhuizing.html'], ['Winkelverhuizing', 'winkelverhuizing.html'],
  ['Verhuisservice zakelijk', 'verhuisservice-zakelijk.html'], ['Opslagruimte Goirle', 'opslagruimte-goirle.html'], ['Opslagruimte Den Bosch', 'opslagruimte-den-bosch.html'],
  ['Opslagruimte Roosendaal', 'opslagruimte-roosendaal.html'], ['Opslagruimte Etten-Leur', 'opslagruimte-etten-leur.html'], ['Opslagruimte Oirschot', 'opslagruimte-oirschot.html'],
  ['Opslagruimte Breda', 'opslagruimte-breda.html'], ['Container opslag', 'container-opslag.html'], ['Verhuisbedrijf Eindhoven', 'verhuisbedrijf-eindhoven.html'],
  ['Verhuisbedrijf Den Bosch', 'verhuisbedrijf-den-bosch.html'], ['Verhuisbedrijf Waalwijk', 'verhuisbedrijf-waalwijk.html'], ['Verhuisbedrijf Etten-Leur', 'verhuisbedrijf-etten-leur.html'],
  ['Verhuisbedrijf België', 'verhuisbedrijf-belgie.html'], ['Verhuisbedrijf Oosterhout', 'verhuisbedrijf-oosterhout.html'], ['Verhuisbedrijf Sint-Oedenrode', 'verhuisbedrijf-sint-oedenrode.html'],
  ['Verhuisbedrijf Vught', 'verhuisbedrijf-vught.html'], ['Verhuisbedrijf Goirle', 'verhuisbedrijf-goirle.html'], ['Verhuisbedrijf Oisterwijk', 'verhuisbedrijf-oisterwijk.html'],
  ['Verhuisbedrijf Europa', 'verhuisbedrijf-europa.html'], ['Verhuisbedrijf Weert', 'verhuisbedrijf-weert.html'], ['Verhuisbedrijf Roermond', 'verhuisbedrijf-roermond.html'],
  ['Verhuisbedrijf Venlo', 'verhuisbedrijf-venlo.html'], ['Verhuisbedrijf Roosendaal', 'roosendaal.html'], ['Verhuisbedrijf Breda', 'breda.html'],
  ['Verhuisbedrijf Oss', 'verhuisbedrijf-oss.html'], ['Verhuisbedrijf Maastricht', 'verhuisbedrijf-maastricht.html'], ['Verhuisbedrijf Dordrecht', 'verhuisbedrijf-dordrecht.html'],
  ['Verhuisbedrijf Zevenbergen', 'verhuisbedrijf-zevenbergen.html']
];

function header(current) {
  const inGroup = (g) => g.href === current || g.items.some(([, h]) => h.split('#')[0] === current);
  const dienstenActive = MENU.some(inGroup) || current === 'duurzame-werkomgeving.html';
  const cur = (h) => (h.split('#')[0] === current ? ' aria-current="page"' : '');
  const cols = MENU.map((g) => `
                <div class="mega__col" data-tilt="6">
                  <a class="mega__title" href="${g.href}"${cur(g.href)}>
                    <span class="icon-tile">${svg(P[g.icon])}</span>
                    ${g.title}
                  </a>
                  <ul class="mega__list">
${g.items.map(([t, h]) => `                    <li><a href="${h}"${cur(h)}>${t}</a></li>`).join('\n')}
                  </ul>
                </div>`).join('');
  return `<header class="header header--overlay">
  <div class="wrap">
    <div class="header__bar">
      <a class="logo" href="index.html" aria-label="De Bresser, naar de homepage">
        <img class="logo__wit" src="assets/img/logo-de-bresser-compact-wit.png" alt="" width="768" height="592">
        <img class="logo__kleur" src="assets/img/logo-de-bresser-compact.png" alt="" width="768" height="592">
      </a>

      <nav class="nav" id="hoofdmenu" aria-label="Hoofdmenu">
        <ul class="menu">
          <li class="has-mega">
            <button class="menu__link" type="button" aria-expanded="false" aria-controls="mega-diensten"${dienstenActive ? ' aria-current="page"' : ''}>
              Diensten
              ${svg(P.chevron)}
            </button>
            <div class="mega" id="mega-diensten">
              <div class="mega__wrap">
                <div class="mega__panel">${cols}
                <a class="mega__promo" href="duurzame-werkomgeving.html">
                  ${ruit('')}
                  <span class="tag">Nieuw!</span>
                  <strong>Duurzame werkomgeving</strong>
                  <span class="btn btn--green btn--sm">Lees meer ${svg(P.arrow, 'icon--arrow')}</span>
                </a>
                </div>
              </div>
            </div>
          </li>
${TOP.map(([t, h]) => `          <li><a class="menu__link" href="${h}"${cur(h)}>${t}</a></li>`).join('\n')}
        </ul>
        <div class="drawer-foot">
          <a class="btn btn--green btn--block" href="offerte.html">Offerte aanvragen ${svg(P.arrow, 'icon--arrow')}</a>
          <a class="btn btn--light btn--block" href="tel:0031135282372">${svg(P.phone)} +31 (0)13 52 82 372</a>
        </div>
      </nav>

      <div class="header__cta">
        <a class="header-tel" href="tel:0031135282372">
          <span class="icon-tile icon-tile--green">${svg(P.phone)}</span>
          <span>+31 (0)13 52 82 372</span>
        </a>
        <a class="btn btn--green btn--sm" href="offerte.html">Offerte aanvragen</a>
        <button class="burger" type="button" aria-expanded="false" aria-controls="hoofdmenu" aria-label="Menu openen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</header>`;
}

function footer() {
  return `<footer class="footer">
  <div class="wrap">
    <ul class="footer__logos glass-dark reveal">
      <li><a href="https://www.erkendeverhuizers.nl/" rel="noopener"><img src="assets/img/keurmerk-erkende-verhuizers.png" alt="Logo Erkende verhuizers" loading="lazy"></a></li>
      <li><a href="https://www.erkendeprojectverhuizers.nl/" rel="noopener"><img src="assets/img/keurmerk-erkende-projectverhuizers.png" alt="Logo Erkende verhuizers" loading="lazy"></a></li>
      <li><a href="https://www.topmovers.nl/" rel="noopener"><img src="assets/img/keurmerk-top-movers.png" alt="Logo Top Movers" loading="lazy"></a></li>
      <li><img src="assets/img/keurmerk-fedemac.png" alt="Logo Fedemac" loading="lazy"></li>
      <li><img src="assets/img/keurmerk-iam.png" alt="Logo IAM" loading="lazy"></li>
    </ul>

    <nav class="footer__cols" aria-label="Footer">
      <div>
        <h2><a href="diensten-verhuizen.html">Verhuizen</a></h2>
        <ul>
          <li><a href="zakelijke-verhuizing.html">Zakelijk</a></li>
          <li><a href="particuliere-verhuizing.html">Particulier</a></li>
          <li><a href="internationale-verhuizing.html">Internationaal</a></li>
          <li><a href="zorg-verhuizing.html">Zorg verhuizing</a></li>
          <li><a href="duurzaam-verhuizen.html">Duurzaam</a></li>
        </ul>
      </div>
      <div>
        <h2><a href="diensten-opslag.html">Opslag</a></h2>
        <ul>
          <li><a href="zakelijke-opslag.html">Zakelijk</a></li>
          <li><a href="particuliere-opslag.html">Particulier</a></li>
          <li><a href="particuliere-opslag.html#diy-opslag">DIY opslag</a></li>
        </ul>
      </div>
      <div>
        <h2><a href="diensten-meubelprojecten.html">Meubelprojecten</a></h2>
        <ul>
          <li><a href="meubeltransport.html">Meubeltransport</a></li>
          <li><a href="veilingen.html">Veilingen</a></li>
          <li><a href="meubelmontage.html">Montageservice</a></li>
        </ul>
      </div>
      <div>
        <h2><a href="duurzame-werkomgeving.html">Duurzame Werkomgeving</a></h2>
        <ul>
          <li><a href="diensten-gebouwbeheer.html">Gebouwbeheer</a></li>
          <li><a href="diensten-assetmanagement.html">Assetmanagement</a></li>
        </ul>
      </div>
      <div>
        <h2>Voorwaarden</h2>
        <ul>
          <li><a href="assets/docs/AVVV-PV05-AVBV-AVHD.pdf">Voorwaarden verhuizingen</a></li>
          <li><a href="assets/docs/6010-Algemene-Vervoerscondities-A4-web-2.pdf">Algemene vervoerscondities</a></li>
          <li><a href="assets/docs/Algemene-voorwaarden-voor-Bedrijfsverhuizingen.pdf">Voorwaarden bedrijfsverhuizing</a></li>
          <li><a href="assets/docs/Logistieke-Services-Voorwaarden-LSV-2.pdf">Voorwaarden logistieke services</a></li>
          <li><a href="assets/docs/CMR-Conditions-English-2.pdf" hreflang="en">CMR conditions</a></li>
          <li><a href="assets/docs/Nederlandse-Opslagvoorwaarden-De-Bresser-opslag-zakelijk.pdf">Opslagvoorwaarden</a></li>
          <li><a href="privacyverklaring.html">Privacyverklaring</a></li>
        </ul>
      </div>
    </nav>

    <details class="footer__snel">
      <summary>Snelmenu ${svg(P.chevron)}</summary>
      <ul>
${SNELMENU.map(([t, h]) => `        <li><a href="${h}">${t}</a></li>`).join('\n')}
      </ul>
    </details>

    <div class="footer__bottom">
      <p>Copyright © 2025 De Bresser B.V. &nbsp;|&nbsp; KVK 18014730 &nbsp;|&nbsp; BTW NL0055.15.452.B.01</p>
      <nav aria-label="Service">
        <a href="tel:0031135282372">T +31 (0)13 52 82 372</a>
        <a href="mailto:info@debresser.nl">info@debresser.nl</a>
      </nav>
    </div>
  </div>
</footer>

<!-- Mobiel: vaste actiebalk onderin -->
<div class="mobilebar">
  <a class="btn btn--light" href="tel:0031135282372">${svg(P.phone)} Bellen</a>
  <a class="btn btn--green" href="offerte.html">Offerte aanvragen</a>
</div>`;
}

module.exports = { LIVE, fileFor, localHref, svg, P, ruit, MENU, TOP, SNELMENU, header, footer };
