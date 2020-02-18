import * as React from 'react'
import styled from '@xstyled/styled-components'
import { ShopifyProductOption } from '../../../types'
import { Heading } from '../../../components/Text'
import { Select } from '../../../components/Forms'
import { ColorSelector } from './ColorSelector'

interface ProductOptionSelectorProps {
  option: ShopifyProductOption
}

const Wrapper = styled.div`
  & + & {
    margin-top: 5;
  }
`

const SelectWrapper = styled.div`
  max-width: 200px;
`

export const ProductOptionSelector = ({ option }: ProductOptionSelectorProps) =>
  option && option._key && option.name && option.values ? (
    <Wrapper>
      <Heading level={4} mb={2}>
        {option.name}
      </Heading>
      {option.name.toLowerCase() === 'color' ? (
        <ColorSelector option={option} />
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
  ) : null
