import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { process, projects } from '../data.js'
import { Check } from './Icons.jsx'
import Logo, { logoName } from './Logo.jsx'
import './process.css'

gsap.registerPlugin(ScrollTrigger)

/* ---------------------------------------------------------------------------
   "How I work" — a sticky scroll-stack (a pattern used widely on studio and
   agency sites): each chapter is a large card that pins under the nav while
   the next one slides over it; earlier cards recede. The cards reuse the Work
   section's feature-card language, and every visual is built from real work:
   a real brief, real app screens, real Flutter code and the real live apps.
--------------------------------------------------------------------------- */

const byId = (id) => projects.find((p) => p.id === id)
const featured = projects.filter((p) => p.featured)

/* 01 — the brief for a real project */
function BriefVisual() {
  const p = byId('shedrives')
  return (
    <div className="sv sv-brief">
      <div className="doc">
        <div className="doc-bar">
          <i /><i /><i />
          <span>brief.md</span>
        </div>
        <div className="doc-head">
          <img src={p.icon} alt="" width="40" height="40" loading="lazy" />
          <div>
            <b>{p.title} — project brief</b>
            <small>{p.category}</small>
          </div>
        </div>
        <dl className="doc-rows">
          <div style={{ '--k': 0 }}>
            <dt>Problem</dt>
            <dd>Women need a ride option they can trust.</dd>
          </div>
          <div style={{ '--k': 1 }}>
            <dt>Users</dt>
            <dd>Female passengers &amp; verified female drivers</dd>
          </div>
          <div style={{ '--k': 2 }}>
            <dt>Platforms</dt>
            <dd>{p.platforms.join(' & ')}</dd>
          </div>
          <div style={{ '--k': 3 }}>
            <dt>Must-haves</dt>
            <dd className="doc-chips">
              {p.features.map((f) => <span key={f}>{f}</span>)}
            </dd>
          </div>
        </dl>
        <div className="doc-sign" style={{ '--k': 4 }}>
          <span><Check /> Scope agreed</span>
          <span><Check /> Timeline set</span>
          <span><Check /> Fixed quote</span>
        </div>
      </div>
    </div>
  )
}

/* 02 — real app screens on a Figma-style canvas */
function DesignVisual() {
  const p = byId('dapup')
  return (
    <div className="sv sv-design">
      <div className="canvas-label">
        <span className="figma-dot" /> {p.title} — UI · Figma
      </div>
      <div className="frames">
        {p.shots.map((s, k) => (
          <figure key={s} className={`frame f${k}`}>
            <figcaption>iPhone 15 — 0{k + 1}</figcaption>
            <img src={s} alt={`${p.title} screen ${k + 1}`} loading="lazy" decoding="async" width="600" height="1300" />
            {k === 1 && (
              <span className="select" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
            )}
          </figure>
        ))}
      </div>
      <span className="collab" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M4 3l7 17 2.5-7L21 10.5z" /></svg>
        <b>Naeem</b>
      </span>
    </div>
  )
}

/* 03 — real Flutter code (live ride tracking, as in SheDrives) */
const code = [
  [['k', 'class '], ['t', 'RideTracker '], ['k', 'extends '], ['t', 'StatelessWidget'], ['p', ' {']],
  [['p', '  '], ['k', 'const '], ['t', 'RideTracker'], ['p', '({'], ['k', 'super'], ['p', '.key, '], ['k', 'required this'], ['p', '.ride});']],
  [['p', '  '], ['k', 'final '], ['t', 'Ride '], ['p', 'ride;']],
  [['p', '']],
  [['p', '  '], ['a', '@override']],
  [['p', '  '], ['t', 'Widget '], ['f', 'build'], ['p', '('], ['t', 'BuildContext '], ['p', 'context) {']],
  [['p', '    '], ['k', 'return '], ['t', 'StreamBuilder'], ['p', '<'], ['t', 'LatLng'], ['p', '>(']],
  [['p', '      stream: ride.'], ['f', 'driverLocation'], ['p', ',']],
  [['p', '      builder: (context, snap) => '], ['t', 'GoogleMap'], ['p', '(']],
  [['p', '        markers: {'], ['t', 'Marker'], ['p', '(position: snap.data!)},']],
  [['p', '      ),']],
  [['p', '    );']],
  [['p', '  }']],
  [['p', '}']],
]

