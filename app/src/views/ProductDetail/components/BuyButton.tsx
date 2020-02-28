import * as React from 'react'
import { UseCheckoutValues } from 'use-shopify'
import { Button } from '../../../components/Button'
import { ShopifySourceProductVariant } from '../../../types'
import { Placeholder } from '../../../components/Placeholder'
import { useCart } from '../../../providers/CartProvider'

interface Props extends Pick<UseCheckoutValues, 'addLineItem'> {
  currentVariant?: Pick<ShopifySourceProductVariant, 'id' | 'availableForSale'>
  quantity?: number
}

export const BuyButton = ({ currentVariant, addLineItem, quantity }: Props) => {
  const { openCart } = useCart()
  const handleClick = async () => {
    console.log(currentVariant)
    if (!currentVariant) return
    await addLineItem({
      variantId: currentVariant.id,
      quantity: quantity || 1,
    })
    openCart('Product Added to Cart!')
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
