import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Product } from '../../../types'
import { ContentBlock } from '../../../components/ContentBlock/ContentBlock'

interface ProductDetailFooterProps {
  product: Product
}

const ContentGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr 1fr;
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;
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
