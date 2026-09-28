import { memo } from 'react'

export const ArtPlate = memo(function ArtPlate({
  src,
  className = '',
  pos,
  priority = false,
}: {
  src: string
  className?: string
  pos?: string
  priority?: boolean
}) {
  return (
    <figure className={`art-plate${className ? ` ${className}` : ''}`} aria-hidden="true">
      <img
        src={src}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={pos ? { objectPosition: pos } : undefined}
      />
    </figure>
  )
})
