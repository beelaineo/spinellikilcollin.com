import * as React from 'react'
import { ShopifyProductVariant, ShopifyProduct } from '../../../types'
import { NormalizeDiv } from '../styled'
import { Heading } from '../../../components/Text'
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
      <Heading level={2} weight={1}>
        {product.title}
      </Heading>
      {currentVariant?.sourceData?.priceV2 ? (
        <Heading level={4} weight={4}>
          ${formatMoney(currentVariant.sourceData.priceV2)}
        </Heading>
      ) : null}
    </NormalizeDiv>
  )
}
