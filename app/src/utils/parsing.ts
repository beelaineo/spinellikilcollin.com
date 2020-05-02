import { Product } from 'use-shopify'
import { ShopifyProduct } from '../types'

interface ParsedProduct extends Omit<ShopifyProduct, 'sourceData'> {
  sourceData: Product
}

export const parseProduct = (product: ShopifyProduct): ParsedProduct => {
  const sourceData = (product.sourceData as unknown) as Product
  return {
    ...product,
    sourceData,
  }
}
