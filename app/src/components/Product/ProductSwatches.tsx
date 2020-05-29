import * as React from 'react'
import { Image } from '../../components/Image'
import {
  ShopifyProduct,
  ShopifyProductOption,
  ShopifyProductOptionValue,
} from '../../types'
import { getSwatchOptions, definitely } from '../../utils'
import { SwatchesWrapper, SwatchWrapper } from './styled'

interface OptionSwatchesProps {
  option: ShopifyProductOption
  onSwatchClick?: (value: ShopifyProductOptionValue) => () => void
  isSwatchActive?: (value: ShopifyProductOptionValue) => boolean
}

const noop = () => undefined

export const OptionSwatches = ({
  option,
  onSwatchClick,
  isSwatchActive,
}: OptionSwatchesProps) => (
  <SwatchesWrapper>
    {definitely(option.values).map((value) => (
      <SwatchWrapper
        key={value._key || 'some-type'}
        as={onSwatchClick ? 'button' : undefined}
        clickable={Boolean(onSwatchClick)}
        onClick={onSwatchClick ? onSwatchClick(value) : noop}
        active={isSwatchActive ? isSwatchActive(value) : false}
      >
        <Image image={value.swatch} ratio={1} sizes="40px" />
      </SwatchWrapper>
    ))}
  </SwatchesWrapper>
)

interface ProductSwatchesProps {
  product: ShopifyProduct
  onSwatchClick?: (value: ShopifyProductOptionValue) => () => void
}

export const ProductSwatches = ({
  product,
  onSwatchClick,
}: ProductSwatchesProps) => {
  const swatchOptions = getSwatchOptions(product.options)
  if (!swatchOptions.length) return null
  return (
    <>
      {swatchOptions.map((option) => (
        <OptionSwatches
          option={option}
          key={option._key || 'some-key'}
          onSwatchClick={onSwatchClick}
        />
      ))}
    </>
  )
}
