import { Suspense, lazy, useMemo } from 'react'
import { partners, profile } from '../data.js'
import { Arrow, Bolt, Globe } from './Icons.jsx'
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
  const webgl = useMemo(() => hasWebGL() && window.innerWidth > 700 && !matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="container hero-main">
        <div className="hero-copy">
          <div className="status glass">
            <span className="status-dot" />
            <span>
              <b>Available</b> for freelance & remote roles
            </span>
          </div>

          <h1 className="hero-title">
            <span className="line-mask"><span>Production</span></span>
            <span className="line-mask"><span>mobile apps</span></span>
            <span className="line-mask"><span className="outline">that</span></span>
            <span className="line-mask"><span className="gradient-text">ship.</span></span>
          </h1>

          <p className="hero-intro">
            Hi, I'm <strong>{profile.name}</strong> — a <strong>{profile.role}</strong>. {profile.intro}
          </p>

          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary" onClick={(e) => (e.preventDefault(), scrollTo('#work'))}>
              See my work <Arrow />
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => (e.preventDefault(), scrollTo('#contact'))}>
              Start a project
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-inner">
            {webgl && (
              <Suspense fallback={null}>
                <HeroScene theme={theme} />
              </Suspense>
            )}
            {!webgl && <img className="hero-visual-fallback" src="/apps/shedrives-1.jpg" alt="" width="600" height="1298" />}
          </div>
          <div className="hero-card glass c1">
            <i><Bolt /></i>
            <div>
              <b>7+ apps</b>
              <span>live on App Store & Play</span>
            </div>
          </div>
          <div className="hero-card glass c2">
            <i><Globe /></i>
            <div>
              <b>10K+ downloads</b>
              <span>SheDrives on Google Play</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero-trust">
          <div className="hero-trust-label">
            Worked with &<br />delivered for
          </div>
          <ul>
            {partners.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
