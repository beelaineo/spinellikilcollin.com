import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { ProductOptionSelector } from './ProductOptionSelector'

interface Props {
  variants: ShopifyProductVariant[] | null
  product: ShopifyProduct
  changeValueForOption: (id: string) => (value: string) => void
}

/**
 * ProductVariantSelector
 *
 * - renders an array of option selectors
 * - does not render anything if there is only one variant
 */

export const ProductVariantSelector = (props: Props) => {
  const { variants, changeValueForOption, product } = props
  if (!variants || !variants.length) return null

  const { options } = product

  return (
    <Box mt={6} mb={3}>
      {options && options.length
        ? options.map((option) =>
            option ? (
              <ProductOptionSelector
                changeValueForOption={changeValueForOption}
                key={option._key || 'some-key'}
                option={option}
              />
            ) : null,
          )
        : null}
    </Box>
  )
}
