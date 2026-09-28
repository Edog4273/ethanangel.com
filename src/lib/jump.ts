import type { MouseEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { scrollToEl } from './lenis'

export function jumpTo(e: MouseEvent, id: string, navigate: NavigateFunction) {
  e.preventDefault()
  if (document.getElementById(id)) scrollToEl(id)
  else navigate({ pathname: '/', hash: `#${id}` })
}
