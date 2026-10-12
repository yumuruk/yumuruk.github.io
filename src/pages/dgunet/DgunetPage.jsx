import { useState } from 'react'
import ComparisonViewer from './components/ComparisonViewer.jsx'
import Objective from './components/Objective.jsx'
import DetectionTerm from './components/DetectionTerm.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import DetectionGrid from './components/DetectionGrid.jsx'
import Bibtex from './components/Bibtex.jsx'
import Tex from './components/Tex.jsx'
import Cite, { withCites, References } from './components/Cite.jsx'
import { PAPER, LINKS, ABSTRACT, CONTRIBUTIONS, GRADCAM, ABLATION, IMAGING_MODEL } from './data.js'

const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'method', label: 'Method' },
  { id: 'results', label: 'Results' },
  { id: 'references', label: 'References' },
  { id: 'bibtex', label: 'BibTeX' },
]

const Section = ({ id, kicker, title, children }) => (
  <section id={id} className="scroll-mt-6 py-14 sm:py-20">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{kicker}</p>
    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
    <div className="mt-8 space-y-8">{children}</div>
  </section>
)

const Sub = ({ title, children }) => (
  <div>
    <h3 className="mb-3 text-lg font-semibold text-slate-900">{title}</h3>
    {children}
  </div>
)

const Hero = () => (
  <header className="relative">
    {/* 어두운 바다색 배경이 비교 뷰어 중간까지 깔린다 */}
    <div className="absolute inset-x-0 top-0 h-[calc(100%-12rem)] bg-gradient-to-b from-slate-950 via-[#06303a] to-[#0b4a4f]" />

    <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
      <nav className="flex items-center justify-between py-5 text-sm">
        <a href="/" className="font-semibold text-emerald-200 hover:text-white">
          <i className="fas fa-arrow-left mr-2 text-xs" />
          Hansung Yu
        </a>
        <div className="hidden gap-6 text-slate-300 sm:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="hover:text-white">
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="pb-8 pt-4 text-center sm:pt-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          {PAPER.venue} · {PAPER.year}
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.15]">
          {PAPER.title}
        </h1>

        <p className="mt-5 text-base text-slate-200 sm:text-lg">
          {PAPER.authors.map((a, i) => (
            <span key={a.name}>
              {a.href ? (
                <a href={a.href} className="underline decoration-emerald-400/50 underline-offset-4 hover:text-white">
                  {a.name}
                </a>
              ) : (
                a.name
              )}
              {a.corresponding && <sup>*</sup>}
              {i < PAPER.authors.length - 1 && <span className="mx-2 text-slate-500">·</span>}
            </span>
          ))}
        </p>
        <p className="mt-2 text-sm text-slate-400">{PAPER.affiliation}</p>
        <p className="mt-1 text-xs text-slate-500">* Corresponding author</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white hover:text-slate-900"
            >
              <i className={l.icon} />
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <ComparisonViewer />
      </div>
    </div>
  </header>
)

const HIGHLIGHTS = [
  {
    value: '0.549',
    unit: 'mAP50:95',
    text: 'Best detection accuracy, and the only compared enhancement method that improves on the raw input (0.515).',
  },
  {
    value: '29.02',
    unit: 'dB PSNR',
    text: 'Second-best fidelity to the reference (SSIM 0.9246, LPIPS 0.1205) while optimizing for detection.',
  },
]

const Ablation = () => {
  const rows = [
    { label: 'PSNR ↑', a: ABLATION.without.psnr.toFixed(2), b: ABLATION.with.psnr.toFixed(2), delta: '−0.59 dB', good: false },
    { label: 'SSIM ↑', a: ABLATION.without.ssim.toFixed(4), b: ABLATION.with.ssim.toFixed(4), delta: '−0.0225', good: false },
    { label: 'LPIPS ↓', a: ABLATION.without.lpips.toFixed(4), b: ABLATION.with.lpips.toFixed(4), delta: '+0.0059', good: false },
    { label: 'mAP50:95 ↑', a: ABLATION.without.map.toFixed(3), b: ABLATION.with.map.toFixed(3), delta: '+0.044', good: true },
  ]
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[480px] text-sm tabular-nums">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="px-4 py-3 text-left font-semibold">Metric</th>
            <th className="px-4 py-3 text-right font-semibold">
              without <Tex tex="\mathcal{R}_{\text{Det}}" />
            </th>
            <th className="px-4 py-3 text-right font-semibold">
              with <Tex tex="\mathcal{R}_{\text{Det}}" />
            </th>
            <th className="px-4 py-3 text-right font-semibold">Change</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-2.5 text-slate-700">{r.label}</td>
              <td className="px-4 py-2.5 text-right text-slate-700">{r.a}</td>
              <td className="px-4 py-2.5 text-right font-semibold text-slate-900">{r.b}</td>
              <td className="px-4 py-2.5 text-right">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    r.good ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {r.delta}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-3 text-xs text-slate-500">
        The detection-guided term trades a small amount of reference fidelity for a large gain in detection accuracy.
      </p>
    </div>
  )
}

