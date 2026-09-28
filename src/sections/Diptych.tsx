import { ArtPlate } from '../components/ArtPlate'
import { IMG } from '../data/art'

export function Diptych() {
  return (
    <section className="scene scene--diptych">
      <ArtPlate src={IMG.ref05} className="art-plate--dip-a" pos="50% 48%" />
      <ArtPlate src={IMG.ref03} className="art-plate--dip-b" pos="50% 58%" />
    </section>
  )
}
