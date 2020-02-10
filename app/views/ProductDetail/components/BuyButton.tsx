import * as React from 'react'
import { Variant, UseCheckoutValues } from 'use-shopify'
import { ButtonPrimary } from '../styled'
import { Placeholder } from '../../../components/Placeholder'

interface Props extends Pick<UseCheckoutValues, 'addItemToCheckout'> {
  currentVariant?: Pick<Variant, 'id' | 'availableForSale'>
  quantity?: number
}

export const BuyButton = ({
  currentVariant,
  addItemToCheckout,
  quantity,
}: Props) => {
  const handleClick = () =>
    addItemToCheckout({
      variantId: currentVariant.id,
      quantity: quantity || 1,
    })
  if (currentVariant && !currentVariant.availableForSale)
    return <Placeholder>Out of stock</Placeholder>
  return (
    <ButtonPrimary
      width={'100%'}
      disabled={Boolean(!currentVariant)}
      onClick={handleClick}
    >
      add to cart
    </ButtonPrimary>
  )
}
