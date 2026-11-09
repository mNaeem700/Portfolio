import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { scrollTo } from '../motion.js'

function useLocalTime() {
  const fmt = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30000)
    return () => clearInterval(id)
  }, [])
  return t
}

const nav = [
  ['#about', 'About'],
  ['#services', 'Services'],
  ['#work', 'Work'],
  ['#experience', 'Experience'],
  ['#contact', 'Contact'],
]

export default function Footer() {
  const time = useLocalTime()
  const go = (e, href) => (e.preventDefault(), scrollTo(href))
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="nav-logo" onClick={(e) => go(e, '#top')}>
              <span className="nav-logo-mark">MN</span>
              <span>{profile.name}</span>
            </a>
            <p>Flutter & software developer crafting mobile apps for startups, businesses and public-sector teams.</p>
          </div>
          <div>
            <h5>Navigate</h5>
            <ul>
              {nav.map(([h, l]) => (
                <li key={h}><a href={h} onClick={(e) => go(e, h)}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={profile.cv} download>Download CV</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href={`mailto:${profile.email}`}>Email me</a></li>
              <li><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></li>
              <li style={{ color: 'var(--muted)' }}>Lahore · {time} PKT</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <a href="#top" onClick={(e) => go(e, '#top')}>Back to top ↑</a>
        </div>
      </div>
      <div className="footer-big" aria-hidden="true">NAEEM</div>
    </footer>
  )
}
