import * as React from 'react'
import { ShopifyProductVariant, ShopifyProduct } from '../../../types'
import { NormalizeDiv } from '../styled'
import { Header2, Header4 } from '../../../components/Text'
import { formatMoney } from '../../../utils/currency'

interface MobileProductHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
}

export const MobileProductHeader = ({
  product,
  currentVariant,
}: MobileProductHeaderProps) => {
  return (
    <NormalizeDiv
      marginBottom="triple"
      marginTop="quadruple"
      mobile="block"
      align={'center'}
    >
      <Header2 weight="xlight" color="dark">
        {product.title}
      </Header2>
      <Header4 weight="strong" color="dark">
        ${formatMoney(currentVariant.sourceData.priceV2)}
      </Header4>
    </NormalizeDiv>
  )
}
