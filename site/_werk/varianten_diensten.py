#!/usr/bin/env python3
"""Vijf ontwerpvarianten van het dienstenblok (#diensten) van de homepage: vierkante hoeken en kleur,
in de lijn van topmovers.nl en de Kievit-huisstijl. Ter keuze; raakt index.html niet.

Leest de zes kaarten 1-op-1 uit site/index.html (copy, beeld en alt-teksten blijven gelijk), zet er per
variant eigen markup en CSS omheen en schrijft site/_werk/varianten-diensten.html (lokaal: laadt
/assets/css/style.css). Met --artifact <pad> ook een zelfstandige versie met css, fonts en beeld inline.

Draaien vanuit de repo-root:  python3 site/_werk/varianten_diensten.py [--artifact pad]
Bekijken:                     http://127.0.0.1:4740/_werk/varianten-diensten.html
Iconen: de Top Movers-diensticonen uit 2021 (topmovers/iconen/), omgezet naar currentColor.
"""
import base64, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'site'
html = (SITE / 'index.html').read_text()

# ---- kaarten en sectiekop uit index.html ----
sec = re.search(r'<section class="sectie ring" id="diensten".*?</section>', html, re.S).group(0)
kop = re.search(r'<div class="sectiekop sectiekop--midden" data-reveal>(.*?)</div>', sec, re.S).group(1)
wa = re.search(r'<div class="wa-rij" data-reveal>(.*?)</div>', sec, re.S).group(1)
symbol = re.search(r'<symbol id="i-wa".*?</symbol>', html, re.S).group(0)
kaarten = []
for a in re.findall(r'<article class="dienst"[^>]*>(.*?)</article>', sec, re.S):
    img = re.search(r'<img [^>]*>', a).group(0).replace('(min-width:901px) 332px', '(min-width:901px) 380px')
    kaarten.append({'img': img,
                    'h3': re.search(r'<h3>(.*?)</h3>', a).group(1),
                    'p': re.search(r'<p>(.*?)</p>', a).group(1)})
assert len(kaarten) == 6, len(kaarten)

# ---- Top Movers-iconen (2021-set, teal) naar currentColor ----
ICONEN = ['verhuisservice', 'in-uitpakken-1', 'handyman', 'opslag2', 'Facilitaire-diensten', 'projectmanagement']

def icoon(naam):
    s = (ROOT / 'topmovers/iconen' / f'2021-09_{naam}.svg').read_text()
    stijl = dict(re.findall(r'\.(st\d)\{([^}]*)\}', s))
    body = re.search(r'<svg[^>]*>(.*)</svg>', s, re.S).group(1)
    body = re.sub(r'<style.*?</style>', '', body, flags=re.S)
    def attrs(m):
        out = []
        for decl in stijl[m.group(1)].strip().strip(';').split(';'):
            k, v = (x.strip() for x in decl.split(':'))
            if v.upper() == '#00A19B': v = 'currentColor'
            out.append(f'{k}="{v}"')
        return ' '.join(out)
    body = re.sub(r'class="(st\d)"', attrs, body)
    body = re.sub(r'\s+', ' ', body).strip()
    return f'<svg viewBox="0 0 70.4 66.5" aria-hidden="true" focusable="false">{body}</svg>'

svgs = [icoon(n) for n in ICONEN]

# ---- varianten ----
def art(inner, extra=''):
    return f'<article class="dienst"{extra}>{inner}</article>'

def kaart_v1(k, i):
    return art(f'<div class="dienst__nis">{k["img"]}</div><div class="dienst__tekst"><span class="dienst__icoon">{svgs[i]}</span><h3>{k["h3"]}</h3><p>{k["p"]}</p></div>')

def kaart_v2(k, i):
    return art(f'<div class="dienst__nis">{k["img"]}<span class="dienst__nr">0{i+1}</span></div><div class="dienst__tekst"><h3>{k["h3"]}</h3><p>{k["p"]}</p></div>')

def kaart_v3(k, i):
    return art(f'<div class="dienst__nis"><div class="dienst__foto">{k["img"]}</div></div><div class="dienst__tekst"><span class="dienst__nr">0{i+1}</span><h3>{k["h3"]}</h3><p>{k["p"]}</p></div>')

def kaart_v4(k, i):
    return art(f'<div class="dienst__nis">{k["img"]}</div><div class="dienst__tekst"><h3>{k["h3"]}</h3><p>{k["p"]}</p></div>')

