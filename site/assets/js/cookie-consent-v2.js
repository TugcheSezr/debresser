/* De Bresser cookiebanner v2 (v1 + toetsenbordfocus: uitgeschakelde velden tellen niet mee, focusval wrapt en vangt focus van buiten de dialoog op).
   Geen inline handlers, geen eval, alleen this bestand (script-src 'self').
   Opslag: localStorage sleutel BRESSER_KEY, met een first-party cookie als terugval (try/catch om beide).
   Categorieen: "noodzakelijk" (altijd aan, geen keuze) en "voorkeuren" (YouTube-embeds). Ruimte voor een
   volgende categorie (bv. "statistieken") is voorzien in CATEGORIEEN en in de opslagvorm.
   Gate voor embeds: <script type="text/plain" data-cb-categorie="voorkeuren">...</script> wordt pas
   geactiveerd (type verwijderd, opnieuw ingevoegd zodat de browser hem uitvoert) na toestemming voor die
   categorie; de inhoud van zo'n script blijft ongewijzigd, dus een CSP-hash op de inhoud blijft geldig. */
(function () {
  'use strict';
  var BRESSER_KEY = 'bresser_cookie_consent_v1';
  var MAX_DAGEN = 365;
  var CATEGORIEEN = ['voorkeuren'];

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
    if (!data || data.v !== 1 || !data.tijd) return null;
    var leeftijdDagen = (nu().getTime() - new Date(data.tijd).getTime()) / 86400000;
    if (leeftijdDagen > MAX_DAGEN || leeftijdDagen < 0) return null;
    return data;
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
    for (var i = 0; i < CATEGORIEEN.length; i++) {
      var c = CATEGORIEEN[i];
      if (data.categorieen && data.categorieen[c]) activeerCategorie(c);
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
  var banner, laagHoofd, laagAanpassen, vorigeFocus, m3cHerstel;

  function zetM3cOffset(hoogtePx) {
    try {
      document.documentElement.style.setProperty('--m3c-onder', hoogtePx ? hoogtePx + 'px' : '0px');
    } catch (e) { /* geen custom property-steun: geen probleem, alleen geen verschuiving */ }
  }

  function toonLaag(laag) {
    laagHoofd.hidden = laag !== 'hoofd';
    laagAanpassen.hidden = laag !== 'aanpassen';
    banner.setAttribute('aria-labelledby', laag === 'hoofd' ? 'cbKopHoofd' : 'cbKopAanpassen');
    var eersteVeld = (laag === 'hoofd' ? laagHoofd : laagAanpassen).querySelector(FOCUSBAAR);
    if (eersteVeld) eersteVeld.focus();
  }

  function sluitBanner() {
    banner.hidden = true;
    document.documentElement.classList.remove('heeft-cookiebanner');
    zetM3cOffset(0);
    if (vorigeFocus && typeof vorigeFocus.focus === 'function') vorigeFocus.focus();
  }

  function openBanner(alsHerinstelling) {
    vorigeFocus = document.activeElement;
    banner.hidden = false;
    document.documentElement.classList.add('heeft-cookiebanner');
    toonLaag('hoofd');
    // hoogte na render meten voor de m3c-balk-verschuiving (--m3c-onder), alleen als de balk zichtbaar zou zijn
    requestAnimationFrame(function () { zetM3cOffset(banner.offsetHeight); });
    banner.dataset.herinstelling = alsHerinstelling ? '1' : '0';
  }

  function focusVal(e) {
    if (banner.hidden || e.key !== 'Tab') return;
    var actief = laagHoofd.hidden ? laagAanpassen : laagHoofd;
    var velden = actief.querySelectorAll(FOCUSBAAR + ', a[href]');
    if (!velden.length) return;
    var eerste = velden[0], laatste = velden[velden.length - 1];
    if (!actief.contains(document.activeElement)) { (e.shiftKey ? laatste : eerste).focus(); e.preventDefault(); }
    else if (e.shiftKey && document.activeElement === eerste) { laatste.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === laatste) { eerste.focus(); e.preventDefault(); }
  }

  function opEscape(e) {
    if (e.key !== 'Escape' || banner.hidden) return;
    // alleen sluiten als er al een geldige keuze lag (heropend via Cookie-instellingen), nooit de allereerste keer
    if (banner.dataset.herinstelling === '1') sluitBanner();
  }

  function init() {
    banner = document.getElementById('cookieBanner');
    if (!banner) return;
    laagHoofd = banner.querySelector('[data-laag="hoofd"]');
    laagAanpassen = banner.querySelector('[data-laag="aanpassen"]');
    if (!laagHoofd || !laagAanpassen) return;

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
        var opgeslagen = leesOpslag();
        if (opgeslagen && opgeslagen.categorieen) {
          laagAanpassen.querySelectorAll('[data-cb-categorie]').forEach(function (input) {
            input.checked = !!opgeslagen.categorieen[input.dataset.cbCategorie];
          });
        }
        openBanner(true);
        toonLaag('aanpassen');
      }
    });

    var opgeslagen = leesOpslag();
    if (opgeslagen) { pasToe(opgeslagen); return; }
    openBanner(false);
  }

  function alleCategorieen(waarde) {
    var out = {};
    for (var i = 0; i < CATEGORIEEN.length; i++) out[CATEGORIEEN[i]] = waarde;
    return out;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
