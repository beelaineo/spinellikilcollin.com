import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import {
  ShopifyProductOption,
  ShopifyProductVariant,
  ShopifyProductOptionValue,
} from '../../../types'
import { Heading } from '../../../components/Text'
import { Form, Field } from '../../../components/Forms'
import { OptionSwatches } from '../../../components/Product/ProductSwatches'
import { ProductPriceInput } from '../../../components/Forms/Fields/ProductPriceInput'
import {
  optionMatchesVariant,
  isValidSwatchOption,
  definitely,
} from '../../../utils'

interface ProductOptionSelectorProps {
  variants: ShopifyProductVariant[]
  currentVariant: ShopifyProductVariant
  option: ShopifyProductOption
  changeValueForOption: (optionId: string) => (value: string) => void
  isInput: boolean
}

interface SelectWrapperProps {
  isInput: boolean
}

const Wrapper = styled.div``

const SwatchesWrapper = styled.div`
  display: flex;
`

const SelectWrapper = styled.div<SelectWrapperProps>`
  ${({ theme, isInput }) => css`
    max-width: ${isInput ? '100%' : '200px'};

    ${theme.mediaQueries.mobile} {
      width: 100%;
      max-width: initial;
    }
  `}
`

export const ProductOptionSelector = ({
  option,
  changeValueForOption,
  currentVariant,
  isInput,
}: ProductOptionSelectorProps) => {
  if (!option || !option.name || !option.shopifyOptionId || !option.values) {
    console.warn('Missing option config', option)
    return null
  }

  if (option.values.length === 0) return null

  const selectOption = changeValueForOption(option.name)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    selectOption(value)
  }

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleProductInputChange', e.target.value)
    const { value } = e.target
    selectOption(value)
  }

  const handleSwatchClick =
    (option: ShopifyProductOption, { value }: ShopifyProductOptionValue) =>
    () => {
      if (value) selectOption(value)
    }

  const isSwatchActive = (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ): boolean => {
    return optionMatchesVariant(option.name || 'foo', value, currentVariant)
  }

  const handleSubmit = (values: any) => {
    //
  }

  const options = definitely(
    definitely(option.values).map(({ value }) =>
      value
        ? {
            value: value,
            id: value,
            label: value,
          }
        : null,
    ),
  )

  return (
    <Wrapper>
      <Heading level={5} mb={2}>
        {isInput ? 'Please enter your gift amount:' : option.name}
      </Heading>
      <SelectWrapper isInput={isInput}>
        {isValidSwatchOption(option) ? (
          <SwatchesWrapper>
            <OptionSwatches
              onSwatchClick={handleSwatchClick}
              isSwatchActive={isSwatchActive}
              option={option}
            />
          </SwatchesWrapper>
        ) : (
          <Form onSubmit={handleSubmit} initialValues={{}}>
            {isInput ? (
              <ProductPriceInput
                name={option.name}
                onChange={handleProductInputChange}
                options={options}
              />
            ) : (
              <Field
                type="select"
                name={option.name}
                onChange={handleSelectChange}
                options={options}
              />
            )}
          </Form>
        )}
      </SelectWrapper>
    </Wrapper>
  )
}
