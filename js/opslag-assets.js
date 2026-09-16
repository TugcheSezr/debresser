/* Opslag assets: rolluik van de opslagbox gaat open als de box in beeld komt.
   Zonder JS staat het luik gewoon open (tekst blijft altijd leesbaar). */
(function () {
  var unit = document.querySelector('[data-oa-unit]');
  if (!unit || !('IntersectionObserver' in window)) return;

  var knop = unit.querySelector('.oa-unit__knop');
  var timers = [];
  var open = false;

  function wis() { timers.forEach(clearTimeout); timers = []; }

  function openen() {
    if (open) return;
    open = true;
    wis();
    knop.setAttribute('aria-pressed', 'true');
    unit.classList.add('is-los');
    timers.push(setTimeout(function () { unit.classList.add('is-open'); }, 380));
    timers.push(setTimeout(function () { unit.classList.add('is-licht'); }, 1150));
  }

  function sluiten() {
    if (!open) return;
    open = false;
    wis();
    knop.setAttribute('aria-pressed', 'false');
    unit.classList.remove('is-licht', 'is-open');
    timers.push(setTimeout(function () { unit.classList.remove('is-los'); }, 1700));
  }

  unit.classList.add('oa-js');
  knop.setAttribute('aria-pressed', 'false');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        setTimeout(openen, 500);
        io.disconnect();
      }
    });
  }, { threshold: 0.45 });
  io.observe(unit);

  knop.addEventListener('click', function () { open ? sluiten() : openen(); });
  // toetsenbord: bij focus op de knop "Contact opnemen" gaat het luik open
  unit.querySelector('.oa-unit__tekst').addEventListener('focusin', openen);
})();
