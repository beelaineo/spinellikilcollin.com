import * as React from 'react'
import { formatMoney } from '../../../utils/currency'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { NormalizeDiv, ProductDetailHeaderStyles } from '../styled'
import { Header2, Header4 } from '../../../components/Text'

interface ProductDetailHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
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
        <Header2 weight="xlight" color="dark">
          {product.title}
        </Header2>
        <Header4 weight="strong" color="dark">
          {formatMoney(currentVariant.sourceData.priceV2)}
        </Header4>
      </NormalizeDiv>
    </ProductDetailHeaderStyles>
  )
}
