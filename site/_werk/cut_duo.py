"""Cutout van een gegenereerde magenta-plaat: macOS Vision-voorgrondmasker (alle instanties) + chroma-gap-fix
binnen het masker (kleurafstand tot de gemeten randkleur, alleen magenta-achtige pixels) + de-spill op randpixels
+ kleur-bleed onder alfa 0 + magenta-klodders binnen het subject neutraliseren. Schrijft <out>.png (RGBA, gecropt
met marge) en <out>-check.jpg (composiet op donker). Gebruik: python3 cut_duo.py <in.jpg> <out.png> [--margin 24]"""
import os, sys, subprocess, tempfile
import numpy as np
from PIL import Image
from scipy import ndimage
HERE=os.path.dirname(os.path.abspath(__file__)); BIN=os.path.join(HERE,'bin'); os.makedirs(BIN,exist_ok=True)
def tool(name):
    exe=os.path.join(BIN,name)
    if not os.path.exists(exe): subprocess.run(['swiftc','-O',os.path.join(HERE,name+'.swift'),'-o',exe],check=True)
    return exe
def fgmask(src):
    with tempfile.TemporaryDirectory() as tmp:
        fg=os.path.join(tmp,'fg.png'); subprocess.run([tool('fgmask'),src,fg],check=True,capture_output=True)
        return np.asarray(Image.open(fg).convert('L')).astype(np.float32)/255.0
def bleed(rgb,known,passes=14):
    col=rgb*known[...,None]; w=known.astype(np.float32).copy(); out=rgb.copy()
    for _ in range(passes):
        cs=ndimage.uniform_filter(col,size=(3,3,1)); ws=ndimage.uniform_filter(w,size=3)
        new=(ws>0)&(w==0); out[new]=(cs[new]/ws[new][:,None]); col[new]=out[new]; w[new]=1.0
    return out
def main():
    a=sys.argv[1:]; src,out=a[0],a[1]; margin=int(a[a.index('--margin')+1]) if '--margin' in a else 24
    im=Image.open(src).convert('RGB'); rgb=np.asarray(im).astype(np.float32); H,W,_=rgb.shape
    border=np.concatenate([rgb[:12].reshape(-1,3),rgb[-12:].reshape(-1,3),rgb[:,:12].reshape(-1,3),rgb[:,-12:].reshape(-1,3)])
    bg=np.median(border,axis=0); R,G,B=rgb[...,0],rgb[...,1],rgb[...,2]
    magentaish=(R>G+40)&(B>G+40)
    ssum=np.maximum(rgb.sum(axis=2),1.0); chroma=rgb/ssum[...,None]; bgc=bg/max(bg.sum(),1.0)
    dc=np.linalg.norm(chroma-bgc,axis=2)                      # chromaticiteitsafstand, ongevoelig voor schaduw op de magenta
    ramp=np.clip((dc-0.05)/0.09,0,1)                          # <=0.05 achtergrond, >=0.14 onderwerp
    alpha=np.where(magentaish,ramp,1.0).astype(np.float32)
    # tint-key: alles met de tint van de achtergrond (hue binnen 30 graden) en verzadiging >= 0.35 is achtergrond,
    # ook als het veel donkerder is (grondschaduw die het model onder de wagen tekent). Zwarte polo's zijn onverzadigd en blijven.
    hsv=np.asarray(Image.fromarray(np.clip(rgb,0,255).astype(np.uint8)).convert('HSV')).astype(np.float32)
    hue=hsv[...,0]*360/255; sat=hsv[...,1]/255
    bgh=float(np.asarray(Image.fromarray(np.clip(bg,0,255).astype(np.uint8).reshape(1,1,3)).convert('HSV'))[0,0,0])*360.0/255.0
    dh=np.abs((hue-bgh+180)%360-180)
    tint=np.clip((30-dh)/8,0,1)*np.clip((sat-0.30)/0.10,0,1)      # zacht: 1 = zeker achtergrondtint
    alpha=np.minimum(alpha,1-tint)
    if '--fg' in a:   # Vision-voorgrondinstanties: alles wat NIET tot een instantie hoort (studioplaat, wand) valt weg
        v=fgmask(src)
        if v.shape!=(H,W): v=np.asarray(Image.fromarray((v*255).astype(np.uint8)).resize((W,H),Image.BILINEAR)).astype(np.float32)/255
        gate=ndimage.gaussian_filter(ndimage.binary_dilation(v>0.35,iterations=12).astype(np.float32),3.0)
        weg=float(((alpha>0.5)&(gate<0.5)).sum())
        alpha=np.minimum(alpha,np.clip(gate,0,1)); print(f'  Vision-gate: {int(weg)} px buiten de voorgrondinstanties verwijderd')
    # eilandjes-wisser: losse alfa-eilandjes kleiner dan 150 px weg
    lab,n=ndimage.label(alpha>0.3)
    if n>1:
        sizes=ndimage.sum(alpha>0.3,lab,range(1,n+1)); small=np.isin(lab,[i+1 for i,sz in enumerate(sizes) if sz<150]); alpha[small]=0
    # 1px eroderen + lichte feather
    hard=alpha>0.5; er=ndimage.binary_erosion(hard,iterations=1); alpha=np.where(hard&~er,alpha*0.5,alpha); alpha=ndimage.gaussian_filter(alpha,0.7)
    alpha=np.clip(alpha,0,1)
    # de-spill: randpixels + ring van 4px rond gaten; alleen magenta-achtig
    edge=(alpha>0.02)&(alpha<0.98); holes=alpha<=0.02; ring=ndimage.binary_dilation(holes,iterations=4)&(alpha>0.02)
    zone=((edge|ring)&(R>G)&(B>G))|((R>G+40)&(B>G+40))
    exc=np.minimum(R,B)-G; Rn=R-exc*0.9; Bn=B-exc*0.9; rgb2=rgb.copy(); rgb2[...,0]=np.where(zone,Rn,R); rgb2[...,2]=np.where(zone,Bn,B)
    # felle klodders binnen het subject
    blob=(alpha>0.25)&(R>G+70)&(B>G+70)&~zone
    if blob.any():
        blur=ndimage.gaussian_filter(rgb2,sigma=(6,6,0)); rgb2[blob]=blur[blob]
    # kleur-bleed onder alfa 0
    known=alpha>0.05; rgb2=bleed(rgb2,known,14)
    a8=(alpha*255).astype(np.uint8); ys,xs=np.where(a8>8)
    x0,y0,x1,y1=max(xs.min()-margin,0),max(ys.min()-margin,0),min(xs.max()+margin+1,W),min(ys.max()+margin+1,H)
    rgba=Image.fromarray(np.dstack([np.clip(rgb2,0,255).astype(np.uint8),a8])).crop((x0,y0,x1,y1)); rgba.save(out,optimize=True)
    soft=((a8>8)&(a8<247)).sum(); cov=(a8>8).sum(); touch=[s for s,v in (('links',xs.min()==0),('rechts',xs.max()==W-1),('boven',ys.min()==0)) if v]
    print(f'{os.path.basename(out)}: bg {bg.astype(int).tolist()} {rgba.size[0]}x{rgba.size[1]} bbox {(x0,y0,x1,y1)} zachte rand {100*soft/max(cov,1):.1f}% klodders {int(blob.sum())} raakt rand: {touch or "nee"}')
    chk=Image.new('RGBA',rgba.size,(34,34,36,255)); chk.alpha_composite(rgba); c=chk.convert('RGB'); c.thumbnail((1400,1400)); c.save(out.replace('.png','-check.jpg'),quality=88)
if __name__=='__main__': main()
