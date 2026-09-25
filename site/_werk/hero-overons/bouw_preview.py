#!/usr/bin/env python3
"""preview.html: de echte topbar + sprite uit site/index.html en de hero--pagina uit een gebouwde dienstpagina,
met de achtergrond uit de query: preview.html?img=/_werk/hero-overons/out/<id>-1920.webp&titel=Over%20ons
Zo zie je een kandidaat precies zoals hij op /over-de-kievit/ zou staan (veil, grain, gecentreerde titel)."""
import pathlib, re
SITE = pathlib.Path(__file__).resolve().parents[2]
s = (SITE / "index.html").read_text(encoding="utf-8")
i = s.index("<symbol"); a = s.rfind("<svg", 0, i); b = s.index("</svg>", s.rfind("</symbol>")) + 6
sprite = s[a:b]
topbar = re.search(r'<header class="topbar".*?</header>', s, re.S).group(0)
d = next(p for p in sorted(SITE.glob("*/index.html")) if 'hero hero--pagina' in p.read_text(encoding="utf-8"))
hero = re.search(r'<section class="hero hero--pagina".*?</section>', d.read_text(encoding="utf-8"), re.S).group(0)
hero = re.sub(r'<li><a href="/diensten/">Verhuizen</a></li>\s*<li>[^<]*</li>', '<li>Over ons</li>', hero)
hero = re.sub(r'<h1 class="hero__title" id="hero-titel">[^<]*</h1>', '<h1 class="hero__title" id="hero-titel">Over De Kievit Verhuizingen</h1>', hero)
hero = re.sub(r'\s*<p class="hero__sub">[^<]*</p>', '', hero)
html = f"""<!DOCTYPE html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hero-preview Over ons</title><link rel="stylesheet" href="/assets/css/style.css">
<style>body{{background:var(--creme)}}.topbar a{{pointer-events:none}}.na{{padding:1.2rem;font:600 .9rem/1.4 var(--font-kop);color:var(--ant-zacht)}}</style></head>
<body>{sprite}
{topbar}
{hero}
<p class="na" id="na"></p>
<script>
(function(){{var q=new URLSearchParams(location.search),img=q.get('img');if(!img)return;
 var pic=document.querySelector('picture.hero__bg'),src=pic.querySelector('source'),im=pic.querySelector('img');
 src.srcset=q.get('mobiel')||img; im.src=img; im.srcset=img+' 1920w'; im.alt='';
 if(q.get('titel'))document.getElementById('hero-titel').textContent=q.get('titel');
 document.getElementById('na').textContent='Preview van '+img.split('/').pop()+' in .hero--pagina; de titel staat gecentreerd over de veil.';
 document.getElementById('topbar').classList.add('is-stuck');document.getElementById('topbar').classList.remove('is-stuck');
}})();
</script></body></html>"""
out = SITE / "_werk/hero-overons/preview.html"; out.write_text(html, encoding="utf-8"); print(out, len(html), "bytes; hero uit", d)
