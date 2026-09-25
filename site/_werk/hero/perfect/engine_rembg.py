import sys, time, os
os.environ.setdefault('U2NET_HOME', os.path.expanduser('~/.u2net'))
from PIL import Image
model=sys.argv[1]
print('start',model,flush=True)
from rembg import new_session, remove
t=time.time(); sess=new_session(model); print('sessie',f'{time.time()-t:.0f}s',flush=True)
src=Image.open('bron-67.jpg').convert('RGB')
t=time.time(); out=remove(src,session=sess,only_mask=True,post_process_mask=False)
out.save(f'mask-{model}.png'); print(model,'ok',out.size,f'{time.time()-t:.0f}s',flush=True)
