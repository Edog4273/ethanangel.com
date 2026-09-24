import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { scrollToEl } from '../lib/lenis'

export function Navigation() {
  const cart = useCart()
  const navigate = useNavigate()

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (document.getElementById(id)) scrollToEl(id)
    else navigate({ pathname: '/', hash: `#${id}` })
  }

  return (
    <header className="nav">
      <a href="#music" className="nav__link" onClick={(e) => jump(e, 'music')}>
        Music
      </a>
      <a href="#merch" className="nav__link" onClick={(e) => jump(e, 'merch')}>
        Merch
      </a>
      <button className="nav__cart" onClick={cart.openCart} aria-label="Open cart">
        Cart
        <span className="nav__count">{cart.count}</span>
      </button>
    </header>
  )
}