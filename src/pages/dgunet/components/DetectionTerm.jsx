import { useState } from 'react'
import Tex from './Tex.jsx'
import { CLASSES, TERM_MAPS } from '../data.js'

const Tile = ({ src, caption }) => (
  <figure>
    <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover ring-1 ring-slate-200" />
    <figcaption className="mt-1.5 text-center text-xs text-slate-600">{caption}</figcaption>
  </figure>
)

/**
 * 검출 유도 항이 실제로 비교하는 것: 클래스별 예측 마스크 F(J)_i 와 GT 마스크 M_i (논문 Fig. 4).
 * 클래스를 바꿔 가며 볼 수 있다.
 */
export default function DetectionTerm() {
  const [cls, setCls] = useState(0)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800">
          What <Tex tex="\mathcal{R}_{\text{Det}}" /> compares, class by class
        </p>
        <div className="inline-flex flex-wrap rounded-lg bg-slate-100 p-1" role="group" aria-label="Object class">
          {CLASSES.map((c, i) => (
            <button
              key={c}
              type="button"
              aria-pressed={cls === i}
              onClick={() => setCls(i)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold capitalize transition-colors ${
                cls === i ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {i + 1}. {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        <Tile src={TERM_MAPS.predOverlay} caption="Detector prediction on J" />
        <Tile src={TERM_MAPS.pred(cls)} caption={<Tex tex={`\\mathcal{F}(\\mathbf{J})_{${cls + 1}}\\;\\text{(${CLASSES[cls]})}`} />} />
        <Tile src={TERM_MAPS.gtOverlay} caption="Ground-truth annotation" />
        <Tile src={TERM_MAPS.gt(cls)} caption={<Tex tex={`\\mathbf{M}_{${cls + 1}}\\;\\text{(${CLASSES[cls]})}`} />} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        Mismatches between the two masks are penalized for every class, which encourages the enhanced image to keep
        the structures a detector relies on. The detector itself stays frozen during enhancement training.
      </p>
    </div>
  )
}
