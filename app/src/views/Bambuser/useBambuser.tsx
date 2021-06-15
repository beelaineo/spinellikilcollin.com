import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { config } from '../../../src/config'
const { BAMBUSER_SCRIPT } = config
import { Sentry } from '../../../src/services/sentry'
import { request } from '../../graphql'

import { productQuery } from '../../../pages/products/[productSlug]'

import {
  ShopifyProduct,
  ShopifySourceProduct,
  ShopifyProductVariant,
  ShopifyProductOption,
  ShopifySourceProductVariant,
} from '../../../src/types'

import { ShowType, INIT, READY, MESSAGE_ID } from './Bambuser'
import { getLocaltionSearchHash } from '../../utils/links'
import { getIdFromBase64 } from '../../utils/parsing'
export type BambuserTuple = [boolean, (show: ShowType) => void]

type mesgProps = (url: string) => void
const DELIMITER = ' / '

interface ProductQueryResult {
  productByHandle: ShopifyProduct
  allShopifyProducts: [ShopifyProduct]
}
interface Response {
  allShopifyProduct: ShopifyProduct[]
}
interface ProductProps {
  productData: ShopifyProduct
}

const queryByHandle = async (handle: string) => {
  const query = gql`
    query ProductsPageQuery($handle: String) {
      allShopifyProduct(
        where: { handle: { eq: $handle }, archived: { neq: true } }
      ) {
        title
        shopifyId
        sourceData {
          description
        }
      }
    }
  `

  try {
    const response = await request<Response>(productQuery, { handle })
    const products = response?.allShopifyProduct
    const product = products && products.length ? products[0] : null

    return product
  } catch (e) {
    Sentry.captureException(e)
    return null
  }
}

const findVariant = (product: ShopifyProduct, vid: string) => {
  return product?.variants?.find((variant) => {
    return variant?.title === vid
  })
}

const hydrateSize = (
  product: ShopifyProduct,
  s: any,
  color: string | null = '',
) => {
  const sizes = product?.options?.find((option) => {
    return option?.name === 'Size'
  })
  console.log('>>><<< sizes: ', sizes)
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
          .sku('sku')
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
          .sku('sku'),
      ]
    }
  }
}

const hydrate = (product: ShopifyProduct, v: any) => {
  const colors = product?.options?.find((option) => {
    return option?.name === 'Color'
  })

  const sizes = product?.options?.find((option) => {
    return option?.name === 'Size'
  })
  console.log('>>>> response: ', product)

  if (colors && colors.values && colors.values.length > 0) {
    return colors?.values?.map((color) => {
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
        .sku('sku')
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
        .sku('sku')
        .name('No Color Option')
        .imageUrls(image)
        .sizes((s) => hydrateSize(product, s)),
    ]
  }
}

const useBambuser = (initialValue?: boolean): BambuserTuple => {
  const [isReady, setReady] = useState<boolean>((initialValue = false))

  const insideIframe = (): boolean => {
    return window !== window.parent
  }

  let addShow = (show: ShowType): void => {
    if (window[INIT]) {
      window[INIT](show)
    }
  }
  let linkProduct = (url: string): void => {
    if (url && url.indexOf('/products') > -1) {
      history.pushState({}, '', url)
    }
  }
  let onMessage = (callback: mesgProps) => {
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
  useEffect(() => {
    // Only execute when not in iframe
    if (!window[INIT] && !insideIframe()) {
      window[READY] = (player) => {
        onMessage((url) => {
          window.location.href = url
        })

        player.configure({
          buttons: {
            checkout: player.BUTTON.LINK,
            // dismiss: player.BUTTON.NONE,
            //product: player.BUTTON.NONE,
          },
          floatingPlayer: {
            // IFRAME, MANUAL, IFRAME_SRCDOC
            navigationMode: player.FLOATING_PLAYER_NAVIGATION_MODE.IFRAME,
          },
        })
        player.on(player.EVENT.NAVIGATE_BEHIND_TO, function (event) {
          console.log('>>>>>NAVIGATE_BEHIND_TO', event)
          // if ( event.url ) {
          //   linkProduct(event.url)
          // }
          /*
           * Triggered when a product is clicked.
           *
           * **event.url** holds the targetted url specific in Bambuser Dashboard
           *
           * 1. Change url inside browser address bar
           * eg. history.pushState({}, null, event.url)
           *
           * 2. Load page content without reloading the page
           * eg. Use React Router, AJAX , ...
           *
           */
          // Your codes here
        })

        player.on(player.EVENT.READY, function () {
          console.log('>>>>> READY')
        })
        player.on(player.EVENT.ADD_TO_CART, function (event) {
          console.log('>>>>> ADD_TO_CART', event)
        })
        player.on(player.EVENT.PROVIDE_PRODUCT_DATA, function (event) {
          console.log('>>>>> PROVIDE_PRODUCT_DATA', event)
          event.products.forEach(
            async ({ ref: sku, id: productId, url: publicUrl }) => {
              console.log('ref:', sku, 'id:', productId, 'url:', publicUrl)

              const hash = getLocaltionSearchHash(publicUrl)
              const pid = getIdFromBase64(hash)
              const SHOPIFY_PRODUCT_URL_HANDLE_REGEX = /\/products\/(.[\w\d-+]+)/
              let handle,
                handles = SHOPIFY_PRODUCT_URL_HANDLE_REGEX.exec(publicUrl)
              if (handles && handles.length === 2) {
                handle = handles[1]
              }

              console.log('>>>>', pid, handle)

              const product: ShopifyProduct | null = await queryByHandle(handle)

              const description =
                product?.sourceData && product?.sourceData?.description
                  ? product.sourceData.description
                  : ''

              if (product) {
                player.updateProduct(productId, (factory) =>
                  factory
                    .currency('USD')
                    .locale('en-US')
                    .product((p) =>
                      p
                        .defaultVariationIndex(0)
                        .description(description)
                        .name(product.title)
                        .sku('12345')
                        .variations((v) => hydrate(product, v)),
                    ),
                )
              }
            },
          )
        })
        player.on(player.EVENT.UPDATE_ITEM_IN_CART, function (event) {
          console.log('>>>>> UPDATE_ITEM_IN_CART', event)
        })

        player.on(player.EVENT.CHECKOUT, (event) => {
          console.log('>>>>> CHECKOUT', event)
        })
      }

      window[INIT] = (show: ShowType): void => {
        window[INIT].queue.push(show)
      }
      window[INIT].queue = []

      if (!isReady) {
        const script = document.createElement('script')
        script.onload = () => {
          setReady(true)
        }
        script.src = BAMBUSER_SCRIPT
        document.body.appendChild(script)
      }
    }
  }, [isReady])

  return [isReady, addShow]
}

export default useBambuser
