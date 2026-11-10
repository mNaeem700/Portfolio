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

export default function Process() {
  return (
    <div className="flow">
      <div className="flow-head" data-reveal>
        <span className="eyebrow">How I work</span>
        <h3>
          From idea to <span className="gradient-text">App Store</span> — a complete, transparent process.
        </h3>
      </div>

      <div className="flow-steps">
        <div className="flow-rail" aria-hidden="true">
          <i className="flow-rail-fill" />
        </div>
        {process.map((p) => {
          const Visual = visuals[p.key]
          return (
            <article className={`flow-step flow-${p.key}`} key={p.step}>
              <div className="flow-dot" aria-hidden="true">
                <span>{p.step}</span>
              </div>
              <div className="flow-info">
                <div className="flow-meta">
                  <span className="flow-num">STEP {p.step}</span>
                  <span className="flow-time">{p.duration}</span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
                <ul className="flow-list">
                  {p.deliverables.map((d) => (
                    <li key={d}>
                      <Check />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flow-visual" aria-hidden="true">
                <Visual />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
