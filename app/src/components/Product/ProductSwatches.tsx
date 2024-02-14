import * as React from 'react'
import { Image } from '../../components/Image'
import {
  Product,
  ShopifyProductOption,
  ProductOption,
  // ShopifyProductOptionValue,
  ProductOptionValue,
  ShopifyProductVariant,
  ShopifySourceProductVariant,
  ShopifySourceProductVariantEdge,
  Maybe,
} from '../../types'
import { getSwatchOptions, definitely } from '../../utils'
import { SwatchesWrapper, SwatchWrapper } from './styled'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyStorefrontProductVariant } from '../../types/generated-shopify'

import { config } from '../../config'

const { SHOW_IN_STOCK_INDICATORS } = config

const showInStockIndicators = SHOW_IN_STOCK_INDICATORS === 'true'

const OptionSwatchesWrapper = styled('div')`
  display: flex;
  justify-content: center;
  gap: 5;
`

const InStockDot = styled('span')`
  display: inline-block;
  background-color: #00d009;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  top: 1px;
  right: -2px;
  border: 1px solid #f5f3f3;
`

interface OptionSwatchesProps {
  option: ProductOption
  variants?: Maybe<Maybe<ShopifyProductVariant>[]>
  stockedOptions?: string[]
  disableStockIndication?: boolean
  onSwatchHover?: (
    option: ProductOption,
    value: ProductOptionValue,
  ) => () => void
  onSwatchClick?: (
    option: ProductOption,
    value: ProductOptionValue,
  ) => () => void
  isSwatchActive?: (option: ProductOption, value: ProductOptionValue) => boolean
}

export const OptionSwatches = ({
  option,
  variants,
  stockedOptions,
  onSwatchClick,
  isSwatchActive,
  onSwatchHover,
  disableStockIndication,
}: OptionSwatchesProps) => {
  const isSwatchCurrentlyInStock = (value, stockedOptions): boolean => {
    return stockedOptions.includes(value._key) ? true : false
  }

  return (
    <SwatchesWrapper>
      {definitely(option.values).map((value) => (
        <SwatchWrapper
          key={value._key || 'some-type'}
          as={onSwatchClick ? 'button' : undefined}
          role="button"
          tabIndex={0}
          clickable={Boolean(onSwatchClick)}
          onClick={onSwatchClick ? onSwatchClick(option, value) : undefined}
          onMouseEnter={
            onSwatchHover ? onSwatchHover(option, value) : undefined
          }
          active={isSwatchActive ? isSwatchActive(option, value) : false}
          aria-label={'Select color ' + value.value}
        >
          <Image
            image={value.swatch}
            objectFit="contain"
            ratio={1}
            sizes="40px"
          />
          {isSwatchCurrentlyInStock(value, stockedOptions) &&
          showInStockIndicators ? (
            <InStockDot />
          ) : (
            ''
          )}
        </SwatchWrapper>
      ))}
    </SwatchesWrapper>
  )
}

interface ProductSwatchesProps {
  product: Product
  stockedVariants?: Maybe<ShopifyProductVariant>[]
  disableStockIndication?: boolean
  includedVariants?: Maybe<
    ShopifyStorefrontProductVariant[] | ShopifyProductVariant[]
  >
  onSwatchHover?: (
    option: ProductOption,
    value: ProductOptionValue,
  ) => () => void
  onSwatchClick?: (
    option: ProductOption,
    value: ProductOptionValue,
  ) => () => void
  isSwatchActive?: (option: ProductOption, value: ProductOptionValue) => boolean
}

export const IsDisplayingSwatches = (product: Product) => {
  const swatchOptions = getSwatchOptions(product).filter(
    // @ts-ignore: Object is possibly 'null' or 'undefined'.
    (option) => option.values.length > 0,
  )
  return swatchOptions.length > 0 ? true : false
}

export const ProductSwatches = ({
  product,
  stockedVariants,
  onSwatchClick,
  onSwatchHover,
  isSwatchActive,
  disableStockIndication,
  includedVariants,
}: ProductSwatchesProps) => {
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
  const optionsArray = ['Color', 'Style', 'Material']
  const stockedColorOptions =
    disableStockIndication && includedVariants
      ? includedVariants
          ?.map((variant) => {
            return variant?.sourceData?.selectedOptions?.find((option) => {
              if (!option?.name) return false
              return optionsArray.includes(option?.name)
            })
          })
          .map((option) => slugify(option?.value))
      : stockedVariants
          ?.map((variant) => {
            return variant?.sourceData?.selectedOptions?.find((option) => {
              if (!option?.name) return false
              return optionsArray.includes(option?.name)
            })
          })
          .map((option) => slugify(option?.value))

  const stockedCaratOptions = product?.store?.variants
    ?.map((variant) => {
      return variant?.sourceData?.selectedOptions?.find(
        (option) => option?.name === 'Carat',
      )
    })
    .map((option) => slugify(option?.value))

  const swatchOptions = getSwatchOptions(product).filter(
    // @ts-ignore: Object is possibly 'null' or 'undefined'.
    (option) => option.values.length > 0,
  )

  return (
    <OptionSwatchesWrapper>
      {swatchOptions.map((option) => (
        <OptionSwatches
          option={option}
          variants={product.store?.variants}
          stockedOptions={stockedColorOptions}
          key={option._key || 'some-key'}
          onSwatchClick={onSwatchClick}
          onSwatchHover={onSwatchHover}
          isSwatchActive={isSwatchActive}
          disableStockIndication={disableStockIndication}
        />
      ))}
    </OptionSwatchesWrapper>
  )
}
