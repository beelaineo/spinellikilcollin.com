import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Box } from '@xstyled/styled-components'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { ProductOptionSelector } from './ProductOptionSelector'
import { RingSizerButton } from './RingSizerButton'

const OptionWrapper = styled.div`
  justify-content: space-between;
  align-items: flex-end;
  display: flex;

  & > *:nth-child(1),
  & > *:nth-child(2) {
    width: 50%;
  }

  & > *:only-child {
    width: 100%;
  }
`

interface Props {
  variants: ShopifyProductVariant[] | null
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
  changeValueForOption: (id: string) => (value: string) => void
}

/**
 * ProductVariantSelector
 *
 * - renders an array of option selectors
 * - does not render anything if there is only one variant
 */

export const ProductVariantSelector = (props: Props) => {
  const { variants, changeValueForOption, product, currentVariant } = props
  if (!variants || !variants.length) return null
  const productType = product?.sourceData?.productType

  const { options } = product

  return (
    <Box mt={6} mb={3}>
      {options && options.length
        ? options.map((option) =>
            option ? (
              <OptionWrapper key={option._key || 'some-key'}>
                <ProductOptionSelector
                  changeValueForOption={changeValueForOption}
                  variants={variants}
                  currentVariant={currentVariant}
                  option={option}
                />
                {productType === 'Ring' && option.name === 'Size' ? (
                  <RingSizerButton product={product} />
                ) : null}
              </OptionWrapper>
            ) : null,
          )
        : null}
    </Box>
  )
}
