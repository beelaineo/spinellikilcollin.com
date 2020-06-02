import * as React from 'react'
import { Filter, FilterMatch, FilterSet as FilterSetType } from '../../types'
import { Heading } from '../Text'
import { definitely } from '../../utils'
import { CheckboxElement, CheckboxWrapper } from '../Forms/Fields/Checkbox'
import { Label } from '../Forms/Fields/styled'
import { FilterSetState } from './reducer'
import { FilterSetWrapper } from './styled'

interface FilterCheckboxProps {
  filter: Filter
  onChange: () => void
  checked: boolean
  matchKey: string
}

const FilterCheckbox = ({
  matchKey,
  filter,
  onChange,
  checked,
}: FilterCheckboxProps) => {
  const { label } = filter
  return (
    <CheckboxWrapper>
      <CheckboxElement
        id={matchKey}
        name={matchKey}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <Label htmlFor={matchKey}>{label}</Label>
    </CheckboxWrapper>
  )
}

interface FilterSetProps {
  filterSet: FilterSetType
  filterSetState?: FilterSetState
  toggleMatch: (matchKey: string) => () => void
  resetSet: () => void
  setKey: string
}

interface State {
  matches: FilterMatch[] | null
}

export const FilterSet = ({
  filterSet,
  filterSetState,
  toggleMatch,
  resetSet,
  setKey,
}: FilterSetProps) => {
  if (!filterSetState) {
    throw new Error('No filterSetState was supplied')
  }
  const { heading, filters } = filterSet
  const { activeMatchKeys } = filterSetState
  if (!filters || !filters.length) return null

  const resetKey = `${setKey}-disable`
  const viewAllFilter = {
    __typename: 'Filter' as 'Filter',
    label: 'View All',
  }
  const isDisabled = filterSetState.activeMatchKeys.length === 0
  const span = Math.floor(filters.length)
  return (
    <FilterSetWrapper span={span}>
      <Heading level={4}>{heading}</Heading>
      <FilterCheckbox
        matchKey={resetKey}
        onChange={resetSet}
        filter={viewAllFilter}
        checked={isDisabled}
      />
      {definitely(filters).map((filter) => (
        <FilterCheckbox
          key={filter._key || 'some-key'}
          matchKey={filter._key || 'some-key'}
          onChange={toggleMatch(filter._key || 'some-key')}
          filter={filter}
          checked={activeMatchKeys.includes(filter._key || 'foo')}
        />
      ))}
    </FilterSetWrapper>
  )
}
