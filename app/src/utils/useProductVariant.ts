import * as React from 'react'
import { definitely } from './data'
import { Product, ShopifyProductVariant } from '../types'

const { useState } = React

interface Options {
  initialVariant?: string | 'first' | 'last'
  shopifyVariant?: string
}

// interface Variant extends SourceVariant {
//   __typename: any
// }

export interface UseProductVariant {
  currentVariant?: ShopifyProductVariant
  selectVariant: (variantId: string) => void
}

interface ReturnValue {
  currentVariant: ShopifyProductVariant | null
  selectVariant: (id: string) => void
}

export const useProductVariant = (
  product: Product,
  options: Options = {},
): ReturnValue => {
  const { initialVariant, shopifyVariant } = options
  let variants: ShopifyProductVariant[] = []
  if (product?.store?.variants && product?.store?.variants.length > 1) {
    variants = definitely(product?.store?.variants)
    if (variants.length === 0) {
      variants = definitely(product?.store?.variants)
    }
  } else {
    variants = definitely(product?.store?.variants)
    console.log('VARIANT', variants)
  }
  // ? (product?.variants)
  // : []
  if (!variants.length) throw new Error('The supplied product has no variants')

  /**
   * Private Methods
   */
  const findVariant = (variantId: string) => {
    const convertedVariantId = /gid:\/\/shopify\//.test(variantId)
      ? variantId
      : atob(variantId)
    const variant = variants.find(
      (v) => v.shopifyVariantID === convertedVariantId,
    )

    // console.log('product', product)

    // console.log('variantId', variantId)
    // console.log('convertedVariantId', convertedVariantId)
    // console.log('variants in function', variants)

    if (!variant) return variants[0]
    // throw new Error(
    //   `There is no variant with the id "${variantId}" on the product ${product.title}`,
    // )
    return variant
  }

  const getInitialState = () => {
    if (shopifyVariant) {
      const variantStorefrontId =
        'gid://shopify/ProductVariant/' + shopifyVariant
      return findVariant(variantStorefrontId)
    }
    if (!initialVariant || initialVariant === 'first') return variants[0]
    if (initialVariant === 'last') return variants[variants.length - 1]
    return findVariant(initialVariant)
  }

  const [currentVariant, setCurrentVariant] = useState(getInitialState())

  /**
   * Public Methods
   */

  const selectVariant = (variantId: string) => {
    const variant = findVariant(variantId)
    setCurrentVariant(variant)
  }

  return {
    currentVariant,
    selectVariant,
  }
}