const GradCam = () => {
  const [i, setI] = useState(0)
  const g = GRADCAM[i]
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
          Grad-CAM <Cite k="gradcam" /> from the last backbone layer of YOLOv9e <Cite k="yolov9" />, with its predicted
          boxes in green. Compared with the other enhancement results, the detector&apos;s attention on DGU-Net output is
          concentrated on the objects.
        </p>
        <div className="flex gap-2">
          {GRADCAM.map((x, k) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={k === i}
              onClick={() => setI(k)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                k === i ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Scene {k + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {g.tiles.map((t) => (
          <figure key={t.key}>
            <img
              src={t.src}
              alt={`Grad-CAM on ${t.name}`}
              loading="lazy"
              className={`aspect-[4/3] w-full rounded-lg object-cover ${t.ours ? 'ring-[3px] ring-emerald-500' : 'ring-1 ring-slate-200'}`}
            />
            <figcaption className={`mt-1.5 text-center text-xs ${t.ours ? 'font-semibold text-emerald-800' : 'text-slate-600'}`}>
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

export default function DgunetPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Hero />

      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <div key={h.unit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {h.value}
                <span className="ml-1.5 text-sm font-semibold text-emerald-700">{h.unit}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.text}</p>
            </div>
          ))}
        </div>

        <Section id="overview" kicker="Overview" title="Enhancement that also serves the detector">
          <p className="max-w-3xl leading-relaxed text-slate-700">{ABSTRACT}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {CONTRIBUTIONS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <i className={`fas ${c.icon} text-lg text-emerald-600`} />
                <h3 className="mt-3 font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{withCites(c.text)}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="method" kicker="Method" title="One optimization problem for both humans and detectors">
          <Sub title="Underwater image formation">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6">
              <Tex block tex={IMAGING_MODEL} className="text-lg" />
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                The captured image <Tex tex="\mathbf{I}" /> is the clean scene <Tex tex="\mathbf{J}" /> attenuated by the
                transmission map <Tex tex="\mathbf{t}" />, plus background light <Tex tex="\mathbf{B}" /> scattered in by
                the water. Recovering three unknowns from one image is ill-posed, so each unknown gets its own prior.
              </p>
            </div>
          </Sub>

          <Sub title="Joint objective">
            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              Point at a term to see what it does. The detection-guided term is what lets a downstream detector shape the
              enhancement.
            </p>
            <Objective />
          </Sub>

          <DetectionTerm />

          <Sub title="Unrolled into a network">
            <figure className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <img src="/dgunet/overview.png" alt="Overall architecture of DGU-Net" loading="lazy" className="w-full" />
              <figcaption className="mt-4 text-sm leading-relaxed text-slate-600">
                The objective is solved with the augmented Lagrangian method and unfolded into <Tex tex="N = 3" /> blocks.
                Each block runs a color-correction step and an optimization step: <Tex tex="\mathbf{B}" />,{' '}
                <Tex tex="\mathbf{t}" />, <Tex tex="\mathbf{J}" /> and the auxiliary variables are updated in closed
                form, the learned priors act as CNN proximal operators{' '}
                <Tex tex="\operatorname{prox}_f,\ \operatorname{prox}_g" />, and the frozen detector{' '}
                <Tex tex="\mathcal{F}" /> drives the detection-guided update.
              </figcaption>
            </figure>
          </Sub>
        </Section>

        <Section id="results" kicker="Results" title="Better detection without giving up image quality">
          <Sub title="Quantitative comparison on UJED">
            <ResultsTable />
          </Sub>
          <Sub title="Detection results across methods">
            <DetectionGrid />
          </Sub>
          <Sub title="Where the detector looks">
            <GradCam />
          </Sub>
          <Sub title="Effect of the detection-guided term">
            <Ablation />
          </Sub>
        </Section>

        <Section id="references" kicker="References" title="References">
          <References />
        </Section>

        <Section id="bibtex" kicker="Citation" title="BibTeX">
          <Bibtex />
        </Section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <a href="/" className="font-semibold text-emerald-700 hover:text-emerald-900">
          Hansung Yu
        </a>{' '}
        · Images from the UJED test set (built on URPC 2019 <Cite k="urpc" />).
      </footer>
    </div>
  )
}
