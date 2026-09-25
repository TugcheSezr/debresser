#!/usr/bin/env python3
"""Randontsmetting voor een Vision-cutout: haalt de achtergrondkleur uit de halftransparante rand.

Waarom: het instancemasker van Vision geeft een zachte rand van 1-2 px. Die pixels bevatten een MENGSEL van
het onderwerp en de achtergrond uit de bronfoto. Op een donker vlak lichten ze op als een lichte, hier
paarsige gloed rond hoofd en schouders; onder de foto viel dat niet op omdat de achtergrond daar zelf licht was.
Het is dus geen fout van de uitsnede maar van de KLEUR onder de zachte rand.

Wat het doet, in deze volgorde:
1. alfa iets terugtrekken (`--trim`), zodat de buitenste, meest vervuilde ring wegvalt;
2. de kleur van het OPAKE onderwerp naar buiten laten lopen en daarmee de kleur in de hele zachte band
   vervangen, zodat er geen achtergrond meer in zit (de alfa bepaalt de zachtheid, de kleur is puur onderwerp);
3. verkleinen met voorvermenigvuldigde alfa, anders lekt de kleur onder alfa nul terug in de rand.

Gebruik: python3 randfix.py <raw.png> <uit-basisnaam> --maten 1100x907,700x577 [--trim 0.10] [--despill 0] [--q 86]
De bovenkant en zijkanten volgen de alfa-bbox; de onderkant volgt uit de gevraagde verhouding.
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def bleed_uit_opaak(rgb, opaak, passes=26):
    """Laat de kleur van het opake onderwerp naar buiten lopen over de hele plaat."""
    kleur = rgb * opaak[..., None]
    gewicht = opaak.astype(np.float32).copy()
    uit = rgb.copy()
    for _ in range(passes):
        ks = ndimage.uniform_filter(kleur, size=(3, 3, 1))
        gs = ndimage.uniform_filter(gewicht, size=3)
        nieuw = (gs > 0) & (gewicht == 0)
        if not nieuw.any():
            break
        uit[nieuw] = ks[nieuw] / gs[nieuw][:, None]
        kleur[nieuw] = uit[nieuw]
        gewicht[nieuw] = 1.0
    return uit


def schaal(kanaal, w, h):
    return np.asarray(Image.fromarray(kanaal.astype(np.float32), "F").resize((w, h), Image.LANCZOS), dtype=np.float32)


def main():
    a = sys.argv[1:]
    src, basis = a[0], a[1]
    maten = [tuple(int(v) for v in m.split("x")) for m in a[a.index("--maten") + 1].split(",")]
    trim = float(a[a.index("--trim") + 1]) if "--trim" in a else 0.10
    q = int(a[a.index("--q") + 1]) if "--q" in a else 86

    im = Image.open(src).convert("RGBA")
    arr = np.asarray(im).astype(np.float32)
    rgb, alpha = arr[..., :3], arr[..., 3] / 255.0

    # 1. alfa terugtrekken: de buitenste ring is het sterkst vervuild
    alpha = np.clip((alpha - trim) / (1.0 - trim), 0, 1)

    # 2. kleur in de hele zachte band vervangen door onderwerpskleur
    opaak = alpha > 0.92
    schoon = bleed_uit_opaak(rgb, opaak)
    band = (alpha > 0.0) & ~opaak
    rgb = np.where(band[..., None], schoon, rgb)

    # 2b. de-spill langs de contour: bij een gekeyde plaat zit de keykleur ook in OPAKE pixels vlak binnen de
    # rand. Alleen magenta-achtige pixels (R>G en B>G) worden geneutraliseerd, dus oranje hesje (B<G) en
    # navy mouw (R<G) blijven ongemoeid.
    ring = int(a[a.index("--despill") + 1]) if "--despill" in a else 0
    if ring:
        binnen = alpha > 0.5
        zone = binnen & ~ndimage.binary_erosion(binnen, iterations=ring)
        zone |= (alpha > 0.0) & ~binnen
        R, G, B = rgb[..., 0], rgb[..., 1], rgb[..., 2]
        magenta = zone & (R > G) & (B > G)
        exc = np.minimum(R, B) - G
        rgb[..., 0] = np.where(magenta, R - exc * 0.9, R)
        rgb[..., 2] = np.where(magenta, B - exc * 0.9, B)
        print(f"  de-spill: {int(magenta.sum())} px in een ring van {ring} px langs de contour")

    ys, xs = np.where(alpha > 0.02)
    x0, x1, y0 = xs.min(), xs.max() + 1, ys.min()
    breedte = x1 - x0
    for w, h in maten:
        hoogte = int(round(breedte * h / w))
        y1 = min(y0 + hoogte, alpha.shape[0])
        sub_rgb, sub_a = rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1]
        # 3. voorvermenigvuldigd verkleinen
        prem = np.dstack([schaal(sub_rgb[..., k] * sub_a, w, h) for k in range(3)])
        a_s = np.clip(schaal(sub_a, w, h), 0, 1)
        kleur = np.where(a_s[..., None] > 1e-3, prem / np.maximum(a_s, 1e-3)[..., None], 0)
        uit = Image.fromarray(np.dstack([np.clip(kleur, 0, 255), a_s * 255]).astype(np.uint8), "RGBA")
        p = f"{basis}-{w}.webp"
        uit.save(p, "WEBP", quality=q, method=6)
        al = np.asarray(uit).astype(float)[..., 3]
        rr, gg, bb = [np.asarray(uit).astype(float)[..., k] for k in range(3)]
        rand = (al > 8) & (al < 247)
        paars = rand & (rr > gg + 8) & (bb > gg + 8)
        print(f"{os.path.basename(p)}: {w}x{h} crop y {y0}-{y1} x {x0}-{x1}, "
              f"zachte rand {100 * rand.sum() / max((al > 8).sum(), 1):.2f}%, paars {100 * paars.sum() / max(rand.sum(), 1):.1f}%, "
              f"{os.path.getsize(p) // 1024} KB")


if __name__ == "__main__":
    main()
