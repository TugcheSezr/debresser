#!/usr/bin/env python3
"""Schrijft de tweede lichting artifacts naar site/assets/img/deco/ (28-08-2026, avondsessie):
het Top Movers-logo en -beeldmerk los (kleur, wit, navy, teal), iconen in de stijl van sleutel/steekwagen
(plat, teal #00A19B, accenten geel #FFD500 en zwart #1D1D1B) en handgetekende deco (krul-pijl,
onderstreping, ovaal-kader, sparkles). Dozen zonder plakband (BEELDREGELS 1). Daarna:
  python3 site/_werk/deco_lijst.py   (palet van de plaatser bijwerken)
Draaien vanuit de repo-root."""
import math
from pathlib import Path

D = Path('site/assets/img/deco')
IMG = Path('site/assets/img')
TEAL, DTEAL, GEEL, ZWART, WIT, LTEAL, NAVY = '#00A19B', '#006C68', '#FFD500', '#1D1D1B', '#FFFFFF', '#C4E4E4', '#22314E'


def svg(vb, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{body}</svg>'


def ster(cx, cy, r):
    """Vijfpuntige ster, punt omhoog."""
    pts = []
    for i in range(10):
        rad = r if i % 2 == 0 else r * 0.42
        a = math.radians(-90 + i * 36)
        pts.append(f'{cx + rad * math.cos(a):.1f},{cy + rad * math.sin(a):.1f}')
    return ' '.join(pts)


def hexagon(cx, cy, r):
    return ' '.join(f'{cx + r * math.cos(math.radians(60 * k - 30)):.1f},{cy + r * math.sin(math.radians(60 * k - 30)):.1f}' for k in range(6))


def sparkle(cx, cy, r):
    return f'M{cx} {cy - r}Q{cx} {cy} {cx + r} {cy}Q{cx} {cy} {cx} {cy + r}Q{cx} {cy} {cx - r} {cy}Q{cx} {cy} {cx} {cy - r}Z'


def aanhalingstekens(k):
    teken = f'<circle cx="22" cy="46" r="14" fill="{k}"/><path d="M8 46V34C8 20 19 8 34 8v10c-8 0-14 6-14 14v2z" fill="{k}"/>'
    return svg('0 0 100 64', teken + f'<g transform="translate(44 0)">{teken}</g>')


def ovaal(k):
    # losse ellips met een tweede, overlappende streek linksboven, zoals een omcirkeling met de hand
    return svg('0 0 300 120', f'<path d="M30 60C30 12 270 12 270 60C270 108 30 110 30 64C30 34 70 20 130 20" fill="none" stroke="{k}" stroke-width="6" stroke-linecap="round"/>')


def krul_pijl(k):
    return svg('0 0 160 120', f'<path d="M10 100C40 20 100 20 140 60" fill="none" stroke="{k}" stroke-width="6" stroke-linecap="round"/><path d="M118 52L142 62L134 82" fill="none" stroke="{k}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')


def onderstreping(k):
    return svg('0 0 300 40', f'<path d="M6 22C60 10 120 30 180 18S260 10 294 20" fill="none" stroke="{k}" stroke-width="14" stroke-linecap="round" opacity=".9"/>')


def sparkles(k):
    return svg('0 0 100 100', f'<path d="{sparkle(40, 50, 30)}{sparkle(78, 26, 12)}{sparkle(76, 78, 10)}" fill="{k}"/>')


def zigzag(k):
    return svg('0 0 300 60', f'<polyline points="5,50 45,10 85,50 125,10 165,50 205,10 245,50 285,10" fill="none" stroke="{k}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')


def boog_gestippeld(k):
    return svg('0 0 400 400', f'<path d="M10 200A190 190 0 0 1 200 10" fill="none" stroke="{k}" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 16"/>')


def vinkje_cirkel(schijf, vink):
    return svg('0 0 80 80', f'<circle cx="40" cy="40" r="38" fill="{schijf}"/><path d="M24 41l10 10 22-22" fill="none" stroke="{vink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>')


def pin(k, stip):
    return svg('0 0 60 80', f'<path d="M30 4a24 24 0 0 1 24 24c0 18-24 48-24 48S6 46 6 28A24 24 0 0 1 30 4z" fill="{k}"/><circle cx="30" cy="28" r="9" fill="{stip}"/>')


def chat_ballon(k, stip):
    return svg('0 0 90 80', f'<path d="M12 8h66a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H40L20 76V60h-8a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8z" fill="{k}"/>' + ''.join(f'<circle cx="{x}" cy="34" r="5" fill="{stip}"/>' for x in (30, 45, 60)))


# een verhuisdoos in vooraanzicht: deksel als donkere band (de vier ingevouwen flappen), handvatgat, geen tape
def doos(x, y, b, h, gat=True):
    s = f'<rect x="{x}" y="{y}" width="{b}" height="{h}" fill="{TEAL}"/><rect x="{x}" y="{y}" width="{b}" height="{max(5, round(h * 0.18))}" fill="{DTEAL}"/>'
    if gat:
        s += f'<rect x="{x + b / 2 - 7:.0f}" y="{y + h * 0.45:.0f}" width="14" height="5" rx="2.5" fill="{WIT}"/>'
    return s


BESTANDEN = {
    # iconen
    'checklist.svg': svg('0 0 70 84', f'<rect x="8" y="10" width="54" height="70" rx="5" fill="{TEAL}"/><rect x="14" y="20" width="42" height="54" rx="2" fill="{WIT}"/><rect x="24" y="4" width="22" height="12" rx="3" fill="{ZWART}"/>'
                         + ''.join(f'<path d="M19 {y}l3 3 6-6" fill="none" stroke="{TEAL}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="32" y="{y - 3}" width="18" height="4" rx="2" fill="{LTEAL}"/>' for y in (33, 47, 61))),
    'dozenstapel.svg': svg('0 0 90 84', doos(4, 46, 52, 36) + doos(58, 58, 28, 24, gat=False) + doos(14, 14, 36, 30)),
    'doos-open.svg': svg('0 0 90 80', f'<rect x="27" y="22" width="36" height="16" fill="{LTEAL}"/><path d="M15 36L4 16l12-4 11 24z" fill="{DTEAL}"/><path d="M75 36l11-20-12-4-11 24z" fill="{DTEAL}"/><rect x="15" y="36" width="60" height="40" fill="{TEAL}"/><rect x="15" y="36" width="60" height="8" fill="{DTEAL}"/><rect x="38" y="54" width="14" height="5" rx="2.5" fill="{WIT}"/>'),
    'schild-vinkje.svg': svg('0 0 70 80', f'<path d="M35 4l29 10v24c0 20-14 32-29 38C20 70 6 58 6 38V14z" fill="{TEAL}"/><path d="M22 40l9 9 18-18" fill="none" stroke="{WIT}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'),
    'vinkje-cirkel.svg': vinkje_cirkel(TEAL, WIT),
    'vinkje-cirkel-geel.svg': vinkje_cirkel(GEEL, ZWART),
    'klok.svg': svg('0 0 80 80', f'<circle cx="40" cy="40" r="38" fill="{TEAL}"/><circle cx="40" cy="40" r="29" fill="{WIT}"/><path d="M40 20v20h14" fill="none" stroke="{ZWART}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="40" cy="40" r="4" fill="{GEEL}"/>'),
    'pin.svg': pin(TEAL, WIT),
    'pin-geel.svg': pin(GEEL, ZWART),
    'telefoon.svg': svg('0 0 24 24', f'<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="{TEAL}"/>'),
    'chat-ballon.svg': chat_ballon(TEAL, WIT),
    'chat-ballon-geel.svg': chat_ballon(GEEL, ZWART),
    'envelop.svg': svg('0 0 90 66', f'<rect x="4" y="6" width="82" height="54" rx="6" fill="{TEAL}"/><path d="M4 12l41 28 41-28" fill="none" stroke="{WIT}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'),
    'aanhalingstekens.svg': aanhalingstekens(TEAL),
    'aanhalingstekens-wit.svg': aanhalingstekens(WIT),
    'aanhalingstekens-geel.svg': aanhalingstekens(GEEL),
    'vijf-sterren.svg': svg('0 0 200 40', ''.join(f'<polygon points="{ster(cx, 20, 18)}" fill="{GEEL}"/>' for cx in (20, 60, 100, 140, 180))),
    'ster-geel.svg': svg('0 0 80 80', f'<polygon points="{ster(40, 42, 38)}" fill="{GEEL}"/>'),
    'hart-huis.svg': svg('0 0 90 84', f'<path d="M45 6l39 34h-9v40H15V40H6z" fill="{TEAL}"/><path d="M45 70c-9-7-18-14-18-23a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 9-9 16-18 23z" fill="{GEEL}"/>'),
    'prijskaartje.svg': svg('0 0 90 80', f'<path d="M4 40L32 12h46a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H32z" fill="{TEAL}"/><circle cx="26" cy="40" r="5" fill="{WIT}"/><path d="M68 30a12 12 0 1 0 0 20M46 36h18M46 44h18" fill="none" stroke="{WIT}" stroke-width="5" stroke-linecap="round"/>'),
    'lamp.svg': svg('0 0 70 90', f'<circle cx="35" cy="53" r="8" fill="{GEEL}"/><path d="M35 6l27 40H8z" fill="{TEAL}"/><rect x="32" y="46" width="6" height="28" fill="{ZWART}"/><rect x="18" y="72" width="34" height="8" rx="4" fill="{ZWART}"/>'),
    'duim.svg': svg('0 0 24 24', f'<path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="{TEAL}"/>'),
    'medaille.svg': svg('0 0 70 90', f'<path d="M20 2h12l-2 40H20z" fill="{DTEAL}"/><path d="M38 2h12v40H40z" fill="{DTEAL}"/><circle cx="35" cy="62" r="25" fill="{GEEL}"/><circle cx="35" cy="62" r="18" fill="none" stroke="{ZWART}" stroke-width="3"/><polygon points="{ster(35, 63, 10)}" fill="{ZWART}"/>'),
    'trap.svg': svg('0 0 90 80', f'<path d="M6 76V58h18V40h18V22h18V4h24v72z" fill="{TEAL}"/>'),
    'hangslot.svg': svg('0 0 70 84', f'<path d="M20 38V26a15 15 0 0 1 30 0v12" fill="none" stroke="{TEAL}" stroke-width="7" stroke-linecap="round"/><rect x="10" y="36" width="50" height="44" rx="6" fill="{TEAL}"/><circle cx="35" cy="54" r="5" fill="{WIT}"/><rect x="32.5" y="54" width="5" height="12" rx="2" fill="{WIT}"/>'),
    # handgetekende deco
    'krul-pijl.svg': krul_pijl(GEEL),
    'krul-pijl-teal.svg': krul_pijl(TEAL),
    'onderstreping.svg': onderstreping(GEEL),
    'onderstreping-teal.svg': onderstreping(TEAL),
    'sparkles.svg': sparkles(GEEL),
    'sparkles-teal.svg': sparkles(TEAL),
    'ovaal-kader.svg': ovaal(TEAL),
    'ovaal-kader-geel.svg': ovaal(GEEL),
    'ovaal-kader-wit.svg': ovaal(WIT),
    'boog-gestippeld.svg': boog_gestippeld(TEAL),
    'boog-gestippeld-wit.svg': boog_gestippeld(WIT),
    'zigzag.svg': zigzag(TEAL),
    'zigzag-geel.svg': zigzag(GEEL),
    'honingraat-klein.svg': svg('0 0 160 150', f'<polygon points="{hexagon(80, 105, 38)}" fill="{GEEL}"/>' + ''.join(f'<polygon points="{hexagon(cx, cy, 38)}" fill="none" stroke="{TEAL}" stroke-width="5" stroke-linejoin="round"/>' for cx, cy in ((45, 45), (115, 45), (80, 105)))),
}

# Top Movers-logo en -beeldmerk los, uit de gevectoriseerde bron in assets/img (zwart #000000 + teal #009FB4)
logo = (IMG / 'logo-topmovers.svg').read_text()
mark = (IMG / 'mark.svg').read_text()
BESTANDEN.update({
    'logo-topmovers.svg': logo,
    'logo-topmovers-wit.svg': (IMG / 'logo-topmovers-wit.svg').read_text(),
    'logo-topmovers-navy.svg': logo.replace('#000000', NAVY),
    'logo-topmovers-teal.svg': logo.replace('#000000', TEAL).replace('#009FB4', TEAL),
    'beeldmerk-topmovers.svg': mark,
    'beeldmerk-topmovers-wit.svg': mark.replace(TEAL, WIT),
    'beeldmerk-topmovers-navy.svg': mark.replace(TEAL, NAVY),
})

for naam, inhoud in BESTANDEN.items():
    (D / naam).write_text(inhoud)
print(f'{len(BESTANDEN)} artifacts geschreven naar {D}')
