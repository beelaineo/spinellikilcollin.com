import * as React from 'react'
import { Variant, UseCheckoutProps } from 'use-shopify'

interface Props extends Pick<UseCheckoutProps, 'addToCheckout'> {
	currentVariant?: Pick<Variant, 'id' | 'availableForSale'>
	quantity?: number
}

export const BuyButton = ({ currentVariant, addToCheckout, quantity }: Props) => {
	const handleClick = () => addToCheckout({ variantId: currentVariant.id, quantity: quantity || 1 })
	return (
		<button disabled={Boolean(!currentVariant || currentVariant.availableForSale === false)} onClick={handleClick}>
			buy it
		</button>
	)
}
