import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Page } from '../components/Page'
import { Scene } from '../components/Scene'
import { EAMark } from '../components/EABrand'
import { EaGlyph } from '../components/EaGlyph'
import { MerchCard } from '../components/MerchCard'
import { scrollToEl } from '../lib/lenis'
import { STREAMING, MERCH } from '../data/content'

export function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = window.setTimeout(() => scrollToEl(id), 380)
    return () => window.clearTimeout(t)
  }, [location.hash])

  return (
    <Page>
      <Scene slot={0} className="scene--intake">
        <span className="scene__hairline" aria-hidden="true" />
        <EAMark idPrefix="mk-a" className="scene__mark scene__mark--br" />
      </Scene>

      <Scene slot={1} className="scene--flood">
        <EAMark idPrefix="mk-b" className="scene__mark scene__mark--tr" />
      </Scene>

      <Scene slot={2} className="scene--cluster">
        <EAMark idPrefix="mk-c" className="scene__mark scene__mark--bl" />
      </Scene>

      <Scene slot={3} className="scene--ink">
        <EAMark idPrefix="mk-d" className="scene__mark scene__mark--tl" />
      </Scene>

      <Scene slot={4} id="music" className="scene--sound">
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
        <div className="scene__glyph" aria-hidden="true">
          <EaGlyph idPrefix="hm" />
        </div>
      </Scene>

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
          <EaGlyph idPrefix="hm2" />
        </div>
      </Scene>

      <Scene className="scene--colophon">
        <div className="scene__glyph" aria-hidden="true">
          <EaGlyph idPrefix="hm3" />
        </div>
        <p className="scene__foot">© 2026 ethan angel</p>
      </Scene>
    </Page>
  )
}