"""Variant A2: dezelfde pijplijn als perfect_cut.py, maar op een 2x Lanczos-opgeschaalde bron (Vision-maskers op 2x),
randovergang instelbaar, daarna terug naar native. Gebruik: python3 perfect_cut2.py <schaal> <overgang_lo> <overgang_hi> <uit.png>"""
import sys, subprocess, numpy as np
from PIL import Image
from scipy import ndimage
schaal=float(sys.argv[1]); lo=float(sys.argv[2]); hi=float(sys.argv[3]); uit=sys.argv[4]
bron=Image.open('bron-67.jpg').convert('RGB')
if schaal!=1.0:
    big=bron.resize((round(bron.width*schaal),round(bron.height*schaal)),Image.LANCZOS); big.save('bron-2x.jpg',quality=95)
    subprocess.run(['../../bin/fgmask','bron-2x.jpg','fg-2x.png'],check=True); subprocess.run(['../../bin/personmask','bron-2x.jpg','person-2x.png'],check=True)
    fgp,pmp='fg-2x.png','person-2x.png'
else:
    big=bron; fgp,pmp='fg.png','person.png'
src=np.asarray(big).astype(np.float32)/255.0
fg=np.asarray(Image.open(fgp).convert('L')).astype(np.float32)/255.0
pm=np.asarray(Image.open(pmp).convert('L')).astype(np.float32)/255.0
H,W,_=src.shape; r=int(round(5*schaal)); it=int(round(6*schaal))
hard=((fg>0.5)|((pm>0.6)&ndimage.binary_dilation(fg>0.5,iterations=it))).astype(np.float32)
lab,n=ndimage.label(hard>0.5); sizes=ndimage.sum(hard,lab,range(1,n+1)); hard=(lab==(np.argmax(sizes)+1)).astype(np.float32)
holes=ndimage.binary_fill_holes(hard>0.5)&~(hard>0.5); hl,hn=ndimage.label(holes)
if hn:
    for i,s in enumerate(ndimage.sum(holes,hl,range(1,hn+1)),1):
        if s<=600*schaal*schaal: hard[hl==i]=1.0
def box(x,rr): return ndimage.uniform_filter(x,size=2*rr+1,mode='nearest')
def guided(I,p,rr,eps):
    mI=np.stack([box(I[...,c],rr) for c in range(3)],-1); mp=box(p,rr)
    Ip=np.stack([box(I[...,c]*p,rr) for c in range(3)],-1); covIp=Ip-mI*mp[...,None]
    cov=np.zeros((H,W,3,3),np.float32)
    for i in range(3):
        for j in range(3): cov[...,i,j]=box(I[...,i]*I[...,j],rr)-mI[...,i]*mI[...,j]
    cov+=eps*np.eye(3,dtype=np.float32)
    a=np.einsum('...ij,...j->...i',np.linalg.inv(cov),covIp); b=mp-np.einsum('...i,...i->...',a,mI)
    return np.clip(np.einsum('...i,...i->...',np.stack([box(a[...,c],rr) for c in range(3)],-1),I)+box(b,rr),0,1)
q=guided(src,hard,r,2e-4)
band=ndimage.binary_dilation(hard>0.5,iterations=int(8*schaal))&~ndimage.binary_erosion(hard>0.5,iterations=int(8*schaal))
alpha=np.where(band,q,hard); alpha=np.clip((alpha-lo)/(hi-lo),0,1)
lab,n=ndimage.label(alpha>0.5); sizes=ndimage.sum(np.ones_like(alpha),lab,range(1,n+1)); keep=np.argmax(sizes)+1; alpha[(lab!=keep)&(alpha>0)]=0
holes=ndimage.binary_fill_holes(alpha>0.5)&~(alpha>0.5); hl,hn=ndimage.label(holes)
if hn:
    for i,s in enumerate(ndimage.sum(holes,hl,range(1,hn+1)),1):
        if s<=600*schaal*schaal: alpha[hl==i]=1.0
def bleed(rgb,known,passes):
    col=rgb*known[...,None]; w=known.astype(np.float32).copy(); out=rgb.copy()
    for _ in range(passes):
        cs=ndimage.uniform_filter(col,size=(3,3,1)); ws=ndimage.uniform_filter(w,size=3); new=(ws>0)&(w==0)
        out[new]=cs[new]/ws[new][:,None]; col[new]=out[new]; w[new]=1.0
    return out
B=bleed(src,(alpha<=0.001)&~ndimage.binary_dilation(alpha>0.001,iterations=2),int(24*schaal))
Fin=bleed(src,(alpha>=0.999)&~ndimage.binary_dilation(alpha<0.999,iterations=2),int(24*schaal))
a=alpha[...,None]; F=np.clip(np.where(a>0.05,(src-(1-a)*B)/np.maximum(a,0.05),Fin),0,1)
Fout=np.where(band[...,None],0.75*F+0.25*Fin,src); Fout=np.where(a<0.001,Fin,Fout)
out=Image.fromarray((np.concatenate([Fout,alpha[...,None]],-1)*255+0.5).astype(np.uint8),'RGBA')
if schaal!=1.0: out=out.resize(bron.size,Image.LANCZOS)
out.save(uit); al=np.asarray(out)[...,3]; print(uit,'half-transp %',((al>1)&(al<254)).sum()/max(1,(al>1).sum())*100)