def kaart_v5(k, i):
    return art(f'<div class="dienst__nis">{k["img"]}</div><div class="dienst__tekst"><div class="dienst__kop"><span class="dienst__icoon">{svgs[i]}</span><h3>{k["h3"]}</h3></div><p>{k["p"]}</p></div>')

VARIANTEN = [
    ('v1', 'Top Movers-kaart', 'witte kaart, foto rand tot rand, teal icoonblok over de foto, teal onderrand; hover geel zoals de dienstkaarten op topmovers.nl', kaart_v1),
    ('v2', 'Teal panelen', 'tekstvlak in het donkere teal van de offertebox, witte tekst, geel nummerlabel op de foto; hover nog een tint donkerder', kaart_v2),
    ('v3', 'Kievit-wig', 'navy kaart met een schuine fotorand en teal lijn, zoals de wig op de Kievit-wagen; nummer in Zilla Slab, tekst lichtteal', kaart_v3),
    ('v4', 'Liggend op lichtteal', 'sectie op lichtteal, twee kolommen met de foto links en de tekst rechts, teal zijrand; hover oranje', kaart_v4),
    ('v5', 'Navy sectie', 'hele sectie navy zoals het opslagblok, witte kaarten met een bovenrand in teal, oranje en geel om de beurt, icoon naast de kop', kaart_v5),
]

CSS = r"""
/* ---- preview-chrome (hoort niet bij het ontwerp) ---- */
.vnav{position:sticky;top:0;z-index:50;background:#1D1D1B;color:#fff;display:flex;gap:.6rem;align-items:center;padding:.6rem var(--pad);font:600 .82rem/1.3 var(--font-kop);flex-wrap:wrap}
.vnav b{margin-right:.4rem;font-weight:700}
.vnav a{color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.4);padding:.32rem .65rem}
.vnav a:hover{background:#fff;color:#1D1D1B}
.vlabel{background:#E9E7DF;border-top:1px solid #D8D5CA;border-bottom:1px solid #D8D5CA;padding:.9rem var(--pad);font:400 .95rem/1.45 var(--font-tekst);color:#1D1D1B;scroll-margin-top:3.4rem}
.vlabel strong{font-family:var(--font-titel);margin-right:.5rem}
.vlabel span{color:#4B4B49}

/* ---- gemeenschappelijk: vierkant, foto rand tot rand ---- */
.dv{--r:0}
.dv .dienst{border-radius:0;border:0;box-shadow:none}
.dv .dienst__nis{border-radius:0;margin:0;height:auto;aspect-ratio:760/435}
.dv .dienst__tekst{padding:1.3rem 1.5rem 1.6rem}
.dv .dienst h3{font-size:1.3rem}
.dv .dienst__icoon{display:inline-grid;place-items:center;flex:none}
.dv .dienst__icoon svg{width:58%;height:58%}

/* ---- v1 Top Movers-kaart ---- */
.v1 .dienst{background:var(--wit);border-bottom:4px solid var(--goud);transition:transform .2s,box-shadow .2s,background .2s}
.v1 .dienst:hover{background:#E8C45C;border-bottom-color:var(--ant);box-shadow:var(--schaduw-kaart)}
.v1 .dienst__tekst{padding-top:0}
.v1 .dienst__icoon{width:58px;height:58px;background:var(--goud);color:var(--wit);margin:-29px 0 .8rem;position:relative}

/* ---- v2 Teal panelen ---- */
.v2 .dienst{background:var(--teal-paneel);color:var(--wit);transition:transform .2s,background .2s}
.v2 .dienst:hover{background:var(--goud-diep)}
.v2 .dienst h3,.v2 .dienst p{color:var(--wit)}
.v2 .dienst__nr{position:absolute;left:0;bottom:0;background:#FFD500;color:var(--ant);font:700 1.25rem/1 var(--font-display);padding:.6rem .85rem;letter-spacing:.04em}

/* ---- v3 Kievit-wig ---- */
.v3 .dienst{background:var(--bruin);color:var(--wit)}
.v3 .dienst__nis{background:var(--goud);aspect-ratio:760/470;clip-path:polygon(0 0,100% 0,100% 84%,0 100%)}
.v3 .dienst__foto{position:absolute;inset:0 0 10px 0;overflow:hidden;clip-path:polygon(0 0,100% 0,100% 84%,0 100%)}
.v3 .dienst h3{color:var(--wit)}
.v3 .dienst p{color:var(--zand)}
.v3 .dienst__nr{display:block;font:700 1.05rem/1 var(--font-display);color:var(--teal-op-navy);letter-spacing:.14em;margin:0 0 .55rem}
.v3 .dienst__tekst{padding-top:1rem}

/* ---- v4 Liggend op lichtteal ---- */
.v4{background:var(--creme-2)}
.v4 .diensten{grid-template-columns:1fr 1fr;gap:1.2rem}
.v4 .dienst{display:grid;grid-template-columns:minmax(0,42%) minmax(0,1fr);background:var(--wit);border-left:6px solid var(--goud)}
.v4 .dienst:hover{border-left-color:var(--oranje)}
.v4 .dienst__nis{aspect-ratio:auto;min-height:230px}
.v4 .dienst h3{color:var(--goud-diep)}
.v4 .dienst__tekst{padding:1.4rem 1.5rem 1.5rem;align-self:center}
@media(max-width:1000px){.v4 .diensten{grid-template-columns:1fr}}
@media(max-width:600px){.v4 .dienst{grid-template-columns:1fr}.v4 .dienst__nis{aspect-ratio:760/435;min-height:0}}

/* ---- v5 Navy sectie ---- */
.v5{background:var(--bruin)}
.v5.ring::before{border-color:rgba(255,255,255,.14)}
.v5 .label{color:var(--teal-op-navy)}
.v5 .label::before{background:var(--teal-op-navy)}
.v5 .kop{color:var(--wit)}
.v5 .intro{color:var(--zand)}
.v5 .dienst{background:var(--wit);border-top:5px solid var(--goud)}
.v5 .dienst:nth-child(3n+2){border-top-color:var(--oranje)}
.v5 .dienst:nth-child(3n){border-top-color:#FFD500}
.v5 .dienst:hover{box-shadow:0 0 0 3px var(--teal-op-navy)}
.v5 .dienst__kop{display:flex;align-items:center;gap:.8rem;margin-bottom:.55rem}
.v5 .dienst__kop h3{margin:0}
.v5 .dienst__icoon{width:46px;height:46px;background:var(--goud-licht);color:var(--goud-diep)}
"""

