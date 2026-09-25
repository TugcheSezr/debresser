#!/usr/bin/env python3
"""Bouwt de lokale beslispagina voor de livegang-audit van De Kievit.

    python3 maak.py            # schrijft index.html in deze map
Draaien: python3 -m http.server 4751 --directory site/_werk/besluiten
De keuzes blijven in localStorage staan en zijn met een knop als tekst te kopieren.
"""
import html, io, json, pathlib

BESLUITEN = []          # wordt gevuld door data.py
exec((pathlib.Path(__file__).parent / "data.py").read_text(encoding="utf-8"))

KOP = """<title>Livegang De Kievit: beslissingen</title>
<style>
:root{--ink:#1d2b1a;--pap:#faf7f0;--lijn:#ddd5c6;--groen:#00706b;--geel:#f5c518;--rood:#a8321e;--grijs:#6b6558}
*{box-sizing:border-box}
body{margin:0;background:var(--pap);color:var(--ink);font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
header{position:sticky;top:0;z-index:5;background:var(--ink);color:var(--pap);padding:1rem 1.4rem;
  display:flex;gap:1rem;align-items:baseline;flex-wrap:wrap;box-shadow:0 2px 12px rgba(0,0,0,.18)}
header h1{margin:0;font-size:1.15rem;letter-spacing:.01em}
header .tel{margin-left:auto;font-size:.9rem;opacity:.85}
main{max-width:none;padding:1.4rem}
.wrap{max-width:1080px;margin:0 auto}
.groep{margin:2rem 0 .6rem;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--grijs)}
.kaart{background:#fff;border:1px solid var(--lijn);border-radius:12px;padding:1.1rem 1.2rem;margin-bottom:.9rem}
.kaart.klaar{border-color:var(--groen);box-shadow:inset 3px 0 0 var(--groen)}
.rij{display:flex;gap:.7rem;align-items:baseline;flex-wrap:wrap}
.nr{font-weight:700;color:var(--grijs);font-variant-numeric:tabular-nums}
.zwaar{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;padding:.16rem .5rem;border-radius:99px;white-space:nowrap}
.z-blok{background:#f6dcd6;color:var(--rood)}
.z-snel{background:#fdf0c6;color:#7a5c00}
.z-cos{background:#e3e9e2;color:var(--grijs)}
h2{margin:.35rem 0 .3rem;font-size:1.06rem}
.van{font-size:.82rem;color:var(--grijs);margin:0 0 .5rem}
.uitleg{margin:.35rem 0 .8rem}
.opties{display:grid;gap:.4rem}
label.optie{display:flex;gap:.6rem;align-items:flex-start;padding:.5rem .65rem;border:1px solid var(--lijn);
  border-radius:8px;cursor:pointer;background:#fdfcf9}
label.optie:hover{border-color:var(--groen)}
label.optie:has(input:checked){border-color:var(--groen);background:#eef6f4;box-shadow:inset 2px 0 0 var(--groen)}
label.optie input{margin-top:.25rem}
.letter{font-weight:700;min-width:1.1em}
.kost{display:block;font-size:.8rem;color:var(--grijs);margin-top:.15rem}
footer{position:sticky;bottom:0;background:var(--ink);color:var(--pap);padding:.9rem 1.4rem;display:flex;
  gap:1rem;align-items:center;flex-wrap:wrap}
button{font:inherit;font-weight:600;padding:.55rem 1rem;border-radius:8px;border:0;cursor:pointer}
#kopieer{background:var(--geel);color:var(--ink)}
#reset{background:transparent;color:var(--pap);border:1px solid rgba(255,255,255,.35)}
#stand{margin-left:auto;font-size:.9rem}
#uitvoer{width:100%;max-width:1080px;margin:1rem auto 3rem;display:block;min-height:8rem;font:13px/1.5 ui-monospace,Menlo,monospace;
  padding:.8rem;border:1px solid var(--lijn);border-radius:10px;background:#fff;color:var(--ink)}
</style>
<header>
  <h1>Livegang De Kievit &mdash; beslissingen</h1>
  <span class="tel">__AANTAL__ punten &middot; kies per punt A, B, C of D (D = negeren)</span>
</header>
<main><div class="wrap">
"""

