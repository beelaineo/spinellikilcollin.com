import { getLocationSearchHash } from './links'
import { getIdFromBase64 } from './parsing'
import { ShopifyProduct } from '../types'

const event = (name, eventData = {}) => {
  window.ttq('track', name, eventData)
}

const viewContent = (eventData = {}) => {
  event('ViewContent', eventData)
}

const addToCart = (eventData = {}) => {
  event('AddToCart', eventData)
}

type TT_VIEW_CONTENT = {
  content_type: 'product'
  content_id: string
  content_category?: string
  content_name?: string
  value?: number
  currency?: string
}

export const reportTTPageView = () => {
  event('ViewContent')
}

export const reportTTAddToCart = (product: ShopifyProduct): void => {
  let contentName
  let template: TT_VIEW_CONTENT
  const hash = getLocationSearchHash(window.location.search)
  const productId = getIdFromBase64(hash)
  if (productId) {
    template = {
      content_type: 'product',
      content_id: productId,
    }

    const variants = product.variants
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
          template['value'] = parseFloat(variant.sourceData.priceV2.amount)
        }
        if (variant.sourceData.priceV2.currencyCode) {
          template['currency'] = variant.sourceData.priceV2.currencyCode
        }
      }

      if (product.sourceData && product.sourceData.productType) {
        template['content_category'] = product.sourceData.productType
      }
      addToCart(template)
    }
  }
}

export const reportTTViewContent = (product: ShopifyProduct): void => {
  let contentName
  let template: TT_VIEW_CONTENT
  const hash = getLocationSearchHash(window.location.search)
  const productId = getIdFromBase64(hash)
  if (productId) {
    template = {
      content_type: 'product',
      content_id: productId,
    }

    const variants = product.variants
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
          template['value'] = parseFloat(variant.sourceData.priceV2.amount)
        }
        if (variant.sourceData.priceV2.currencyCode) {
          template['currency'] = variant.sourceData.priceV2.currencyCode
        }
      }

      if (product.sourceData && product.sourceData.productType) {
        template['content_category'] = product.sourceData.productType
      }
      viewContent(template)
    }
  }
}
