import * as React from 'react'
import { path } from 'ramda'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from 'urql'
import { PRODUCT_QUERY, ProductQueryResult } from './query'
import { useProductVariant, useCheckout, Product } from 'use-shopify'
import { unwindEdges } from '../../utils/graphql'
import { NotFound } from '../NotFound'
import { Placeholder } from '../../components/Placeholder'
import { ProductVariantSelector, BuyButton, ProductImages } from './components'
import { Wrapper } from './styled'

interface Props {
	product: Product
}

const ProductDetailMain = ({ product }: Props) => {
	/* get product variant utils */
	const { currentVariant, selectVariant } = useProductVariant(product)

	/* get checkout utils */
	const { addToCheckout } = useCheckout()
	const [variants] = unwindEdges(product.variants)

	return (
		<Wrapper>
			<Placeholder label="Product Details" data={product}>
				<ProductImages currentVariant={currentVariant} product={product} />
				<Placeholder label="Product Details" />
				<ProductVariantSelector variants={variants} currentVariant={currentVariant} selectVariant={selectVariant} />
				<BuyButton addToCheckout={addToCheckout} currentVariant={currentVariant} />
			</Placeholder>
		</Wrapper>
	)
}

/**
 * View Wrapper
 */

interface MatchParams {
	handle: string
}

export const ProductDetail = ({ match }: RouteComponentProps<MatchParams>) => {
	/* fetch the product data */
	const { handle } = match.params
	const variables = { handle }
	const [response] = useQuery<ProductQueryResult>({ query: PRODUCT_QUERY, variables })
	const product = path(['data', 'productByHandle'], response)
	console.log(response)
	if (response.fetching) return <p>Loading..</p>
	if (!product) return <NotFound />
	return <ProductDetailMain product={product} />
}
