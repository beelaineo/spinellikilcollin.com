import imageUrlBuilder from '@sanity/image-url'
import {
  Maybe,
  SanityRawImage,
  Image as SanityImage,
  RichImage,
  ShopifySourceImage,
} from '../../types'
import { sanityClient } from '../../services/sanity'

export type ImageType =
  | ShopifySourceImage
  | SanityImage
  | RichImage
  | SanityRawImage

const builder = imageUrlBuilder(sanityClient)

export interface ImageDetails {
  src: string | null | void
  altText?: string | null
  srcSet?: string | null
  srcSetWebp?: string | null
  // fileType: string
  // TODO srcSet
  // TODO srcSetWebP
  // TODO dimensions: Dimensions
  // TODO fileType: fileType
}

interface ImageWidth {
  width: number
  src: Maybe<string>
}

const buildSrcSet = (widths: ImageWidth[]): string =>
  widths.map(({ src, width }) => `${src} ${width}w`).join(', ')

interface ImageUrls {
  src?: Maybe<string>
  srcSet: string
}

const defaultSizes = [100, 300, 600, 800, 1200, 1600]

const getSanityImageDetails = (
  image: SanityRawImage | RichImage,
  sizes = defaultSizes,
): ImageDetails => {
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
        //
        .width(width)
        .format('webp')
        .url(),
    })),
  )

  console.log(srcSet)
  const { altText } = image

  return { src, srcSet, srcSetWebp, altText }
}

const getShopifyImageDetails = (image: ShopifySourceImage): ImageDetails => {
  const src = image.originalSrc
  const { altText } = image
  const { w100, w300, w800, w1200, w1600 } = image
  const srcSet = `${w100} 100w, ${w300} 300w, ${w800} 800w, ${w1200} 1200w, ${w1600} 1600w`
  return { src, srcSet, altText }
}

// Type Guards
//
const isSanityRawImage = (image: ImageType): image is SanityRawImage =>
  Boolean(image._type && /image|richImage/.test(image._type))

const isSanityImage = (image: ImageType): image is RichImage =>
  Boolean(image.__typename && /Image|RichImage/.test(image.__typename))

const isShopifyImage = (image: ImageType): image is ShopifySourceImage =>
  image.__typename === 'ShopifySourceImage'

export const getImageDetails = (image: ImageType): ImageDetails => {
  if (isSanityRawImage(image)) return getSanityImageDetails(image)
  if (isSanityImage(image)) return getSanityImageDetails(image)
  if (isShopifyImage(image)) return getShopifyImageDetails(image)

  console.warn('Could not parse image details:', image)
  throw new Error(
    'Could not parse image details. See the console for more information.',
  )
}
