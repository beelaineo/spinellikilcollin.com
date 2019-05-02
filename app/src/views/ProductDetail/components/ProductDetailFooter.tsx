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
	console.log(product, currentVariant)
	return (
		<NormalizeDiv className="product__description">
			<h1>{product.title}</h1>
		</NormalizeDiv>
	)
}

