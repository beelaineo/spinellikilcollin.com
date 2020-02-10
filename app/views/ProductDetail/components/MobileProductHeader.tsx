import * as React from 'react'
import { Variant } from 'use-shopify'
import { Product } from '../../../types/generated'
import { NormalizeDiv } from '../styled'
import { Header2, Header4 } from '../../../components/Text'

interface MobileProductHeaderProps {
  product: Product
  currentVariant: Variant
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
        ${currentVariant.price}
      </Header4>
    </NormalizeDiv>
  )
}
