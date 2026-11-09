import { profile } from '../data.js'
import Lines from './Lines.jsx'
import { Arrow, Download, GitHub, LinkedIn, Mail, WhatsApp } from './Icons.jsx'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-card" data-reveal>
          <div className="orb" aria-hidden="true" />
          <span className="eyebrow"><b>06</b> Contact</span>
          <Lines
            className="contact-title"
            lines={['Got an idea?', <><span className="gradient-text">Let’s build it.</span></>]}
          />
          <p className="contact-sub">
            New app, startup MVP or scaling an existing product — tell me about it. I usually reply within 24 hours.
          </p>

          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}?subject=Project%20inquiry`}>
              Start a project <Arrow />
            </a>
            <a className="btn btn-ghost" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsApp /> WhatsApp
            </a>
            <a className="btn btn-ghost" href={profile.cv} download>
              <Download /> CV
            </a>
          </div>

          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>

          <div className="socials">
            <a className="social" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a>
            <a className="social" href={profile.github} target="_blank" rel="noopener noreferrer"><GitHub /> GitHub</a>
            <a className="social" href={`mailto:${profile.email}`}><Mail /> Email</a>
          </div>
        </div>
      </div>
    </section>
  )
}
