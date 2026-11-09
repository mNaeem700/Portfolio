import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (matchMedia('(hover: none), (pointer: coarse)').matches) return
    const xR = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yR = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })
    const xD = gsap.quickTo(dot.current, 'x', { duration: 0.1 })
    const yD = gsap.quickTo(dot.current, 'y', { duration: 0.1 })

    const move = (e) => {
      ring.current.classList.add('is-active')
      dot.current.classList.add('is-active')
      xR(e.clientX)
      yR(e.clientY)
      xD(e.clientX)
      yD(e.clientY)
    }
    const over = (e) => {
      const view = e.target.closest('[data-cursor="view"]')
      const link = e.target.closest('a, button, [data-cursor="hover"]')
      ring.current.classList.toggle('is-view', !!view)
      ring.current.classList.toggle('is-hover', !view && !!link)
      ring.current.textContent = view ? view.dataset.cursorLabel || 'View' : ''
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  )
}
