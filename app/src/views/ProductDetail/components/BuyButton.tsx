import * as React from 'react'
import { Variant } from 'use-shopify'
// import { UseProductVariant, UseCheckoutProps } from '../../providers/shopify'
import { Placeholder } from '../../../components/Placeholder'

/**
 * TODO: Make Variant partial, we just need ID and availbleForSale
 */

interface Props {
	currentVariant?: Pick<Variant, 'id' | 'availableForSale'>
	addToCheckout: any
	/* quantitySelector?: boolean */
	// Implement later
}

export const BuyButton = (props: Props) => {
	return <Placeholder label="Buy Button" data={props} />
}
