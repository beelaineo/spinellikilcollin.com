import * as React from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { TitleWrapper } from '../styled'
import { Heading, Span } from '../../../components/Text'
import { Price } from '../../../components/Price'
import { getVariantTitle } from '../../../utils'
import styled, { css } from '@xstyled/styled-components'

interface ProductDetailHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
  mobile?: string
}

const StockedLabel = styled('div')`
  ${({ theme }) => css`
    display: block;
    ${theme.mediaQueries.tablet} {
      display: none;
    }
  `}
`

const InStockDot = styled('span')`
  display: inline-block;
  background-color: #00d009;
  width: 10px;
  height: 10px;
  margin-right: 6px;
  border-radius: 100%;
  border: 1px solid #f5f3f3;
`

export const ProductDetailHeader = ({
  product,
  currentVariant,
}: ProductDetailHeaderProps) => {
  const variantTitle = getVariantTitle(product, currentVariant)
  const { inquiryOnly, variants } = product
  const { compareAtPriceV2, priceV2, currentlyNotInStock } =
    currentVariant?.sourceData ?? {}

  const variantsInStock =
    variants?.filter((v) => v?.sourceData?.currentlyNotInStock === false) || []

  return (
    <>
      <TitleWrapper product={product}>
        {variantsInStock?.length > 0 ? (
          <StockedLabel>
            <Heading level={4} weight={1} as={'em'}>
              <InStockDot />
              {currentlyNotInStock !== true
                ? 'Ready to ship'
                : 'Ready to ship in select sizes'}
            </Heading>
          </StockedLabel>
        ) : null}
        <Heading level={3} weight={2} mb={{ xs: 1, md: 2 }}>
          {variantTitle || product.title}
        </Heading>
        {inquiryOnly !== true ? (
          <Heading level={4} weight={1} mb={0} mt={{ xs: 1, md: 2 }}>
            <Price price={priceV2} />
            <Span ml={2} color="body.6" textDecoration="line-through">
              <Price price={compareAtPriceV2} />
            </Span>
          </Heading>
        ) : null}
      </TitleWrapper>
    </>
  )
}
