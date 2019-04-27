import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Switch, Route } from 'react-router'
import { ShopifyProvider } from 'use-shopify'
import { Homepage, ProductListing, ProductDetail, Navigation, Checkout } from './views'
import { theme, GlobalStyles } from './theme'

/* Global var provided by webpack */
declare var SHOPIFY_STOREFRONT_TOKEN: string

/**
 * App
 *
 * - Top-level Providers
 * - Global Components
 * - Routes
 */

export const App = () => {
	return (
		<ShopifyProvider storefrontName="spinellikilcollin" storefrontAccessToken={SHOPIFY_STOREFRONT_TOKEN}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<GlobalStyles />
					<Navigation />
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route exact path="/collections/:handle" component={ProductListing} />
						<Route exact path="/products/:handle" component={ProductDetail} />
						<Route exact path="/checkout" component={Checkout} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</ShopifyProvider>
	)
}
