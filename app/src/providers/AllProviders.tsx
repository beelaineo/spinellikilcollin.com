import * as React from 'react'
import fetch from 'isomorphic-unfetch'
import { ThemeProvider } from '@xstyled/styled-components'
import { ShopifyProvider } from 'use-shopify'
import { DocumentNode } from 'graphql'
import { ShopDataResponse } from './ShopDataProvider/shopDataQuery'
import { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } from '../config'
import { theme, GlobalStyles } from '../theme'
import { ShopDataProvider } from './ShopDataProvider'
import { CartProvider } from './CartProvider'
import { ModalProvider } from './ModalProvider'
import { CurrencyProvider } from './CurrencyProvider'

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
  variables: object,
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
    <ShopifyProvider query={shopifyQuery}>
      <ShopDataProvider shopData={shopData}>
        <CurrencyProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <ModalProvider>{children}</ModalProvider>
            </ThemeProvider>
          </CartProvider>
        </CurrencyProvider>
      </ShopDataProvider>
    </ShopifyProvider>
  )
}
