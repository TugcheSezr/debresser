"""NBP-generatie via REST. Key UITSLUITEND uit env GEMINI_API_KEY. Gebruik: python3 gen.py jobs.json"""
import os, sys, json, base64, time, mimetypes, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
KEY=os.environ['GEMINI_API_KEY']
MODEL=os.environ.get('NBP_MODEL','gemini-3-pro-image-preview')
def run(job):
    name=job['name']; parts=[{'text':job['prompt']}]
    for r in job.get('refs',[]):
        mt=mimetypes.guess_type(r)[0] or 'image/png'
        parts.append({'inline_data':{'mime_type':mt,'data':base64.b64encode(open(r,'rb').read()).decode()}})
    body={'contents':[{'parts':parts}],'generationConfig':{'responseModalities':['IMAGE'],'imageConfig':{'aspectRatio':job.get('aspect','3:2'),'imageSize':job.get('size','2K')}}}
    req=urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent',data=json.dumps(body).encode(),headers={'Content-Type':'application/json','x-goog-api-key':KEY})
    for attempt in range(3):
        t=time.time()
        try:
            with urllib.request.urlopen(req,timeout=300) as resp: d=json.load(resp)
            outs=[]
            for i,p in enumerate(d.get('candidates',[{}])[0].get('content',{}).get('parts',[])):
                if 'inlineData' in p:
                    ext='.png' if 'png' in p['inlineData']['mimeType'] else '.jpg'
                    fn=os.path.join('out',f"{name}{'' if not outs else '-'+str(len(outs))}{ext}")
                    open(fn,'wb').write(base64.b64decode(p['inlineData']['data'])); outs.append(fn)
            if not outs: return f"{name}: GEEN BEELD ({json.dumps(d)[:300]})"
            return f"{name}: {outs} {time.time()-t:.0f}s"
        except urllib.error.HTTPError as e:
            msg=e.read().decode()[:300]
            if e.code in (429,500,503) and attempt<2: time.sleep(15*(attempt+1)); continue
            return f"{name}: HTTP {e.code} {msg}"
        except Exception as e:
            if attempt<2: time.sleep(10); continue
            return f"{name}: FOUT {e}"
jobs=json.load(open(sys.argv[1]))
with ThreadPoolExecutor(max_workers=4) as ex:
    for r in ex.map(run,jobs): print(r, flush=True)
