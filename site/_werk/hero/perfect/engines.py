"""Variant B (rembg: birefnet-general en isnet-general-use) en C (pymatting closed-form op trimap uit Vision) voor foto 67.
Draait onder /usr/bin/python3 (3.9) waar rembg en pymatting geinstalleerd zijn. Schrijft alpha-maskers als png (L) op bronresolutie."""
import sys, time, numpy as np
from PIL import Image
src=Image.open('bron-67.jpg').convert('RGB'); arr=np.asarray(src)
t=time.time()
try:
    from rembg import new_session, remove
    for model in ('birefnet-general','isnet-general-use'):
        try:
            t=time.time(); sess=new_session(model)
            out=remove(src,session=sess,only_mask=True,post_process_mask=False)
            out.save(f'mask-{model}.png'); print(model,'ok',out.size,f'{time.time()-t:.0f}s',flush=True)
        except Exception as e: print(model,'FOUT',repr(e)[:200],flush=True)
except Exception as e: print('rembg FOUT',repr(e)[:200],flush=True)
try:
    from pymatting import estimate_alpha_cf, estimate_foreground_ml
    from scipy import ndimage
    fg=np.asarray(Image.open('fg.png').convert('L'))>128
    pm=np.asarray(Image.open('person.png').convert('L'))>150
    hard=fg|(pm&ndimage.binary_dilation(fg,iterations=6))
    lab,n=ndimage.label(hard); sizes=ndimage.sum(hard,lab,range(1,n+1)); hard=lab==(np.argmax(sizes)+1)
    sure_fg=ndimage.binary_erosion(hard,iterations=7); sure_bg=~ndimage.binary_dilation(hard,iterations=9)
    trimap=np.full(hard.shape,0.5,np.float64); trimap[sure_fg]=1.0; trimap[sure_bg]=0.0
    # closed-form op halve resolutie voor geheugen/tijd, daarna terug (trimap-band is ~16 px op vol formaat)
    sc=0.5; small=src.resize((round(src.width*sc),round(src.height*sc)),Image.LANCZOS)
    tri_s=np.asarray(Image.fromarray((trimap*255).astype(np.uint8)).resize(small.size,Image.NEAREST)).astype(np.float64)/255.0
    tri_s[(tri_s>0.1)&(tri_s<0.9)]=0.5
    img=np.asarray(small).astype(np.float64)/255.0
    t=time.time(); alpha=estimate_alpha_cf(img,tri_s); print('closed-form ok',f'{time.time()-t:.0f}s',flush=True)
    F=estimate_foreground_ml(img,alpha); print('foreground ok',flush=True)
    A=Image.fromarray((np.clip(alpha,0,1)*255).astype(np.uint8)).resize(src.size,Image.LANCZOS); A.save('mask-closedform.png')
    Fi=Image.fromarray((np.clip(F,0,1)*255).astype(np.uint8)).resize(src.size,Image.LANCZOS); Fi.save('fgcolor-closedform.png')
except Exception as e: print('pymatting FOUT',repr(e)[:300],flush=True)
