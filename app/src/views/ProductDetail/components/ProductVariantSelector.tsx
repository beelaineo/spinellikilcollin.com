import * as React from 'react'
import { UseProductVariant, Variant } from 'use-shopify'
import { Placeholder } from '../../../components/Placeholder'
import { Select, Label, NormalizeDiv } from '../styled'

interface Props extends UseProductVariant {
	variants: Variant[]
}

/**
 * ProductVariantSelector
 *
 * - renders a menu, series of buttons, or other UI to select a variant
 * - highlights the current variant
 * - does not render anything if there is only one variant
 */

export const ProductVariantSelector = (props: Props) => {
	const { variants, currentVariant, selectVariant } = props
	// return <Placeholder label="Variant Selector" data={props} />
	console.log({ variants, currentVariant })
	return (
		<div className="product__variants">
			{/* if there are sizes */}
			{variants.length > 1 && (
				<span>
					<NormalizeDiv>
						<Label>Size</Label>
						<Select id="size" name="product-size">
							{variants.map((variant) => {
								return <option value={variant.id}>{variant.title}</option>
							})}
						</Select>
					</NormalizeDiv>
					<NormalizeDiv>
						<Label>Quantity</Label>
						{/* How do I get the quantity? */}
						<Select id="quantity" name="product-size">
							{variants.map((variant) => {
								return <option value={variant.id}>{variant.title}</option>
							})}
						</Select>
					</NormalizeDiv>
				</span>
			)}
		</div>
	)
}
