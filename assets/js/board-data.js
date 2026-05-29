document.addEventListener('DOMContentLoaded',function(){
  var boardData=[['理事長','蘇建彰','大義碾米工廠','彰化縣秀水鄉下崙村田洋巷28號'],['常務理事','黃正達','田中建新碾米工廠','彰化縣田中鎮民光路二段93號'],['常務理事','施學朋','年豐行','彰化縣埔鹽鄉石碑村番金路2巷14號'],['理事','陳裕凱','宏達裕碾米工廠','彰化縣溪州鄉民生路一段136號'],['理事','楊弘煜','榮利碾米工廠','彰化縣溪湖鎮二溪路1段695巷45弄46號'],['理事','張志泓','立大碾米工廠','彰化縣和美鎮源埤里大佃路392巷2號'],['理事','周明哲','正協碾米工廠','彰化縣二林鎮東華里路西巷19之21號'],['理事','唐泉欽','龍泉行','彰化市新華里彰美路1段62號'],['理事','陳燕葶','保證責任彰化縣第一稻米蔬果生產合作社','彰化縣埤頭鄉豐崙村埤周路66號'],['常務監事','沈秉逸','正益碾米工廠','彰化縣花壇鄉金福街350號'],['監事','江俊雄','三豐碾米工廠','彰化市中央里長安街159號'],['監事','連吉隆','和成糧食行','彰化縣鹿港鎮頂厝里鹿東路127號'],['名譽理事長','陳樹林','宏達裕碾米工廠','彰化縣溪州鄉民生路一段136號'],['顧問','巫有凱','億興碾米廠','彰化縣溪湖鎮彰水路一段53號'],['顧問','陳德風','陸和碾米工廠','彰化縣埤頭鄉溪林路406號'],['顧問','陳溪泉','南豐碾米工廠','彰化縣竹塘鄉中央路一段1501號'],['顧問','劉正傑','正新製米(股)公司','彰化縣田中鎮員集路一段530號'],['顧問','陳肇浩','壽米屋企業有限公司','彰化縣二林鎮南光里儒林路2-3號'],['候補理事','沈昇翰','金墩糧坊(股)公司','彰化縣花壇鄉金墩街154巷11號'],['候補理事','陳瑞堂','德記碾米廠','彰化縣埔心鄉東門村中正路1段36號'],['候補監事','巫欣霖','億興碾米廠','彰化縣西勢里彰水路1段53號']];

  var historyList=[['第1屆','民國39～41年','陳反',''],['第2屆','民國41～43年','李俊富',''],['第3、4屆','民國43～47年','洪金發',''],['第5、6屆','民國47～51年','陳煥章',''],['第7屆','民國51～53年','邱思仁',''],['第8屆','民國53～55年','洪江林',''],['第9、10屆','民國55～59年','許志錕',''],['第11、12屆','民國59～65年','陳祥雲',''],['第13、14屆','民國65～71年','陳俊雄','壽米屋企業有限公司'],['第15、16屆','民國71～77年','許志錕',''],['第17、18屆','民國77～83年','鄭懋樵',''],['第19、20屆','民國83～89年','陳德風','陸和碾米工廠'],['第21、22屆','民國89～95年','柯騰雄','順發產業工廠'],['第23、24屆','民國95～101年','巫有凱','億興碾米工廠'],['第25、26屆','民國101～107年','陳樹林','宏達裕碾米工廠'],['第27、28屆','民國107～113年','沈踴志','金墩糧坊(股)公司'],['第29屆','民國113～116年','蘇建彰','大義碾米工廠']];
  var tasks=['關於國內外米穀商業之調查、統計及研究發展事項','關於國際貿易之聯繫、介紹、推廣事業','關於政府經濟政策與商業法令之協助推行與研究、建議事項','關於同業糾紛之調處事項','關於同業員工技能訓練及業務講習之舉辦事項','關於會員商品之廣告展覽事項','關於會員委託證照之申請、變更、換領及其他服務事項','關於會員公益事業之辦理事項','關於會員合法權益之維護事項','關於接受機關、團體之委託服務事項','關於社會運動之參加事項','依其他法令規定辦理事項'];

  function ensureStyle(){
    if(document.getElementById('structurePatchStyle'))return;
    var st=document.createElement('style');st.id='structurePatchStyle';st.textContent='#aboutFullIntro{margin-top:44px}.about-subsection{margin-top:42px}.about-subsection h3{font-family:var(--serif);font-size:28px;color:var(--green);text-align:center;margin-bottom:10px}.about-subsection h3:after{content:"";display:block;width:54px;height:3px;background:var(--gold);border-radius:4px;margin:12px auto 0}.about-lead-box{background:var(--rice);border:1px solid var(--line);border-radius:16px;padding:24px 28px;color:var(--muted);font-size:15px}.about-history-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.about-history-card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:0 8px 20px rgba(20,45,24,.05)}.about-history-card b{display:inline-block;background:var(--green);color:#fff;border-radius:999px;font-size:12px;padding:2px 10px;margin-bottom:8px}.about-history-card strong{display:block;color:var(--green);font-size:18px}.about-history-card span{display:block;color:var(--muted);font-size:12px}.about-task-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.about-task{display:flex;gap:10px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:13px 14px;color:#444}.about-task i{font-style:normal;background:var(--gold);color:#fff;border-radius:7px;min-width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800}.training-intro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:18px 0}.training-intro-card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;text-align:center}.training-intro-card strong{display:block;color:var(--green);font-size:17px;margin-bottom:6px}.training-intro-card p{font-size:13px;color:var(--muted)}.training-policy{background:var(--green-soft);border-left:4px solid var(--gold);border-radius:14px;padding:20px;color:#445}.training-policy b{color:var(--green)}@media(max-width:900px){.about-history-grid{grid-template-columns:repeat(2,1fr)}.about-task-grid,.training-intro-grid{grid-template-columns:1fr}}@media(max-width:620px){.about-history-grid{grid-template-columns:1fr}.about-subsection h3{font-size:24px}}';
    document.head.appendChild(st);
  }
  function buildAboutIntro(){
    ensureStyle();
    var about=document.getElementById('about');
    if(!about||document.getElementById('aboutFullIntro'))return;
    var container=about.querySelector('.container');
    if(!container)return;
    var wrap=document.createElement('div');wrap.id='aboutFullIntro';
    wrap.innerHTML='<div class="about-subsection"><h3>公會宗旨</h3><div class="about-lead-box">本會以推廣國內外貿易，促進經濟發展，協調同業關係，增進共同利益，協助政府推行政令為宗旨。</div></div>'+
      '<div class="about-subsection"><h3>公會沿革</h3><div class="about-history-grid">'+historyList.map(function(h){return '<div class="about-history-card"><b>'+h[0]+'</b><span>'+h[1]+'</span><strong>'+h[2]+'</strong>'+(h[3]?'<span>'+h[3]+'</span>':'')+'</div>';}).join('')+'</div></div>'+
      '<div class="about-subsection"><h3>公會章程任務</h3><div class="about-task-grid">'+tasks.map(function(t,i){return '<div class="about-task"><i>'+(i+1)+'</i><span>'+t+'</span></div>';}).join('')+'</div></div>'+
      '<div class="about-subsection"><h3>人才培訓委員會</h3><div class="about-lead-box">為配合政府推動產業人才培育政策，並協助本會推動農糧產業相關教育訓練、專業技能培育及產業發展等業務之規劃與執行，特成立「人才培訓委員會」。</div><div class="training-intro-grid"><div class="training-intro-card"><strong>輔導會員</strong><p>提升產業專業技能，強化產業競爭力。</p></div><div class="training-intro-card"><strong>培育人才</strong><p>促進農糧產業技術傳承與專業能力提升。</p></div><div class="training-intro-card"><strong>服務產業</strong><p>整合產業資源，推動農糧產業永續發展。</p></div></div><div class="training-policy"><p><b>願景：</b>促進農糧產業健全發展，整合產業資源並建立系統化人才培育機制，成為推動農糧產業發展與人才培育的重要平台。</p><p><b>使命：</b>配合政府推動農糧產業政策與人才培育計畫，協助會員提升專業技術能力，並透過教育訓練與產業交流活動，促進農糧產業升級與永續發展。</p><p><b>核心價值：</b>專業、永續、服務。</p></div></div>';
    container.appendChild(wrap);
  }

  function setTitle(id,span,h2,p){var sec=document.getElementById(id);if(!sec)return;var b=sec.querySelector('.section-title-block');if(!b)return;if(span&&b.querySelector('span'))b.querySelector('span').textContent=span;if(h2&&b.querySelector('h2'))b.querySelector('h2').textContent=h2;if(p){var pe=b.querySelector('p')||document.createElement('p');pe.textContent=p;if(!b.querySelector('p'))b.appendChild(pe);}}

  var board=document.getElementById('board');
  var root=document.getElementById('boardRoster');
  if(root){root.innerHTML=boardData.map(function(x,i){return '<article class="service-card '+(i===0?'board-main':'')+'"><h3>'+x[0]+'｜'+x[1]+'</h3><p><strong>'+x[2]+'</strong><br><span class="board-address">'+x[3]+'</span></p></article>';}).join('');}
  setTitle('board','第29屆公會幹部名冊','理監事團隊','第29屆理監事、名譽理事長、顧問與候補名單');

  buildAboutIntro();
  var oldHistory=document.getElementById('history');if(oldHistory)oldHistory.style.display='none';

  var nav=document.getElementById('mainNav');
  if(nav&&!nav.querySelector('a[href="#members"]')){var a=document.createElement('a');a.href='#members';a.textContent='會員介紹';var before=nav.querySelector('a[href="#brand"]')||nav.querySelector('a[href="#board"]');nav.insertBefore(a,before);}
  if(nav){
    var labels={'#home':'首頁','#about':'關於公會','#news':'最新消息','#board':'理監事團隊','#members':'會員介紹','#brand':'彰榖米品牌','#services':'會員服務','#training':'教育訓練','#contact':'聯絡我們'};
    Array.from(nav.querySelectorAll('a[href="#history"],a[href="#activities"]')).forEach(function(x){x.remove();});
    Object.keys(labels).forEach(function(href){var item=nav.querySelector('a[href="'+href+'"]');if(item){item.textContent=labels[href];nav.appendChild(item);}});
    var cta=nav.querySelector('.nav-cta');if(cta){cta.textContent='合作洽詢';cta.href='#contact';nav.appendChild(cta);}
  }

  if(!document.getElementById('members')){
    var section=document.createElement('section');section.className='section white';section.id='members';
    section.innerHTML='<div class="member-hero"><div class="container"><h2>會員介紹</h2><p>甲級 110 家　乙級 237 家　共計 347 家會員廠商</p></div></div><div class="container"><div class="member-toolbar"><input id="memberSearch" type="search" placeholder="搜尋公司名稱、負責人、地區、業態、會員編號…"><select id="memberLevel"><option value="">全部</option><option value="甲級">甲級</option><option value="乙級">乙級</option></select><select id="memberRegion"><option value="">全部</option></select><span id="memberCount" class="member-count">共 347 筆</span></div><div id="memberGrid" class="member-grid"><div class="member-empty">會員資料載入中</div></div></div>';
    if(board&&board.parentNode){board.parentNode.insertBefore(section,board.nextElementSibling);}
  }

  var ids=['home','about','news','activities','board','members','brand','services','training','contact'];
  var main=document.getElementById('main');
  if(main){ids.forEach(function(id){var sec=document.getElementById(id);if(sec)main.appendChild(sec);});}

  function loadCss(href){if(!document.querySelector('link[href="'+href+'"]')){var l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.appendChild(l);}}
  function loadScript(src,cb){var s=document.createElement('script');s.src=src;s.onload=cb||function(){};document.body.appendChild(s);}
  loadCss('./assets/css/member.css');
  var files=['member-data-01.js','member-data-02.js','member-data-03.js','member-data-04.js','member-data-05.js','member-data-06.js','member-data-07.js'];
  (function next(i){if(i>=files.length){loadScript('./assets/js/member-app.js',function(){if(window.initMemberIntro)window.initMemberIntro();});return;}loadScript('./assets/js/'+files[i],function(){next(i+1);});})(0);
});
