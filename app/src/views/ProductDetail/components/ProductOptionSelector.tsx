import React, { SyntheticEvent } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyProductOption, ShopifyProductVariant } from '../../../types'
import { Heading } from '../../../components/Text'
import { Form, Field } from '../../../components/Forms'
import { ColorSelector } from './ColorSelector'
import { definitely } from '../../../utils'

interface ProductOptionSelectorProps {
  variants: ShopifyProductVariant[]
  currentVariant: ShopifyProductVariant
  option: ShopifyProductOption
  changeValueForOption: (optionId: string) => (value: string) => void
}

const Wrapper = styled.div`
  & + & {
    margin-top: 5;
  }
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
}: ProductOptionSelectorProps) => {
  if (!option || !option.name || !option.shopifyOptionId || !option.values) {
    console.warn('Missing option config', option)
    return null
  }

  const selectOption = changeValueForOption(option.name)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    selectOption(value)
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
      {option.name.toLowerCase() === 'color' ? (
        <ColorSelector selectOption={selectOption} option={option} />
      ) : (
        <SelectWrapper>
          <Form onSubmit={handleSubmit} initialValues={{}}>
            <Field
              type="select"
              name={option.name}
              onChange={handleSelectChange}
              options={options}
            />
          </Form>
        </SelectWrapper>
      )}
    </Wrapper>
  )
}
