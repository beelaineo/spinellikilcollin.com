import { CollectionBlock as BaseCollectionBlock } from './generated-sanity'
export type { ShopifyStorefrontMoneyV2 } from './generated-shopify'
export * from './generated-sanity'
export * from './misc'
export * from './richtext'
export * from './postmark'

export interface CollectionBlock extends BaseCollectionBlock {
  body?: any
}
