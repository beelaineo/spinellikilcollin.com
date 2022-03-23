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

const { SHOPIFY_CHECKOUT_DOMAIN: domain } = config

export interface ShopifyContextValue extends UseCheckoutValues {
  goToCheckout: () => void
}

export const ShopifyContext = React.createContext<
  ShopifyContextValue | undefined
>(undefined)

export const ShopifyConsumer = ShopifyContext.Consumer

const storeCheckout = (checkout) => {
  const storage = globalThis?.sessionStorage
  if (!storage) return
  storage.setItem('checkout', checkout)
}

export const useShopify = () => {
  const ctx = React.useContext(ShopifyContext)
  if (!ctx)
    throw new Error('`useShopify` must be used within a ShopifyProvider')
  storeCheckout(JSON.stringify(ctx.checkout))
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
    const isOperatedByCallback = function (isOperated) {
      console.log('GEM IsOperatedByGlobalE callback:', isOperated)
    }

    globalThis?.GEM_Components.IsOperatedByGlobalEMethod(isOperatedByCallback)

    const getCheckoutToken = () => {
      const storage = globalThis?.sessionStorage
      if (!storage) return
      const checkout = storage.getItem('checkout')
      if (checkout) return JSON.parse(checkout).id
    }

    const urlParams = {
      CartToken: getCheckoutToken(),
    }

    const getCheckoutCallback = function (url) {
      console.log('GEM getCheckout callback: ', url)
    }

    console.log('GEM getCheckout urlParams', urlParams)

    globalThis?.GEM_Components.ExternalMethodsComponent.GetCheckoutUrl(
      urlParams,
      getCheckoutCallback,
    )

    const { protocol, pathname, search } = new URL(checkout.webUrl)
    const redirect: string = `${protocol}//${domain}${pathname}${search}`
    window.location.href = redirect
  }

  const value = {
    ...useCheckoutValues,
    goToCheckout,
  }

  return (
    <ShopifyContext.Provider value={value}>{children}</ShopifyContext.Provider>
  )
}
