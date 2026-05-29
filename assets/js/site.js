document.addEventListener('DOMContentLoaded',function(){
  if(!document.querySelector('link[href="./assets/css/premium-site.css"]')){
    var premium=document.createElement('link');
    premium.rel='stylesheet';
    premium.href='./assets/css/premium-site.css?v=20260529-premium';
    document.head.appendChild(premium);
  }
  var btn=document.getElementById('navToggle');
  var nav=document.getElementById('mainNav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
  }
});