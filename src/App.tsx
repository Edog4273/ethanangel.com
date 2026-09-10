import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import { initLenis, destroyLenis, scrollTopTo } from './lib/lenis'
import { CartProvider } from './context/CartContext'
import { Navigation } from './components/Navigation'
import { CartDrawer } from './components/CartDrawer'
import { Home } from './pages/Home'
import { Merch } from './pages/Merch'

function Site() {
  const location = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    const lenis = initLenis(reduced === true)
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    scrollTopTo(true)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => () => destroyLenis(), [])

  return (
    <>
      <Navigation />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <CartDrawer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Site />
      </CartProvider>
    </BrowserRouter>
  )
}