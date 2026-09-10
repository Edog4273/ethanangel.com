import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import { MERCH, RELEASES, type MerchItem, type Release, type ReleaseFormat } from '../data/content'

export type CartLine = {
  productId: string
  formatId: string
  qty: number
}

export type CartEntry = {
  key: string
  product: Release | MerchItem
  format: ReleaseFormat
  qty: number
}

function toEntry(line: CartLine): CartEntry | null {
  const release = RELEASES.find((r) => r.id === line.productId)
  if (release) {
    const format = release.formats.find((f) => f.id === line.formatId)
    if (!format) return null
    return { key: lineKey(line.productId, line.formatId), product: release, format, qty: line.qty }
  }
  const merch = MERCH.find((m) => m.id === line.productId)
  if (merch) {
    const size = line.formatId !== merch.id ? line.formatId : undefined
    return {
      key: lineKey(line.productId, line.formatId),
      product: merch,
      format: {
        id: size ?? merch.id,
        label: size ? `${merch.name} — Size ${size}` : merch.name,
        price: merch.price,
      },
      qty: line.qty,
    }
  }
  return null
}

type State = { lines: CartLine[] }

type Action =
  | { type: 'add'; productId: string; formatId: string; qty?: number }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' }

const lineKey = (productId: string, formatId: string) => `${productId}::${formatId}`

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.productId, action.formatId)
      const found = state.lines.find((l) => lineKey(l.productId, l.formatId) === key)
      if (found) {
        return {
          lines: state.lines.map((l) =>
            lineKey(l.productId, l.formatId) === key ? { ...l, qty: l.qty + (action.qty ?? 1) } : l,
          ),
        }
      }
      return { lines: [...state.lines, { productId: action.productId, formatId: action.formatId, qty: action.qty ?? 1 }] }
    }
    case 'setQty': {
      if (action.qty <= 0) {
        return { lines: state.lines.filter((l) => lineKey(l.productId, l.formatId) !== action.key) }
      }
      return {
        lines: state.lines.map((l) =>
          lineKey(l.productId, l.formatId) === action.key ? { ...l, qty: action.qty } : l,
        ),
      }
    }
    case 'remove':
      return { lines: state.lines.filter((l) => lineKey(l.productId, l.formatId) !== action.key) }
    case 'clear':
      return { lines: [] }
  }
}

type CartContextValue = {
  entries: CartEntry[]
  count: number
  subtotal: number
  open: boolean
  openCart: () => void
  closeCart: () => void
  add: (productId: string, formatId: string, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  inCart: (productId: string, formatId: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'ea-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [state, dispatch] = useReducer(reducer, { lines: [] }, () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      return raw ? { lines: JSON.parse(raw) as CartLine[] } : { lines: [] }
    } catch {
      return { lines: [] }
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines))
    } catch {
      // storage unavailable
    }
  }, [state.lines])

  const value = useMemo<CartContextValue>(() => {
    const entries = state.lines.map(toEntry).filter((e): e is CartEntry => e !== null)

    return {
      entries,
      count: entries.reduce((n, e) => n + e.qty, 0),
      subtotal: entries.reduce((n, e) => n + (e.format.price ?? 0) * e.qty, 0),
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add: (productId, formatId, qty) => dispatch({ type: 'add', productId, formatId, qty }),
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
      inCart: (productId, formatId) => {
        const line = state.lines.find((l) => l.productId === productId && l.formatId === formatId)
        return line?.qty ?? 0
      },
    }
  }, [state.lines, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}