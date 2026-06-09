(function(){

  'use strict';



  

  

  



  function qs(id){return document.getElementById(id)}

  function clean(v){return String(v==null?'':v).trim()}

  function esc(v){return clean(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  function url(action,params){var q=new URLSearchParams(Object.assign({action:action},params||{}));return API_URL+'?'+q.toString()}

  function fetchApi(action,params){return Promise.reject(new Error('Google API removed'))}

  function staticOrFetch(action,params){var d={};var s=window.GUILD_STATIC_DATA||{};if(action==='home')d={news:s.news||[],gallery:s.gallery||[]};else if(action==='news')d={news:s.news||[]};else if(action==='gallery')d={gallery:s.gallery||[]};else if(action==='members')d={members:s.members||[]};else if(action==='board')d={board:s.board||{}};else if(action==='notifications')d={notifications:s.notifications||[]};else if(action==='policies')d={policies:s.policies||[]};else if(action==='documents')d={documents:s.documents||[]};return Promise.resolve(d)}

  function sortList(list){return (list||[]).slice().sort(function(a,b){if(!!a.isPinned!==!!b.isPinned)return a.isPinned?-1:1;if((Number(a.sort)||999)!==(Number(b.sort)||999))return (Number(a.sort)||999)-(Number(b.sort)||999);return String(b.date||'').localeCompare(String(a.date||''))})}

  function injectStyles(){if(document.getElementById('guild-api-photo-style'))return;

  var s=document.createElement('style');

  s.id='guild-api-photo-style';

  s.textContent='.activity-card{background:#fff;border:1px solid #e6ddc9;border-radius:22px;overflow:hidden;box-shadow:0 14px 36px rgba(20,45,24,.07)}.activity-cover{aspect-ratio:16/9;background:#f7f1e3;margin:0;overflow:hidden;cursor:zoom-in}.activity-cover img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}.activity-cover:hover img{transform:scale(1.05)}.activity-card-body{padding:22px}.activity-card-body h3{color:#183f21}.activity-card-body p{color:#666;line-height:1.8}.activity-photo-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 22px 22px}.activity-photo-strip figure{margin:0;border-radius:14px;overflow:hidden;aspect-ratio:4/3;border:1px solid #e6ddc9;background:#f7f1e3;cursor:zoom-in}.activity-photo-strip img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}.activity-photo-strip figure:hover img{transform:scale(1.07)}.activity-photo-strip figcaption{background:#fff;padding:7px 9px;color:#526055;font-size:13px}.activity-photo-note{margin:0 22px 22px;color:#666;font-size:14px}#guild-lightbox{position:fixed;inset:0;background:rgba(10,10,10,.92);z-index:99999;display:none;align-items:center;justify-content:center;flex-direction:column;padding:20px}#guild-lightbox.open{display:flex}#guild-lb-wrap{text-align:center;max-width:92vw}#guild-lb-img{max-width:92vw;max-height:80vh;object-fit:contain;border-radius:8px;display:block;margin:0 auto;box-shadow:0 8px 60px rgba(0,0,0,.7)}#guild-lb-caption{color:#d4c9b0;font-size:15px;margin-top:12px}#guild-lb-counter{color:#888;font-size:13px;margin-top:4px}.guild-lb-close{position:fixed;top:16px;right:20px;color:#fff;font-size:24px;cursor:pointer;background:rgba(255,255,255,.14);border:none;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;transition:background .2s;z-index:100000}.guild-lb-close:hover{background:rgba(255,255,255,.3)}.guild-lb-nav{position:fixed;top:50%;transform:translateY(-50%);color:#fff;font-size:40px;cursor:pointer;background:rgba(255,255,255,.1);border:none;border-radius:50%;width:52px;height:52px;display:flex;align-items:center;justify-content:center;transition:background .2s;user-select:none;z-index:100000}.guild-lb-nav:hover{background:rgba(255,255,255,.25)}#guild-lb-prev{left:14px}#guild-lb-next{right:14px}@media(max-width:900px){.activity-photo-strip{grid-template-columns:repeat(2,1fr)}.guild-lb-nav{width:42px;height:42px;font-size:30px}}@media(max-width:560px){.activity-photo-strip{grid-template-columns:repeat(2,1fr)}.guild-lb-close{top:8px;right:10px}}}}.notif-item:hover{box-shadow:0 6px 20px rgba(20,45,24,.09)}.notif-btn-link:hover{background:#183f21;color:#fff}.notif-btn-dl:hover{background:#c6a437;color:#fff}@media(max-width:680px){}.notif-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.notif-card{background:#fff;border:1px solid #e6ddc9;border-radius:18px;padding:22px 24px;box-shadow:0 4px 16px rgba(20,45,24,.06);transition:box-shadow .2s,transform .2s;display:flex;flex-direction:column}.notif-card:hover{box-shadow:0 10px 28px rgba(20,45,24,.11);transform:translateY(-2px)}.notif-card-top{display:flex;align-items:center;gap:10px;margin-bottom:12px}.notif-agency-pill{display:inline-block;color:#fff;font-size:.65rem;font-weight:800;padding:4px 12px;border-radius:20px;white-space:nowrap;letter-spacing:.03em}.notif-date-small{font-size:.74rem;color:#aaa;margin-left:auto}.notif-title{font-size:.98rem;font-weight:800;color:#183f21;line-height:1.45;margin:0 0 8px}.notif-summary{font-size:.84rem;color:#666;line-height:1.65;margin:0;flex:1}.notif-btns{margin-top:4px}@media(max-width:900px){.notif-grid{grid-template-columns:1fr}}';

  document.head.appendChild(s);

  var lb=document.createElement('div');

  lb.id='guild-lightbox';

  lb.innerHTML='<button class="guild-lb-close" onclick="guildLbClose()">&#x2715;</button><button class="guild-lb-nav" id="guild-lb-prev" onclick="guildLbNav(-1)">&#8249;</button><div id="guild-lb-wrap"><img id="guild-lb-img" src="" alt=""><p id="guild-lb-caption"></p><span id="guild-lb-counter"></span></div><button class="guild-lb-nav" id="guild-lb-next" onclick="guildLbNav(1)">&#8250;</button>';

  lb.addEventListener('click',function(e){if(e.target===lb)guildLbClose();});

  document.body.appendChild(lb);

  window._lbPhotos=[];

  window._lbIdx=0;

  window._lbAlbums={};

  window.guildLb=function(albumId,idx){

    var photos=window._lbAlbums[albumId]||[];

    if(!photos.length)return;

    window._lbPhotos=photos;

    window._lbIdx=(idx||0);

    _guildLbShow();

    document.getElementById('guild-lightbox').classList.add('open');

    document.addEventListener('keydown',_guildLbKey);

  };

  window.guildLbClose=function(){

    document.getElementById('guild-lightbox').classList.remove('open');

    document.removeEventListener('keydown',_guildLbKey);

  };

  window.guildLbNav=function(dir){

    var n=window._lbPhotos.length;

    if(!n)return;

    window._lbIdx=(window._lbIdx+dir+n)%n;

    _guildLbShow();

  };

  function _guildLbShow(){

    var p=window._lbPhotos[window._lbIdx];

    if(!p)return;

    var imgEl=document.getElementById('guild-lb-img');

    imgEl.src='';

    imgEl.src=p.src;

    imgEl.alt=p.alt||'';

    document.getElementById('guild-lb-caption').textContent=p.alt||'';

    var n=window._lbPhotos.length;

    document.getElementById('guild-lb-counter').textContent=n>1?(window._lbIdx+1)+' / '+n:'';

    document.getElementById('guild-lb-prev').style.display=n>1?'flex':'none';

    document.getElementById('guild-lb-next').style.display=n>1?'flex':'none';

  }

  function _guildLbKey(e){

    if(e.key==='Escape')guildLbClose();

    else if(e.key==='ArrowLeft')guildLbNav(-1);

    else if(e.key==='ArrowRight')guildLbNav(1);

  }

}

  function extractDriveFolderId(url){url=clean(url);var m=url.match(/\/folders\/([^/?#]+)/);return m&&m[1]?m[1]:''}

  function extractDriveFileId(url){url=clean(url);var m=url.match(/\/file\/d\/([^/?#]+)/);if(m&&m[1])return m[1];m=url.match(/[?&]id=([^&]+)/);return m&&m[1]?m[1]:''}

  function isUsableImageUrl(v){v=clean(v);if(!v)return false;if(/^https?:\/\//i.test(v)&&/\.(jpg|jpeg|png|webp|gif)(\?|#|$)/i.test(v))return true;if(/^(\.\/)?(圖庫|assets|files)\/./.test(v))return true;return false}

  function driveImageUrl(url){return clean(url)}

  function driveFolderEmbed(url){return ''}

  function isTrainingItem(item){var t=clean(item.title||item.activityTitle);return t.indexOf('115年度會員教育訓練')>-1||t.indexOf('農產品業稅務')>-1}

  function newsBadgeColor(cat){var m={'教育訓練':'#c6a437','會務公告':'#183f21','公益活動':'#2e7d52','訓練品質':'#1565c0','活動通知':'#6a1b9a'};return m[cat]||'#183f21';}

  function newsCard(item){

    var cat=esc(item.category||'公告');

    var color=newsBadgeColor(item.category||'');

    var badge='<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:.65rem;font-weight:800;letter-spacing:.04em;background:'+color+';color:#fff;margin-bottom:8px">'+cat+'</span>';

    var link=item.registerUrl?'<a href="'+esc(item.registerUrl)+'" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:.8rem;font-weight:700;color:'+color+'">查看詳情 →</a>':'';

    return '<article style="background:#fff;border:1px solid #e6ddc9;border-radius:16px;padding:20px 22px;box-shadow:0 4px 14px rgba(20,45,24,.06);transition:box-shadow .2s">'+badge+'<h3 style="font-size:.98rem;font-weight:800;color:#183f21;line-height:1.4;margin-bottom:6px">'+esc(item.title)+'</h3>'+(item.summary?'<p style="font-size:.82rem;color:#61716b;line-height:1.65">'+esc(item.summary)+'</p>':'')+'<div style="font-size:.72rem;color:#aaa;margin-top:8px">'+esc(item.rocDate||item.date)+'</div>'+link+'</article>';

  }

  function announceCard(item){

    var cat=esc(item.category||'公告');

    var color=newsBadgeColor(item.category||'');

    return '<div style="background:#fff;border:1px solid #e6ddc9;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;transition:box-shadow .18s"><div style="width:8px;height:8px;border-radius:50%;background:'+color+';flex-shrink:0"></div><div style="font-size:.72rem;color:#aaa;flex-shrink:0;width:80px">'+esc(item.rocDate||item.date)+'</div><div style="font-size:.9rem;font-weight:700;color:#183f21;flex:1">'+esc(item.title)+'</div><span style="background:'+color+';color:#fff;font-size:.62rem;font-weight:800;padding:2px 8px;border-radius:20px;flex-shrink:0;white-space:nowrap">'+cat+'</span></div>';

  }

  function photoGrid(item,coverOffset){

  var co=coverOffset||0;

  var photos=(item.photos||[]).filter(function(p){return isUsableImageUrl(p.url||p.rawUrl);});

  if(photos.length){return '<div class="activity-photo-strip">'+photos.map(function(p,i){var img=p.url||p.rawUrl;return '<figure onclick="guildLb(\''+esc(item.id)+'\','+(i+co)+')"><img src="'+esc(img)+'" alt="'+esc(p.caption||item.title)+'" loading="lazy"><figcaption>'+esc(p.caption||'活動照片')+'</figcaption></figure>';}).join('')+'</div>';}

  if(isUsableImageUrl(item.coverImage)){return '<div class="activity-photo-strip"><figure onclick="guildLb(\''+esc(item.id)+'\',0)"><img src="'+esc(item.coverImage)+'" alt="'+esc(item.title)+'" loading="lazy"><figcaption>活動照片</figcaption></figure></div>';}

  return '';

}

  function featuredNewsCard(item){

  var hasImg=item.coverImage&&isUsableImageUrl(item.coverImage);

  var imgHtml=hasImg?'<div class="news-feat-img"><img src="'+esc(item.coverImage)+'" alt="'+esc(item.title)+'" loading="lazy"><span class="news-tag">'+esc(item.category||'消息')+'</span></div>':'';

  var bodyExtras=hasImg?'':'<span class="news-tag" style="margin-bottom:10px;display:inline-block">'+esc(item.category||'消息')+'</span><br>';

  var link=item.registerUrl?'<a href="'+esc(item.registerUrl)+'" target="_blank" rel="noopener" style="display:inline-block;margin-top:12px;padding:7px 18px;background:#b08a2e;color:#fff;border-radius:20px;font-size:.82rem;text-decoration:none">了解更多 →</a>':'';

  return '<div class="news-feat-card">'+imgHtml+'<div class="news-feat-body">'+bodyExtras+'<div class="news-date">'+esc(item.rocDate||item.date)+'</div><h2>'+esc(item.title)+'</h2>'+(item.summary?'<p>'+esc(item.summary)+'</p>':'')+link+'</div></div>';

}

function recentNewsCard(item){

  var isDM=item.category==='招生DM';

  var hasImg=item.coverImage&&isUsableImageUrl(item.coverImage);

  var imgHtml;

  if(hasImg){

    var clickTarget=isDM&&(item.dmFileUrl||item.registerUrl)?item.dmFileUrl||item.registerUrl:item.coverImage;

    imgHtml='<a href="'+esc(clickTarget)+'" target="_blank" rel="noopener" style="display:block;position:relative;overflow:hidden">'

      +'<div class="news-list-img"><img src="'+esc(item.coverImage)+'" alt="'+esc(item.title)+'" loading="lazy"></div>'

      +(isDM?'<div style="position:absolute;bottom:6px;right:6px;background:rgba(0,0,0,.55);color:#fff;border-radius:8px;padding:3px 8px;font-size:.68rem">👆 點開查看</div>':'')

      +'</a>';

  } else {

    imgHtml='<div class="news-list-img" style="background:linear-gradient(135deg,'+(isDM?'#7b1a1a,#c0392b':'#e8f5e9,#f7f1e3')+';display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-size:.7rem;font-weight:700;text-align:center;padding:8px">'

      +(isDM?'<span style="font-size:1.5rem">📄</span><span>招生DM</span>':'<span style="color:#5a7a5e">'+esc(item.category||'消息')+'</span>')

      +'</div>';

  }

  var registerBtn='';

  if(item.registerUrl){

    var btnColor=isDM?'linear-gradient(135deg,#c0392b,#e74c3c)':'linear-gradient(135deg,#183f21,#24592f)';

    var btnLabel=isDM?'👆 立即報名 →':'🔗 詳細資訊 →';

    registerBtn='<a href="'+esc(item.registerUrl)+'" target="_blank" rel="noopener"'

      +' style="display:inline-flex;align-items:center;gap:6px;align-self:flex-start;margin-top:10px;padding:9px 20px;'

      +'background:'+btnColor+';color:#fff;border-radius:25px;font-size:.88rem;font-weight:800;text-decoration:none;'

      +'box-shadow:0 4px 12px rgba(0,0,0,.2)">'+btnLabel+'</a>';

  }

  var summaryHtml=item.summary?'<p style="font-size:.84rem;color:#666;line-height:1.6;margin-top:4px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">'+esc(item.summary)+'</p>':'';

  return '<div class="news-list-card">'

    +imgHtml

    +'<div class="news-list-body">'

    +'<div class="news-meta"><span class="news-badge"'+(isDM?' style="background:#c0392b;color:#fff"':'')+'>'+esc(item.category||'消息')+'</span>'

    +'<span style="font-size:.74rem;color:#8c8c8c">'+esc(item.rocDate||item.date)+'</span></div>'

    +'<h3>'+esc(item.title)+'</h3>'

    +summaryHtml

    +registerBtn

    +'</div></div>';

}

function galleryCard(item){

  var hasCover=item.coverImage&&isUsableImageUrl(item.coverImage);

  var lbPhotos=[];

  if(hasCover)lbPhotos.push({src:item.coverImage,alt:item.title});

  (item.photos||[]).filter(function(p){return isUsableImageUrl(p.url||p.rawUrl);}).forEach(function(p){lbPhotos.push({src:p.url||p.rawUrl,alt:p.caption||item.title});});

  if(window._lbAlbums)window._lbAlbums[esc(item.id)]=lbPhotos;

  var coverOffset=hasCover?1:0;

  var photos=photoGrid(item,coverOffset);

  var cover=hasCover?'<figure class="activity-cover" onclick="guildLb(\''+esc(item.id)+'\',0)"><img src="'+esc(item.coverImage)+'" alt="'+esc(item.title)+'" loading="lazy"></figure>':'';

  return '<article class="activity-card">'+cover+'<div class="activity-card-body"><span class="tag">'+esc(item.category||'活動花絮')+'</span><h3>'+esc(item.title)+'</h3><time>'+esc(item.rocDate||item.date)+'</time>'+(item.summary?'<p>'+esc(item.summary)+'</p>':'')+(item.result?'<p>'+esc(item.result)+'</p>':'')+'</div>'+photos+'</article>';

}

  function homeNewsCard(item){

  var cat=item.category||'消息';

  var isDM=cat==='招生DM';

  var COLORS={

    '政策公告':'linear-gradient(135deg,#183f21,#24592f)',

    '教育訓練':'linear-gradient(135deg,#1a5c4a,#2d9b78)',

    '訓練品質':'linear-gradient(135deg,#2e5cb8,#1a3060)',

    '會務公告':'linear-gradient(135deg,#183f21,#0d2714)',

    '公益活動':'linear-gradient(135deg,#6b3a2e,#8a5a40)',

    '會員大會':'linear-gradient(135deg,#5c4a00,#8a6800)',

    '招生DM':'linear-gradient(135deg,#7b1a1a,#c0392b)'

  };

  var bg=COLORS[cat]||'linear-gradient(135deg,#183f21,#1a5c4a)';

  var hasImg=item.coverImage&&isUsableImageUrl(item.coverImage);

  var imgHtml=hasImg?'<img src="'+esc(item.coverImage)+'" alt="'+esc(item.title)+'" loading="lazy">':'';

  var dateStr=item.rocDate||item.date||'';

  var linkHtml;

  if(isDM&&item.registerUrl){

    linkHtml='<a href="'+esc(item.registerUrl)+'" target="_blank" rel="noopener"'

      +' style="display:block;margin-top:16px;padding:14px 20px;'

      +'background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;border-radius:10px;'

      +'font-size:.98rem;font-weight:900;text-decoration:none;text-align:center;'

      +'letter-spacing:.04em;box-shadow:0 5px 18px rgba(192,57,43,.38);">'

      +'✏️ 立即報名 →</a>';

  }else{

    var linkHref=item.registerUrl?esc(item.registerUrl):'news.html';

    var target=item.registerUrl?' target="_blank" rel="noopener"':'';

    linkHtml='<a href="'+linkHref+'"'+target+' class="news-link-l">查看詳情 →</a>';

  }

  return '<div class="news-card-l">'

    +'<div class="news-card-l-img" style="background:'+bg+'">'+imgHtml

    +'<span class="news-tag-l">'+esc(cat)+'</span>'

    +'</div>'

    +'<div class="news-card-l-body">'

    +'<div class="news-date-l">'+esc(dateStr)+'</div>'

    +'<h3>'+esc(item.title||'')+'</h3>'

    +(item.summary?'<p>'+esc(item.summary)+'</p>':'')

    +linkHtml

    +'</div>'

    +'</div>';

}



function renderHome(){

  var newsBox=qs('homeNewsList');

  var galleryBox=qs('homeGalleryList');

  if(!newsBox&&!galleryBox)return;

  staticOrFetch('home').then(function(data){

    if(newsBox){

      var allN=sortList(data.news||[]);

      var dmN=allN.filter(function(n){return n.category==='招生DM';});

      var otherN=allN.filter(function(n){return n.category!=='招生DM';});

      var news=dmN.concat(otherN).slice(0,3);

      newsBox.innerHTML=news.length?news.map(homeNewsCard).join(''):

        '<div style="color:#888;padding:20px">近期無最新消息</div>';

    }

    if(galleryBox){

      var gallery=sortList(data.gallery||[]).slice(0,6);

      galleryBox.innerHTML=gallery.length?gallery.map(galleryCard).join(''):

        '<article class="service-card"><h3>活動花絮整理中</h3><p>活動結束後將於此呈現。</p></article>';

    }

  }).catch(function(){

    if(newsBox){

      newsBox.innerHTML='<div style="color:#888;padding:20px">消息載入失敗，請稍後再試</div>';

    }

  });

}

function renderNewsPage(){

  var featBox    = qs('featuredNewsList');

  var recentBox  = qs('recentNewsList');

  var annBox     = qs('announceList');

  var notifBox   = qs('notifList');

  var galleryBox = qs('galleryApiList');

  if(!featBox&&!recentBox&&!annBox&&!notifBox&&!galleryBox)return;



  if(featBox||recentBox||annBox){

    staticOrFetch('news',{limit:100}).then(function(data){

      var all=sortList(data.news||[]);

      var nonAnn=all.filter(function(n){return n.category!=='會務公告';});

      var ann=all.filter(function(n){return n.category==='會務公告';});

      if(featBox){

        var pinned=nonAnn.filter(function(n){return n.isPinned;}).slice(0,2);

        featBox.innerHTML=pinned.length?pinned.map(featuredNewsCard).join(''):

          '<div style="color:#888;padding:20px 0">近期無精選消息</div>';

      }

      if(recentBox){

        var recent=nonAnn.filter(function(n){return !n.isPinned;}).sort(function(a,b){var da=a.date||(a.rocDate?a.rocDate.split('.').map(function(x,i){return i===0?String(Number(x)+1911):x.padStart(2,'0')}).join('-'):'');var db=b.date||(b.rocDate?b.rocDate.split('.').map(function(x,i){return i===0?String(Number(x)+1911):x.padStart(2,'0')}).join('-'):'');return db.localeCompare(da);}).slice(0,5);

        recentBox.innerHTML=recent.length?recent.map(recentNewsCard).join(''):

          '<div style="color:#888;padding:20px 0">近期無消息</div>';

      }

      if(annBox){

        annBox.innerHTML=ann.length?ann.map(announceCard).join(''):

          '<div style="color:#888;padding:16px 0">目前無會務公告</div>';

      }

    }).catch(function(){

      if(featBox)featBox.innerHTML='<div style="color:#888">消息載入失敗</div>';

    });

  }



  if(notifBox){

    staticOrFetch('notifications').then(function(data){

      var list=(data.notifications||[]).slice().sort(function(a,b){

        return (b.rocDate||b.date||'').localeCompare(a.rocDate||a.date||'');

      });

      var sec=document.getElementById('notifSection');

      if(list.length){

        notifBox.innerHTML='<div class="notif-grid">'+list.map(notifCard).join('')+'</div>';

        if(sec)sec.style.display='';

      } else {

        notifBox.innerHTML='<div style="color:#888;padding:16px 0">目前無訊息轉知</div>';

        if(sec)sec.style.display='none';

      }

    });

  }



  if(galleryBox){

    staticOrFetch('gallery',{limit:100}).then(function(data){

      var list=sortList(data.gallery||[]);

      galleryBox.innerHTML=list.length?list.map(galleryCard).join(''):

        '<article class="activity-card"><div class="activity-card-body"><h3>活動花絮整理中</h3><p>活動結束後將於此呈現。</p></div></article>';

    }).catch(function(){

      galleryBox.innerHTML='<article class="activity-card"><div class="activity-card-body"><h3>活動花絮整理中</h3><p>請稍後再試。</p></div></article>';

    });

  }

}

  function fixTalentLinks(){document.querySelectorAll('a').forEach(function(a){var href=(a.getAttribute('href')||'').trim();var text=(a.textContent||'').trim();if(href==='talent.html'||href==='./talent.html'||href==='#talent'||href.endsWith('/talent.html')||text.indexOf('人才培訓委員會')>-1||text.indexOf('查看人才培訓委員會內容')>-1){a.setAttribute('href','training.html')}})}



  function renderBoardPage(){

  var box=qs('boardApiList');

  if(!box)return;

  var s=window.GUILD_STATIC_DATA||{};

  var bd=s.board||{};

  var members=bd.members||[];

  if(!members.length){

    box.innerHTML='<p style="color:#888;padding:30px 0;text-align:center">理監事名冊載入中...</p>';

    return;

  }

  var titleEl=qs('boardTermTitle');

  if(titleEl&&bd.term)titleEl.textContent=bd.term+'理監事名冊';



  var dirCnt=0,supCnt=0,chairCnt=0;

  members.forEach(function(m){

    var r=m.role||'';

    if(r==='理事長')chairCnt++;

    else if(r==='常務理事'||r==='理事')dirCnt++;

    else if(r==='常務監事'||r==='監事')supCnt++;

  });

  var sumCards=document.querySelectorAll('.sum-card b');

  if(sumCards.length>=3){sumCards[0].textContent=chairCnt;sumCards[1].textContent=dirCnt;sumCards[2].textContent=supCnt;}



  var BASE='https://ccazhu-coder.github.io/changhwa-rice-guild/';



  function nameCard(m){

    var hasPhoto=m.photo&&isUsableImageUrl(m.photo);

    var photoSrc=hasPhoto?(BASE+m.photo.replace('./','')):' ';

    var surname=esc((m.name||'人').slice(0,1));

    var isLongRole=(m.role||'').length>4;

    var photoHtml=hasPhoto

      ?('<img src="'+esc(photoSrc)+'" alt="'+esc(m.name)+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">'

       +'<div class="nc-initial" style="display:none">'+surname+'</div>')

      :'<div class="nc-initial">'+surname+'</div>';

    return '<article class="nc-card">'

      +'<div class="nc-photo">'+photoHtml+'</div>'

      +'<div class="nc-info">'

      +'<div class="nc-role'+(isLongRole?' nc-role-long':'')+'">'+esc(m.role||'')+'</div>'

      +'<div class="nc-name">'+esc(m.name||'')+'</div>'

      +'<div class="nc-company">'+esc(m.company||'')+'</div>'

      +'</div>'

      +'</article>';

  }



  // 理事會: 理事長 solo row / 常務理事 2-col / 理事 2-col

  function renderDirGroup(list){

    var chair    = list.filter(function(m){return m.role==='理事長';});

    var standing = list.filter(function(m){return m.role==='常務理事';});

    var dirs     = list.filter(function(m){return m.role==='理事';});

    var h='';

    if(chair.length)    h+='<div class="nc-grid-solo">'+chair.map(nameCard).join('')+'</div>';

    if(standing.length) h+='<div class="nc-grid">'+standing.map(nameCard).join('')+'</div>';

    if(dirs.length)     h+='<div class="nc-grid">'+dirs.map(nameCard).join('')+'</div>';

    return h;

  }



  var GROUPS=[

    {label:'理事長、常務理事與理事',

     test:function(r){return r==='理事長'||r==='常務理事'||r==='理事';},

     custom:true},

    {label:'常務監事與監事',

     test:function(r){return r==='常務監事'||r==='監事';}},

    {label:'候補理事與候補監事',

     test:function(r){return r.indexOf('候補')>=0;}},

    {label:'名譽理事長與顧問',

     honoraryFirst:true,

     test:function(r){return r==='名譽理事長'||r==='顧問';}}

  ];



  var html='';

  GROUPS.forEach(function(g){

    var list=members.filter(function(m){return g.test(m.role||'');});

    if(g.honoraryFirst){list=list.slice().sort(function(a,b){return a.role==='名譽理事長'?-1:b.role==='名譽理事長'?1:0;});}

    if(!list.length)return;

    var gridHtml=g.custom

      ? renderDirGroup(list)

      : '<div class="nc-grid">'+list.map(nameCard).join('')+'</div>';

    html+='<div class="nc-group">'

      +'<div class="nc-group-header"><span class="nc-group-label">'+esc(g.label)+'</span></div>'

      +gridHtml

      +'</div>';

  });

  box.innerHTML=html||'<p style="color:#888;text-align:center;padding:20px">目前無理監事資料</p>';

}











  function renderTrainingPage(){

    var box=qs('trainingGalleryList');

    if(!box)return;

    staticOrFetch('gallery',{limit:50}).then(function(data){

      var list=sortList(data.gallery||[]).filter(function(item){

        return (item.category||'')==='教育訓練';

      });

      if(!list.length){

        box.innerHTML='<p style="color:#666;padding:20px">尚無教育訓練活動記錄。</p>';

        return;

      }

      box.innerHTML=list.map(galleryCard).join('');

    }).catch(function(){

      box.innerHTML='<p style="color:#666;padding:20px">載入失敗，請稍後再試。</p>';

    });

  }

  function notifCard(item){

  var agencyColor={'農糧署':'#2e6b2e','衛生局':'#1a5c8c','產銷履歷':'#7a4e00',

    '環保局':'#1a6b5c','農業部':'#3a5a1a','食藥署':'#8b1a1a'}[item.agency||'']||'#183f21';

  var linkBtn=item.externalUrl

    ?'<a href="'+esc(item.externalUrl)+'" target="_blank" rel="noopener"'

     +' style="display:inline-block;margin-top:12px;margin-right:8px;padding:8px 20px;background:'+agencyColor+';color:#fff;border-radius:20px;font-size:.82rem;font-weight:800;text-decoration:none">🔗 查看連結 →</a>'

    :'';

  var fileBtn=item.fileUrl

    ?'<a href="'+esc(item.fileUrl)+'" target="_blank" rel="noopener"'

     +' style="display:inline-block;margin-top:12px;padding:8px 18px;background:rgba(198,164,55,.15);color:#7d5c0a;border:1px solid rgba(198,164,55,.4);border-radius:20px;font-size:.78rem;font-weight:700;text-decoration:none">📎 '+(item.fileLabel||'附件下載')+'</a>'

    :'';

  return '<div class="notif-card">'

    +'<div class="notif-card-top">'

    +'<span class="notif-agency-pill" style="background:'+agencyColor+'">'+esc(item.agency||'公告')+'</span>'

    +'<span class="notif-date-small">'+esc(item.rocDate||item.date||'')+'</span>'

    +'</div>'

    +'<h3 class="notif-title">'+esc(item.title||'')+'</h3>'

    +(item.summary?'<p class="notif-summary">'+esc(item.summary)+'</p>':'')

    +(linkBtn||fileBtn?'<div class="notif-btns">'+linkBtn+fileBtn+'</div>':'')

    +'</div>';

}

function renderDownloadsPage(){

  var box=qs('notifListDownloads');

  if(!box)return;

  staticOrFetch('notifications').then(function(data){

    var list=(data.notifications||[]).slice().sort(function(a,b){

      return (b.rocDate||b.date||'').localeCompare(a.rocDate||a.date||'');

    });

    box.innerHTML=list.length?'<div class="notif-grid">'+list.map(notifCard).join('')+'</div>'

      :'<div style="color:#888;padding:20px 0">目前無訊息轉知</div>';

    var sec=document.getElementById('notifDownloadSection');

    if(sec)sec.style.display=list.length?'':'none';

  });

}



  

function renderPoliciesPage(){

  var box=qs('policiesList');

  if(!box)return;

  staticOrFetch('policies').then(function(data){

    var list=data.policies||[];

    if(!list.length){box.innerHTML='<p style="color:#888;padding:20px">目前無政策法規資料</p>';return;}

    var CAT_CONFIG={

      '糧食產業類':    {icon:'🌾', color:'#8a6800', bg:'#fffbee', border:'#c6a437'},

      '糧食儲運類':    {icon:'📦', color:'#1a5c4a', bg:'#f0faf7', border:'#2d9b78'},

      '食品安全衛生管理法規':{icon:'🛡️', color:'#7b1a1a', bg:'#fdf4f4', border:'#c0392b'},

      '人民團體法規':  {icon:'📋', color:'#1a3060', bg:'#f0f3fa', border:'#2e5cb8'}

    };

    var DEFAULT={icon:'📄', color:'#666', bg:'#f9f9f9', border:'#aaa'};

    var cats={};

    var catOrder=[];

    list.forEach(function(p){

      var c=p.category||'其他';

      if(!cats[c]){cats[c]=[];catOrder.push(c);}

      cats[c].push(p);

    });

    var html='';

    catOrder.forEach(function(cat){

      var cfg=CAT_CONFIG[cat]||DEFAULT;

      html+='<div class="pol-group pol-custom" style="background:'+cfg.bg+';border:1px solid '+cfg.border+'33;border-left:4px solid '+cfg.border+';border-radius:16px;padding:22px 26px;margin-bottom:26px">'

        +'<div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:18px;padding-bottom:12px;border-bottom:1.5px solid '+cfg.border+'44">'

        +'<span style="font-size:1.6rem">'+cfg.icon+'</span>'

        +'<h3 style="font-size:1.3rem;font-weight:900;color:'+cfg.color+';margin:0;text-align:center">'+esc(cat)+'</h3>'

        +'<span style="margin-left:auto;font-size:.72rem;color:'+cfg.border+';font-weight:700;background:'+cfg.border+'18;padding:3px 10px;border-radius:20px">'+list.filter(function(p){return(p.category||'其他')===cat;}).length+' 條</span>'

        +'</div>'

        +'<div style="display:grid;gap:10px">';

      cats[cat].sort(function(a,b){return (a.sort||0)-(b.sort||0);}).forEach(function(p){

        html+='<div style="display:flex;align-items:center;gap:12px;background:#fff;border:1px solid '+cfg.border+'28;border-radius:10px;padding:12px 16px;">'

          +'<span style="width:8px;height:8px;border-radius:50%;background:'+cfg.border+';flex-shrink:0;display:inline-block"></span>';

        if(p.url){

          html+='<a href="'+esc(p.url)+'" target="_blank" rel="noopener" style="color:#183f21;font-weight:600;font-size:.9rem;text-decoration:none;flex:1;line-height:1.5">'+esc(p.name)+'<span style="font-size:.72rem;color:'+cfg.border+';margin-left:6px;opacity:.8">↗ 查看條文</span></a>';

        } else {

          html+='<span style="color:#526055;font-size:.9rem;flex:1">'+esc(p.name)+'</span>';

        }

        html+='</div>';

      });

      html+='</div></div>';

    });

    box.innerHTML=html||'<p style="color:#888">目前無政策法規資料</p>';

    var sec=document.getElementById('policiesSection');

    if(sec)sec.style.display='';

  });

}



  document.addEventListener('DOMContentLoaded',function(){injectStyles();fixTalentLinks();renderHome();renderNewsPage();renderTrainingPage();renderBoardPage();renderPoliciesPage();renderDownloadsPage()});

  window.GuildApi={renderHome:renderHome,renderNewsPage:renderNewsPage,renderTrainingPage:renderTrainingPage,fixTalentLinks:fixTalentLinks};

})();

