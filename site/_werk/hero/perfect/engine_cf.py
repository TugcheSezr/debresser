import time, numpy as np
from PIL import Image
from scipy import ndimage
from pymatting import estimate_alpha_cf, estimate_foreground_ml
src=Image.open('bron-67.jpg').convert('RGB')
fg=np.asarray(Image.open('fg.png').convert('L'))>128; pm=np.asarray(Image.open('person.png').convert('L'))>150
hard=fg|(pm&ndimage.binary_dilation(fg,iterations=6))
lab,n=ndimage.label(hard); sizes=ndimage.sum(hard,lab,range(1,n+1)); hard=lab==(np.argmax(sizes)+1)
sure_fg=ndimage.binary_erosion(hard,iterations=7); sure_bg=~ndimage.binary_dilation(hard,iterations=9)
trimap=np.full(hard.shape,0.5); trimap[sure_fg]=1.0; trimap[sure_bg]=0.0
sc=0.5; small=src.resize((round(src.width*sc),round(src.height*sc)),Image.LANCZOS)
tri_s=np.asarray(Image.fromarray((trimap*255).astype(np.uint8)).resize(small.size,Image.NEAREST)).astype(np.float64)/255.0
tri_s[(tri_s>0.1)&(tri_s<0.9)]=0.5
img=np.asarray(small).astype(np.float64)/255.0
print('start closed-form', small.size, 'onbekend px', int((tri_s==0.5).sum()), flush=True)
t=time.time(); alpha=estimate_alpha_cf(img,tri_s); print('closed-form ok',f'{time.time()-t:.0f}s',flush=True)
t=time.time(); F=estimate_foreground_ml(img,alpha); print('foreground ok',f'{time.time()-t:.0f}s',flush=True)
Image.fromarray((np.clip(alpha,0,1)*255).astype(np.uint8)).resize(src.size,Image.LANCZOS).save('mask-closedform.png')
Image.fromarray((np.clip(F,0,1)*255).astype(np.uint8)).resize(src.size,Image.LANCZOS).save('fgcolor-closedform.png'); print('klaar',flush=True)
