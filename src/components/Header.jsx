import { useState } from 'react'
import { SECTIONS, SECTION_IDS, SCROLL_OFFSET } from '../navigation.js'
import { useScrollSpy } from '../hooks/useScrollSpy.js'

const linkBase = 'px-3 py-2 rounded-md text-sm font-semibold transition-colors'
const linkActive = 'bg-emerald-600 text-white'
const linkIdle = 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'

export default function Header() {
  const [open, setOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS, SCROLL_OFFSET)

  const NavItem = ({ id, label }) => (
    <a
      href={`#${id}`}
      onClick={() => setOpen(false)}
      aria-current={activeId === id ? 'true' : undefined}
      className={`${linkBase} ${activeId === id ? linkActive : linkIdle}`}
    >
      {label}
    </a>
  )

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-emerald-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="text-lg font-semibold text-emerald-900 hover:text-emerald-800"
        >
          YuHansung
        </a>

        <nav className="hidden md:flex items-center gap-2">
          {SECTIONS.map((s) => (
            <NavItem key={s.id} id={s.id} label={s.label} />
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-emerald-100 text-emerald-900 hover:bg-emerald-50"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-emerald-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2">
            {SECTIONS.map((s) => (
              <NavItem key={s.id} id={s.id} label={s.label} />
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
