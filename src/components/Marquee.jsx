import { marquee } from '../data.js'
import { Star } from './Icons.jsx'

export default function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <div className="marquee-item" key={i}>
            {t}
            <Star className="marquee-star" />
          </div>
        ))}
      </div>
    </div>
  )
}
