import * as React from 'react'
import fetch from 'isomorphic-unfetch'
import { ThemeProvider } from '@xstyled/styled-components'
import { DocumentNode } from 'graphql'
import { ShopDataResponse } from './ShopDataProvider/shopDataQuery'
import { config } from '../config'
import { theme, GlobalStyles } from '../theme'
import { ShopDataProvider } from './ShopDataProvider'
import { CartProvider } from './CartProvider'
import { ModalProvider } from './ModalProvider'
import { SearchProvider } from './SearchProvider'
import { CurrencyProvider } from './CurrencyProvider'
import { ErrorDisplay, ErrorProvider } from './ErrorProvider'
import { NavigationProvider } from './NavigationProvider'
import { AnalyticsProvider } from './AnalyticsProvider'
import { ShopifyProvider } from './ShopifyProvider'
import { ToastProvider } from './ToastProvider'

const { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } = config

/**
 * App
 *
 * - Top-level Providers
 * - Global Components
 * - Routes
 */

const deduplicateFragments = (queryString?: string) =>
  queryString
    ? queryString
        .split(/\n\s+\n/)
        .map((group) => group.replace(/^([\n\s])+/, '').replace(/\n+$/, ''))
        .reduce<string[]>((acc, current) => {
          if (acc.includes(current)) return acc
          return [...acc, current]
        }, [])
        .join('\n\n')
    : ''

async function shopifyQuery<Response>(
  query: string | DocumentNode,
  variables?: Record<string, unknown>,
): Promise<Response> {
  const queryString =
    typeof query === 'string'
      ? query
      : deduplicateFragments(query?.loc?.source.body)
  const result = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: queryString, variables }),
  }).then((r) => r.json())
  return result
}

interface Props {
  children: React.ReactNode
  shopData: ShopDataResponse
}

export const Providers = ({ shopData, children }: Props) => {
  return (
    <ErrorProvider>
      <AnalyticsProvider>
        <ShopifyProvider query={shopifyQuery}>
          <ShopDataProvider shopData={shopData}>
            <ThemeProvider theme={theme}>
              <ToastProvider>
                <CartProvider>
                  <NavigationProvider>
                    <CurrencyProvider>
                      <SearchProvider>
                        <ErrorDisplay />
                        <GlobalStyles />
                        <ModalProvider>{children}</ModalProvider>
                      </SearchProvider>
                    </CurrencyProvider>
                  </NavigationProvider>
                </CartProvider>
              </ToastProvider>
            </ThemeProvider>
          </ShopDataProvider>
        </ShopifyProvider>
      </AnalyticsProvider>
    </ErrorProvider>
  )
}
