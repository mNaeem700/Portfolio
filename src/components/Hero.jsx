import { Suspense, lazy, useMemo } from 'react'
import { profile } from '../data.js'
import { Arrow } from './Icons.jsx'
import { scrollTo } from '../motion.js'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch (e) {
    return false
  }
}

export default function Hero({ theme }) {
  const webgl = useMemo(hasWebGL, [])

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="hero-canvas" aria-hidden="true">
        {webgl && (
          <Suspense fallback={null}>
            <HeroScene theme={theme} />
          </Suspense>
        )}
      </div>

      <div className="container hero-inner">
        <div className="status">
          <span className="status-dot" />
          Available for freelance & remote roles
        </div>

        <h1 className="hero-title">
          <span className="line-mask"><span>Mobile</span></span>
          <span className="line-mask"><span>apps</span></span>
          <span className="line-mask"><span className="outline">people</span></span>
          <span className="line-mask"><span className="gradient-text">love</span></span>
          <span className="line-mask"><span>to</span></span>
          <span className="line-mask"><span>use.</span></span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-intro">
            Hi, I'm <strong>{profile.name}</strong> — a <strong>{profile.role}</strong>. {profile.intro}
          </p>
          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary" onClick={(e) => (e.preventDefault(), scrollTo('#work'))}>
              View my work <Arrow />
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              Let's talk
            </a>
          </div>
        </div>

        <div className="hero-meta">
          <span>{profile.location}</span>
          <span className="hide-sm">Flutter · Kotlin · iOS · Android</span>
          <span className="scroll-hint">
            Scroll <i />
          </span>
        </div>
      </div>
    </section>
  )
}
