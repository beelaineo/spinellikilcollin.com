import * as React from 'react'
import { NormalizeDiv } from '../styled'
import { Product, ShopifyProduct } from '../../../types/generated'
import { P } from 'Components/Text'
import { Accordion } from '../../../Components/Accordion'
import { ContentBlock } from '../../../components/ContentBlock/ContentBlock'

const { useState } = React

interface ProductDetailFooterProps {
  product: Product
  content?: ShopifyProduct
}

export const ProductDetailFooter = ({
  product,
  content,
}: ProductDetailFooterProps) => {
  return (
    <NormalizeDiv margin="0">
      {content && content.contentAfter
        ? content.contentAfter.map((content, index) => (
            <ContentBlock content={content} />
          ))
        : content.edges
        ? content.edges.map((content, index) => {
            if (index > 0) {
              return <ContentBlock content={content.node} />
            }
          })
        : null}
    </NormalizeDiv>
  )
}
