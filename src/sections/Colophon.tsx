import { useNavigate } from 'react-router-dom'
import { EAMark } from '../components/EABrand'
import { jumpTo } from '../lib/jump'

export function Colophon() {
  const navigate = useNavigate()

  return (
    <footer className="scene scene--colophon">
      <div className="colophon__in">
        <div className="colophon__markwrap" aria-hidden="true">
          <EAMark idPrefix="co" className="colophon__mark" />
        </div>
        <div className="colophon__row">
          <span className="kicker colophon__name">ethan angel</span>
          <nav className="colophon__links" aria-label="Footer">
            <a className="kicker" href="#music" onClick={(e) => jumpTo(e, 'music', navigate)}>
              music
            </a>
            <a className="kicker" href="#merch" onClick={(e) => jumpTo(e, 'merch', navigate)}>
              merch
            </a>
          </nav>
        </div>
        <p className="colophon__c">© 2026 Ethan Angel</p>
      </div>
    </footer>
  )
}
