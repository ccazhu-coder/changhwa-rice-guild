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
  window.initMemberIntro=initMemberIntro;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMemberIntro);else initMemberIntro();
})();
