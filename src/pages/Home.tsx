import { Page } from '../components/Page'
import { VisualPlate } from '../components/VisualPlate'
import { MerchCard } from '../components/MerchCard'
import { ALBUM, ARTIST, MERCH, STREAMING } from '../data/content'
import { useCart } from '../context/CartContext'

export function Home() {
  const cart = useCart()

  const preorder = (formatId: string) => {
    cart.add(ALBUM.id, formatId)
    cart.openCart()
  }

  return (
    <Page>
      <section className="home">
        <div className="home__cover">
          <VisualPlate ratio={ALBUM.ratio} src={ALBUM.src} alt={`${ALBUM.title} album cover`} />
        </div>

        <h1 className="home__title">{ALBUM.title}</h1>
        <p className="home__artist">{ARTIST}</p>

        <div className="home__actions">
          {ALBUM.formats.map((f) => (
            <button
              key={f.id}
              className="btn home__action"
              disabled={f.price == null}
              onClick={() => preorder(f.id)}
            >
              Pre-order {f.label}
            </button>
          ))}
        </div>

        <div className="home__streams">
          {STREAMING.map((s) =>
            s.url ? (
              <a
                key={s.platform}
                className="home__stream"
                href={s.url}
                target="_blank"
                rel="noreferrer"
              >
                {s.platform}
              </a>
            ) : (
              <span key={s.platform} className="home__stream home__stream--soon">
                {s.platform}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="merch">
        <h2 className="merch__head">PLATINUM SOUL Merch</h2>
        <div className="merch__grid">
          {MERCH.map((m) => (
            <MerchCard key={m.id} item={m} />
          ))}
        </div>
      </section>
    </Page>
  )
}