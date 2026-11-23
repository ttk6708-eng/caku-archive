# CAKU — 건축학부 작품 아카이브 (시연용)

데스크탑과 모바일을 **각각 따로 만든 두 버전**으로 구성한 정적 웹사이트입니다.
접속하면 기기를 감지해서 알맞은 버전으로 자동 이동합니다.

## 폴더 구조

```
index.html          접속 시 기기를 감지해 desktop/ 또는 mobile/ 로 이동
.nojekyll           GitHub Pages가 파일을 그대로 서비스하도록 하는 빈 파일
assets/
  common.css        두 버전이 함께 쓰는 스타일
  core.js           데이터, 라우터, 작품 상세·스튜디오·About 화면, 검색
desktop/
  index.html        데스크탑 화면 (상단 메뉴 + ⌕ INDEX)
  desktop.css       데스크탑 전용 스타일
  desktop.js        필터 행(YEAR/SEMESTER/CLASS/PROJECT), 4열 홈
mobile/
  index.html        모바일 화면 (로고 + 검색/LOGIN + 탭 메뉴)
  mobile.css        모바일 전용 스타일
  mobile.js         가로 스와이프 홈, FILTER 버튼과 하단 시트
```

## 보는 방법

- 기본 주소: `https://내아이디.github.io/저장소이름/` (기기에 맞게 자동 이동)
- 직접 고르기: 주소 끝에 `?view=desktop` 또는 `?view=mobile`
- 각 화면 하단의 "모바일 버전 보기 / 데스크탑 버전 보기" 링크로도 이동할 수 있습니다.

## GitHub Pages로 게시하기

1. GitHub에서 새 저장소(Public)를 만듭니다.
2. 이 폴더 안의 **모든 파일과 폴더**를 저장소에 올립니다.
   (`index.html`이 저장소 맨 위에 있어야 합니다. `.nojekyll`도 함께 올려 주세요.)
3. **Settings → Pages → Build and deployment**에서
   Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 두고 Save.
4. 1~2분 뒤 같은 화면에 사이트 주소가 나타납니다.

## 내용 바꾸기

- 작품, 스튜디오, 뉴스, 졸업생 데이터: `assets/core.js` 맨 위쪽
  (`STUDIO_LIST`, `HOME_WORKS`, `NEWS`, `ALUMNI`)
- 데스크탑 화면만 바꾸기: `desktop/` 폴더 / 모바일 화면만 바꾸기: `mobile/` 폴더
- 두 버전에 같이 반영할 내용(작품 상세, 스튜디오 화면 등): `assets/` 폴더
- 지금의 작품 이미지는 도면 느낌의 임시 이미지이고, 로고도 임시입니다.

## 수정한 뒤 화면이 안 바뀔 때

브라우저가 예전 CSS/JS 파일을 기억하고 있으면 새 화면이 일부만 반영됩니다.
`desktop/index.html`, `mobile/index.html`에 있는 `?v=20261123` 숫자를
수정한 날짜로 바꿔서 올리면 모든 방문자가 새 파일을 받아갑니다.
