import { Fragment } from 'react'
import { REFERENCES } from '../data.js'

const INDEX = Object.fromEntries(REFERENCES.map((r, i) => [r.key, i + 1]))
export const refAnchor = (key) => `ref-${key}`

/** IEEE 스타일 인용 "[n]" — 누르면 맨 아래 References의 해당 항목으로 이동, 가리키면 제목이 보인다. */
export default function Cite({ k }) {
  const keys = Array.isArray(k) ? k : [k]
  return (
    <span className="whitespace-nowrap">
      {keys.map((key, i) => {
        const ref = REFERENCES[INDEX[key] - 1]
        return (
          <Fragment key={key}>
            {i > 0 && ', '}
            <a
              href={`#${refAnchor(key)}`}
              title={[ref.authors, `“${ref.title}”`, ref.venue].filter(Boolean).join(', ')}
              className="font-medium text-emerald-700 hover:underline"
            >
              [{INDEX[key]}]
            </a>
          </Fragment>
        )
      })}
    </span>
  )
}

/** 문자열 안의 {cite:a,b} 토큰을 Cite로 바꿔 렌더한다 (data.js의 설명문용). */
export const withCites = (text) =>
  text.split(/(\{cite:[^}]+\})/).map((part, i) => {
    const m = part.match(/^\{cite:([^}]+)\}$/)
    return m ? <Cite key={i} k={m[1].split(',')} /> : part
  })

/** 페이지 맨 아래 IEEE 스타일 참고문헌 목록. 링크로 도착하면(:target) 해당 항목을 강조한다. */
export const References = () => (
  <ol className="space-y-2 text-sm leading-relaxed text-slate-700">
    {REFERENCES.map((r, i) => (
      <li
        key={r.key}
        id={refAnchor(r.key)}
        className="grid scroll-mt-6 grid-cols-[2.5rem_1fr] rounded-md px-2 py-1 transition-colors target:bg-emerald-50"
      >
        <span className="text-slate-500">[{i + 1}]</span>
        <span>
          {r.authors && `${r.authors}, `}“{r.title},” {/* IEEE: 학회명 앞의 "in"은 기울이지 않는다 */}
          {r.venue.startsWith('in ') && 'in '}
          <span className="italic">{r.venue.replace(/^in /, '')}</span>, {r.details}{' '}
          <a
            href={r.link.href}
            target="_blank"
            rel="noreferrer"
            className="break-all text-emerald-700 underline decoration-emerald-200 underline-offset-2 hover:text-emerald-900"
          >
            {r.link.label}
          </a>
        </span>
      </li>
    ))}
  </ol>
)
