import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { initMotion } from './motion.js'

function readTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(readTheme)
  // "?noloader" skips the intro (handy for screenshots / testing)
  const [ready, setReady] = useState(() => /[?&]noloader/.test(location.search))

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#07080c' : '#f4f3ef')
      try {
        localStorage.setItem('theme', next)
      } catch (e) {}
      return next
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    return initMotion()
  }, [ready])

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} ready={ready} />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
