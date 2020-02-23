import * as React from 'react'
import styled from '@xstyled/styled-components'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct } from '../../../types'
import { P } from '../../../components/Text'
import { Accordion } from '../../../components/Accordion'
import { Image } from '../../../components/Image'
import { ContentBlock } from '../../../components/ContentBlock/ContentBlock'

const { useState } = React

interface ProductDetailFooterProps {
  product: ShopifyProduct
}

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const ProductDetailFooter = ({ product }: ProductDetailFooterProps) => {
  const { contentAfter, displayShopifyImages, sourceData } = product
  const shopifyImages =
    sourceData &&
    sourceData.images &&
    sourceData.images.edges &&
    sourceData.images.edges.length
      ? /*
        // @ts-ignore */
        unwindEdges(sourceData.images)[0]
      : []
  const content = product.contentAfter || []

  return (
    <ContentGrid>
      {displayShopifyImages && shopifyImages.length
        ? shopifyImages.map((image) => <Image image={image} key={image.id} />)
        : null}
      {content.map((contentBlock, index) =>
        contentBlock ? (
          <ContentBlock
            key={contentBlock._key || 'some-key'}
            content={contentBlock}
          />
        ) : null,
      )}
    </ContentGrid>
  )
}
