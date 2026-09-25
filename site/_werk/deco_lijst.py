#!/usr/bin/env python3
"""Schrijft site/_werk/deco-lijst.json: het palet van de plaatser (_werk/plaatser.html).
Scant site/assets/img/deco/, in de volgorde van LABELS (De Bresser-logo eerst), onbekende bestanden achteraan.
De set komt uit ~/debresser-versies-20260925/_artifacts-debresser/_bouw/plaatser_deco.py (25-09-2026).
Draaien vanuit de repo-root na het toevoegen van een artifact: python3 site/_werk/deco_lijst.py"""
import json, re
from pathlib import Path
from PIL import Image

D = Path('site/assets/img/deco')
LABELS = {
    # De Bresser-logo, getraceerd uit het originele logo
    'beeldmerk-debresser': 'De Bresser-beeldmerk', 'beeldmerk-debresser-wit': 'De Bresser-beeldmerk wit',
    'kroon-sinds-1923': 'Kroon Sinds 1923', 'kroon-sinds-1923-wit': 'Kroon Sinds 1923 wit',
    # Top Movers, in De Bresser-kleuren
    'lockup-debresser-topmovers': 'Lockup De Bresser + Top Movers', 'lockup-debresser-topmovers-wit': 'Lockup wit',
    'stempel-topmovers': 'Stempel Top Movers', 'ster-sinds-1923': 'Ster Sinds 1923 met bij',
    'ster-zonder-zorgen': 'Ster Zonder zorgen met bij',
    'logo-topmovers': 'Top Movers-logo kleur', 'logo-topmovers-wit': 'Top Movers-logo wit',
    'logo-topmovers-navy': 'Top Movers-logo navy', 'logo-topmovers-blauw': 'Top Movers-logo blauw',
    'beeldmerk-topmovers': 'Top Movers-beeldmerk blauw', 'beeldmerk-topmovers-wit': 'Top Movers-beeldmerk wit',
    'beeldmerk-topmovers-navy': 'Top Movers-beeldmerk navy',
    'bij': 'Bij', 'bij-vlucht': 'Bij met vluchtlijn', 'pijlpunt': 'Top Movers-pijlpunt', 'honingraat': 'Honingraat',
    'honingraat-klein': 'Honingraat klein', 'dozenstapel': 'Dozenstapel',
    'verhuiswagen': 'Verhuiswagen', 'verhuisdoos': 'Verhuisdoos', 'verhuislift': 'Verhuislift', 'opslag': 'Inboedelopslag',
    'montage': 'Montage', 'kunst': 'Kunst verhuizen', 'zakelijk': 'Zakelijk', 'internationaal': 'Internationaal',
    # Erkende Verhuizers, eigen kleuren
    'stempel-erkend': 'Stempel Erkende Verhuizer', 'katrol': 'Katrol',
    # vormen en iconen van de Kievit-site, omgekleurd naar De Bresser
    'boog-dun': 'Boog dun', 'boog-dun-wit': 'Boog dun wit', 'cirkel-lijn': 'Cirkel lijn', 'cirkel-lijn-wit': 'Cirkel lijn wit',
    'ring-dubbel': 'Ring dubbel', 'ring-dubbel-wit': 'Ring dubbel wit', 'cirkel-vlak': 'Cirkel navy',
    'cirkel-vlak-blauw': 'Cirkel blauw', 'halve-cirkel': 'Halve cirkel', 'boog-dik': 'Boog dik', 'strepen': 'Strepen',
    'stippen': 'Stippen', 'driehoek': 'Driehoek', 'vierkant-gedraaid': 'Vierkant gedraaid', 'golf': 'Golf',
    'kruisjes': 'Kruisjes', 'rooster': 'Rooster', 'kwart-vlak': 'Kwart vlak', 'stip-groot': 'Stip groen',
    'boog-gestippeld': 'Boog gestippeld', 'boog-gestippeld-wit': 'Boog gestippeld wit',
    'zigzag': 'Zigzag blauw', 'zigzag-groen': 'Zigzag groen',
    'ovaal-kader': 'Ovaal-kader blauw', 'ovaal-kader-groen': 'Ovaal-kader groen', 'ovaal-kader-wit': 'Ovaal-kader wit',
    'krul-pijl': 'Krul-pijl blauw', 'krul-pijl-groen': 'Krul-pijl groen', 'onderstreping': 'Onderstreping blauw',
    'onderstreping-groen': 'Onderstreping groen', 'sparkles': 'Sparkles blauw', 'sparkles-groen': 'Sparkles groen',
    'route': 'Route van A naar B', 'verhuisdatum': 'Verhuisdatum', 'sleutel': 'Sleuteloverdracht',
    'steekwagen': 'Steekwagen', 'huis-pijl': 'Van huis naar huis', 'pijl-weg': 'Weg-pijl',
    'checklist': 'Checklist', 'doos-open': 'Doos open', 'schild-vinkje': 'Schild verzekerd',
    'vinkje-cirkel': 'Vinkje blauw', 'vinkje-cirkel-groen': 'Vinkje groen', 'klok': 'Klok', 'pin': 'Locatie-pin',
    'pin-groen': 'Locatie-pin groen', 'telefoon': 'Telefoon', 'chat-ballon': 'Chat-ballon',
    'chat-ballon-groen': 'Chat-ballon groen', 'envelop': 'Envelop', 'aanhalingstekens': 'Aanhalingstekens',
    'aanhalingstekens-wit': 'Aanhalingstekens wit', 'aanhalingstekens-groen': 'Aanhalingstekens groen',
    'vijf-sterren': 'Vijf sterren', 'ster-geel': 'Ster geel', 'hart-huis': 'Huis met hart', 'prijskaartje': 'Prijskaartje',
    'lamp': 'Lamp', 'duim': 'Duim omhoog', 'medaille': 'Medaille', 'trap': 'Trap', 'hangslot': 'Hangslot',
}
VOLGORDE = list(LABELS)

def maat(p):
    if p.suffix == '.svg':
        vb = re.search(r'viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"', p.read_text())
        if vb: return float(vb.group(3)), float(vb.group(4))
        return 100.0, 100.0
    with Image.open(p) as im: return float(im.width), float(im.height)

items = []
for p in sorted(D.iterdir(), key=lambda p: (VOLGORDE.index(p.stem) if p.stem in LABELS else len(VOLGORDE), p.name)):
    if p.suffix not in ('.svg', '.webp'): continue
    b, h = maat(p)
    items.append({'soort': 'img', 'naam': LABELS.get(p.stem, p.stem), 'bestand': p.name,
                  'b': round(b), 'h': round(h), 'breed': 160 if b >= h else round(160 * b / h)})

Path('site/_werk/deco-lijst.json').write_text(json.dumps(items, ensure_ascii=False, indent=1))
print(f'deco-lijst.json: {len(items)} artifacts')
