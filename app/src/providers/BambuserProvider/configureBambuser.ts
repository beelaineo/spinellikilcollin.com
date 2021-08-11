import { BAMBUSER_READY } from '../../constants'
import { getLocationSearchHash } from '../../utils'
import { ShopifyProduct } from '../../types'
import {
  ShopifyStorefrontCheckoutLineItemInput,
  ShopifyStorefrontCheckoutLineItemUpdateInput,
} from '../../types/generated-shopify'

import { queryByHandle } from './utils'
import { setupProductData } from './setupProductData'

interface BambuserLineItem {
  sku: string
  quantity?: number
}

interface ConfigureBambuserOptions {
  parentOrigin: string
}

export enum EventNames {
  CHECKOUT = 'CHECKOUT',
  ADD_ITEM = 'ADD_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
}

interface CheckoutEvent {
  eventName: EventNames.CHECKOUT
}
interface AddItemEvent {
  eventName: EventNames.ADD_ITEM
  lineItem: ShopifyStorefrontCheckoutLineItemInput
}
interface UpdateItemEvent {
  eventName: EventNames.UPDATE_ITEM
  lineItem: ShopifyStorefrontCheckoutLineItemUpdateInput
}

export type BambuserEvent = CheckoutEvent | AddItemEvent | UpdateItemEvent

export const configureBambuser = (options: ConfigureBambuserOptions) => {
  const postMessage = (event: BambuserEvent) => {
    window.parent.postMessage(event, parentOrigin)
  }
  const { parentOrigin } = options
  window[BAMBUSER_READY] = (player) => {
    player.configure({
      currency: 'USD',
      locale: 'en-us',
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
    /* Add to Cart */
    player.on(
      player.EVENT.ADD_TO_CART,
      async (
        addedItem: BambuserLineItem,
        callback: (success: boolean) => void,
      ) => {
        postMessage({
          eventName: EventNames.ADD_ITEM,
          lineItem: {
            variantId: addedItem.sku,
            quantity: addedItem.quantity || 1,
          },
        })
        callback(true)
      },
    )

    /** updating line items */
    player.on(
      player.EVENT.UPDATE_ITEM_IN_CART,
      async function (updatedItem: BambuserLineItem, callback) {
        postMessage({
          eventName: EventNames.UPDATE_ITEM,
          lineItem: {
            quantity: updatedItem.quantity,
            variantId: updatedItem.sku,
          },
        })
        callback(true)
      },
    )

    /** Cart sychronization */
    player.on(player.EVENT.SYNC_CART_STATE, () => {
      console.log('SYNC')
    })

    /** Adding product data */
    player.on(player.EVENT.PROVIDE_PRODUCT_DATA, function (event) {
      event.products.forEach(
        async ({ ref: sku, id: productId, url: publicUrl }) => {
          const hash = getLocationSearchHash(publicUrl)
          // const pid = getIdFromBase64(hash)
          const SHOPIFY_PRODUCT_URL_HANDLE_REGEX = /\/products\/(.[\w\d-+]+)/
          const handles = SHOPIFY_PRODUCT_URL_HANDLE_REGEX.exec(publicUrl)

          const handle = handles ? handles[1] : null

          if (!handle) {
            throw new Error('Could not get handle')
          }

          const product: ShopifyProduct | null = await queryByHandle(handle)

          if (product) {
            player.updateProduct(
              productId,
              setupProductData(product, handle, hash),
            )
          }
        },
      )
    })
    /* Checkout Event */
    player.on(player.EVENT.CHECKOUT, async () => {
      postMessage({ eventName: EventNames.CHECKOUT })
    })
  }
}
