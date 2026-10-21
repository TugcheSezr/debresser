/* De Bresser cookiebanner v3 (v2 + categorie "statistieken" voor Google Analytics via meting-v1.js, FINAAL12e 30-9-2026).
   v2: toetsenbordfocus: uitgeschakelde velden tellen niet mee, focusval wrapt en vangt focus van buiten de dialoog op.
   Geen inline handlers, geen eval, alleen this bestand (script-src 'self').
   Opslag: localStorage sleutel BRESSER_KEY, met een first-party cookie als terugval (try/catch om beide).
   Categorieen: "noodzakelijk" (altijd aan, geen keuze), "voorkeuren" (YouTube-embeds) en "statistieken" (Google Analytics).
   Een bewaarde keuze zonder een van deze categorieen (van voor v3) telt niet: dan komt de banner terug, zodat niemand
   meting krijgt zonder er zelf voor te kiezen. Zonder toestemming voor statistieken worden meetcookies (_ga, _gcl_) gewist.
   Gate voor embeds: <script type="text/plain" data-cb-categorie="voorkeuren">...</script> wordt pas
   geactiveerd (type verwijderd, opnieuw ingevoegd zodat de browser hem uitvoert) na toestemming voor die
   categorie; de inhoud van zo'n script blijft ongewijzigd, dus een CSP-hash op de inhoud blijft geldig.
   14-10-2026 (meting zonder GTM): een bewaarde keuze telt alleen met echte true/false per categorie en een geldige tijd,
   anders komt de banner terug. De actuele keuze van deze pagina staat ook in het geheugen (window.bresserCookies), zodat
   meting-v1.js bij het uitvoeren de keuze van dat moment leest, ook als opslag geblokkeerd is. Een keuze die in een ander
   tabblad wordt opgeslagen of ingetrokken, geldt via het storage-event meteen ook hier; wordt de keuze daar verwijderd
   (removeItem of clear), dan telt dat hier als intrekken, ook als de terugvalcookie nog een oude keuze bevat.
   14-10-2026 (popup 0.3.3): de schakelaars tonen bij heropenen de keuze die nu in deze pagina geldt (huidig), focus gaat
   naar de titel van de laag, Escape in de instellingen gaat de eerste keer terug naar de eerste laag. Zonder geldige
   bewaarde keuze worden meetcookies bij het openen van een pagina gewist, net als bij weigeren.
   14-10-2026 avond (besluit Shahab): derde categorie "advertenties" (Google Ads-conversiemeting via meting-v1.js, geen
   remarketing). Een bewaarde keuze zonder "advertenties" telt daardoor niet meer (zelfde regel als hierboven, schema blijft
   v1): de banner komt terug, zodat ook wie eerder accepteerde opnieuw kiest. _ga-cookies worden gewist zonder toestemming
   voor statistieken, _gcl_-cookies zonder toestemming voor advertenties.
   14-10-2026 nacht (geavanceerde consent mode): meting-v1.js staat niet meer achter een categorie maar laadt altijd, als
   deferred script direct na dit bestand. Dit bestand leest de bewaarde keuze daarom synchroon bij het uitvoeren (init), zodat
   window.bresserCookies de keuze al geeft voordat meting-v1.js draait. Zonder toestemming voor advertenties wist het ook
   _gcl_-sleutels in localStorage (_gcl_ls). */
