document.addEventListener('DOMContentLoaded',function(){
  var driveDownloadUrl='https://drive.google.com/drive/folders/1gFGAe7XzWiInrsvZU98515skZGYOtVNj?usp=sharing';

  function removeHomeNews(){
    document.querySelectorAll('#news,section#news,.section#news').forEach(function(el){el.remove();});
    document.querySelectorAll('section,.section').forEach(function(el){
      var text=(el.textContent||'').replace(/\s+/g,'');
      if(text.indexOf('NEWS最新消息')>-1||text.indexOf('首頁僅保留最新三則公告')>-1){el.remove();}
    });
  }

  var forceStyle=document.createElement('style');
  forceStyle.id='force-mobile-layout-style';
  forceStyle.textContent='body #news,body section#news,body .section#news{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}@media(max-width:900px){html,body{overflow-x:hidden!important}.site-header{position:sticky!important;top:0!important;z-index:9999!important;background:rgba(255,255,255,.98)!important;border-bottom:1px solid rgba(20,63,33,.1)!important}.header-inner{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:12px!important;height:auto!important;min-height:auto!important;padding:12px 0!important}.brand{width:100%!important;min-width:0!important;display:flex!important;align-items:center!important;gap:12px!important;margin:0!important}.brand-logo{width:54px!important;height:54px!important;flex:0 0 54px!important;object-fit:contain!important}.brand-name{font-size:20px!important;line-height:1.25!important;white-space:normal!important}.nav-toggle{display:none!important}.main-nav{position:static!important;display:flex!important;flex-direction:row!important;width:100%!important;gap:10px!important;padding:4px 0!important;overflow-x:auto!important;overflow-y:hidden!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;scrollbar-width:none!important}.main-nav::-webkit-scrollbar{display:none!important}.main-nav a{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:46px!important;padding:12px 17px!important;border-radius:999px!important;background:#f6f0e3!important;color:#183f21!important;font-size:16px!important;font-weight:900!important;white-space:nowrap!important}.main-nav .nav-cta{background:#c6a437!important;color:#fff!important}.footer-grid{display:grid!important;grid-template-columns:1fr!important;gap:14px!important}.footer-grid>div{padding:18px!important;border:1px solid rgba(255,255,255,.1)!important;border-radius:22px!important;background:rgba(255,255,255,.035)!important}.footer-grid a{display:inline-flex!important;margin:0 8px 10px 0!important;padding:8px 12px!important;border-radius:999px!important;background:rgba(255,255,255,.06)!important}.site-footer,.footer{padding-top:36px!important}}';
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
    api.src='./assets/js/guild-api.js?v=20260529-force-mobile-news-remove';
    api.defer=true;
    document.body.appendChild(api);
  }
});
