type Stroke = { d: string; w: number }
type Glyph = { x: number; dy: number; rot: number; strokes: Stroke[] }

const GLYPHS: Glyph[] = [
  {
    x: 8,
    dy: 0,
    rot: 2.8,
    strokes: [
      { d: 'M54 40 C40 120 46 220 60 320', w: 18 },
      { d: 'M-4 104 L156 88', w: 28 },
      { d: 'M60 186 L104 196', w: 11 },
      { d: 'M26 288 L146 276', w: 34 },
      { d: 'M30 64 L32 96 M34 120 L34 150', w: 3 },
    ],
  },
  {
    x: 168,
    dy: -5,
    rot: -2.6,
    strokes: [
      { d: 'M88 96 C80 180 74 260 68 340', w: 13 },
      { d: 'M-10 128 L176 104', w: 24 },
      { d: 'M-6 118 L-10 134 M170 108 L176 124', w: 3 },
    ],
  },
  {
    x: 300,
    dy: 3,
    rot: 3.6,
    strokes: [
      { d: 'M14 26 C-6 132 10 236 32 332', w: 30 },
      { d: 'M124 34 C150 138 136 240 112 330', w: 15 },
      { d: 'M6 156 L132 168', w: 16 },
      { d: 'M18 236 L84 246', w: 10 },
      { d: 'M20 70 L24 96 M28 122 L30 148', w: 3 },
    ],
  },
  {
    x: 430,
    dy: -6,
    rot: -4.6,
    strokes: [
      { d: 'M14 330 C36 200 58 104 66 48', w: 34 },
      { d: 'M64 20 L62 40', w: 20 },
      { d: 'M140 330 C112 210 90 116 80 52', w: 10 },
      { d: 'M60 60 L88 40', w: 9 },
      { d: 'M22 214 L58 204 M100 216 L128 204', w: 12 },
    ],
  },
  {
    x: 562,
    dy: 3,
    rot: 2.6,
    strokes: [
      { d: 'M28 76 C18 160 24 252 38 336', w: 26 },
      { d: 'M130 60 C140 160 134 256 120 336', w: 28 },
      { d: 'M36 118 L122 268', w: 34 },
      { d: 'M30 62 L36 92 M124 60 L130 100', w: 3 },
    ],
  },
  {
    x: 700,
    dy: -5,
    rot: -3.8,
    strokes: [
      { d: 'M12 336 C32 210 54 116 68 54', w: 14 },
      { d: 'M146 336 C120 210 100 118 90 52', w: 30 },
      { d: 'M66 72 L92 44', w: 10 },
      { d: 'M58 30 L68 42 M90 30 L82 42', w: 4 },
      { d: 'M30 224 L62 210 M104 218 L132 204', w: 13 },
    ],
  },
  {
    x: 838,
    dy: 2,
    rot: 3.0,
    strokes: [
      { d: 'M38 70 C30 158 36 250 46 336', w: 28 },
      { d: 'M126 84 C136 160 130 240 118 332', w: 15 },
      { d: 'M46 120 L118 246', w: 24 },
      { d: 'M34 56 L40 92 M120 60 L126 100', w: 3 },
    ],
  },
  {
    x: 968,
    dy: -4,
    rot: -3.4,
    strokes: [
      { d: 'M80 62 C128 44 158 82 152 138', w: 24 },
      { d: 'M46 186 L132 176', w: 17 },
      { d: 'M62 156 C42 232 66 306 116 304 C142 300 148 262 140 232', w: 22 },
      { d: 'M140 234 C170 278 208 314 258 326', w: 16 },
      { d: 'M92 70 C124 60 150 92 146 128', w: 3 },
    ],
  },
  {
    x: 1120,
    dy: -2,
    rot: 4.0,
    strokes: [
      { d: 'M56 70 C44 150 50 240 62 318', w: 20 },
      { d: 'M4 118 L142 106', w: 25 },
      { d: 'M28 286 L146 276', w: 30 },
      { d: 'M64 196 L68 212 M36 250 L40 262', w: 3 },
    ],
  },
  {
    x: 1220,
    dy: 1,
    rot: -2.8,
    strokes: [
      { d: 'M44 34 C34 130 46 240 62 336', w: 28 },
      { d: 'M18 306 L136 296', w: 26 },
      { d: 'M132 300 C176 306 210 316 238 328', w: 10 },
      { d: 'M150 286 L160 296 L162 306', w: 5 },
      { d: 'M50 80 L52 112', w: 3 },
    ],
  },
]

const SCRIBBLE: Stroke[] = [
  { d: 'M150 348 C196 356 240 350 272 356', w: 4 },
  { d: 'M620 352 C672 344 730 350 780 344', w: 3 },
  { d: 'M940 342 l8 -4 m12 3 l7 -2', w: 3 },
  { d: 'M120 54 l6 -3 m14 3 l8 -2', w: 2 },
  { d: 'M1400 112 l8 -4 m10 4 l6 -3', w: 2 },
  { d: 'M520 330 l7 -3 m14 4 l8 -2', w: 2 },
]

