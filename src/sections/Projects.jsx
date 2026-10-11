import Section from '../components/Section.jsx'
import Panel from '../components/Panel.jsx'
import TimelineItem, { DetailRow } from '../components/TimelineItem.jsx'

/**
 * 프로젝트 항목. 순서는 경력기술서의 프로젝트 순서를 따른다.
 * company가 EXPERIENCE의 org와 같으면 그 경력 카드에 이 프로젝트로 가는 링크가 붙는다.
 * 공개 사이트라 고객사명은 넣지 않는다.
 *
 * {
 *   id: 'ess',                          // 앵커 → #project-ess
 *   period: '2026.05 – Present',
 *   title: 'Web-based ESS Remote Monitoring',
 *   company: 'CSI Vision',
 *   role: 'Project lead',               // 선택
 *   bullets: ['...'],                   // 선택
 *   stack: ['React', 'Docker'],         // 선택
 * }
 */
export const PROJECTS = [
  {
    id: 'ess',
    period: '2026.05 – Present',
    title: 'Web-based ESS Remote Monitoring and Operation Profile Analysis',
    company: 'CSI Vision',
    role: 'Project lead (weekly meetings, web platform implementation, documentation)',
    bullets: [
      'Designed KPIs for analyzing ESS (energy storage system) operation',
      'Developed the web application for remote monitoring and operation profile analysis',
    ],
    stack: ['Spring Boot', 'React', 'Docker', 'AWS (EC2, S3)'],
  },
  {
    id: 'raman',
    period: '2026.03 – Present',
    title: 'Raman Spectrum-based Substance Identification Algorithm',
    company: 'CSI Vision',
    role: 'Algorithm improvement',
    bullets: ['Replaced the preprocessing of the existing spectral data, improving algorithm performance'],
    stack: ['Scikit-learn', 'MLOps'],
  },
  {
    id: 'xrf',
    period: '2026.04 – 2026.09',
    title: 'XRF Foreign Material Analysis Web Platform',
    company: 'CSI Vision',
    role: 'Web platform implementation',
    stack: ['Tauri', 'SAM (Hugging Face)', 'OpenCV', 'Tesseract (OCR)'],
  },
  {
    id: 'raman-plant-app',
    period: '2023.04 – 2024.02',
    title: 'Raman Spectroscopy-based Remote Plant Component Analysis App',
    company: 'Answeray',
    role: 'Mobile application development',
    bullets: ['Developed a React Native application for a Raman spectroscopy-based remote plant component analysis system'],
    stack: ['React Native'],
  },
]

export const projectAnchor = (id) => `project-${id}`

const ProjectItem = ({ id, period, title, company, role, bullets, stack }) => (
  <TimelineItem id={projectAnchor(id)} badge={period} title={title} org={company} wide>
    {role && <DetailRow label="Role">{role}</DetailRow>}

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
        <Panel>
          {PROJECTS.map((p) => (
            <ProjectItem key={p.id} {...p} />
          ))}
        </Panel>
      </div>
    </Section>
  )
}
