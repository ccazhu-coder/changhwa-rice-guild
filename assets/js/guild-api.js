(function(){
  'use strict';

  var API_URL='https://script.google.com/macros/s/AKfycbxRNBUMIhLehiHSWftGhqWbptX9EmCzOvHqXEuNF4CTJIm98FcwX4A2hWR9EIhLwVpl/exec';
  var ROOT_ALBUM_URL='https://drive.google.com/drive/folders/1SS6P3pbiw3e1V9uN50AT1HPHAhm3nZz1?usp=sharing';
  var TRAINING_ALBUM_URL='https://drive.google.com/drive/folders/1_WG6OUeyx0-5ib8AuWi5IoiYrwTeMkEl';

  function qs(id){return document.getElementById(id)}
  function clean(v){return String(v==null?'':v).trim()}
  function esc(v){return clean(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function url(action,params){var q=new URLSearchParams(Object.assign({action:action},params||{}));return API_URL+'?'+q.toString()}
  function fetchApi(action,params){return fetch(url(action,params),{method:'GET',cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('API '+r.status);return r.json()}).then(function(json){return json&&json.data?json.data:{}})}
  function staticOrFetch(action,params){if(window.GUILD_STATIC_DATA){var d={};if(action==='home')d={news:window.GUILD_STATIC_DATA.news||[],gallery:window.GUILD_STATIC_DATA.gallery||[]};else if(action==='news')d={news:window.GUILD_STATIC_DATA.news||[]};else if(action==='gallery')d={gallery:window.GUILD_STATIC_DATA.gallery||[]};return Promise.resolve(d)}return fetchApi(action,params)}
  function sortList(list){return (list||[]).slice().sort(function(a,b){if(!!a.isPinned!==!!b.isPinned)return a.isPinned?-1:1;if((Number(a.sort)||999)!==(Number(b.sort)||999))return (Number(a.sort)||999)-(Number(b.sort)||999);return String(b.date||'').localeCompare(String(a.date||''))})}
  function injectStyles(){if(document.getElementById('guild-api-photo-style'))return;var s=document.createElement('style');s.id='guild-api-photo-style';s.textContent='.activity-card{background:#fff;border:1px solid #e6ddc9;border-radius:22px;overflow:hidden;box-shadow:0 14px 36px rgba(20,45,24,.07)}.activity-cover{aspect-ratio:16/10;background:#f7f1e3;margin:0}.activity-cover img{width:100%;height:100%;object-fit:cover;display:block}.activity-card-body{padding:22px}.activity-card-body h3{color:#183f21}.activity-card-body p{color:#666;line-height:1.8}.activity-photo-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 22px 22px}.activity-photo-strip figure{margin:0;border-radius:14px;overflow:hidden;aspect-ratio:4/3;border:1px solid #e6ddc9;background:#f7f1e3}.activity-photo-strip img{width:100%;height:100%;object-fit:cover;display:block}.activity-photo-strip figcaption{background:#fff;padding:7px 9px;color:#526055;font-size:13px}.drive-photo-panel{padding:0 22px 22px}.drive-photo-panel iframe{width:100%;height:420px;border:1px solid #e6ddc9;border-radius:16px;background:#fff}.activity-photo-note{margin:0 22px 22px;color:#666;font-size:14px}@media(max-width:900px){.activity-photo-strip{grid-template-columns:repeat(2,1fr)}.drive-photo-panel iframe{height:360px}}';document.head.appendChild(s)}
  function extractDriveFolderId(url){url=clean(url);var m=url.match(/\/folders\/([^/?#]+)/);return m&&m[1]?m[1]:''}
  function extractDriveFileId(url){url=clean(url);var m=url.match(/\/file\/d\/([^/?#]+)/);if(m&&m[1])return m[1];m=url.match(/[?&]id=([^&]+)/);return m&&m[1]?m[1]:''}
  function isUsableImageUrl(v){v=clean(v);if(!v)return false;if(extractDriveFileId(v))return true;if(/^https?:\/\//i.test(v)&&/\.(jpg|jpeg|png|webp|gif)(\?|#|$)/i.test(v))return true;if(/^(\.\/)?(圖庫|assets)\//.test(v))return true;return false}
  function driveImageUrl(url){var id=extractDriveFileId(url);if(id)return 'https://drive.google.com/thumbnail?id='+encodeURIComponent(id)+'&sz=w1200';return url}
  function driveFolderEmbed(url){var id=extractDriveFolderId(url);return id?'<div class="drive-photo-panel"><iframe src="https://drive.google.com/embeddedfolderview?id='+esc(id)+'#grid" loading="lazy" title="活動照片"></iframe></div>':''}
  function isTrainingItem(item){var t=clean(item.title||item.activityTitle);return t.indexOf('115年度會員教育訓練')>-1||t.indexOf('農產品業稅務')>-1}
  function newsBadgeColor(cat){var m={'教育訓練':'#c6a437','會務公告':'#183f21','公益活動':'#2e7d52','訓練品質':'#1565c0','活動通知':'#6a1b9a'};return m[cat]||'#183f21';}
  function newsCard(item){
    var cat=esc(item.category||'公告');
    var color=newsBadgeColor(item.category||'');
    var badge='<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:.65rem;font-weight:800;letter-spacing:.04em;background:'+color+';color:#fff;margin-bottom:8px">'+cat+'</span>';
    var link=item.registerUrl?'<a href="'+esc(item.registerUrl)+'" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:.8rem;font-weight:700;color:'+color+'">查看詳情 →</a>':'';
    return '<article style="background:#fff;border:1px solid #e6ddc9;border-radius:16px;padding:20px 22px;box-shadow:0 4px 14px rgba(20,45,24,.06);transition:box-shadow .2s" onmouseover="this.style.boxShadow='0 8px 24px rgba(20,45,24,.12)'" onmouseout="this.style.boxShadow='0 4px 14px rgba(20,45,24,.06)'">'+badge+'<h3 style="font-size:.98rem;font-weight:800;color:#183f21;line-height:1.4;margin-bottom:6px">'+esc(item.title)+'</h3>'+(item.summary?'<p style="font-size:.82rem;color:#61716b;line-height:1.65">'+esc(item.summary)+'</p>':'')+'<div style="font-size:.72rem;color:#aaa;margin-top:8px">'+esc(item.rocDate||item.date)+'</div>'+link+'</article>';
  }
  function announceCard(item){
    var cat=esc(item.category||'公告');
    var color=newsBadgeColor(item.category||'');
    return '<div style="background:#fff;border:1px solid #e6ddc9;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;transition:box-shadow .18s" onmouseover="this.style.boxShadow='0 6px 18px rgba(20,45,24,.09)'" onmouseout="this.style.boxShadow='none'"><div style="width:8px;height:8px;border-radius:50%;background:'+color+';flex-shrink:0"></div><div style="font-size:.72rem;color:#aaa;flex-shrink:0;width:80px">'+esc(item.rocDate||item.date)+'</div><div style="font-size:.9rem;font-weight:700;color:#183f21;flex:1">'+esc(item.title)+'</div><span style="background:'+color+';color:#fff;font-size:.62rem;font-weight:800;padding:2px 8px;border-radius:20px;flex-shrink:0;white-space:nowrap">'+cat+'</span></div>';
  }
  function photoGrid(item){
    var photos=(item.photos||[]).filter(function(p){return isUsableImageUrl(p.url||p.rawUrl)}).slice(0,8);
    if(photos.length){return '<div class="activity-photo-strip">'+photos.map(function(p){var img=driveImageUrl(p.url||p.rawUrl);return '<figure><img src="'+esc(img)+'" alt="'+esc(p.caption||item.title)+'" loading="lazy"><figcaption>'+esc(p.caption||'活動照片')+'</figcaption></figure>'}).join('')+'</div>'}
    var album=clean(item.albumUrl||item.albumFolderUrl||item.folderUrl);
    if(!album&&isTrainingItem(item))album=TRAINING_ALBUM_URL;
    var embed=driveFolderEmbed(album);
    if(embed)return embed;
    if(isUsableImageUrl(item.coverImage)){return '<div class="activity-photo-strip"><figure><img src="'+esc(driveImageUrl(item.coverImage))+'" alt="'+esc(item.title)+'" loading="lazy"><figcaption>活動照片</figcaption></figure></div>'}
    return '<p class="activity-photo-note">照片將依活動名稱自中央相簿資料夾整理顯示。</p>';
  }
  function galleryCard(item){var photos=photoGrid(item);var cover=item.coverImage?'<figure class="activity-cover"><img src="'+esc(driveImageUrl(item.coverImage))+'" alt="'+esc(item.title)+'" loading="lazy"></figure>':'';return '<article class="activity-card">'+cover+'<div class="activity-card-body"><span class="tag">'+esc(item.category||'活動花絮')+'</span><h3>'+esc(item.title)+'</h3><time>'+esc(item.rocDate||item.date)+'</time>'+(item.summary?'<p>'+esc(item.summary)+'</p>':'')+(item.result?'<p>'+esc(item.result)+'</p>':'')+'</div>'+photos+'</article>'}
  function renderHome(){var newsBox=qs('homeNewsList');var galleryBox=qs('homeGalleryList');if(!newsBox&&!galleryBox)return;staticOrFetch('home').then(function(data){if(newsBox){var news=sortList(data.news||[]).slice(0,3);newsBox.innerHTML=news.length?news.map(newsCard).join(''):'<article class="news-item"><span>公告</span><h3>目前尚無最新消息</h3></article>'}if(galleryBox){var gallery=sortList(data.gallery||[]).slice(0,6);galleryBox.innerHTML=gallery.length?gallery.map(galleryCard).join(''):'<article class="service-card"><h3>活動花絮整理中</h3><p>活動結束後將於此呈現成果與照片。</p></article>'}}).catch(function(){if(newsBox){newsBox.innerHTML='<article class="news-item"><time>115.05.06</time><span>會員大會</span><h3>第29屆第2次會員大會暨理監事聯席會議</h3></article><article class="news-item"><time>115.05.19</time><span>教育訓練</span><h3>115年度會員教育訓練：農產品業稅務實務與相關法規</h3></article>'}})}
  function renderNewsPage(){var newsBox=qs('newsApiList');var galleryBox=qs('galleryApiList');if(!newsBox&&!galleryBox)return;if(newsBox){staticOrFetch('news',{limit:100}).then(function(data){var list=sortList(data.news||[]);newsBox.innerHTML=list.length?list.map(newsCard).join(''):'<article class="news-item"><span>公告</span><h3>目前尚無最新消息</h3></article>'}).catch(function(){newsBox.innerHTML='<article class="news-item"><time>115.05.06</time><span>會員大會</span><h3>第29屆第2次會員大會暨理監事聯席會議</h3></article>'})}if(galleryBox){staticOrFetch('gallery',{limit:100}).then(function(data){var list=sortList(data.gallery||[]);try{galleryBox.innerHTML=list.length?list.map(galleryCard).join(''):'<article class="service-card"><h3>活動花絮整理中</h3><p>活動結束後將於此呈現成果與照片。</p></article>'}).catch(function(){galleryBox.innerHTML='<article class="service-card"><h3>活動花絮整理中</h3><p>請稍後再試。</p></article>'})}}
  function fixTalentLinks(){document.querySelectorAll('a').forEach(function(a){var href=(a.getAttribute('href')||'').trim();var text=(a.textContent||'').trim();if(href==='talent.html'||href==='./talent.html'||href==='#talent'||href.endsWith('/talent.html')||text.indexOf('人才培訓委員會')>-1||text.indexOf('查看人才培訓委員會內容')>-1){a.setAttribute('href','training.html')}})}

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
  document.addEventListener('DOMContentLoaded',function(){injectStyles();fixTalentLinks();renderHome();renderNewsPage();renderTrainingPage()});
  window.GuildApi={url:url,fetch:fetchApi,rootAlbumUrl:ROOT_ALBUM_URL,renderHome:renderHome,renderNewsPage:renderNewsPage,renderTrainingPage:renderTrainingPage,fixTalentLinks:fixTalentLinks};
})();
