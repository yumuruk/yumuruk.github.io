import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import { useHashScroll } from './hooks/useHashScroll.js'
import Home from './sections/Home.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Publications from './sections/Publications.jsx'
import Projects from './sections/Projects.jsx'

// 한 페이지에 모든 섹션을 쌓고, 네비게이션은 앵커로 그 안을 이동한다.
//   lg 미만: 상단 Header + Home(프로필) + 섹션
//   lg 이상: 왼쪽 고정 Sidebar(프로필 + 인덱스) + 오른쪽 섹션
// 섹션을 추가할 때는 여기와 src/navigation.js 두 곳을 같이 고치면 된다.
export default function App() {
  useHashScroll()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-7xl mx-auto lg:grid lg:grid-cols-[300px_1fr] lg:gap-8 lg:px-12">
        <Sidebar />
        {/* Footer까지 본문 열 안에 둬야 sticky 사이드바가 페이지 끝에서 밀려 올라가지 않는다 */}
        <main className="min-w-0 lg:py-8">
          <Home />
          <About />
          <Experience />
          <Publications />
          <Projects />
          <Footer />
        </main>
      </div>
    </div>
  )
}
