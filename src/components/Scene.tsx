import type { ReactNode } from 'react'
import { ArtPlate } from './ArtPlate'

export function Scene({
  id,
  slot,
  className = '',
  children,
}: {
  id?: string
  slot?: number
  className?: string
  children?: ReactNode
}) {
  return (
    <section
      id={id}
      className={`scene${slot !== undefined ? ' scene--art' : ''}${className ? ` ${className}` : ''}`}
    >
      {slot !== undefined && <ArtPlate slot={slot} />}
      {children}
    </section>
  )
}