"""Navy mouw in de schaduw keyt als magenta (paarse zweem). Fix: Vision-voorgrondmasker van de plaat als bescherming:
binnen het (2 px geerodeerde) masker krijgt elke pixel die NIET echt magenta is alfa 1 met de bronkleur; daarna
mediaan-fix voor restjes. Gebruik: python3 mouw_fix.py <plaat.jpg> <cut-full.png> <uit-heup.png>"""
import sys, subprocess, numpy as np
from PIL import Image
from scipy import ndimage
plaat, cutf, uit = sys.argv[1:4]
import re
subprocess.run(['../../bin/fgmask',plaat,'cut/_fg.png'],check=True,capture_output=True)
fg_full=np.asarray(Image.open('cut/_fg.png').convert('L'))>128
src_full=np.asarray(Image.open(plaat).convert('RGB')).astype(np.float32)
cut=np.asarray(Image.open(cutf).convert('RGBA')).astype(np.float32); al=cut[...,3]/255; rgb=cut[...,:3]
# de cut van cut_situatie is de bbox-uitsnede van de plaat: bbox opnieuw opvragen en maskers gelijk snijden
r=subprocess.run(['python3','../../cut_situatie.py',plaat,'cut/_tmp.png','--margin','30'],capture_output=True,text=True)
m=re.search(r'bbox \(np\.int64\((\d+)\), np\.int64\((\d+)\), (?:np\.int64\()?(\d+)\)?, (\d+)\)',r.stdout) or re.search(r'bbox \((\d+), np\.int64\((\d+)\), (\d+), (\d+)\)',r.stdout)
x0,y0,x1,y1=[int(v) for v in m.groups()]
fg=fg_full[y0:y1,x0:x1]; src=src_full[y0:y1,x0:x1]
assert fg.shape==al.shape, (fg.shape, al.shape, r.stdout[-200:])
R,G,B=src[...,0],src[...,1],src[...,2]
magenta=(R>150)&(B>150)&(G<110)&(((R+B)/2-G)>90)
bescherm=ndimage.binary_erosion(fg,iterations=2)&~magenta&(al<0.999)
al2=al.copy(); al2[bescherm]=1.0; rgb2=rgb.copy(); rgb2[bescherm]=src[bescherm]
med=ndimage.median_filter(al2,size=5); donker=src.sum(-1)<330; kand=donker&(med>al2+0.05)&(al2<0.995); al2[kand]=med[kand]
print(cutf,'beschermd',int(bescherm.sum()),'mediaan',int(kand.sum()))
im=Image.fromarray(np.concatenate([rgb2,al2[...,None]*255],-1).astype(np.uint8),'RGBA')
a=np.asarray(im)[...,3]; ys,xs=np.where(a>8); c=im.crop((max(0,xs.min()-6),max(0,ys.min()-6),min(im.width,xs.max()+7),im.height)); c.save(uit); print(uit,c.size)
