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
import { useRouter } from 'next/router'

const { SHOPIFY_CHECKOUT_DOMAIN: domain } = config
const { useState, useEffect } = React

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
  const router = useRouter()

  const useCheckoutValues = useCheckout({
    queries,
    query,
    config: config.checkout ? config.checkout : undefined,
  })

  useEffect(() => {
    const { checkout } = useCheckoutValues
    checkout ? storeCheckout(JSON.stringify(checkout)) : null
  }, [])

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

    const getCheckoutUrlCallback = function (url) {
      console.log('GEM getCheckoutUrl: ', url)
      return url
    }
    const regex = /[^/]+$/g
    const cartToken = pathname.match(regex)?.[0]

    const urlParams = {
      CartToken: cartToken,
    }

    const checkoutUrl =
      globalThis?.GEM_Components.ExternalMethodsComponent.GetCheckoutUrl(
        urlParams,
        getCheckoutUrlCallback,
      )

    const isOperatedByCallback = function (isOperated) {
      console.log('IsOperatedByGlobalE:', isOperated)

      const redirect: string = `${protocol}//${domain}${pathname}${search}`

      if (isOperated == true) {
        // console.log('is operated')
        router.push(checkoutUrl)
      } else {
        // console.log('is not operated')
        window.location.href = redirect
      }
    }

    const isOperatedByGE =
      globalThis?.GEM_Components.ExternalMethodsComponent.IsOperatedByGlobalE(
        isOperatedByCallback,
      )
  }

  const value = {
    ...useCheckoutValues,
    goToCheckout,
  }

  return (
    <ShopifyContext.Provider value={value}>{children}</ShopifyContext.Provider>
  )
}
