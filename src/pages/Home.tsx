import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Page } from '../components/Page'
import { Arrival } from '../sections/Arrival'
import { Diptych } from '../sections/Diptych'
import { Music } from '../sections/Music'
import { Print } from '../sections/Print'
import { Space } from '../sections/Space'
import { World } from '../sections/World'
import { Wares } from '../sections/Wares'
import { Colophon } from '../sections/Colophon'
import { scrollToEl } from '../lib/lenis'

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
      <Arrival />
      <Diptych />
      <Music />
      <Print />
      <Space />
      <World />
      <Wares />
      <Colophon />
    </Page>
  )
}
