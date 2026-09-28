import { ArtPlate } from '../components/ArtPlate'
import { IMG } from '../data/art'

export function Print() {
  return (
    <section className="scene scene--print">
      <ArtPlate src={IMG.ref02} className="art-plate--print" pos="50% 46%" />
    </section>
  )
}
