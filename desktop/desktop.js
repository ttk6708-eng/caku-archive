/* CAKU — 데스크탑 전용: 필터 행(YEAR/SEMESTER/CLASS/PROJECT), 4열 홈 */
function filterRow(title,key,items){
  return `<div class="frow"><h4>${title}</h4><div>${items.map(([v,l])=>`<button type="button" data-fk="${key}" data-fv="${v}" class="${F[key]===v?'on':''}">${l}</button>`).join('')}</div></div>`;
}

const Device={
  name:'desktop',
  recent:l=>`<div class="grid g4">${l}</div>`,
  viewProject(){
    return `
  <section style="margin-top:16px">
    <div class="frows">
      ${filterRow('YEAR','year',[['ALL','All'],...YEARS.map(y=>[String(y),String(y)])])}
      ${filterRow('SEMESTER','sem',[['ALL','All'],['SPRING','Spring'],['FALL','Fall']])}
      ${filterRow('CLASS','cls',[['ALL','All'],...CLASSES.map(c=>[String(c),'Design '+c])])}
      ${filterRow('PROJECT','proj',[['ALL','All'],...PROJS.map(p=>[p[0],p[0]+' · '+p[1]])])}
    </div>
    <div class="status"><span id="stat">${summary()}</span><button type="button" class="reset" id="resetBtn">초기화 ×</button></div>
    <div id="plist">${projectList()}</div>
  </section>`;
  },
  refreshProject(){
    $('#plist').innerHTML=projectList();
    $('#stat').textContent=summary();
    document.querySelectorAll('.frow button').forEach(b=>b.classList.toggle('on',F[b.dataset.fk]===b.dataset.fv));
  },
  onClick(e,t){
    if(t.dataset.fk){F[t.dataset.fk]=t.dataset.fv;shown=20;this.refreshProject();return true}
    if(t.id==='resetBtn'){Object.assign(F,DEF);shown=20;this.refreshProject();return true}
    return false;
  }
};
route();
