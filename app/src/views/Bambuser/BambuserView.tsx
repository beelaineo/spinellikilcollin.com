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

const ID = 'liveshopping'
const showId = BAMBUSER_SHOWID
const BambuserView = () => {
  const { addLineItem, checkout } = useShopify()
  const [isReady, addShow] = useBambuser({
    addLineItem,
    checkout,
  })
  const clickHandler = async (event) => {
    await addLineItem({
      variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjAyNDM3NDU3NTIwMg==',
      quantity: 1,
    })
  }

  //console.log('>>>> click handler', clickHandler, 'addLineItem', addLineItem)

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
      // console.log('>>>>> init show', BAMBUSER_SHOWID)
      // if (BAMBUSER_SHOWID) {
      //   addShow({
      //     showId,
      //     type: 'overlay',
      //   })
      // }
    }
  }, [isReady])

  return (
    <div className="ui-container">
      <button id={ID}>Join show now</button>
      <p>
        <button onClick={clickHandler}>Add To Cart</button>
      </p>
    </div>
  )
}
export default BambuserView
