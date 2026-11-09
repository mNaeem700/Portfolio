import { projects } from '../data.js'
import Lines from './Lines.jsx'
import { Apple, Play, PlayFill, Tv } from './Icons.jsx'

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

function TvArt() {
  return (
    <div className="tv-art">
      <div className="tv-screen">
        <div className="tv-row">
          <span className="tv-live">● Live</span>
          <span>Skylink TV · HD</span>
        </div>
        <div className="tv-play"><PlayFill /></div>
        <div>
          <div className="tv-progress" />
          <div className="tv-channels"><i /><i /><i /><i /></div>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work">
      <div className="container">
        <div className="work-head">
          <div>
            <span className="eyebrow">02 — Selected work</span>
            <Lines className="section-title" lines={['Apps live in', <><em>real hands.</em></>]} />
          </div>
          <p data-reveal>
            Every project below is published and available to download — built end-to-end, from architecture and UI to store
            release.
          </p>
        </div>

        <div className="projects">
          {projects.map((p, i) => {
            const primary = p.links.appStore || p.links.playStore
            return (
              <article className="project" key={p.id} style={{ '--c': p.color }}>
                <div className="project-info">
                  <div className="project-top">
                    {p.icon ? (
                      <img className="project-icon" src={p.icon} alt={`${p.title} app icon`} loading="lazy" />
                    ) : (
                      <div className="project-icon fallback"><Tv /></div>
                    )}
                    <div>
                      <div className="project-index">
                        {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {p.platforms.join(' & ')}
                      </div>
                      <div className="project-cat">{p.category}</div>
                    </div>
                  </div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  <div className="chips">
                    {p.features.map((f) => <span className="chip" key={f}>{f}</span>)}
                  </div>
                  <div className="chips">
                    {p.stack.map((s) => <span className="chip stack" key={s}>{s}</span>)}
                  </div>
                  <StoreButtons links={p.links} />
                </div>

                <a
                  className="project-visual"
                  href={primary}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  data-cursor-label="Open"
                  aria-label={`Open ${p.title} in the store`}
                >
                  {p.shots.length ? (
                    p.shots.map((s, k) => (
                      <div className="phone" key={s}>
                        <img src={s} alt={`${p.title} screenshot ${k + 1}`} loading="lazy" />
                      </div>
                    ))
                  ) : (
                    <TvArt />
                  )}
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
