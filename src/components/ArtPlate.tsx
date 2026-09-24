import { memo } from 'react'
import type { CSSProperties } from 'react'
import { ART_PLATES, getArtFor } from '../data/art'
import type { PlateSpec } from '../data/art'

export function toFigureStyle(plate: Partial<PlateSpec>): CSSProperties {
  return {
    width: plate.width,
    height: plate.height,
    left: plate.left,
    top: plate.top,
    transform: plate.transform,
    opacity: plate.opacity,
    mixBlendMode: plate.blend ?? 'normal',
  }
}

export const ArtPlate = memo(function ArtPlate({
  slot,
  className = '',
}: {
  slot: number
  className?: string
}) {
  const plate = ART_PLATES[slot] ?? {}
  const src = plate.src ?? getArtFor(slot)
  if (!src) return null
  return (
    <figure
      className={`art-plate${className ? ` ${className}` : ''}`}
      style={toFigureStyle(plate)}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{
          objectFit: plate.objectFit ?? 'cover',
          objectPosition: plate.objectPosition ?? 'center',
        }}
      />
    </figure>
  )
})