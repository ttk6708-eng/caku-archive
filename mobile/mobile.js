/* CAKU — 모바일 전용: 가로 스와이프 홈, FILTER 버튼 + 하단 시트 */
let pend={...F};
function initRail(){
  const rail=$('#rail'),dots=document.querySelectorAll('#dots span');
  if(!rail)return;
  rail.addEventListener('scroll',()=>{
    const c=rail.children[0];if(!c)return;
    const i=Math.min(dots.length-1,Math.round(rail.scrollLeft/(c.offsetWidth+12)));
    dots.forEach((d,j)=>d.classList.toggle('on',j===i));
  },{passive:true});
}


/* sheet */
function openSheet(){
  pend={...F};renderSheet();
  $('#sheet').classList.add('open');$('#scrim').classList.add('open');$('#sheet').setAttribute('aria-hidden','false');
}
function closeSheet(){$('#sheet').classList.remove('open');$('#scrim').classList.remove('open');$('#sheet').setAttribute('aria-hidden','true')}
function renderSheet(){
  const grp=(t,k,items)=>`<div class="fg"><h5>${t}</h5><div class="chips">${items.map(([v,l])=>`<button type="button" data-pk="${k}" data-pv="${v}" class="${pend[k]===v?'on':''}">${l}</button>`).join('')}</div></div>`;
  $('#sheetBody').innerHTML=
    grp('YEAR','year',[['ALL','All'],...YEARS.map(y=>[String(y),String(y)])])+
    grp('SEMESTER','sem',[['ALL','All'],['SPRING','Spring'],['FALL','Fall']])+
    grp('CLASS','cls',[['ALL','All'],...CLASSES.map(c=>[String(c),'D'+c])])+
    grp('PROJECT','proj',[['ALL','All'],['P1','P1 House'],['P2','P2 School'],['P3','P3 Library']]);
  $('#sheetApply').textContent=`${filtered(pend).length}점 보기`;
}
$('#sheetBody').addEventListener('click',e=>{
  const b=e.target.closest('[data-pk]');if(!b)return;
  pend[b.dataset.pk]=b.dataset.pv;renderSheet();
});
$('#sheetReset').onclick=()=>{pend={...DEF};renderSheet()};
$('#sheetClose').onclick=closeSheet;$('#scrim').onclick=closeSheet;


const Device={
  name:'mobile',
  recent:l=>`<div class="rail" id="rail">${l}</div>
    <div class="dots" id="dots">${HOME_WORKS.map((_,i)=>`<span class="${i?'':'on'}"></span>`).join('')}</div>`,
  viewProject(){
    return `
  <section>
    <div class="m-filterbar"><span id="mstat">${summary()}</span><button type="button" id="openFilter">FILTER (${activeCount()})</button></div>
    <div id="plist">${projectList()}</div>
  </section>`;
  },
  refreshProject(){
    $('#plist').innerHTML=projectList();
    $('#mstat').textContent=summary();
    $('#openFilter').textContent=`FILTER (${activeCount()})`;
  },
  afterRoute(key){if(key==='home')initRail()},
  onClick(e,t){
    if(t.id==='openFilter'){openSheet();return true}
    return false;
  },
  onEsc(){closeSheet()}
};
$('#sheetApply').onclick=()=>{Object.assign(F,pend);shown=20;closeSheet();Device.refreshProject()};
route();
