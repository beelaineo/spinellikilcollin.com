import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyProductOption } from '../../../types'
import { Heading } from '../../../components/Text'
import { Select } from '../../../components/Forms'
import { ColorSelector } from './ColorSelector'

interface ProductOptionSelectorProps {
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

  return (
    <Wrapper>
      <Heading level={4} mb={2}>
        {option.name}
      </Heading>
      {option.name.toLowerCase() === 'color' ? (
        <ColorSelector selectOption={selectOption} option={option} />
      ) : (
        <SelectWrapper>
          <Select id={option.name}>
            {option.values.map((v) =>
              v && v._key && v.value ? (
                <option key={v._key} value={v.value}>
                  {v.value}
                </option>
              ) : null,
            )}
          </Select>
        </SelectWrapper>
      )}
    </Wrapper>
  )
}
