"""Statische kaart Venlo voor de contactpagina. Eigen SVG op OpenStreetMap-data (ODbL).

Geen Google: een opgeslagen screenshot van Google Maps is in strijd met hun voorwaarden (tiles
cachen mag niet) en de Static Maps API laadt juist extern, wat hier niet gewenst is. Deze kaart
laadt niets van buiten, staat in de huisstijl en is dus ook op een trage verbinding meteen scherp.
Attributie hoort bij het beeld: OpenStreetMap-bijdragers.
"""
import json, math

d = json.load(open("venlo3.json"))
S, W, N, E = d["bbox"]; MLAT, MLON = d["marker"]
BR, HO = 1400, 933

merc = lambda lat: math.log(math.tan(math.pi/4 + math.radians(lat)/2))
MS, MN = merc(S), merc(N)
def xy(lat, lon):
    return ((lon - W)/(E - W)*BR, (MN - merc(lat))/(MN - MS)*HO)

def punten(g):
    return [xy(p["lat"], p["lon"]) for p in g]

def oppervlak(pts):
    return abs(sum(pts[i][0]*pts[i-1][1] - pts[i-1][0]*pts[i][1] for i in range(len(pts))))/2

def vereenvoudig(pts, tol=1.1):
    """Weg met punten die nauwelijks van hun buur verschillen: scheelt de helft aan bytes."""
    uit = [pts[0]]
    for p in pts[1:-1]:
        if abs(p[0]-uit[-1][0]) + abs(p[1]-uit[-1][1]) > tol: uit.append(p)
    if len(pts) > 1: uit.append(pts[-1])
    return uit

def pad(pts, dicht=False):
    return " ".join(f"{'M' if i==0 else 'L'}{x:.0f},{y:.0f}" for i,(x,y) in enumerate(pts)) + (" Z" if dicht else "")

bebouwd, bos, water, rivier, wegen, spoor = [], [], [], [], [], []
for e in d["elements"]:
    g = e.get("geometry")
    if not g or len(g) < 2: continue
    t = e.get("tags", {}); pts = vereenvoudig(punten(g))
    lu, nat, wat, rw, hw = t.get("landuse"), t.get("natural"), t.get("waterway"), t.get("railway"), t.get("highway")
    if lu in ("residential","industrial","retail","commercial"):
        if oppervlak(pts) > 600: bebouwd.append(pad(pts, True))
    elif lu in ("forest","park","recreation_ground"):
        if oppervlak(pts) > 900: bos.append(pad(pts, True))
    elif nat == "water":
        if oppervlak(pts) > 300: water.append(pad(pts, True))
    elif wat == "river": rivier.append(pad(pts))
    elif rw == "rail":   spoor.append(pad(pts))
    elif hw:             wegen.append((hw, pad(pts)))

BREED = {"motorway": (14, 9), "trunk": (12, 7.5), "primary": (10, 6.4), "secondary": (7.4, 4.4), "tertiary": (5, 3)}
VOLG = ["tertiary", "secondary", "primary", "trunk", "motorway"]
CREME, BEBOUWD, BOS, WATER = "#F2F0E6", "#E8E4D6", "#D3E5D6", "#B6DBE3"
RAND, VUL, TEAL, NAVY, GEEL = "#DCD7C6", "#FFFFFF", "#00A19B", "#22314E", "#FFD500"
PLAATSEN = [("Venlo", 51.3702, 6.1689, 38), ("Blerick", 51.3671, 6.1511, 27)]

s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BR} {HO}" width="{BR}" height="{HO}" role="img" '
     f'aria-label="Kaart van Venlo met de locatie van De Kievit Verhuizingen aan de Van Coehoornstraat 11, ten noorden van het centrum">',
     '<defs><filter id="k-schaduw" x="-30%" y="-30%" width="160%" height="160%">'
     '<feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#22314E" flood-opacity=".38"/></filter></defs>',
     f'<rect width="{BR}" height="{HO}" fill="{CREME}"/>']
if bebouwd: s.append(f'<g fill="{BEBOUWD}">' + "".join(f'<path d="{p}"/>' for p in bebouwd) + '</g>')
if bos:     s.append(f'<g fill="{BOS}" opacity=".9">' + "".join(f'<path d="{p}"/>' for p in bos) + '</g>')
if water:   s.append(f'<g fill="{WATER}">' + "".join(f'<path d="{p}"/>' for p in water) + '</g>')
if rivier:  s.append(f'<g fill="none" stroke="{WATER}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round">'
                     + "".join(f'<path d="{p}"/>' for p in rivier) + '</g>')
if spoor:   s.append(f'<g fill="none" stroke="#C9C3B2" stroke-width="2" stroke-dasharray="9 7" opacity=".8">'
                     + "".join(f'<path d="{p}"/>' for p in spoor) + '</g>')
for laag in (0, 1):
    for soort in VOLG:
        paden = [p for st, p in wegen if st == soort]
        if not paden: continue
        s.append(f'<g fill="none" stroke="{RAND if laag==0 else VUL}" stroke-width="{BREED[soort][laag]}" '
                 f'stroke-linecap="round" stroke-linejoin="round">' + "".join(f'<path d="{p}"/>' for p in paden) + '</g>')

mx, my = xy(MLAT, MLON)
for naam, la, lo, fs in PLAATSEN:
    x, y = xy(la, lo)
    if not (0 < x < BR and 0 < y < HO) or math.hypot(x-mx, y-my) < 130: continue
    s.append(f'<text x="{x:.0f}" y="{y:.0f}" text-anchor="middle" font-family="Poppins,system-ui,sans-serif" '
             f'font-weight="700" font-size="{fs}" letter-spacing="{fs*.05:.1f}" fill="{NAVY}" stroke="{CREME}" '
             f'stroke-width="7" paint-order="stroke" opacity=".72">{naam}</text>')
s += [f'<circle cx="{mx:.0f}" cy="{my:.0f}" r="78" fill="{TEAL}" opacity=".13"/>',
      f'<circle cx="{mx:.0f}" cy="{my:.0f}" r="46" fill="{TEAL}" opacity=".2"/>',
      f'<g transform="translate({mx:.0f},{my:.0f})" filter="url(#k-schaduw)">'
      f'<path d="M0,9 C0,9 -27,-20 -27,-39 A27,27 0 1 1 27,-39 C27,-20 0,9 0,9 Z" fill="{NAVY}" stroke="#fff" stroke-width="4.5" stroke-linejoin="round"/>'
      f'<circle cx="0" cy="-39" r="10" fill="{GEEL}"/></g>',
      f'<text x="{mx:.0f}" y="{my+44:.0f}" text-anchor="middle" font-family="Poppins,system-ui,sans-serif" '
      f'font-weight="700" font-size="28" fill="{NAVY}" stroke="#fff" stroke-width="7" paint-order="stroke">De Kievit</text>',
      '</svg>']
uit = "\n".join(s)
open("kaart-venlo.svg", "w").write(uit)
print(f"{len(uit)//1024} kB | wegen {len(wegen)} bos {len(bos)} water {len(water)} rivier {len(rivier)} bebouwd {len(bebouwd)} spoor {len(spoor)}")
