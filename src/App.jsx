import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { useHashScroll } from './hooks/useHashScroll.js'
import Home from './sections/Home.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Publications from './sections/Publications.jsx'
import Projects from './sections/Projects.jsx'

// 한 페이지에 모든 섹션을 쌓고, 상단 네비게이션은 앵커로 그 안을 이동한다.
// 섹션을 추가할 때는 여기와 src/navigation.js 두 곳을 같이 고치면 된다.
export default function App() {
  useHashScroll()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <Home />
        <About />
        <Experience />
        <Publications />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
