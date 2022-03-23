import * as React from 'react'
import { BambuserShowType } from '../../types'
import { BAMBUSER_INIT } from './constants'
import { useShopify } from '../ShopifyProvider'
import {
  configureBambuser,
  EventNames,
  BambuserEvent,
} from './configureBambuser'

const { useEffect } = React

interface BambuserContextValue {
  prepareShow: (showId: string, node: HTMLButtonElement) => void
}

const BambuserContext = React.createContext<BambuserContextValue | undefined>(
  undefined,
)

export const BambuserConsumer = BambuserContext.Consumer

export const useBambuser = () => {
  const ctx = React.useContext(BambuserContext)
  if (!ctx)
    throw new Error('useBambuserContext must be used within a BambuserProvider')
  return ctx
}

interface BambuserProps {
  children: React.ReactNode
}

export const BambuserProvider = ({ children }: BambuserProps) => {
  const { goToCheckout, checkout, addLineItem, updateLineItem } = useShopify()

  const handleMessage = (e: MessageEvent<BambuserEvent>) => {
    console.log('Message Event before parse', e)
    // @ts-ignore
    if (e.data === 'IS_NEED_PIXEL_INJECT') return false
    // @ts-ignore
    if (e.data == '') return false
    const event = typeof e.data === 'string' ? JSON.parse(e.data) ?? {} : e.data
    console.log('Message Event after parse', e)
    if (event.eventName === EventNames.CHECKOUT) {
      goToCheckout()
    } else if (event.eventName === EventNames.ADD_ITEM) {
      addLineItem(event.lineItem)
    } else if (event.eventName === EventNames.UPDATE_ITEM) {
      updateLineItem(event.lineItem)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  useEffect(() => {
    configureBambuser({
      parentOrigin: window.location.origin,
    })
  }, [])

  /**
   * Exported Functions
   */

  /**
   * Attaches an event listener to the given ref that will launch
   * the show when clicked
   */
  const prepareShow = (slug: string, node: HTMLButtonElement): void => {
    const show: BambuserShowType = {
      showId: slug,
      type: 'overlay',
      node,
    }
    if (window[BAMBUSER_INIT]) {
      window[BAMBUSER_INIT](show)
    } else {
      throw new Error('Bambuser has not been initialized')
    }
  }

  const value = {
    prepareShow,
  }

  return (
    <BambuserContext.Provider value={value}>
      {children}
    </BambuserContext.Provider>
  )
}
