document.addEventListener('DOMContentLoaded',function(){
  var driveDownloadUrl='https://drive.google.com/drive/folders/1gFGAe7XzWiInrsvZU98515skZGYOtVNj?usp=sharing';

  if(!document.querySelector('link[href="./assets/css/premium-site.css"]')){
    var premium=document.createElement('link');
    premium.rel='stylesheet';
    premium.href='./assets/css/premium-site.css?v=20260529-premium-real';
    document.head.appendChild(premium);
  }

  document.querySelectorAll('a[href="downloads.html"],a[href="./downloads.html"],a[href$="/downloads.html"],a[href="#downloads"]').forEach(function(link){
    link.href=driveDownloadUrl;
    link.target='_blank';
    link.rel='noopener noreferrer';
  });

  document.querySelectorAll('body *:not(script):not(style):not(noscript)').forEach(function(node){
    if(node.childNodes.length===1 && node.childNodes[0].nodeType===3){
      node.textContent=node.textContent
        .replaceAll('彰榖米品牌','彰榖米')
        .replaceAll('CHANG GU MI BRAND','CHANGHUA RICE BRAND')
        .replaceAll('穗','榖');
    }
  });

  document.querySelectorAll('img[alt]').forEach(function(img){
    img.alt=img.alt.replaceAll('彰榖米品牌','彰榖米').replaceAll('穗','榖');
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