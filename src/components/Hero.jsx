import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { partners, profile, projects } from '../data.js'
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

const shot = (id) => projects.find((p) => p.id === id).shots[0]

// Lightweight CSS version of the 3D scene: shown instantly while WebGL loads,
// and permanently on phones, low-end devices and when WebGL is unavailable.
function StaticVisual({ hidden }) {
  return (
    <div className={`hero-static ${hidden ? 'is-hidden' : ''}`}>
      <div className="hero-static-blob" />
      <img className="hs-phone hs-left" src={shot('evoke')} alt="" width="600" height="1298" />
      <img className="hs-phone hs-right" src={shot('shedrives')} alt="" width="600" height="1067" />
      <img className="hs-phone hs-center" src={shot('dapup')} alt="" width="600" height="1300" fetchpriority="high" />
    </div>
  )
}

function canRun3D() {
  if (document.documentElement.classList.contains('lite')) return false
  if (window.innerWidth <= 900) return false
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return hasWebGL()
}

export default function Hero({ theme }) {
  const want3D = useMemo(canRun3D, [])
  const [load3D, setLoad3D] = useState(false)
  const [ready3D, setReady3D] = useState(false)
  const [failed3D, setFailed3D] = useState(false)

  // Defer the 3D bundle until the browser is idle, so text and buttons paint first.
  useEffect(() => {
    if (!want3D) return
    const go = () => setLoad3D(true)
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(go, { timeout: 1500 })
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(go, 600)
    return () => clearTimeout(t)
  }, [want3D])

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
            <StaticVisual hidden={ready3D && !failed3D} />
            {load3D && !failed3D && (
              <div className={`hero-3d ${ready3D ? 'is-ready' : ''}`}>
                <Suspense fallback={null}>
                  <HeroScene theme={theme} onReady={() => setReady3D(true)} onFail={() => setFailed3D(true)} />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero-trust">
          <div className="hero-trust-label">
            Worked with &<br />delivered for
          </div>
          <div className="partners">
            <ul className="partners-track">
              {[0, 1].map((copy) =>
                partners.map((p) => (
                  <li key={`${copy}-${p.name}`} aria-hidden={copy === 1 || undefined}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.full ? `${p.full} (${p.name})` : p.name}
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      <span className="partner-logo">
                        <img src={p.logo} alt="" width="36" height="36" decoding="async" />
                      </span>
                      {p.name}
                    </a>
                  </li>
                )),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
