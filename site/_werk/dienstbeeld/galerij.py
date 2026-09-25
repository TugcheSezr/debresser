#!/usr/bin/env python3
"""Keuzegalerij: galerij.html met per dienst de 7 kandidaten, genummerd, met QA-oordeel uit qa.json.

qa.json: { "<id>": {"oordeel": "goed|let|fout", "tekst": "..."} , ... }   (ontbreekt = nog niet beoordeeld)
gekozen.json: { "<dienst-code>": ["<id>", ...] }  (optioneel, markeert de keuze van Shahab)
Draaien: python3 galerij.py   ->  http://127.0.0.1:4740/_werk/dienstbeeld/galerij.html
"""
import json, html, pathlib, os
os.environ.setdefault("GEMINI_API_KEY", "x")
from gen_dienst import SCENES, DIENST

HIER = pathlib.Path(__file__).resolve().parent
# ronde 1 eerst, daarna ronde 2 en 3 eroverheen: het laatste oordeel over een id wint
QA = {}
BEOORDEELD = {}          # id -> tijdstip van het qa-bestand waar het oordeel uit komt
for naam in ["par", "int", "sen", "spo", "inp", "mon", "ops", "zor", "pia", "ant", "kan",
             "ronde2-a", "ronde2-b", "ronde2-c", "ronde3", "ronde3b", "ronde5"]:
    f = HIER / "qa" / f"{naam}.json"
    if f.exists():
        d = json.loads(f.read_text())
        QA.update(d)
        for k in d:
            BEOORDEELD[k] = f.stat().st_mtime
# een plaat die NA zijn beoordeling opnieuw is gegenereerd, draagt geen geldig oordeel meer
for k in list(QA):
    bron = HIER / "klaar" / f"{k}.png"
    if not bron.exists():
        bron = HIER / "raw" / f"{k}.png"
    if bron.exists() and bron.stat().st_mtime > BEOORDEELD.get(k, 0) + 60:
        QA[k] = {"oordeel": "nieuw", "tekst": "nieuwe versie na de vorige afkeuring, nog niet gecontroleerd op 100 procent",
                 "retouche": "", "opnieuw": ""}
(HIER / "qa.json").write_text(json.dumps(QA, ensure_ascii=False, indent=1))
GEKOZEN = json.loads((HIER / "gekozen.json").read_text()) if (HIER / "gekozen.json").exists() else {}
TITEL = {"par": "Particuliere verhuizing", "int": "Internationale verhuizing", "sen": "Seniorenverhuizing",
         "spo": "Spoedverhuizing", "inp": "Inpakservice", "mon": "Montage en demontage",
         "ops": "Inboedelopslag", "zor": "Zorgverhuizing", "pia": "Piano verhuizen",
         "ant": "Antiek en kunst", "kan": "Kantoorverhuizing"}

