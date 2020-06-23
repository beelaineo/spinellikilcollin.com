import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyProduct } from '../../../types'
import { ContentBlock } from '../../../components/ContentBlock/ContentBlock'

interface ProductDetailFooterProps {
  product: ShopifyProduct
}

const ContentGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${theme.mediaQueries.tablet} {
      display: none;
    }
  `}
`

export const ProductDetailFooter = ({ product }: ProductDetailFooterProps) => {
  const { contentAfter } = product
  const content = contentAfter || []

  return (
    <ContentGrid>
      {content.map((contentBlock) =>
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
