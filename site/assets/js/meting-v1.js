/* De Bresser meting v1 (14-10-2026, GA4-herstel): de Google-tag (gtag.js) rechtstreeks naar GA4 G-4SC19GL438 (property
   351891814). Geen Google Tag Manager meer: de oude container GTM-KW9T4MD telde een formulierpoging al voordat Web3Forms
   antwoordde, telde sollicitaties als aanvraag en mat WhatsApp niet.
   Dit bestand staat in elke pagina als <script type="text/plain" data-cb-categorie="statistieken" src="...">; cookie-consent-v3.js
   voert het pas uit na toestemming voor "statistieken". Alleen op https://www.debresser.nl, zodat de dummy en lokale kopieen
   niets meten. Bij het uitvoeren telt de actuele keuze (window.bresserCookies), niet de keuze van het moment van activeren.
   Geen advertentiemeting: ad_storage, ad_user_data en ad_personalization blijven denied, Google Signals en
   advertentiepersonalisatie staan uit en ads_data_redaction haalt klik-ID's uit signalen naar Google Ads.
   Gebeurtenissen: page_view (een per pagina); phone_clicks, email_clicks en whatsapp_clicks (alleen ons eigen nummer) met een
   vaste link_location; form_submit_offerte en form_submit_videochat (aanvragen) en sollicitatie_verstuurd (sollicitatie of
   tekenbonus, geen klantaanvraag), pas na een geslaagde verzending via site.js (window.kvFormConversie).
   Wat zonder toestemming gebeurde, wordt nooit later alsnog verstuurd.
   14-10-2026 avond (categorie "advertenties", besluit Shahab): het script staat nu als data-cb-categorie="statistieken
   advertenties" en draait na toestemming voor een van beide. analytics_storage volgt "statistieken"; ad_storage en
   ad_user_data volgen "advertenties", zodat Google Ads de geimporteerde GA4-conversies kan ontvangen. ad_personalization
   blijft altijd denied (geen remarketing), Google Signals en advertentiepersonalisatie blijven uit. Hierboven is
   "Geen advertentiemeting" daarmee vervangen; ads_data_redaction werkt alleen zolang ad_storage denied is. */
(function () {
  'use strict';
  if (location.hostname !== 'www.debresser.nl' || location.protocol !== 'https:' || window.bresserMeting) return;
  window.bresserMeting = true;
  var ID = 'G-4SC19GL438', UIT = 'ga-disable-' + ID;
  var dl = window.dataLayer = window.dataLayer || [];
  function gtag() { dl.push(arguments); }
  var aan = false, statistieken = false, advertenties = false;
  var geladen = false, laden = false, ingesteld = false, paginaGemeten = false, wacht = [];
  window[UIT] = true;

  function toestemming(analytics, ads) {
    return { analytics_storage: analytics, ad_storage: ads, ad_user_data: ads, ad_personalization: 'denied' };
  }
  gtag('consent', 'default', toestemming('denied', 'denied'));
  gtag('set', 'ads_data_redaction', true);

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
    if (!aan) return;  // zonder toestemming niets, ook niet bewaren voor later
    var p = { send_to: ID, page_location: plek, page_referrer: vorige };
    for (var k in extra) p[k] = extra[k];
    if (!geladen) { wacht.push([naam, p]); return; }  // toestemming is er, de tag laadt nog
    gtag('event', naam, p);
  }
  function start() {
    if (!aan || !geladen) return;
    if (!ingesteld) {
      ingesteld = true;
      gtag('config', ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
        page_location: plek, page_referrer: vorige });
    }
    if (!paginaGemeten) { paginaGemeten = true; stuur('page_view'); }
    var w = wacht; wacht = [];
    w.forEach(function (e) { gtag('event', e[0], e[1]); });
  }
  function laad() {
    if (geladen || laden) return;
    laden = true;
    gtag('js', new Date());
    var s = document.createElement('script');
    s.async = true;
    s.referrerPolicy = 'no-referrer';
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    s.onload = function () { geladen = true; laden = false; start(); };
    s.onerror = function () { laden = false; wacht = []; s.remove(); };
    document.head.appendChild(s);
  }
  function pas(stat, adv) {
    statistieken = stat; advertenties = adv; aan = stat || adv;
    window[UIT] = !aan;  // eerst: ook een al geladen Google-tag stuurt dan niets meer
    if (!aan) wacht = [];
    gtag('consent', 'update', toestemming(stat ? 'granted' : 'denied', adv ? 'granted' : 'denied'));
    if (aan) { laad(); start(); }
  }
  function actueel(categorie) { return !!(window.bresserCookies && window.bresserCookies.toestemming(categorie)); }

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
  // Keuze gewijzigd via Cookie-instellingen of in een ander tabblad: meting uit of weer aan in deze pagina.
  document.addEventListener('bresser:consent', function () {
    var stat = actueel('statistieken'), adv = actueel('advertenties');
    if (stat !== statistieken || adv !== advertenties) pas(stat, adv);
  });
  pas(actueel('statistieken'), actueel('advertenties'));
})();
