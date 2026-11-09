import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../data.js'

// Intro: logo mark + name reveal, slim progress line, then a two-layer curtain lifts away.
export default function Loader({ onDone }) {
  const root = useRef(null)
  const pct = useRef(null)

  useEffect(() => {
    let tl
    let cancelled = false
    const fontsReady = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 900))])

    fontsReady.then(() => {
      if (cancelled) return
      const q = gsap.utils.selector(root)
      const counter = { v: 0 }
      tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.set(q('.loader-center, .loader-foot'), { autoAlpha: 1 })
        .from(q('.loader-mark'), { scale: 0.6, autoAlpha: 0, rotate: -12, duration: 1.1 })
        .from(q('.loader-name span'), { yPercent: 110, duration: 1, stagger: 0.025 }, 0.15)
        .from(q('.loader-role'), { y: 12, autoAlpha: 0, duration: 0.9 }, 0.5)
        .from(q('.loader-foot'), { autoAlpha: 0, duration: 0.6 }, 0.3)
        .to(q('.loader-fill'), { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 0.3)
        .to(
          counter,
          {
            v: 100,
            duration: 1.2,
            ease: 'power2.inOut',
            onUpdate: () => pct.current && (pct.current.textContent = `${Math.round(counter.v)}%`),
          },
          0.3,
        )
        .to(q('.loader-center, .loader-foot'), { y: -24, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, '+=0.1')
        .to(q('.loader-panel'), { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.15')
        .to(q('.loader-curtain'), { yPercent: -100, duration: 1, ease: 'expo.inOut', onComplete: onDone }, '-=0.88')
    })

    return () => {
      cancelled = true
      tl?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-curtain" />
      <div className="loader-panel">
        <div className="loader-center">
          <div className="loader-mark">
            <span>MN</span>
          </div>
          <div className="loader-name">
            {profile.name.split('').map((c, i) => (
              <span key={i}>{c === ' ' ? ' ' : c}</span>
            ))}
          </div>
          <div className="loader-role">{profile.role}</div>
        </div>
        <div className="loader-foot">
          <div className="loader-track">
            <i className="loader-fill" />
          </div>
          <span className="loader-pct" ref={pct}>0%</span>
        </div>
      </div>
    </div>
  )
}
