import { Fragment } from 'react'
import { METRICS, RESULTS } from '../data.js'
import Cite from './Cite.jsx'

const cellClass = (mark) =>
  mark === 'best' ? 'font-bold text-emerald-700' : mark === 'second' ? 'underline decoration-sky-400 underline-offset-4' : ''

/** 논문 Table 4 (UJED). 표기(best/second)는 논문 그대로, 우리 행은 강조. */
export default function ResultsTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-sm tabular-nums">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="px-4 py-3 text-left font-semibold">Method</th>
            {METRICS.map((m, i) => (
              <th
                key={m}
                className={`px-3 py-3 text-right font-semibold ${i === 5 ? 'border-l border-slate-200' : ''} ${
                  i === 6 ? 'border-l border-slate-200' : ''
                }`}
              >
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RESULTS.map(({ group, rows }) => (
            <Fragment key={group ?? 'input'}>
              {group && (
                <tr>
                  <td colSpan={METRICS.length + 1} className="bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-500">
                    {group}
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={row.name} className={`border-b border-slate-100 ${row.ours ? 'bg-emerald-50/70' : ''}`}>
                  <td className={`px-4 py-2 text-left ${row.ours ? 'font-semibold text-emerald-900' : 'text-slate-700'}`}>
                    {row.name}
                    {row.ref && (
                      <span className="ml-1.5 text-xs">
                        <Cite k={row.ref} />
                      </span>
                    )}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`px-3 py-2 text-right text-slate-700 ${i >= 5 ? 'border-l border-slate-200' : ''} ${cellClass(
                        row.marks[i],
                      )}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-3 text-xs text-slate-500">
        UJED test set. <span className="font-bold text-emerald-700">Bold</span> = best,{' '}
        <span className="underline decoration-sky-400 underline-offset-4">underline</span> = second best, as marked
        in the paper. Detection uses YOLOv9e <Cite k="yolov9" /> fine-tuned on each method&apos;s enhanced images.
      </p>
    </div>
  )
}
