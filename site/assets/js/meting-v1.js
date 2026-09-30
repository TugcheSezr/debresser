/* De Bresser meting v1 (FINAAL12e, 30-9-2026): Google Tag Manager GTM-KW9T4MD met GA4 G-4SC19GL438, zoals op de vorige site.
   Dit bestand staat in elke pagina als <script type="text/plain" data-cb-categorie="statistieken" src="...">; cookie-consent-v3.js
   voert het pas uit na toestemming voor "statistieken". Alleen op www.debresser.nl, zodat de dummy en lokale kopieen niets meten.
   Alleen Google-tags: de blocklist houdt eigen html, eigen pixels en scripts, pixels en iframes van derden tegen, en daarmee ook
   alle templates uit de container (Leadinfo, Clarity, Cookiebot, Smartlook, Promptwatch en de oude Product-JSON-LD).
   Geen advertentiecookies: ad_storage, ad_user_data en ad_personalization blijven denied.
   Formulierevents komen uit de container zelf (gtm.formSubmit, gefilterd op de form-action): de aanvraagformulieren posten
   naar api.web3forms.com/submit#offerte of #videogesprek (een fragment gaat niet mee naar de server), de sollicitaties
   zonder fragment en tellen dus als form_submit_rest. */
(function () {
  'use strict';
  if (location.hostname !== 'www.debresser.nl' || window.bresserMeting) return;
  window.bresserMeting = true;
  var GA4 = 'G-4SC19GL438';
  var dl = window.dataLayer = window.dataLayer || [];
  function gtag() { dl.push(arguments); }

  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  dl.push({ 'gtm.blocklist': ['html', 'customScripts', 'customPixels', 'nonGooglePixels', 'nonGoogleScripts', 'nonGoogleIframes'] });
  dl.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KW9T4MD';
  document.head.appendChild(s);

  // Het adresformulier in de hero (#ofForm) stuurt alleen door naar /offerte/. Omdat zijn action "offerte" bevat, zou de
  // container er al form_submit_offerte voor tellen; daarom bereikt zijn submit de formulierluisteraar van GTM niet.
  var hero = document.getElementById('ofForm');
  if (hero) hero.addEventListener('submit', function (e) { e.stopPropagation(); });

  // site.js zet novalidate op de Web3Forms-formulieren (form[data-w3f]) en keurt zelf met checkValidity. Een ongeldige poging
  // of een botcheck-treffer geeft dus wel een submit-event, maar verstuurt niets. De container telt de eerste gtm.formSubmit
  // per pagina als aanvraag, dus zo'n poging mag GTM niet bereiken.
  [].forEach.call(document.querySelectorAll('form[data-w3f]'), function (f) {
    f.addEventListener('submit', function (e) {
      var bot = f.querySelector('input[name=botcheck]');
      if (!f.checkValidity() || (bot && bot.checked)) e.stopPropagation();
    });
  });

  // Keuze later gewijzigd via Cookie-instellingen: meting uit of weer aan in deze pagina.
  // Het wissen van de meetcookies bij intrekken doet cookie-consent-v3.js, ook op pagina's waar dit script niet laadde.
  document.addEventListener('bresser:consent', function (e) {
    var aan = !!(e.detail && e.detail.categorieen && e.detail.categorieen.statistieken);
    window['ga-disable-' + GA4] = !aan;
    gtag('consent', 'update', { analytics_storage: aan ? 'granted' : 'denied' });
  });
})();
