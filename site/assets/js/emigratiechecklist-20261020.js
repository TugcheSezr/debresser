/* Emigratiechecklist: telt afgevinkte punten per blok en per fase, onthoudt ze per bezoeker in deze browser. Extern laden met defer (CSP: geen inline). */
(function () {
  [].forEach.call(document.querySelectorAll('.emc'), function (blok) {
    var vakjes = [].slice.call(blok.querySelectorAll('.emc__lijst input[type="checkbox"]'));
    if (!vakjes.length) return;
    var sleutel = 'emc-' + blok.id + '-' + location.pathname;
    var opgeslagen = [];
    try { opgeslagen = JSON.parse(localStorage.getItem(sleutel) || '[]'); } catch (e) {}
    if (!Array.isArray(opgeslagen)) opgeslagen = []; // null, {} of 42 in de opslag telt als lege selectie
    vakjes.forEach(function (v, i) { v.checked = opgeslagen.indexOf(i) > -1; });

    function zet(sel, tekst) { var el = blok.querySelector(sel); if (el) el.textContent = tekst; }

    function bijwerken() {
      var klaar = [];
      vakjes.forEach(function (v, i) { if (v.checked) klaar.push(i); });
      zet('[data-emc-klaar]', klaar.length);
      zet('[data-emc-totaal]', vakjes.length);
      var balk = blok.querySelector('[data-emc-balk]');
      if (balk) balk.style.width = (klaar.length / vakjes.length * 100) + '%';
      [].forEach.call(blok.querySelectorAll('.emc__kaart'), function (kaart) {
        var eigen = kaart.querySelectorAll('input'), af = kaart.querySelectorAll('input:checked');
        kaart.classList.toggle('is-klaar', eigen.length > 0 && af.length === eigen.length);
        var tel = kaart.querySelector('[data-emc-fasetel]');
        if (tel) tel.textContent = af.length + '/' + eigen.length;
        var seg = blok.querySelector('[data-emc-seg="' + kaart.getAttribute('data-fase') + '"]');
        if (seg) seg.style.setProperty('--vul', (eigen.length ? af.length / eigen.length * 100 : 0) + '%');
      });
      try { localStorage.setItem(sleutel, JSON.stringify(klaar)); } catch (e) {}
    }

    blok.addEventListener('change', bijwerken);
    // printen: alle kaarten open (gesloten details printen hun inhoud niet), daarna de openstaat van de bezoeker terugzetten
    var kaarten = [].slice.call(blok.querySelectorAll('.emc__kaart')), stand = null;
    function herstel() {
      if (!stand) return;
      kaarten.forEach(function (k, i) { k.open = stand[i]; });
      stand = null;
      document.documentElement.removeAttribute('data-emc-print');
    }
    window.addEventListener('afterprint', herstel);
    var print = blok.querySelector('[data-emc-print]');
    if (print) print.addEventListener('click', function () {
      stand = kaarten.map(function (k) { return k.open; });
      kaarten.forEach(function (k) { k.open = true; });
      document.documentElement.setAttribute('data-emc-print', '');
      window.print();
      herstel();
    });
    var reset = blok.querySelector('[data-emc-reset]');
    if (reset) reset.addEventListener('click', function () {
      vakjes.forEach(function (v) { v.checked = false; });
      bijwerken();
    });
    bijwerken();
  });
})();
