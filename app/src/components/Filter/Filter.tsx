import * as React from 'react'
import {
  FilterSet as FilterSetType,
  PriceRangeFilter as PriceRangeFilterType,
  FilterMatch,
} from '../../types'
import { FilterSet } from './FilterSet'
import { PriceRangeFilter } from './PriceRangeFilter'
import { Wrapper } from './styled'
import { definitely } from '../../utils'
import { useFilterState, FilterSetState } from './reducer'

const { useState, useEffect } = React

type FilterType = FilterSetType | PriceRangeFilterType

interface FilterProps {
  filters: FilterType[] | null
  applyFilters: (filterMatches: FilterMatch[][]) => void
}

const getCurrentFilters = (
  filters: FilterType[],
  filterSetStates: FilterSetState[],
): FilterMatch[][] => {
  return filterSetStates.reduce<FilterMatch[][]>((acc, setState) => {
    const filter = filters.find((filter) => filter._key === setState.key)
    if (!filter) return acc
    if (filter.__typename === 'FilterSet') {
      const filterSetFilters = definitely(filter.filters)
      const activeMatchKeys = setState.activeMatchKeys
      if (activeMatchKeys.length === 0) return acc
      console.log(activeMatchKeys, filterSetFilters)
      const filterMatches = filterSetFilters
        .filter((fsf) => activeMatchKeys.includes(fsf._key || 'some-key'))
        .map((fsf) => definitely(fsf.matches))
        .flat()
      return [...acc, filterMatches]
    }
    return acc
  }, [])
}

export const Filter = ({ filters, applyFilters }: FilterProps) => {
  const [open, setOpen] = useState(true)
  const { filterSetStates, resetAll, resetSet, toggle } = useFilterState(
    definitely(filters),
  )
  useEffect(() => {
    if (!filters) return
    const filterMatches = getCurrentFilters(filters, filterSetStates)
    console.log(filterMatches)
    applyFilters(filterMatches)
  }, [filters, filterSetStates])

  if (!filters || filterSetStates.length === 0) return null
  return (
    <Wrapper>
      {open
        ? filters.map((filter) =>
            filter.__typename === 'FilterSet' ? (
              <FilterSet
                key={filter._key || 'some-key'}
                setKey={filter._key || 'some-key'}
                filterSetState={filterSetStates.find(
                  (s) => s.key === filter._key,
                )}
                resetSet={resetSet(filter._key || 'some-key')}
                toggleMatch={toggle(filter._key || 'some-key')}
                filterSet={filter}
              />
            ) : filter.__typename === 'PriceRangeFilter' ? (
              <PriceRangeFilter
                key={filter._key || 'some-key'}
                priceRangeFilter={filter}
              />
            ) : null,
          )
        : null}
    </Wrapper>
  )
}
