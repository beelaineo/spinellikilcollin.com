import * as React from 'react'
import { formatMoney } from '../../../utils/currency'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { TitleWrapper, AffirmWrapper } from '../styled'
import { Affirm } from '../../../components/Affirm'
import { Heading } from '../../../components/Text'

interface ProductDetailHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
  mobile?: string
}

export const ProductDetailHeader = ({
  product,
  currentVariant,
}: ProductDetailHeaderProps) => {
  return (
    <>
      <TitleWrapper>
        <Heading level={2} weight={3} mb={2}>
          {product.title}
        </Heading>
        {currentVariant?.title ? (
          <Heading weight={2} level={3} mb={0}>
            {currentVariant.title}
          </Heading>
        ) : null}
        {currentVariant?.sourceData?.priceV2 ? (
          <Heading level={3} weight={2} mt={3}>
            {formatMoney(currentVariant?.sourceData?.priceV2)}
          </Heading>
        ) : null}
      </TitleWrapper>
      <AffirmWrapper>
        <Affirm price={currentVariant?.sourceData?.priceV2} />
      </AffirmWrapper>
    </>
  )
}
