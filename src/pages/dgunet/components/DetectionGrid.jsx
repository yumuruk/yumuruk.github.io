import { useState } from 'react'
import { SAMPLES } from '../data.js'
import Cite from './Cite.jsx'

/** 같은 장면에서 기법별 검출 결과를 나란히 (논문 Fig. 7). */
export default function DetectionGrid() {
  const [index, setIndex] = useState(0)
  const s = SAMPLES[index]
  const tiles = [
    { name: 'Input', src: s.input.det },
    ...s.methods,
    { name: 'DGU-Net (ours)', src: s.ours.det, ours: true },
    { name: 'Ground truth', src: s.ref.det },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800">{s.caption}</p>
        <div className="flex gap-2">
          {SAMPLES.map((x, i) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={x.caption}
              aria-pressed={i === index}
              className={`h-9 w-12 overflow-hidden rounded ring-2 transition ${
                i === index ? 'ring-emerald-500' : 'opacity-70 ring-transparent hover:opacity-100'
              }`}
            >
              <img src={x.thumb} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tiles.map((t) => (
          <figure key={t.name}>
            <img
              src={t.src}
              alt={`${t.name} detection result`}
              loading="lazy"
              className={`aspect-[4/3] w-full rounded-lg object-cover ${
                t.ours ? 'ring-[3px] ring-emerald-500' : 'ring-1 ring-slate-200'
              }`}
            />
            <figcaption
              className={`mt-1.5 text-center text-xs ${t.ours ? 'font-semibold text-emerald-800' : 'text-slate-600'}`}
            >
              {t.name}
              {t.ref && (
                <>
                  {' '}
                  <Cite k={t.ref} />
                </>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
