import { Product, Variant, CheckoutLineItem } from 'use-shopify'
import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceProduct,
  ShopifySourceProductVariant,
  Maybe,
} from '../../types'
import { SelectedProduct, EcommerceObject } from './types'

const getVariantSourceData = (
  variant: ShopifyProductVariant | ShopifySourceProductVariant | Variant,
): ShopifySourceProductVariant | Variant => {
  if (
    '__typename' in variant &&
    variant.__typename === 'ShopifySourceProductVariant'
  ) {
    return variant
  }

  if (
    '__typename' in variant &&
    variant.__typename === 'ShopifyProductVariant'
  ) {
    const sourceData = variant?.sourceData
    if (!sourceData) throw new Error('No product source data was provided')
    return sourceData
  }

  return variant
}

const getProductSourceData = (
  product: ShopifyProduct | ShopifySourceProduct | Product | CheckoutLineItem,
): ShopifySourceProduct | Product | CheckoutLineItem => {
  if (product.__typename === 'CheckoutLineItem') return product
  if (product.__typename === 'ShopifySourceProduct') return product
  if (product.__typename === 'Product') return product
  if (product.__typename === 'ShopifyProduct') {
    // @ts-ignore
    const sourceData = product?.sourceData
    if (!sourceData) throw new Error('No product source data was provided')
    return sourceData
  }

  console.error(product)
  throw new Error('Could not get product data')
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
  const { quantity } = selectedProduct
  const product = getProductSourceData(selectedProduct.product)
  const variant = getVariantSourceData(selectedProduct.variant)

  const formattedPrice = variant?.priceV2?.amount
    ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(parseFloat(variant.priceV2.amount.toString()))
        .replace(/^\$/, '')
    : undefined

  const productType = 'productType' in product ? product.productType : undefined
  const values: EcommerceObject = {
    name: assertExists(product.title),
    id: assertExists(product.id),
    price: assertExists(formattedPrice),
    category: productType ?? undefined,
    variant: assertExists(variant.title),
    quantity,
    position,
    list,
  }
  return values
}
