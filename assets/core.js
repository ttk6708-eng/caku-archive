/* EAKU — 공통 로직: 데이터, 라우터, 작품·스튜디오 화면, 검색
   기기별로 달라지는 부분은 desktop/desktop.js, mobile/mobile.js 의 Device 객체에 있습니다. */
/* ============ DATA ============ */
const YEARS=[2026,2025,2024,2023,2022,2021,2020,2019];
const SEMS=['SPRING','FALL'];
const CLASSES=[1,2,3,4,5,6,7,8];
const PROJS=[['P1','HOUSE'],['P2','SCHOOL'],['P3','LIBRARY']];
const TITLES=['강변의 수직 학교','느린 도서관','골목의 집','겹쳐진 마당','drawing design','물가의 교실','층층의 서가','빈 땅의 집','비탈의 학교','담장 도서관','지붕 아래 마당','틈새의 집','오래된 길의 학교','열린 서가','돌아가는 계단','두 개의 마당','시장 옆 도서관','골짜기 학교','낮은 집','빛이 드는 서가'];
const AUTHORS=['김시우','윤수혁','이서연','박도윤','최하은','정민재','한지우','강예린','조현우','송다온','임서준','오하린','신유진','배건우','류지안','문채원'];
const STUDIO_LIST=[
 {id:'S01',n:'STUDIO 408',d:'Cities of Serendipity 드로잉 머신을 통한 탈합리적 건축·도시설계 스튜디오',prof:'김영석·조병준·신태섭',cls:'ARCH. DESIGN 5 · 6',classes:[5,6],yrs:'2019 — 2026',spc:'7 안전설계 · 9 건물시스템 통합설계'},
 {id:'S02',n:'STUDIO N01',d:'물과 경계의 건축. 하천변 대상지를 먼저 걷고, 그다음에 도면을 그리는 스튜디오',prof:'김AA',cls:'ARCH. DESIGN 3 · 4',classes:[3,4],yrs:'2019 — 2026',spc:'3 대지계획 · 4 단면과 구조'},
 {id:'S03',n:'STUDIO 719',d:'공공건축의 프로그램을 도시의 일상에서 다시 읽는 설계 스튜디오',prof:'박BB·이CC',cls:'ARCH. DESIGN 7 · 8',classes:[7,8],yrs:'2020 — 2026',spc:'8 도시설계 · 10 졸업설계'},
 {id:'S04',n:'STUDIO 201',d:'관찰과 스케치에서 시작해 작은 건축의 기본을 익히는 입문 스튜디오',prof:'최DD',cls:'ARCH. DESIGN 1 · 2',classes:[1,2],yrs:'2019 — 2026',spc:'1 건축표현 · 2 공간구성'}
];
const CLASS_STUDIO={1:'S04',2:'S04',3:'S02',4:'S02',5:'S01',6:'S01',7:'S03',8:'S03'};
const studioById=id=>STUDIO_LIST.find(s=>s.id===id)||STUDIO_LIST[0];

function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}

const WORKS=[];
(function build(){
  let id=0;
  YEARS.forEach(y=>SEMS.forEach(s=>CLASSES.forEach(c=>PROJS.forEach((p,pi)=>{
    const n=(y===2026&&s==='FALL')?16:2+((y*7+c*3+pi+(s==='FALL'?1:0))%4);
    for(let i=0;i<n;i++){
      const seed=y*1000+(s==='FALL'?500:0)+c*40+pi*13+i;
      const r=rng(seed);
      let title=TITLES[Math.floor(r()*TITLES.length)],author=AUTHORS[Math.floor(r()*AUTHORS.length)];
      if(y===2026&&s==='FALL'&&c===4&&pi===0&&i===0){title='강변의 수직 학교';author='김시우'}
      if(y===2026&&s==='FALL'&&c===4&&pi===0&&i===1){title='drawing design';author='윤수혁'}
      if(y===2026&&s==='FALL'&&c===5&&pi===0&&i===0){title='강변의 수직 학교';author='김시우'}
      WORKS.push({id:id++,y,s,c,p:p[0],pn:p[1],title,author,studio:'STUDIO '+Number(CLASS_STUDIO[c].slice(1)),seed});
    }
  }))));
})();

