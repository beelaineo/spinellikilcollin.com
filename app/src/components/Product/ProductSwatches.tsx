import * as React from 'react'
import { Image } from '../../components/Image'
import { Heading } from '../../components/Text'
import { ShopifyProduct } from '../../types'
import { getSwatchOptions, definitely } from '../../utils'
import { SwatchesWrapper, SwatchLabel, SwatchWrapper } from './styled'

interface ProductSwatchesProps {
  product: ShopifyProduct
}

export const ProductSwatches = ({ product }: ProductSwatchesProps) => {
  const swatchOptions = getSwatchOptions(product.options)
  if (!swatchOptions.length) return null
  const option = swatchOptions[0]
  if (!option) return null

  return (
    <SwatchesWrapper>
      {definitely(option.values).map((value) => (
        <SwatchWrapper key={value._key || 'some-type'}>
          <Image image={value.swatch} ratio={1} sizes="40px" />
          {value.value ? (
            <SwatchLabel>
              <Heading level={5} weight={2}>
                {value.value}
              </Heading>
            </SwatchLabel>
          ) : null}
        </SwatchWrapper>
      ))}
    </SwatchesWrapper>
  )
}
