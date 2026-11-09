import { process, services } from '../data.js'
import SectionHead from './SectionHead.jsx'
import { ServiceIcons } from './Icons.jsx'

function track(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <SectionHead
          index="02"
          label="Services"
          lines={['What I can', <><em>build for you.</em></>]}
          aside="From the first sketch to the App Store — one developer who owns the whole journey, so nothing gets lost between teams."
        />

        <div className="services-grid">
          {services.map((s, i) => {
            const Icon = ServiceIcons[i]
            return (
              <article className="service" key={s.title} onPointerMove={track} data-reveal data-delay={(i % 3) * 0.08}>
                <div className="service-top">
                  <div className="service-icon"><Icon /></div>
                  <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="service-tags">
                  {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </article>
            )
          })}
        </div>

        <div className="process">
          {process.map((p, i) => (
            <div className="step" key={p.step} data-reveal data-delay={i * 0.08}>
              <div className="step-num">STEP {p.step}</div>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
