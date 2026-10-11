import { CARD_SHADOW_HOVER } from './styles.js'

/** 흰색 카드. title을 주면 제목 줄이 붙고, 없으면 본문만 담는다. */
export default function Panel({ title, children, bodyClassName = 'px-4 sm:px-6 py-5 sm:py-6' }) {
  return (
    <div className={`bg-white rounded-lg border border-emerald-100 ${CARD_SHADOW_HOVER}`}>
      {title && (
        <div className="px-4 sm:px-6 py-5 border-b border-emerald-100">
          <h3 className="text-2xl font-light text-emerald-900">{title}</h3>
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
