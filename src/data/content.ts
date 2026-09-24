export const ARTIST = 'Ethan Angel'

export type StreamingLink = {
  platform: string
  url: string
}

export const STREAMING: StreamingLink[] = [
  {
    platform: 'Spotify',
    url: 'https://open.spotify.com/artist/3mGBBkYBo7iJ6Avb9ZqA31?si=SAxHAZzGTfScWOyzsmqqOA',
  },
  {
    platform: 'Apple Music',
    url: 'https://music.apple.com/us/artist/ethan-angel/1824066483',
  },
  {
    platform: 'YouTube Music',
    url: 'https://music.youtube.com/channel/UCp4F8lTGe-BV919AY8zmVqg?si=OuOUqXlwq7IUn2Jk',
  },
]

export type ReleaseFormat = {
  id: string
  label: string
  price?: number
  physical?: boolean
}

export type Release = {
  id: string
  title: string
  year: string
  status: 'upcoming' | 'on-sale' | 'preorder'
  ratio: string
  src?: string
  formats: ReleaseFormat[]
}

export const RELEASES: Release[] = []

export type MerchItem = {
  id: string
  name: string
  price: number
  note?: string
  ratio?: string
  src?: string
  backSrc?: string
  sizes?: string[]
}

export const MERCH: MerchItem[] = []