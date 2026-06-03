document.addEventListener('DOMContentLoaded',function(){
  /* drive redirect removed */
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
