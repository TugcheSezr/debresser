#!/usr/bin/env python3
"""Schrijft site/_werk/deco-lijst.json: het palet van de plaatser (_werk/plaatser.html).
Scant site/assets/img/deco/ en zet er de twee CSS-composities bij (ster en ster-met-bij).
Draaien vanuit de repo-root na het toevoegen van een artifact: python3 site/_werk/deco_lijst.py"""
import json, re
from pathlib import Path
from PIL import Image

D = Path('site/assets/img/deco')
LABELS = {
    'bij': 'Bij', 'bij-vlucht': 'Bij met vluchtlijn', 'pijl-weg': 'Weg-pijl', 'pijlpunt': 'Logo-pijlpunt',
    'honingraat': 'Honingraat', 'nl-kaart': 'NL-kaart met Venlo', 'logo-kievit-navy': 'Kievit-logo navy',
    'logo-kievit-wit': 'Kievit-logo wit', 'kievit-vogel': 'Kievit-vogel navy', 'kievit-vogel-wit': 'Kievit-vogel wit',
    'lockup-kievit-topmovers': 'Lockup navy', 'lockup-kievit-topmovers-wit': 'Lockup wit',
    'stempel-topmovers': 'Stempel Top Movers', 'stempel-kievit': 'Stempel De Kievit', 'stempel-erkend': 'Stempel Erkende Verhuizer',
    'katrol': 'Katrol', 'verhuiswagen': 'Verhuiswagen', 'verhuisdoos': 'Verhuisdoos', 'verhuislift': 'Verhuislift',
    'opslag': 'Inboedelopslag', 'montage': 'Montage', 'kunst': 'Kunst verhuizen', 'zakelijk': 'Zakelijk',
    'internationaal': 'Internationaal', 'route': 'Route van A naar B', 'verhuisdatum': 'Verhuisdatum',
    'sleutel': 'Sleuteloverdracht', 'steekwagen': 'Steekwagen', 'huis-pijl': 'Van huis naar huis',
    'ster-1910': 'Ster met bij en tekst', 'ster-sinds-1910': 'Ster Sinds 1910', 'ster-gratis-offerte': 'Ster Gratis offerte',
    'boog-dun': 'Boog dun', 'boog-dun-wit': 'Boog dun wit', 'cirkel-lijn': 'Cirkel lijn', 'cirkel-lijn-wit': 'Cirkel lijn wit',
    'ring-dubbel': 'Ring dubbel', 'ring-dubbel-wit': 'Ring dubbel wit', 'cirkel-vlak': 'Cirkel navy',
    'cirkel-vlak-teal': 'Cirkel teal', 'halve-cirkel': 'Halve cirkel', 'boog-dik': 'Boog dik', 'strepen': 'Strepen',
    'stippen': 'Stippen', 'driehoek': 'Driehoek', 'vierkant-gedraaid': 'Vierkant gedraaid', 'golf': 'Golf',
    'kruisjes': 'Kruisjes', 'rooster': 'Rooster', 'kwart-vlak': 'Kwart vlak', 'stip-groot': 'Stip',
    # tweede lichting (deco_iconen.py)
    'logo-topmovers': 'Top Movers-logo kleur', 'logo-topmovers-wit': 'Top Movers-logo wit',
    'logo-topmovers-navy': 'Top Movers-logo navy', 'logo-topmovers-teal': 'Top Movers-logo teal',
    'beeldmerk-topmovers': 'Top Movers-beeldmerk teal', 'beeldmerk-topmovers-wit': 'Top Movers-beeldmerk wit',
    'beeldmerk-topmovers-navy': 'Top Movers-beeldmerk navy',
    'checklist': 'Checklist', 'dozenstapel': 'Dozenstapel', 'doos-open': 'Doos open', 'schild-vinkje': 'Schild verzekerd',
    'vinkje-cirkel': 'Vinkje teal', 'vinkje-cirkel-geel': 'Vinkje geel', 'klok': 'Klok', 'pin': 'Locatie-pin',
    'pin-geel': 'Locatie-pin geel', 'telefoon': 'Telefoon', 'chat-ballon': 'Chat-ballon', 'chat-ballon-geel': 'Chat-ballon geel',
    'envelop': 'Envelop', 'aanhalingstekens': 'Aanhalingstekens', 'aanhalingstekens-wit': 'Aanhalingstekens wit',
    'aanhalingstekens-geel': 'Aanhalingstekens geel', 'vijf-sterren': 'Vijf sterren', 'ster-geel': 'Ster geel',
    'hart-huis': 'Huis met hart', 'prijskaartje': 'Prijskaartje', 'lamp': 'Lamp', 'duim': 'Duim omhoog',
    'medaille': 'Medaille', 'trap': 'Trap', 'hangslot': 'Hangslot',
    'krul-pijl': 'Krul-pijl geel', 'krul-pijl-teal': 'Krul-pijl teal', 'onderstreping': 'Onderstreping geel',
    'onderstreping-teal': 'Onderstreping teal', 'sparkles': 'Sparkles geel', 'sparkles-teal': 'Sparkles teal',
    'ovaal-kader': 'Ovaal-kader teal', 'ovaal-kader-geel': 'Ovaal-kader geel', 'ovaal-kader-wit': 'Ovaal-kader wit',
    'boog-gestippeld': 'Boog gestippeld', 'boog-gestippeld-wit': 'Boog gestippeld wit', 'zigzag': 'Zigzag teal',
    'zigzag-geel': 'Zigzag geel', 'honingraat-klein': 'Honingraat klein',
}

def maat(p):
    if p.suffix == '.svg':
        vb = re.search(r'viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"', p.read_text())
        if vb: return float(vb.group(3)), float(vb.group(4))
        return 100.0, 100.0
    with Image.open(p) as im: return float(im.width), float(im.height)

items = []
for p in sorted(D.iterdir()):
    if p.suffix not in ('.svg', '.webp'): continue
    b, h = maat(p)
    items.append({'soort': 'img', 'naam': LABELS.get(p.stem, p.stem), 'bestand': p.name,
                  'b': round(b), 'h': round(h), 'breed': 160 if b >= h else round(160 * b / h)})

Path('site/_werk/deco-lijst.json').write_text(json.dumps(items, ensure_ascii=False, indent=1))
print(f'deco-lijst.json: {len(items)} artifacts')
