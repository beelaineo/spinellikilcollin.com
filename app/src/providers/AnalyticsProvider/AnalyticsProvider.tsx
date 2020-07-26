import * as React from 'react'
import { arrayify } from '../../utils'
import { parseProduct } from './utils'
import { SelectedProduct, CartEvent, EventType, GTagEvent } from './types'

interface AnalyticsContextValue {
  sendProductImpression: (
    products: SelectedProduct | SelectedProduct[],
    list?: string,
  ) => void
  sendProductClick: (products: SelectedProduct | SelectedProduct[]) => void
  sendProductDetailView: (products: SelectedProduct | SelectedProduct[]) => void
  sendAddToCart: (products: CartEvent | CartEvent[]) => void
  sendRemoveFromCart: (products: CartEvent | CartEvent[]) => void
  sendBeginCheckout: (products: CartEvent | CartEvent[]) => void
}

const AnalyticsContext = React.createContext<AnalyticsContextValue | undefined>(
  undefined,
)

export const AnalyticsConsumer = AnalyticsContext.Consumer

export const useAnalytics = () => {
  const ctx = React.useContext(AnalyticsContext)
  if (!ctx)
    throw new Error(
      'useAnalyticsContext must be used within a AnalyticsProvider',
    )
  return ctx
}

interface AnalyticsProps {
  children: React.ReactNode
}

export const AnalyticsProvider = ({ children }: AnalyticsProps) => {
  const sendEvent = (event: GTagEvent) => {
    if (typeof window === 'undefined') return
    console.log('sending event', { event })
    window.dataLayer.push(event)
  }
  if (typeof window !== 'undefined') console.log(window.dataLayer)

  const sendProductImpression: AnalyticsContextValue['sendProductImpression'] = (
    selected,
    list,
  ) => {
    const impressions = arrayify(selected).map((s, i) =>
      parseProduct(s, { position: i, list }),
    )
    sendEvent({
      event: EventType.Impressions,
      ecommerce: { impressions },
    })
  }

  const value = {
    sendProductImpression,
    /* */
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}
