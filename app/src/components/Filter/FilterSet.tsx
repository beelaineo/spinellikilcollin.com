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
  FiltersWrapper,
} from './styled'
import { FilterIndicator } from './FilterIndicator'
import { theme } from '../../theme'
import { useMedia } from '../../hooks'
const { useEffect, useState } = React

interface FilterCheckboxProps {
  filter: Filter
  onChange: () => void
  checked: boolean
  matchKey: string
  hidden: boolean
}

const FilterCheckbox = ({
  matchKey,
  filter,
  onChange,
  checked,
  hidden,
}: FilterCheckboxProps) => {
  const { label } = filter
  if (hidden === false) {
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
  } else {
    return null
  }
}

interface FilterSetProps {
  filterSet: FilterSetType
  filterSetState?: FilterSetState
  toggleMatch: (matchKey: string) => () => void
  resetSet: () => void
  setKey: string
  active: boolean
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
  active,
}: FilterSetProps) => {
  if (!filterSetState) {
    throw new Error('No filterSetState was supplied')
  }
  const { heading, filters } = filterSet
  const { activeMatchKeys } = filterSetState
  if (!filters || !filters.length) return null

  const [mouseEnter, setMouseEnter] = useState(false)
  const handleMouseEnter = () => setMouseEnter(true)
  const handleMouseLeave = () => setMouseEnter(false)

  const isMobile = useMedia({
    maxWidth: `960px`,
  })

  return (
    <FilterSetWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      active={active}
    >
      <HeadingWrapper
        isActive={Boolean(activeMatchKeys.length > 0)}
        type={heading}
      >
        <Heading textTransform="uppercase" level={5}>
          {Boolean(activeMatchKeys.length > 0) ? heading + ':' : heading}
        </Heading>
        <FilterIndicatorsWrapper
          isActive={Boolean(activeMatchKeys.length > 0)}
          setType={filterSet.heading}
        >
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
      <FiltersWrapper
        isHovered={
          Boolean(!isMobile && mouseEnter) || Boolean(isMobile && active)
        }
      >
        {definitely(filters).map((filter) => {
          console.log('filterset heading', filterSet.heading)
          console.log('filters', filters)
          return (
            <FilterCheckbox
              key={filter._key || 'some-key'}
              matchKey={filter._key || 'some-key'}
              onChange={toggleMatch(filter._key || 'some-key')}
              filter={filter}
              checked={activeMatchKeys.includes(filter._key || 'foo')}
              hidden={Boolean(
                (filterSet.heading === 'Type' ||
                  filterSet.heading === 'Bands') &&
                  filter._key &&
                  activeMatchKeys.includes(filter._key),
              )}
            />
          )
        })}
      </FiltersWrapper>
    </FilterSetWrapper>
  )
}
