import React, { SyntheticEvent } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyProductOption, ShopifyProductVariant } from '../../../types'
import { Heading } from '../../../components/Text'
import { Form, Field } from '../../../components/Forms'
import { ColorSelector } from './ColorSelector'
import { definitely } from '../../../utils'

// const ProductSelect = styled(Select)`
//   border: 1px solid;
//   border-color: body.4;
//   color: body.8;
// `

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

  const handleSelectChange = (optionId: string) => (value: string) => {
    changeValueForOption(optionId)(value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
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
          <Form onSubmit={handleSubmit}>
            <Field
              type="select"
              name={option.name}
              onChange={handleSelectChange(option.name)}
              options={options}
            />
          </Form>
        </SelectWrapper>
      )}
    </Wrapper>
  )
}
