import * as React from 'react'
import {
  Maybe,
  Product,
  ShopifyProduct,
  ShopifyProductVariant,
} from '../../../types'
import { TitleWrapper } from '../styled'
import { Heading, Span } from '../../../components/Text'
import { Price } from '../../../components/Price'
import { getVariantTitle } from '../../../utils'
import styled, { css } from '@xstyled/styled-components'

interface ProductDetailHeaderProps {
  product: Product
  currentVariant: ShopifyProductVariant
  disableStockIndication?: boolean
  mobile?: string
}

interface WithHide {
  hide: boolean
}

const StockedLabel = styled('div')<WithHide>`
  ${({ theme, hide }) => css`
    display: block;
    opacity: ${hide ? 0 : 1};
    transition: 250ms ease;
    em {
      font-size: 13px;
    }
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
  disableStockIndication,
}: ProductDetailHeaderProps) => {
  const variantTitle = getVariantTitle(product, currentVariant)
  const { inquiryOnly } = product
  const variants = product.store?.variants
  const { compareAtPriceV2, priceV2, currentlyNotInStock } =
    currentVariant?.sourceData ?? {}

  const slugify = (text?: Maybe<string>) => {
    if (!text) return ''
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  const variantsInStock =
    variants?.filter(
      (v) =>
        v?.sourceData?.currentlyNotInStock === false &&
        !v?.sourceData.selectedOptions?.find(
          (o) => o?.value == 'Not sure of my size',
        ),
    ) || []

  const stockedVariants = product.store?.variants?.filter((variant) => {
    return (
      variant?.sourceData?.availableForSale === true &&
      variant?.sourceData?.currentlyNotInStock === false &&
      !variant?.sourceData?.selectedOptions?.find(
        (o) => o?.value == 'Not sure of my size',
      ) &&
      !variant?.sourceData?.selectedOptions?.find((o) => o?.name == 'Carat')
    )
  })

  const keys = ['Size', 'Quantity', 'Length', 'Title']

  const stockedColorOptions = stockedVariants
    ?.map((variant) => {
      return variant?.sourceData?.selectedOptions?.find(
        (option) => option?.name === 'Color',
      )
    })
    .map((option) => slugify(option?.value))

  const isSwatchCurrentlyInStock = (
    currentVariant,
    stockedOptions,
    stockedVariants,
  ): boolean => {
    if (
      currentVariant.sourceData?.selectedOptions?.find(
        (option) => option.name === 'Color',
      ) !== undefined
    ) {
      const color = slugify(
        currentVariant.sourceData.selectedOptions.find(
          (option) => option.name === 'Color',
        ).value,
      )
      return stockedOptions.includes(color)
    } else {
      return Boolean(stockedVariants?.length > 0)
    }
  }

  return (
    <>
      <TitleWrapper product={product}>
        {variantsInStock?.length > 0 && disableStockIndication !== true ? (
          <StockedLabel
            hide={
              !isSwatchCurrentlyInStock(
                currentVariant,
                stockedColorOptions,
                variantsInStock,
              )
            }
          >
            <Heading level={5} weight={1} as={'em'}>
              <InStockDot />
              {currentlyNotInStock !== true &&
              !currentVariant.title?.includes('Not sure of my size')
                ? 'Ready to Ship'
                : 'Ready to Ship in Select Sizes'}
            </Heading>
          </StockedLabel>
        ) : null}
        <Heading level={3} weight={2} mb={{ xs: 1, md: 2 }}>
          {variantTitle || product.title}
        </Heading>
        {inquiryOnly !== true ? (
          <Heading level={4} weight={1} mb={0} mt={{ xs: 1, md: 2 }}>
            <Price price={priceV2} />
            {compareAtPriceV2 && (
              <Span ml={2} color="body.6" textDecoration="line-through">
                <Price price={compareAtPriceV2} />
              </Span>
            )}
          </Heading>
        ) : null}
      </TitleWrapper>
    </>
  )
}
