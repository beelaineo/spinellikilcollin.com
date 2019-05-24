import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider as UrqlProvider, createClient } from 'urql'
import { ShopifyProvider, createUrqlQueries } from 'use-shopify'
import { theme, GlobalStyles } from '../theme'
import { SettingsProvider } from './SettingsProvider'
import { SHOPIFY_STOREFRONT_TOKEN } from '../config'

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

const client = createClient({
	url: 'https://spinellikilcollin.myshopify.com/api/graphql',
	fetchOptions: {
		headers: {
			'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
		},
	},
})

const queries = createUrqlQueries(client)

export const Providers = ({ children }: Props) => {
	return (
		<UrqlProvider value={client}>
			<ShopifyProvider queries={queries}>
				<SettingsProvider>
					<ThemeProvider theme={theme}>
						<BrowserRouter>
							<GlobalStyles />
							{children}
						</BrowserRouter>
					</ThemeProvider>
				</SettingsProvider>
			</ShopifyProvider>
		</UrqlProvider>
	)
}
