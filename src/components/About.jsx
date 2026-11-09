import { profile, stats } from '../data.js'
import SectionHead from './SectionHead.jsx'
import { Arrow, Download } from './Icons.jsx'
import { scrollTo } from '../motion.js'

const statement =
  'I turn ambitious ideas into polished, high-performance apps for iOS and Android. Clean architecture under the hood, delightful experiences on the surface — and always shipped to the store.'

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <SectionHead
          index="01"
          label="About me"
          lines={['Engineer by craft,', <>designer <em>by heart.</em></>]}
          aside="Software Engineering graduate, Flutter specialist and the developer behind apps used by real people every day."
        />

        <div className="about-grid">
          <div className="portrait" data-cursor="hover">
            <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" width="1100" height="1100" />
            <div className="portrait-tag">
              <div>
                <b>{profile.name}</b>
                <small>{profile.location}</small>
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
              I'm a <strong>Software Engineering graduate from IUB</strong> with 2+ years of professional experience in
              Flutter and native Kotlin. Today I build public-sector software as a <strong>TMC developer at Arure
              Technologies</strong> — for the Sindh Social Protection Authority, in partnership with <strong>GIZ</strong> and
              SRSO — while shipping apps for international clients with Unique Solutions, UAE.
            </p>

            <div className="about-actions" data-reveal>
              <a className="btn btn-primary" href={profile.cv} download>
                Download CV <Download />
              </a>
              <a className="btn btn-ghost" href="#contact" onClick={(e) => (e.preventDefault(), scrollTo('#contact'))}>
                Let's talk <Arrow />
              </a>
            </div>

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
