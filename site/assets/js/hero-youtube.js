/* De homepagefilm volgt uitsluitend de actuele YouTube-voorkeur, ook na intrekken of resize. */
(function () {
  'use strict';
  var h = document.querySelector('.hero__yt'), k = document.getElementById('heroVideoKnop');
  if (!h || !k) return;
  var mq = matchMedia('(min-width:761px) and (prefers-reduced-motion:no-preference)');
  var startTijd = +h.dataset.start, einde = +h.dataset.einde;
  var speler = null, timer = null, apiGevraagd = false, klaar = false, gepauzeerd = false, generatie = 0;
  var pauze = '<rect x="1" y="1" width="3.5" height="12" rx="1"/><rect x="7.5" y="1" width="3.5" height="12" rx="1"/>';
  var speel = '<path d="M2 1l9 6-9 6z"/>';

  function toegestaan() {
    return !!(window.bresserCookies && window.bresserCookies.toestemming('voorkeuren') && mq.matches);
  }

  function stop() {
    generatie++;
    clearInterval(timer); timer = null;
    if (speler) { try { speler.destroy(); } catch (e) { /* de iframe wordt hieronder ook verwijderd */ } }
    speler = null; klaar = false; gepauzeerd = false;
    h.classList.remove('is-speelt');
    h.innerHTML = '<div id="heroYouTube"></div>';
    k.hidden = true;
    k.setAttribute('aria-pressed', 'false');
    k.querySelector('.hero__videoknop__lbl').textContent = 'Film pauzeren';
    k.querySelector('svg').innerHTML = pauze;
    var script = document.getElementById('bresserYouTubeAPI');
    if (script) script.remove();
    apiGevraagd = false;
  }

  function maakSpeler() {
    if (!toegestaan() || speler || !window.YT || !window.YT.Player) return;
    var versie = ++generatie;
    speler = new YT.Player('heroYouTube', {
      host: 'https://www.youtube-nocookie.com', videoId: h.dataset.youtube,
      playerVars: { autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, rel: 0, iv_load_policy: 3, cc_load_policy: 0, playsinline: 1 },
      events: {
        onReady: function (e) {
          if (versie !== generatie || !toegestaan()) { try { e.target.destroy(); } catch (err) {} return; }
          klaar = true; e.target.seekTo(startTijd, true); e.target.playVideo(); k.hidden = false;
          timer = setInterval(function () {
            if (!toegestaan()) { stop(); return; }
            if (speler && speler.getCurrentTime() > einde) speler.seekTo(startTijd, true);
          }, 250);
        },
        onStateChange: function (e) {
          if (versie !== generatie || !toegestaan()) return;
          if (e.data === YT.PlayerState.PLAYING) {
            if (e.target.unloadModule) e.target.unloadModule('captions');
            h.classList.add('is-speelt');
          } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) h.classList.remove('is-speelt');
          if (e.data === YT.PlayerState.ENDED) { e.target.seekTo(startTijd, true); e.target.playVideo(); }
        }
      }
    });
  }

  function pasToe() {
    if (!toegestaan()) { stop(); return; }
    if (window.YT && window.YT.Player) { maakSpeler(); return; }
    if (apiGevraagd) return;
    apiGevraagd = true;
    var script = document.createElement('script');
    script.id = 'bresserYouTubeAPI'; script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  }

  window.onYouTubeIframeAPIReady = maakSpeler;
  document.addEventListener('bresser:consent', pasToe);
  mq.addEventListener('change', pasToe);
  k.addEventListener('click', function () {
    if (!toegestaan() || !klaar || !speler) return;
    gepauzeerd = !gepauzeerd;
    if (gepauzeerd) speler.pauseVideo(); else speler.playVideo();
    k.setAttribute('aria-pressed', gepauzeerd ? 'true' : 'false');
    k.querySelector('.hero__videoknop__lbl').textContent = gepauzeerd ? 'Film afspelen' : 'Film pauzeren';
    k.querySelector('svg').innerHTML = gepauzeerd ? speel : pauze;
  });
  if (document.readyState === 'complete') pasToe(); else addEventListener('load', pasToe, { once: true });
})();
