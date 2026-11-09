import { experience } from '../data.js'
import Lines from './Lines.jsx'

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <span className="eyebrow">03 — Experience</span>
        <Lines className="section-title" lines={['Where I’ve', <><em>built & shipped.</em></>]} />

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
