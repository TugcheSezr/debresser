"""Keyt de gegenereerde trio-platen (magenta) met cut_situatie.py, controleert randcontact en gaten, cropt naar heupen,
exporteert webp (native + 900), bouwt een contactvel (plaat, cutout op donker, cutout op hero, 200%-uitsnede van de armgaten)
en schrijft kandidaten voor de keuzepagina (ids 67-G1..). Gebruik: python3 verwerk_67.py"""
import glob, os, json, subprocess, numpy as np
from PIL import Image
hero=Image.open('../../../assets/img/hero-bg-1920.webp').convert('RGB')
def comp(img,bg): B=Image.new('RGBA',img.size,bg); B.alpha_composite(img); return B.convert('RGB')
def comp_hero(img):
    bg=hero.resize((img.width, round(hero.height*img.width/hero.width))).crop((0,0,img.width,img.height)).convert('RGBA'); bg=Image.eval(bg,lambda v:int(v*0.55)); bg.alpha_composite(img); return bg.convert('RGB')
kand=[]; vel=[]
for f in sorted(glob.glob('out/trio67-*.jpg')):
    n=os.path.basename(f).split('.')[0]; k=n.split('-')[1]
    plaat=Image.open(f).convert('RGB'); a=np.asarray(plaat).astype(int)
    mag=((a[...,0]>200)&(a[...,1]<80)&(a[...,2]>200)); nonmag=~mag
    rand=[nonmag[:8].mean()*100, nonmag[:, :8].mean()*100, nonmag[:, -8:].mean()*100]
    r=subprocess.run(['python3','../../cut_situatie.py',f,f'cut/{n}.png','--margin','30'],capture_output=True,text=True); print(n, r.stdout.strip().splitlines()[-1][:160])
    im=Image.open(f'cut/{n}.png').convert('RGBA'); al=np.asarray(im)[...,3]; ys,xs=np.where(al>8)
    c=im.crop((max(0,xs.min()-6),max(0,ys.min()-6),min(im.width,xs.max()+7),im.height)); w=c.width
    c.save(f'cut/{n}-heup.png'); c.save(f'cut/{n}-{w}.webp','WEBP',quality=88,method=6); c.resize((900,round(c.height*900/w)),Image.LANCZOS).save(f'cut/{n}-900.webp','WEBP',quality=88,method=6)
    plaat.thumbnail((1600,1600)); plaat.save(f'cut/{n}-plaat.jpg',quality=85)
    # contactvel-rij: plaat | donker | hero | 200% middenstrook (armgaten)
    t=[plaat.copy(), comp(c,(18,30,26)), comp_hero(c)]
    for i in range(3): t[i].thumbnail((640,640))
    W,H=c.size; z=comp(c,(246,244,236)).crop((int(W*0.25),int(H*0.35),int(W*0.75),int(H*0.85))); z=z.resize((640,round(z.height*640/z.width)))
    row=Image.new('RGB',(4*648,max(x.height for x in t+[z])),(255,0,255)); x0=0
    for x in t+[z]: row.paste(x,(x0,0)); x0+=648
    vel.append(row)
    kand.append({'id':f'67-G{int(k)}','bron':'Nano Banana Pro 2K 16:9 op magenta, gezichten/kleding/houding van de drie mannen uit foto 67 als referentie, chroma-key','origineel':f'/_werk/hero/ai67/cut/{n}-plaat.jpg','cutout1600':f'/_werk/hero/ai67/cut/{n}-{w}.webp','cutout900':f'/_werk/hero/ai67/cut/{n}-900.webp','breedte':w,'hoogte':c.height,'personen':3,
                 'omschrijving':f'Gegenereerde versie van het trio ({n}): zelfde mannen, kleding en duim-omhoog, maar op een egale plaat zodat de uitsnede tussen armen en lijven schoon is.',
                 'opmerking':f'Randcontact boven/links/rechts {rand[0]:.1f}/{rand[1]:.1f}/{rand[2]:.1f}%. Gelijkenis en borstprint op 100% controleren; gegenereerd beeld met de echte gezichten van drie Top Movers-medewerkers (portretrecht: bevestiging klant nodig voor livegang).'})
S=Image.new('RGB',(4*648,sum(r.height for r in vel)+10*len(vel)),(255,0,255)); y=0
for r in vel: S.paste(r,(0,y)); y+=r.height+10
S.save('contactvel-67.jpg',quality=82); json.dump(kand,open('kandidaten-67.json','w'),ensure_ascii=False,indent=1); print('contactvel', S.size, len(kand),'kandidaten')
