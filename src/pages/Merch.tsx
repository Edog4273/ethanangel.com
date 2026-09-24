import { Page } from '../components/Page'
import { Scene } from '../components/Scene'
import { EaGlyph } from '../components/EaGlyph'
import { MerchCard } from '../components/MerchCard'
import { MERCH } from '../data/content'

export function Merch() {
  return (
    <Page>
      <Scene slot={5} id="merch" className="scene--wares">
        {MERCH.length > 0 ? (
          <ul className="merch__list">
            {MERCH.map((m) => (
              <li key={m.id}>
                <MerchCard item={m} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="scene__hint">new pieces surface here.</p>
        )}
        <div className="scene__glyph" aria-hidden="true">
          <EaGlyph idPrefix="mg" />
        </div>
      </Scene>
    </Page>
  )
}