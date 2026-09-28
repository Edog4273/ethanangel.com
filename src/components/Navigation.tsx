import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { jumpTo } from '../lib/jump'
import { scrollTopTo } from '../lib/lenis'

export function Navigation() {
  const cart = useCart()
  const navigate = useNavigate()

  const home = (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.location.pathname === '/') scrollTopTo(false)
    else navigate('/')
  }

  return (
    <header className="nav">
      <a href="/" className="nav__brand" onClick={home}>
        Ethan Angel
      </a>
      <a href="#music" className="nav__link" onClick={(e) => jumpTo(e, 'music', navigate)}>
        Music
      </a>
      <a href="#merch" className="nav__link" onClick={(e) => jumpTo(e, 'merch', navigate)}>
        Merch
      </a>
      <button className="nav__cart" onClick={cart.openCart} aria-label="Open cart">
        Cart
        <span className="nav__count">{cart.count}</span>
      </button>
    </header>
  )
}
