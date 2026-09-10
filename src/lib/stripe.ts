import type { CartEntry } from '../context/CartContext'

export type CheckoutResult = { ok: boolean; message?: string }

export async function checkout(items: CartEntry[]): Promise<CheckoutResult> {
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

  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
  if (!res.ok || !data.url) {
    return { ok: false, message: data.error ?? 'Checkout failed. Please try again.' }
  }

  window.location.assign(data.url)
  return { ok: true }
}