import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { VisualPlate } from './VisualPlate'
import type { MerchItem } from '../data/content'

export function MerchCard({ item }: { item: MerchItem }) {
  const cart = useCart()
  const hasGallery = !!item.backSrc

  const [size, setSize] = useState(item.sizes?.[0] ?? '')
  const [side, setSide] = useState<'front' | 'back'>('front')

  const add = () => {
    cart.add(item.id, item.sizes?.length ? size : item.id)
    cart.openCart()
  }

  const toggleSide = () => setSide(side === 'front' ? 'back' : 'front')

  return (
    <article className="merch-card">
      <div className="merch-card__piece">
        {hasGallery ? (
          <div
            className={`merch-piece${side === 'back' ? ' merch-piece--back' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`Show ${side === 'front' ? 'back' : 'front'} of ${item.name}`}
            onClick={toggleSide}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleSide()
              }
            }}
          >
            <VisualPlate ratio={item.ratio ?? '1 / 1'} src={item.src} alt={`${item.name} front`} />
            <span className="merch-piece__swap">
              <VisualPlate ratio="1 / 1" src={item.backSrc} alt={`${item.name} back`} />
            </span>
          </div>
        ) : (
          <VisualPlate ratio={item.ratio ?? '1 / 1'} src={item.src} alt={item.name} />
        )}

        {hasGallery && (
          <div className="merch-piece__flip">
            <button
              className={side === 'front' ? 'is-on' : undefined}
              aria-pressed={side === 'front'}
              onClick={() => setSide('front')}
            >
              front
            </button>
            <button
              className={side === 'back' ? 'is-on' : undefined}
              aria-pressed={side === 'back'}
              onClick={() => setSide('back')}
            >
              back
            </button>
          </div>
        )}
      </div>

      <div className="merch-card__data">
        <h3 className="merch-card__name">{item.name}</h3>
        {item.note && <p className="merch-card__note">{item.note}</p>}
        <div className="merch-card__row">
          {item.sizes?.length ? (
            <div className="merch-sizes" role="group" aria-label="Size">
              {item.sizes.map((s) => (
                <button
                  key={s}
                  className={`merch-sizes__btn${size === s ? ' is-on' : ''}`}
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}
          <span className="merch-card__price">${item.price.toFixed(2)}</span>
          <button className="merch-card__add" onClick={add}>
            Add
          </button>
        </div>
      </div>
    </article>
  )
}