"""Keyt de duo-platen (magenta), cropt naar heupen, exporteert webp (1100 en 700 breed, zoals het figuur-tafel-slot),
en bouwt een contactvel: plaat | cutout op navy (venster-blok) | op creme | 200% van het armgat. Gebruik: python3 verwerk_61.py"""
import glob, os, subprocess, numpy as np
from PIL import Image
def comp(img,bg): B=Image.new('RGBA',img.size,bg); B.alpha_composite(img); return B.convert('RGB')
vel=[]
for f in sorted(glob.glob('out/duo61-*.jpg')):
    n=os.path.basename(f).split('.')[0]
    plaat=Image.open(f).convert('RGB'); a=np.asarray(plaat).astype(int); nonmag=~((a[...,0]>200)&(a[...,1]<80)&(a[...,2]>200))
    rand=[nonmag[:8].mean()*100, nonmag[:, :8].mean()*100, nonmag[:, -8:].mean()*100]
    r=subprocess.run(['python3','../../cut_situatie.py',f,f'cut/{n}.png','--margin','30'],capture_output=True,text=True); print(n, 'rand %.1f/%.1f/%.1f'%tuple(rand), r.stdout.strip().splitlines()[-1][:120])
    im=Image.open(f'cut/{n}.png').convert('RGBA'); al=np.asarray(im)[...,3]; ys,xs=np.where(al>8)
    c=im.crop((max(0,xs.min()-6),max(0,ys.min()-6),min(im.width,xs.max()+7),im.height)); c.save(f'cut/{n}-heup.png')
    for w in (1100,700): c.resize((w,round(c.height*w/c.width)),Image.LANCZOS).save(f'cut/{n}-{w}.webp','WEBP',quality=88,method=6)
    t=[plaat.copy(), comp(c,(34,49,78)), comp(c,(246,244,236))]
    for x in t: x.thumbnail((560,560))
    W,H=c.size; z=comp(c,(246,244,236)).crop((int(W*0.3),int(H*0.35),int(W*0.8),int(H*0.9))); z=z.resize((560,round(z.height*560/z.width)))
    row=Image.new('RGB',(4*568,max(x.height for x in t+[z])),(255,0,255)); x0=0
    for x in t+[z]: row.paste(x,(x0,0)); x0+=568
    vel.append(row)
S=Image.new('RGB',(4*568,sum(r.height for r in vel)+10*len(vel)),(255,0,255)); y=0
for r in vel: S.paste(r,(0,y)); y+=r.height+10
S.save('contactvel-61.jpg',quality=82); print('contactvel',S.size)
