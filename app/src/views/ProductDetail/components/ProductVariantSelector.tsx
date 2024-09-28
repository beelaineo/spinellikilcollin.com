import * as React from 'react'
import styled, { x } from '@xstyled/styled-components'
import { Product, ShopifyProductVariant } from '../../../types'
import { ProductOptionSelector } from './ProductOptionSelector'
import { getValidProductOptions, optionMatchesVariant } from '../../../utils'

const OptionWrapper = styled.div`
  justify-content: space-between;
  align-items: flex-end;
  display: flex;

  & + & {
    margin-top: 3;
  }

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
  product: Product
  currentVariant: ShopifyProductVariant
  setIsInquiryOnly: (value: boolean) => void
  changeValueForOption: (id: string) => (value: string) => void
}

/**
 * ProductVariantSelector
 *
 * - renders an array of option selectors
 * - does not render anything if there is only one variant
 */

export const ProductVariantSelector = (props: Props) => {
  const {
    variants,
    changeValueForOption,
    product,
    currentVariant,
    setIsInquiryOnly,
  } = props
  if (!variants || !variants.length) return null
  const productType = product?.store?.productType

  const { inquiryOnly } = product

  const options = getValidProductOptions(product)

  if (options.length < 1) return null

  return (
    <x.div mb={5}>
      {options
        .filter(
          (option) => !Boolean(option.name === 'Size' && inquiryOnly === true),
        )
        .map((option) =>
          option?.values && option.values.length > 1 ? (
            <OptionWrapper key={option._key || 'some-key'}>
              <ProductOptionSelector
                changeValueForOption={changeValueForOption}
                variants={variants}
                product={product}
                currentVariant={currentVariant}
                option={option}
                isInput={Boolean(productType === 'Gift Card')}
                setIsInquiryOnly={setIsInquiryOnly}
              />
            </OptionWrapper>
          ) : null,
        )}
    </x.div>
  )
}
