import * as React from 'react'
import { formatMoney } from '../../../utils/currency'
import { ShopifyProduct, ShopifySourceProductVariant } from '../../../types'
import { NormalizeDiv, ProductDetailHeaderStyles } from '../styled'
import { Heading } from '../../../components/Text'

interface ProductDetailHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
  mobile?: string
  align?: string
}

export const ProductDetailHeader = ({
  product,
  currentVariant,
  mobile,
  align,
}: ProductDetailHeaderProps) => {
  return (
    <ProductDetailHeaderStyles mobile={mobile}>
      <NormalizeDiv marginBottom="triple" align={align}>
        <Heading level={2} weight={1}>
          {product.title}
        </Heading>
        {currentVariant?.priceV2 ? (
          <Heading level={4} weight={4}>
            {formatMoney(currentVariant.priceV2)}
          </Heading>
        ) : null}
      </NormalizeDiv>
    </ProductDetailHeaderStyles>
  )
}
