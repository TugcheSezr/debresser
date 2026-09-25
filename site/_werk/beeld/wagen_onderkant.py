"""Onderkant van de wagen-cutout (bron 37, vrijstaande foto op wit MET grondschaduw) herstellen.
De closed-form matting van cutout_mat.py volgde onder de wagen de JPEG-blokken van de schaduw (trapjes onder
de banden) en hield grijze schaduwmist onder chassis en rolluikbox vast. In een band van 16 px rond de
BiRefNet-contour in het onderste deel (y >= 880 in de bron) vervangt het geblurde BiRefNet-masker de
matting-alfa: dat masker volgt bumper, verre voorband, sideskirt en banden strak en sluit de schaduw uit.
Daarbuiten blijft de matting-alfa staan (de bovenranden waren goed).
Gebruik: python3 wagen_onderkant.py <bron.jpg> <birefnet-masker.png> <raw-matting.png> <raw-uit.png>
Het BiRefNet-masker: rembg remove(im, session=new_session('birefnet-general'), only_mask=True)."""
import sys, numpy as np
from PIL import Image
from scipy import ndimage
SRC, MASK, RAW, OUT = sys.argv[1:5]
DX, DY = 471, 24                              # raw-37 = bron min (471, 24)
BAND, Y_VAN, Y_TOT = 16, 870, 890             # bandbreedte rond de contour; zachte naad tussen oud (boven) en nieuw
src = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
mask = np.asarray(Image.open(MASK).convert('L')) > 127
R = np.asarray(Image.open(RAW).convert('RGBA')).astype(np.float32)
H, W = R.shape[:2]; crop = (slice(DY, DY + H), slice(DX, DX + W))
m = mask[crop]
st = np.ones((3, 3), bool)
band = ndimage.binary_dilation(m, st, iterations=BAND) & ~ndimage.binary_erosion(m, st, iterations=BAND)
w = np.clip((np.arange(H) + DY - Y_VAN) / (Y_TOT - Y_VAN), 0, 1)[:, None] * band
nieuw = ndimage.gaussian_filter(m.astype(np.float32), 1.0)
oud = R[..., 3] / 255
alpha = oud * (1 - w) + nieuw * w
rgb = np.where(w[..., None] > 0, src[crop], R[..., :3])
out = np.dstack([np.clip(rgb, 0, 255), np.clip(alpha * 255 + .5, 0, 255)]).astype(np.uint8)
Image.fromarray(out, 'RGBA').save(OUT, optimize=True)
# controle: schaduwrest = dekkende pixels onder de BiRefNet-onderrand van hun kolom, in de zone
onder = np.zeros_like(m)
for x in range(W):
    ys = np.where(m[:, x])[0]
    if len(ys): onder[ys.max() + 2:, x] = True
print(f'band {int(band.sum())} px; schaduwrest onder de contour (a>0.1): {int(((alpha > .1) & onder & (w > 0)).sum())} '
      f'(was {int(((oud > .1) & onder & (w > 0)).sum())}); alfa-verschil >0.5: {int((np.abs(alpha - oud) > .5).sum())} px')
