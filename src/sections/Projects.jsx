import Section from '../components/Section.jsx'
import TimelineItem, { DetailRow } from '../components/TimelineItem.jsx'

/**
 * 프로젝트 설명에 나오는 분석 기법 용어. 처음 보는 사람이 바로 찾아볼 수 있게
 * 프로젝트 카드의 Terms 줄에 정식 명칭 + 설명 링크로 보여준다.
 */
const TERMS = {
  Raman: { name: 'Raman spectroscopy', href: 'https://en.wikipedia.org/wiki/Raman_spectroscopy' },
  XRF: { name: 'X-ray fluorescence', href: 'https://en.wikipedia.org/wiki/X-ray_fluorescence' },
  LIBS: {
    name: 'Laser-induced breakdown spectroscopy',
    href: 'https://en.wikipedia.org/wiki/Laser-induced_breakdown_spectroscopy',
  },
}

/**
 * 프로젝트 항목. 순서는 경력기술서의 프로젝트 순서를 따른다.
 * company가 EXPERIENCE의 org와 같으면 그 경력 카드에 이 프로젝트로 가는 링크가 붙는다.
 * 공개 사이트라 고객사명은 넣지 않고, 역할은 과장 없이 한 일·쓸 수 있는 기술 위주로 쓴다.
 *
 * {
 *   id: 'ess',                          // 앵커 → #project-ess
 *   period: '2026.05 – Present',
 *   title: 'Web-based ESS Remote Monitoring ...', // Projects 카드에 쓰는 상세 이름
 *   short: 'ESS Remote Monitoring Platform',      // Experience 링크에 쓰는 짧은 이름 (4~5단어)
 *   company: 'CSI Vision',
 *   role: 'Web application development', // 선택
 *   bullets: ['...'],                   // 선택
 *   terms: ['XRF'],                     // 선택 — TERMS의 키
 *   stack: ['React', 'Docker'],         // 선택
 * }
 */
export const PROJECTS = [
  {
    id: 'ess',
    period: '2026.05 – Present',
    title: 'Web-based ESS Remote Monitoring and Operation Profile Analysis',
    short: 'ESS Remote Monitoring Platform',
    company: 'CSI Vision',
    role: 'System design, web development',
    bullets: [
      'Designed the web application and KPIs for remote monitoring and operation profile analysis of ESS (energy storage system) data',
      'Implemented the backend with Spring Boot and the frontend with React, deployed with Docker on AWS',
    ],
    stack: ['Spring Boot', 'React', 'Docker', 'AWS (EC2, S3)'],
  },
  {
    id: 'raman',
    period: '2026.03 – Present',
    title: 'Raman Spectrum-based Drug Classification Algorithm',
    short: 'Raman Drug Classification Algorithm',
    company: 'CSI Vision',
    role: 'Algorithm improvement',
    bullets: ['Improved an algorithm that classifies drugs from Raman spectra by replacing the preprocessing of the spectral data'],
    terms: ['Raman'],
    stack: ['Scikit-learn', 'MLOps'],
  },
  {
    id: 'xrf-libs',
    period: '2026.04 – 2026.09',
    title: 'XRF Foreign Material Analysis and LIBS Spectral Analysis Platforms',
    short: 'XRF & LIBS Analysis Platforms',
    company: 'CSI Vision',
    role: 'Platform development',
    bullets: [
      'XRF: developed a desktop application for reviewing foreign material analysis results',
      'Segmented particles in optical images with SAM 2 to measure particle size',
      'Extracted particle coordinates and imaging conditions from instrument screenshots with Tesseract OCR',
      'LIBS: developed a spectral data analysis tool (peak-based univariate analysis, multivariate regression)',
    ],
    terms: ['XRF', 'LIBS'],
    stack: ['Tauri', 'React', 'Python', 'SAM 2 (Hugging Face)', 'Tesseract (OCR)', 'OpenCV'],
  },
  {
    id: 'raman-plant-app',
    period: '2023.04 – 2024.02',
    title: 'Raman Spectroscopy-based Remote Plant Component Analysis App',
    short: 'Raman Plant Analysis App',
    company: 'Answeray',
    role: 'Mobile application development',
    bullets: ['Developed a React Native application for a Raman spectroscopy-based remote plant component analysis system'],
    terms: ['Raman'],
    stack: ['React Native'],
  },
]

export const projectAnchor = (id) => `project-${id}`

const TermLinks = ({ terms }) => (
  <DetailRow label="Terms">
    {terms.map((key, i) => (
      <span key={key}>
        {i > 0 && ' · '}
        <a
          href={TERMS[key].href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-700 hover:text-emerald-700 underline decoration-emerald-200 underline-offset-2 transition-colors"
        >
          {/* 약어(XRF)는 정식 명칭을 괄호로, Raman처럼 명칭에 이미 포함된 건 명칭만 */}
          {TERMS[key].name.startsWith(key) ? TERMS[key].name : `${key} (${TERMS[key].name})`}
          <i className="fas fa-arrow-up-right-from-square ml-1 text-[10px]" />
        </a>
      </span>
    ))}
  </DetailRow>
)

const ProjectItem = ({ id, period, title, company, role, bullets, terms, stack }) => (
  <TimelineItem id={projectAnchor(id)} period={period} title={title} org={company}>
    {role && <DetailRow label="Role">{role}</DetailRow>}
    {terms?.length > 0 && <TermLinks terms={terms} />}

    {bullets?.length > 0 && (
      <ul className="space-y-1.5 list-disc list-inside">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    )}

    {stack?.length > 0 && (
      <div className="flex flex-wrap gap-2 pt-1">
        {stack.map((t) => (
          <span key={t} className="px-2 py-0.5 text-xs font-semibold rounded-sm bg-emerald-100 text-emerald-800">
            {t}
          </span>
        ))}
      </div>
    )}
  </TimelineItem>
)

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="pb-4">
        <div className="space-y-4">
          {PROJECTS.map((p) => (
            <ProjectItem key={p.id} {...p} />
          ))}
        </div>
      </div>
    </Section>
  )
}
