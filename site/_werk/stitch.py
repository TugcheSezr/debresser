#!/usr/bin/env python3
"""Plakt de stroken van shoot.mjs aan elkaar en maakt een overzicht (max 1600px hoog) + secties."""
import sys, json, os
from PIL import Image
out = sys.argv[1]
parts = open(out.replace('.png', '.parts.txt')).read().split()
ims = [Image.open(p) for p in parts]
W = ims[0].width; H = sum(i.height for i in ims)
full = Image.new('RGB', (W, H), 'white'); y = 0
for i in ims: full.paste(i, (0, y)); y += i.height
full.save(out); [os.remove(p) for p in parts]
meta = json.load(open(out.replace('.png', '.json')))
ov = full.copy(); ov.thumbnail((1000, 6000)); ov.save(out.replace('.png', '-overzicht.png'))
for s in meta['secties']:
    box = (0, s['top'], W, min(H, s['top'] + s['h']))
    if box[3] - box[1] < 10: continue
    crop = full.crop(box); crop.thumbnail((1400, 1400)); crop.save(out.replace('.png', f"-{s['id']}.png"))
print(out, full.size, 'secties:', [(s['id'], s['h']) for s in meta['secties']], 'scroll:', meta['scroll'])