CSS = """
  :root{--navy:#22314E;--teal:#00A19B;--teal-diep:#006C68;--creme:#F6F4EC;--licht:#E5F3F3;--lijn:#C4E4E4;--geel:#FFD500;--ant:#1D1D1B}
  *{box-sizing:border-box}
  body{margin:0;background:var(--creme);color:var(--ant);font:400 16px/1.55 "Noto Sans",system-ui,sans-serif}
  header{background:var(--navy);color:#fff;padding:1.6rem clamp(1rem,4vw,3rem);position:sticky;top:0;z-index:5}
  header h1{margin:0 0 .4rem;font:700 1.5rem/1.2 Poppins,system-ui,sans-serif}
  header p{margin:.3rem 0;max-width:90ch;color:#DCE6E6;font-size:.92rem}
  header b{color:var(--geel)}
  .schakel{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.8rem}
  .schakel button,.schakel a{border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;border-radius:50px;
    padding:.4rem .9rem;font:700 .74rem/1 "Noto Sans",sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;text-decoration:none}
  .schakel button[aria-pressed=true]{background:var(--teal);border-color:var(--teal);color:#062}
  section{padding:1.8rem clamp(1rem,4vw,3rem) .4rem}
  section h2{margin:0 0 .15rem;font:700 1.3rem/1.2 Poppins,system-ui,sans-serif;color:var(--teal-diep)}
  section > p.pad{margin:0 0 1rem;font-size:.88rem;color:#4B4B49}
  .rij{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem}
  figure{margin:0;background:#fff;border:1px solid var(--lijn);border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
  .vak{position:relative;background:var(--licht)}
  .vak.s{aspect-ratio:2/3}.vak.l{aspect-ratio:3/2}
  body.desk .vak.s{aspect-ratio:524/917}body.desk .vak.l{aspect-ratio:1120/641}
  body.mob .vak.s{aspect-ratio:4/5}body.mob .vak.l{aspect-ratio:16/10}
  .vak img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  .vak a{position:absolute;inset:0}
  .nr{position:absolute;left:.55rem;top:.55rem;background:rgba(29,29,27,.78);color:#fff;border-radius:8px;
    padding:.2rem .55rem;font:700 .78rem/1.4 Poppins,sans-serif;letter-spacing:.04em;pointer-events:none}
  .ar{position:absolute;right:.55rem;top:.55rem;background:rgba(255,255,255,.85);color:var(--navy);border-radius:8px;
    padding:.15rem .45rem;font:700 .68rem/1.4 Poppins,sans-serif;pointer-events:none}
  figcaption{padding:.65rem .8rem .8rem;font-size:.84rem;flex:1}
  figcaption b{display:block;font:700 .92rem/1.3 Poppins,sans-serif;color:var(--navy);margin-bottom:.2rem}
  .qa{display:block;margin-top:.4rem;font-size:.77rem;line-height:1.45;color:#4B4B49;border-top:1px dashed var(--lijn);padding-top:.35rem}
  .qa.goed{color:var(--teal-diep)}.qa.let{color:#8A5A00}.qa.fout{color:#A32}.qa.nieuw{color:#5B3FA8;font-weight:600}
  figure{cursor:pointer;transition:box-shadow .12s,border-color .12s}
  figure:not(.gekozen):hover{border-color:var(--teal)}
  figure:not(.gekozen){opacity:1}
  .vak a{position:absolute;inset:auto .5rem .5rem auto;width:2rem;height:2rem;border-radius:8px;
    background:rgba(29,29,27,.72);color:#fff;display:grid;place-items:center;text-decoration:none;font-size:1rem}
  .vak a:hover{background:var(--teal);color:#04302E}
  .teller{display:inline-flex;gap:.4rem;align-items:center;margin-left:.6rem;font:700 .78rem/1 Poppins,sans-serif;
    background:#EDE9DC;color:#6B6B68;border-radius:50px;padding:.35rem .8rem;vertical-align:middle}
  .teller.klaar{background:var(--teal);color:#04302E}
  .balk{position:fixed;left:0;right:0;bottom:0;background:var(--navy);color:#fff;padding:.7rem clamp(1rem,4vw,3rem);
    display:flex;gap:1rem;align-items:center;font:600 .85rem/1.3 "Noto Sans",sans-serif;z-index:9;flex-wrap:wrap}
  .balk b{color:var(--geel)}
  body{padding-bottom:4rem}
  figure.gekozen{border:2px solid var(--teal);box-shadow:0 6px 22px rgba(0,161,155,.22)}
  .keus{position:absolute;right:.55rem;bottom:.55rem;background:var(--teal);color:#04302E;border-radius:8px;
    padding:.2rem .55rem;font:700 .72rem/1.4 Poppins,sans-serif}
  footer{padding:2rem clamp(1rem,4vw,3rem) 3rem;font-size:.85rem;color:#4B4B49;max-width:90ch}
  code{background:var(--licht);color:var(--ant);padding:.1rem .3rem;border-radius:4px;font-size:.9em}
"""

uit = [f"""<!doctype html><html lang="nl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Beeldkeuze dienstpagina's De Kievit (11 diensten, 7 kandidaten per dienst)</title><style>{CSS}</style>
<header><h1>Beeldkeuze: de elf dienstpagina's</h1>
<p>{len(SCENES)} kandidaten, 7 per dienst: 5 staand (2:3, voor het <code>.blok__foto</code>-vak naast tekst) en 2 liggend
(3:2, voor een paginahero of een <code>.dienst__nis</code>-vak). Gegenereerd met <code>gemini-3-pro-image-preview</code> op 2K,
Top Movers-wagen, -polo en -dozen als referentie, gezichten uit de mixbibliotheek (kop-01 t/m 19). <b>Klik een beeld om het te KIEZEN.</b> Nog een keer klikken maakt de keuze ongedaan; het vergrootglas rechtsonder opent het volle formaat.</p>\n<p><b>Per dienstpagina heb ik er vier nodig: drie staande (2:3) voor de fotovakken naast de tekst en een liggende (3:2) voor de hero bovenaan.</b> Kies er gerust meer, dan houd ik reserve; de teller per dienst kleurt groen zodra je er 3 staand en 1 liggend hebt.</p>
<p>De beelden die bij de eerste controle afvielen zijn opnieuw gegenereerd met aangescherpte merkregels; het oordeel hieronder is dat van de LAATSTE versie.</p>
<p>Onder elke kaart staat het QA-oordeel: <b>goed</b> = zo te gebruiken, <b>let op</b> = klein punt, te retoucheren, <b>fout</b> = valt af of opnieuw.</p>
<div class="schakel" role="group" aria-label="Toon als"><button data-m="" aria-pressed="true">Volledig beeld</button>
<button data-m="desk" aria-pressed="false">Zoals in het vak, desktop</button><button data-m="mob" aria-pressed="false">Zoals in het vak, mobiel</button>
<span style="flex:1"></span>{' '.join(f'<a href="#{c}">{TITEL[c]}</a>' for c in DIENST)}</div></header>"""]

