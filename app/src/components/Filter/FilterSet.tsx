import * as React from 'react'
import { Filter, FilterMatch, FilterSet as FilterSetType } from '../../types'
import { Heading } from '../Text'
import { definitely } from '../../utils'
import {
  FilterCheckboxElement,
  FilterCheckboxWrapper,
} from '../Forms/Fields/FilterCheckbox'
import { Label } from '../Forms/Fields/styled'
import { FilterSetState } from './reducer'
import { HeadingWrapper, FilterSetWrapper } from './styled'

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
    <FilterCheckboxWrapper>
      <FilterCheckboxElement
        id={matchKey}
        name={matchKey}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <Label color="body.9" htmlFor={matchKey}>
        {label}
      </Label>
    </FilterCheckboxWrapper>
  )
}

interface FilterSetProps {
  filterSet: FilterSetType
  filterSetState?: FilterSetState
  toggleMatch: (matchKey: string) => () => void
  resetSet: () => void
  setKey: string
  onSetChange: () => void
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
  onSetChange,
}: FilterSetProps) => {
  if (!filterSetState) {
    throw new Error('No filterSetState was supplied')
  }
  const { heading, filters } = filterSet
  const { activeMatchKeys } = filterSetState
  if (!filters || !filters.length) return null

  const resetKey = `${setKey}-disable`
  const viewAllFilter = {
    __typename: 'Filter' as const,
    label: 'View All',
  }
  const isDisabled = filterSetState.activeMatchKeys.length === 0
  return (
    <FilterSetWrapper>
      <HeadingWrapper>
        <Heading textTransform="uppercase" mt={0} mb={0} level={5}>
          {heading}
        </Heading>
      </HeadingWrapper>
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
