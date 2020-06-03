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
}

const Wrapper = styled.div``

const SwatchesWrapper = styled.div`
  display: flex;
`

const SelectWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 200px;

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

  const handleSwatchClick = ({ value }: ShopifyProductOptionValue) => () => {
    if (value) selectOption(value)
  }

  const isSwatchActive = (value: ShopifyProductOptionValue): boolean => {
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
      <Heading level={4} mb={2}>
        {option.name}
      </Heading>
      <SelectWrapper>
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
            <Field
              type="select"
              name={option.name}
              onChange={handleSelectChange}
              options={options}
            />
          </Form>
        )}
      </SelectWrapper>
    </Wrapper>
  )
}
