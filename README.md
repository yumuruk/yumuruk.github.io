# yumuruk.github.io

유한성(Hansung Yu)의 개인 사이트 소스입니다. → https://yumuruk.github.io

| 경로 | 내용 |
|---|---|
| `/` | 포트폴리오 — About, Experience, Publications, Projects |
| `/dgunet/` | 논문 프로젝트 페이지 — *Detection-Guided Deep Unfolding for Joint Underwater Image Enhancement and Object Detection* (IEEE Access, 2026) |

## 실행

```bash
npm install
npm run dev       # http://localhost:5173  (프로젝트 페이지: /dgunet/)
npm run build     # dist/
npm run preview   # 빌드 결과 확인
```

## 스택

React 19 · Vite 7 (멀티 페이지) · Tailwind CSS 3 · Font Awesome 7 · KaTeX

## 구조

```
index.html                 포트폴리오 엔트리 → src/main.jsx
dgunet/index.html          프로젝트 페이지 엔트리 → src/pages/dgunet/main.jsx
src/
  App.jsx                  포트폴리오 레이아웃 (모바일: Header, 데스크톱: Sidebar)
  navigation.js            섹션 목록 = 네비게이션 목록
  profile.jsx              직함·한 줄 소개 (Sidebar·Home 공용)
  components/              Header, Sidebar, SocialLinks, Section, Panel, TimelineItem, Footer
  hooks/                   useScrollSpy(현재 섹션 표시), useHashScroll(#앵커 진입 보정)
  sections/                Home, About, Experience, Publications, Projects
  pages/dgunet/
    data.js                논문 정보·샘플·결과 표·수식·참고문헌
    DgunetPage.jsx         섹션 배치
    components/            비교 슬라이더, 최적화 식, 결과 표, 인용(Cite) 등
public/dgunet/             프로젝트 페이지 이미지
```

## 내용 수정

| 바꿀 것 | 위치 |
|---|---|
| 직함·한 줄 소개 | `src/profile.jsx` |
| 학력·기술 스택 | `src/sections/About.jsx` |
| 경력 | `src/sections/Experience.jsx`의 `EXPERIENCE` |
| 프로젝트 | `src/sections/Projects.jsx`의 `PROJECTS` |
| 논문 목록 | `src/sections/Publications.jsx`의 `PUBLICATIONS` |
| 프로젝트 페이지 문구·수치·수식·참고문헌 | `src/pages/dgunet/data.js` |

- **프로젝트**: `title`은 Projects 카드에 쓰는 상세 이름, `short`는 Experience 링크에 쓰는 짧은 이름입니다. `company`가 경력의 `org`와 같으면 그 경력 카드에 프로젝트 링크가 자동으로 붙습니다.
- **프로젝트 페이지**: 수치와 수식은 논문 최종 원고를 기준으로 합니다. 참고문헌은 IEEE 스타일이며, 번호는 `REFERENCES` 배열 순서를 따릅니다. 본문에서는 `{cite:key}`로 인용합니다.

## 섹션 추가

1. `src/sections/`에 컴포넌트를 만들고 `<Section id="..." title="...">`로 감쌉니다.
2. `src/navigation.js`의 `SECTIONS`에 `{ id, label }`을 추가합니다.
3. `src/App.jsx`의 `<main>`에 원하는 순서로 넣습니다.

`id`가 맞으면 네비게이션 링크, 현재 섹션 표시, `#id` 바로가기가 함께 동작합니다.

## 레이아웃 메모

- 1024px(Tailwind `lg`)를 기준으로 네비게이션이 바뀝니다. 그보다 좁으면 상단 Header와 Home(프로필)이, 넓으면 왼쪽 고정 Sidebar가 나옵니다.
- `Footer`는 본문 열 안에 둡니다. 밖으로 빼면 페이지 끝에서 고정 사이드바가 위로 밀립니다.
- 데스크톱에서는 About을 최소 한 화면 높이로 잡습니다. 그래서 첫 화면에 다음 섹션이 걸쳐 보이지 않습니다.

## 배포

`main`에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해서 GitHub Pages에 배포합니다. 보통 1분 안에 끝납니다.

- 레포 설정: Settings → Pages → Source를 **GitHub Actions**로 둡니다.
- 수동 재배포: Actions → *Deploy to GitHub Pages* → *Run workflow*
- `gh-pages` 브랜치는 예전 배포본을 보관하는 백업이며, 지금 사이트와는 연결되어 있지 않습니다.
