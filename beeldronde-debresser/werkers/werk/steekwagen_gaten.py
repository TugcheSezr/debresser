"""Werker 7: de open vakken in het frame van de steekwagen doorzichtig maken.

cutout_mat.py liet het grijze studiodoek tussen de buizen van de steekwagen staan: BiRefNet zag het frame, op
de hele figuur gedraaid, als een dicht vlak. Hier wordt het doek in dat gebied weggehaald:
1. BiRefNet opnieuw, nu alleen op een uitsnede van de steekwagen: op die schaal ziet het de open vakken tussen
   de buizen en in de bodemplaat wel. Het laat daar ook het been en de schoen vallen, dus dat masker bepaalt
   alleen wat er weg mag, niet wat er blijft.
2. Een glad model van het doek (tweedegraadsvlak per kleurkanaal), gefit op de pixels die in de uitsnede al
   zeker achtergrond zijn. Weg gaat wat nu voorgrond is, volgens het steekwagenmasker achtergrond is en in
   kleur op het doek lijkt; het donkere been, de schoen en het achterwiel blijven zo staan. Rond de bodemplaat,
   die los van been en wielen staat, gaat alles weg wat het steekwagenmasker achtergrond noemt: daar ligt
   vloerschaduw in de openingen en eronder, die donkerder is dan het doek.
3. Nieuwe trimap met een smalle band (de buizen zijn maar 20 tot 30 px breed), closed-form matting en
   randkleurcorrectie opnieuw, alleen rond wat er weg is gegaan. De rest van de uitsnede blijft zoals hij was.

    python site/_werk/cutout_mat.py beeldronde-debresser/werkers/werker-7-steekwagen.png <tijdelijk>/werker-7-mat.png --margin 40
    python steekwagen_gaten.py <tijdelijk>/werker-7-mat.png          # schrijft ../werker-7-steekwagen-uitsnede.png
"""
import pathlib
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

HIER = pathlib.Path(__file__).resolve().parent
RONDE = HIER.parent
sys.path.insert(0, str(HIER.parents[2] / "site" / "_werk"))
from cutout_mat import cf_tegels, trimap  # noqa: E402
from pymatting import estimate_foreground_ml  # noqa: E402

BRON = RONDE / "werker-7-steekwagen.png"
UIT = RONDE / "werker-7-steekwagen-uitsnede.png"
OX, OY = 404, 187                      # linkerbovenhoek van de uitsnede in de bron (uit cutout_mat.py)
GEBIED = (1040, 1000, 1660, 2470)      # steekwagen in bronpixels (x0, y0, x1, y1)
PLAAT = (1395, 2150, 1600, 2430)       # bodemplaat, rechts van het voorwiel, in bronpixels

oud = pathlib.Path(sys.argv[1])        # de uitvoer van cutout_mat.py (--margin 40), met het doek nog tussen de buizen
cut = np.asarray(Image.open(oud).convert("RGBA"), np.float32) / 255
bron = np.asarray(Image.open(BRON).convert("RGB"), np.float32) / 255

x0, y0, x1, y1 = GEBIED
cx0, cy0, cx1, cy1 = x0 - OX, y0 - OY, min(x1 - OX, cut.shape[1]), min(y1 - OY, cut.shape[0])
rgb = bron[y0:y0 + (cy1 - cy0), x0:x0 + (cx1 - cx0)]
alfa = cut[cy0:cy1, cx0:cx1, 3].copy()

# 1. doekmodel uit de zekere achtergrond rond de steekwagen
yy, xx = np.mgrid[0:rgb.shape[0], 0:rgb.shape[1]].astype(np.float32)
X = np.stack([np.ones_like(xx), xx, yy, xx * xx, xx * yy, yy * yy], -1) / np.array([1, 600, 1500, 600**2, 600 * 1500, 1500**2], np.float32)
zeker = ndimage.binary_erosion(alfa < 0.02, iterations=6)
coef, *_ = np.linalg.lstsq(X[zeker], rgb[zeker], rcond=None)
doek = X @ coef

# 2. weg: voorgrond in de uitsnede, achtergrond volgens BiRefNet op de steekwagen alleen, en doekkleurig
from rembg import new_session, remove  # noqa: E402
masker = remove(Image.fromarray((rgb * 255 + 0.5).astype(np.uint8)), session=new_session("birefnet-general"),
                only_mask=True)
los = np.asarray(masker, np.float32) / 255
verschil = np.abs(rgb - doek).max(-1)
plaat = np.zeros_like(weg := verschil < 0.10)
plaat[PLAAT[1] - y0:PLAAT[3] - y0, PLAAT[0] - x0:PLAAT[2] - x0] = True
weg = (alfa > 0.5) & (los < 0.5) & (weg | plaat)
weg = ndimage.binary_opening(weg, iterations=1)
lab, k = ndimage.label(weg)
grootte = ndimage.sum(weg, lab, range(1, k + 1))
weg = np.isin(lab, [i + 1 for i in range(k) if grootte[i] >= 30])
print(f"doekmodel op {int(zeker.sum())} px; {int(weg.sum())} px doek binnen het frame gevonden in "
      f"{int((grootte >= 30).sum())} vakken")

# 3. nieuwe harde maskering, smalle trimap, matting en kleur opnieuw in dit gebied
hard = (alfa > 0.5) & ~weg
tri = trimap(hard.astype(np.float32), er=3, di=3)
nieuw, n = cf_tegels(rgb, tri)
nieuw = np.where(nieuw < 0.04, 0, np.where(nieuw > 0.96, 1, nieuw)).astype(np.float32)
F = np.clip(estimate_foreground_ml(rgb.astype(np.float64), nieuw.astype(np.float64)), 0, 1).astype(np.float32)
kleur = np.where(nieuw[..., None] >= 0.999, rgb, F)
# alleen waar het iets uitmaakt: binnen 10 px van wat er veranderd is, zodat de rest van het gebied gelijk blijft
anders = ndimage.binary_dilation(weg, iterations=10)
uit = cut.copy()
blok = uit[cy0:cy1, cx0:cx1]
blok[..., 3] = np.where(anders, nieuw, alfa)
blok[..., :3] = np.where(anders[..., None], kleur, blok[..., :3])
Image.fromarray((uit * 255 + 0.5).clip(0, 255).astype(np.uint8), "RGBA").save(UIT, optimize=True)
print(f"matting: {n} tegels; geschreven {UIT.name}")
