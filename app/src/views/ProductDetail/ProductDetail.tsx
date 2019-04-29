import * as React from 'react'
import { path } from 'ramda'
import { RouteComponentProps } from 'react-router-dom'
import { useFetchProductByHandle, useProductVariant, useCheckout, Variant, Product } from 'use-shopify'
import { unwindEdges } from '../../utils/graphql'
import { NotFound } from '../NotFound'
import { Placeholder } from '../../components/Placeholder'
import { ProductVariantSelector, BuyButton } from './components'
import { Wrapper } from './styled'

interface Props {
	product: Product
}

const ProductDetailMain = ({ product }: Props) => {
	/* get product variant utils */
	console.log(product)
	const { currentVariant, selectVariant } = useProductVariant(product)

	/* get checkout utils */
	const { addToCheckout } = useCheckout()

	const [variants] = unwindEdges(product.variants)
	// const [images] = unwindEdges(product.images)

	return (
		<Wrapper>
			<Placeholder label="Product Details" data={product}>
				<Placeholder label="Product Details" />
				<ProductVariantSelector variants={variants} currentVariant={currentVariant} selectVariant={selectVariant} />
				<BuyButton addToCheckout={addToCheckout} />
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
	const [response] = useFetchProductByHandle(handle)
	const product = path(['data', 'productByHandle'], response)
	if (response.fetching) return <p>Loading..</p>
	if (!product) return <NotFound />
	return <ProductDetailMain product={product} />
}
