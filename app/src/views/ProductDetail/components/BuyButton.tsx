import * as React from 'react'
import { useCheckout, UseCheckoutValues } from 'use-shopify'
import { useAnalytics } from '../../../providers'
import { Button } from '../../../components/Button'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { Placeholder } from '../../../components/Placeholder'
import { useCart, useModal } from '../../../providers'

interface Props extends Pick<UseCheckoutValues, 'addLineItem'> {
  product: ShopifyProduct
  currentVariant?: ShopifyProductVariant
  quantity?: number
}

export const BuyButton = ({
  product,
  currentVariant,
  addLineItem,
  quantity,
}: Props) => {
  const { sendAddToCart } = useAnalytics()
  const { openCart } = useCart()
  const { loading } = useCheckout()
  const { inquiryOnly } = product
  const { openCustomizationModal } = useModal()
  const buttonLabel = inquiryOnly ? 'Inquire' : 'Add to cart'
  const handleClick = async () => {
    if (!currentVariant || !currentVariant.shopifyVariantID) return
    if (inquiryOnly) {
      openCustomizationModal({
        currentProduct: product,
        currentVariant,
      })
    } else {
      sendAddToCart({ product, variant: currentVariant, quantity })
      await addLineItem({
        variantId: currentVariant.shopifyVariantID,
        quantity: quantity || 1,
      })
      openCart('Product Added to Cart!')
    }
  }
  if (currentVariant && !currentVariant?.sourceData?.availableForSale) {
    return <Placeholder>Out of stock</Placeholder>
  }
  return (
    <Button
      disabled={loading || Boolean(!currentVariant)}
      onClick={handleClick}
    >
      {buttonLabel}
    </Button>
  )
}
