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
export const INVENTORY_FILTER = 'INVENTORY_FILTER'
export const FILTER_SINGLE = 'FILTER_SINGLE'

export interface PriceRangeFilterConfiguration {
  filterType: typeof PRICE_RANGE_FILTER
  key: string
  minPrice: number
  maxPrice: number
}

export interface InventoryFilterConfiguration {
  filterType: typeof INVENTORY_FILTER
  key: string
  label: string
  applyFilter: boolean
  minPrice?: number
  maxPrice?: number
}

export interface FilterMatchGroup {
  filterType: typeof FILTER_MATCH_GROUP
  matches: FilterMatch[]
  minPrice?: number
  maxPrice?: number
}

export interface FilterSingleConfiguration {
  filterType: typeof FILTER_SINGLE
  key: string
  matches: FilterMatch[]
  minPrice?: number
  maxPrice?: number
}

type FilterGroup =
  | FilterMatchGroup
  | PriceRangeFilterConfiguration
  | InventoryFilterConfiguration
  | FilterSingleConfiguration

export type FilterConfiguration = Array<
  | FilterMatchGroup
  | PriceRangeFilterConfiguration
  | InventoryFilterConfiguration
  | FilterSingleConfiguration
>
