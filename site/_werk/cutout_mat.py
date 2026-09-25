"""Cutout van een echte foto met BiRefNet + closed-form matting (wint van ../cutout.py, zie beeld-manifest duo-opslag).
Gebruik: python3 cutout_mat.py <in.jpg> <out.png> [--margin 40]
1. BiRefNet-masker (rembg, birefnet-general) als trimap: erosie 8 px = zeker voorgrond, dilatatie 10 px = zeker
   achtergrond, de band ertussen is onbekend.  2. Closed-form matting (pymatting) op de band, in tegels van 512 px
   met 96 px overlap (alleen het binnengebied van een tegel wordt teruggeschreven).  3. Alfa-fog < 0,04 en
   eilandjes < 400 px weg.  4. Randkleur-decontaminatie met estimate_foreground_ml; die geeft meteen de kleur-bleed
   onder alfa 0.  Schrijft <out>.png (RGBA, gecropt op alfa > 8 met marge) en <out>-check.jpg (composiet op donker).
Print de zachte-randmeting en de randhelderheid tegen het binnenwerk (gelijk = geen halo)."""
import os, sys, time
import numpy as np
from PIL import Image, ImageOps
from scipy import ndimage
from pymatting import estimate_alpha_cf, estimate_foreground_ml
from rembg import new_session, remove


def trimap(mask, er=8, di=10):
    hard = mask > 0.5; st = np.ones((3, 3), bool)
    tri = np.full(mask.shape, 0.5, np.float32)
    tri[ndimage.binary_erosion(hard, structure=st, iterations=er)] = 1.0
    tri[~ndimage.binary_dilation(hard, structure=st, iterations=di)] = 0.0
    return tri


def cf_tegels(rgb, tri, T=512, ov=96):
    H, W = tri.shape; alpha = tri.copy(); unknown = (tri > 0.1) & (tri < 0.9); stride = T - 2 * ov
    ys = list(range(0, max(H - T, 0) + 1, stride)); xs = list(range(0, max(W - T, 0) + 1, stride))
    if ys[-1] + T < H: ys.append(H - T)
    if xs[-1] + T < W: xs.append(W - T)
    n = 0
    for y in ys:
        for x in xs:
            iy0, iy1 = (y if y == 0 else y + ov), (y + T if y + T >= H else y + T - ov)
            ix0, ix1 = (x if x == 0 else x + ov), (x + T if x + T >= W else x + T - ov)
            if not unknown[iy0:iy1, ix0:ix1].any():
                continue
            a = estimate_alpha_cf(rgb[y:y + T, x:x + T].astype(np.float64), tri[y:y + T, x:x + T].astype(np.float64))
            sub = a[iy0 - y:iy1 - y, ix0 - x:ix1 - x]; u = unknown[iy0:iy1, ix0:ix1]
            blok = alpha[iy0:iy1, ix0:ix1]; blok[u] = np.clip(sub[u], 0, 1); n += 1
    return alpha, n


def main():
    a = sys.argv[1:]; src, out = a[0], a[1]; margin = int(a[a.index('--margin') + 1]) if '--margin' in a else 40
    t0 = time.time(); im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    mask = np.asarray(remove(im, session=new_session('birefnet-general'), only_mask=True).convert('L')).astype(np.float32) / 255
    print(f'  birefnet-masker: {time.time() - t0:.0f}s', flush=True)
    ys, xs = np.where(mask > 0.5)                                   # werkgebied met ruimte voor de band
    x0, y0, x1, y1 = max(xs.min() - 60, 0), max(ys.min() - 60, 0), min(xs.max() + 61, im.width), min(ys.max() + 61, im.height)
    rgb = np.asarray(im.crop((x0, y0, x1, y1))).astype(np.float32) / 255
    alpha, n = cf_tegels(rgb, trimap(mask[y0:y1, x0:x1])); print(f'  matting: {n} tegels, {time.time() - t0:.0f}s', flush=True)
    alpha = np.where(alpha < 0.04, 0, np.where(alpha > 0.96, 1, alpha)).astype(np.float32)
    lab, k = ndimage.label(alpha > 0.5)
    if k > 1:
        sizes = ndimage.sum(alpha > 0.5, lab, range(1, k + 1)); alpha[np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s < 400])] = 0
        print(f'  componenten >= 400 px: {int((sizes >= 400).sum())}, eilandjes weg: {int((sizes < 400).sum())}')
    F = np.clip(estimate_foreground_ml(rgb.astype(np.float64), alpha.astype(np.float64)), 0, 1).astype(np.float32)
    rgb = np.where(alpha[..., None] >= 0.999, rgb, F)
    a8 = np.clip(alpha * 255 + 0.5, 0, 255).astype(np.uint8); ys, xs = np.where(a8 > 8)
    bx0, by0 = max(xs.min() - margin, 0), max(ys.min() - margin, 0); bx1, by1 = min(xs.max() + margin + 1, a8.shape[1]), min(ys.max() + margin + 1, a8.shape[0])
    rgba = Image.fromarray(np.dstack([np.clip(rgb * 255 + 0.5, 0, 255).astype(np.uint8), a8])[by0:by1, bx0:bx1], 'RGBA'); rgba.save(out, optimize=True)
    a8 = a8[by0:by1, bx0:bx1]; L = np.asarray(rgba.convert('L')).astype(np.float32)
    soft = (a8 > 8) & (a8 < 247); ring = (a8 == 255) & ~ndimage.binary_erosion(a8 == 255, iterations=8)
    print(f'{os.path.basename(out)}: {rgba.size[0]}x{rgba.size[1]} bbox in bron {(x0 + bx0, y0 + by0, x0 + bx1, y0 + by1)} '
          f'zachte rand {100 * soft.sum() / max((a8 > 8).sum(), 1):.2f}% randhelderheid {L[soft].mean():.0f} tegen binnenwerk {L[ring].mean():.0f} ({time.time() - t0:.0f}s)')
    chk = Image.new('RGBA', rgba.size, (34, 34, 36, 255)); chk.alpha_composite(rgba); c = chk.convert('RGB'); c.thumbnail((1400, 1400)); c.save(out.replace('.png', '-check.jpg'), quality=88)


if __name__ == '__main__':
    main()
