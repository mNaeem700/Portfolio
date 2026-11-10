import { Fragment, useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import { expandChip, reply, welcome } from '../assistant/brain.js'
import { scrollTo } from '../motion.js'
import './assistant.css'

const STORE = 'assistant-chat'

function load() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE))
    if (Array.isArray(saved) && saved.length) return saved
  } catch (e) {}
  return [{ from: 'bot', ...welcome }]
}

// Tiny renderer: line breaks, "• " bullets and **bold** — no HTML injection.
function RichText({ text }) {
  return text.split('\n').map((line, i) => {
    const bullet = line.startsWith('• ')
    const parts = (bullet ? line.slice(2) : line).split(/\*\*(.+?)\*\*/g)
    const content = parts.map((p, k) => (k % 2 ? <strong key={k}>{p}</strong> : <Fragment key={k}>{p}</Fragment>))
    return bullet ? (
      <span className="ai-bullet" key={i}>{content}</span>
    ) : (
      <span className="ai-line" key={i}>{content}</span>
    )
  })
}

const Spark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
  </svg>
)
const Close = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
const Send = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const Reset = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </svg>
)

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState(load)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [nudge, setNudge] = useState(false)
  const list = useRef(null)
  const field = useRef(null)
  const fab = useRef(null)

  // Persist the conversation for this browser session
  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-40)))
    } catch (e) {}
  }, [msgs])

  // Keep the newest message in view
  useEffect(() => {
    const el = list.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs, busy, open])

  // A one-time hint bubble a few seconds after landing
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('assistant-nudged') === '1'
    } catch (e) {}
    if (seen) return
    const show = setTimeout(() => setNudge(true), 6000)
    const hide = setTimeout(() => setNudge(false), 16000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    setNudge(false)
    try {
      sessionStorage.setItem('assistant-nudged', '1')
    } catch (e) {}
    const t = setTimeout(() => field.current?.focus(), 250)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        fab.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  async function ask(raw) {
    const text = raw.trim()
    if (!text || busy) return
    setInput('')
    const history = [...msgs, { from: 'me', text }]
    setMsgs(history)
    setBusy(true)
    const started = Date.now()
    const answer = await reply(expandChip(text), history.map((m) => ({ role: m.from === 'me' ? 'user' : 'assistant', content: m.text })))
    // a short, natural "typing" pause
    const wait = Math.max(0, Math.min(1100, 350 + answer.text.length * 4) - (Date.now() - started))
    setTimeout(() => {
      setMsgs((m) => [...m, { from: 'bot', ...answer }])
      setBusy(false)
    }, wait)
  }

  function act(a) {
    if (a.scroll) {
      setOpen(false)
      scrollTo(a.scroll)
    }
  }

  const reset = () => setMsgs([{ from: 'bot', ...welcome }])
  const last = msgs[msgs.length - 1]

  return (
    <div className={`ai ${open ? 'is-open' : ''}`}>
      <section
        className="ai-panel"
        role="dialog"
        aria-modal="false"
        aria-label={`Chat with ${profile.name}'s AI assistant`}
        aria-hidden={!open}
        inert={!open}
      >
        <header className="ai-head">
          <div className="ai-avatar">
            <img src={profile.photo} alt="" width="40" height="40" />
            <i aria-hidden="true" />
          </div>
          <div className="ai-title">
            <b>Naeem's AI Assistant</b>
            <small>Trained on his portfolio · replies instantly</small>
          </div>
          <button className="ai-icon" onClick={reset} aria-label="Start a new conversation" title="New chat">
            <Reset />
          </button>
          <button className="ai-icon" onClick={() => setOpen(false)} aria-label="Close assistant">
            <Close />
          </button>
        </header>

        <div className="ai-list" ref={list} data-lenis-prevent aria-live="polite">
          {msgs.map((m, i) => (
            <div className={`ai-msg ${m.from}`} key={i}>
              <div className="ai-bubble">
                <RichText text={m.text} />
              </div>
              {m.actions?.length > 0 && (
                <div className="ai-actions">
                  {m.actions.map((a) =>
                    a.scroll ? (
                      <button key={a.label} className="ai-action" onClick={() => act(a)}>
                        {a.label} ↓
                      </button>
                    ) : (
                      <a
                        key={a.label}
                        className="ai-action"
                        href={a.href}
                        {...(a.download ? { download: true } : a.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        {a.label} ↗
                      </a>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
          {busy && (
            <div className="ai-msg bot">
              <div className="ai-bubble ai-typing" aria-label="Assistant is typing">
                <i /><i /><i />
              </div>
            </div>
          )}
        </div>

        {!busy && last?.from === 'bot' && last.chips?.length > 0 && (
          <div className="ai-chips" data-lenis-prevent>
            {last.chips.map((c) => (
              <button key={c} className="ai-chip" onClick={() => ask(c)}>
                {c}
              </button>
            ))}
          </div>
        )}

        <form
          className="ai-form"
          onSubmit={(e) => {
            e.preventDefault()
            ask(input)
          }}
        >
          <input
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about apps, skills, pricing…"
            aria-label="Your question"
            maxLength={300}
            autoComplete="off"
          />
          <button type="submit" className="ai-send" disabled={!input.trim() || busy} aria-label="Send">
            <Send />
          </button>
        </form>
      </section>

      {nudge && !open && (
        <button className="ai-nudge" onClick={() => setOpen(true)}>
          👋 Hi! Ask me anything about Naeem's work
        </button>
      )}

      <button
        ref={fab}
        className="ai-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
      >
        <span className="ai-fab-icon">{open ? <Close /> : <Spark />}</span>
      </button>
    </div>
  )
}