/* generated drawing-like placeholder */
const thumbCache={};
function thumb(seed,dark){
  const k=seed+(dark?'d':'l');
  if(thumbCache[k])return thumbCache[k];
  const r=rng(seed*97+3);
  let g='';
  const stroke=dark?'#fff':'#fff';
  const n=5+Math.floor(r()*5);
  for(let i=0;i<n;i++){
    const t=r();
    const x=Math.floor(r()*80)+10,y=Math.floor(r()*60)+8,w=Math.floor(r()*50)+10,h=Math.floor(r()*40)+8;
    if(t<.45)g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${stroke}" stroke-opacity=".55" stroke-width=".7"/>`;
    else if(t<.75)g+=`<line x1="${x}" y1="${y}" x2="${x+w}" y2="${y+(r()<.5?0:h)}" stroke="${stroke}" stroke-opacity=".6" stroke-width=".7"/>`;
    else g+=`<path d="M${x} ${y+h}L${x+w/2} ${y}L${x+w} ${y+h}Z" fill="${stroke}" fill-opacity=".18" stroke="${stroke}" stroke-opacity=".5" stroke-width=".6"/>`;
  }
  g+=`<line x1="0" y1="82" x2="100" y2="82" stroke="${stroke}" stroke-opacity=".5" stroke-width=".8"/>`;
  const base=dark?'#3a3a3a':'#c4c4c4';
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><rect width="100" height="100" fill="${base}"/>${g}</svg>`;
  return thumbCache[k]='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
}
const isDark=()=>matchMedia('(prefers-color-scheme: dark)').matches;
const bg=seed=>`background-image:${thumb(seed,isDark())}`;
const label=w=>`${w.y} ${w.s}`;

const HOME_WORKS=[
  {title:'강변의 수직 학교',author:'김시우',tag:'2026 FALL · STUDIO 1',seed:11},
  {title:'느린 도서관',author:'이서연',tag:'2026 FALL · STUDIO 3',seed:22},
  {title:'골목의 집',author:'박도윤',tag:'2026 FALL · STUDIO 2',seed:33},
  {title:'겹쳐진 마당',author:'최하은',tag:'2026 FALL · THESIS',seed:44},
];
const NEWS=[
  ['NOTICE','2026 가을학기 작품 등록 마감 안내','2026.10.28'],
  ['LECTURE','초청 강연 — 재료와 시간의 건축','2026.10.21'],
  ['AWARD','대학생 건축 공모전 대상 수상','2026.10.14'],
  ['STUDIO','스튜디오 S04 중간 리뷰 공개','2026.10.07'],
  ['NOTICE','아카이브 이미지 제출 규격 변경','2026.09.30'],
  ['EVENT','건축학부 오픈 스튜디오','2026.09.22'],
];
const ALUMNI=[['정OO','○○건축사사무소','2021'],['한OO','○○ 아키텍츠, 서울','2020'],['윤OO','○○대학원 건축학과','2022'],['강OO','○○ 설계 스튜디오, 베를린','2019'],['조OO','○○시 공공건축가','2018']];

/* ============ STATE ============ */
const F={year:'2026',sem:'FALL',cls:'4',proj:'ALL'};
const DEF={year:'ALL',sem:'ALL',cls:'ALL',proj:'ALL'};
let shown=20;
let studioSem='2026 FALL',studioShown=12,curStudio='S01',navs=0;

const $=s=>document.querySelector(s);
const app=$('#app');
const filtered=(f=F)=>WORKS.filter(w=>
  (f.year==='ALL'||String(w.y)===f.year)&&
  (f.sem==='ALL'||w.s===f.sem)&&
  (f.cls==='ALL'||String(w.c)===f.cls)&&
  (f.proj==='ALL'||w.p===f.proj));
const summary=(f=F)=>{
  const parts=[];
  if(f.year!=='ALL')parts.push(f.year);
  if(f.sem!=='ALL')parts.push(f.sem);
  if(f.cls!=='ALL')parts.push('DESIGN '+f.cls);
  if(f.proj!=='ALL')parts.push(f.proj);
  return (parts.length?parts.join(' · '):'ALL')+' — '+filtered(f).length+'점';
};
const activeCount=()=>Object.keys(F).filter(k=>F[k]!==DEF[k]).length;

/* ============ VIEWS ============ */
function cardOverlay(w){
  return `<button class="card" data-id="${w.id}" type="button"><div class="thumb" style="${bg(w.seed)}"></div>
  <div class="cap"><small>${label(w)} · ${w.studio}</small><div class="row"><b>${w.title}</b><i>${w.author}</i></div></div></button>`;
}
function cardBelow(w){
  return `<button class="card below" data-id="${w.id}" type="button"><div class="thumb" style="${bg(w.seed)}"></div>
  <div class="meta"><small>${label(w)} · DESIGN ${w.c}</small><div class="row"><b>${w.title}</b><i>${w.author}</i></div></div></button>`;
}

function viewHome(){
  const latest=HOME_WORKS.map((h,i)=>`<button class="card" type="button" data-home="${i}"><div class="thumb" style="${bg(h.seed)}"></div>
    <div class="cap"><small>${h.tag}</small><div class="row"><b>${h.title}</b><i>${h.author}</i></div></div></button>`).join('');
  return `
  <section class="sec">
    <div class="sec-h"><h2 class="kr">최근 등록 작품</h2><a href="#project" data-reset="1">전체 ${WORKS.length.toLocaleString()}점 →</a></div>
    ${Device.recent(latest)}
  </section>
  <div class="two">
    <div>
      <section class="sec">
        <div class="sec-h"><h2>News</h2><a href="#" data-toast="뉴스 전체 페이지는 시연에서 제외되었습니다">전체 보기 →</a></div>
        <a href="#" class="news-feat" data-toast="뉴스 상세는 시연에서 제외되었습니다">
          <div class="thumb" style="${bg(501)}"></div>
          <div><div class="k">Exhibition · 2026.11.04</div><h3>2026 졸업설계전 「공」 개막</h3><p>건축관 1층 갤러리에서 11월 4일부터 15일까지 졸업 작품 48점을 전시합니다.</p></div>
        </a>
        <ul class="nl">${NEWS.map(n=>`<li><a href="#" data-toast="공지 상세는 시연에서 제외되었습니다"><span class="k">${n[0]}</span><span class="t">${n[1]}</span><span class="d">${n[2]}</span></a></li>`).join('')}</ul>
      </section>
    </div>
    <div>
      <section class="sec">
        <div class="sec-h"><h2>Interview</h2><a href="#" data-toast="인터뷰 목록은 시연에서 제외되었습니다">01 / 04 →</a></div>
        <div class="itv">
          <div class="thumb" style="${bg(602)}"></div>
          <div class="txt"><div>
            <div class="k">Studio N01 · 김AA 교수</div>
            <blockquote>“대상지를 먼저 걷게 합니다. 도면은 그다음입니다.”</blockquote>
            <p>물과 경계의 건축 스튜디오가 7년간 다뤄온 하천변 대상지와 수업 방식에 대해.</p></div>
            <a class="more" href="#" data-toast="인터뷰 본문은 시연에서 제외되었습니다">인터뷰 읽기 →</a>
          </div>
        </div>
      </section>
      <section class="sec" style="margin-top:36px">
        <div class="sec-h"><h2>Alumni</h2><a href="#" data-toast="졸업생 목록은 시연에서 제외되었습니다">전체 보기 →</a></div>
        <ul class="al" style="margin-top:-8px">${ALUMNI.map((a,i)=>`<li><div class="thumb" style="${bg(700+i)}"></div><span class="n">${a[0]}</span><span class="o">${a[1]}</span><span class="y">${a[2]}</span></li>`).join('')}</ul>
      </section>
    </div>
  </div>`;
}

function projectList(){
  const list=filtered();
  const part=list.slice(0,shown);
  if(!list.length)return `<div class="empty">조건에 맞는 작품이 없습니다. 필터를 바꿔 보세요.</div>`;
  return `<div class="grid g5">${part.map(cardBelow).join('')}</div>`+
    (list.length>shown?`<button class="more-btn" type="button" id="moreBtn">더 보기 (${list.length-shown}점 남음)</button>`:'');
}
function studioWorks(){
  const s=studioById(curStudio);
  const parts=studioSem==='ALL'?null:studioSem.split(' ');
  return WORKS.filter(w=>s.classes.includes(w.c)&&(!parts||(String(w.y)===parts[0]&&w.s===parts[1])));
}
function studioGrid(){
  const all=studioWorks(),l=all.slice(0,studioShown);
  if(!l.length)return `<div class="empty">이 학기에 등록된 작품이 없습니다.</div>`;
  return `<div class="grid g-studio">${l.map(cardOverlay).join('')}</div>`+
    (all.length>studioShown?`<button class="more-btn" type="button" id="sMore">더 보기 (${all.length-studioShown}점 남음)</button>`:'');
}
function viewStudioIndex(){
  return `
  <div class="crumb">STUDIO</div>
  <div class="idx-head"><h1>스튜디오</h1><p>학년별 설계 스튜디오와 지금까지 등록된 작품을 볼 수 있습니다.</p></div>
  <ul class="slist">${STUDIO_LIST.map(s=>{
    const n=WORKS.filter(w=>s.classes.includes(w.c)).length;
    const th=WORKS.filter(w=>s.classes.includes(w.c)&&w.y===2026&&w.s==='FALL').slice(0,4);
    return `<li><a href="#studio/${s.id}" class="srow">
      <span class="sid">${s.id}</span>
      <span class="sinfo"><b>${s.n}</b><span class="sd">${s.d}</span><span class="sm">${s.prof} · ${s.cls} · ${s.yrs}</span></span>
      <span class="sth">${th.map(w=>`<span class="thumb" style="${bg(w.seed)}"></span>`).join('')}</span>
      <span class="sn">${n.toLocaleString()}점</span></a></li>`}).join('')}</ul>`;
}
function viewStudio(id){
  const s=studioById(id);
  if(curStudio!==s.id||!arguments[1]){curStudio=s.id;studioSem='2026 FALL';studioShown=12}
  const tabs=['2026 FALL','2026 SPRING','2025 FALL','2025 SPRING','2024 FALL'];
  return `
  <div class="crumb"><a href="#studio">STUDIO</a> / ${s.id}</div>
  <div class="s-head">
    <div><h1>${s.n}</h1><p>${s.d}</p></div>
    <dl class="dl"><dt>Professor</dt><dd class="kr">${s.prof}</dd><dt>Class</dt><dd>${s.cls}</dd><dt>Years</dt><dd>${s.yrs}</dd><dt>SPC</dt><dd class="kr">${s.spc}</dd></dl>
  </div>
  <div class="tabs" id="stabs">${tabs.map(t=>`<button type="button" data-sem="${t}" class="${studioSem===t?'on':''}">${t}</button>`).join('')}<span class="sp"></span><button type="button" class="all ${studioSem==='ALL'?'on':''}" data-sem="ALL">All semesters ▾</button></div>
  <div id="sgrid">${studioGrid()}</div>`;
}

const DESC={
  HOUSE:'주거 단위를 대지의 경사와 이웃 건물의 높이에 맞춰 나누고, 마당과 실내가 번갈아 이어지도록 계획했습니다.',
  SCHOOL:'교실과 공용 공간을 수직으로 겹쳐 쌓고, 학생들이 이동하며 마주치는 경로를 중심으로 단면을 구성했습니다.',
  LIBRARY:'서가와 열람 공간을 하나의 연속된 바닥으로 묶고, 빛이 들어오는 방향에 따라 책의 위치를 정했습니다.'
};
function getWork(arg){
  if(arg&&arg[0]==='h'){
    const h=HOME_WORKS[+arg.slice(1)]||HOME_WORKS[0];
    const c=h.tag.includes('THESIS')?8:4;
    return {id:arg,y:2026,s:'FALL',c,p:'P2',pn:'SCHOOL',title:h.title,author:h.author,seed:h.seed};
  }
  return WORKS[+arg]||WORKS[0];
}
function viewWork(arg){
  const w=getWork(arg),st=studioById(CLASS_STUDIO[w.c]);
  const group=WORKS.filter(x=>x.y===w.y&&x.s===w.s&&x.c===w.c&&x.p===w.p);
  const i=group.findIndex(x=>x.id===w.id);
  const prev=i>0?group[i-1]:null,next=i>=0&&i<group.length-1?group[i+1]:null;
  const rel=group.filter(x=>x.id!==w.id).slice(0,4);
  const shots=[['배치도',1],['평면도',2],['단면도',3],['모형',4]];
  return `
  <div class="crumb wk-crumb"><span><a href="#project">PROJECT</a> / ${w.y} ${w.s} / DESIGN ${w.c} / ${w.p} ${w.pn}</span><button type="button" data-back>← 목록</button></div>
  <div class="s-head">
    <div><h1>${w.title}</h1><p>${w.author}</p></div>
    <dl class="dl"><dt>Student</dt><dd class="kr">${w.author}</dd><dt>Semester</dt><dd>${w.y} ${w.s}</dd><dt>Class</dt><dd>DESIGN ${w.c}</dd><dt>Project</dt><dd>${w.p} · ${w.pn}</dd><dt>Studio</dt><dd><a class="ul" href="#studio/${st.id}">${st.n}</a></dd><dt>Professor</dt><dd class="kr">${st.prof}</dd></dl>
  </div>
  <figure class="wk-hero"><div class="thumb" style="${bg(w.seed)}"></div><figcaption>최종 보드</figcaption></figure>
  <div class="wk-gallery">${shots.map(([n,k])=>`<figure><div class="thumb" style="${bg(w.seed+k*31)}"></div><figcaption>${n}</figcaption></figure>`).join('')}</div>
  <section class="sec"><div class="sec-h"><h2 class="kr">작품 설명</h2></div>
    <div class="wk-text"><p>${DESC[w.pn]}</p><p>평면과 단면 드로잉, 모형 사진, 최종 보드를 함께 등록했습니다.</p></div></section>
  <nav class="pager" aria-label="이전·다음 작품">
    ${prev?`<a href="#project/${prev.id}">← 이전 작품<b>${prev.title}</b></a>`:`<span></span>`}
    ${next?`<a href="#project/${next.id}">다음 작품 →<b>${next.title}</b></a>`:`<span></span>`}
  </nav>
  ${rel.length?`<section class="sec"><div class="sec-h"><h2 class="kr">같은 과제의 다른 작품</h2><a href="#project">목록 보기 →</a></div><div class="grid g-studio">${rel.map(cardOverlay).join('')}</div></section>`:''}`;
}

function viewAbout(){
  return `<div class="about">
    <h1>도면 뒤의 과정까지 남기는 아카이브</h1>
    <div>
      <p>건축학부의 설계 스튜디오 결과물을 학년, 학기, 스튜디오, 과제별로 모아 두는 작품 아카이브입니다. 2019년부터 지금까지 등록된 작품을 한곳에서 찾아볼 수 있습니다.</p>
      <p>작품은 학기 말 심사가 끝난 뒤 등록됩니다. 학생은 로그인 후 이미지와 설명을 제출할 수 있고, 제출 규격은 공지사항에서 안내합니다.</p>
      <div class="stats"><div><b>${WORKS.length.toLocaleString()}</b><span>작품</span></div><div><b>8</b><span>학년·분반</span></div><div><b>2019</b><span>첫 등록</span></div></div>
    </div></div>`;
}

/* ============ ROUTER ============ */
const views={home:viewHome,project:()=>Device.viewProject(),studio:viewStudioIndex,about:viewAbout};
var route=function(){
  const parts=(location.hash||'#home').slice(1).split('/');
  const key=views[parts[0]]?parts[0]:'home';
  let html;
  if(key==='project'&&parts[1])html=viewWork(parts[1]);
  else if(key==='studio'&&parts[1])html=viewStudio(parts[1]);
  else html=views[key]();
  app.innerHTML=html;
  document.querySelectorAll('[data-r]').forEach(a=>{if(a.dataset.r===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  window.scrollTo(0,0);
  if(Device.afterRoute)Device.afterRoute(key);
};
let lastHash=null;
const _route=route;
route=function(){lastHash=location.hash;_route()};
function go(h){
  if(location.hash===h){route();return}
  location.hash=h;navs++;route();
}
addEventListener('hashchange',()=>{if(location.hash!==lastHash){navs++;route()}});

/* ============ EVENTS ============ */
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');
  if(a&&a.getAttribute('href').length>1){
    e.preventDefault();
    if(a.dataset.reset){Object.assign(F,DEF);shown=20}
    go(a.getAttribute('href'));return;
  }
  const t=e.target.closest('button,a');
  const card=e.target.closest('[data-id]');
  if(card){go('#project/'+card.dataset.id);return}
  const home=e.target.closest('[data-home]');
  if(home){go('#project/h'+home.dataset.home);return}
  if(!t)return;
  if(t.dataset.toast){e.preventDefault();toast(t.dataset.toast);return}
  if(t.dataset.reset){Object.assign(F,DEF);shown=20;return}
  if(Device.onClick&&Device.onClick(e,t))return;
  if(t.id==='moreBtn'){shown+=20;$('#plist').innerHTML=projectList();return}
  if(t.dataset.sem){studioSem=t.dataset.sem;studioShown=12;$('#sgrid').innerHTML=studioGrid();
    document.querySelectorAll('#stabs button').forEach(b=>b.classList.toggle('on',b.dataset.sem===studioSem));return}
  if(t.dataset.back!==undefined){if(navs>0)history.back();else go('#project');return}
  if(t.id==='sMore'){studioShown+=12;$('#sgrid').innerHTML=studioGrid();return}
  if(t.id==='loginBtn'){toast('로그인은 시연에서 제외되었습니다');return}
});

function openOv(sel){$(sel).classList.add('open');document.body.style.overflow='hidden'}
function closeOv(){document.querySelectorAll('.ov.open').forEach(o=>o.classList.remove('open'));document.body.style.overflow=''}
$('#searchClose').onclick=closeOv;
addEventListener('keydown',e=>{if(e.key==='Escape'){closeOv();if(Device.onEsc)Device.onEsc()}});

/* search */
function openSearch(){openOv('#search');$('#sq').value='';runSearch();setTimeout(()=>$('#sq').focus(),50)}
function runSearch(){
  const q=$('#sq').value.trim().toLowerCase();
  const list=(q?WORKS.filter(w=>(w.title+w.author).toLowerCase().includes(q)):WORKS.filter(w=>w.y===2026&&w.s==='FALL')).slice(0,30);
  $('#sres').innerHTML=list.length?list.map(w=>`<li><button type="button" data-sid="${w.id}"><span><b style="font-weight:500">${w.title}</b><small>${label(w)} · DESIGN ${w.c}</small></span><span class="mute" style="font-size:12px">${w.author}</span></button></li>`).join(''):`<li class="empty">검색 결과가 없습니다.</li>`;
}
$('#sq').addEventListener('input',runSearch);
$('#sres').addEventListener('click',e=>{const b=e.target.closest('[data-sid]');if(b){closeOv();go('#project/'+b.dataset.sid)}});
['#idxBtn','#mSearch'].forEach(s=>{const b=$(s);if(b)b.onclick=openSearch});

