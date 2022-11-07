import * as React from 'react'
import { Filter, FilterMatch, FilterSet as FilterSetType } from '../../types'
import { Heading } from '../Text'
import { definitely } from '../../utils'
import {
  FilterCheckboxElement,
  FilterCheckboxWrapper,
} from '../Forms/Fields/FilterCheckbox'
import { Label } from '../Forms/Fields/styled'
import { FilterSetState } from './types'
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
  scrollGridIntoView: () => void
  checked: boolean
  matchKey: string
  hidden: boolean
}

const FilterCheckbox = ({
  matchKey,
  filter,
  onChange,
  scrollGridIntoView,
  checked,
  hidden,
}: FilterCheckboxProps) => {
  const { label } = filter
  const handleChange = () => {
    onChange()
    scrollGridIntoView()
  }
  if (hidden === false) {
    return (
      <FilterCheckboxWrapper>
        <FilterCheckboxElement
          id={matchKey}
          name={matchKey}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          tabIndex={0}
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
  scrollGridIntoView: () => void
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
  scrollGridIntoView,
  resetSet,
  setKey,
  active,
}: FilterSetProps) => {
  if (!filterSetState) {
    throw new Error('No filterSetState was supplied')
  }
  const { heading, filters } = filterSet
  const { activeMatchKeys } = filterSetState

  const [mouseEnter, setMouseEnter] = useState(false)
  const isMobile = useMedia({
    maxWidth: `960px`,
  })

  if (!filters || !filters.length) return null

  const handleMouseEnter = () => setMouseEnter(true)
  const handleMouseLeave = () => setMouseEnter(false)

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        setMouseEnter(false)
      }
    })
  }

  return (
    <FilterSetWrapper
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      active={active}
      tabIndex={0}
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
        type={filterSet.heading}
      >
        {definitely(filters).map((filter) => {
          return (
            <FilterCheckbox
              key={filter._key || 'some-key'}
              matchKey={filter._key || 'some-key'}
              onChange={toggleMatch(filter._key || 'some-key')}
              scrollGridIntoView={scrollGridIntoView}
              filter={filter}
              checked={activeMatchKeys.includes(filter._key || 'foo')}
              hidden={Boolean(
                (filterSet.heading === 'Type' ||
                  filterSet.heading === 'Bands' ||
                  filterSet.heading === 'Size') &&
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
