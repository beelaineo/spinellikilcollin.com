import * as React from 'react'
import { Product, Variant } from 'use-shopify'
import { unwindEdges } from '../../../utils/graphql'
import { Gallery } from '../../../components/Gallery'
import { FlexHalf, NormalizeDiv } from '../styled'

interface ProductDetailFooterProps {
	product: Product
	currentVariant: Variant
}

export const ProductDetailFooter = ({ product, currentVariant }: ProductDetailFooterProps) => {
	return (
		<NormalizeDiv className="product__description">
			<p>{product.description}</p>
		</NormalizeDiv>
	)
}
