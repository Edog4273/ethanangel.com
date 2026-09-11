import Stripe from 'stripe'
import { MERCH, RELEASES } from './data/content'

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
      return {
        name: `${release.title} — ${format.label}`,
        price: format.price,
        physical: format.physical ?? true,
      }
    }
    return null
  }
  const merch = MERCH.find((m) => m.id === productId)
  if (merch) {
    const size = formatId !== merch.id ? formatId : undefined
    return { name: size ? `${merch.name} — Size ${size}` : merch.name, price: merch.price, physical: true }
  }
  return null
}

type Env = {
  STRIPE_SECRET_KEY?: string
  ASSETS: { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> }
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

async function handleCheckout(request: Request, env: Env): Promise<Response> {
  const secret = env.STRIPE_SECRET_KEY
  if (!secret) {
    return json({ error: `The store isn't connected yet.` }, 500)
  }

  const body = (await request.json().catch(() => null)) as { items?: unknown[] } | null
  const items = (Array.isArray(body?.items) ? body.items : []) as CartItem[]

  const lines: LineItem[] = []
  let anyPhysical = false

  for (const it of items) {
    const resolved = it?.productId ? resolveItem(it.productId, it.formatId ?? it.productId) : null
    const qty = Math.max(1, Math.min(10, Number(it?.qty) || 1))

    if (!resolved) {
      return json({ error: 'One or more items are not available for purchase.' }, 400)
    }

    if (resolved.physical) anyPhysical = true

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
    return json({ error: 'Your cart is empty.' }, 400)
  }

  const stripe = new Stripe(secret)
  const origin = request.headers.get('origin') ?? 'https://ethanangel.com'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'embedded_page',
      ...(anyPhysical
        ? { shipping_address_collection: { allowed_countries: ['US'] } }
        : {}),
      return_url: `${origin}/?paid=1`,
      branding_settings: {
        background_color: '#000000',
        button_color: '#F2EADD',
        border_style: 'rounded',
        font_family: 'inter',
        display_name: 'ETHAN ANGEL',
      },
      line_items: lines,
    })
    return json({ clientSecret: session.client_secret }, 200)
  } catch (err) {
    console.error('Checkout error:', err)
    return json({ error: 'Checkout could not be opened. Please try again.' }, 500)
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/create-checkout-session' && request.method === 'POST') {
      return handleCheckout(request, env)
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Not Found', { status: 404 })
    }

    return env.ASSETS.fetch(request)
  },
}