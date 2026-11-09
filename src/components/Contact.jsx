import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data.js'
import Lines from './Lines.jsx'
import { GitHub, LinkedIn, Mail, WhatsApp } from './Icons.jsx'

function Magnet({ href, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (matchMedia('(hover: none)').matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
    }
    const leave = () => (xTo(0), yTo(0))
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])
  return (
    <a ref={ref} href={href} className="magnet">
      {children}
    </a>
  )
}

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="orb" aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <span className="eyebrow">05 — Contact</span>
        <Lines className="contact-title" lines={['Got an idea?', <><span className="gradient-text">Let’s build it.</span></>]} />
        <p className="contact-sub" data-reveal>
          Whether it's a new app, an MVP for your startup or scaling an existing product — I'd love to hear about it. I usually
          reply within 24 hours.
        </p>

        <div className="magnet-wrap" data-reveal>
          <Magnet href={`mailto:${profile.email}`}>
            Start a<br />project
          </Magnet>
        </div>

        <a className="contact-email" href={`mailto:${profile.email}`} data-reveal>
          {profile.email}
        </a>

        <div className="socials" data-reveal>
          <a className="social" href={profile.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp /> WhatsApp</a>
          <a className="social" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a>
          <a className="social" href={profile.github} target="_blank" rel="noopener noreferrer"><GitHub /> GitHub</a>
          <a className="social" href={`mailto:${profile.email}`}><Mail /> Email</a>
        </div>
      </div>
    </section>
  )
}