function RenderGlyphs({
  scale = 1,
  strokeList,
  color,
  opacity = 1,
}: {
  scale?: number
  strokeList: Stroke[]
  color: string
  opacity?: number
}) {
  return (
    <>
      {GLYPHS.map((g, i) => (
        <g
          key={`g${i}`}
          transform={`translate(${g.x + 4} ${g.dy - 7}) rotate(${g.rot * scale})`}
          opacity={opacity}
        >
          {strokeList.map((s, j) => (
            <path
              key={`s${j}`}
              d={s.d}
              fill="none"
              stroke={color}
              strokeWidth={s.w}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
      ))}
    </>
  )
}

export function EAMark({
  className,
  tone = 'bone',
  idPrefix = 'ea',
}: {
  className?: string
  tone?: 'bone' | 'ink'
  idPrefix?: string
}) {
  return (
    <svg
      className={`ea-mark${tone === 'ink' ? ' ea-mark--ink' : ''}${className ? ` ${className}` : ''}`}
      viewBox="0 0 1490 420"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${idPrefix}-ink`} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#f5efe0" />
          <stop offset="55%" stopColor="#d9d1bd" />
          <stop offset="100%" stopColor="#9f9683" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="7%" stopColor="#050505" />
          <stop offset="12%" stopColor="#ffffff" />
          <stop offset="87%" stopColor="#ffffff" />
          <stop offset="94%" stopColor="#040404" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <mask id={`${idPrefix}-fade`} maskUnits="userSpaceOnUse" x="-40" y="-60" width="1570" height="540">
          <rect x="-40" y="-60" width="1570" height="540" fill={`url(#${idPrefix}-edge)`} />
        </mask>
        <filter id={`${idPrefix}-grain`} x="-40%" y="-60%" width="180%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="23" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6.5" result="r" />
          <feDropShadow in="r" dx="0" dy="0" stdDeviation="5" floodColor="#ece5d5" floodOpacity="0.28" />
          <feDropShadow in="r" dx="0" dy="0" stdDeviation="38" floodColor="#cfc6b2" floodOpacity="0.1" />
        </filter>
        <filter id={`${idPrefix}-soft`} x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      <g transform="translate(-5 7)" opacity="0.85" filter={`url(#${idPrefix}-soft)`}>
        <RenderGlyphs strokeList={GLYPHS.flatMap((g) => g.strokes)} color="#000000" />
      </g>

      <g transform="translate(4 -3)" opacity="0.4">
        <RenderGlyphs strokeList={GLYPHS.flatMap((g) => g.strokes)} color="#f2ecde" />
      </g>

      <g filter={`url(#${idPrefix}-grain)`} mask={`url(#${idPrefix}-fade)`}>
        <g>
          {GLYPHS.map((g, i) => (
            <g key={`cs${i}`} transform={`translate(${g.x} ${g.dy}) rotate(${g.rot})`} opacity="0.5">
              {g.strokes.map((s, j) => (
                <path
                  key={`cj${j}`}
                  d={s.d}
                  fill="none"
                  stroke="#131109"
                  strokeWidth={s.w}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(2.2 2.8)"
                />
              ))}
            </g>
          ))}
        </g>
        <g>
          {GLYPHS.map((g, i) => (
            <g key={`out${i}`} transform={`translate(${g.x} ${g.dy}) rotate(${g.rot})`} opacity="0.85">
              {g.strokes.map((s, j) => (
                <path
                  key={`o${j}`}
                  d={s.d}
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth={s.w + 13}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          ))}
        </g>
        <g>
          {GLYPHS.map((g, i) => (
            <g key={`ink${i}`} transform={`translate(${g.x} ${g.dy}) rotate(${g.rot})`}>
              {g.strokes.map((s, j) => (
                <path
                  key={`f${j}`}
                  d={s.d}
                  fill="none"
                  stroke={`url(#${idPrefix}-ink)`}
                  strokeWidth={s.w}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          ))}
        </g>
      </g>

      <g stroke="#faf6ea" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
        {GLYPHS.slice(0, 8).map((g, i) => (
          <g key={`hl${i}`} transform={`translate(${g.x} ${g.dy}) rotate(${g.rot})`}>
            <path
              d={g.strokes[0].d}
              fill="none"
              strokeWidth="2.2"
              transform="translate(-3 -3)"
              opacity="0.85"
            />
            <path
              d={g.strokes[1].d}
              fill="none"
              strokeWidth="1.8"
              transform="translate(2 -5)"
              opacity="0.5"
            />
          </g>
        ))}
      </g>

      <g mask={`url(#${idPrefix}-fade)`}>
        {SCRIBBLE.map((s, i) => (
          <path
            key={`sc${i}`}
            d={s.d}
            fill="none"
            stroke="#e7dfce"
            strokeWidth={s.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
        ))}
      </g>
    </svg>
  )
}