import React, { useEffect, useCallback } from 'react'
import useBambuser from './useBambuser'
import { config } from '../../../src/config'
const { BAMBUSER_SHOWID } = config
import { useShopify } from '../../providers'
import { CheckoutLineItemInput } from '../../providers/ShopifyProvider/types'

export const INIT = 'initBambuserLiveShopping'
export const READY = 'onBambuserLiveShoppingReady'
export const MESSAGE_ID = 'bambuserUrl'

export type ShowType = {
  showId: string
  node?: HTMLElement
  type: string
}

const ID = 'bambuser-liveshopping'
const showId = BAMBUSER_SHOWID
const BambuserView = () => {
  const {
    bambuserLineItemsAdd,
    bambuserLineItemsUpdate,
    bambuserFetchCheckout,
    checkoutLineItemsUpdate,
    checkout,
  } = useShopify()
  const [isReady, addShow] = useBambuser({
    bambuserLineItemsAdd,
    bambuserLineItemsUpdate,
    bambuserFetchCheckout,
    checkoutLineItemsUpdate,
    checkout,
  })
  // const clickHandler = async (event) => {
  //   await addLineItem({
  //     variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjAyNDM3NDU3NTIwMg==',
  //     quantity: 1,
  //   })
  // }

  useEffect(() => {
    if (isReady) {
      const node = document.getElementById(ID)
      if (node && BAMBUSER_SHOWID) {
        addShow({
          showId,
          node,
          type: 'overlay',
        })
      }
      // auto play
      // if (BAMBUSER_SHOWID) {
      //   addShow({
      //     showId,
      //     type: 'overlay',
      //   })
      // }
    }
  }, [isReady])

  return (
    <>
      <button id={ID}>Join show now</button>
    </>
  )
}
export default BambuserView
