import { CARD_SHADOW_HOVER } from './styles.js'

/**
 * 제목 + 기간 + 소속으로 이루어진 타임라인 카드. Education / Experience / Projects가 같은 모양을 쓴다.
 * 기간은 제목 줄 오른쪽에 두고(좁으면 아래로 줄바꿈), children을 주면 구분선 아래 상세가 붙는다.
 * id가 있으면 앵커 대상: 헤더 아래로 숨지 않게 scroll-mt, 링크로 도착하면 테두리 강조.
 */
export default function TimelineItem({ id, period, title, org, children }) {
  return (
    <div
      id={id}
      className={`p-5 sm:p-6 bg-white rounded-lg border border-emerald-100 scroll-mt-20 target:ring-2 target:ring-emerald-400 ${CARD_SHADOW_HOVER}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="text-base sm:text-lg font-semibold text-slate-900">{title}</div>
        {period && (
          <span className="text-sm font-semibold text-emerald-700 tabular-nums whitespace-nowrap">{period}</span>
        )}
      </div>
      {org && <div className="text-slate-600 mt-0.5 font-medium">{org}</div>}
      {children && (
        <div className="mt-4 pt-4 border-t border-emerald-100 space-y-2 text-sm text-slate-600">{children}</div>
      )}
    </div>
  )
}

/** 상세 영역 안의 "라벨: 값" 한 줄. */
export const DetailRow = ({ label, children }) => (
  <div className="flex gap-2">
    <span className="font-bold text-emerald-700 shrink-0">{label}:</span>
    <span>{children}</span>
  </div>
)
