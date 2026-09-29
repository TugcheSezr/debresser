(function(){
  // Dienst-intro: de boog van elke badge met data-boog tekent zich een keer als de badge onder de vouw begint, net als
  // de boog in het reviewblok (reviews.js). Bij reduced motion of zonder IntersectionObserver staat hij er meteen.
  var badges=document.querySelectorAll('[data-boog]');
  if(!badges.length||!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      var b=e.target;io.unobserve(b);
      requestAnimationFrame(function(){requestAnimationFrame(function(){
        b.classList.remove('is-wacht');
        var c=b.querySelector('circle');if(c)c.style.strokeDashoffset='0';
      })});
    });
  },{threshold:.5});
  [].forEach.call(badges,function(b){
    if(b.getBoundingClientRect().top<=window.innerHeight)return;
    // de streep begint leeg: verschuif hem over zijn eigen lengte (het eerste getal van stroke-dasharray)
    var c=b.querySelector('circle');
    if(c)c.style.strokeDashoffset=String(parseFloat(c.getAttribute('stroke-dasharray'))||0);
    b.classList.add('is-wacht');io.observe(b);
  });
})();
