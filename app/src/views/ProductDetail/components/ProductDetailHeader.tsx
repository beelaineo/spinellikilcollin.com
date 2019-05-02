import * as React from 'react'
import { Product, Variant } from 'use-shopify'
import { unwindEdges } from '../../../utils/graphql'
import { Gallery } from '../../../components/Gallery'
import { FlexHalf, NormalizeDiv } from '../styled'

interface ProductDetailHeaderProps {
	product: Product
	currentVariant: Variant
}

export const ProductDetailHeader = ({ product, currentVariant }: ProductDetailHeaderProps) => {
	return (
		<NormalizeDiv>
			<h1>{product.title}</h1>
			<h3>${currentVariant.price}</h3>
		</NormalizeDiv>
	)
}

