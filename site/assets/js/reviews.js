(function(){
  // Reviewblok van de homepage: knoppen, voortgang en "Lees verder" voor de rail, de boog die zich een keer tekent als
  // hij in beeld komt, en de vergroting van de foto's bij een review. De foto's zijn van De Bresser zelf, niet van de
  // klant, dus het onderschrift is de alt-tekst van de foto en niet de naam van de klant.
  // Zonder JS scrollt de rail, staat elke tekst er helemaal en blijven de thumbnails gewone knoppen.
  var rails=document.querySelectorAll('.sbr__rail');
  var bogen=document.querySelectorAll('.sbr__boog');
  if(!rails.length&&!bogen.length)return;
  var rustig=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  var PIJL='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var KRUIS='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var teller=0;

  [].forEach.call(rails,function(rail){
    var lijst=rail.querySelector('.sbr__kaarten');
    if(!lijst)return;
    rail.classList.add('sbr__rail--js');

    // "Lees verder" onder elke tekst; verborgen zolang de tekst in zes regels past. Past hij niet, dan kapt kort()
    // hem af op een woordgrens met een beletselteken (WebKit knipt bij line-clamp midden in een woord). Dat
    // afgekapte stuk is aria-hidden; een schermlezer leest de volledige tekst, die verborgen in de p blijft staan.
    // De knop noemt verborgen de naam bij de review, zodat een lijst met knoppen niet zes keer "Lees verder" is.
    var knoppen=[];
    [].forEach.call(lijst.querySelectorAll('.sbr__tekst'),function(t){
      var p=t.querySelector('p');
      if(!p)return;
      t.id=t.id||('sbr-tekst-'+(++teller));
      var wie=t.parentNode.querySelector('.sbr__wie b'),heel=p.innerHTML;
      var k=document.createElement('button');
      k.type='button';k.className='sbr__lees';k.hidden=true;
      k.setAttribute('aria-expanded','false');k.setAttribute('aria-controls',t.id);
      function label(open){
        k.textContent=open?'Minder tonen':'Lees verder';
        if(!wie)return;
        var v=document.createElement('span');v.className='sb-verborgen';
        v.textContent=' (review van '+wie.textContent+')';k.appendChild(v);
      }
      label(false);
      t.parentNode.insertBefore(k,t.nextSibling);
      k.addEventListener('click',function(){
        var open=t.classList.toggle('is-open');
        k.setAttribute('aria-expanded',open?'true':'false');
        label(open);
        if(open){p.innerHTML=heel;p.style.display=''}else kort([[t,p,k,heel]]);
        stand();
      });
      knoppen.push([t,p,k,heel]);
    });
    // Afkappen op een woordgrens met een beletselteken (WebKit knipt bij line-clamp midden in een woord). Eerst alles
    // terugzetten, dan alles lezen: afwisselend lezen en schrijven dwingt per kaart een nieuwe layout af. De woordgrens
    // komt uit de posities van de woorden in die ene layout (alleen lezen). Daarna een keer schrijven en controleren; past
    // het beletselteken er niet meer achter, dan gaat er een woord af (hooguit drie rondes, elk een layout voor alle teksten).
    function woordenBoven(p,grens){
      var w=[],it=document.createTreeWalker(p,NodeFilter.SHOW_TEXT),n,m,re=/\S+/g,r=document.createRange(),lo=0,hi;
      while((n=it.nextNode())){re.lastIndex=0;while((m=re.exec(n.data)))w.push([n,m.index+m[0].length])}
      hi=w.length;
      while(lo<hi){
        var mid=(lo+hi+1)>>1,x=w[mid-1];
        r.setStart(x[0],x[1]-1);r.setEnd(x[0],x[1]);
        if(r.getBoundingClientRect().bottom<=grens)lo=mid;else hi=mid-1;
      }
      return lo;
    }
    // Knipt de HTML op witruimte, gelijk aan de woorden in woordenBoven zolang de tekst alleen <br> en entiteiten
    // zonder spatie bevat. Bij &nbsp; of een tag met attributen lopen die tellingen uiteen.
    function tot(z,k){
      var i=0,n=0;
      while(i<z.stukken.length&&n<k){if(z.stukken[i]&&!/^(\s+|<br\s*\/?>)$/i.test(z.stukken[i]))n++;i++}
      return z.stukken.slice(0,i).join('').replace(/(\s|<br\s*\/?>|[,;:.])+$/,'')+'…';
    }
    function kort(teksten){
      teksten.forEach(function(x){x[1].innerHTML=x[3];x[1].style.display=''});
      var maten=teksten.map(function(x){
        var p=x[1],max=p.clientHeight,z={p:p,heel:x[3],k:x[2],max:max,past:p.scrollHeight<=max+2};
        if(!z.past)z.woord=Math.max(1,woordenBoven(p,p.getBoundingClientRect().top+p.clientTop+max+1));
        return z;
      });
      maten.forEach(function(z){z.k.hidden=z.past});
      var te=maten.filter(function(z){return !z.past});
      te.forEach(function(z){z.stukken=z.heel.split(/(\s+|<br\s*\/?>)/)});
      for(var ronde=0,bezig=te;ronde<3&&bezig.length;ronde++){
        bezig.forEach(function(z){z.p.innerHTML=tot(z,z.woord)});
        // bij een enkel (lang) woord valt er niets meer af: dan stopt de lus, zonder het woord af te breken
        bezig=bezig.filter(function(z){return z.p.scrollHeight>z.max+2&&z.woord>1});
        bezig.forEach(function(z){z.woord--});
      }
      te.forEach(function(z){
        // zonder line-clamp: WebKit telt de verborgen volledige tekst mee en zet er anders een tweede beletselteken bij
        z.p.innerHTML='<span aria-hidden="true">'+tot(z,z.woord)+'</span><span class="sb-verborgen">'+z.heel+'</span>';
        z.p.style.display='block';
      });
    }
    var breed=0;
    function meetTeksten(){
      if(window.innerWidth===breed)return;
      breed=window.innerWidth;
      kort(knoppen.filter(function(x){return !x[0].classList.contains('is-open')}));
    }

    var nav=document.createElement('div');
    nav.className='sbr__nav';
    nav.innerHTML='<button type="button" class="sbr__knop sbr__knop--terug" aria-label="Vorige reviews">'+PIJL+'</button>'
      +'<span class="sbr__voortgang" aria-hidden="true"><i></i></span>'
      +'<button type="button" class="sbr__knop" aria-label="Volgende reviews">'+PIJL+'</button>';
    rail.appendChild(nav);
    var terug=nav.children[0],verder=nav.children[2],balk=nav.querySelector('i');

    function stap(){
      var k=lijst.querySelector('.sbr__kaart');
      var gap=parseFloat(getComputedStyle(lijst).columnGap)||16;
      return k?k.getBoundingClientRect().width+gap:lijst.clientWidth*.8;
    }
    function schuif(richting,knop){
      if(knop.getAttribute('aria-disabled')==='true')return;
      lijst.scrollBy({left:richting*stap(),behavior:rustig?'auto':'smooth'});
    }
    terug.addEventListener('click',function(){schuif(-1,terug)});
    verder.addEventListener('click',function(){schuif(1,verder)});

    var wacht=false;
    function stand(){
      wacht=false;
      var max=lijst.scrollWidth-lijst.clientWidth;
      nav.hidden=max<=4;
      terug.setAttribute('aria-disabled',lijst.scrollLeft<=4?'true':'false');
      verder.setAttribute('aria-disabled',lijst.scrollLeft>=max-4?'true':'false');
      var deel=Math.min(1,lijst.clientWidth/Math.max(1,lijst.scrollWidth));
      balk.style.width=(deel*100)+'%';
      balk.style.transform='translateX('+(lijst.scrollLeft/Math.max(1,lijst.clientWidth)*100)+'%)';
    }
    function later(){if(!wacht){wacht=true;requestAnimationFrame(stand)}}
    lijst.addEventListener('scroll',later,{passive:true});
    window.addEventListener('resize',function(){meetTeksten();later()},{passive:true});
    // Afkappen hangt af van het font: met de fonts-API een keer, na fonts.ready (ook als die al klaar waren), anders meteen.
    // breed=0: ook als een resize (adresbalk) al met het terugvalfont heeft gemeten, telt de meting na de fonts.
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){breed=0;meetTeksten();stand()});
    else meetTeksten();
    stand();
  });

  // De vergroting: een <dialog> voor de hele pagina. Bladeren (knoppen en pijltjestoetsen) gaat alleen door de foto's
  // van dezelfde review; Esc of een klik op de achtergrond sluit, en de focus gaat terug naar de thumbnail.
  var dlg=null,beeld,onderschrift,vorige,volgende,reeks=[],plek=0,bron=null;
  function toon(i){
    plek=(i+reeks.length)%reeks.length;
    var k=reeks[plek],alt=(k.querySelector('img')||{}).alt||'';
    beeld.src=k.getAttribute('data-groot');
    beeld.width=+k.getAttribute('data-b')||0;beeld.height=+k.getAttribute('data-h')||0;
    beeld.alt=alt;
    onderschrift.textContent=alt+(reeks.length>1?' · foto '+(plek+1)+' van '+reeks.length:'');
  }
  function maakDialoog(){
    dlg=document.createElement('dialog');
    dlg.className='sbr__vergroting';
    dlg.setAttribute('aria-label','Foto bij een review');
    // de sluitknop eerst en met autofocus: daar staat de focus als de vergroting opengaat
    dlg.innerHTML='<figure><button type="button" class="sbr__vk sbr__vk--dicht" aria-label="Sluiten" autofocus>'+KRUIS+'</button>'
      +'<img src="" alt=""><figcaption></figcaption>'
      +'<button type="button" class="sbr__vk sbr__vk--terug" aria-label="Vorige foto">'+PIJL+'</button>'
      +'<button type="button" class="sbr__vk sbr__vk--verder" aria-label="Volgende foto">'+PIJL+'</button></figure>';
    document.body.appendChild(dlg);
    beeld=dlg.querySelector('img');onderschrift=dlg.querySelector('figcaption');
    vorige=dlg.querySelector('.sbr__vk--terug');volgende=dlg.querySelector('.sbr__vk--verder');
    vorige.addEventListener('click',function(){toon(plek-1)});
    volgende.addEventListener('click',function(){toon(plek+1)});
    dlg.querySelector('.sbr__vk--dicht').addEventListener('click',function(){dlg.close()});
    // een klik op de achtergrond landt op de dialog zelf, niet op iets erin
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
    dlg.addEventListener('keydown',function(e){
      if(reeks.length<2)return;
      if(e.key==='ArrowLeft'){e.preventDefault();toon(plek-1)}
      else if(e.key==='ArrowRight'){e.preventDefault();toon(plek+1)}
    });
    dlg.addEventListener('close',function(){
      document.documentElement.classList.remove('sbr-vast');
      beeld.removeAttribute('src');
      if(bron)bron.focus();
    });
  }
  document.addEventListener('click',function(e){
    var k=e.target.closest&&e.target.closest('.sbr__foto');
    if(!k||typeof HTMLDialogElement!=='function')return;
    if(!dlg)maakDialoog();
    bron=k;
    reeks=[].slice.call(k.closest('.sbr__fotos').querySelectorAll('.sbr__foto'));
    vorige.hidden=volgende.hidden=reeks.length<2;
    toon(reeks.indexOf(k));
    document.documentElement.classList.add('sbr-vast');
    dlg.showModal();
  });

  // De boog tekent zich een keer als hij onder de vouw begint; bij reduced motion staat hij er meteen.
  if(rustig||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      var b=e.target;io.unobserve(b);
      requestAnimationFrame(function(){requestAnimationFrame(function(){
        b.classList.remove('is-wacht');
        var c=b.querySelector('.sbr__ring circle');if(c)c.style.strokeDashoffset='0';
      })});
    });
  },{threshold:.5});
  [].forEach.call(bogen,function(b){
    if(b.getBoundingClientRect().top<=window.innerHeight)return;
    // de streep begint leeg: verschuif hem over zijn eigen lengte (stroke-dasharray "<lengte> 100")
    var c=b.querySelector('.sbr__ring circle');
    if(c)c.style.strokeDashoffset=String(parseFloat(c.getAttribute('stroke-dasharray'))||0);
    b.classList.add('is-wacht');io.observe(b);
  });
})();
