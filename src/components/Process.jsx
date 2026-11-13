import { useEffect, useMemo, useRef, useState } from 'react'
import { process } from '../data.js'
import { Check } from './Icons.jsx'
import './process.css'

// Each step gets a small animated "scene". Animations run only while the step is in view
// (motion.js toggles .is-in), and every scene rests on a complete final frame for reduced motion.

function DiscoverVisual() {
  const nodes = [
    { label: 'Users', x: 18, y: 20 },
    { label: 'Goals', x: 82, y: 20 },
    { label: 'Scope', x: 18, y: 80 },
    { label: 'Budget', x: 82, y: 80 },
  ]
  return (
    <div className="pv pv-discover">
      <svg className="pv-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((n, i) => (
          <line key={n.label} x1="50" y1="50" x2={n.x} y2={n.y} pathLength="1" style={{ '--i': i }} />
        ))}
      </svg>
      <div className="pv-core">
        <span className="pv-pulse" />
        <b>Your idea</b>
      </div>
      {nodes.map((n, i) => (
        <span key={n.label} className="pv-node" style={{ left: `${8 + n.x * 0.54}%`, top: `${6 + n.y * 0.88}%`, '--i': i }}>
          {n.label}
        </span>
      ))}
      <div className="pv-brief">
        <small>Project brief</small>
        {['Problem defined', 'MVP features', 'Estimate ready'].map((t, i) => (
          <span key={t} style={{ '--i': i }}>
            <i><Check /></i>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function DesignVisual() {
  return (
    <div className="pv pv-design">
      <div className="pv-phone">
        <span className="wf wf-bar" style={{ '--i': 0 }} />
        <span className="wf wf-hero" style={{ '--i': 1 }} />
        <span className="wf wf-line" style={{ '--i': 2 }} />
        <span className="wf wf-line short" style={{ '--i': 3 }} />
        <div className="wf-row">
          <span className="wf wf-card" style={{ '--i': 4 }} />
          <span className="wf wf-card" style={{ '--i': 5 }} />
        </div>
        <span className="wf wf-btn" style={{ '--i': 6 }} />
      </div>
      <div className="pv-kit">
        <small>Design system</small>
        <div className="pv-swatches">
          <i style={{ '--sw': 'var(--accent)', '--i': 0 }} />
          <i style={{ '--sw': 'var(--accent-2)', '--i': 1 }} />
          <i style={{ '--sw': 'var(--accent-3)', '--i': 2 }} />
          <i style={{ '--sw': 'var(--text)', '--i': 3 }} />
        </div>
        <div className="pv-type">
          <b>Aa</b>
          <span>Syne · Inter</span>
        </div>
        <div className="pv-flow">
          <span>Login</span>
          <em />
          <span>Home</span>
          <em />
          <span>Detail</span>
        </div>
      </div>
      <svg className="pv-cursor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 3l7 17 2.5-7L21 10.5z" />
      </svg>
    </div>
  )
}

function BuildVisual() {
  const lines = [
    { w: 46, c: 'kw', indent: 0 },
    { w: 62, c: 'fn', indent: 1 },
    { w: 38, c: 'str', indent: 2 },
    { w: 54, c: 'tx', indent: 2 },
    { w: 30, c: 'kw', indent: 1 },
    { w: 48, c: 'fn', indent: 2 },
    { w: 20, c: 'tx', indent: 0 },
  ]
  return (
    <div className="pv pv-build">
      <div className="pv-editor">
        <div className="pv-editor-top">
          <i /><i /><i />
          <span>lib/main.dart</span>
        </div>
        <div className="pv-code">
          {lines.map((l, i) => (
            <div className="pv-code-line" key={i} style={{ '--i': i }}>
              <small>{i + 1}</small>
              <span className={`tok ${l.c}`} style={{ width: `${l.w}%`, marginLeft: `${l.indent * 16}px` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="pv-terminal">
        <div className="pv-term-line">
          <span className="prompt">$</span> flutter build --release
        </div>
        <div className="pv-progress"><i /></div>
        <div className="pv-term-ok">
          <i><Check /></i> 128 tests passed · build ready
        </div>
        <div className="pv-platforms">
          <span>iOS</span>
          <span>Android</span>
        </div>
      </div>
    </div>
  )
}

function LaunchVisual() {
  return (
    <div className="pv pv-launch">
      <div className="pv-ring">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className="track" cx="60" cy="60" r="52" />
          <circle className="bar" cx="60" cy="60" r="52" pathLength="1" />
        </svg>
        <div className="pv-app">
          <span className="pv-app-icon">N</span>
          <b>Your App</b>
          <small className="pv-live">● Live</small>
        </div>
      </div>
      <div className="pv-badge pv-store" style={{ '--i': 0 }}>
        <small>Published on</small>
        <b>App Store</b>
      </div>
      <div className="pv-badge pv-play" style={{ '--i': 1 }}>
        <small>Published on</small>
        <b>Google Play</b>
      </div>
      <div className="pv-badge pv-rating" style={{ '--i': 2 }}>
        <span className="stars">★★★★★</span>
        <b>4.9 rating</b>
      </div>
      <div className="pv-badge pv-dl" style={{ '--i': 3 }}>
        <svg viewBox="0 0 60 20" aria-hidden="true">
          <polyline points="0,18 10,15 20,16 30,10 40,11 50,5 60,2" pathLength="1" />
        </svg>
        <b>Downloads ↑</b>
      </div>
    </div>
  )
}

const visuals = { discover: DiscoverVisual, design: DesignVisual, build: BuildVisual, launch: LaunchVisual }

const STAGE_MS = 6500 // time each stage stays "in progress" while auto-playing
const HOLD_MS = 14000 // after a manual pick, wait this long before auto-play resumes
const HOLD_P = 0.78 // progress shown for a picked stage: every task done, output ready

const StageIcon = ({ k }) => {
  const p = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (k === 'discover') return <svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
  if (k === 'design') return <svg {...p}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></svg>
  if (k === 'build') return <svg {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>
  return <svg {...p}><path d="M12 15c-2-1-3-3-3-6 0-3 1.5-5.5 3-7 1.5 1.5 3 4 3 7 0 3-1 5-3 6z" /><path d="M9 13l-3 3 1 3 3-2M15 13l3 3-1 3-3-2" /></svg>
}

export default function Process() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [live, setLive] = useState(false) // pipeline on screen and animating
  const root = useRef(null)
  const engine = useRef({ elapsed: 0, holdUntil: 0, last: 0 })
  const activeRef = useRef(0)
  activeRef.current = active

  const reduce = useMemo(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  // Only run while the pipeline is on screen
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The "engine": one rAF loop writes progress straight into CSS variables and a few text
  // nodes (no React re-render per frame). React only re-renders when the stage changes.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const pctEls = () => el.querySelectorAll('[data-pct]')
    const paint = (p) => {
      const a = activeRef.current
      const overall = (a + p) / process.length
      el.style.setProperty('--p', p.toFixed(4))
      el.style.setProperty('--overall', overall.toFixed(4))
      // packet waits at the active station, then hands off to the next one in the last 20%
      const pos = Math.min(a + Math.max(0, (p - 0.8) / 0.2), process.length - 1)
      el.style.setProperty('--pos', (pos / (process.length - 1)).toFixed(4))
      const pct = Math.round(p * 100) + '%'
      pctEls().forEach((n) => (n.textContent = pct))
      // tasks tick off one by one, then the stage output is ready
      el.querySelectorAll('.pl-tasks li').forEach((li, k) => li.classList.toggle('is-done', p >= 0.12 + k * 0.16))
      el.querySelector('.pl-output')?.classList.toggle('is-ready', p >= 0.72)
      const ov = el.querySelector('[data-overall]')
      if (ov) ov.textContent = Math.round(overall * 100) + '%'
    }

    if (reduce || !live) {
      paint(reduce ? HOLD_P : Math.min(1, engine.current.elapsed / STAGE_MS))
      return
    }

    let raf = 0
    engine.current.last = performance.now()
    const tick = (now) => {
      const e = engine.current
      const dt = Math.min(64, now - e.last)
      e.last = now
      const holding = now < e.holdUntil
      if (playing && !holding && !document.hidden) {
        e.elapsed += dt
        if (e.elapsed >= STAGE_MS) {
          e.elapsed = 0
          setActive((x) => (x + 1) % process.length)
        }
      }
      paint(Math.min(1, e.elapsed / STAGE_MS))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [live, playing, reduce, active])

  const pick = (i) => {
    // show the stage fully worked through (all tasks done), before the hand-off
    engine.current.elapsed = STAGE_MS * HOLD_P
    engine.current.holdUntil = performance.now() + HOLD_MS
    setActive(i)
  }

  const stage = process[active]
  const Visual = visuals[stage.key]
  const state = (i) => (i < active ? 'done' : i === active ? 'active' : 'queued')

  return (
    <div className="flow">
      <div className="flow-head" data-reveal>
        <span className="eyebrow">How I work</span>
        <h3>
          From idea to <span className="gradient-text">App Store</span> — a complete, transparent process.
        </h3>
        <p>Watch a project move through the pipeline live, or pick a stage to see exactly what happens and what you receive.</p>
      </div>

      <div
        ref={root}
        className={`pl ${live && !reduce ? 'is-live' : ''} ${reduce ? 'is-static' : ''}`}
        style={{ '--count': process.length }}
        data-reveal
      >
        {/* live status bar */}
        <div className="pl-bar">
          <span className="pl-live">
            <i /> {playing && !reduce ? 'Live' : 'Paused'}
          </span>
          <span className="pl-bar-title">
            Project <b>“Your App”</b> · Stage {stage.step} / {String(process.length).padStart(2, '0')} · {stage.title}
          </span>
          <span className="pl-bar-overall">
            <span className="pl-overall-track"><i /></span>
            <b data-overall>0%</b>
          </span>
          {!reduce && (
            <button
              type="button"
              className="pl-toggle"
              onClick={() => {
                engine.current.holdUntil = 0
                setPlaying((p) => !p)
              }}
              aria-label={playing ? 'Pause the pipeline' : 'Play the pipeline'}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
              )}
            </button>
          )}
        </div>

        {/* 3D track */}
        <div className="pl-3d">
          <div className="pl-track">
            <div className="pl-floor" aria-hidden="true" />
            <div className="pl-wire" aria-hidden="true">
              <span className="pl-wire-flow" />
              <span className="pl-wire-fill" />
              <span className="pl-packet"><i /></span>
            </div>
            <div className="pl-stations" role="tablist" aria-label="Process stages">
              {process.map((p, i) => (
                <button
                  key={p.key}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`pl-station is-${state(i)}`}
                  onClick={() => pick(i)}
                >
                  <span className="pl-node">
                    <StageIcon k={p.key} />
                  </span>
                  <span className="pl-st-top">
                    <span className="pl-st-num">{p.step}</span>
                    <span className="pl-st-status">
                      {state(i) === 'done' && <>Done ✓</>}
                      {state(i) === 'active' && <>In progress · <span data-pct>0%</span></>}
                      {state(i) === 'queued' && <>Queued</>}
                    </span>
                  </span>
                  <span className="pl-st-title">{p.title}</span>
                  <span className="pl-st-short">{p.short}</span>
                  <span className="pl-st-progress"><i /></span>
                  <span className="pl-st-time">{p.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* monitor: what is happening in the active stage */}
        <div className="pl-monitor" role="tabpanel" aria-live="polite" key={stage.key}>
          <div className="pl-detail">
            <div className="pl-detail-top">
              <span className="pl-detail-step">Stage {stage.step}</span>
              <span className="pl-detail-time">{stage.duration}</span>
            </div>
            <h4>{stage.title}</h4>
            <p>{stage.text}</p>
            <ul className="pl-tasks">
              {stage.tasks.map((t, k) => (
                <li key={t} style={{ '--k': k }}>
                  <span className="pl-check"><Check /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="pl-output">
              <small>Output</small>
              <b>{stage.output}</b>
            </div>
          </div>
          <div className="pl-screen">
            <Visual />
          </div>
        </div>
      </div>
    </div>
  )
}
