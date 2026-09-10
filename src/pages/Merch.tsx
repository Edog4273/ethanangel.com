import { Page } from '../components/Page'
import { MerchCard } from '../components/MerchCard'
import { MERCH } from '../data/content'

export function Merch() {
  return (
    <Page>
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