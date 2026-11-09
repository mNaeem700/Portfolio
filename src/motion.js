import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export let lenis = null

export function scrollTo(target) {
  if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.4 })
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

export function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reduce) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.__raf = raf
  }

  const ctx = gsap.context(() => {
    // Hero intro
    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    heroTl
      .from('.hero-title .line-mask > span', { yPercent: 115, duration: 1.4, stagger: 0.09 })
      .from('.hero .status', { y: 20, autoAlpha: 0, duration: 1 }, 0.3)
      .from('.hero-intro, .hero-ctas > *', { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.5)
      .from('.hero-meta', { autoAlpha: 0, duration: 1 }, 0.8)
      .from('.hero-canvas', { autoAlpha: 0, scale: 0.92, duration: 1.8 }, 0.2)
      .from('.nav', { yPercent: -100, autoAlpha: 0, duration: 1 }, 0.4)

    if (reduce) {
      heroTl.progress(1)
      return
    }

    // Hero parallax on scroll
    gsap.to('.hero-title', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    })

    // Section titles: line reveal
    gsap.utils.toArray('[data-lines]').forEach((el) => {
      gsap.from(el.querySelectorAll('.line-mask > span'), {
        yPercent: 115,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    // Generic fade-up
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 50,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    // About: words light up while scrolling
    gsap.to('.about-text .word', {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
    })

    // Portrait parallax
    gsap.fromTo('.portrait img', { yPercent: -12 }, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.portrait', start: 'top bottom', end: 'bottom top', scrub: true },
    })
    gsap.from('.portrait', {
      clipPath: 'inset(100% 0 0 0 round 28px)',
      duration: 1.6,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: '.portrait', start: 'top 85%' },
    })

    // Stats count-up
    gsap.utils.toArray('[data-count]').forEach((el) => {
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

    // Project cards: scale-in + phones rise
    gsap.utils.toArray('.project').forEach((card) => {
      gsap.from(card, {
        y: 100,
        scale: 0.94,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 90%' },
      })
      gsap.from(card.querySelectorAll('.phone, .tv-art'), {
        y: 160,
        autoAlpha: 0,
        duration: 1.6,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: card, start: 'top 75%' },
      })
    })

    // Footer giant name drift
    gsap.from('.footer-big', {
      yPercent: 40,
      ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
    })
  })

  // Recalculate positions once images/fonts settle
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  document.fonts?.ready.then(refresh)

  return () => {
    window.removeEventListener('load', refresh)
    ctx.revert()
    if (lenis) {
      gsap.ticker.remove(lenis.__raf)
      lenis.destroy()
      lenis = null
    }
  }
}
