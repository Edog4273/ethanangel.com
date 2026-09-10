import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { openEmbeddedCheckout } from '../lib/stripe'
import type { EmbeddedCheckout } from '../lib/stripe'
import { lockScroll } from '../lib/lenis'
import { VisualPlate } from './VisualPlate'

export function CartDrawer() {
  const cart = useCart()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const checkoutEl = useRef<HTMLDivElement>(null)
  const embedded = useRef<EmbeddedCheckout | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    lockScroll(cart.open)
    return () => lockScroll(false)
  }, [cart.open])

  useEffect(() => {
    if (!cart.open) {
      setError('')
      setBusy(false)
    }
  }, [cart.open])

  useEffect(() => () => embedded.current?.destroy(), [])

  const startCheckout = async () => {
    setBusy(true)
    setError('')
    setCheckoutOpen(true)
  }

  useEffect(() => {
    if (!checkoutOpen || startedRef.current || !checkoutEl.current) return
    startedRef.current = true
    const target = checkoutEl.current
    openEmbeddedCheckout(cart.entries, target, {
      onComplete: () => {
        embedded.current = null
        setCheckoutOpen(false)
        cart.clear()
        window.location.assign('/?paid=1')
      },
    })
      .then((result) => {
        setBusy(false)
        if (!result.ok) {
          embedded.current?.destroy()
          embedded.current = null
          startedRef.current = false
          setCheckoutOpen(false)
          setError(result.message ?? 'Checkout failed.')
        }
      })
      .catch(() => {
        setBusy(false)
        embedded.current?.destroy()
        embedded.current = null
        startedRef.current = false
        setCheckoutOpen(false)
        setError('Checkout failed. Please try again.')
      })
  }, [checkoutOpen])

  const closeCheckout = () => {
    embedded.current?.destroy()
    embedded.current = null
    startedRef.current = false
    setCheckoutOpen(false)
  }

  const priced = cart.entries.some((e) => e.format.price != null)

  return (
    <AnimatePresence>
      {cart.open && (
        <>
          <motion.div
            className="drawer__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={cart.closeCart}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Cart"
          >
            <div className="drawer__head">
              <span className="drawer__title">Cart</span>
              <button className="drawer__close" onClick={cart.closeCart} aria-label="Close cart">
                Close
              </button>
            </div>

            {cart.entries.length === 0 ? (
              <div className="drawer__empty">
                <p className="merch-message__note">Your cart is empty.</p>
                <Link to="/" className="btn" onClick={cart.closeCart}>
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="drawer__list">
                  {cart.entries.map((e) => (
                    <div key={e.key} className="drawer__item">
                      <div className="drawer__thumb">
                        <VisualPlate ratio="1 / 1" src={'src' in e.product ? e.product.src : undefined} />
                      </div>
                      <div className="drawer__meta">
                        <span className="drawer__name">
                          {'formats' in e.product ? e.product.title : e.product.name}
                        </span>
                        <span className="drawer__format">{e.format.label}</span>
                      </div>
                      <div className="drawer__right">
                        <span className="drawer__price">
                          {e.format.price != null
                            ? `$${(e.format.price * e.qty).toFixed(2)}`
                            : '—'}
                        </span>
                        <span className="qty">
                          <button
                            className="qty__btn"
                            onClick={() => cart.setQty(e.key, e.qty - 1)}
                            aria-label="Remove one"
                          >
                            −
                          </button>
                          <span className="qty__val">{e.qty}</span>
                          <button
                            className="qty__btn"
                            onClick={() => cart.setQty(e.key, e.qty + 1)}
                            aria-label="Add one"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="drawer__foot">
                  <div className="drawer__row">
                    <span>Subtotal</span>
                    <span className="drawer__total">${cart.subtotal.toFixed(2)}</span>
                  </div>
                  {error && <p className="drawer__err">{error}</p>}
                  <button
                    className="btn btn--solid drawer__btn"
                    onClick={startCheckout}
                    disabled={busy || !priced}
                  >
                    {busy ? 'Processing…' : 'Checkout'}
                  </button>
                  <p className="drawer__note">Shipping and taxes calculated at checkout.</p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}

      {checkoutOpen && (
        <motion.div
          className="checkout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
        >
          <div className="checkout__bar">
            <button className="checkout__back" onClick={closeCheckout}>
              Back
            </button>
          </div>
          <div className="checkout__frame" ref={checkoutEl} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}