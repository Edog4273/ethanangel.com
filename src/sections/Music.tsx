import { ArtPlate } from '../components/ArtPlate'
import { IMG } from '../data/art'
import { STREAMING } from '../data/content'

export function Music() {
  return (
    <section id="music" className="scene scene--music">
      <ArtPlate src={IMG.ref08} className="art-plate--music" pos="50% 45%" />
      <div className="music__col">
        <h2 className="kicker music__kicker">music</h2>
        <ol className="mus-list">
          {STREAMING.map((s, i) => (
            <li key={s.platform}>
              <a className="mus-row" href={s.url} target="_blank" rel="noreferrer">
                <span className="mus-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="mus-name">{s.platform}</span>
                <span className="mus-go" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
