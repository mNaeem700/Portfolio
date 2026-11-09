import { experience } from '../data.js'
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
                <div className="job-company">{job.company}</div>
                <div className="job-role">{job.role}</div>
                <div className="job-place">{job.place}</div>
                {job.partners && (
                  <div className="job-partners">
                    {job.partners.map((p) => <span className="tag" key={p}>{p}</span>)}
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
