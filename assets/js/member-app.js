(function(){
  function initMemberIntro(){
    var raw=[];(window.GUILD_MEMBER_CHUNKS||[]).forEach(function(c){raw=raw.concat(c)});
    var members=raw.map(function(x){return{id:x[0],name:x[1],person:x[2],business:x[3],level:x[4],levelRaw:x[5],phone:x[6],region:x[7],address:x[8]}});
    var grid=document.getElementById('memberGrid');
    if(!grid||grid.dataset.ready==='1')return;
    grid.dataset.ready='1';
    var search=document.getElementById('memberSearch');
    var level=document.getElementById('memberLevel');
    var region=document.getElementById('memberRegion');
    var count=document.getElementById('memberCount');
    var regions=Array.from(new Set(members.map(function(m){return m.region}).filter(Boolean))).sort();
    regions.forEach(function(r){var op=document.createElement('option');op.value=r;op.textContent=r;region.appendChild(op)});
    function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
    function render(){
      var q=(search.value||'').trim().toLowerCase();
      var lv=level.value;var rg=region.value;
      var list=members.filter(function(m){
        var hay=[m.id,m.name,m.person,m.business,m.level,m.levelRaw,m.phone,m.region,m.address].join(' ').toLowerCase();
        return (!q||hay.indexOf(q)>-1)&&(!lv||m.level===lv)&&(!rg||m.region===rg);
      });
      count.textContent='共 '+list.length+' 筆';
      grid.innerHTML=list.map(function(m){
        var badge=m.level==='甲級'?'甲':'乙';
        return '<article class="member-card"><div class="member-card-head"><h3>'+escapeHtml(m.name)+'</h3><div class="member-badges"><span>'+badge+'</span><em>'+escapeHtml(m.id)+'</em></div></div><dl><div><dt>負責人</dt><dd>'+escapeHtml(m.person)+'</dd></div><div><dt>地區</dt><dd>'+escapeHtml(m.region)+'</dd></div><div><dt>業態</dt><dd>'+escapeHtml(m.business||'—')+'</dd></div><div><dt>電話</dt><dd>'+escapeHtml(m.phone||'—')+'</dd></div></dl><p class="member-address">'+escapeHtml(m.address)+'</p></article>';
      }).join('')||'<div class="member-empty">查無符合條件的會員廠商</div>';
    }
    ['input','change'].forEach(function(evt){search.addEventListener(evt,render);level.addEventListener(evt,render);region.addEventListener(evt,render)});
    render();
  }

  function patchTrainingCommittee(){
    var target=null;
    document.querySelectorAll('.about-subsection').forEach(function(sec){
      var h=sec.querySelector('h3');
      if(h&&h.textContent.trim()==='人才培訓委員會')target=sec;
    });
    if(!target||target.dataset.trainingPatched==='1')return;
    target.dataset.trainingPatched='1';
    if(!document.getElementById('trainingCommitteeExactStyle')){
      var st=document.createElement('style');
      st.id='trainingCommitteeExactStyle';
      st.textContent='.training-committee-box{background:#f7f4ec;border:1px solid var(--line);border-radius:18px;padding:34px 36px;margin-top:28px}.training-committee-box h4{font-size:18px;color:var(--green);margin:0 0 14px;font-weight:800}.training-committee-box p{color:#334;line-height:1.95;margin:0;font-size:15px}.training-card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:28px 0}.training-value-card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:26px 18px;text-align:center}.training-value-card .icon{font-size:26px;margin-bottom:10px}.training-value-card strong{display:block;color:var(--green);font-size:18px;margin-bottom:8px}.training-value-card p{font-size:14px;line-height:1.7}.training-two-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:20px 0}.training-info-card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px}.training-core{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px;margin-top:16px}.training-core-row{display:flex;gap:12px;align-items:flex-start;margin-top:8px}.training-core-row b{background:var(--gold);color:#fff;border-radius:7px;padding:2px 9px;min-width:48px;text-align:center}.training-policy-exact{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px;margin-top:16px}.training-policy-exact ul{list-style:none;margin:18px 0 0;padding:0}.training-policy-exact li{margin:8px 0;color:#223}.training-policy-exact li:before{content:"■";color:var(--green);font-weight:900;margin-right:12px}@media(max-width:900px){.training-card-grid,.training-two-grid{grid-template-columns:1fr}.training-committee-box{padding:24px 18px}}';
      document.head.appendChild(st);
    }
    target.innerHTML='<h3>人才培訓委員會</h3><div class="training-committee-box"><h4>成立宗旨</h4><p>為配合政府推動產業人才培育政策，並協助本會推動農糧產業相關教育訓練、專業技能培育及產業發展等業務之規劃與執行，特成立「人才培訓委員會」。</p><div class="training-card-grid"><div class="training-value-card"><div class="icon">🎓</div><strong>輔導會員</strong><p>提升產業專業技能，強化產業競爭力</p></div><div class="training-value-card"><div class="icon">🌱</div><strong>培育人才</strong><p>促進農糧產業技術傳承與專業能力提升</p></div><div class="training-value-card"><div class="icon">🤝</div><strong>服務產業</strong><p>整合產業資源，推動農糧產業永續發展</p></div></div><div class="training-two-grid"><div class="training-info-card"><h4>願景</h4><p>促進農糧產業健全發展，整合產業資源並建立系統化人才培育機制，成為推動農糧產業發展與人才培育的重要平台。</p></div><div class="training-info-card"><h4>使命</h4><p>配合政府推動農糧產業政策與人才培育計畫，協助會員提升專業技術能力，並透過教育訓練與產業交流活動，促進農糧產業升級與永續發展。</p></div></div><div class="training-core"><h4>核心價值：專業・永續・服務</h4><div class="training-core-row"><b>專業</b><p>培育農糧產業專業人才，提升產業技術與管理能力</p></div><div class="training-core-row"><b>永續</b><p>促進農糧產業技術傳承與產業長遠發展</p></div><div class="training-core-row"><b>服務</b><p>整合產業資源，提供會員與產業最佳服務</p></div></div><div class="training-policy-exact"><h4>訓練發展政策</h4><p>秉持本會章程宗旨、核心價值及產業發展需求，規劃推動農糧產業相關教育訓練，透過建立完善之教育訓練制度與品質管理機制，培育農糧產業專業人才，提升產業整體競爭力，並促進農糧產業永續發展。</p><ul><li>推動農糧產業專業技能培訓，培育產業專業人才。</li><li>辦理農產加工、食品安全、米食餐飲及農產品行銷等相關教育訓練課程。</li></ul></div></div>';
  }

  window.initMemberIntro=initMemberIntro;
  window.patchTrainingCommittee=patchTrainingCommittee;
  function run(){initMemberIntro();patchTrainingCommittee();setTimeout(patchTrainingCommittee,300)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
