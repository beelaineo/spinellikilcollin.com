import * as React from 'react'
import { NormalizeDiv } from '../styled'
import { ShopifyProduct } from '../../../types'
import { P } from '../../../components/Text'
import { Accordion } from '../../../components/Accordion'
import { ContentBlock } from '../../../components/ContentBlock/ContentBlock'

const { useState } = React

interface ProductDetailFooterProps {
  product: ShopifyProduct
}

export const ProductDetailFooter = ({ product }: ProductDetailFooterProps) => {
  const content = product.contentAfter
  if (!content || content.length !== 0) return null
  return (
    <NormalizeDiv margin="0">
      {content.map((contentBlock, index) => (
        <ContentBlock content={contentBlock} />
      ))}
    </NormalizeDiv>
  )
}
