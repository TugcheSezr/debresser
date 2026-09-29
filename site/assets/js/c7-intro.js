/* c7-intro: de breedte van het fotovlak volgt de hoogte van het tekstblok ernaast (variabele c7i-maat op het blok),
   met als bovengrens 40% van de binnenbreedte van het blok. Zonder die grens loopt het op: een breder vlak maakt de
   tekstkolom smaller en dus hoger, en dan wordt het vlak weer breder. */
(function(){
  var blokken=[].slice.call(document.querySelectorAll('.c7-intro'));
  if(!blokken.length)return;
  function maat(b){
    var t=b.querySelector('.c7-intro__tekst');if(!t)return;
    var s=getComputedStyle(b),binnen=b.clientWidth-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight);
    b.style.setProperty('--c7i-maat',Math.round(Math.min(t.offsetHeight,binnen*.4))+'px');
  }
  blokken.forEach(maat);
  if('ResizeObserver' in window){var ro=new ResizeObserver(function(es){es.forEach(function(e){maat(e.target.parentNode)})});
    blokken.forEach(function(b){var t=b.querySelector('.c7-intro__tekst');if(t)ro.observe(t)})}
  else addEventListener('resize',function(){blokken.forEach(maat)});
})();
