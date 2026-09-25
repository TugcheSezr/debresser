#!/usr/bin/env python3
"""Geometrische artifacts in de Top Movers-kleuren, als losse SVG's in site/assets/img/deco/.
De dunne boog en de ringen komen overeen met de vormen die al in de pagina zitten (.ring::before,
.ringen__ring en .ringen__cirkel), zodat ze los te plaatsen zijn. Draaien vanuit de repo-root."""
import math
from pathlib import Path

D = Path('site/assets/img/deco')
TEAL, NAVY, ZAND, LICHT, GEEL, WIT = '#00A19B', '#22314E', '#C4E4E4', '#E5F3F3', '#FFD500', '#FFFFFF'

def svg(naam, vb, body):
    (D / naam).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{body}</svg>')
    return naam

def boog(r, van, tot, cx=0, cy=0):
    """pad voor een cirkelboog van hoek `van` tot `tot` (graden, 0 = rechts, met de klok mee)"""
    x1, y1 = cx + r * math.cos(math.radians(van)), cy + r * math.sin(math.radians(van))
    x2, y2 = cx + r * math.cos(math.radians(tot)), cy + r * math.sin(math.radians(tot))
    groot = 1 if (tot - van) % 360 > 180 else 0
    return f'M{x1:.1f} {y1:.1f} A{r} {r} 0 {groot} 1 {x2:.1f} {y2:.1f}'

gemaakt = []
for kleur, staart in ((TEAL, ''), (WIT, '-wit')):
    # dunne kwartboog, zoals de lijn rechtsboven in de dienstensectie
    gemaakt.append(svg(f'boog-dun{staart}.svg', '0 0 400 400',
        f'<path d="{boog(190, 180, 270, 200, 200)}" fill="none" stroke="{kleur}" stroke-width="2" stroke-linecap="round"/>'))
    # dunne hele cirkel
    gemaakt.append(svg(f'cirkel-lijn{staart}.svg', '0 0 400 400',
        f'<circle cx="200" cy="200" r="192" fill="none" stroke="{kleur}" stroke-width="2"/>'))
    # dubbele ring, zoals achter de figuur in het Top Movers-blok
    gemaakt.append(svg(f'ring-dubbel{staart}.svg', '0 0 400 400',
        f'<circle cx="200" cy="200" r="176" fill="none" stroke="{kleur}" stroke-width="4"/>'
        f'<circle cx="200" cy="200" r="196" fill="none" stroke="{kleur}" stroke-width="1.5" opacity=".55"/>'))

gemaakt.append(svg('cirkel-vlak.svg', '0 0 400 400', f'<circle cx="200" cy="200" r="200" fill="{NAVY}"/>'))
gemaakt.append(svg('cirkel-vlak-teal.svg', '0 0 400 400', f'<circle cx="200" cy="200" r="200" fill="{TEAL}"/>'))
gemaakt.append(svg('halve-cirkel.svg', '0 0 400 200', f'<path d="M0 200 A200 200 0 0 1 400 200 Z" fill="{ZAND}"/>'))
gemaakt.append(svg('boog-dik.svg', '0 0 400 400',
    f'<path d="{boog(170, 150, 300, 200, 200)}" fill="none" stroke="{TEAL}" stroke-width="26" stroke-linecap="round"/>'))
gemaakt.append(svg('strepen.svg', '0 0 300 300',
    ''.join(f'<line x1="{-300 + i*26}" y1="300" x2="{i*26}" y2="0" stroke="{TEAL}" stroke-width="7" opacity=".45"/>' for i in range(24))))
gemaakt.append(svg('stippen.svg', '0 0 300 300',
    ''.join(f'<circle cx="{18 + x*33}" cy="{18 + y*33}" r="4.5" fill="{TEAL}"/>' for x in range(9) for y in range(9))))
gemaakt.append(svg('driehoek.svg', '0 0 340 300',
    f'<path d="M170 14 L326 286 H14 Z" fill="none" stroke="{TEAL}" stroke-width="8" stroke-linejoin="round"/>'))
gemaakt.append(svg('vierkant-gedraaid.svg', '0 0 400 400',
    f'<rect x="70" y="70" width="260" height="260" rx="46" fill="{ZAND}" transform="rotate(12 200 200)"/>'
    f'<rect x="52" y="52" width="296" height="296" rx="60" fill="none" stroke="{TEAL}" stroke-width="3" opacity=".6" transform="rotate(12 200 200)"/>'))
gemaakt.append(svg('golf.svg', '0 0 600 160',
    f'<path d="M10 110 C 110 20, 210 20, 300 80 S 490 140, 590 50" fill="none" stroke="{TEAL}" stroke-width="5" stroke-linecap="round"/>'))
gemaakt.append(svg('kruisjes.svg', '0 0 300 300',
    ''.join(f'<path d="M{22+x*52} {12+y*52} v20 M{12+x*52} {22+y*52} h20" stroke="{TEAL}" stroke-width="3" stroke-linecap="round"/>' for x in range(6) for y in range(6))))
gemaakt.append(svg('rooster.svg', '0 0 300 300',
    ''.join(f'<line x1="{i*50}" y1="0" x2="{i*50}" y2="300" stroke="{TEAL}" stroke-width="1.5" opacity=".5"/>'
            f'<line x1="0" y1="{i*50}" x2="300" y2="{i*50}" stroke="{TEAL}" stroke-width="1.5" opacity=".5"/>' for i in range(7))))
gemaakt.append(svg('kwart-vlak.svg', '0 0 300 300', f'<path d="M300 0 A300 300 0 0 1 0 300 H0 V0 Z" fill="{LICHT}"/>'))
gemaakt.append(svg('stip-groot.svg', '0 0 200 200', f'<circle cx="100" cy="100" r="100" fill="{GEEL}"/>'))
print(f'{len(gemaakt)} geometrische artifacts:', ', '.join(gemaakt))
