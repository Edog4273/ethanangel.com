import type { CSSProperties } from 'react'

type Props = {
  ratio?: string
  src?: string
  alt?: string
}

export function VisualPlate({ ratio, src, alt }: Props) {
  return (
    <div
      className="plate"
      style={ratio ? ({ '--ar': ratio } as CSSProperties) : undefined}
    >
      {src && <img src={src} alt={alt ?? ''} loading="lazy" />}
    </div>
  )
}