import { ArtPlate } from '../components/ArtPlate'
import { IMG } from '../data/art'

export function Space() {
  return (
    <section className="scene scene--space">
      <ArtPlate src={IMG.ref10} className="art-plate--space" pos="50% 50%" />
    </section>
  )
}
