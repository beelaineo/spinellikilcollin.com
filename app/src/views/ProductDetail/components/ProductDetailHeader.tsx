import * as React from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { TitleWrapper } from '../styled'
import { Heading, Span } from '../../../components/Text'
import { Price } from '../../../components/Price'
import { getVariantTitle } from '../../../utils'

interface ProductDetailHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
  mobile?: string
}

export const ProductDetailHeader = ({
  product,
  currentVariant,
}: ProductDetailHeaderProps) => {
  const variantTitle = getVariantTitle(product, currentVariant)
  const { compareAtPriceV2, priceV2 } = currentVariant?.sourceData ?? {}
  return (
    <>
      <TitleWrapper>
        <Heading level={3} weight={2} mb={{ xs: 1, md: 2 }}>
          {variantTitle || product.title}
        </Heading>
        <Heading level={4} weight={1} mb={0} mt={{ xs: 1, md: 2 }}>
          <Price price={priceV2} />
          <Span ml={2} color="body.6" textDecoration="line-through">
            <Price price={compareAtPriceV2} />
          </Span>
        </Heading>
      </TitleWrapper>
    </>
  )
}
