import { useState } from 'react'
import { profile } from '../data.js'
import Lines from './Lines.jsx'
import { Arrow, Download, GitHub, LinkedIn, Mail, WhatsApp } from './Icons.jsx'

const projectTypes = ['Mobile app', 'MVP / Startup', 'AI feature', 'UI/UX redesign', 'Maintenance', 'Other']
const budgets = ['Under $2k', '$2k – $5k', '$5k – $10k', '$10k+', 'Not sure yet']
const timelines = ['As soon as possible', 'Within 1 month', '1 – 3 months', '3+ months', 'Flexible']
const MAX_BRIEF = 1000

const nextSteps = [
  { title: 'Reply within 24 hours', text: 'A personal response with my first questions and thoughts.' },
  { title: 'Free 30-min discovery call', text: 'We walk through your goals, users and must-have features.' },
  { title: 'Clear plan & estimate', text: 'Scope, timeline and a fixed quote — no surprises later.' },
]

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

function ChipGroup({ label, name, options, value, onChange, optional }) {
  return (
    <fieldset className="field">
      <legend className="field-label">
        {label} {optional && <span className="field-optional">Optional</span>}
      </legend>
      <div className="chip-group">
        {options.map((opt) => (
          <label key={opt} className={`choice ${value === opt ? 'is-on' : ''}`}>
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(name, opt)} />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    project_type: projectTypes[0],
    budget: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', text: '' })

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
    if (status.type === 'error') setStatus({ type: '', text: '' })
  }
  const onField = (e) => set(e.target.name, e.target.value)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell me your name.'
    if (!form.email.trim()) e.email = 'I need an email to reply to you.'
    else if (!emailOk(form.email.trim())) e.email = 'That email doesn’t look quite right.'
    if (form.message.trim().length < 20) e.message = 'A couple of sentences helps me reply properly (20+ characters).'
    return e
  }

  const submit = (event) => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      event.preventDefault()
      setStatus({ type: 'error', text: 'Please check the highlighted fields.' })
      event.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus()
      return
    }
    setStatus({ type: 'sending', text: 'Sending your inquiry…' })
    // native POST continues to FormSubmit, which redirects back to this section
  }

  const sent = typeof location !== 'undefined' && /[?&]sent=1/.test(location.search)

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-card" data-reveal>
          <div className="orb" aria-hidden="true" />

          <div className="contact-intro">
            <span className="eyebrow"><b>06</b> Contact</span>
            <Lines className="contact-title" lines={['Got an idea?', <><span className="gradient-text">Let’s build it.</span></>]} />
            <p className="contact-sub">
              Whether it’s a new app, a startup MVP or scaling a product that’s already live — tell me where you’re headed
              and I’ll help you get there.
            </p>

            <ol className="contact-steps">
              {nextSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="contact-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <b>{s.title}</b>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="contact-direct">
              <span className="contact-direct-label">Prefer to reach out directly?</span>
              <a className="contact-line" href={`mailto:${profile.email}`}>
                <i><Mail /></i>
                <span><small>Email</small>{profile.email}</span>
              </a>
              <a className="contact-line" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
                <i><WhatsApp /></i>
                <span><small>WhatsApp</small>{profile.phone}</span>
              </a>
              <div className="socials">
                <a className="social" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /> LinkedIn</a>
                <a className="social" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub /> GitHub</a>
                <a className="social" href={profile.cv} download><Download /> CV</a>
              </div>
            </div>
          </div>

          <form
            id="inquiry"
            className="contact-form"
            action={`https://formsubmit.co/${profile.email}`}
            method="POST"
            onSubmit={submit}
            noValidate
          >
            <input type="hidden" name="_subject" value={`New inquiry: ${form.project_type} — ${form.name.trim() || 'Portfolio visitor'}`} />
            <input type="hidden" name="_replyto" value={form.email} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://mnaeem700.github.io/Portfolio/?sent=1#inquiry" />
            {/* spam trap: real people never see or fill this */}
            <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <header className="form-head">
              <div className="form-head-top">
                <span className="form-kicker">Project inquiry</span>
                <span className="form-badge"><i /> Replies within 24h</span>
              </div>
              <h3>Tell me about your project</h3>
              <p>A few details are all I need. You’ll get a personal reply with next steps — never an automated sales email.</p>
            </header>

            {sent && (
              <div className="form-alert is-success" role="status">
                <b>Thank you — your inquiry is on its way.</b>
                <span>I’ll reply to your email within 24 hours.</span>
              </div>
            )}

            <div className="form-grid">
              <label className={`field ${errors.name ? 'has-error' : ''}`}>
                <span className="field-label">Full name</span>
                <input name="name" value={form.name} onChange={onField} placeholder="Jane Smith" autoComplete="name" aria-invalid={!!errors.name} required />
                {errors.name && <small className="field-error">{errors.name}</small>}
              </label>
              <label className={`field ${errors.email ? 'has-error' : ''}`}>
                <span className="field-label">Work email</span>
                <input name="email" type="email" value={form.email} onChange={onField} placeholder="jane@company.com" autoComplete="email" aria-invalid={!!errors.email} required />
                {errors.email && <small className="field-error">{errors.email}</small>}
              </label>
            </div>

            <label className="field">
              <span className="field-label">Company or project name <span className="field-optional">Optional</span></span>
              <input name="company" value={form.company} onChange={onField} placeholder="Acme Inc." autoComplete="organization" />
            </label>

            <ChipGroup label="What do you need?" name="project_type" options={projectTypes} value={form.project_type} onChange={set} />
            <ChipGroup label="Estimated budget" name="budget" options={budgets} value={form.budget} onChange={set} optional />

            <label className="field">
              <span className="field-label">Ideal timeline <span className="field-optional">Optional</span></span>
              <span className="select">
                <select name="timeline" value={form.timeline} onChange={onField} className={form.timeline ? '' : 'is-empty'}>
                  <option value="">Select a timeline</option>
                  {timelines.map((t) => <option key={t}>{t}</option>)}
                </select>
              </span>
            </label>

            <label className={`field ${errors.message ? 'has-error' : ''}`}>
              <span className="field-label">
                Project brief
                <span className="field-count">{form.message.length}/{MAX_BRIEF}</span>
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={onField}
                maxLength={MAX_BRIEF}
                rows="5"
                placeholder="What are you building, who is it for, and what would make it a success? Links to designs or similar apps are welcome."
                aria-invalid={!!errors.message}
                required
              />
              {errors.message && <small className="field-error">{errors.message}</small>}
            </label>

            {status.text && (
              <div className={`form-alert is-${status.type}`} role="status" aria-live="polite">
                <span>{status.text}</span>
              </div>
            )}

            <div className="form-footer">
              <p className="form-privacy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                Your details are only used to reply to this inquiry.
              </p>
              <button className="btn btn-primary" type="submit" disabled={status.type === 'sending'}>
                {status.type === 'sending' ? 'Sending…' : 'Send inquiry'} <Arrow />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
