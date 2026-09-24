import Lenis from 'lenis'

let instance: Lenis | null = null

export function initLenis(reduced: boolean): Lenis {
  if (instance) return instance
  instance = new Lenis({
    lerp: reduced ? 1 : 0.11,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  })
  return instance
}

export function getLenis(): Lenis | null {
  return instance
}

export function destroyLenis(): void {
  instance?.destroy()
  instance = null
}

export function lockScroll(locked: boolean): void {
  const lenis = getLenis()
  if (!locked) {
    lenis?.start()
  } else {
    lenis?.stop()
  }
  document.body.style.overflow = locked ? 'hidden' : ''
}

export function scrollTopTo(immediate = true): void {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}

export function scrollToEl(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}