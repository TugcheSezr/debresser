/* M3 calculator (/m3-calculator/, 28-09-2026). Telt aantal maal inhoud per item op, per kamer en in totaal.
   De tabbladen zelf komen uit site.js ([data-tabs]). Geen opslag en geen verzending: alles blijft in de pagina.
   Lege of onzinnige invoer telt als 0; een aantal ligt tussen 0 en 99.
   De knop naar de prijscalculator krijgt ?m3= met hoogstens een decimaal (punt), alleen bij een totaal van 1 tot 300;
   /verhuisprijscalculator/ leest die waarde en haalt hem daarna uit het adres. De offerteknop gaat dan naar /offerte/?m3=. */
(function () {
  var raster = document.querySelector('[data-m3c]');
  if (!raster) return;
  var alle = function (sel) { return Array.prototype.slice.call(raster.querySelectorAll(sel)); };
  var panelen = alle('.m3c-paneel');
  var totaalEl = raster.querySelector('[data-m3totaal]'), lijstEl = raster.querySelector('[data-m3lijst]');
  var leegEl = raster.querySelector('[data-m3leeg]'), prijsEl = raster.querySelector('[data-m3prijs]');
  var offerteEls = alle('[data-m3offerte]'), balk = raster.querySelector('[data-m3balk]');
  var balkTotaal = raster.querySelector('[data-m3balktotaal]'), somEl = raster.querySelector('.m3c-som');

  function aantal(invoer) {
    var n = parseInt(invoer.value, 10);
    return isNaN(n) ? 0 : Math.min(99, Math.max(0, n));
  }
  function fmt(v) { return (Math.round(v * 100) / 100).toLocaleString('nl-NL'); }

  function herbereken() {
    var totaal = 0, regels = [];
    panelen.forEach(function (paneel) {
      var som = 0;
      paneel.querySelectorAll('.m3c-rij').forEach(function (rij) {
        var n = aantal(rij.querySelector('input'));
        som += n * parseFloat(rij.getAttribute('data-m3'));
        rij.classList.toggle('is-actief', n > 0);
      });
      som = Math.round(som * 100) / 100;
      totaal += som;
      var chip = document.querySelector('[aria-controls="' + paneel.id + '"] [data-kamersom]');
      if (chip) { chip.textContent = fmt(som) + ' m³'; chip.classList.toggle('is-actief', som > 0); }
      if (som > 0) regels.push([paneel.getAttribute('data-kamer'), som]);
    });
    totaal = Math.round(totaal * 100) / 100;
    totaalEl.textContent = balkTotaal.textContent = fmt(totaal);
    lijstEl.textContent = '';
    regels.forEach(function (r) {
      var li = document.createElement('li'), a = document.createElement('span'), b = document.createElement('span');
      a.textContent = r[0]; b.textContent = fmt(r[1]) + ' m³';
      li.appendChild(a); li.appendChild(b); lijstEl.appendChild(li);
    });
    lijstEl.hidden = regels.length === 0;
    leegEl.hidden = regels.length > 0;
    var m3 = Math.round(totaal * 10) / 10, geldig = m3 >= 1 && m3 <= 300;
    prijsEl.href = '/verhuisprijscalculator/' + (geldig ? '?m3=' + m3 : '');
    // naar /offerte/: site.js zet ?m3= in het verborgen veld van de aanvraag; zonder geldig totaal het offerteblok hier
    offerteEls.forEach(function (a) { a.href = geldig ? '/offerte/?m3=' + m3 + '#offerte' : '#offerte-aanvragen'; });
  }

  raster.addEventListener('click', function (e) {
    var knop = e.target.closest('.m3c-knop');
    if (!knop) return;
    var invoer = knop.parentElement.querySelector('input');
    invoer.value = Math.min(99, Math.max(0, aantal(invoer) + parseInt(knop.getAttribute('data-stap'), 10)));
    herbereken();
  });
  raster.addEventListener('input', function (e) {
    if (e.target.matches('.m3c-rij input')) herbereken();
  });
  // bij het verlaten van het veld: wat niet telt, wordt zichtbaar het getal dat wel telt
  raster.addEventListener('change', function (e) {
    if (e.target.matches('.m3c-rij input')) { e.target.value = aantal(e.target); herbereken(); }
  });
  raster.querySelector('[data-m3wis]').addEventListener('click', function () {
    alle('.m3c-rij input').forEach(function (i) { i.value = 0; });
    herbereken();
  });
  herbereken();

  // Vaste totaalbalk op smal scherm (css tot 1000px): zichtbaar zolang de kamers in beeld zijn en de totaalkaart niet.
  // Onder 768px staat .mcta vast onderaan; de balk komt erboven via --m3c-onder.
  if (!('IntersectionObserver' in window)) return;
  var mcta = document.querySelector('.mcta'), kamersIn = false, somIn = false;
  function zet() {
    balk.style.setProperty('--m3c-onder', (mcta ? mcta.offsetHeight : 0) + 'px');
    balk.classList.toggle('is-zichtbaar', kamersIn && !somIn);
  }
  var kijker = new IntersectionObserver(function (items) {
    items.forEach(function (i) { if (i.target === somEl) somIn = i.isIntersecting; else kamersIn = i.isIntersecting; });
    zet();
  });
  kijker.observe(raster.querySelector('.m3c-kamers'));
  kijker.observe(somEl);
  window.addEventListener('resize', zet);
})();
