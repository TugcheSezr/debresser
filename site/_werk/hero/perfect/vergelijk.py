"""Bouwt vergelijk.html: per cutout-variant van foto 67 het figuur op de echte hero-achtergrond op 1:1 (420 px hoog, zoals de
CSS) en 200%-uitsnedes van de randen (hoofden, schouder, duim) op licht, donker en hero. Gebruik: python3 vergelijk.py"""
import json, os, numpy as np
from PIL import Image
VAR=json.load(open('varianten.json'))   # [{id, bestand(png RGBA, heupcrop), label, uitleg}]
hero=Image.open('../../../assets/img/hero-bg-1920.webp').convert('RGB')
def comp(img,bg): B=Image.new('RGBA',img.size,bg); B.alpha_composite(img); return B.convert('RGB')
def comp_hero(img):
    bg=hero.resize((img.width, round(hero.height*img.width/hero.width))).crop((0,0,img.width,img.height)).convert('RGBA'); bg=Image.eval(bg,lambda v:int(v*0.55)); bg.alpha_composite(img); return bg.convert('RGB')
def halo(img):
    a=np.asarray(img).astype(np.float32); al=a[...,3]/255; rgb=a[...,:3]
    from scipy import ndimage
    edge=(al>0.05)&(al<0.6); inner=(al>0.95)&ndimage.binary_dilation(al<0.95,iterations=3)
    return float(rgb[edge].mean()) if edge.any() else 0, float(rgb[inner].mean()), int(edge.sum()), int(((al>0.004)&(al<0.996)).sum())
os.makedirs('vgl',exist_ok=True); kaarten=[]
for v in VAR:
    im=Image.open(v['bestand']).convert('RGBA'); W,H=im.size
    # 1:1 op hero: figuur 420 px hoog op een 1440x520 uitsnede van de hero-bg (met veil)
    sc=420/H; fig=im.resize((round(W*sc),420),Image.LANCZOS)
    bg=hero.resize((1440,960)).crop((0,300,1440,820)).convert('RGBA'); bg=Image.eval(bg,lambda x:int(x*0.55))
    bg.alpha_composite(fig,((1440-fig.width)//2,520-420-24)); bg.convert('RGB').save(f"vgl/{v['id']}-hero.jpg",quality=90)
    zones=[('hoofd links',(int(W*0.05),0,int(W*0.33),int(H*0.40))),('hoofd midden',(int(W*0.36),0,int(W*0.64),int(H*0.40))),('hoofd rechts',(int(W*0.66),0,int(W*0.97),int(H*0.40))),('duim links',(0,int(H*0.5),int(W*0.3),H)),('arm rechts',(int(W*0.7),int(H*0.45),W,H))]
    cr=[]
    for zn,b in zones:
        row=[]
        for bgn,f in (('licht',lambda i: comp(i,(246,244,236))),('donker',lambda i: comp(i,(18,30,26))),('hero',comp_hero)):
            c=f(im).crop(b); c=c.resize((c.width*2,c.height*2),Image.NEAREST); row.append(c)
        w=sum(c.width for c in row)+16; h=max(c.height for c in row); S=Image.new('RGB',(w,h),(255,0,255)); x=0
        for c in row: S.paste(c,(x,0)); x+=c.width+8
        fn=f"vgl/{v['id']}-{zn.replace(' ','-')}.jpg"; S.save(fn,quality=88); cr.append((zn,fn))
    hr=halo(im); v['meting']=f"randring {hr[0]:.0f} vs binnen {hr[1]:.0f}, {hr[2]} zachte randpixels, {hr[3]} halftransparant"
    kaarten.append((v,cr))
html=['<!doctype html><html lang="nl"><meta charset="utf-8"><title>Hero-cutout 67: varianten</title><style>body{font:15px/1.5 -apple-system,Helvetica,Arial;margin:0;padding:24px;background:#F6F4EC;color:#1D1D1B}h1{font-size:22px}h2{font-size:18px;margin:36px 0 6px}img{max-width:100%;height:auto;display:block;border-radius:6px}.hero{margin:8px 0 12px}.crops{display:grid;grid-template-columns:1fr 1fr;gap:10px}.crops figure{margin:0}.crops figcaption{font-size:12px;color:#4B4B49;margin-top:2px}.badge{display:inline-block;background:#EE7203;color:#1D1D1B;font-weight:700;padding:4px 10px;border-radius:999px;margin-right:8px}.meting{font-size:13px;color:#4B4B49}</style>',
      '<h1>Hero-cutout van foto 67: kies een variant</h1><p>Per variant: het figuur op 1:1 in de hero (420 px hoog, zoals op de site) en 200%-uitsnedes van de randen op licht, donker en op de hero-achtergrond. Zeg het nummer.</p>']
for v,cr in kaarten:
    html.append(f"<h2><span class=badge>{v['id']}</span>{v['label']}</h2><p>{v['uitleg']}</p><p class=meting>Meting: {v['meting']}</p><img class=hero src=\"vgl/{v['id']}-hero.jpg\" alt=\"\"><div class=crops>"+''.join(f"<figure><img src=\"{fn}\" loading=lazy alt=\"\"><figcaption>{zn}: links licht, midden donker, rechts hero (200%)</figcaption></figure>" for zn,fn in cr)+"</div>")
open('vergelijk.html','w').write('\n'.join(html)); print('vergelijk.html', len(kaarten),'varianten')
for v in VAR: print(v['id'], v['meting'])
