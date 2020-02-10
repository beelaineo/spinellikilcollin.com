import * as React from 'react'
import { Variant } from 'use-shopify'
import { formatMoney } from '../../../utils/currency'
import { Product } from '../../../types/generated'
import { NormalizeDiv, ProductDetailHeaderStyles } from '../styled'
import { Header2, Header4 } from 'Components/Text'

interface ProductDetailHeaderProps {
  product: Product
  currentVariant: Variant
}

export const ProductDetailHeader = ({
  product,
  currentVariant,
  mobile,
  align,
}: ProductDetailHeaderProps) => {
  console.log(formatMoney(currentVariant.priceV2))
  return (
    <ProductDetailHeaderStyles mobile={mobile}>
      <NormalizeDiv marginBottom="triple" align={align}>
        <Header2 weight="xlight" color="dark">
          {product.title}
        </Header2>
        <Header4 weight="strong" color="dark">
          {formatMoney(currentVariant.priceV2)}
        </Header4>
      </NormalizeDiv>
    </ProductDetailHeaderStyles>
  )
}
