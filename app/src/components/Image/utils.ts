import imageUrlBuilder from '@sanity/image-url'
import {
  Maybe,
  SanityRawImage,
  Image as SanityImage,
  RichImage,
  ShopifySourceImage,
} from '../../types'
import { config } from '../../config'

const { SANITY_PROJECT_ID, SANITY_DATASET } = config

export type ImageType =
  | ShopifySourceImage
  | SanityImage
  | RichImage
  | SanityRawImage

const builder = imageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
})

export interface ImageDetails {
  src: string | null | void
  altText?: string | null
  srcSet?: string | null
  srcSetWebp?: string | null
  caption?: string | null
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
): ImageDetails | null => {
  if (!image?.asset) return null
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

  const { altText } = image

  // @ts-ignore
  const caption = image._type === 'richImage' ? image?.caption : undefined

  return { caption, src, srcSet, srcSetWebp, altText }
}

const widths = [100, 300, 800, 1200, 1600]

const defaultCrop = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
}

export const getAspectRatio = (
  image?: ImageType | null | void,
): number | void => {
  if (!image) return undefined
  if (isSanityImage(image)) {
    const dimensions = image.asset?.metadata?.dimensions
    if (!dimensions) return undefined
    const crop = image.crop ?? defaultCrop
    const { width, height } = dimensions
    if (!width || !height) {
      return undefined
    }
    const { left, right, bottom, top } = crop
    if (
      left === null ||
      left === undefined ||
      right === null ||
      right === undefined ||
      bottom === null ||
      bottom === undefined ||
      top === null ||
      top === undefined
    ) {
      return height / width
    }
    const w = width * (1 - left - right)
    const h = height * (1 - bottom - top)
    const aspectRatio = h / w
    return aspectRatio
  }
  return undefined
}

const getShopifyImageDetails = (
  image: ShopifySourceImage,
): ImageDetails | null => {
  const src = image.originalSrc
  const { altText } = image
  const srcSet = widths
    .map((width) => {
      const key = `w${width}`
      if (!image[key]) return null
      return `${image[key]} ${width}w`
    })
    .filter(Boolean)
    .join(', ')
  return { src, srcSet, altText }
}

// Type Guards
//
const isSanityRawImage = (image: ImageType): image is SanityRawImage =>
  Boolean(image._type && /image|richImage/.test(image._type))

const isSanityImage = (image: ImageType): image is RichImage =>
  Boolean(image.__typename && /^Image|^RichImage/.test(image.__typename)) &&
  /richImage/.test(image._type || '')

const isShopifyImage = (image: ImageType): image is ShopifySourceImage =>
  'originalSrc' in image || image.__typename === 'ShopifySourceImage'

export const getImageDetails = (
  image?: ImageType | null | void,
): ImageDetails | null => {
  if (!image) return null
  if (isShopifyImage(image)) return getShopifyImageDetails(image)
  if (isSanityRawImage(image)) return getSanityImageDetails(image)
  if (isSanityImage(image)) return getSanityImageDetails(image)

  console.warn('Could not parse image details:', image)
  throw new Error(
    'Could not parse image details. See the console for more information.',
  )
}

export const getImageKey = (image: ImageType): string => {
  if (isShopifyImage(image)) return image.id || 'some-key'
  if (isSanityRawImage(image)) return image._key || 'some-key'
  if (isSanityImage(image)) return image._key || 'some-key'

  console.warn('Could not get image key:', image)
  throw new Error(
    'Could not get the image key. See the console for more information.',
  )
}
