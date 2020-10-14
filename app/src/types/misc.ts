import {
  SanityImageHotspot,
  SanityImageCrop,
  FilterMatch,
  Maybe,
} from './generated-sanity'

export type MaybeAll<T> = {
  [K in keyof T]?: null | Maybe<T[K]>
}

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

export const PRICE_RANGE_FILTER = 'PRICE_RANGE_FILTER'
export const FILTER_MATCH_GROUP = 'FILTER_MATCH_GROUP'

export interface PriceRangeFilterConfiguration {
  filterType: typeof PRICE_RANGE_FILTER
  key: string
  minPrice: number
  maxPrice: number
}

export interface FilterMatchGroup {
  filterType: typeof FILTER_MATCH_GROUP
  matches: FilterMatch[]
}

type FilterGroup = FilterMatchGroup | PriceRangeFilterConfiguration

export type FilterConfiguration = Array<
  FilterMatchGroup | PriceRangeFilterConfiguration
>
