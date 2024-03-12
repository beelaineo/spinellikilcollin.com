import { getLocationSearchHash } from './links'
import { getIdFromBase64 } from './shopify'

import { config } from '../../src/config'
import { Product } from '../types'
const { FB_PRDOUCT_CATALOG_ID } = config

export const pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}, eventData = {}) => {
  window.fbq('track', name, options, eventData)
}

export const viewContent = (options = {}, eventData = {}) => {
  event('ViewContent', options, eventData)
}

export const addToCart = (options = {}, eventData = {}) => {
  event('AddToCart', options, eventData)
}

type FB_VIEW_CONTENT = {
  content_type: string
  product_catalog_id: string
  content_ids: string[]
  ['content_category']?: string
  ['content_name']?: string
  value?: number
  currency?: string
}

export const reportFBAddToCart = (product: Product): void => {
  // console.log('reportFBAddToCart', product)
  const content_ids: string[] = []
  const event_id =
    'ATC_' + new Date().getTime() + Math.floor(100000 + Math.random() * 900000)
  const eventData = { eventID: event_id }
  let contentName
  let template: FB_VIEW_CONTENT
  const hash = getLocationSearchHash(window.location.search)
  // console.log('hash', hash)
  const variantId = getIdFromBase64(hash)
  const shopifyVariantID = `gid://shopify/ProductVariant/${variantId}`
  // console.log('shopifyVariantID', shopifyVariantID)
  if (shopifyVariantID) {
    content_ids.push(shopifyVariantID)

    template = {
      content_type: 'product',
      product_catalog_id: `${FB_PRDOUCT_CATALOG_ID}`,
      content_ids: content_ids,
    }
    const variants = product.store?.variants
    // console.log('variants', variants)
    const variant = variants?.find((v) => {
      return v?.shopifyVariantID === shopifyVariantID
    })

    // console.log('variant', variant)

    if (variant && variant.sourceData) {
      contentName = `${product.title}`
      if (
        variant.sourceData.selectedOptions &&
        variant.sourceData.selectedOptions.length
      ) {
        variant.sourceData.selectedOptions.forEach((o) => {
          contentName = `${contentName} - ${o?.name}:${o?.value}`
        })
        template['content_name'] = contentName
      }

      if (variant.sourceData.priceV2) {
        if (variant.sourceData.priceV2.amount) {
          template['value'] = variant.sourceData.priceV2.amount
        }
        if (variant.sourceData.priceV2.currencyCode) {
          template['currency'] = variant.sourceData.priceV2.currencyCode
        }
      }

      if (product.store && product.store.productType) {
        template['content_category'] = product.store.productType
      }
      addToCart(template, eventData)
    }
  }
}

export const reportFBViewContent = (product: Product): void => {
  const content_ids: string[] = []
  const event_id =
    'VC_' + new Date().getTime() + Math.floor(100000 + Math.random() * 900000)
  const eventData = { eventID: event_id }
  let contentName
  let template: FB_VIEW_CONTENT
  const hash = getLocationSearchHash(window.location.search)
  const productId = getIdFromBase64(hash)
  if (productId) {
    content_ids.push(productId)

    template = {
      content_type: 'product',
      product_catalog_id: `${FB_PRDOUCT_CATALOG_ID}`,
      content_ids: content_ids,
    }

    const variants = product.store?.variants
    const variant = variants?.find((v) => {
      return v?.shopifyVariantID === hash
    })

    if (variant && variant.sourceData) {
      contentName = `${product.title}`
      if (
        variant.sourceData.selectedOptions &&
        variant.sourceData.selectedOptions.length
      ) {
        variant.sourceData.selectedOptions.forEach((o) => {
          contentName = `${contentName} - ${o?.name}:${o?.value}`
        })
        template['content_name'] = contentName
      }

      if (variant.sourceData.priceV2) {
        if (variant.sourceData.priceV2.amount) {
          template['value'] = variant.sourceData.priceV2.amount
        }
        if (variant.sourceData.priceV2.currencyCode) {
          template['currency'] = variant.sourceData.priceV2.currencyCode
        }
      }

      if (product.store && product.store.productType) {
        template['content_category'] = product.store.productType
      }
      viewContent(template, eventData)
    }
  }
}
