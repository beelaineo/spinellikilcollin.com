import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { ShopifyProvider } from 'use-shopify'
// import { Homepage } from 'Views/Homepage'
import { Homepage, ProductListing, ProductDetail, Navigation, Checkout } from './views'
import { GlobalStyles } from './theme/global'

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
		<ShopifyProvider storefrontName="jemmawynne" storefrontAccessToken={SHOPIFY_STOREFRONT_TOKEN}>
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
		</ShopifyProvider>
	)
}
