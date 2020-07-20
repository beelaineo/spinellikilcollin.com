import * as React from 'react'
import styled from '@xstyled/styled-components'
import { SelectElement } from '../Forms/Fields/styled'

export enum Sort {
  Default = 'Default',
  PriceAsc = 'Price, high to low',
  PriceDesc = 'Price, low to high',
  DateAsc = 'Release date, high to low',
  DateDesc = 'Release date, low to high',
}

const SelectField = styled(SelectElement)`
  color: body.8;
  border: none;
  min-width: initial;
  padding: 0 4 0 3;
  height: auto;
`

const sortOptions = Object.values(Sort).map((value) => ({
  label: value,
  value,
  id: value,
}))

interface SortButtonProps {
  applySort: (sort: Sort) => void
}

export const SortButton = ({ applySort }: SortButtonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    applySort(value)
  }

  return (
    <SelectField name="currency" color="body.8" onChange={handleChange}>
      {sortOptions.map(({ id, value, label }) => (
        <option key={id} id={id} value={value}>
          {label}
        </option>
      ))}
    </SelectField>
  )
}
