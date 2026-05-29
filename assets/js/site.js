document.addEventListener('DOMContentLoaded',function(){
  var driveDownloadUrl='https://drive.google.com/drive/folders/1gFGAe7XzWiInrsvZU98515skZGYOtVNj?usp=sharing';

  if(!document.querySelector('link[href="./assets/css/premium-site.css"]')){
    var premium=document.createElement('link');
    premium.rel='stylesheet';
    premium.href='./assets/css/premium-site.css?v=20260529-premium';
    document.head.appendChild(premium);
  }

  document.querySelectorAll('a[href="downloads.html"],a[href="./downloads.html"],a[href$="/downloads.html"]').forEach(function(link){
    link.href=driveDownloadUrl;
    link.target='_blank';
    link.rel='noopener noreferrer';
  });

  var btn=document.getElementById('navToggle');
  var nav=document.getElementById('mainNav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
  }
});