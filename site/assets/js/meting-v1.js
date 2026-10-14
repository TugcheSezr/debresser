/* De Bresser meting v1 (14-10-2026, GA4-herstel): de Google-tag (gtag.js) rechtstreeks naar GA4 G-4SC19GL438 (property
   351891814). Geen Google Tag Manager meer: de oude container GTM-KW9T4MD telde een formulierpoging al voordat Web3Forms
   antwoordde, telde sollicitaties als aanvraag en mat WhatsApp niet.
   14-10-2026 nacht (geavanceerde consent mode, besluit Shahab): dit bestand staat in elke pagina als gewoon
   <script src="..." defer> direct na cookie-consent-v3.js en laadt de Google-tag altijd. Eerst gaat consent default met alles
   denied (wait_for_update 500), dan meteen de bewaarde keuze (window.bresserCookies; cookie-consent-v3.js heeft die al
   synchroon gelezen, want deferred scripts lopen in paginavolgorde), en pas daarna js, config en page_view. Een terugkerende
   bezoeker met toestemming meet zo vanaf de eerste hit met toestemming. analytics_storage volgt "statistieken"; ad_storage
   en ad_user_data volgen "advertenties"; ad_personalization blijft altijd denied (geen remarketing), Google Signals en
   advertentiepersonalisatie staan uit. Zonder toestemming plaatst de tag geen cookies en stuurt hij alleen cookieloze
   signalen. Intrekken zet alles terug op denied (cookie-consent-v3.js wist _ga en _gcl_), de tag blijft draaien.
   url_passthrough en ads_data_redaction staan op de standaard (niet gezet). Alleen op https://www.debresser.nl, zodat de
   dummy en lokale kopieen niets meten.
   Gebeurtenissen: page_view (een per pagina); phone_clicks, email_clicks en whatsapp_clicks (alleen ons eigen nummer) met een
   vaste link_location; form_submit_offerte en form_submit_videochat (aanvragen) en sollicitatie_verstuurd (sollicitatie of
   tekenbonus, geen klantaanvraag), pas na een geslaagde verzending via site.js (window.kvFormConversie). Ze gaan altijd
   naar de Google-tag; de toestemming bepaalt alleen of dat met of zonder cookies gebeurt. */
(function () {
  'use strict';
  if (location.hostname !== 'www.debresser.nl' || location.protocol !== 'https:' || window.bresserMeting) return;
  window.bresserMeting = true;
  var ID = 'G-4SC19GL438';
  var dl = window.dataLayer = window.dataLayer || [];
  function gtag() { dl.push(arguments); }
  var statistieken = false, advertenties = false;

  function toestemming(analytics, ads) {
    return { analytics_storage: analytics, ad_storage: ads, ad_user_data: ads, ad_personalization: 'denied' };
  }
  var standaard = toestemming('denied', 'denied');
  standaard.wait_for_update = 500;
  gtag('consent', 'default', standaard);

  // Adres voor Google: alleen het pad van een bestaande pagina (uit de canonical; een onbekend adres krijgt de 404-pagina,
  // die geen canonical heeft) plus korte campagnecodes. Formulierinvoer, zoektermen en het #-deel gaan nooit mee.
  function adres() {
    var pad = '/404.html', c = document.querySelector('link[rel="canonical"]');
    try { var u = new URL(c.href); if (u.hostname === 'www.debresser.nl') pad = u.pathname; } catch (e) { /* geen canonical */ }
    var q = new URLSearchParams(location.search), mee = new URLSearchParams();
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_content', 'utm_term'].forEach(function (k) {
      var v = q.get(k);
      // korte labels; vrije tekst, e-mailadressen en lange cijferreeksen (telefoon) vallen af
      if (v && /^[a-zA-Z][\w-]{0,99}$/.test(v) && !/\d{7}/.test(v)) mee.set(k, v);
    });
    ['gclid', 'gbraid', 'wbraid'].forEach(function (k) {
      var v = q.get(k);
      if (v && /^[\w-]{10,200}$/.test(v) && /[a-zA-Z]/.test(v)) mee.set(k, v);
    });
    var s = mee.toString();
    return 'https://www.debresser.nl' + pad + (s ? '?' + s : '');
  }
  // Vorige pagina: alleen de herkomstsite, nooit het pad of de zoekopdracht.
  function herkomst() {
    try { var u = new URL(document.referrer); return /^https?:$/.test(u.protocol) ? u.origin + '/' : ''; } catch (e) { return ''; }
  }
  var plek = adres(), vorige = herkomst();

  function stuur(naam, extra) {
    var p = { send_to: ID, page_location: plek, page_referrer: vorige };
    for (var k in extra) p[k] = extra[k];
    gtag('event', naam, p);
  }
  function pas(stat, adv) {
    statistieken = stat; advertenties = adv;
    gtag('consent', 'update', toestemming(stat ? 'granted' : 'denied', adv ? 'granted' : 'denied'));
  }
  function actueel(categorie) { return !!(window.bresserCookies && window.bresserCookies.toestemming(categorie)); }

  // Bewaarde keuze voor js en config, zodat al de eerste hit de juiste toestemming heeft.
  if (actueel('statistieken') || actueel('advertenties')) pas(actueel('statistieken'), actueel('advertenties'));
  gtag('js', new Date());
  gtag('config', ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    page_location: plek, page_referrer: vorige });
  stuur('page_view');
  var s = document.createElement('script');
  s.async = true;
  s.referrerPolicy = 'no-referrer';
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  // Bellen, mailen en WhatsApp naar ons eigen nummer. Een klik is interesse in contact, geen bewezen gesprek. Het mailadres
  // voor sollicitaties (pz@) telt niet: dat is geen klantcontact. Capture-fase, zodat ook links in later ingevoegde blokken en
  // klikken die verderop worden tegengehouden meetellen; het click-event komt ook bij Enter op een link en bij een tik op mobiel.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var naam = a.protocol === 'tel:' ? 'phone_clicks' :
      a.protocol === 'mailto:' ? (/^mailto:pz@/i.test(a.href) ? '' : 'email_clicks') :
      a.hostname === 'wa.me' && a.pathname === '/31773232100' ? 'whatsapp_clicks' : '';
    if (!naam) return;
    stuur(naam, { link_location: a.closest('.sbf__klaar, .sbf__melding, .lf__done') ? 'form_result' :
      a.closest('.wa-zweef') ? 'floating' : a.closest('.mcta') ? 'mobile_bar' :
      a.closest('.topbar, .drawer') ? 'header' : a.closest('footer') ? 'footer' : 'content' });
  }, true);

  // site.js roept dit aan na HTTP 2xx met success === true van Web3Forms, met een vaste soort per formulier.
  var SOORTEN = { offerte: 'form_submit_offerte', videogesprek: 'form_submit_videochat',
    sollicitatie: 'sollicitatie_verstuurd', tekenbonus: 'sollicitatie_verstuurd' };
  window.kvFormConversie = function (soort) {
    if (Object.prototype.hasOwnProperty.call(SOORTEN, soort)) stuur(SOORTEN[soort], { form_type: soort });
  };
  // Keuze gemaakt of gewijzigd via de banner, Cookie-instellingen of een ander tabblad: toestemming bijwerken, de tag blijft.
  document.addEventListener('bresser:consent', function () {
    var stat = actueel('statistieken'), adv = actueel('advertenties');
    if (stat !== statistieken || adv !== advertenties) pas(stat, adv);
  });
})();
