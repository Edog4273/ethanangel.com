import type { IncomingMessage, ServerResponse } from 'node:http'
import Stripe from 'stripe'
import { MERCH, RELEASES } from '../src/data/content'

type CartItem = { productId?: string; formatId?: string; qty?: number }

type LineItem = {
  quantity: number
  price_data: {
    currency: string
    unit_amount: number
    product_data: { name: string }
  }
}

function resolveItem(productId: string, formatId: string) {
  const release = RELEASES.find((r) => r.id === productId)
  if (release) {
    const format = release.formats.find((f) => f.id === formatId)
    if (format?.price != null) {
      return { name: `${release.title} — ${format.label}`, price: format.price }
    }
    return null
  }
  const merch = MERCH.find((m) => m.id === productId)
  if (merch) {
    const size = formatId !== merch.id ? formatId : undefined
    return { name: size ? `${merch.name} — Size ${size}` : merch.name, price: merch.price }
  }
  return null
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end()
    return
  }

  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    res.statusCode = 500
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ error: `The store isn't connected yet.` }))
    return
  }

  const body = await readJson(req).catch(() => null)
  const items = (Array.isArray(body?.items) ? body.items : []) as CartItem[]

  const lines: LineItem[] = []

  for (const it of items) {
    const resolved = it?.productId ? resolveItem(it.productId, it.formatId ?? it.productId) : null
    const qty = Math.max(1, Math.min(10, Number(it?.qty) || 1))

    if (!resolved) {
      res.statusCode = 400
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify({ error: 'One or more items are not available for purchase.' }))
      return
    }

    lines.push({
      quantity: qty,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(resolved.price * 100),
        product_data: { name: resolved.name },
      },
    })
  }

  if (lines.length === 0) {
    res.statusCode = 400
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ error: 'Your cart is empty.' }))
    return
  }

  const stripe = new Stripe(secret)
  const origin = req.headers.origin ?? 'https://ethanangel.com'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${origin}/?paid=1`,
      cancel_url: `${origin}/`,
      line_items: lines,
    })
    res.statusCode = 200
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ url: session.url }))
  } catch {
    res.statusCode = 500
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ error: 'Checkout could not be opened. Please try again.' }))
  }
}

function readJson(req: IncomingMessage): Promise<{ items?: unknown[] }> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 1_000_000) {
        reject(new Error('payload too large'))
        req.destroy()
      }
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'))
      } catch {
        reject(new Error('invalid json'))
      }
    })
    req.on('error', reject)
  })
}