import { ArtPlate } from '../components/ArtPlate'
import { IMG } from '../data/art'

export function World() {
  return (
    <section className="scene scene--world">
      <ArtPlate src={IMG.ref04} className="art-plate--world-a" pos="55% 50%" />
      <ArtPlate src={IMG.ref07} className="art-plate--world-c" pos="50% 50%" />
      <ArtPlate src={IMG.ref06} className="art-plate--world-b" pos="50% 58%" />
    </section>
  )
}
