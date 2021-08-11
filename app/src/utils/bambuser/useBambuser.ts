import { useState, useEffect, useRef, useCallback } from 'react'
import { config } from '../../config'
import { ShopifyProduct } from '../../types'
import { CheckoutLineItemInput } from '../../providers/ShopifyProvider/types'
import { useShopify } from '../../providers'
import { BambuserShowType } from '../../types'
import { BAMBUSER_INIT, BAMBUSER_READY } from '../../constants'
import { getLocationSearchHash } from '../../utils/links'
// import { queryByHandle } from './utils'
import useFactory from './useFactory'
import { ShopifyStorefrontCheckout } from '../../types/generated-shopify'

const { SHOPIFY_CHECKOUT_DOMAIN: domain } = config

type ReturnValue = { addShow: (show: BambuserShowType) => void }

type BambuserLineItem = {
  sku: string
  quantity?: number
}
const CURRENCY = 'USD'
const LOCALE = 'en-us'

export const useBambuser = (): ReturnValue => {
  const {
    bambuserLineItemsAdd,
    bambuserLineItemsUpdate,
    bambuserFetchCheckout,
    updateLineItem,
    addLineItem,
    addToCart,
    checkout,
  } = useShopify()

  const [bambuserCart, setCart] = useState<CheckoutLineItemInput[]>([])
  const setup = useFactory()

  const cartRef = useRef(bambuserCart)

  const addShow = (show: BambuserShowType): void => {
    console.log(window[BAMBUSER_INIT], show)
    if (window[BAMBUSER_INIT]) {
      window[BAMBUSER_INIT](show)
    }
  }

  // const updateCart = (updated: BambuserLineItem): void => {
  //   if (cartRef.current) {
  //     let cartItems
  //     let cartItem, cartIndex
  //     cartItems = cartRef.current.map((item, index) => {
  //       if (item.variantId === updated.sku) {
  //         console.log('>>>>', item.variantId, updated.quantity)
  //         cartIndex = index
  //         return {
  //           variantId: updated.sku,
  //           quantity: updated.quantity,
  //         }
  //       } else {
  //         return item
  //       }
  //     })
  //     console.log('>>>>> update Cart', cartItems)
  //     setCart((state) => {
  //       cartRef.current = [...cartItems]
  //       return cartRef.current
  //     })
  //   }
  // }

  useEffect(() => {
    if (!window[BAMBUSER_INIT]) {
      window[BAMBUSER_READY] = (player) => {
        // onMessage((url) => {
        //   window.location.href = url
        // })

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

        player.on(player.EVENT.BAMBUSER_READY, async function () {
          //console.log('>>>>> Player BAMBUSER_READY', checkout)
        })
        player.on(
          player.EVENT.ADD_TO_CART,
          async (addedItem: BambuserLineItem, callback) => {
            // console.log('>>>>> ADD_TO_CART', addedItem, callback)

            // addToCart({
            //   variantId: addedItem.sku,
            //   quantity: 1,
            // })
            // callback(true)

            addLineItem({
              variantId: addedItem.sku,
              quantity: 1,
            })
              .then(() => {
                callback(true) // item successfully added to cart
              })
              .catch((error) => {
                console.log('>>>> error:', error)
                callback(false)
                // if (error.type === 'out-of-stock') {
                //   // Unsuccessful due to 'out of stock'
                //   callback({
                //     success: false,
                //     reason: 'out-of-stock',
                //   })
                // } else {
                //   // Unsuccessful due to other problems
                //   callback(false)
                // }
              })
          },
        )

        player.on(
          player.EVENT.UPDATE_ITEM_IN_CART,
          async function (updatedItem: BambuserLineItem, callback) {
            if (updatedItem?.quantity && updatedItem.quantity > 0) {
              try {
                await updateLineItem({
                  quantity: updatedItem.quantity,
                  variantId: updatedItem.sku,
                })
                callback(true)
              } catch (error) {
                const reason = error.type
                if (reason) {
                  callback({
                    success: false,
                    reason,
                  })
                } else {
                  callback(false)
                }
              }
            }
          },
        )

        player.on(player.EVENT.CHECKOUT, async () => {
          let bambuserCheckout: ShopifyStorefrontCheckout | undefined

          if (checkout) {
            bambuserCheckout = checkout
          } else {
            bambuserCheckout = await bambuserFetchCheckout()
          }
          if (bambuserCheckout) {
            const webUrl = bambuserCheckout?.webUrl
            if (webUrl) {
              const { protocol, pathname, search } = new URL(webUrl)
              const url: string = `${protocol}//${domain}${pathname}${search}`
              window.location.href = url
            }
          }
        })

        player.on(player.EVENT.PROVIDE_PRODUCT_DATA, function (event) {
          // console.log('>>>>> PROVIDE_PRODUCT_DATA', event)

          event.products.forEach(
            async ({ ref: sku, id: productId, url: publicUrl }) => {
              const hash = getLocationSearchHash(publicUrl)
              // const pid = getIdFromBase64(hash)
              const SHOPIFY_PRODUCT_URL_HANDLE_REGEX =
                /\/products\/(.[\w\d-+]+)/
              const handles = SHOPIFY_PRODUCT_URL_HANDLE_REGEX.exec(publicUrl)
              let handle

              if (handles && handles.length === 2) {
                handle = handles[1]
              }

              const product: ShopifyProduct | null = await queryByHandle(handle)

              if (product) {
                player.updateProduct(productId, setup(product, handle, hash))
              }
            },
          )
        })
      }

      // @ts-ignore
      window[BAMBUSER_INIT].queue = []
      // @ts-ignore
      window[BAMBUSER_INIT] = (show: BambuserShowType): void => {
        // @ts-ignore
        window[BAMBUSER_INIT].queue.push(show)
      }
    }
  }, [])

  return { addShow }
}
