#!/usr/bin/env python3
"""Schrijft site/_werk/deco-render.html met de drie stempels (Top Movers, De Kievit, Erkende Verhuizer) als
inline svg met tekst-op-cirkel in de sitefonts. Daarna renderen met transparante achtergrond:
  node site/_werk/shoot_el.mjs http://127.0.0.1:4740/_werk/deco-render.html 2 "#s-topmovers=uit.png" ...
en met PIL naar webp in site/assets/img/deco/. Draaien vanuit de repo-root."""
import re
from pathlib import Path
D=Path('site/assets/img/deco')
def inner(f):
    s=Path(f).read_text(); return re.search(r'<svg[^>]*>(.*)</svg>', s, re.S).group(1), re.search(r'viewBox="([^"]+)"', s).group(1)
tm,tmvb=inner('site/assets/img/logo-topmovers.svg')
vogel,vvb=inner(D/'kievit-vogel-wit.svg'); katrol,kvb=inner(D/'katrol.svg')
def stempel(id_, schijf, ring, tekstkleur, tekst, midden, fs=15, ls=2.6):
    return f'''<svg id="{id_}" class="seal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <defs><path id="{id_}-p" d="M150,150 m-133,0 a133,133 0 1,1 266,0 a133,133 0 1,1 -266,0"/></defs>
  <circle cx="150" cy="150" r="148" fill="{schijf}"/>
  <circle cx="150" cy="150" r="146" fill="none" stroke="{ring}" stroke-width="3"/>
  <circle cx="150" cy="150" r="118" fill="none" stroke="{ring}" stroke-width="1.5"/>
  <text font-family="Poppins,Arial,sans-serif" font-weight="700" font-size="{fs}" letter-spacing="{ls}" fill="{tekstkleur}"><textPath href="#{id_}-p" startOffset="0">{tekst}</textPath></text>
  {midden}
</svg>'''
s11=stempel('s-topmovers','#FFFFFF','#00A19B','#006C68','AANGESLOTEN BIJ TOP MOVERS &#8226; ERKENDE VERHUISBEDRIJVEN &#8226;', f'<svg x="62" y="108" width="176" height="84" viewBox="{tmvb}">{tm}</svg>')
s12=stempel('s-kievit','#22314E','#32B3AF','#FFFFFF','DE KIEVIT VERHUIZINGEN &#8226; VENLO &#8226; SINDS 1910 &#8226;', f'<svg x="80" y="92" width="140" height="74" viewBox="{vvb}">{vogel}</svg><text x="150" y="196" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-weight="700" font-size="20" letter-spacing="3" fill="#FFFFFF">DE KIEVIT</text>', fs=15.5, ls=3.4)
s15=stempel('s-erkend','#FFFFFF','#323286','#323286','ERKENDE VERHUIZER &#8226; GARANTIECERTIFICAAT &#8226; VERZEKERDE INBOEDEL &#8226;', f'<svg x="100" y="86" width="100" height="128" viewBox="{kvb}">{katrol}</svg>', fs=14, ls=2.2)
html=f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><link rel="stylesheet" href="/assets/css/style.css?v=deco"><style>body{{background:transparent;margin:0;padding:20px;display:flex;gap:40px;flex-wrap:wrap}}.seal{{display:block}}</style></head><body>{s11}{s12}{s15}</body></html>'''
Path('site/_werk/deco-render.html').write_text(html); print('deco-render.html geschreven')
