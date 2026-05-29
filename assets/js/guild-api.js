(function(){
  'use strict';

  var API_URL='https://script.google.com/macros/s/AKfycbwL98hwI_mXCXWB6-36mfU9zkKy6hegQJw4kD6XJ4tC9WZX_WjaCKJLXUXWygch3B-L/exec';

  function qs(id){return document.getElementById(id)}
  function clean(v){return String(v==null?'':v).trim()}
  function esc(v){return clean(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function url(action,params){
    var q=new URLSearchParams(Object.assign({action:action},params||{}));
    return API_URL+'?'+q.toString();
  }
  function fetchApi(action,params){
    return fetch(url(action,params),{method:'GET',cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('API '+r.status);return r.json()})
      .then(function(json){return json&&json.data?json.data:{}});
  }
  function sortList(list){return (list||[]).slice().sort(function(a,b){
    if(!!a.isPinned!==!!b.isPinned)return a.isPinned?-1:1;
    if((Number(a.sort)||999)!==(Number(b.sort)||999))return (Number(a.sort)||999)-(Number(b.sort)||999);
    return String(b.date||'').localeCompare(String(a.date||''));
  })}
  function newsCard(item){
    return '<article class="news-item">'+
      '<time>'+esc(item.rocDate||item.date)+'</time>'+
      '<span>'+esc(item.category||'公告')+'</span>'+
      '<h3>'+esc(item.title)+'</h3>'+
      (item.summary?'<p>'+esc(item.summary)+'</p>':'')+
      (item.registerUrl?'<a class="text-link" href="'+esc(item.registerUrl)+'" target="_blank" rel="noopener">查看報名或詳細資訊</a>':'')+
      '</article>';
  }
  function galleryCard(item){
    var img=item.coverImage?'<img src="'+esc(item.coverImage)+'" alt="'+esc(item.title)+'" loading="lazy">':'';
    return '<article class="activity-card">'+
      (img?'<figure>'+img+'</figure>':'')+
      '<div class="activity-card-body"><span class="tag">'+esc(item.category||'活動花絮')+'</span>'+
      '<h3>'+esc(item.title)+'</h3>'+
      '<time>'+esc(item.rocDate||item.date)+'</time>'+
      (item.summary?'<p>'+esc(item.summary)+'</p>':'')+
      (item.result?'<p>'+esc(item.result)+'</p>':'')+
      (item.albumUrl?'<a class="text-link" href="'+esc(item.albumUrl)+'" target="_blank" rel="noopener">查看活動相簿</a>':'')+
      '</div></article>';
  }
  function renderHome(){
    var newsBox=qs('homeNewsList');
    var galleryBox=qs('homeGalleryList');
    if(!newsBox&&!galleryBox)return;
    fetchApi('home').then(function(data){
      if(newsBox){
        var news=sortList(data.news||[]).slice(0,3);
        newsBox.innerHTML=news.length?news.map(newsCard).join(''):'<article class="news-item"><span>公告</span><h3>目前尚無最新公告</h3></article>';
      }
      if(galleryBox){
        var gallery=sortList(data.gallery||[]).slice(0,6);
        galleryBox.innerHTML=gallery.length?gallery.map(galleryCard).join(''):'<article class="service-card"><h3>活動花絮整理中</h3><p>活動結束後將於此呈現成果與照片。</p></article>';
      }
    }).catch(function(){
      if(newsBox){newsBox.innerHTML='<article class="news-item"><time>115.05.06</time><span>會員大會</span><h3>第29屆第2次會員大會暨理監事聯席會議</h3></article><article class="news-item"><time>115.05.19</time><span>教育訓練</span><h3>115年度會員教育訓練：農產品業稅務實務與相關法規</h3></article>'}
    });
  }
  function renderNewsPage(){
    var newsBox=qs('newsApiList');
    var galleryBox=qs('galleryApiList');
    if(!newsBox&&!galleryBox)return;
    if(newsBox){
      fetchApi('news',{limit:100}).then(function(data){
        var list=sortList(data.news||[]);
        newsBox.innerHTML=list.length?list.map(newsCard).join(''):'<article class="news-item"><span>公告</span><h3>目前尚無最新公告</h3></article>';
      }).catch(function(){newsBox.innerHTML='<article class="news-item"><time>115.05.06</time><span>會員大會</span><h3>第29屆第2次會員大會暨理監事聯席會議</h3></article>'});
    }
    if(galleryBox){
      fetchApi('gallery',{limit:100}).then(function(data){
        var list=sortList(data.gallery||[]);
        galleryBox.innerHTML=list.length?list.map(galleryCard).join(''):'<article class="service-card"><h3>活動花絮整理中</h3><p>活動結束後將於此呈現成果與照片。</p></article>';
      }).catch(function(){galleryBox.innerHTML='<article class="service-card"><h3>活動花絮整理中</h3><p>請稍後再試。</p></article>'});
    }
  }
  function fixTalentLinks(){
    document.querySelectorAll('a[href="talent.html"],a[href="./talent.html"],a[href$="#talent"]').forEach(function(a){a.setAttribute('href','training.html')});
  }
  document.addEventListener('DOMContentLoaded',function(){fixTalentLinks();renderHome();renderNewsPage()});
  window.GuildApi={url:url,fetch:fetchApi,renderHome:renderHome,renderNewsPage:renderNewsPage};
})();
