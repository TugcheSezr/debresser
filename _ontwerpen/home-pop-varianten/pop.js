// Mensen en wagens uit de foto, voor de variantpagina. Zelfde werkwijze als het foto-pop-blok in js/main.js:
// de foto in .foto-pop__raam, de uitsnede (uit/<naam>.webp) in de strook .foto-pop__boven boven het kader.
// Per foto: [bovenkant mensen, midden, profiel per 2% van de breedte, breedte/hoogte].
(function(){
  var POP={"verhuizen":[0.236,0.588,"9999999999999999999999999999994543322929303335353535353535353535353535353524232436389999999999999999",1.5],"opslag":[0.288,0.656,"9999999999999999999999999999999999999999999999996529282932385343504341423535565655525248474747484848",1.5539],"meubelprojecten":[0.106,0.571,"9999999999999999999999999999706356504337302317131312121111101013111111126599999999999999999999999999",1.4993],"gebouwbeheer":[0.102,0.416,"9999999999999999999999999924211411101215273150484643282222222224438388999999999999999999999999999999",1.5],"assetmanagement":[0.123,0.414,"9999515049494848484847474741342315141312121212131519323959636567697375787979797980999999999999999999",1.4993],"duurzaam":[0.317,0.58,"6057535150504948484746444341403837363434343434343434323231313131323232323232323233333434343434354363",1.1797],"brocken":[0.223,0.554,"7877767574737272717170686564636058383129272625242322222222222223242526272935405759676971717273747475",0.8213],"kinderen":[0.303,0.459,"9999999999999999595554535251503433333437454648323130303043444748505152539999999999999999999999999999",1.4905],"reden":[0.128,0.71,"9999999999999999999999999999996862605960626059582114131212141515141312121313141517182022242629313337",1.4124],"qwiek":[0.122,0.666,"9998989882999969676864647799868280575551421714131314162729313236524416141212121213151822373840448991",1.3386],"intern":[0.326,0.571,"9999999999999999999999999999999999999999995335333232464338373744455149363699999999999999999999999999",1.3351]};
  function leg(vak,img,boven,uit,d){
    var W=vak.clientWidth,H=vak.clientHeight,ar=(+img.getAttribute('width'))/(+img.getAttribute('height'))||d[3];
    if(!W||!H||!ar)return;
    var P=Math.round(Math.min(40,Math.max(30,H*0.16)));
    var Ph=Math.max((H+P)/(1-d[0]),W/ar),Pw=Ph*ar,top=-(d[0]*Ph+P);
    var FT=-top/Ph,ideaal=Math.min(0,Math.max(W-Pw,W/2-d[1]*Pw)),links=ideaal,beste=1e9;
    function kruin(f){var b=Math.floor(f*50),t=99;for(var k=b-1;k<=b+1;k++){if(k<0||k>49)continue;var v=+d[2].substr(k*2,2);if(v<t)t=v}return t/100}
    var kopgrens=Math.round((d[0]+0.12)*100);
    function kop(k){return +d[2].substr(k*2,2)<=kopgrens}
    var mens=0;for(var k=0;k<50;k++)if(kop(k))mens++;mens=Math.max(mens,1);
    for(var x=W-Pw;x<=0.5;x+=Math.max(2,(Pw-W)/150)){
      var zicht=0;for(var k=Math.max(0,Math.ceil(-x/Pw*50));k<Math.min(50,Math.floor((W-x)/Pw*50));k++)if(kop(k))zicht++;
      var kost=Math.abs(x-ideaal)/Pw*0.5-zicht/mens*1.5;
      [-x/Pw,(W-x)/Pw].forEach(function(e){if(e<=0.01||e>=0.99)return;var t=kruin(e);if(t<FT)kost+=(FT-t)*20;else if(t<0.99)kost+=0.3});
      if(kost<beste){beste=kost;links=Math.min(0,x)}
    }
    boven.style.height=(P+40)+'px';
    [img,uit].forEach(function(el){el.style.width=Pw+'px';el.style.height=Ph+'px';el.style.left=links+'px'});
    img.style.top=top+'px';
    // de strook kan per variant anders liggen (bijvoorbeeld dieper bij een boog): meet waar hij staat
    uit.style.top=(top-boven.offsetTop)+'px';
  }
  [].forEach.call(document.querySelectorAll('[data-pop]'),function(vak){
    var img=vak.querySelector(':scope > img'),d=POP[vak.getAttribute('data-pop')];if(!img||!d)return;
    var raam=document.createElement('span');raam.className='foto-pop__raam';
    vak.insertBefore(raam,img);raam.appendChild(img);
    var boven=document.createElement('span');boven.className='foto-pop__boven';boven.setAttribute('aria-hidden','true');
    var uit=document.createElement('img');uit.alt='';uit.decoding='async';uit.src='uit/'+vak.getAttribute('data-pop')+'.webp';
    boven.appendChild(uit);raam.insertAdjacentElement('afterend',boven);
    vak.parentNode.classList.add('is-foto-pop');
    var rooster=vak.closest('.diensten, .nieuws');if(rooster)rooster.classList.add('is-foto-pop');
    function zet(){leg(vak,img,boven,uit,d)}
    zet();
    if('ResizeObserver' in window)new ResizeObserver(zet).observe(vak);
  });
})();
