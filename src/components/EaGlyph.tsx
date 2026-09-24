export function EaGlyph({
  className,
  tone = 'bone',
  idPrefix = 'gly',
}: {
  className?: string
  tone?: 'bone' | 'ink'
  idPrefix?: string
}) {
  const halo = tone === 'ink' ? 'rgba(20,18,13,0.16)' : 'rgba(241,240,237,0.14)'
  const ink = tone === 'ink' ? '#17150f' : '#efece3'
  const haloId = `${idPrefix}-halo`
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={haloId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="70%" stopColor={halo} />
          <stop offset="100%" stopColor={halo} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill={`url(#${haloId})`} />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" stroke={ink}>
        <circle cx="32" cy="32" r="13" strokeWidth="1.1" opacity="0.85" />
        <circle cx="32" cy="32" r="4" strokeWidth="1" opacity="0.6" />
        <path d="M32 9 v6 M32 49 v6 M9 32 h6 M49 32 h6" strokeWidth="1" opacity="0.55" />
        <path
          d="M40.5 14.5 l4.2 4.2 M19.3 45.3 l-4.2 4.2 M23.5 49.5 l-4.2 4.2 M44.7 18.3 l4.2 -4.2"
          strokeWidth="0.9"
          opacity="0.5"
        />
        <path
          d="M27 27 C 28 29 29 30 32 32 C 35 34 36 35 37 37"
          strokeWidth="0.9"
          opacity="0.85"
        />
      </g>
    </svg>
  )
}