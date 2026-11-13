import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import { Arrow, Download, Menu, Moon, Sun } from './Icons.jsx'
import { scrollTo } from '../motion.js'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav({ theme, onToggleTheme }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const bar = useRef(null)

  useEffect(() => {
    // Scroll work runs at most once per frame, and the page height is cached
    // (re-measured only when the document resizes) to avoid forced layouts while scrolling.
    let last = window.scrollY
    let max = 1
    let ticking = false
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }
    const update = () => {
      ticking = false
      const y = window.scrollY
      setHidden(y > last && y > 240)
      setScrolled(y > 40)
      last = y
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, y / max)})`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['#top', ...links.map((l) => l.href)].forEach((h) => {
      const el = document.querySelector(h)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // the open menu locks page scroll; release it now, not after React's effect runs,
    // otherwise the smooth scroll starts while the page is still locked and stalls
    document.body.style.overflow = ''
    scrollTo(href)
  }

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="nav-logo" onClick={(e) => go(e, '#top')}>
            <span className="nav-logo-mark">MN</span>
            <span>
              {profile.name}
              <small>Flutter & Software Developer</small>
            </span>
          </a>
          <nav className="nav-links glass" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-btn glass"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
            <a className="btn btn-ghost btn-sm glass" href={profile.cv} download>
              CV <Download />
            </a>
            <a href="#contact" className="btn btn-primary btn-sm" onClick={(e) => go(e, '#contact')}>
              Hire me <Arrow />
            </a>
            <button className="icon-btn glass nav-menu-btn" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
              <Menu open={open} />
            </button>
          </div>
        </div>
      </header>
      <nav id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
        <a className="btn btn-primary" href={profile.cv} download tabIndex={open ? 0 : -1}>
          Download CV <Download />
        </a>
      </nav>
    </>
  )
}
