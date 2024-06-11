import { getLocationSearchHash, getLocationSearchVariantId } from './links'
import { getIdFromBase64 } from './shopify'
import { Product, ShopifyProductVariant } from '../types'

const event = (name, eventData = {}) => {
  window.ttq.track(name, eventData)
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
  description?: string
}

export const reportTTPageView = () => {
  event('ViewContent')
}

export const reportTTAddToCart = (product: Product): void => {
  let contentName
  let template: TT_VIEW_CONTENT
  const hash = getLocationSearchHash(window.location.search)
  const variantId = getLocationSearchVariantId(window.location.search)
  const productId = getIdFromBase64(hash)

  if (productId) {
    template = {
      content_type: 'product',
      content_id: productId,
    }

    const variants = product.store?.variants
    const variant = variants?.find((v) => {
      return v?.shopifyVariantID === variantId
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
      addToCart(template)
    }
  }
}

export const reportTTViewContent = (product: Product): void => {
  let contentName
  let template: TT_VIEW_CONTENT
  const hash = getLocationSearchHash(window.location.search)
  const variantId = getLocationSearchVariantId(window.location.search)
  const productId = getIdFromBase64(hash)
  if (productId) {
    template = {
      content_type: 'product',
      content_id: productId,
    }

    const variants = product.store?.variants
    const variant = variants?.find((v) => {
      return v?.shopifyVariantID === variantId
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
          template['value'] = variant.sourceData?.priceV2.amount
        }
        if (variant.sourceData.priceV2.currencyCode) {
          template['currency'] = variant.sourceData.priceV2.currencyCode
        }
      }

      if (product.store?.productType) {
        template['content_category'] = product.store?.productType
      }
      viewContent(template)
    }
  }
}

export const reportTTViewContentImpression = (
  product: Product,
  variant?: any,
): void => {
  // content_type, quantity, description, content_id, currency, value
  let contentName
  let template: TT_VIEW_CONTENT
  const variantId = variant?.id
  const productId = product?.shopifyId
  if (productId) {
    template = {
      content_type: 'product',
      content_id: productId,
    }

    contentName = `${product.title}`
    if (variant && variant.selectedOptions && variant.selectedOptions.length) {
      variant.selectedOptions
        .filter((o) => o?.name !== 'Size')
        .map((o) => {
          if (['Color', 'Style', 'Material'].includes(o?.name)) {
            contentName = `${o?.value}`
          }
        })
      template['content_name'] = contentName
    }

    if (variant?.priceV2) {
      if (variant.priceV2.amount) {
        template['value'] = parseFloat(variant.priceV2.amount)
      }
      if (variant.priceV2.currencyCode) {
        template['currency'] = variant.priceV2.currencyCode
      }
    }

    if (product.store && product.store?.productType) {
      template['content_category'] = product.store?.productType
    }
    viewContent(template)
  }
}