(function () {
  'use strict';
  var BRESSER_KEY = 'bresser_cookie_consent_v1';
  var MAX_DAGEN = 365;
  var GA_COOKIES = /^(_ga|_ga_.+)$/, ADS_COOKIES = /^_gcl_.+$/;
  var CATEGORIEEN = ['voorkeuren', 'statistieken', 'advertenties'];

  var huidig = null;  // de keuze die nu in deze pagina geldt

  function nu() { return new Date(); }

  function leesOpslag() {
    var ruw = null;
    try { ruw = window.localStorage.getItem(BRESSER_KEY); } catch (e) { ruw = null; }
    if (!ruw) {
      try {
        var m = document.cookie.match(new RegExp('(?:^|; )' + BRESSER_KEY + '=([^;]*)'));
        ruw = m ? decodeURIComponent(m[1]) : null;
      } catch (e) { ruw = null; }
    }
    if (!ruw) return null;
    var data;
    try { data = JSON.parse(ruw); } catch (e) { return null; }
    if (!data || data.v !== 1 || typeof data.tijd !== 'string') return null;
    var leeftijdDagen = (nu().getTime() - new Date(data.tijd).getTime()) / 86400000;
    if (!isFinite(leeftijdDagen) || leeftijdDagen > MAX_DAGEN || leeftijdDagen < 0) return null;
    for (var i = 0; i < CATEGORIEEN.length; i++) {
      if (!data.categorieen || typeof data.categorieen[CATEGORIEEN[i]] !== 'boolean') return null;
    }
    return data;
  }

  function wisMeetcookies(patroon) {
    var basis = window.location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (!patroon.test(n)) return;
      ['', window.location.hostname, '.' + basis].forEach(function (d) {
        document.cookie = n + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + (d ? ';domain=' + d : '');
      });
    });
    // Met toestemming voor advertenties bewaart Google klikgegevens ook in localStorage (_gcl_ls).
    try {
      for (var i = window.localStorage.length - 1; i >= 0; i--) {
        var k = window.localStorage.key(i);
        if (patroon.test(k)) window.localStorage.removeItem(k);
      }
    } catch (e) { /* geen toegang tot opslag: dan staat er ook niets te wissen */ }
  }

  function schrijfOpslag(data) {
    var ruw = JSON.stringify(data);
    try { window.localStorage.setItem(BRESSER_KEY, ruw); } catch (e) { /* terugval hieronder */ }
    try {
      var verloopt = new Date(nu().getTime() + MAX_DAGEN * 86400000).toUTCString();
      var veilig = window.location.protocol === 'https:' ? ';Secure' : '';
      document.cookie = BRESSER_KEY + '=' + encodeURIComponent(ruw) + ';expires=' + verloopt + ';path=/;SameSite=Lax' + veilig;
    } catch (e) { /* geen opslag mogelijk: banner blijft dan bij elk bezoek terugkomen (fail-closed) */ }
  }

  function activeerCategorie(categorie) {
    var scripts = document.querySelectorAll('script[type="text/plain"][data-cb-categorie="' + categorie + '"]');
    for (var i = 0; i < scripts.length; i++) {
      var oud = scripts[i];
      var nieuw = document.createElement('script');
      for (var a = 0; a < oud.attributes.length; a++) {
        var attr = oud.attributes[a];
        if (attr.name === 'type') continue;
        nieuw.setAttribute(attr.name, attr.value);
      }
      nieuw.text = oud.text;
      oud.parentNode.replaceChild(nieuw, oud);
    }
  }

  function pasToe(data) {
    huidig = data;
    for (var i = 0; i < CATEGORIEEN.length; i++) {
      var c = CATEGORIEEN[i];
      if (data.categorieen && data.categorieen[c]) activeerCategorie(c);
    }
    if (!(data.categorieen && data.categorieen.statistieken)) {
      try { wisMeetcookies(GA_COOKIES); } catch (e) { /* geen toegang tot cookies: dan zijn er ook geen te wissen */ }
    }
    if (!(data.categorieen && data.categorieen.advertenties)) {
      try { wisMeetcookies(ADS_COOKIES); } catch (e) { /* geen toegang tot cookies: dan zijn er ook geen te wissen */ }
    }
    try {
      document.dispatchEvent(new CustomEvent('bresser:consent', { detail: data }));
    } catch (e) { /* oude browser zonder CustomEvent: embeds laden dan pas na een volgend bezoek */ }
  }

  function bewaarEnPasToe(keuze, categorieen) {
    var data = { v: 1, tijd: nu().toISOString(), keuze: keuze, categorieen: categorieen };
    schrijfOpslag(data);
    pasToe(data);
    return data;
  }

  var FOCUSBAAR = 'button:not([disabled]), input:not([disabled])';
  var banner, laagHoofd, laagAanpassen, vorigeFocus, voorkeurLijst, meerKeuzes;

  // De schakelaars tonen de keuze die nu in deze pagina geldt, niet wat er (nog) in opslag staat.
  function zetVinkjes() {
    laagAanpassen.querySelectorAll('[data-cb-categorie]').forEach(function (input) {
      input.checked = !!(huidig && huidig.categorieen && huidig.categorieen[input.dataset.cbCategorie] === true);
    });
  }

  function toonLaag(laag) {
    laagHoofd.hidden = laag !== 'hoofd';
    laagAanpassen.hidden = laag !== 'aanpassen';
    banner.classList.toggle('is-custom', laag === 'aanpassen');
    banner.setAttribute('aria-labelledby', laag === 'hoofd' ? 'cbKopHoofd' : 'cbKopAanpassen');
    if (laag === 'aanpassen') { zetVinkjes(); voorkeurLijst.scrollTop = 0; }
    document.getElementById(laag === 'hoofd' ? 'cbKopHoofd' : 'cbKopAanpassen').focus();
    requestAnimationFrame(toonScrollhulp);
  }

  // "Meer keuzes bekijken" alleen als de keuzelijst in de instellingen niet in zijn geheel past.
  function toonScrollhulp() {
    if (banner.hidden || laagAanpassen.hidden) { meerKeuzes.hidden = true; return; }
    var ruimte = voorkeurLijst.clientHeight + (meerKeuzes.hidden ? 0 : meerKeuzes.getBoundingClientRect().height);
    meerKeuzes.hidden = voorkeurLijst.scrollHeight <= ruimte + 1;
    meerKeuzes.textContent = voorkeurLijst.scrollTop + voorkeurLijst.clientHeight >= voorkeurLijst.scrollHeight - 2 ? 'Back to top ↑' : 'See more choices ↓';
  }

  function sluitBanner() {
    banner.hidden = true;
    document.documentElement.classList.remove('heeft-cookiebanner');
    if (vorigeFocus && typeof vorigeFocus.focus === 'function') vorigeFocus.focus();
  }

  function openBanner(alsHerinstelling) {
    vorigeFocus = document.activeElement;
    banner.hidden = false;
    document.documentElement.classList.add('heeft-cookiebanner');
    toonLaag('hoofd');
    banner.dataset.herinstelling = alsHerinstelling ? '1' : '0';
  }

  function focusVal(e) {
    if (banner.hidden || e.key !== 'Tab') return;
    var actief = laagHoofd.hidden ? laagAanpassen : laagHoofd;
    var velden = Array.prototype.filter.call(actief.querySelectorAll(FOCUSBAAR + ', a[href]'), function (veld) { return veld.getClientRects().length; });
    if (!velden.length) return;
    var eerste = velden[0], laatste = velden[velden.length - 1];
    if (velden.indexOf(document.activeElement) === -1) { (e.shiftKey ? laatste : eerste).focus(); e.preventDefault(); }
    else if (e.shiftKey && document.activeElement === eerste) { laatste.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === laatste) { eerste.focus(); e.preventDefault(); }
  }

  function opEscape(e) {
    if (e.key !== 'Escape' || banner.hidden) return;
    // alleen sluiten als er al een geldige keuze lag (heropend via Cookie-instellingen), nooit de allereerste keer
    if (banner.dataset.herinstelling === '1') sluitBanner();
    else if (!laagAanpassen.hidden) toonLaag('hoofd');
  }

  function init() {
    banner = document.getElementById('cookieBanner');
    if (!banner) return;
    laagHoofd = banner.querySelector('[data-laag="hoofd"]');
    laagAanpassen = banner.querySelector('[data-laag="aanpassen"]');
    if (!laagHoofd || !laagAanpassen) return;
    voorkeurLijst = document.getElementById('cbVoorkeuren');
    meerKeuzes = document.getElementById('cbMeerKeuzes');
    meerKeuzes.addEventListener('click', function () {
      if (voorkeurLijst.scrollTop + voorkeurLijst.clientHeight >= voorkeurLijst.scrollHeight - 2) voorkeurLijst.scrollTop = 0;
      else voorkeurLijst.scrollTop += Math.max(48, voorkeurLijst.clientHeight * .8);
      toonScrollhulp();
    });
    voorkeurLijst.addEventListener('scroll', toonScrollhulp);
    if (window.ResizeObserver) new ResizeObserver(function () { requestAnimationFrame(toonScrollhulp); }).observe(voorkeurLijst);

    banner.addEventListener('click', function (e) {
      var knop = e.target.closest('[data-cb-actie]');
      if (!knop) return;
      var actie = knop.dataset.cbActie;
      if (actie === 'accepteren') { bewaarEnPasToe('granted', alleCategorieen(true)); sluitBanner(); }
      else if (actie === 'weigeren') { bewaarEnPasToe('denied', alleCategorieen(false)); sluitBanner(); }
      else if (actie === 'aanpassen') { toonLaag('aanpassen'); }
      else if (actie === 'bewaren') {
        var categorieen = {};
        laagAanpassen.querySelectorAll('[data-cb-categorie]').forEach(function (input) {
          categorieen[input.dataset.cbCategorie] = input.checked;
        });
        bewaarEnPasToe('aangepast', categorieen);
        sluitBanner();
      }
    });
    document.addEventListener('keydown', focusVal);
    document.addEventListener('keydown', opEscape);
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cookie-instellingen]')) {
        openBanner(true);
        toonLaag('aanpassen');
      }
    });

    // Keuze opgeslagen of ingetrokken in een ander tabblad (alleen via localStorage). Verwijderd (removeItem of clear), leeg
    // of ongeldig telt als intrekken; de terugvalcookie geldt alleen bij het openen van een pagina en bij geblokkeerde opslag.
    window.addEventListener('storage', function (e) {
      if (e.key !== BRESSER_KEY && e.key !== null) return;
      var data = e.newValue ? leesOpslag() : null;
      if (data) pasToe(data);
      else if (huidig) pasToe({ v: 1, tijd: nu().toISOString(), keuze: 'denied', categorieen: alleCategorieen(false) });
      if (!banner.hidden && !laagAanpassen.hidden) zetVinkjes();
    });

    var opgeslagen = leesOpslag();
    if (opgeslagen) { pasToe(opgeslagen); return; }
    // Geen geldige keuze (nooit gekozen, verlopen of ongeldig): oude meetcookies weg, zoals bij weigeren.
    try { wisMeetcookies(GA_COOKIES); wisMeetcookies(ADS_COOKIES); } catch (e) { /* geen toegang tot cookies: dan zijn er ook geen te wissen */ }
    openBanner(false);
  }

  function alleCategorieen(waarde) {
    var out = {};
    for (var i = 0; i < CATEGORIEEN.length; i++) out[CATEGORIEEN[i]] = waarde;
    return out;
  }

  window.bresserCookies = {
    toestemming: function (categorie) { return !!(huidig && huidig.categorieen && huidig.categorieen[categorie] === true); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
