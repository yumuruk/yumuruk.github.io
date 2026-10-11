// 네비게이션(모바일 Header / 데스크톱 Sidebar) = 한 페이지 안의 스크롤 앵커.
// 여기 순서가 곧 페이지에 렌더링되는 섹션 순서이자 네비게이션 순서다.
export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
]

export const SECTION_IDS = SECTIONS.map((s) => s.id)

// sticky 헤더(h-16 = 4rem) 아래로 섹션이 가려지지 않도록 두는 여백.
// scroll-mt-20(5rem = 80px)과 짝을 이룬다.
export const SCROLL_OFFSET = 88
