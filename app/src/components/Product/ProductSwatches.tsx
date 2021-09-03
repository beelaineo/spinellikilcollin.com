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
  onSwatchClick,
  isSwatchActive,
  onSwatchHover,
}: OptionSwatchesProps) => (
  <SwatchesWrapper>
    {definitely(option.values).map((value) => (
      <SwatchWrapper
        key={value._key || 'some-type'}
        as={onSwatchClick ? 'button' : undefined}
        clickable={Boolean(onSwatchClick)}
        onClick={onSwatchClick ? onSwatchClick(option, value) : undefined}
        onMouseEnter={onSwatchHover ? onSwatchHover(option, value) : undefined}
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

export const ProductSwatches = ({
  product,
  onSwatchClick,
  onSwatchHover,
  isSwatchActive,
}: ProductSwatchesProps) => {
  const swatchOptions = getSwatchOptions(product).filter(
    // eslint-disable-next-line
    (option) => option.values.length > 0,
  )

  return (
    <div>
      {swatchOptions.map((option) => (
        <OptionSwatches
          option={option}
          key={option._key || 'some-key'}
          onSwatchClick={onSwatchClick}
          onSwatchHover={onSwatchHover}
          isSwatchActive={isSwatchActive}
        />
      ))}
    </div>
  )
}
