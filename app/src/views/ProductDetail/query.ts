import { Product } from 'use-shopify'

export const PRODUCT_QUERY = /* GraphQL */ `
	query ProductQuery($handle: String!) {
		productByHandle(handle: $handle) {
			id
			title
			handle
			description
			images(first: 50) {
				edges {
					node {
						id
						altText
						originalSrc
					}
				}
			}
		}
		variants(first: 50) {
			edges {
				node {
					id
					availableForSale
					price
					sku
					title
					image {
						id
						altText
						originalSrc
					}
				}
			}
		}
	}
`

export interface ProductQueryResult {
	shop: {
		productByHandle: Product | void
	}
}
