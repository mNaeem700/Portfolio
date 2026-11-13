import { useEffect, useRef } from 'react'
import {
  siAndroid,
  siAppstore,
  siClaude,
  siDart,
  siDjango,
  siExpress,
  siFigma,
  siFirebase,
  siFlutter,
  siGithubactions,
  siGitlab,
  siGooglecloud,
  siGooglegemini,
  siGooglemaps,
  siGoogleplay,
  siGraphql,
  siIos,
  siKotlin,
  siMaterialdesign,
  siNodedotjs,
  siOpenai,
  siPostgresql,
  siPostman,
  siSupabase,
  siSwift,
} from './brandIcons.js'
import { education, stats } from '../data.js'
import SectionHead from './SectionHead.jsx'
import './skills.css'

/* Brand marks come from Simple Icons (CC0). Very dark brand colours are swapped
   for the theme's text colour so they stay visible on the dark theme. */
function Brand({ icon, size = 18, color }) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(icon.hex.slice(i, i + 2), 16))
  const dark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 70 // perceived luminance
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={{ '--brand': color || (dark ? 'var(--text)' : `#${icon.hex}`) }} className="brand">
      <path d={icon.path} />
    </svg>
  )
}
const Mono = ({ t }) => <span className="mono-mark" aria-hidden="true">{t}</span>

const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Tool({ name, icon, mark }) {
  return (
    <span className="tool">
      {icon ? <Brand icon={icon} size={16} /> : <Mono t={mark || name[0]} />}
      {name}
    </span>
  )
}

const orbit = [
  { name: 'Kotlin', icon: siKotlin },
  { name: 'Swift', icon: siSwift },
  { name: 'Android SDK', icon: siAndroid },
  { name: 'iOS', icon: siIos },
  { name: 'Material & Cupertino', icon: siMaterialdesign },
]

const backend = [
  { name: 'Firebase', icon: siFirebase },
  { name: 'Supabase', icon: siSupabase },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Express', icon: siExpress },
  { name: 'Django', icon: siDjango },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'GraphQL', icon: siGraphql },
  { name: 'REST APIs', mark: '{}' },
  { name: 'Google Cloud', icon: siGooglecloud },
  { name: 'AWS', mark: 'aws' },
]

const ai = [
  { name: 'OpenAI', icon: siOpenai },
  { name: 'Gemini', icon: siGooglegemini },
  { name: 'Claude API', icon: siClaude },
  { name: 'Google Maps SDK', icon: siGooglemaps },
  { name: 'Prompt Engineering', mark: '>_' },
  { name: 'Computer Vision', mark: '◎' },
  { name: 'Payments', mark: '$' },
  { name: 'Push Notifications', mark: '●' },
]

const delivery = [
  { name: 'GitHub Actions', icon: siGithubactions },
  { name: 'GitLab CI/CD', icon: siGitlab },
  { name: 'App Store Connect', icon: siAppstore },
  { name: 'Play Console', icon: siGoogleplay },
  { name: 'Figma', icon: siFigma },
  { name: 'Postman', icon: siPostman },
  { name: 'Unit / Widget / Integration Tests', mark: '✓' },
]

// Clean Architecture, drawn as the layers it actually describes
const layers = [
  { name: 'Presentation', items: ['Bloc', 'Provider', 'GetX', 'MVVM'] },
  { name: 'Domain', items: ['Use cases', 'SOLID', 'Dependency Injection'] },
  { name: 'Data', items: ['Repository Pattern', 'APIs & local DB'] },
]

const awards = [
  {
    title: 'IEEE Seminar Presenter',
    year: '2024',
    icon: <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />,
  },
  {
    title: 'Game Development Diploma · GTTI',
    year: '2024',
    icon: <path d="M6 8h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-2a4 4 0 0 1 4-4zM8 10v3M6.5 11.5h3M16 11h.01M18 13h.01" />,
  },
  {
    title: 'Class Topper · ICS',
    year: '2021',
    icon: <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6" />,
  },
]

