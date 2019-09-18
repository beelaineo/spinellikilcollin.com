import * as React from 'react'
import { NormalizeDiv } from '../styled'
import { Product } from '../../../types/generated'
import { P } from 'Components/Text'
import { Accordion } from '../../../Components/Accordion'
import { ImageTextBlock } from '../../../components/ContentSection/ImageBlock'
import { ContentBlock } from '../../../components/ContentBlock/ContentBlock'
const { useState } = React

interface ProductDetailFooterProps {
  product: Product
  content?: any
}

export const ProductDetailFooter = ({
  product,
  content,
}: ProductDetailFooterProps) => {
  return (
    <NormalizeDiv margin="0">
      {content.contentAfter.map((content, index) => (
        <ContentBlock content={content} />
      ))}
    </NormalizeDiv>
  )
}
