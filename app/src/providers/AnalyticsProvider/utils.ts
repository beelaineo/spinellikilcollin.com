import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceProduct,
  ShopifySourceProductVariant,
  Maybe,
} from '../../types'
import { SelectedProduct, EcommerceObject } from './types'

const getVariantSourceData = (
  variant: ShopifyProductVariant | ShopifySourceProductVariant,
): ShopifySourceProductVariant => {
  if (variant.__typename === 'ShopifySourceProductVariant') return variant
  const sourceData = variant?.sourceData
  if (!sourceData) throw new Error('No product source data was provided')
  return sourceData
}

const getProductSourceData = (
  product: ShopifyProduct | ShopifySourceProduct,
): ShopifySourceProduct => {
  if (product.__typename === 'ShopifySourceProduct') return product
  const sourceData = product?.sourceData
  if (!sourceData) throw new Error('No product source data was provided')
  return sourceData
}

interface ProductExtras {
  list?: string
  position?: number
}

const assertExists = <T>(item?: Maybe<T>): T => {
  if (!item) throw new Error('nope')
  return item
}

export const parseProduct = (
  selectedProduct: SelectedProduct,
  { position, list }: ProductExtras,
): EcommerceObject => {
  const product = getProductSourceData(selectedProduct.product)
  const variant = getVariantSourceData(selectedProduct.variant)

  const formattedPrice = variant?.priceV2?.amount
    ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(parseFloat(variant.priceV2.amount))
        .replace(/^\$/, '')
    : undefined

  const values: EcommerceObject = {
    name: assertExists(product.title),
    id: assertExists(product.id),
    price: assertExists(formattedPrice),
    category: assertExists(product.productType),
    variant: assertExists(variant.title),
    position,
    list,
  }
  return values
}
