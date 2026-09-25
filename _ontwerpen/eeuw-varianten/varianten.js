// Variantpagina "een eeuw in ontwikkeling": pijlknoppen van de filmstrip (04) en de jaarkiezer (06).
// Alleen op klik of toets; er loopt niets vanzelf.
(function () {
  // 04 Filmstrip
  document.querySelectorAll('.ev4').forEach(function (sec) {
    var strip = sec.querySelector('.ev4__strip');
    var knoppen = sec.querySelectorAll('[data-strip]');
    if (!strip) return;
    function stand() {
      var max = strip.scrollWidth - strip.clientWidth - 2;
      knoppen[0].disabled = strip.scrollLeft <= 2;
      knoppen[1].disabled = strip.scrollLeft >= max;
    }
    knoppen.forEach(function (k) {
      k.addEventListener('click', function () {
        var stap = strip.querySelector('li').offsetWidth + 26;
        strip.scrollBy({ left: stap * +k.dataset.strip * 2, behavior: 'smooth' });
      });
    });
    strip.addEventListener('scroll', stand, { passive: true });
    window.addEventListener('resize', stand);
    stand();
  });

  // 06 Jaarkiezer
  document.querySelectorAll('.ev6').forEach(function (sec) {
    var tabs = Array.prototype.slice.call(sec.querySelectorAll('[role="tab"]'));
    var panelen = Array.prototype.slice.call(sec.querySelectorAll('[role="tabpanel"]'));
    function kies(i, focus) {
      i = Math.max(0, Math.min(tabs.length - 1, i));
      tabs.forEach(function (t, n) {
        t.setAttribute('aria-selected', n === i ? 'true' : 'false');
        t.tabIndex = n === i ? 0 : -1;
        panelen[n].hidden = n !== i;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, n) {
      t.addEventListener('click', function () { kies(n); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); kies(n + 1, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); kies(n - 1, true); }
        if (e.key === 'Home') { e.preventDefault(); kies(0, true); }
        if (e.key === 'End') { e.preventDefault(); kies(tabs.length - 1, true); }
      });
    });
    panelen.forEach(function (p, n) {
      p.querySelectorAll('[data-stap]').forEach(function (b) {
        b.addEventListener('click', function () { kies(n + +b.dataset.stap); });
      });
    });
  });
})();
