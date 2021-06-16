import { useState, useEffect } from 'react'
import { config } from '../../../src/config'
const { BAMBUSER_SCRIPT, SHOPIFY_CHECKOUT_DOMAIN: domain } = config

import {
  ShopifyProduct,
  ShopifySourceProduct,
  ShopifyProductVariant,
  ShopifyProductOption,
  ShopifySourceProductVariant,
} from '../../../src/types'

import {
  useShopify,
  useAnalytics,
  CurrentProductProvider,
} from '../../providers'

import { ShowType, INIT, READY, MESSAGE_ID } from './Bambuser'
import { getLocaltionSearchHash } from '../../utils/links'
import { getIdFromBase64 } from '../../utils/parsing'
import { queryByHandle, hydrate, insideIframe } from './utils'

type BambuserTuple = [boolean, (show: ShowType) => void]
type bambuserAdded = {
  sku: string
  quantity?: number
}
const CURRENCY = 'USD'
const LOCALE = 'en-us'

const useBambuser = (initialValue?: boolean): BambuserTuple => {
  const [isReady, setReady] = useState<boolean>((initialValue = false))
  const {
    checkout,
    addLineItem,
    updateLineItem,
    checkoutLineItemsAdd,
  } = useShopify()

  let addShow = (show: ShowType): void => {
    if (window[INIT]) {
      window[INIT](show)
    }
  }

  useEffect(() => {
    console.log('>>>>><<<< useEffect checkout state', checkout)
  }, [checkout])

  useEffect(() => {
    // Only execute when not in iframe
    if (!window[INIT]) {
      window[READY] = (player) => {
        // onMessage((url) => {
        //   window.location.href = url
        // })

        player.configure({
          currency: CURRENCY,
          locale: LOCALE,
          buttons: {
            // checkout: player.BUTTON.NONE,
            // dismiss: player.BUTTON.NONE,
            // product: player.BUTTON.MINIMIZE
          },
          floatingPlayer: {
            // IFRAME, MANUAL, IFRAME_SRCDOC
            navigationMode: player.FLOATING_PLAYER_NAVIGATION_MODE.IFRAME,
          },
        })
        //player.on(player.EVENT.NAVIGATE_BEHIND_TO, function (event) {
        // console.log('>>>>>NAVIGATE_BEHIND_TO', event)
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
        // })

        player.on(player.EVENT.READY, async function () {
          console.log('>>>>> Player READY', checkout)
        })
        player.on(
          player.EVENT.ADD_TO_CART,
          async (addedItem: bambuserAdded, callback) => {
            console.log('>>>>> ADD_TO_CART', addedItem, callback)
            //return callback(true)

            console.log('>>>>> before add to cart', checkout)
            addLineItem({
              variantId: addedItem.sku,
              quantity: 1,
            })
              .then(() => {
                callback(true) // item successfully added to cart
              })
              .catch((error) => {
                if (error.type === 'out-of-stock') {
                  // Unsuccessful due to 'out of stock'
                  callback({
                    success: false,
                    reason: 'out-of-stock',
                  })
                } else {
                  // Unsuccessful due to other problems
                  callback(false)
                }
              })
          },
        )
        player.on(player.EVENT.PROVIDE_PRODUCT_DATA, function (event) {
          // console.log('>>>>> PROVIDE_PRODUCT_DATA', event)
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

              const product: ShopifyProduct | null = await queryByHandle(handle)
              // console.log('>>>> response: ', product)

              if (product) {
                const description =
                  product?.sourceData && product?.sourceData?.description
                    ? product.sourceData.description
                    : ''

                let currency =
                  product?.sourceData?.priceRange?.minVariantPrice?.currencyCode
                currency = currency ? currency : CURRENCY

                const shopifyId = product.shopifyId

                player.updateProduct(productId, (factory) =>
                  factory
                    .currency(currency)
                    .locale(LOCALE)
                    .product((p) =>
                      p
                        .defaultVariationIndex(0)
                        .description(description)
                        .name(product.title)
                        .sku(shopifyId)
                        .variations((v) => hydrate(product, v)),
                    ),
                )
              }
            },
          )
        })
        player.on(
          player.EVENT.UPDATE_ITEM_IN_CART,
          function (updatedItem, callback) {
            console.log('>>>>> UPDATE_ITEM_IN_CART', updatedItem, callback)

            if (updatedItem.quantity > 0) {
              updateLineItem({
                variantId: updatedItem.sku,
                quantity: updatedItem.quantity,
              })
                .then(() => {
                  // cart update was successful
                  callback(true)
                })
                .catch(function (error) {
                  if (error.type === 'out-of-stock') {
                    callback({
                      success: false,
                      reason: 'out-of-stock',
                    })
                  } else {
                    callback(false)
                  }
                })
            }
          },
        )

        player.on(player.EVENT.CHECKOUT, () => {
          console.log('>>>>> CHECKOUT', checkout)
          const webUrl = checkout?.webUrl
          if (webUrl) {
            const { protocol, pathname, search } = new URL(webUrl)
            const url: string = `${protocol}//${domain}${pathname}${search}`
            window.location.href = url
          }
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
