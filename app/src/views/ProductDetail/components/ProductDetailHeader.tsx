import * as React from 'react'
import { formatMoney } from '../../../utils/currency'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { TitleWrapper } from '../styled'
import { Heading } from '../../../components/Text'
import { definitely } from '../../../utils'

interface ProductDetailHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
  mobile?: string
}

const getVariantTitle = (
  product: ShopifyProduct,
  variant: ShopifyProductVariant,
): string | null | undefined => {
  if (product?.variants?.length && product.variants.length < 2) return null
  if (variant?.sourceData?.selectedOptions?.length) {
    return definitely(variant.sourceData.selectedOptions)
      .map((option) => {
        if (option.name === 'Size') return null
        return option.value
      })
      .filter(Boolean)
      .join(' | ')
  }

  return variant?.title
}

export const ProductDetailHeader = ({
  product,
  currentVariant,
}: ProductDetailHeaderProps) => {
  const variantTitle = getVariantTitle(product, currentVariant)
  return (
    <>
      <TitleWrapper>
        <Heading level={2} weight={3} mb={2}>
          {variantTitle || product.title}
        </Heading>
        {currentVariant?.sourceData?.priceV2 ? (
          <Heading level={3} weight={2} mb={0} mt={3}>
            {formatMoney(currentVariant?.sourceData?.priceV2)}
          </Heading>
        ) : null}
      </TitleWrapper>
    </>
  )
}
