"""Witte speldenprikken op donkere kleding na de key (navy mouw): alfa-gaatjes die op donkere bronpixels liggen worden
gevuld met de mediaan van hun omgeving (max(alpha, median7)), alleen waar de bron donker is; randen blijven staan omdat de
mediaan van een rechte rand de rand zelf is. Gebruik: python3 speldenprik_fix.py <in-heup.png> <bron-plaat.jpg> <uit.png>"""
import sys, numpy as np
from PIL import Image
from scipy import ndimage
inp, plaat, uit = sys.argv[1:4]
im=Image.open(inp).convert('RGBA'); a=np.asarray(im).astype(np.float32); al=a[...,3]/255; rgb=a[...,:3]
donker=(rgb.sum(-1)<330)        # donkere stof (som van RGB onder 330 van 765)
med=ndimage.median_filter(al,size=7)
kand=donker&(med>al+0.05)&(al<0.995)
al2=al.copy(); al2[kand]=med[kand]
# tweede pas: kleine ingesloten gaatjes in het opake deel dichten
opaak=al2>0.5; gat=ndimage.binary_fill_holes(opaak)&~opaak; lab,n=ndimage.label(gat)
if n:
    sizes=ndimage.sum(gat,lab,range(1,n+1))
    for i,s in enumerate(sizes,1):
        if s<=400: al2[lab==i]=1.0
print(inp,'gefixte pixels',int(kand.sum()),'gaatjes',int(n))
out=np.concatenate([rgb,al2[...,None]*255],-1).astype(np.uint8); Image.fromarray(out,'RGBA').save(uit)
