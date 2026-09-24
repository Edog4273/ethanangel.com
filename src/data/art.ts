export type PlateSpec = {
  src?: string
  width?: string
  height?: string
  left?: string
  top?: string
  transform?: string
  objectFit?: 'cover' | 'contain'
  objectPosition?: string
  opacity?: number
  blend?: 'normal' | 'screen' | 'overlay' | 'multiply'
}

export const ART_SLOTS = 6

const ART_FILES = Object.keys(
  import.meta.glob('/src/assets/art/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    import: 'default',
  }),
).sort((a, b) => a.localeCompare(b))

export function getArtFor(slot: number): string | undefined {
  return ART_FILES[slot]
}

export const ART_PLATES: (Partial<PlateSpec> | null | undefined)[] = [
  {
    width: '38vw',
    height: '72vh',
    left: '4%',
    top: '13%',
  },
  {
    width: '118vw',
    height: '118vh',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  {
    width: '112vw',
    height: '112vh',
    left: '48%',
    top: '52%',
    transform: 'translate(-50%, -50%)',
  },
  {
    width: 'min(300px, 34vw)',
    height: 'min(400px, 44vh)',
    left: '56%',
    top: '24%',
  },
  {
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    opacity: 0.5,
  },
  {
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    opacity: 0.3,
  },
]