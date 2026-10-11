import { useState } from 'react'
import Tex from './Tex.jsx'
import { withCites } from './Cite.jsx'
import { OBJECTIVE, OBJECTIVE_STACKED, FULL_OBJECTIVE, TERMS } from '../data.js'

// Tailwind가 클래스를 찾을 수 있게 색별 클래스는 문자열로 고정해 둔다.
const DOT = {
  sky: 'bg-sky-400',
  violet: 'bg-violet-400',
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-400',
}
const CHIP_ON = {
  sky: 'border-sky-300 bg-sky-50 text-sky-900',
  violet: 'border-violet-300 bg-violet-50 text-violet-900',
  amber: 'border-amber-300 bg-amber-50 text-amber-900',
  emerald: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  rose: 'border-rose-300 bg-rose-50 text-rose-900',
}

const termKey = (target) => {
  const el = target.closest?.('.term')
  return el && [...el.classList].find((c) => c.startsWith('t-'))?.slice(2)
}

/**
 * 핵심 최적화 문제. 수식의 항 또는 아래 범례를 가리키면 해당 항이 강조되고,
 * 누르면 그 항의 정의와 설명이 아래에 고정된다. 전체 식(논문 식 19)은 펼쳐서 볼 수 있다.
 */
export default function Objective() {
  const [active, setActive] = useState('det')
  const [hover, setHover] = useState(null)
  const [full, setFull] = useState(false)
  const term = TERMS.find((t) => t.key === active)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className="objective overflow-x-auto px-4 py-6 text-[1.05rem] sm:px-6 sm:text-[1.2rem]"
        data-active={hover ?? active}
        onClick={(e) => termKey(e.target) && setActive(termKey(e.target))}
        onMouseOver={(e) => setHover(termKey(e.target) ?? null)}
        onMouseLeave={() => setHover(null)}
      >
        <Tex block tex={OBJECTIVE} className="hidden sm:block" />
        <Tex block tex={OBJECTIVE_STACKED} className="sm:hidden" />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-slate-100 px-4 py-4 sm:px-6">
        {TERMS.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={active === t.key}
            onClick={() => setActive(t.key)}
            onMouseEnter={() => setHover(t.key)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(t.key)}
            onBlur={() => setHover(null)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              active === t.key ? CHIP_ON[t.color] : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${DOT[t.color]}`} />
            {t.label}
            {t.isNew && (
              <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white">
                new
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-slate-100 px-4 py-5 sm:px-6">
        <div className="overflow-x-auto text-slate-800">
          <Tex block tex={term.def} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{withCites(term.text)}</p>
      </div>

      <div className="border-t border-slate-100">
        <button
          type="button"
          aria-expanded={full}
          onClick={() => setFull((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:px-6"
        >
          Full objective with every regularizer expanded (Eq. 19 in the paper)
          <i className={`fas fa-chevron-down text-xs transition-transform ${full ? 'rotate-180' : ''}`} />
        </button>
        {full && (
          <div className="overflow-x-auto px-4 pb-6 text-slate-800 sm:px-6">
            <Tex block tex={FULL_OBJECTIVE} />
          </div>
        )}
      </div>
    </div>
  )
}
