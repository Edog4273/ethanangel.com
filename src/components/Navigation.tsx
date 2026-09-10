import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function Navigation() {
  const cart = useCart()
  return (
    <header className="nav">
      <Link to="/" className="nav__word">
        Ethan Angel
      </Link>
      <button className="nav__cart" onClick={cart.openCart} aria-label="Open cart">
        Cart
        <span className="nav__count">{cart.count}</span>
      </button>
    </header>
  )
}