import { useEffect, useState } from 'react'
import CompareSlider from './CompareSlider.jsx'
import { SAMPLES } from '../data.js'

const LEFT_OPTIONS = [
  { key: 'input', label: 'Input' },
  { key: 'ref', label: 'Reference' },
]

const Segmented = ({ value, onChange, options }) => (
  <div className="inline-flex rounded-lg bg-slate-100 p-1" role="group" aria-label="Compare DGU-Net with">
    {options.map((o) => (
      <button
        key={o.key}
        type="button"
        aria-pressed={value === o.key}
        onClick={() => onChange(o.key)}
        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
          value === o.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
)

const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700"
  >
    <span className={`relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? 'bg-emerald-600' : 'bg-slate-300'}`}>
      <span
        className={`absolute left-0 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-[18px]' : 'translate-x-0.5'
        }`}
      />
    </span>
    {label}
  </button>
)

/**
 * 첫 화면의 비교 뷰어: 왼쪽(Input 또는 Reference) ↔ 오른쪽(DGU-Net).
 * Detections를 켜면 같은 장면의 검출 결과 이미지로 바뀐다 (Reference는 GT 박스).
 */
export default function ComparisonViewer() {
  const [index, setIndex] = useState(0)
  const [left, setLeft] = useState('input')
  const [det, setDet] = useState(false)
  const s = SAMPLES[index]

  // 토글·전환 때 깜빡이지 않게 현재 샘플의 모든 버전을 미리 받아 둔다.
  useEffect(() => {
    for (const v of [s.input, s.ours, s.ref]) {
      for (const src of [v.clean, v.det]) new Image().src = src
    }
  }, [s])

  const pick = (v) => (det ? v.det : v.clean)
  const leftLabel = left === 'input' ? 'Input' : 'Reference'

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {SAMPLES.map((x, i) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={x.caption}
              aria-pressed={i === index}
              className={`h-10 w-14 overflow-hidden rounded-md ring-2 transition ${
                i === index ? 'ring-emerald-500' : 'opacity-70 ring-transparent hover:opacity-100'
              }`}
            >
              <img src={x.thumb} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Segmented value={left} onChange={setLeft} options={LEFT_OPTIONS} />
          <Toggle checked={det} onChange={setDet} label="Detections" />
        </div>
      </div>

      <CompareSlider
        key={s.id}
        left={{ src: pick(s[left]), label: leftLabel }}
        right={{ src: pick(s.ours), label: 'DGU-Net' }}
      />

      <p className="border-t border-slate-100 px-4 py-3 text-xs leading-relaxed text-slate-500">
        <span className="font-medium text-slate-700">{s.caption}.</span>{' '}
        {det
          ? left === 'ref'
            ? 'Left: ground-truth annotations on the UJED reference. Right: YOLOv9e predictions on DGU-Net output.'
            : 'YOLOv9e predictions on each image. Compare how many objects are found, and how confidently.'
          : 'Drag the handle (or use ← →) to compare. Reference = UJED reference image selected by a user study.'}
      </p>
    </div>
  )
}
