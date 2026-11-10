import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { initMotion } from './motion.js'

// The assistant is not needed for first paint — load its code separately.
const Assistant = lazy(() => import('./components/Assistant.jsx'))

// Show the intro loader once per browser session ("?noloader" skips it for testing).
function shouldSkipLoader() {
  if (/[?&]noloader/.test(location.search)) return true
  try {
    return sessionStorage.getItem('intro-seen') === '1'
  } catch (e) {
    return false
  }
}

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark')
  const [ready, setReady] = useState(shouldSkipLoader)

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#08090d' : '#f5f4f0')
      try {
        localStorage.setItem('theme', next)
      } catch (e) {}
      return next
    })
  }, [])

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch (e) {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    return initMotion()
  }, [ready])

  return (
    <>
      {!ready && <Loader onDone={finishIntro} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {ready && (
        <Suspense fallback={null}>
          <Assistant />
        </Suspense>
      )}
    </>
  )
}
