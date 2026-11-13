import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
// Mobile browsers resize the viewport as the address bar hides; re-measuring every
// trigger on each of those is expensive and causes jumps.
ScrollTrigger.config({ ignoreMobileResize: true })

// Run work when the main thread is free (after first paint / LCP).
const whenIdle = (fn, timeout = 1200) =>
  'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout }) : setTimeout(fn, 200)
const cancelIdle = (id) => ('cancelIdleCallback' in window ? cancelIdleCallback(id) : clearTimeout(id))

export let lenis = null

// Page height the scroll triggers were last measured at (see the ResizeObserver below)
let measuredHeight = 0
function remeasure() {
  measuredHeight = document.documentElement.scrollHeight
  ScrollTrigger.refresh()
}

export function scrollTo(target) {
  // Off-screen sections use content-visibility (rendered lazily), so their heights are
  // estimates. Render everything once before a long jump so we land exactly on target.
  document.documentElement.classList.add('cv-off')
  // wait two frames so the newly rendered sections have their real layout
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      // measure now, so no trigger refresh fires mid-scroll (a refresh interrupts native smooth scrolling)
      remeasure()
      if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.4 })
      else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }),
  )
}

// Deep links (e.g. /#contact): the page is rendered by React after the browser's own
// anchor jump, so jump to the target ourselves once the app is on screen.
export function jumpToHash() {
  const id = decodeURIComponent(location.hash.slice(1))
  const el = id && document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -20, immediate: true })
  else window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 20)
}

/* ---------------------------------------------------------------------------
   Per-section scroll animations. Each section's animations are created only when
   that section approaches the viewport, so the work is spread out in small pieces
   instead of measuring the whole page at load.
--------------------------------------------------------------------------- */
function setupSection(root, reduce) {
  const $ = (sel) => gsap.utils.toArray(root.querySelectorAll(sel))

  if (reduce) return

  // Section titles: line reveal
  $('[data-lines]').forEach((el) => {
    gsap.from(el.querySelectorAll('.line-mask > span'), {
      yPercent: 115,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    })
  })

  // Generic fade-up — batched so neighbours entering together share one tween
  const reveals = $('[data-reveal]')
  if (reveals.length) {
    gsap.set(reveals, { y: 50, autoAlpha: 0 })
    ScrollTrigger.batch(reveals, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.08,
          clearProps: 'transform', // hand transforms back to CSS hover states
        }),
    })
  }

  // About: words light up while scrolling
  const aboutText = root.querySelector('.about-text')
  if (aboutText) {
    gsap.to(aboutText.querySelectorAll('.word'), {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: { trigger: aboutText, start: 'top 80%', end: 'bottom 45%', scrub: true },
    })
  }

  // Portrait reveal + parallax
  const portrait = root.querySelector('.portrait')
  if (portrait) {
    gsap.fromTo(portrait.querySelector('img'), { yPercent: -12 }, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: root.querySelector('.about-grid') || portrait, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    gsap.fromTo(
      portrait,
      { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 28px)',
        duration: 1.6,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: portrait, start: 'top 85%' },
      },
    )
  }

  // Stats count-up
  $('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count)
    const dec = parseInt(el.dataset.decimals || 0)
    const obj = { v: 0 }
    gsap.to(obj, {
      v: end,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = obj.v.toFixed(dec)),
    })
  })

  // Featured projects: card scales in, screenshots rise
  $('.feature').forEach((card) => {
    gsap.from(card, {
      y: 100,
      scale: 0.95,
      autoAlpha: 0,
      duration: 1.4,
      ease: 'expo.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: card, start: 'top 90%' },
    })
    // animate the wrapper so each .shot keeps its CSS fan/hover transforms
    gsap.from(card.querySelector('.feature-visual'), {
      y: 140,
      autoAlpha: 0,
      duration: 1.6,
      ease: 'expo.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: card, start: 'top 75%' },
    })
  })

  // Footer giant name drift
  const big = root.querySelector('.footer-big')
  if (big) {
    gsap.from(big, {
      yPercent: 40,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true },
    })
  }
}

export function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  // Smooth-scroll engine only where it helps: mouse/trackpad on capable devices.
  // Touch devices already scroll natively smooth, and low-end devices need the main thread.
  const lite = document.documentElement.classList.contains('lite')
  const touch = matchMedia('(hover: none), (pointer: coarse)').matches
  if (!reduce && !lite && !touch) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.__raf = raf
  }

  // Hero intro — the only animation that runs immediately
  const ctx = gsap.context(() => {
    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    heroTl
      .from('.hero-title .line-mask > span', { yPercent: 115, duration: 1.4, stagger: 0.09 })
      .from('.hero .status', { y: 20, autoAlpha: 0, duration: 1 }, 0.3)
      .from('.hero-intro, .hero-ctas > *', { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.5)
      .from('.hero-trust', { y: 16, autoAlpha: 0, duration: 0.9 }, 0.8)
      .from('.hero-visual-inner', { autoAlpha: 0, scale: 0.9, duration: 1.8 }, 0.2)
    // note: .nav is not animated here — its CSS transform transition (hide on scroll) would fight GSAP
    if (reduce) heroTl.progress(1)
  })

  const scrollCtx = gsap.context(() => {})
  const cleanups = []

  const idleId = whenIdle(() => {
    // Hero parallax on scroll
    if (!reduce) {
      scrollCtx.add(() => {
        gsap.to('.hero-copy', {
          yPercent: -14,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    }

    // Set each section up when it comes within ~1.5 screens of the viewport
    const sections = document.querySelectorAll('main > section:not(.hero), .footer')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          io.unobserve(e.target)
          scrollCtx.add(() => setupSection(e.target, reduce))
        })
      },
      { rootMargin: '150% 0px 150% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    cleanups.push(() => io.disconnect())

    // Lazily-rendered sections reveal their real heights as you scroll; re-measure
    // triggers when the page height changes (debounced).
    let rt = 0
    measuredHeight = document.documentElement.scrollHeight
    const ro = new ResizeObserver(() => {
      if (Math.abs(document.documentElement.scrollHeight - measuredHeight) < 2) return
      clearTimeout(rt)
      rt = setTimeout(() => {
        if (Math.abs(document.documentElement.scrollHeight - measuredHeight) >= 2) remeasure()
      }, 200)
    })
    ro.observe(document.querySelector('main'))
    cleanups.push(() => {
      ro.disconnect()
      clearTimeout(rt)
    })

    // Web fonts change text heights; re-measure once if they finish late
    if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => ScrollTrigger.refresh())
  })

  return () => {
    cancelIdle(idleId)
    cleanups.forEach((fn) => fn())
    scrollCtx.revert()
    ctx.revert()
    if (lenis) {
      gsap.ticker.remove(lenis.__raf)
      lenis.destroy()
      lenis = null
    }
  }
}
