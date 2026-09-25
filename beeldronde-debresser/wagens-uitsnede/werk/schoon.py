"""Nabewerking van een wagen-uitsnede uit site/_werk/cutout_mat.py.
Gebruik: python schoon.py <mat.png> <uit.png> [--onder 0.6] [--donker 110] [--marge 40]
1. Alfa strakker: smoothstep(0.25, 0.85) haalt de pluizige zachte rand weg (lucht en bomen langs het cabinedak).
2. Wegschaduw weg: in het onderste deel (y > onder * hoogte) gaat elke donkere (L < donker) half-doorzichtige
   pixel (alfa < 0.9) naar 0. Banden zijn dekkend en blijven staan; hun zachte buitenrand wordt 1 a 2 px scherper.
3. Stekels contactschaduw weg (zie 4 in de code). Losse eilandjes < 400 px weg, crop op alfa > 8 plus marge."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

a = sys.argv[1:]; src, out = a[0], a[1]
onder = float(a[a.index('--onder') + 1]) if '--onder' in a else 0.6
donker = float(a[a.index('--donker') + 1]) if '--donker' in a else 110
marge = int(a[a.index('--marge') + 1]) if '--marge' in a else 40
im = np.asarray(Image.open(src).convert('RGBA')).astype(np.float32)
rgb, al = im[..., :3], im[..., 3] / 255
t = np.clip((al - 0.25) / 0.6, 0, 1); al2 = t * t * (3 - 2 * t)
H = al.shape[0]; L = rgb @ np.array([0.299, 0.587, 0.114], np.float32)
laag = np.zeros_like(al, bool); laag[int(onder * H):] = True
al2[laag & (L < donker) & (al < 0.9)] = 0
# 4. Stekels van contactschaduw naast de banden: in de onderste 15% een opening (5 px) van het dekkende vlak;
#    donkere pixels die daar buiten vallen gaan weg. Banden zijn breder dan de opening en blijven staan.
bodem = np.zeros_like(al, bool); bodem[int(0.85 * H):] = True
open_ = ndimage.binary_opening(al2 > 0.5, structure=np.ones((3, 3), bool), iterations=5)
al2[bodem & ~open_ & (L < donker)] = 0
lab, k = ndimage.label(al2 > 0.5)
if k > 1:
    sizes = ndimage.sum(al2 > 0.5, lab, range(1, k + 1))
    al2[np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s < 400])] = 0
# zachte pixels die niet meer aan het hoofdvlak raken (los stof) ook weg
kern = ndimage.binary_dilation(al2 > 0.5, iterations=3); al2[~kern] = 0
a8 = np.clip(al2 * 255 + 0.5, 0, 255).astype(np.uint8); ys, xs = np.where(a8 > 8)
x0, y0 = max(xs.min() - marge, 0), max(ys.min() - marge, 0); x1, y1 = min(xs.max() + marge + 1, a8.shape[1]), min(ys.max() + marge + 1, a8.shape[0])
Image.fromarray(np.dstack([rgb.astype(np.uint8), a8])[y0:y1, x0:x1], 'RGBA').save(out, optimize=True)
print(f'{out}: {x1 - x0}x{y1 - y0}, zachte rand {100 * ((a8 > 8) & (a8 < 247)).sum() / max((a8 > 8).sum(), 1):.2f}%')
