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
    <article className={`merch-card${hasGallery ? ' merch-card--feature' : ''}`}>
      <div className="merch-card__media">
        {hasGallery ? (
          <div
            className={`merch-gallery${side === 'back' ? ' merch-gallery--back' : ''}`}
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
            <div className="merch-gallery__swap">
              <VisualPlate ratio="1 / 1" src={item.backSrc} alt={`${item.name} back`} />
            </div>
          </div>
        ) : (
          <VisualPlate ratio={item.ratio ?? '1 / 1'} src={item.src} alt={item.name} />
        )}

        {hasGallery && (
          <div className="merch-gallery__tabs">
            <button
              className={side === 'front' ? 'is-on' : undefined}
              aria-pressed={side === 'front'}
              onClick={() => setSide('front')}
            >
              Front
            </button>
            <button
              className={side === 'back' ? 'is-on' : undefined}
              aria-pressed={side === 'back'}
              onClick={() => setSide('back')}
            >
              Back
            </button>
          </div>
        )}
      </div>

      <div className="merch-card__meta">
        <h3 className="merch-card__name">{item.name}</h3>
        {item.note && <p className="merch-card__note">{item.note}</p>}

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
      </div>

      <div className="merch-card__foot">
        <span className="merch-card__price">${item.price.toFixed(2)}</span>
        <button className="btn btn--fmt" onClick={add}>
          Add
        </button>
      </div>
    </article>
  )
}