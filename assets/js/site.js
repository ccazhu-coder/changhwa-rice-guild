document.addEventListener('DOMContentLoaded',function(){
  var driveDownloadUrl='https://drive.google.com/drive/folders/1gFGAe7XzWiInrsvZU98515skZGYOtVNj?usp=sharing';

  function removeHomeNews(){
    document.querySelectorAll('#news,section#news,.section#news').forEach(function(el){el.remove();});
    document.querySelectorAll('section,.section').forEach(function(el){
      var text=(el.textContent||'').replace(/\s+/g,'');
      if(text.indexOf('NEWS最新消息')>-1||text.indexOf('首頁僅保留最新三則公告')>-1){el.remove();}
    });
    document.querySelectorAll('.hero-actions a,.home-section-actions a').forEach(function(a){
      var text=(a.textContent||'').replace(/\s+/g,'');
      if(text.indexOf('查看最新消息')>-1){a.remove();}
    });
  }

  var forceStyle=document.createElement('style');
  forceStyle.id='force-mobile-layout-style';
  forceStyle.textContent='body #news,body section#news,body .section#news{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}@media(max-width:900px){html,body{overflow-x:hidden!important}.site-header{position:sticky!important;top:0!important;z-index:9999!important;background:#fff!important;border-bottom:1px solid rgba(20,63,33,.12)!important;box-shadow:0 8px 24px rgba(20,45,24,.08)!important}.header-inner{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:10px!important;height:auto!important;min-height:auto!important;padding:10px 0 12px!important;background:#fff!important}.brand{width:100%!important;min-width:0!important;display:flex!important;align-items:center!important;gap:12px!important;margin:0!important}.brand-logo{width:50px!important;height:50px!important;flex:0 0 50px!important;object-fit:contain!important}.brand-name{font-size:19px!important;line-height:1.25!important;white-space:normal!important}.nav-toggle{display:none!important}.main-nav{position:relative!important;display:flex!important;flex-direction:row!important;width:100%!important;gap:9px!important;margin-top:2px!important;padding:6px 0 4px!important;overflow-x:auto!important;overflow-y:hidden!important;background:#fff!important;border:0!important;box-shadow:none!important;border-radius:0!important;scrollbar-width:none!important;z-index:2!important}.main-nav::-webkit-scrollbar{display:none!important}.main-nav a{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:42px!important;padding:10px 15px!important;border-radius:999px!important;background:#f6f0e3!important;color:#183f21!important;font-size:15px!important;font-weight:900!important;white-space:nowrap!important}.main-nav .nav-cta{background:#c6a437!important;color:#fff!important}.hero{padding:32px 0 38px!important;min-height:auto!important}.hero .eyebrow{display:none!important}.hero h1{font-size:clamp(38px,11vw,50px)!important;line-height:1.15!important;margin:0 0 18px!important;letter-spacing:.02em!important}.hero-lead{font-size:19px!important;line-height:1.55!important;margin:0 0 14px!important}.hero-text{font-size:17px!important;line-height:1.7!important;margin:0!important}.hero-grid{display:grid!important;grid-template-columns:1fr!important;gap:18px!important}.hero-card{display:none!important}.hero-actions{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;margin-top:22px!important}.hero-actions a[href*="news"],.hero-actions a[href="#news"]{display:none!important}.btn,.hero-actions .btn,.home-section-actions .btn{min-height:50px!important;font-size:17px!important;border-radius:16px!important}.footer-grid{display:grid!important;grid-template-columns:1fr!important;gap:14px!important}.footer-grid>div{padding:18px!important;border:1px solid rgba(255,255,255,.1)!important;border-radius:22px!important;background:rgba(255,255,255,.035)!important}.footer-grid a{display:inline-flex!important;margin:0 8px 10px 0!important;padding:8px 12px!important;border-radius:999px!important;background:rgba(255,255,255,.06)!important}.site-footer,.footer{padding-top:36px!important}}@media(max-width:520px){.brand-logo{width:48px!important;height:48px!important;flex-basis:48px!important}.brand-name{font-size:18px!important}.main-nav a{min-height:40px!important;padding:9px 13px!important;font-size:14px!important}.hero{padding-top:28px!important}.hero h1{font-size:clamp(36px,10.5vw,46px)!important}.hero-lead{font-size:18px!important}.hero-text{font-size:16.5px!important}}';
  document.head.appendChild(forceStyle);
  removeHomeNews();
  setTimeout(removeHomeNews,500);
  setTimeout(removeHomeNews,1500);

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

  document.querySelectorAll('a').forEach(function(link){
    var href=(link.getAttribute('href')||'').trim();
    var text=(link.textContent||'').trim();
    if(href==='talent.html'||href==='./talent.html'||href==='#talent'||href.endsWith('/talent.html')||text.indexOf('人才培訓委員會')>-1||text.indexOf('查看人才培訓委員會內容')>-1){
      link.href='training.html';
    }
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

  if(!window.GuildApi&&!document.querySelector('script[src*="guild-api.js"]')){
    var api=document.createElement('script');
    api.src='./assets/js/guild-api.js?v=20260529-mobile-hero-spacing';
    api.defer=true;
    document.body.appendChild(api);
  }
});
