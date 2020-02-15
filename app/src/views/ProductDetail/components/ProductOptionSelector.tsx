import * as React from 'react'
import { ShopifyProductOption } from '../../../types'
import { Heading } from '../../../components/Text'
import { Select } from '../../../components/Forms'

interface ProductOptionSelectorProps {
  option: ShopifyProductOption
}

export const ProductOptionSelector = ({ option }: ProductOptionSelectorProps) =>
  option && option._key && option.name && option.values ? (
    <div style={{ marginBottom: '20px', width: '160px' }}>
      <Heading level={5} mb={1}>
        {option.name}
      </Heading>
      <Select id={option.name}>
        {option.values.map((v) =>
          v && v._key && v.value ? (
            <option key={v._key} value={v.value}>
              {v.value}
            </option>
          ) : null,
        )}
      </Select>
    </div>
  ) : null
