import * as React from 'react'
import { Image } from '../../components/Image'
import {
  ShopifyProduct,
  ShopifyProductOption,
  ShopifyProductOptionValue,
  ShopifyProductVariant,
  ShopifySourceProductVariant,
  Maybe,
} from '../../types'
import {
  getSwatchOptions,
  definitely,
  getVariantBySelectedOption,
  optionMatchesVariant,
} from '../../utils'
import { SwatchesWrapper, SwatchWrapper } from './styled'

interface OptionSwatchesProps {
  option: ShopifyProductOption
  variants?: Maybe<Maybe<ShopifyProductVariant>[]>
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
  onSwatchClick,
  isSwatchActive,
  onSwatchHover,
}: OptionSwatchesProps) => {
  console.log('option:', option)
  console.log('Option Swatch variants:', variants)
  return (
    <SwatchesWrapper>
      {definitely(option.values).map((value) => (
        <SwatchWrapper
          key={value._key || 'some-type'}
          as={onSwatchClick ? 'button' : undefined}
          clickable={Boolean(onSwatchClick)}
          onClick={onSwatchClick ? onSwatchClick(option, value) : undefined}
          onMouseEnter={
            onSwatchHover ? onSwatchHover(option, value) : undefined
          }
          active={isSwatchActive ? isSwatchActive(option, value) : false}
        >
          <Image
            image={value.swatch}
            objectFit="contain"
            ratio={1}
            sizes="40px"
          />
        </SwatchWrapper>
      ))}
    </SwatchesWrapper>
  )
}

interface ProductSwatchesProps {
  product: ShopifyProduct
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
  onSwatchClick,
  onSwatchHover,
  isSwatchActive,
}: ProductSwatchesProps) => {
  const swatchOptions = getSwatchOptions(product).filter(
    // @ts-ignore: Object is possibly 'null' or 'undefined'.
    (option) => option.values.length > 0,
  )

  console.log('ProductSwatch product:', product)
  console.log('ProductSwatch swatchOptions:', swatchOptions)

  return (
    <div>
      {swatchOptions.map((option) => (
        <OptionSwatches
          option={option}
          variants={product.variants}
          key={option._key || 'some-key'}
          onSwatchClick={onSwatchClick}
          onSwatchHover={onSwatchHover}
          isSwatchActive={isSwatchActive}
        />
      ))}
    </div>
  )
}
