import { ShopifyProduct, ShopifyCollection } from './generated-sanity'

export interface GroqShopifyCollection
  extends Omit<ShopifyCollection, '__typename'> {
  _type: 'shopifyCollection'
}

export interface GroqShopifyProduct extends Omit<ShopifyProduct, '__typename'> {
  _type: 'shopifyProduct'
}
