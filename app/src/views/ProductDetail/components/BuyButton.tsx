import * as React from 'react'
import { UseCheckoutValues } from 'use-shopify'
import { Button } from '../../../components/Button'
import { ShopifySourceProductVariant } from '../../../types'
import { Placeholder } from '../../../components/Placeholder'

interface Props extends Pick<UseCheckoutValues, 'addLineItem'> {
  currentVariant?: Pick<ShopifySourceProductVariant, 'id' | 'availableForSale'>
  quantity?: number
}

export const BuyButton = ({ currentVariant, addLineItem, quantity }: Props) => {
  const handleClick = () => {
    if (!currentVariant) return
    addLineItem({
      variantId: currentVariant.id,
      quantity: quantity || 1,
    })
  }
  if (currentVariant && !currentVariant.availableForSale) {
    return <Placeholder>Out of stock</Placeholder>
  }
  return (
    <Button disabled={Boolean(!currentVariant)} onClick={handleClick}>
      Add to cart
    </Button>
  )
}
