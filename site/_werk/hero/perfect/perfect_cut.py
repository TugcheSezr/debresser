"""Pixelperfecte uitsnede van foto 67 (drie TM-medewerkers, duim omhoog) voor de hero.
Stappen: Vision-instancemasker + Vision-persoonsmatte (accurate) -> trimap -> kleurgeleide alfa
(guided filter op het RGB-beeld, dan aangescherpt tot een strakke rand van 1-2 px) -> ingesloten gaten
dichten -> kleurdecontaminatie (achtergrondkleur uit de randpixels rekenen, F=(C-(1-a)B)/a) -> heupcrop
-> master-png + webp. Gebruik: python3 perfect_cut.py"""
import numpy as np
from PIL import Image
from scipy import ndimage

src=np.asarray(Image.open('bron-67.jpg').convert('RGB')).astype(np.float32)/255.0
fg=np.asarray(Image.open('fg.png').convert('L')).astype(np.float32)/255.0
pm=np.asarray(Image.open('person.png').convert('L')).astype(np.float32)/255.0
H,W,_=src.shape

# 1. harde basis: instancemasker (native resolutie) en persoonsmatte gecombineerd
hard=((fg>0.5)|((pm>0.6)&ndimage.binary_dilation(fg>0.5,iterations=6))).astype(np.float32)   # persoonsmatte alleen vlak langs het instancemasker (anders lift hij het kozijn boven het middelste hoofd mee)
# grootste component + ingesloten gaten tot 600 px dichten (echte openingen hangen aan de buitenrand)
lab,n=ndimage.label(hard>0.5); sizes=ndimage.sum(hard,lab,range(1,n+1)); keep=(np.argmax(sizes)+1)
hard=(lab==keep).astype(np.float32)
holes=ndimage.binary_fill_holes(hard>0.5)&~(hard>0.5)
hl,hn=ndimage.label(holes)
if hn:
    hs=ndimage.sum(holes,hl,range(1,hn+1))
    for i,s in enumerate(hs,1):
        if s<=600: hard[hl==i]=1.0

# 2. guided filter (kleur) op het harde masker, straal 5, eps klein -> alfa volgt echte randen
def box(x,r): return ndimage.uniform_filter(x,size=2*r+1,mode='nearest')
def guided(I,p,r=5,eps=1e-4):
    mI=np.stack([box(I[...,c],r) for c in range(3)],-1); mp=box(p,r)
    Ip=np.stack([box(I[...,c]*p,r) for c in range(3)],-1); covIp=Ip-mI*mp[...,None]
    cov=np.zeros((H,W,3,3),np.float32)
    for i in range(3):
        for j in range(3):
            cov[...,i,j]=box(I[...,i]*I[...,j],r)-mI[...,i]*mI[...,j]
    cov+=eps*np.eye(3,dtype=np.float32)
    a=np.einsum('...ij,...j->...i',np.linalg.inv(cov),covIp)
    b=mp-np.einsum('...i,...i->...',a,mI)
    ma=np.stack([box(a[...,c],r) for c in range(3)],-1); mb=box(b,r)
    return np.clip(np.einsum('...i,...i->...',ma,I)+mb,0,1)
q=guided(src,hard,r=5,eps=2e-4)
# alleen in de randband (12 px rond de harde rand) de geleide alfa gebruiken, daarbuiten hard
band=ndimage.binary_dilation(hard>0.5,iterations=8)&~ndimage.binary_erosion(hard>0.5,iterations=8)
alpha=np.where(band,q,hard)
# aanscherpen: overgang van 0.42..0.62 -> 0..1 (1-2 px rand op 2560 px)
alpha=np.clip((alpha-0.42)/0.20,0,1)
# losse eilandjes en microgaten na het aanscherpen
lab,n=ndimage.label(alpha>0.5); sizes=ndimage.sum(np.ones_like(alpha),lab,range(1,n+1)); keep=np.argmax(sizes)+1
alpha[(lab!=keep)&(alpha>0)]=0
holes=ndimage.binary_fill_holes(alpha>0.5)&~(alpha>0.5); hl,hn=ndimage.label(holes)
if hn:
    hs=ndimage.sum(holes,hl,range(1,hn+1))
    for i,s in enumerate(hs,1):
        if s<=600: alpha[hl==i]=1.0

# 3. kleurdecontaminatie: B = achtergrondkleur van buiten de rand naar binnen gevuld
def bleed(rgb,known,passes):
    col=rgb*known[...,None]; w=known.astype(np.float32).copy(); out=rgb.copy()
    for _ in range(passes):
        cs=ndimage.uniform_filter(col,size=(3,3,1)); ws=ndimage.uniform_filter(w,size=3)
        new=(ws>0)&(w==0); out[new]=cs[new]/ws[new][:,None]; col[new]=out[new]; w[new]=1.0
    return out
bgknown=(alpha<=0.001)&~ndimage.binary_dilation(alpha>0.001,iterations=2)
B=bleed(src,bgknown,passes=24)
fgknown=(alpha>=0.999)&~ndimage.binary_dilation(alpha<0.999,iterations=2)
Fin=bleed(src,fgknown,passes=24)
a=alpha[...,None]
F=np.where(a>0.05,(src-(1-a)*B)/np.maximum(a,0.05),Fin)
F=np.clip(F,0,1)
# in de randband de berekende F lichtjes mengen met de binnenkleur (tegen ruis), buiten de band de bron
Fout=np.where(band[...,None],0.75*F+0.25*Fin,src)
Fout=np.where(a<0.001,Fin,Fout)   # onder alfa nul: binnenkleur (kleur-bleed, geen achtergrond terug)

rgba=np.concatenate([Fout,alpha[...,None]],-1)
out=(rgba*255+0.5).astype(np.uint8)
Image.fromarray(out,'RGBA').save('cut-full.png')
ys,xs=np.where(alpha>0.5); print('bbox',xs.min(),xs.max(),ys.min(),ys.max(),'band px',band.sum(),'half-transp %',((alpha>0.004)&(alpha<0.996)).sum()/max(1,(alpha>0.004).sum())*100)
