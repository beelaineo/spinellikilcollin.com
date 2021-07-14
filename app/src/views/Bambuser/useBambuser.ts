import { useState, useEffect, useRef, useCallback } from 'react'
import { config } from '../../config'
const { BAMBUSER_SCRIPT, SHOPIFY_CHECKOUT_DOMAIN: domain } = config

import {
  ShopifyProduct,
  ShopifySourceProduct,
  ShopifyProductVariant,
  ShopifyProductOption,
  ShopifySourceProductVariant,
} from '../../types'

import {
  Checkout,
  CheckoutLineItemInput,
} from '../../providers/ShopifyProvider/types'

import {
  useShopify,
  UseCheckoutValues,
  useAnalytics,
  CurrentProductProvider,
} from '../../providers'

import { ShowType, INIT, READY, MESSAGE_ID } from './BambuserView'
import { getLocationSearchHash } from '../../utils/links'
import { getIdFromBase64 } from '../../utils/parsing'
import { queryByHandle } from './utils'
import useFactory from './useFactory'
import { ShopifyStorefrontCheckout } from '../../types/generated-shopify'
type Hook = [boolean, (show: ShowType) => void]
type BambuserLineItem = {
  sku: string
  quantity?: number
}
const CURRENCY = 'USD'
const LOCALE = 'en-us'

interface Props
  extends Pick<
    UseCheckoutValues,
    | 'bambuserLineItemsAdd'
    | 'bambuserLineItemsUpdate'
    | 'bambuserFetchCheckout'
    | 'checkoutLineItemsUpdate'
    | 'checkout'
  > {}

export const useBambuser = ({
  bambuserLineItemsAdd,
  bambuserLineItemsUpdate,
  bambuserFetchCheckout,
  checkout,
}: Props): Hook => {
  const [isReady, setReady] = useState<boolean>(false)
  const [bambuserCart, setCart] = useState<CheckoutLineItemInput[]>([])
  const setup = useFactory()

  const cartRef = useRef(bambuserCart)
  let addLineItemProxy = useCallback(
    (lineItem: CheckoutLineItemInput) => {
      return bambuserLineItemsAdd([lineItem])
    },
    [isReady],
  )

  let updateLineItemProxy = useCallback(
    (lineItem: CheckoutLineItemInput) => {
      return bambuserLineItemsUpdate([lineItem])
    },
    [isReady],
  )

  let addShow = (show: ShowType): void => {
    if (window[INIT]) {
      window[INIT](show)
    }
  }

  const addToCart = (item: CheckoutLineItemInput): void => {
    setCart((state) => {
      cartRef.current = [...state, item]
      return cartRef.current
    })
  }

  const updateCart = (updated: BambuserLineItem): void => {
    if (cartRef.current) {
      let cartItems
      let cartItem, cartIndex
      cartItems = cartRef.current.map((item, index) => {
        if (item.variantId === updated.sku) {
          console.log('>>>>', item.variantId, updated.quantity)
          cartIndex = index
          return {
            variantId: updated.sku,
            quantity: updated.quantity,
          }
        } else {
          return item
        }
      })
      console.log('>>>>> update Cart', cartItems)
      setCart((state) => {
        cartRef.current = [...cartItems]
        return cartRef.current
      })
    }
  }

  useEffect(() => {
    // console.log('>>>>><<<< useEffect checkout cart', checkout)
    // console.log('>>>>><<<< useEffect bambuser cart', bambuserCart)
  }, [checkout])

  useEffect(() => {
    if (!window[INIT]) {
      window[READY] = (player) => {
        // onMessage((url) => {
        //   window.location.href = url
        // })

        player.configure({
          currency: CURRENCY,
          locale: LOCALE,
          buttons: {
            checkout: player.BUTTON.AUTO,
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
          //console.log('>>>>> Player READY', checkout)
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

            addLineItemProxy({
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
          function (updatedItem, callback) {
            if (updatedItem.quantity > 0) {
              // if (cartRef.current.length > 0) {
              //   updateCart(updatedItem)
              //   callback(true)
              // }
              // console.log('>>>>> UPDATE_ITEM_IN_CART', updatedItem, callback)
              // bambuserLineItemsUpdate([
              //   {
              //     variantId: updatedItem.sku,
              //     quantity: updatedItem.quantity,
              //   },
              // ])
              // .then(() => {
              //   // cart update was successful
              //   callback(true)
              // })
              // .catch(function (error) {
              //   console.log('>>>>', error)
              //   if (error.type === 'out-of-stock') {
              //     callback({
              //       success: false,
              //       reason: 'out-of-stock',
              //     })
              //   } else {
              //     callback(false)
              //   }
              // })
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
