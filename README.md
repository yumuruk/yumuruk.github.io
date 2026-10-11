# yumuruk-portfolio

`yumuruk.github.io` 개인 사이트의 **React 소스**. 원본 소스가 남아있지 않아 배포된 번들에서 복원한 뒤,
페이지 전환 방식을 **한 페이지 스크롤 + 상단 앵커 네비게이션**으로 바꾼 버전이다.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview
```

## 스택

React 19 · Vite 7 · Tailwind CSS 3 · Font Awesome 7

라우터는 쓰지 않는다. 원래는 `react-router-dom` 7의 `HashRouter`로 `/About`, `/Publications`,
`/Projects`가 각각 별도 view였는데, 지금은 전부 한 문서 안의 섹션이다.
해시(`#about`)가 곧 스크롤 앵커이므로 HashRouter와는 공존할 수 없어 의존성을 걷어냈다.

## 구조

```
src/
  main.jsx              진입점 (index.css → Font Awesome → App)
  App.jsx               레이아웃(모바일 Header / 데스크톱 Sidebar) + 섹션을 순서대로 쌓는 곳
  navigation.js         섹션 목록 = 네비게이션 목록 (단일 소스)
  index.css             Tailwind 지시자 + base 레이어
  components/
    Header.jsx          lg 미만 전용 sticky 상단 네비게이션 + 모바일 메뉴
    Sidebar.jsx         lg 이상 전용 왼쪽 고정 사이드바 (프로필 + 섹션 인덱스 + 링크)
    SocialLinks.jsx     GitHub / LinkedIn / velog / Email 링크 (Home·Sidebar 공용)
    Footer.jsx
    Section.jsx         id·제목을 갖는 한 구획 (scroll-mt 포함)
    Panel.jsx           흰색 카드 (제목 선택)
    TimelineItem.jsx    제목+기간+소속 카드 (Education / Experience / Projects 공용)
    styles.js           카드 그림자 상수
  hooks/
    useScrollSpy.js     현재 보이는 섹션 판별 → 네비 하이라이트
    useHashScroll.js    #anchor 로 바로 진입했을 때의 초기 스크롤
  sections/
    Home.jsx  About.jsx  Experience.jsx  Publications.jsx  Projects.jsx
```

`Experience.jsx` 맨 위의 `EXPERIENCE` 배열이 비어 있으면 "Will be updated soon." 패널이 나온다.
각 경력 카드에는 `Projects.jsx`의 `PROJECTS` 중 `company`가 같은 프로젝트의 제목이 링크로 붙고,
누르면 해당 프로젝트 카드(`#project-<id>`)로 이동한다. 프로젝트 상세는 `PROJECTS`에만 쓴다.

### 섹션 추가하기

1. `src/sections/`에 컴포넌트를 만들고 `<Section id="..." title="...">`로 감싼다.
2. `src/navigation.js`의 `SECTIONS`에 `{ id, label }`을 추가한다.
3. `src/App.jsx`의 `<main>` 안에 원하는 순서로 끼워 넣는다.

`id`만 맞으면 네비게이션 링크·활성 하이라이트·해시 딥링크가 자동으로 따라온다.

## 네비게이션 동작

- 화면 폭에 따라 네비게이션이 바뀐다 (Tailwind `lg` = 1024px 기준).
  - lg 미만: `Header`(sticky 상단 바) + `Home`(프로필 히어로)
  - lg 이상: `Sidebar`가 왼쪽에 고정되고 프로필·인덱스를 함께 보여주므로 `Header`와 `Home`은 숨긴다.
    `Footer`를 본문 열 안에 둬야 sticky 사이드바가 페이지 끝에서 밀려 올라가지 않는다.
- 네비 링크는 평범한 `<a href="#id">`. 이동은 CSS `scroll-behavior: smooth`가 처리하고,
  `prefers-reduced-motion`이면 즉시 이동으로 떨어진다.
- 각 섹션의 `scroll-mt-20`(80px)이 헤더(65px) 아래로 제목이 숨는 걸 막는다.
- `useScrollSpy`가 헤더 아래 기준선을 지난 마지막 섹션을 활성으로 잡는다.
  페이지 맨 아래에서는 마지막 섹션이 짧아도 활성이 되도록 따로 처리했다.
- `#publications`처럼 해시를 달고 바로 들어오면 브라우저의 기본 앵커 점프는 실패한다
  (해시 해석 시점에 React가 아직 섹션을 그리지 않았다). `useHashScroll`이 마운트 직후 한 번 보정한다.

## 원본에서 바꾼 것

복원 자체는 번들과 1:1로 맞췄고(Tailwind 클래스 집합 162개 중 렌더되는 것 전부 일치),
아래만 의도적으로 다르다.

| 항목 | 원본 | 지금 |
|---|---|---|
| 화면 전환 | HashRouter, 4개 view | 한 페이지 4개 섹션 + 앵커 |
| Hero 높이 | `min-h-[calc(100vh-14rem)]` | `min-h-[calc(100vh-4rem)]` |
| 카드/제목 컴포넌트 | 페이지마다 복사본 | `Section` / `Panel`로 통합 |
| 제목 단계 | 페이지별 `h1` | 문서 하나이므로 `h1`(이름) > `h2`(섹션) > `h3`(카드) |

### 걷어낸 Vite 보일러플레이트

원본 `index.css`에는 Vite React 템플릿 기본 스타일이 그대로 남아 있었고, 그중 셋은
요소 셀렉터라 Tailwind 유틸리티를 이기고 실제로 디자인을 깨고 있었다.

- `a:hover { color: #747bff }` — **모든 링크**의 hover 색을 보라색으로 덮어썼다.
  활성 네비게이션 항목(`text-white`)에 마우스를 올리면 글자가 보라색이 됐다.
- `button { background-color: #1a1a1a }` — 모바일 햄버거 버튼이 회색/검정으로 칠해졌다.
- `h1 { font-size: 3.2em }` — 유틸리티에 밀려 아무 효과 없는 죽은 규칙.

`color-scheme`도 `light dark` → `light`로 고정했다. 밝은 페이지에 시스템 다크 모드의
어두운 스크롤바가 섞여 나오던 문제.

## 배포

`main`에 push하면 `.github/workflows/deploy.yml`이 빌드해서 GitHub Pages로 배포한다
(레포 Settings → Pages → Source: **GitHub Actions**). public 레포라 Actions 비용은 없다.
진행 상황은 레포의 Actions 탭에서 본다. 수동 재배포는 Actions → Deploy to GitHub Pages → Run workflow.

이전에는 빌드 결과물(`dist/`)을 `gh-pages` 브랜치에 직접 올려 서빙했다. 그 브랜치는 백업으로만 남아 있고
더 이상 사이트와 연결돼 있지 않다.
