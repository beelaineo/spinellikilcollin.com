import { Product } from 'use-shopify'
import { imageFragment } from '../../graphql/fragments'

export const productQuery = /* GraphQL */ `
	query ProductQuery($handle: String!) {
		shop {
			productByHandle(handle: $handle) {
				id
				title
				handle
				images(first: 50) {
					edges {
						node {
							...ImageFragment
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
								...ImageFragment
							}
						}
					}
				}
			}
		}
	}
	${imageFragment}
`

export interface QueryResult {
	shop: {
		productByHandle: Product | void
	}
}
