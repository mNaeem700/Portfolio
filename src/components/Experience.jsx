import { experience, partners } from '../data.js'

// Real logos for companies/partners we have them for (see data.partners)
const findPartner = (name) => partners.find((p) => p.name === name || p.name.startsWith(name))
import SectionHead from './SectionHead.jsx'

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <SectionHead
          index="04"
          label="Experience"
          lines={['Where I’ve', <><em>built & shipped.</em></>]}
          aside="Two-plus years shipping production apps with product teams and international clients across Pakistan and the UAE."
        />

        <div className="timeline">
          {experience.map((job) => (
            <div className="job" key={job.company} data-reveal>
              <div>
                <div className="job-period">{job.period}</div>
                {job.current && <div className="job-now">Current</div>}
              </div>
              <div>
                <div className="job-company">
                  {findPartner(job.company) ? (
                    <img className="job-logo" src={findPartner(job.company).logo} alt="" width="36" height="36" loading="lazy" />
                  ) : (
                    <span className="job-logo job-logo-mono" aria-hidden="true">{job.company.split(' ').map((w) => w[0]).join('')}</span>
                  )}
                  {job.company}
                </div>
                <div className="job-role">{job.role}</div>
                <div className="job-place">{job.place}</div>
                {job.partners && (
                  <div className="job-partners">
                    {job.partners.map((name) => {
                      const p = findPartner(name)
                      return (
                        <a className="tool job-partner" key={name} href={p?.url} target="_blank" rel="noopener noreferrer" title={p?.full || name}>
                          {p && <img src={p.logo} alt="" width="18" height="18" loading="lazy" />}
                          {name}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
              <ul>
                {job.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
