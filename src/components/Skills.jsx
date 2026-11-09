import { education, skills } from '../data.js'
import SectionHead from './SectionHead.jsx'

function track(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <SectionHead
          index="05"
          label="Toolkit"
          lines={['The stack behind', <><em>the magic.</em></>]}
          aside="Tools I use every day to design, build, test and ship reliable apps."
        />

        <div className="skills-grid">
          {skills.map((g, i) => (
            <div className="skill-card" key={g.title} onPointerMove={track} data-reveal data-delay={(i % 3) * 0.08}>
              <div className="skill-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{g.title}</h3>
              <div className="chips">
                {g.items.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="edu" data-reveal>
          <div>
            <span className="eyebrow">Education · {education.period}</span>
            <h3>{education.degree}</h3>
            <p>{education.school} — {education.grade}</p>
          </div>
          <ul>
            {education.extra.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
