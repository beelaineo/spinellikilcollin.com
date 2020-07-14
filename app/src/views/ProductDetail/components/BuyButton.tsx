import * as React from 'react'
import { useCheckout, UseCheckoutValues } from 'use-shopify'
import { Button } from '../../../components/Button'
import { ShopifyProductVariant } from '../../../types'
import { Placeholder } from '../../../components/Placeholder'
import { useCart } from '../../../providers/CartProvider'

interface Props extends Pick<UseCheckoutValues, 'addLineItem'> {
  currentVariant?: ShopifyProductVariant
  quantity?: number
}

export const BuyButton = ({ currentVariant, addLineItem, quantity }: Props) => {
  const { openCart } = useCart()
  const { loading } = useCheckout()
  const handleClick = async () => {
    if (!currentVariant || !currentVariant.shopifyVariantID) return
    await addLineItem({
      variantId: currentVariant.shopifyVariantID,
      quantity: quantity || 1,
    })
    openCart('Product Added to Cart!')
  }
  if (currentVariant && !currentVariant?.sourceData?.availableForSale) {
    return <Placeholder>Out of stock</Placeholder>
  }
  return (
    <Button
      disabled={loading || Boolean(!currentVariant)}
      onClick={handleClick}
    >
      Add to cart
    </Button>
  )
}
