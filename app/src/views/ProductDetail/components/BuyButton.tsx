import * as React from 'react'
import { Variant, UseCheckoutProps } from 'use-shopify'
import { ButtonPrimary } from '../styled'

interface Props extends Pick<UseCheckoutProps, 'addToCheckout'> {
	currentVariant?: Pick<Variant, 'id' | 'availableForSale'>
	quantity?: number
}

export const BuyButton = ({ currentVariant, addToCheckout, quantity }: Props) => {
	const handleClick = () => addToCheckout({ lineItems: [{ variantId: currentVariant.id, quantity: quantity || 1 }] })
	return (
		<ButtonPrimary disabled={Boolean(!currentVariant || currentVariant.availableForSale === false)} onClick={handleClick}>
			add to cart
		</ButtonPrimary>
	)
}