VOET = """</div></main>
<div class="wrap"><textarea id="uitvoer" readonly placeholder="Je keuzes verschijnen hier zodra je iets aanklikt. Plak dit terug in de chat."></textarea></div>
<footer>
  <button id="kopieer">Kopieer mijn keuzes</button>
  <button id="reset">Wis alles</button>
  <span id="stand"></span>
</footer>
<script>
const SLEUTEL='kievit-besluiten-r2';
const bewaard=JSON.parse(localStorage.getItem(SLEUTEL)||'{}');
document.querySelectorAll('input[type=radio]').forEach(r=>{
  if(bewaard[r.name]===r.value) r.checked=true;
  r.addEventListener('change',()=>{bewaard[r.name]=r.value;localStorage.setItem(SLEUTEL,JSON.stringify(bewaard));ververs();});
});
function ververs(){
  const kaarten=[...document.querySelectorAll('.kaart')];
  let regels=[],gedaan=0;
  kaarten.forEach(k=>{
    const naam=k.dataset.id, gekozen=k.querySelector('input:checked');
    k.classList.toggle('klaar',!!gekozen);
    if(gekozen){gedaan++;regels.push(naam+': '+gekozen.value+' = '+gekozen.dataset.kort);}
  });
  document.getElementById('stand').textContent=gedaan+' van '+kaarten.length+' gekozen';
  document.getElementById('uitvoer').value=regels.length?regels.join('\\n'):'';
}
document.getElementById('kopieer').addEventListener('click',async()=>{
  const t=document.getElementById('uitvoer');
  t.select(); try{await navigator.clipboard.writeText(t.value);}catch(e){document.execCommand('copy');}
  const b=document.getElementById('kopieer'); b.textContent='Gekopieerd'; setTimeout(()=>b.textContent='Kopieer mijn keuzes',1400);
});
document.getElementById('reset').addEventListener('click',()=>{
  localStorage.removeItem(SLEUTEL);
  document.querySelectorAll('input[type=radio]').forEach(r=>r.checked=false); ververs();
});
ververs();
</script>
"""

def bouw():
    e = html.escape
    uit = [KOP.replace("__AANTAL__", str(len(BESLUITEN)))]
    groep = None
    for i, b in enumerate(BESLUITEN, 1):
        if b["groep"] != groep:
            groep = b["groep"]
            uit.append(f'<p class="groep">{e(groep)}</p>')
        zk = {"blokkeert": "z-blok", "snel": "z-snel", "cosmetisch": "z-cos"}[b["zwaarte"]]
        zt = {"blokkeert": "blokkeert livegang", "snel": "moet snel", "cosmetisch": "cosmetisch"}[b["zwaarte"]]
        uit.append(f'<div class="kaart" data-id="{i:02d}">')
        uit.append(f'<div class="rij"><span class="nr">{i:02d}</span><span class="zwaar {zk}">{zt}</span></div>')
        uit.append(f'<h2>{e(b["titel"])}</h2>')
        uit.append(f'<p class="van">{e(b["van"])}</p>')
        uit.append(f'<p class="uitleg">{b["uitleg"]}</p>')
        uit.append('<div class="opties">')
        for letter, (kort, lang) in zip("ABCD", b["opties"]):
            uit.append(f'<label class="optie"><input type="radio" name="b{i:02d}" value="{letter}" '
                       f'data-kort="{e(kort)}"><span class="letter">{letter}</span>'
                       f'<span><b>{e(kort)}</b><span class="kost">{e(lang)}</span></span></label>')
        uit.append('</div></div>')
    uit.append(VOET)
    doel = pathlib.Path(__file__).parent / "index.html"
    doel.write_text("\n".join(uit), encoding="utf-8")
    print(f"{doel} geschreven: {len(BESLUITEN)} beslispunten")

bouw()
