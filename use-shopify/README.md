## Setup

To get started, wrap your application in the `ShopifyProvider`:

```js
import { ShopifyProvider } from 'use-shopify'

const App = () => (
	<ShopifyProvider storefrontName="my-store" storefrontAccessToken="XXXXXXX">
		<div>Welcome to my App</div>
	</ShopifyProvider>
)
```

This will set up an [URQL](https://github.com/FormidableLabs/urql) client pointing to `https://{my-store}.myshopify.com/api/graphql`.

You can provide an alternate url with the `endpoint` prop, like so:

```js
<ShopifyProvider
	storefrontName="my-store"
	storefrontAccessToken="XXXXXXX"
	endpointUrl="https://my-shopify-proxy.now.sh/api"
>
```
