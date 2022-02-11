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
import {
  HeadingWrapper,
  FilterSetWrapper,
  FilterIndicatorsWrapper,
} from './styled'
import { FilterIndicator } from './FilterIndicator'

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

  console.log(filterSet)
  console.log(activeMatchKeys)

  return (
    <FilterSetWrapper>
      <HeadingWrapper
        isActive={Boolean(activeMatchKeys.length > 0)}
        type={heading}
      >
        <Heading textTransform="uppercase" mt={0} mb={0} level={5}>
          {Boolean(activeMatchKeys.length > 0) ? heading + ':' : heading}
        </Heading>
        <FilterIndicatorsWrapper>
          {Boolean(activeMatchKeys.length > 0)
            ? definitely(filters).map((filter, i) => {
                if (filter._key && activeMatchKeys.includes(filter._key)) {
                  return (
                    <FilterIndicator
                      type={filterSet.heading}
                      label={filter.label}
                      index={i}
                      key={filter._key || 'some-key'}
                      remove={toggleMatch(filter._key || 'some-key')}
                    />
                  )
                }
              })
            : ''}
        </FilterIndicatorsWrapper>
      </HeadingWrapper>
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
