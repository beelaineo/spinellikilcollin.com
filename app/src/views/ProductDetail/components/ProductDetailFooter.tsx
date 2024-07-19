import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import {
  ImageTextBlock,
  Maybe,
  Product,
  ShopifyProductVariant,
} from '../../../types'
import { ContentBlock } from '../../../components/ContentBlock/ContentBlock'
import { getSwatchOptions } from '../../../utils'
import { CHECKOUT_DISCOUNT_CODE_APPLY } from '../../../providers/ShopifyProvider/useCheckout/queries'
const { useEffect, useState } = React

interface ProductDetailFooterProps {
  product: Product
  currentVariant: ShopifyProductVariant
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

const findMatchingColorOption = (productColorOptions, currentVariant) => {
  const selectedColor = currentVariant.sourceData.selectedOptions.find(
    (option) => ['Color', 'Style'].includes(option.name),
  )?.value

  if (!selectedColor) return null

  const colorOption = productColorOptions.find(
    (option) => option.name === 'Color',
  )

  if (!colorOption) return null

  return colorOption.values.find((value) => value.value === selectedColor)
}

export const ProductDetailFooter = ({
  product,
  currentVariant,
}: ProductDetailFooterProps) => {
  const [content, setContent] = useState<Maybe<ImageTextBlock>[]>(
    product.contentAfter || [],
  )

  useEffect(() => {
    const swatchOptions = getSwatchOptions(product)
    const matchingColorOption = findMatchingColorOption(
      swatchOptions,
      currentVariant,
    )
    if (matchingColorOption && matchingColorOption.contentAfter) {
      setContent(matchingColorOption.contentAfter)
    } else {
      setContent(product.contentAfter || [])
    }
  }, [currentVariant, product.contentAfter])

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