for i, (code, slug) in enumerate(DIENST.items(), 1):
    ids = [n for n in SCENES if n.startswith(code)]
    uit.append(f'<section id="{code}"><h2>{i}. {TITEL[code]}<span class="teller"></span></h2>'
                   f'<p class="pad"><code>/{slug}/</code> &middot; nodig: 3 staand + 1 liggend</p><div class="rij">')
    for j, n in enumerate(ids, 1):
        s = SCENES[n]; ar = "l" if s["ar"] == "3:2" else "s"
        web = f"web/{n}-900.webp"; raw = f"klaar/{n}.png" if (HIER / "klaar" / f"{n}.png").exists() else f"raw/{n}.png"
        q = QA.get(n); gekozen = n in GEKOZEN.get(code, [])
        qa = (f'<span class="qa {html.escape(q["oordeel"])}">{html.escape(q["tekst"])}</span>' if q
              else '<span class="qa">nog niet beoordeeld</span>')
        uit.append(f'<figure class="{"gekozen" if gekozen else ""}" id="{n}" data-dienst="{code}" data-ar="{s["ar"]}"><div class="vak {ar}">'
                   f'<img src="{web}" alt="" loading="lazy">'
                   f'<a href="{raw}" target="_blank" aria-label="volle maat" title="volle maat">&#128269;</a>'
                   f'<span class="nr">{code}{j}</span><span class="ar">{s["ar"]}</span>'
                   f'{"<span class=keus>GEKOZEN</span>" if gekozen else ""}</div>'
                   f'<figcaption><b>{code}{j} · {html.escape(n[5:].replace("-", " "))}{" · geretoucheerd" if raw.startswith("klaar") else ""}</b>{qa}</figcaption></figure>')
    uit.append('</div></section>')

uit.append("""<footer>Bestanden: <code>site/_werk/dienstbeeld/raw/&lt;id&gt;.png</code> (2K, bron), <code>web/</code> (galerij).
Kies per dienst met de nummers (bijv. "par: 1, 4 en 6"); daarna gaan de gekozen platen als webp in twee maten naar
<code>site/assets/img/</code>, met retouche van kleine opdruk waar het QA-oordeel dat zegt.</footer>
<div class="balk" id="balk">Kies per dienst <b>3 staande</b> en <b>1 liggende</b> foto. Je keuze wordt meteen bewaard.
 <span id="stand"></span></div>
<script>
document.querySelectorAll('.schakel button').forEach(b=>b.addEventListener('click',()=>{document.body.className=b.dataset.m;
  document.querySelectorAll('.schakel button').forEach(x=>x.setAttribute('aria-pressed',x===b))}));

function tel(){
  var totS=0, totL=0;
  document.querySelectorAll('section[id]').forEach(function(sec){
    var s=0,l=0;
    sec.querySelectorAll('figure.gekozen').forEach(function(f){ f.dataset.ar==='3:2' ? l++ : s++; });
    var t=sec.querySelector('.teller');
    t.textContent = s+' staand / '+l+' liggend';
    t.classList.toggle('klaar', s>=3 && l>=1);
    totS+=s; totL+=l;
  });
  document.getElementById('stand').textContent = 'Gekozen: '+totS+' staand en '+totL+' liggend, over 11 diensten.';
}

document.querySelectorAll('figure').forEach(function(fig){
  fig.addEventListener('click', function(e){
    if(e.target.closest('a')) return;              // het vergrootglas opent de foto
    var aan = !fig.classList.contains('gekozen');
    fig.classList.toggle('gekozen', aan);
    var k=fig.querySelector('.keus');
    if(aan && !k){ k=document.createElement('span'); k.className='keus'; k.textContent='GEKOZEN'; fig.querySelector('.vak').appendChild(k); }
    if(!aan && k) k.remove();
    tel();
    fetch('/kies',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({dienst:fig.dataset.dienst,id:fig.id,aan:aan})}).catch(function(){
        document.getElementById('balk').style.background='#8A2C2C';
        document.getElementById('stand').textContent='Let op: deze pagina draait niet op de keuzeserver (poort 4750), je keuze wordt NIET bewaard.';
      });
  });
});
tel();
</script></html>""")
(HIER / "galerij.html").write_text("\n".join(uit), encoding="utf-8")
print("galerij.html", len(SCENES), "kaarten,", len(QA), "beoordeeld")
