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

  function injectFinalMobileStyle(){
    var old=document.getElementById('final-global-mobile-fix');
    if(old){old.remove();}
    var s=document.createElement('style');
    s.id='final-global-mobile-fix';
    s.textContent='body #news,body section#news,body .section#news{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}@media(max-width:900px){html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}.topbar{display:none!important}.site-header{position:sticky!important;top:0!important;z-index:9999!important;background:#fff!important;border-bottom:1px solid rgba(20,63,33,.12)!important;box-shadow:0 8px 24px rgba(20,45,24,.08)!important}.site-header .container,.site-header .header-inner,.header-inner{width:100%!important;max-width:100%!important;margin:0!important;padding-left:18px!important;padding-right:18px!important}.header-inner{height:auto!important;min-height:0!important;display:flex!important;flex-wrap:wrap!important;align-items:center!important;justify-content:flex-start!important;gap:10px!important;padding-top:10px!important;padding-bottom:12px!important;background:#fff!important}.brand{width:100%!important;min-width:0!important;max-width:100%!important;display:flex!important;align-items:center!important;gap:12px!important;margin:0!important;flex:1 1 100%!important}.brand-logo{width:50px!important;height:50px!important;max-height:50px!important;flex:0 0 50px!important;object-fit:contain!important}.brand-name{font-size:19px!important;line-height:1.25!important;white-space:normal!important;letter-spacing:.02em!important}.nav-toggle{display:none!important}.main-nav{position:relative!important;left:auto!important;right:auto!important;top:auto!important;display:flex!important;flex-direction:row!important;width:100%!important;max-width:100%!important;max-height:none!important;align-items:center!important;justify-content:flex-start!important;gap:9px!important;margin:0!important;padding:6px 0!important;overflow-x:auto!important;overflow-y:hidden!important;background:#fff!important;border:0!important;border-radius:0!important;box-shadow:none!important;scrollbar-width:none!important;z-index:2!important}.main-nav::-webkit-scrollbar{display:none!important}.main-nav a{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:42px!important;padding:10px 15px!important;border-radius:999px!important;background:#f6f0e3!important;color:#183f21!important;font-size:15px!important;font-weight:900!important;white-space:nowrap!important;text-decoration:none!important}.main-nav .nav-cta{background:#c6a437!important;color:#fff!important}.page-hero,.brand-hero,.hero{margin-top:0!important;padding-top:34px!important;padding-bottom:40px!important;min-height:auto!important}.page-hero .container,.brand-hero .container,.hero .container{padding-top:0!important}.page-hero .breadcrumb{margin-bottom:10px!important}.page-hero h1,.brand-hero h1,.hero h1{font-size:clamp(36px,10.8vw,50px)!important;line-height:1.15!important;margin-top:0!important;margin-bottom:16px!important;letter-spacing:.02em!important}.page-hero p,.brand-hero p,.hero-lead,.hero-text{font-size:17px!important;line-height:1.7!important;margin-top:0!important}.hero .eyebrow{display:none!important}.hero-grid,.about-grid,.brand-grid,.contact-grid,.grid-2,.grid-3,.grid-4,.feature-links,.member-grid,.roster-grid,.service-grid,.gallery-grid{display:grid!important;grid-template-columns:1fr!important;gap:18px!important}.hero-card{display:none!important}.hero-actions,.home-section-actions{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;margin-top:22px!important}.hero-actions a[href*=news],.hero-actions a[href="#news"]{display:none!important}.btn,.hero-actions .btn,.home-section-actions .btn{width:100%!important;justify-content:center!important;min-height:50px!important;font-size:17px!important;border-radius:16px!important}.section{padding:58px 0!important}.section-head h2,.section-title-block h2{font-size:clamp(30px,9.5vw,42px)!important;line-height:1.18!important}.site-footer{padding:34px 0 18px!important}.footer-grid{display:grid!important;grid-template-columns:1fr!important;gap:14px!important}.footer-grid>div{padding:18px!important;border:1px solid rgba(255,255,255,.1)!important;border-radius:22px!important;background:rgba(255,255,255,.035)!important}.footer-grid a{display:inline-flex!important;margin:0 8px 10px 0!important;padding:8px 12px!important;border-radius:999px!important;background:rgba(255,255,255,.06)!important}}@media(max-width:520px){.site-header .container,.site-header .header-inner,.header-inner{padding-left:16px!important;padding-right:16px!important}.brand-logo{width:46px!important;height:46px!important;max-height:46px!important;flex-basis:46px!important}.brand-name{font-size:18px!important}.main-nav a{min-height:40px!important;padding:9px 13px!important;font-size:14px!important}.page-hero,.brand-hero,.hero{padding-top:28px!important;padding-bottom:34px!important}.page-hero h1,.brand-hero h1,.hero h1{font-size:clamp(34px,10.5vw,44px)!important}.page-hero p,.brand-hero p,.hero-lead,.hero-text{font-size:16.5px!important}}';
    document.head.appendChild(s);
  }

  if(!document.querySelector('link[href*="premium-site.css"]')){
    var premium=document.createElement('link');
    premium.rel='stylesheet';
    premium.href='./assets/css/premium-site.css?v=20260529-global-mobile-fix';
    document.head.appendChild(premium);
  }

  injectFinalMobileStyle();
  setTimeout(injectFinalMobileStyle,400);
  setTimeout(injectFinalMobileStyle,1200);
  removeHomeNews();
  setTimeout(removeHomeNews,500);
  setTimeout(removeHomeNews,1500);

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
      node.textContent=node.textContent.replaceAll('彰榖米品牌','彰榖米').replaceAll('CHANG GU MI BRAND','CHANGHUA RICE BRAND').replaceAll('穗','榖');
    }
  });

  document.querySelectorAll('img[alt]').forEach(function(img){
    img.alt=img.alt.replaceAll('彰榖米品牌','彰榖米').replaceAll('穗','榖');
  });

  if(!window.GuildApi&&!document.querySelector('script[src*="guild-api.js"]')){
    var api=document.createElement('script');
    api.src='./assets/js/guild-api.js?v=20260529-global-mobile-fix';
    api.defer=true;
    document.body.appendChild(api);
  }
});
