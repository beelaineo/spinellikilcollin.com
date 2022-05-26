import * as React from 'react'
import { Image } from '../../components/Image'
import {
  ShopifyProduct,
  ShopifyProductOption,
  ShopifyProductOptionValue,
  ShopifyProductVariant,
  ShopifySourceProductVariant,
  ShopifySourceProductVariantEdge,
  Maybe,
} from '../../types'
import {
  getSwatchOptions,
  definitely,
  getVariantBySelectedOption,
  optionMatchesVariant,
} from '../../utils'
import { SwatchesWrapper, SwatchWrapper } from './styled'
import styled, { css } from '@xstyled/styled-components'

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
  option: ShopifyProductOption
  variants?: Maybe<Maybe<ShopifyProductVariant>[]>
  stockedOptions?: string[]
  onSwatchHover?: (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ) => () => void
  onSwatchClick?: (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ) => () => void
  isSwatchActive?: (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ) => boolean
}

export const OptionSwatches = ({
  option,
  variants,
  stockedOptions,
  onSwatchClick,
  isSwatchActive,
  onSwatchHover,
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
          {isSwatchCurrentlyInStock(value, stockedOptions) ? (
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
  product: ShopifyProduct
  stockedVariants?: Maybe<ShopifySourceProductVariantEdge>[]
  onSwatchHover?: (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ) => () => void
  onSwatchClick?: (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ) => () => void
  isSwatchActive?: (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ) => boolean
}

export const IsDisplayingSwatches = (product: ShopifyProduct) => {
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
  const stockedColorOptions = stockedVariants
    ?.map((variant) => {
      return variant?.node?.selectedOptions?.find(
        (option) => option?.name === 'Color',
      )
    })
    .map((option) => slugify(option?.value))

  const swatchOptions = getSwatchOptions(product).filter(
    // @ts-ignore: Object is possibly 'null' or 'undefined'.
    (option) => option.values.length > 0,
  )

  return (
    <div>
      {swatchOptions.map((option) => (
        <OptionSwatches
          option={option}
          variants={product.variants}
          stockedOptions={stockedColorOptions}
          key={option._key || 'some-key'}
          onSwatchClick={onSwatchClick}
          onSwatchHover={onSwatchHover}
          isSwatchActive={isSwatchActive}
        />
      ))}
    </div>
  )
}
