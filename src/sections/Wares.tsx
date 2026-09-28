import { ArtPlate } from '../components/ArtPlate'
import { MerchCard } from '../components/MerchCard'
import { IMG } from '../data/art'
import { MERCH } from '../data/content'

export function Wares() {
  const hasItems = MERCH.length > 0
  return (
    <section
      id="merch"
      className={`scene scene--wares${hasItems ? ' scene--wares-grid' : ''}`}
    >
      <ArtPlate src={IMG.ref01} className="art-plate--wares" pos="50% 52%" />
      <div className="wares__col">
        <h2 className="kicker wares__kicker">merch</h2>
        {hasItems ? (
          <ul className="merch__list">
            {MERCH.map((m) => (
              <li key={m.id}>
                <MerchCard item={m} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="hint">new pieces surface here.</p>
        )}
      </div>
    </section>
  )
}
