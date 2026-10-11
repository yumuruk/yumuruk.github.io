import Section from '../components/Section.jsx'
import Panel from '../components/Panel.jsx'
import TimelineItem from '../components/TimelineItem.jsx'
import { PROJECTS, projectAnchor } from './Projects.jsx'

/**
 * 경력 항목. 필드는 전부 선택이고, period와 role만 있어도 렌더된다.
 * 프로젝트 상세는 Projects 섹션에 두고, 여기서는 company가 org와 같은
 * 프로젝트의 제목만 링크로 보여준다 (누르면 해당 프로젝트 카드로 이동).
 *
 * {
 *   period: '2024.03 – Present',        // 왼쪽 배지
 *   role:   'Research Intern',          // 직함
 *   org:    'Computational Imaging Lab, Dongguk University',
 *   location: 'Seoul, South Korea',     // 선택
 *   bullets: [                          // 선택 — 프로젝트로 묶이지 않는 한 일
 *     'Underwater image enhancement 연구',
 *   ],
 *   tags: ['PyTorch', 'OpenCV'],        // 선택
 * }
 */
export const EXPERIENCE = [
  {
    period: '2026.03 – Present',
    role: 'ML/DL Engineer',
    org: 'CSI Vision',
    location: 'Suwon, South Korea',
  },
  {
    period: '2023.04 – 2024.02',
    role: 'Student Researcher',
    org: 'Answeray',
    location: 'Gyeonggi-do, South Korea',
  },
]

const ProjectLinks = ({ projects }) => (
  <ul className="space-y-1.5">
    {projects.map((p) => (
      <li key={p.id}>
        <a
          href={`#${projectAnchor(p.id)}`}
          className="group flex items-baseline gap-2 text-slate-700 hover:text-emerald-700 transition-colors"
        >
          <i className="fas fa-arrow-right text-xs text-emerald-600 transition-transform group-hover:translate-x-0.5" />
          <span className="underline decoration-emerald-200 underline-offset-2">{p.title}</span>
          <span className="hidden sm:inline ml-auto shrink-0 pl-3 text-xs text-slate-500">{p.period}</span>
        </a>
      </li>
    ))}
  </ul>
)

const ExperienceItem = ({ period, role, org, location, bullets, tags }) => {
  const projects = PROJECTS.filter((p) => p.company === org)

  return (
    <TimelineItem badge={period} title={role} org={[org, location].filter(Boolean).join(' · ')} wide>
      {(projects.length > 0 || bullets?.length > 0 || tags?.length > 0) && (
        <>
          {projects.length > 0 && <ProjectLinks projects={projects} />}

          {bullets?.length > 0 && (
            <ul className="space-y-1.5 list-disc list-inside">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}

          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs font-semibold rounded-sm bg-emerald-100 text-emerald-800">
                  {t}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </TimelineItem>
  )
}

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="pb-4">
        {EXPERIENCE.length > 0 ? (
          <Panel>
            <div className="divide-y divide-emerald-100">
              {EXPERIENCE.map((e) => (
                <ExperienceItem key={`${e.period}-${e.role}`} {...e} />
              ))}
            </div>
          </Panel>
        ) : (
          <Panel bodyClassName="px-6 py-12 text-center text-slate-600">
            <p className="text-lg italic">Will be updated soon.</p>
          </Panel>
        )}
      </div>
    </Section>
  )
}
