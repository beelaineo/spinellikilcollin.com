import { Product } from 'use-shopify'
import { imageFragment } from '../../graphql/fragments'

export const PRODUCT_QUERY = /* GraphQL */ `
	query ProductQuery($handle: String!) {
<<<<<<< HEAD
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
=======
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
>>>>>>> a7a4a53148c68934808d25da2d079c0e9397074b
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
<<<<<<< HEAD
							altText
							originalSrc
=======
							availableForSale
							price
							sku
							title
							image {
								...ImageFragment
							}
>>>>>>> a7a4a53148c68934808d25da2d079c0e9397074b
						}
					}
				}
			}
		}
	}
	${imageFragment}
`

export interface ProductQueryResult {
	shop: {
		productByHandle: Product | void
	}
}
