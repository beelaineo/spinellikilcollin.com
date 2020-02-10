import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ShopifyProvider } from 'use-shopify'
import { createClient, Provider as UrqlProvider } from 'urql'
import { SHOPIFY_STOREFRONT_TOKEN } from '../config'
import { theme, GlobalStyles } from '../theme'
import { ShopDataProvider } from './ShopDataProvider'

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

const isServer = typeof window !== 'object' || process.browser

const ssrCache = ssrExchange({ isClient: !isServer })

export const client = createClient({
  url: SANITY_GRAPHQL_URL,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  fetch,
})

function urqlQuery<Response>(
  query: string | DocumentNode,
  variables: object,
): Promise<Response> {
  return new Promise((resolve) => {
    const request = createRequest(query, variables)

    pipe(
      client.executeQuery(request),
      // @ts-ignore TODO What's up with that? Well, soon urql will have an actual API for this
      subscribe(resolve),
    )
  })
}

export const Providers = ({ children }: Props) => {
  return (
    <UrqlProvider value={client}>
      <ShopifyProvider query={urqlQuery}>
        <ShopDataProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <GlobalStyles />
              {children}
            </BrowserRouter>
          </ThemeProvider>
        </ShopDataProvider>
      </ShopifyProvider>
    </UrqlProvider>
  )
}
