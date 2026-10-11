import { useCallback, useRef, useState } from 'react'

const Label = ({ side, hidden, children }) => (
  <span
    className={`pointer-events-none absolute top-3 ${side === 'left' ? 'left-3' : 'right-3'} rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition-opacity ${
      hidden ? 'opacity-0' : 'opacity-100'
    }`}
  >
    {children}
  </span>
)

/**
 * 두 이미지를 겹쳐 놓고 세로 핸들로 경계를 옮겨 비교한다.
 * 드래그·클릭으로 이동, 키보드(←/→, Shift로 크게, Home/End)도 지원.
 * touch-pan-y: 모바일에서 세로 스크롤은 페이지가, 가로 드래그는 슬라이더가 받는다.
 */
export default function CompareSlider({ left, right, initial = 50 }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(initial)
  const [dragging, setDragging] = useState(false)

  const moveTo = useCallback((clientX) => {
    const r = ref.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    const next = { ArrowLeft: pos - step, ArrowRight: pos + step, Home: 0, End: 100 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setPos(Math.min(100, Math.max(0, next)))
  }

  return (
    <div
      ref={ref}
      className={`relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden bg-slate-900 ${
        dragging ? 'cursor-grabbing' : 'cursor-ew-resize'
      }`}
      onPointerDown={(e) => {
        ref.current.setPointerCapture(e.pointerId)
        setDragging(true)
        moveTo(e.clientX)
      }}
      onPointerMove={(e) => dragging && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img src={right.src} alt={right.label} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={left.src}
        alt={left.label}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <Label side="left" hidden={pos < 15}>
        {left.label}
      </Label>
      <Label side="right" hidden={pos > 85}>
        {right.label}
      </Label>

      <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${left.label} and ${right.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-700 shadow-lg ring-emerald-400/60 focus:outline-none focus-visible:ring-4"
        >
          <i className="fas fa-arrows-left-right text-sm" />
        </div>
      </div>
    </div>
  )
}
