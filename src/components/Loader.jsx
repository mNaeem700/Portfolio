import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader({ onDone }) {
  const root = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const obj = { v: 0 }
    const tl = gsap.timeline()
    tl.to(obj, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.v)),
    })
      .to('.loader-bar', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
      .to(root.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'expo.inOut',
        onComplete: onDone,
      })
    return () => tl.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="loader" ref={root} style={{ clipPath: 'inset(0 0 0 0)' }}>
      <div className="loader-top">
        <span>Muhammad Naeem</span>
        <span>Portfolio © {new Date().getFullYear()}</span>
      </div>
      <div className="loader-count">{count}</div>
      <div className="loader-bar" />
    </div>
  )
}
