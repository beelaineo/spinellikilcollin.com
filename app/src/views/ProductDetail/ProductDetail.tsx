import * as React from 'react'
import { path } from 'ramda'
import { RouteComponentProps } from 'react-router-dom'
import { useFetchProductByHandle, useProductVariant, useCheckout, Product } from 'use-shopify'
import { unwindEdges } from '../../utils/graphql'
import { NotFound } from '../NotFound'
import { Placeholder } from '../../components/Placeholder'
import { ProductVariantSelector, BuyButton, ProductImages, ProductDetailHeader, ProductDetailFooter } from './components'
import { Wrapper, FlexContainer, FlexHalf } from './styled'

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
				<FlexContainer>
					<FlexHalf>
						<ProductImages currentVariant={currentVariant} product={product} />
					</FlexHalf>
					<FlexHalf>
						<ProductDetailHeader currentVariant={currentVariant} product={product}/>
						<ProductVariantSelector variants={variants} currentVariant={currentVariant} selectVariant={selectVariant} />
						<BuyButton addToCheckout={addToCheckout} currentVariant={currentVariant} />
						<ProductDetailFooter currentVariant={currentVariant} product={product}/>
					</FlexHalf>
				</FlexContainer>
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
