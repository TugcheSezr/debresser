#!/usr/bin/env python3
"""Compacte SVG's uit de potrace-lagen: transform ingebakken, coördinaten op 1 decimaal, relatieve commando's
zonder overbodige tekens. Gebruik: python3 minify_trace.py <opttol> ; schrijft naar ./kand-<opttol>/"""
import re, subprocess, sys, pathlib
O = sys.argv[1]; S = int(sys.argv[2]) if len(sys.argv)>2 else 4; P = int(sys.argv[3]) if len(sys.argv)>3 else 1; out = pathlib.Path(f"kand-{S}-{O}" + ("-int" if P==0 else "")); out.mkdir(exist_ok=True)
def lagen(S):
    if pathlib.Path(f"laag{S}-teal.pbm").exists(): return
    from PIL import Image; import numpy as np
    im=Image.open("/Users/shahabmorshedian/website-kieviet/topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-RGB.png").convert("RGBA")
    big=im.resize((im.width*S, im.height*S), Image.BICUBIC) if S>1 else im
    a=np.array(big).astype(int); alpha=a[:,:,3]; g=a[:,:,1]
    for name,mask in [("zwart",(alpha>=128)&(g<=60)),("teal",(alpha>=128)&(g>60))]:
        Image.fromarray(((~mask)*255).astype(np.uint8)).save(f"laag{S}-{name}.pbm")
lagen(S)
def trace(laag):
    subprocess.run(["potrace","-s","-r",str(72*S),"-t",str(max(1,S*2)),"-a","1.0","-O",O,"-u","10","-o",str(out/f"{laag}.svg"),f"laag{S}-{laag}.pbm"],check=True)
    s=(out/f"{laag}.svg").read_text()
    tf=re.search(r'transform="translate\(([-\d.]+),([-\d.]+)\) scale\(([-\d.]+),([-\d.]+)\)"',s)
    tx,ty,sx,sy=map(float,tf.groups())
    paths=re.findall(r'<path d="([^"]+)"/>',s,re.S)
    return [(tx,ty,sx,sy,d) for d in paths]
def fmt(t):  # tienden-integer -> kortste notatie
    neg = t<0; t=abs(t); s = str(t//10) if t%10==0 else f"{t//10}.{t%10}"
    if s.startswith("0."): s=s[1:]
    return ("-" if neg else "")+s
def join(nums):
    o=""
    for n in nums:
        f=fmt(n); o += f if (not o or f[0]=="-") else " "+f
    return o
def compact(tx,ty,sx,sy,d):
    toks=re.findall(r'[MmCcLlZz]|-?\d+(?:\.\d+)?', d); i=0; cmd=None; cx=cy=0.0; out=[]; cur=None
    def T(x,y): return (round((x*sx+tx)*10), round((y*sy+ty)*10)) if P==1 else (round(x*sx+tx)*10, round(y*sy+ty)*10)   # tienden in 813x387-ruimte, of hele px
    while i<len(toks):
        t=toks[i]
        if t in "MmCcLlZz": cmd=t; i+=1
        if cmd is None: raise SystemExit(f"getal zonder commando bij {i}")
        if cmd in "zZ":
            out.append("z"); cx,cy=start; cur=T(cx,cy); cmd=None; continue
        if cmd=="M":
            cx,cy=float(toks[i]),float(toks[i+1]); i+=2; start=(cx,cy); cur=T(cx,cy); out.append("M"+join(cur)); cmd="l"; continue
        if cmd=="m":   # potrace: relatieve verplaatsing naar de volgende subpath, t.o.v. het startpunt van de vorige
            cx+=float(toks[i]); cy+=float(toks[i+1]); i+=2; start=(cx,cy); cur=T(cx,cy); out.append("M"+join(cur)); cmd="l"; continue
        if cmd=="c":
            v=[float(x) for x in toks[i:i+6]]; i+=6
            p1=T(cx+v[0],cy+v[1]); p2=T(cx+v[2],cy+v[3]); p3=T(cx+v[4],cy+v[5]); cx+=v[4]; cy+=v[5]
            rel=[p1[0]-cur[0],p1[1]-cur[1],p2[0]-cur[0],p2[1]-cur[1],p3[0]-cur[0],p3[1]-cur[1]]; cur=p3
            out.append("c"+join(rel)); continue
        if cmd=="l":
            v=[float(x) for x in toks[i:i+2]]; i+=2
            p=T(cx+v[0],cy+v[1]); cx+=v[0]; cy+=v[1]; rel=[p[0]-cur[0],p[1]-cur[1]]; cur=p
            out.append("l"+join(rel)); continue
        raise SystemExit(f"onbekend token {t!r} bij {i}")
    return "".join(out)
zw=[compact(*p) for p in trace("zwart")]; te=[compact(*p) for p in trace("teal")]
svg=lambda vb,groups: f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'+"".join(f'<path fill="{f}" d="{"".join(ps)}"/>' for f,ps in groups)+'</svg>'
(out/"logo-topmovers.svg").write_text(svg("0 0 813 387",[("#000000",zw),("#009FB4",te)]))
(out/"logo-topmovers-wit.svg").write_text(svg("0 0 813 387",[("#FFFFFF",zw+te)]))
for name,fill in [("mark","#00A19B"),("mark-teal","#00A19B"),("mark-wit","#FFFFFF")]:
    (out/f"{name}.svg").write_text(svg("0 162 813 225",[(fill,te)]))
print(f"S={S} O={O}: logo {(out/'logo-topmovers.svg').stat().st_size} B, mark {(out/'mark-teal.svg').stat().st_size} B, segmenten {sum(p.count('c')+p.count('l') for p in zw+te)}")
