"""Cutout van een echte foto met macOS Vision.
Gebruik: python3 cutout.py <in.jpg> <out.png> [--persons-only] [--min-prop 15000] [--margin 40]
Alfa = Vision-voorgrondmasker (alle instanties), gegate met het persoonsmasker (gedilateerd) plus
niet-persoon-componenten groter dan --min-prop px (props zoals doos, kruk, bord). Kleine niet-persoon-
componenten (muuropeningen tussen arm en romp) vallen weg. Print dekkingsmeting van de zachte rand.
Swift-tools worden bij eerste gebruik gecompileerd naar tools/bin/ (niet committen)."""
import os, sys, subprocess, tempfile
import numpy as np
from PIL import Image
from scipy import ndimage
HERE=os.path.dirname(os.path.abspath(__file__)); BIN=os.path.join(HERE,'bin'); os.makedirs(BIN,exist_ok=True)
def tool(name):
    exe=os.path.join(BIN,name)
    if not os.path.exists(exe):
        subprocess.run(['swiftc','-O',os.path.join(HERE,name+'.swift'),'-o',exe],check=True)
    return exe
def masks(src,tmp):
    fg=os.path.join(tmp,'fg.png'); pe=os.path.join(tmp,'person.png')
    subprocess.run([tool('fgmask'),src,fg],check=True,capture_output=True); subprocess.run([tool('personmask'),src,pe],check=True,capture_output=True)
    return (np.array(Image.open(fg).convert('L')).astype(float)/255.0, np.array(Image.open(pe).convert('L')).astype(float)/255.0)
def main():
    a=sys.argv[1:]; src,out=a[0],a[1]; persons_only='--persons-only' in a
    minprop=int(a[a.index('--min-prop')+1]) if '--min-prop' in a else 15000
    margin=int(a[a.index('--margin')+1]) if '--margin' in a else 40
    im=Image.open(src).convert('RGB')
    with tempfile.TemporaryDirectory() as tmp: fg,pe=masks(src,tmp)
    if persons_only:
        alpha=np.clip(pe,0,1)
    else:
        rest=(fg>0.5)&(pe<=0.4); lab,n=ndimage.label(rest); sizes=ndimage.sum(rest,lab,range(1,n+1))
        big=[i+1 for i,s in enumerate(sizes) if s>=minprop]; props=np.isin(lab,big)
        kept=[int(sizes[i-1]) for i in big]; dropped=sorted([int(s) for s in sizes if 1500<s<minprop],reverse=True)[:6]
        gate=ndimage.binary_dilation(pe>0.35,iterations=22)|ndimage.binary_dilation(props,iterations=22)
        alpha=np.clip(fg*ndimage.gaussian_filter(gate.astype(float),4.0),0,1)
        print(f'props gehouden {kept}; weggelaten (px) {dropped}')
    a8=(alpha*255).astype(np.uint8); ys,xs=np.where(a8>8)
    x0,y0,x1,y1=max(xs.min()-margin,0),max(ys.min()-margin,0),min(xs.max()+margin,im.width),min(ys.max()+margin,im.height)
    rgba=Image.fromarray(np.dstack([np.array(im),a8]).astype(np.uint8)).crop((x0,y0,x1,y1)); rgba.save(out,optimize=True)
    soft=((a8>8)&(a8<247)).sum(); cov=(a8>8).sum()
    print(f'{os.path.basename(out)}: {rgba.size[0]}x{rgba.size[1]} bbox {(x0,y0,x1,y1)} zachte rand {100*soft/max(cov,1):.1f}% gem. alfa {a8[(a8>8)&(a8<247)].mean():.0f}')
    chk=Image.new('RGBA',rgba.size,(34,34,36,255)); chk.alpha_composite(rgba); c=chk.convert('RGB'); c.thumbnail((1400,1400)); c.save(out.replace('.png','-check.jpg'),quality=86)
if __name__=='__main__': main()
