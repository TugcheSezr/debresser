/* Inkoop en verkoop assets: een product "in het winkelwagentje" leggen.
   Bij hover/focus op een dienst vliegt een groen prijskaartje naar de wagen
   en telt de teller op. Puur decoratief; de links werken gewoon. */
(function () {
  var shop = document.querySelector('[data-ivk-shop]');
  if (!shop) return;

  var kar = shop.querySelector('.ivk-shop__kar');
  var teller = shop.querySelector('[data-ivk-teller]');
  var kaarten = shop.querySelectorAll('.mini-card');
  var aantal = 0;
  var rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function erbij() {
    aantal += 1;
    teller.textContent = aantal;
    kar.classList.remove('is-bump');
    void kar.offsetWidth;
    kar.classList.add('is-bump');
  }

  function vlieg(kaart) {
    if (kaart.dataset.ivkIn) return;
    kaart.dataset.ivkIn = '1';
    if (rustig) { erbij(); return; }

    var van = kaart.getBoundingClientRect();
    var naar = kar.getBoundingClientRect();
    var el = document.createElement('span');
    el.className = 'ivk-vlieg';
    var x0 = van.right - 44, y0 = van.top + 16;
    el.style.left = x0 + 'px';
    el.style.top = y0 + 'px';
    document.body.appendChild(el);
    void el.offsetWidth;
    var dx = naar.left + naar.width / 2 - 13 - x0;
    var dy = naar.top + naar.height / 2 - 7 - y0;
    el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(-200deg) scale(.5)';
    el.style.opacity = '.4';
    setTimeout(function () { el.remove(); erbij(); }, 700);
  }

  kaarten.forEach(function (k) {
    k.addEventListener('mouseenter', function () { vlieg(k); });
    k.addEventListener('focus', function () { vlieg(k); });
  });

  // eerste product gaat vanzelf in de wagen zodra het venster in beeld is
  if ('IntersectionObserver' in window && kaarten.length) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        io.disconnect();
        setTimeout(function () { vlieg(kaarten[0]); }, 1100);
      }
    }, { threshold: 0.35 });
    io.observe(shop);
  }
})();
