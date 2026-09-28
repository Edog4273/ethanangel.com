import { ArtPlate } from '../components/ArtPlate'
import { EaGlyph } from '../components/EaGlyph'
import { IMG } from '../data/art'

export function Arrival() {
  return (
    <section className="scene scene--arrival">
      <ArtPlate
        src={IMG.ref09}
        className="art-plate--arrival"
        pos="50% 42%"
        priority
      />
      <div className="arrival__col">
        <h1 className="display arrival__title">Ethan Angel</h1>
        <div className="arrival__meta">
          <EaGlyph idPrefix="ar" />
          <span className="kicker">music</span>
        </div>
      </div>
    </section>
  )
}
