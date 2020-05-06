import imageUrlBuilder from '@sanity/image-url'
import { Maybe, SanityRawImage } from '../types'
import { sanityClient } from '../services/sanity'

const builder = imageUrlBuilder(sanityClient)

interface ImageWidth {
  width: number
  src: Maybe<string>
}

export const buildSrcSet = (widths: ImageWidth[]): string =>
  widths.map(({ src, width }) => `${src} w${width}`).join(', ')

interface ImageUrls {
  src: Maybe<string>
  srcSet: string
  serSetWebp
}

export const getSanityImageUrls = (
  image: SanityRawImage,
  sizes: number[] = [],
): ImageUrls => {
  const source = builder.image(image)
  const src = source.url()
  const srcSet = buildSrcSet(
    sizes.map((width) => ({
      width,
      src: source.width(width).url(),
    })),
  )
  const srcSetWebp = buildSrcSet(
    sizes.map((width) => ({
      width,
      src: source
        .width(width)
        .format('webp')
        .url(),
    })),
  )

  return { src, srcSet, srcSetWebp }
}
