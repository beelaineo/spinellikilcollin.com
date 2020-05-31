import * as React from 'react'
import fetch from 'isomorphic-unfetch'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@xstyled/styled-components'
import { ShopifyProvider } from 'use-shopify'
import { DocumentNode } from 'graphql'
import { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } from '../config'
import { theme, GlobalStyles } from '../theme'
import { ShopDataProvider } from './ShopDataProvider'
import { CartProvider } from './CartProvider'
import { ModalProvider } from './ModalProvider'
import { createApolloClient } from '../graphql'

/**
 * App
 *
 * - Top-level Providers
 * - Global Components
 * - Routes
 */

interface Props {
  children: React.ReactNode
}

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

const client = createApolloClient()

export const Providers = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      <ShopifyProvider query={shopifyQuery}>
        <ShopDataProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <ModalProvider>{children}</ModalProvider>
            </ThemeProvider>
          </CartProvider>
        </ShopDataProvider>
      </ShopifyProvider>
    </ApolloProvider>
  )
}
