import gql from 'graphql-tag'

import { productQuery } from '../../../pages/products/[productSlug]'
import { Sentry } from '../../../src/services/sentry'
import {
  request,
  shopifySourceProductFragment,
  shopifySourceProductVariantFragment,
} from '../../graphql'

import {
  ShopifyProduct,
  ShopifySourceProduct,
  ShopifyProductVariant,
  ShopifyProductOption,
  ShopifySourceProductVariant,
} from '../../../src/types'
const DELIMITER = ' / '

import { ShowType, INIT, READY, MESSAGE_ID } from './BambuserView'

interface Response {
  allShopifyProduct: ShopifyProduct[]
}

type mesgProps = (url: string) => void

export const queryByHandle = async (handle: string) => {
  // productQuery
  const query = gql`
    query ProductsPageQuery($handle: String) {
      allShopifyProduct(
        where: { handle: { eq: $handle }, archived: { neq: true } }
      ) {
        __typename
        _id
        _key
        title
        shopifyId
        sourceData {
          ...ShopifySourceProductFragment
        }
        options {
          __typename
          name
          values {
            __typename
            _key
            _type
            value
          }
        }
        variants {
          __typename
          shopifyVariantID
          title
          sourceData {
            ...ShopifySourceProductVariantFragment
          }
        }
      }
    }
    ${shopifySourceProductFragment}
    ${shopifySourceProductVariantFragment}
  `

  try {
    const response = await request<Partial<Response>>(query, { handle })
    const products = response?.allShopifyProduct
    const product = products && products.length ? products[0] : null
    return product
  } catch (e) {
    Sentry.captureException(e)
    return null
  }
}

export const onMessage = (callback: mesgProps) => {
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin.indexOf(window.location.hostname) === -1) {
        return
      }
      if (
        event.data &&
        event.data[MESSAGE_ID] &&
        event.data[MESSAGE_ID].indexOf('https://') > -1
      ) {
        callback(event.data[MESSAGE_ID])
      }
    },
    false,
  )
}

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

  const arraymove = (arr, fromIndex, toIndex) => {
    var element = arr[fromIndex]
    arr.splice(fromIndex, 1)
    arr.splice(toIndex, 0, element)
  }

  let collection = colors?.values
  // if ( collection && collection.length > 0) {
  //   arraymove(collection, 2, 0)
  // }

  if (collection && collection.length > 0) {
    return collection.map((color) => {
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
        .name('color?.value')
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
