/* Per categorie drie kaarten; de overige kaarten blijven zonder JavaScript bereikbaar. */
document.querySelectorAll('.c7-dgroep').forEach(groep => {
  const lijst = groep.querySelector('.sb-diensten__grid');
  const extra = Array.from(lijst.children).slice(3);
  if (!extra.length) return;

  const naam = groep.querySelector('.c7-dgroep__kop').textContent;
  lijst.id = lijst.getAttribute('aria-labelledby') + '-kaarten';
  const knop = document.createElement('button');
  knop.type = 'button';
  knop.className = 'btn btn--omlijnd c7-dgroep__meer';
  knop.setAttribute('aria-controls', lijst.id);

  function toon(uitgeklapt) {
    extra.forEach(kaart => { kaart.hidden = !uitgeklapt; });
    knop.textContent = uitgeklapt ? 'Minder' : 'Meer';
    knop.setAttribute('aria-expanded', String(uitgeklapt));
    knop.setAttribute('aria-label', (uitgeklapt ? 'Minder' : 'Meer') + ' kaarten: ' + naam);
  }

  toon(false);
  knop.addEventListener('click', () => toon(knop.getAttribute('aria-expanded') !== 'true'));
  lijst.after(knop);
});
