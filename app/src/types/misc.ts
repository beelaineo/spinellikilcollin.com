import { SanityImageHotspot, SanityImageCrop } from './generated-sanity'

/**
 * Used for images returned from a raw JSON (rich text) object
 */
export interface SanityRawImage {
  __typename: void
  _key: string
  _type: 'richImage' | 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  crop: SanityImageCrop
  hotspot: SanityImageHotspot
  altText?: string
}
