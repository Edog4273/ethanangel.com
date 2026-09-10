import { loadStripe } from '@stripe/stripe-js'
import type { StripeEmbeddedCheckout } from '@stripe/stripe-js'
import type { CartEntry } from '../context/CartContext'

export type CheckoutResult = { ok: boolean; message?: string }
export type EmbeddedCheckout = StripeEmbeddedCheckout

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined

export async function createCheckoutSession(items: CartEntry[]): Promise<CheckoutResult & { clientSecret?: string }> {
  const priced = items.filter((it) => it.format.price != null && it.format.price > 0)
  if (priced.length === 0) {
    return { ok: false, message: 'Nothing ready to check out yet.' }
  }

  let res: Response
  try {
    res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        items: priced.map((it) => ({
          productId: it.product.id,
          formatId: it.format.id,
          qty: it.qty,
        })),
      }),
    })
  } catch {
    return { ok: false, message: 'Checkout isn\u2019t connected yet.' }
  }

  const data = (await res.json().catch(() => ({}))) as { clientSecret?: string; error?: string }
  if (!res.ok || !data.clientSecret) {
    return { ok: false, message: data.error ?? 'Checkout failed. Please try again.' }
  }

  return { ok: true, clientSecret: data.clientSecret }
}

export async function openEmbeddedCheckout(
  items: CartEntry[],
  target: HTMLElement,
  callbacks: { onComplete: () => void },
): Promise<CheckoutResult> {
  const created = await createCheckoutSession(items)
  if (!created.ok || !created.clientSecret) return created

  if (!PUBLISHABLE_KEY) {
    return { ok: false, message: 'Checkout isn\u2019t connected yet.' }
  }

  try {
    const stripe = await loadStripe(PUBLISHABLE_KEY)
    if (!stripe) {
      return { ok: false, message: 'Checkout failed. Please try again.' }
    }
    const embedded = await stripe.createEmbeddedCheckoutPage({
      clientSecret: created.clientSecret,
      onComplete: callbacks.onComplete,
    })
    embedded.mount(target)
    return { ok: true }
  } catch {
    return { ok: false, message: 'Checkout failed. Please try again.' }
  }
}