export default function Skills() {
  const root = useRef(null)
  const years = stats.find((s) => /Years/.test(s.label))
  const apps = stats.find((s) => /Apps live/.test(s.label))
  const cgpa = 3.82

  // Light the CGPA ring and orbit when they come into view
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-in', e.isIntersecting)),
      { threshold: 0.3 },
    )
    el.querySelectorAll('.tk-core, .tk-edu').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section id="skills">
      <div className="container" ref={root}>
        <SectionHead
          index="05"
          label="Toolkit"
          lines={['The stack behind', <><em>the magic.</em></>]}
          aside="Tools I use every day to design, build, test and ship reliable apps."
        />

        <div className="tk-grid">
          {/* Core stack */}
          <article className="tk-card tk-core" onPointerMove={track} data-reveal>
            <div className="tk-head">
              <span className="tk-num">01</span>
              <span className="tk-kicker">Core stack · Mobile</span>
            </div>
            <div className="tk-orbit" aria-hidden="true">
              <div className="tk-ring r1" />
              <div className="tk-ring r2" />
              <div className="tk-orbiters">
                {orbit.map((o, i) => (
                  <span key={o.name} className="tk-orbiter" style={{ '--a': `${(360 / orbit.length) * i}deg` }}>
                    <span><Brand icon={o.icon} size={20} /></span>
                  </span>
                ))}
              </div>
              <div className="tk-center">
                <span className="tk-big"><Brand icon={siFlutter} size={40} color="#54c5f8" /></span>
                <span className="tk-big"><Brand icon={siDart} size={34} color="#40c4ff" /></span>
              </div>
            </div>
            <h3>Flutter &amp; Dart</h3>
            <p>One codebase, native-feeling apps on iOS and Android — with Kotlin and Swift when a feature needs to go native.</p>
            <div className="tk-stats">
              <span><b>{years.value}{years.suffix}</b> years in production</span>
              <span><b>{apps.value}{apps.suffix}</b> apps on the stores</span>
            </div>
            <div className="tk-tools">
              {orbit.map((o) => <Tool key={o.name} {...o} />)}
            </div>
          </article>

          {/* Backend */}
          <article className="tk-card tk-backend" onPointerMove={track} data-reveal>
            <div className="tk-head">
              <span className="tk-num">02</span>
              <span className="tk-kicker">Backend &amp; Cloud</span>
            </div>
            <h3>Backends that scale quietly</h3>
            <p>Auth, data, storage and push — secure, fast and ready for real users.</p>
            <div className="tk-tools">
              {backend.map((t) => <Tool key={t.name} {...t} />)}
            </div>
          </article>

          {/* AI */}
          <article className="tk-card tk-ai" onPointerMove={track} data-reveal>
            <div className="tk-head">
              <span className="tk-num">03</span>
              <span className="tk-kicker">AI &amp; Integrations</span>
            </div>
            <h3>AI and real-world features</h3>
            <p>LLMs, vision, maps and payments wired into products people use every day.</p>
            <div className="tk-tools">
              {ai.map((t) => <Tool key={t.name} {...t} />)}
            </div>
          </article>

          {/* Architecture */}
          <article className="tk-card tk-arch" onPointerMove={track} data-reveal>
            <div className="tk-head">
              <span className="tk-num">04</span>
              <span className="tk-kicker">Architecture</span>
            </div>
            <h3>Clean Architecture</h3>
            <p>Codebases that stay easy to change as features grow.</p>
            <div className="tk-layers">
              {layers.map((l, i) => (
                <div className="tk-layer" key={l.name} style={{ '--l': i }}>
                  <span className="tk-layer-name">{l.name}</span>
                  <span className="tk-layer-items">
                    {l.items.map((it) => <em key={it}>{it}</em>)}
                  </span>
                </div>
              ))}
            </div>
          </article>

          {/* Delivery */}
          <article className="tk-card tk-delivery" onPointerMove={track} data-reveal>
            <div className="tk-head">
              <span className="tk-num">05</span>
              <span className="tk-kicker">Quality &amp; Delivery</span>
            </div>
            <h3>Tested, automated, shipped</h3>
            <p>CI/CD pipelines, automated tests and store releases handled end to end.</p>
            <div className="tk-tools">
              {delivery.map((t) => <Tool key={t.name} {...t} />)}
            </div>
          </article>
        </div>

        {/* Education */}
        <article className="tk-edu" data-reveal>
          <div className="tk-edu-main">
            <span className="tk-crest" aria-hidden="true">IUB</span>
            <div>
              <span className="eyebrow">Education · {education.period}</span>
              <h3>{education.degree}</h3>
              <p>{education.school}</p>
            </div>
          </div>
          <div className="tk-gpa">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <linearGradient id="tk-gpa-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
                  <stop offset="1" style={{ stopColor: 'var(--accent-3)' }} />
                </linearGradient>
              </defs>
              <circle className="tk-gpa-track" cx="60" cy="60" r="52" />
              <circle className="tk-gpa-bar" cx="60" cy="60" r="52" pathLength="100" style={{ '--v': (cgpa / 4) * 100 }} />
            </svg>
            <div className="tk-gpa-val">
              <b>{cgpa.toFixed(2)}</b>
              <small>/ 4.00 CGPA</small>
            </div>
            <span className="tk-badge">First Class</span>
          </div>
          <ul className="tk-awards">
            {awards.map((a) => (
              <li key={a.title}>
                <span className="tk-award-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {a.icon}
                  </svg>
                </span>
                <span className="tk-award-text">
                  <b>{a.title}</b>
                  <small>{a.year}</small>
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
