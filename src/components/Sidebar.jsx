import profileImg from '../assets/yhs.jpg'
import { SECTIONS, SCROLL_OFFSET } from '../navigation.js'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import SocialLinks from './SocialLinks.jsx'
import { ROLE, Focus } from '../profile.jsx'

// 사이드바가 곧 Home(프로필) 역할을 하므로 인덱스에서 Home은 뺀다.
const NAV = SECTIONS.filter((s) => s.id !== 'home')
const NAV_IDS = NAV.map((s) => s.id)

/**
 * 데스크톱(lg 이상) 전용 왼쪽 고정 사이드바. 프로필 + 섹션 인덱스 + 링크를
 * 한 덩어리로 화면 세로 가운데에 둔다. lg 미만에서는 Header + Home이 대신한다.
 */
export default function Sidebar() {
  const activeId = useScrollSpy(NAV_IDS, SCROLL_OFFSET)

  return (
    <aside className="hidden lg:flex flex-col justify-center sticky top-0 h-screen py-16">
      <img
        src={profileImg}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover object-[center_20%] border-4 border-white shadow-md"
      />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">YuHansung</h1>
      <p className="mt-2 text-base font-medium text-emerald-700">{ROLE}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600"><Focus /></p>

      <nav className="mt-12">
        <ul className="space-y-1">
          {NAV.map(({ id, label }) => {
            const active = activeId === id
            return (
              <li key={id}>
                {/* 현재 섹션은 앞의 선이 길어지고 초록색이 된다 */}
                <a href={`#${id}`} className="group flex items-center py-2">
                  <span
                    className={`mr-4 h-px transition-all ${
                      active ? 'w-16 bg-emerald-600' : 'w-8 bg-slate-300 group-hover:w-16 group-hover:bg-slate-500'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      active ? 'text-emerald-700' : 'text-slate-500 group-hover:text-slate-900'
                    }`}
                  >
                    {label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <SocialLinks className="mt-12 gap-5" linkClassName="text-xl transition-colors" />
    </aside>
  )
}
