import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  useCheckout,
  UseCheckoutValues,
  UseCheckoutQueries,
  UseCheckoutConfig,
} from './useCheckout'
import { useAnalytics } from '../AnalyticsProvider'
import { QueryFunction } from './types'
import { config } from '../../config'
import { BAMBUSER_MESSAGE_ID } from '../../constants'

const { SHOPIFY_CHECKOUT_DOMAIN: domain } = config

export interface ShopifyContextValue extends UseCheckoutValues {
  goToCheckout: () => void
}

export const ShopifyContext = React.createContext<
  ShopifyContextValue | undefined
>(undefined)

export const ShopifyConsumer = ShopifyContext.Consumer

export const useShopify = () => {
  const ctx = React.useContext(ShopifyContext)
  if (!ctx)
    throw new Error('`useShopify` must be used within a ShopifyProvider')
  return ctx
}

type CustomQueries = Partial<UseCheckoutQueries>

interface Props {
  children: React.ReactNode
  query: QueryFunction
  queries?: CustomQueries
  config?: {
    checkout: Partial<UseCheckoutConfig>
  }
}

const defaultConfig = {
  checkout: undefined,
}

const insideIframe = (): boolean => {
  return window !== window.parent
}

export const ShopifyProvider = ({
  children,
  queries,
  query,
  config: userConfig,
}: Props) => {
  const { sendBeginCheckout } = useAnalytics()
  const config = {
    ...defaultConfig,
    ...userConfig,
  }

  const useCheckoutValues = useCheckout({
    queries,
    query,
    config: config.checkout ? config.checkout : undefined,
  })

  const goToCheckout = () => {
    const { checkout } = useCheckoutValues
    if (!checkout) {
      throw new Error('No checkout has been initiated')
    }
    const [lineItems] = unwindEdges(checkout.lineItems)
    /* Send the analytics event */
    sendBeginCheckout(
      lineItems.map((li) => ({
        product: li.variant?.product,
        variant: li.variant,
        quantity: li.quantity,
      })),
    )
    const { protocol, pathname, search } = new URL(checkout.webUrl)
    const redirect: string = `${protocol}//${domain}${pathname}${search}`
    /* If checkint out from Bambuser, we will be inside an iframe */
    if (insideIframe()) {
      try {
        window.parent.postMessage(
          {
            [BAMBUSER_MESSAGE_ID]: redirect,
          },
          `https://${window.location.hostname}`,
          [],
        )
      } catch (e) {
        console.log('There is something wrong with the url', e)
      }
    } else {
      window.location.href = redirect
    }
  }

  const value = {
    ...useCheckoutValues,
    goToCheckout,
  }

  return (
    <ShopifyContext.Provider value={value}>{children}</ShopifyContext.Provider>
  )
}
