import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { scrollTo } from '../motion.js'

function useLocalTime() {
  const fmt = () =>
    new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30000)
    return () => clearInterval(id)
  }, [])
  return t
}

export default function Footer() {
  const time = useLocalTime()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}. Designed & built with care.</span>
        <span>Lahore · {time} PKT</span>
        <a href="#top" onClick={(e) => (e.preventDefault(), scrollTo('#top'))}>Back to top ↑</a>
      </div>
      <div className="footer-big" aria-hidden="true">NAEEM</div>
    </footer>
  )
}
