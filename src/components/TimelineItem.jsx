import { CARD_SHADOW_HOVER } from './styles.js'

/** 왼쪽 배지(연도/기간). 긴 기간 문자열도 줄바꿈되도록 열어뒀다. */
export const Badge = ({ children }) => (
  <span
    className={`inline-flex items-center justify-center min-w-[64px] min-h-8 px-3 py-1 rounded-sm text-sm font-semibold leading-tight text-center bg-emerald-600 text-white ${CARD_SHADOW_HOVER}`}
  >
    {children}
  </span>
)

/**
 * 배지 + 제목 + 소속으로 이루어진 타임라인 카드.
 * children을 주면 회색 상세 박스가 아래에 붙는다.
 * Education / Experience가 같은 모양을 쓴다.
 */
export default function TimelineItem({ badge, title, org, wide = false, children }) {
  const columns = wide
    ? 'grid-cols-[92px_1fr] sm:grid-cols-[128px_1fr]'
    : 'grid-cols-[80px_1fr] sm:grid-cols-[96px_1fr]'

  return (
    <div
      className={`grid ${columns} gap-5 p-6 my-4 bg-white rounded-md border border-emerald-100 ${CARD_SHADOW_HOVER}`}
    >
      <div className="pt-1">
        <Badge>{badge}</Badge>
      </div>
      <div>
        <div className="text-base sm:text-lg font-semibold text-slate-900">{title}</div>
        {org && <div className="text-slate-700 mt-1 font-medium">{org}</div>}
        {children && (
          <div className="mt-3 space-y-1.5 text-sm text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-100">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

/** 상세 박스 안의 "라벨: 값" 한 줄. */
export const DetailRow = ({ label, children }) => (
  <div className="flex gap-2">
    <span className="font-bold text-emerald-700 shrink-0">{label}:</span>
    <span>{children}</span>
  </div>
)
