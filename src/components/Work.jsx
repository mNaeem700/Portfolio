import { projects } from '../data.js'
import SectionHead from './SectionHead.jsx'
import { Apple, Arrow, Check, Play, PlayFill } from './Icons.jsx'

const featured = projects.filter((p) => p.featured)
const more = projects.filter((p) => !p.featured)

function AppIcon({ p }) {
  return p.icon ? (
    <img className="app-icon" src={p.icon} alt="" loading="lazy" width="56" height="56" />
  ) : (
    <div className="app-icon mono" aria-hidden="true">{p.title[0]}</div>
  )
}

function StoreButtons({ links }) {
  return (
    <div className="store-links">
      {links.appStore && (
        <a className="store-btn" href={links.appStore} target="_blank" rel="noopener noreferrer">
          <Apple />
          <span><small>Download on the</small><b>App Store</b></span>
        </a>
      )}
      {links.playStore && (
        <a className="store-btn" href={links.playStore} target="_blank" rel="noopener noreferrer">
          <Play />
          <span><small>Get it on</small><b>Google Play</b></span>
        </a>
      )}
    </div>
  )
}

function Feature({ p, i }) {
  const primary = p.links.appStore || p.links.playStore
  return (
    <article className="feature" style={{ '--c': p.color }}>
      <div className="feature-info">
        <div className="feature-meta">
          <AppIcon p={p} />
          <div>
            <div className="feature-index">
              {String(i + 1).padStart(2, '0')} — {p.platforms.join(' & ')}
            </div>
            <div className="feature-cat">{p.category}</div>
          </div>
        </div>
        <h3 className="feature-title">{p.title}</h3>
        {p.metric && <div className="feature-metric">{p.metric}</div>}
        <p className="feature-desc">{p.description}</p>
        {p.role && <p className="feature-role"><strong>My role:</strong> {p.role}</p>}
        <ul className="feature-list">
          {p.features.map((f) => (
            <li key={f}><Check />{f}</li>
          ))}
        </ul>
        <div className="feature-stack">{p.stack.join('  /  ')}</div>
        <StoreButtons links={p.links} />
      </div>

      <a
        className="feature-visual"
        href={primary}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        data-cursor-label="Open"
        aria-label={`Open ${p.title} in the store`}
      >
        {p.shots.map((s, k) => (
          <div className="shot" key={s}>
            <img src={s} alt={`${p.title} screenshot ${k + 1}`} loading="lazy" decoding="async" width="600" height="1298" />
          </div>
        ))}
      </a>
    </article>
  )
}

function Art({ type }) {
  if (type === 'finance')
    return (
      <div className="art" aria-hidden="true">
        <span className="art-label">This month</span>
        <span className="art-big">Budget</span>
        <div className="art-bars">
          {[40, 65, 35, 80, 55, 92, 60].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
        </div>
        <div className="art-row"><span>Food</span><span>32%</span></div>
        <div className="art-row"><span>Bills</span><span>24%</span></div>
      </div>
    )
  if (type === 'chat')
    return (
      <div className="art" aria-hidden="true">
        <span className="art-label">Messages</span>
        <div className="bubble them">Hey! Are we still on for today?</div>
        <div className="bubble me">Yes — see you at 5 👋</div>
        <div className="bubble them">Perfect, sharing location</div>
        <div className="typing"><i /><i /><i /></div>
      </div>
    )
  return (
    <div className="art tv" aria-hidden="true">
      <span className="live">● LIVE</span>
      <div className="art-play"><PlayFill /></div>
    </div>
  )
}

function AppCard({ p }) {
  return (
    <article className="app-card" style={{ '--c': p.color }} data-reveal>
      <div className="app-cover">
        {p.cover ?         <img src={p.cover} alt={`${p.title} screenshot`} loading="lazy" decoding="async" width="800" height="640" /> : <Art type={p.art} />}
      </div>
      <div className="app-body">
        <div className="app-row">
          <AppIcon p={p} />
          <div>
            <h4>{p.title}</h4>
            <small>{p.category} · {p.platforms.join(' & ')}</small>
          </div>
        </div>
        <p>{p.description}</p>
        <div className="app-links">
          {p.links.appStore && (
            <a href={p.links.appStore} target="_blank" rel="noopener noreferrer">App Store <Arrow /></a>
          )}
          {p.links.playStore && (
            <a href={p.links.playStore} target="_blank" rel="noopener noreferrer">Google Play <Arrow /></a>
          )}
          {!p.links.appStore && !p.links.playStore && <span className="muted">Previously on Google Play</span>}
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work">
      <div className="container">
        <SectionHead
          index="03"
          label="Selected work"
          lines={['Apps live in', <><em>real hands.</em></>]}
          aside="Every featured project is published and downloadable — built end-to-end, from architecture and UI to store release."
        />

        <div className="features">
          {featured.map((p, i) => <Feature p={p} i={i} key={p.id} />)}
        </div>

        <div className="more-head">
          <h3>More shipped apps</h3>
          <span>AI, personal finance and messaging — all live on the stores</span>
        </div>
        <div className="apps-grid">
          {more.map((p) => <AppCard p={p} key={p.id} />)}
        </div>
      </div>
    </section>
  )
}
