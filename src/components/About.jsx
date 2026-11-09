import { profile, stats } from '../data.js'
import Lines from './Lines.jsx'

const statement =
  'I turn ambitious ideas into polished, high-performance apps for iOS and Android. Clean architecture under the hood, delightful experiences on the surface — and always shipped to the store.'

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <span className="eyebrow">01 — About me</span>
        <Lines className="section-title" lines={['Engineer by craft,', <>designer <em>by heart.</em></>]} />

        <div className="about-grid">
          <div className="portrait" data-cursor="hover">
            <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" />
            <div className="portrait-tag">
              <div>
                <b>{profile.name}</b>
                <small>{profile.role}</small>
              </div>
              <div className="portrait-badge" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <defs>
                    <path id="circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                  </defs>
                  <text fontSize="9" fill="#fff" letterSpacing="1.4" fontFamily="JetBrains Mono, monospace">
                    <textPath href="#circle">OPEN TO WORK • OPEN TO WORK •</textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <p className="about-text">
              {statement.split(' ').map((w, i) => (
                <span className="word" key={i}>{w}</span>
              ))}
            </p>
            <p className="about-sub" data-reveal>
              I'm a Software Engineering graduate from IUB (CGPA 3.82) with 2+ years of professional experience. I work in Flutter
              and native Kotlin, and I'm comfortable across the stack — Firebase, Supabase, Node.js, REST and GraphQL — plus AI
              integrations with OpenAI, Gemini and Claude. Today I build for clients in the UAE and lead app development at Arure
              Technologies.
            </p>

            <div className="stats" data-reveal>
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-num">
                    <span data-count={s.value} data-decimals={s.decimals || 0}>
                      {s.decimals ? s.value.toFixed(s.decimals) : s.value}
                    </span>
                    <span className="gradient-text">{s.suffix}</span>
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
