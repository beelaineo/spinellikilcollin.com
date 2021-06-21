import { useEffect, useState } from 'react'

import {
  ShopifyProduct,
  ShopifySourceProduct,
  ShopifyProductVariant,
  ShopifyProductOption,
  ShopifySourceProductVariant,
} from '../../types'

const DELIMITER = ' / '
const CURRENCY = 'USD'
const LOCALE = 'en-us'

export const insideIframe = (): boolean => {
  return window !== window.parent
}

export const findVariant = (product: ShopifyProduct, vid: string) => {
  return product?.variants?.find((variant) => {
    return variant?.title === vid
  })
}

export const hydrateSize = (
  product: ShopifyProduct,
  s: any,
  color: string | null = '',
) => {
  const sizes = product?.options?.find((option) => {
    return option?.name === 'Size'
  })
  if (sizes && sizes.values && sizes.values.length > 0) {
    return sizes?.values?.map((size) => {
      let key
      if (color) {
        key = `${color}${DELIMITER}${size?.value}`
      } else {
        key = `${size?.value}`
      }
      const variant = findVariant(product, key)
      if (
        variant &&
        variant.sourceData &&
        variant.sourceData.availableForSale
      ) {
        const price = variant.sourceData.priceV2
        return s()
          .name(size?.value)
          .price((pr) =>
            pr.currency(price?.currencyCode).current(price?.amount),
          )
          .sku(variant.shopifyVariantID)
      }
    })
  } else {
    const key = `${color}`
    const variant = findVariant(product, key)
    if (variant && variant.sourceData && variant.sourceData.availableForSale) {
      const price = variant.sourceData.priceV2
      return [
        s()
          .name(product.title)
          .price((pr) =>
            pr.currency(price?.currencyCode).current(price?.amount),
          )
          .sku(variant.shopifyVariantID),
      ]
    }
  }
}

export const hydrate = (product: ShopifyProduct, v: any) => {
  const colors = product?.options?.find((option) => {
    return option?.name === 'Color'
  })

  const sizes = product?.options?.find((option) => {
    return option?.name === 'Size'
  })

  if (colors && colors.values && colors.values.length > 0) {
    return colors.values.map((color) => {
      let variant,
        key,
        image: string[] = []

      const sizeValue =
        sizes && sizes.values && sizes.values.length > 0
          ? sizes.values[0]?.value
          : ''
      if (colors && sizeValue) {
        key = `${color?.value}${DELIMITER}${sizeValue}`
      } else {
        key = `${color?.value}${sizeValue}`
      }
      variant = findVariant(product, key)

      if (variant && variant.sourceData) {
        image.push(variant.sourceData?.image?.w800)
      }

      return v()
        .attributes((a) => a.colorName(color?.value))
        .imageUrls(image)
        .sku(variant.shopifyVariantID)
        .name(color?.value)
        .sizes((s) => hydrateSize(product, s, color?.value))
    })
  } else {
    let variant,
      key,
      image: string[] = []
    if (sizes) {
      key =
        sizes && sizes.values && sizes.values.length > 0
          ? sizes.values[0]?.value
          : ''
      variant = findVariant(product, key)
      if (variant && variant.sourceData) {
        image.push(variant.sourceData?.image?.w800)
      }
    }
    return [
      v()
        .sku(variant.shopifyVariantID)
        .name('No Color Option')
        .imageUrls(image)
        .sizes((s) => hydrateSize(product, s)),
    ]
  }
}

type Hook = {
  (product: ShopifyProduct): T
}
const useFactory = (): Hook => {
  return (product: ShopifyProduct) => {
    const description =
      product?.sourceData && product?.sourceData?.description
        ? product.sourceData.description
        : ''

    let currency =
      product?.sourceData?.priceRange?.minVariantPrice?.currencyCode
    currency = currency ? currency : CURRENCY

    const shopifyId = product.shopifyId

    return function (factory) {
      return factory
        .currency(currency)
        .locale(LOCALE)
        .product((p) =>
          p
            .defaultVariationIndex(0)
            .description(description)
            .name(product.title)
            .sku(shopifyId)
            .variations((v) => hydrate(product, v)),
        )
    }
  }
}

export default useFactory