function CodeVisual() {
  return (
    <div className="sv sv-code">
      <div className="ide">
        <div className="ide-bar">
          <i /><i /><i />
          <span className="ide-tab">ride_tracker.dart</span>
          <span className="ide-path">lib/features/rides</span>
        </div>
        <pre className="ide-code">
          {code.map((line, n) => (
            <span className="ln" key={n} style={{ '--n': n }}>
              <em>{n + 1}</em>
              {line.map(([c, t], k) => (
                <span key={k} className={`c-${c}`}>{t}</span>
              ))}
              {'\n'}
            </span>
          ))}
        </pre>
        <div className="ide-term">
          <span><b>$</b> flutter build appbundle --release</span>
          <span className="ok">✓ Built build/app/outputs/bundle/release/app-release.aab</span>
        </div>
      </div>
    </div>
  )
}

/* 04 — the apps that actually shipped */
function LaunchVisual() {
  return (
    <div className="sv sv-launch">
      <div className="live-head">
        <span className="live-dot" /> Live on the stores
      </div>
      <div className="live-grid">
        {featured.map((p, k) => (
          <a
            key={p.id}
            className="live-app"
            style={{ '--c': p.color, '--k': k }}
            href={p.links.appStore || p.links.playStore}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={p.icon} alt="" width="48" height="48" loading="lazy" />
            <b>{p.title}</b>
            <small>{p.metric}</small>
            <span className="live-stores">
              {p.links.appStore && <Logo name="apple" size={15} />}
              {p.links.playStore && <Logo name="google-play" size={15} />}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

const visuals = { discover: BriefVisual, design: DesignVisual, build: CodeVisual, launch: LaunchVisual }
const colors = { discover: '#5b7cff', design: '#a855f7', build: '#14b8a6', launch: '#f0469b' }

export default function Process() {
  const list = useRef(null)

  // Earlier cards recede (scale + dim) as the next card slides over them.
  useEffect(() => {
    const el = list.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 961px)', () => {
      const cards = gsap.utils.toArray(el.querySelectorAll('.st-card'))
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card, {
          scale: 1 - (cards.length - 1 - i) * 0.035,
          '--dim': 1,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  // Each card's visual animates in when its card arrives.
  useEffect(() => {
    const el = list.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-in', e.isIntersecting)),
      { threshold: 0.35 },
    )
    el.querySelectorAll('.st-card').forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <div className="flow">
      <div className="flow-head" data-reveal>
        <span className="eyebrow">How I work</span>
        <h3>
          From idea to <span className="gradient-text">App Store</span> — four chapters, one owner.
        </h3>
        <p>The same path every one of my live apps has taken. No hand-offs between agencies, no black boxes.</p>
      </div>

      <div className="st-list" ref={list}>
        {process.map((p, i) => {
          const Visual = visuals[p.key]
          return (
            <article className="st-card" key={p.key} style={{ '--i': i, '--c': colors[p.key] }}>
              <div className="st-info">
                <div className="st-meta">
                  <span className="st-num">{p.step}</span>
                  <span className="st-of">/ {String(process.length).padStart(2, '0')}</span>
                  <span className="st-time">{p.duration}</span>
                </div>
                <h4 className="st-title">{p.title}</h4>
                <p className="st-text">{p.text}</p>
                <ul className="feature-list st-list-items">
                  {p.tasks.map((t) => (
                    <li key={t}><Check />{t}</li>
                  ))}
                </ul>
                <div className="st-foot">
                  <div className="st-out">
                    <small>You get</small>
                    <b>{p.output}</b>
                  </div>
                  {p.tools.length > 0 && (
                    <div className="st-tools">
                      {p.tools.map((t) => (
                        <span className="st-logo" key={t} title={logoName[t]} aria-label={logoName[t]} role="img">
                          <Logo name={t} size={18} />
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="st-visual">
                <Visual />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
