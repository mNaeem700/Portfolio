import { useEffect, useState } from 'react'
import { Arrow, Menu, Moon, Sun } from './Icons.jsx'
import { scrollTo } from '../motion.js'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav({ theme, onToggleTheme }) {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 200)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(href)
  }

  return (
    <>
      <header className={`nav ${hidden && !open ? 'is-hidden' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="nav-logo" onClick={(e) => go(e, '#top')} aria-label="Home">
            MN<span>.</span>
          </a>
          <nav className="nav-pill nav-links" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
            <a href="#contact" className="btn btn-primary nav-cta" onClick={(e) => go(e, '#contact')}>
              Hire me <Arrow />
            </a>
            <button className="nav-menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              <Menu open={open} />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}
