#!/usr/bin/env python3
"""Maakt hero-preview.html: de echte topbar, sprite en section.hero uit site/index.html (een-op-een), met
/assets/css/style.css, plus de offerte-overlay als teal balk zodat de overlap van .of-wrap klopt. De figuur
(img.hero__person) wordt client-side gezet uit de query: ?p1600=..&p900=..&w=..&h=..&hoogte=420&alt=..
Draai opnieuw zodra index.html verandert: python3 site/_werk/hero/build_preview.py"""
import pathlib, re

SITE = pathlib.Path(__file__).resolve().parents[2]
s = (SITE / "index.html").read_text(encoding="utf-8")

i = s.index("<symbol"); a = s.rfind("<svg", 0, i); b = s.index("</svg>", s.rfind("</symbol>")) + 6
sprite = s[a:b]
topbar = re.search(r'<header class="topbar".*?</header>', s, re.S).group(0)
hero = re.search(r'<section class="hero".*?</section>', s, re.S).group(0)

html = f"""<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hero-preview</title>
<link rel="stylesheet" href="/assets/css/style.css">
<style>
  body{{background:var(--creme)}}
  /* de offertebox als kale teal balk: zelfde .of-wrap-overlap als op de echte pagina (clamp(-104px,-7.5vw,-56px)) */
  .of-box{{height:104px;padding:0}}
  .topbar a{{pointer-events:none}}
</style>
</head>
<body>
{sprite}
{topbar}
{hero}
<section class="offerte-overlay" aria-hidden="true"><div class="of-wrap"><div class="of-box"></div></div></section>
<script>
(function(){{
  var q=new URLSearchParams(location.search), img=document.querySelector('.hero__person');
  if(q.get('p1600')){{
    var p1600=q.get('p1600'), p900=q.get('p900')||p1600;
    img.src=p1600; img.srcset=p900+' 900w, '+p1600+' 1600w';
    if(q.get('w')) img.width=q.get('w'); if(q.get('h')) img.height=q.get('h');
    if(q.get('alt')) img.alt=q.get('alt');
  }}
  // video-achtergrond voor de hero-video-keuze: ?video=/pad.mp4&webm=/pad.webm&poster=/pad.jpg vervangt picture.hero__bg
  if(q.get('video')){{
    var pic=document.querySelector('picture.hero__bg'), v=document.createElement('video');
    v.className='hero__bg'; v.autoplay=true; v.muted=true; v.loop=true; v.playsInline=true; v.setAttribute('aria-hidden','true');
    if(q.get('poster')) v.poster=q.get('poster');
    v.style.cssText='position:absolute;inset:0;z-index:-3;width:100%;height:100%;object-fit:cover;object-position:'+(q.get('pos')||'center')+';display:block';
    if(q.get('webm')){{ var s1=document.createElement('source'); s1.src=q.get('webm'); s1.type='video/webm'; v.appendChild(s1); }}
    var s2=document.createElement('source'); s2.src=q.get('video'); s2.type='video/mp4'; v.appendChild(s2);
    pic.replaceWith(v);
    if(q.get('figuur')==='0'){{ var p2=document.querySelector('picture.hero__pic'); if(p2) p2.remove(); }}
  }}
  function zet(px){{ if(px) img.style.height=px+'px'; else img.style.height=''; }}
  zet(q.get('hoogte'));
  window.addEventListener('message', function(e){{ if(e.data && e.data.type==='hoogte') zet(e.data.px); }});
}})();
</script>
</body>
</html>
"""
out = SITE / "_werk/hero/hero-preview.html"
out.write_text(html, encoding="utf-8")
print(out, len(html), "bytes; sprite", len(sprite), "topbar", len(topbar), "hero", len(hero))