def sectie(vid, naam, oms, kaart):
    n = vid[1]
    cards = '\n      '.join(kaart(k, i) for i, k in enumerate(kaarten))
    return f'''<div class="vlabel" id="{vid}"><strong>Variant {n}</strong> {naam} <span>{oms}</span></div>
<section class="sectie ring dv {vid}" id="diensten-{vid}" aria-labelledby="diensten-kop-{vid}">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden">{kop.replace('id="diensten-kop"', f'id="diensten-kop-{vid}"')}</div>
    <div class="diensten">
      {cards}
    </div>
    <div class="wa-rij">{wa}</div>
  </div>
</section>
'''

nav = ' '.join(f'<a href="#{vid}">{vid[1]} {naam}</a>' for vid, naam, _, _ in VARIANTEN)
body = f'''<svg style="display:none" aria-hidden="true">{symbol}</svg>
<nav class="vnav"><b>Dienstenblok, 5 varianten (preview, niet de site)</b>{nav}</nav>
<main>
{''.join(sectie(*v) for v in VARIANTEN)}</main>
'''

def pagina(css_tag):
    return f'''<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dienstenblok De Kievit</title>
<meta name="robots" content="noindex">
{css_tag}
<style>{CSS}</style>
</head>
<body>
{body}</body>
</html>
'''

uit = SITE / '_werk/varianten-diensten.html'
uit.write_text(pagina('<link rel="stylesheet" href="/assets/css/style.css?v=varianten">'))
print('geschreven', uit.relative_to(ROOT), len(kaarten), 'kaarten x', len(VARIANTEN), 'varianten')

if '--artifact' in sys.argv:
    doel = Path(sys.argv[sys.argv.index('--artifact') + 1])
    def data_uri(p, mime):
        return f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode()
    css = (SITE / 'assets/css/style.css').read_text()
    css = re.sub(r'url\(\.\./fonts/([^)]+)\)', lambda m: f'url({data_uri(SITE / "assets/fonts" / m.group(1), "font/woff2")})', css)
    page = f'<title>Dienstenblok De Kievit</title>\n<style>{css}</style>\n<style>{CSS}</style>\n{body}'
    def img_inline(m):
        tag = m.group(0)
        src = re.search(r'src="(/assets/img/[^"]+)"', tag).group(1)
        tag = re.sub(r' srcset="[^"]*"', '', tag)
        tag = re.sub(r' sizes="[^"]*"', '', tag)
        return tag.replace(f'src="{src}"', f'src="{data_uri(SITE / src.lstrip("/"), "image/webp")}"')
    page = re.sub(r'<img [^>]*>', img_inline, page)
    doel.write_text(page)
    print('artifact', doel, round(len(page) / 1024), 'kB')
