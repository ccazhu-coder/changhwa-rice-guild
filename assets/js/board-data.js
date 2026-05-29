document.addEventListener('DOMContentLoaded',function(){
  var data=[['理事長','蘇建彰','大義碾米工廠','彰化縣秀水鄉下崙村田洋巷28號'],['常務理事','黃正達','田中建新碾米工廠','彰化縣田中鎮民光路二段93號'],['常務理事','施學朋','年豐行','彰化縣埔鹽鄉石碑村番金路2巷14號'],['理事','陳裕凱','宏達裕碾米工廠','彰化縣溪州鄉民生路一段136號'],['理事','楊弘煜','榮利碾米工廠','彰化縣溪湖鎮二溪路1段695巷45弄46號'],['理事','張志泓','立大碾米工廠','彰化縣和美鎮源埤里大佃路392巷2號'],['理事','周明哲','正協碾米工廠','彰化縣二林鎮東華里路西巷19之21號'],['理事','唐泉欽','龍泉行','彰化市新華里彰美路1段62號'],['理事','陳燕葶','保證責任彰化縣第一稻米蔬果生產合作社','彰化縣埤頭鄉豐崙村埤周路66號'],['常務監事','沈秉逸','正益碾米工廠','彰化縣花壇鄉金福街350號'],['監事','江俊雄','三豐碾米工廠','彰化市中央里長安街159號'],['監事','連吉隆','和成糧食行','彰化縣鹿港鎮頂厝里鹿東路127號'],['名譽理事長','陳樹林','宏達裕碾米工廠','彰化縣溪州鄉民生路一段136號'],['顧問','巫有凱','億興碾米廠','彰化縣溪湖鎮彰水路一段53號'],['顧問','陳德風','陸和碾米工廠','彰化縣埤頭鄉溪林路406號'],['顧問','陳溪泉','南豐碾米工廠','彰化縣竹塘鄉中央路一段1501號'],['顧問','劉正傑','正新製米(股)公司','彰化縣田中鎮員集路一段530號'],['顧問','陳肇浩','壽米屋企業有限公司','彰化縣二林鎮南光里儒林路2-3號'],['候補理事','沈昇翰','金墩糧坊(股)公司','彰化縣花壇鄉金墩街154巷11號'],['候補理事','陳瑞堂','德記碾米廠','彰化縣埔心鄉東門村中正路1段36號'],['候補監事','巫欣霖','億興碾米廠','彰化縣西勢里彰水路1段53號']];
  var root=document.getElementById('boardRoster');
  if(root){root.innerHTML=data.map(function(x,i){return '<article class="service-card '+(i===0?'board-main':'')+'"><h3>'+x[0]+'｜'+x[1]+'</h3><p><strong>'+x[2]+'</strong><br><span class="board-address">'+x[3]+'</span></p></article>';}).join('');}

  var nav=document.getElementById('mainNav');
  if(nav&&!nav.querySelector('a[href="#members"]')){
    var a=document.createElement('a');a.href='#members';a.textContent='會員介紹';
    var before=nav.querySelector('a[href="#brand"]')||nav.querySelector('a[href="#board"]');
    nav.insertBefore(a,before);
  }

  var training=document.getElementById('training');
  if(training&&!document.getElementById('members')){
    var section=document.createElement('section');
    section.className='section white';section.id='members';
    section.innerHTML='<div class="member-hero"><div class="container"><h2>會員介紹</h2><p>甲級 110 家　乙級 237 家　共計 347 家會員廠商</p></div></div><div class="container"><div class="member-toolbar"><input id="memberSearch" type="search" placeholder="搜尋公司名稱、負責人、地區、業態、會員編號…"><select id="memberLevel"><option value="">全部</option><option value="甲級">甲級</option><option value="乙級">乙級</option></select><select id="memberRegion"><option value="">全部</option></select><span id="memberCount" class="member-count">共 347 筆</span></div><div id="memberGrid" class="member-grid"><div class="member-empty">會員資料載入中</div></div></div>';
    training.parentNode.insertBefore(section,training);
  }

  function loadCss(href){if(!document.querySelector('link[href="'+href+'"]')){var l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.appendChild(l);}}
  function loadScript(src,cb){var s=document.createElement('script');s.src=src;s.onload=cb||function(){};document.body.appendChild(s);}
  loadCss('./assets/css/member.css');
  var files=['member-data-01.js','member-data-02.js','member-data-03.js','member-data-04.js','member-data-05.js','member-data-06.js','member-data-07.js'];
  (function next(i){if(i>=files.length){loadScript('./assets/js/member-app.js',function(){if(window.initMemberIntro)window.initMemberIntro();});return;}loadScript('./assets/js/'+files[i],function(){next(i+1);});})(0);
});
