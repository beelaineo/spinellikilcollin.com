import * as React from 'react'
import {
  FilterSet as FilterSetType,
  PriceRangeFilter as PriceRangeFilterType,
  InventoryFilter as InventoryFilterTypeSource,
  FilterConfiguration,
  PriceRangeFilterConfiguration,
  InventoryFilterConfiguration,
  FilterMatchGroup,
  PRICE_RANGE_FILTER,
  INVENTORY_FILTER,
  FILTER_MATCH_GROUP,
  Maybe,
} from '../../types'
import { FilterSet } from './FilterSet'
import { PriceRangeFilter } from './PriceRangeFilter'
import { InventoryFilter } from './InventoryFilter'
import {
  Wrapper,
  MobileToggleWrapper,
  MobileHeader,
  MobileControls,
  ControlTab,
  MobileCloseButtonWrapper,
  CloseButton,
  Inner,
  FilterSets,
  Header,
  CountWrapper,
  MobileFooter,
  ButtonsWrapper,
  SortWrapper,
  Reset,
} from './styled'
import { definitely } from '../../utils'
import { useFilterState, FilterSetState } from './reducer'
import { Button } from '../../components/Button'
import { Heading } from '../../components/Text'
import { PlusMinus } from '../../components/PlusMinus'
import FilterIcon from '../../svg/FilterIcon.svg'
import { FilterWrapper } from './FilterWrapper'
import { Backdrop } from '../Navigation/Backdrop'
import { Sort, SortSet } from './SortSet'
import { useMedia } from '../../hooks'
import { theme } from '../../theme'

const { useEffect, useState } = React

interface InventoryFilterType extends InventoryFilterTypeSource {
  applyFilter?: boolean
}

type FilterType = FilterSetType | PriceRangeFilterType | InventoryFilterType

interface FilterProps {
  filters: FilterType[] | null
  applySort: (sort: Sort) => void
  applyFilters: (filterConfiguration: null | FilterConfiguration) => void
  productsCount: number
  open?: boolean
}

const getCurrentFilters = (
  filters: FilterType[],
  filterSetStates: FilterSetState[],
): FilterConfiguration => {
  console.log('getCurrentFilters filters', filters)

  return filterSetStates.reduce<FilterConfiguration>((acc, setState) => {
    const filter = filters.find((filter) => filter._key === setState.key)
    if (!filter) return acc
    if (filter.__typename === 'FilterSet') {
      const filterSetFilters = definitely(filter.filters)
      const activeMatchKeys = setState.activeMatchKeys
      if (activeMatchKeys.length === 0) return acc
      const filterMatches = filterSetFilters
        .filter((fsf) => activeMatchKeys.includes(fsf._key || 'some-key'))
        .map((fsf) => definitely(fsf.matches))
        .flat()

      const filterSetMatches = filterSetFilters.filter((fsf) =>
        activeMatchKeys.includes(fsf._key || 'some-key'),
      )

      console.log('filterSetFilters', filterSetFilters)
      console.log('filterSetMatches', filterSetMatches)

      const matchGroup: FilterMatchGroup = {
        filterType: FILTER_MATCH_GROUP,
        matches: filterMatches,
      }
      return [...acc, matchGroup]
    } else if (filter.__typename === 'PriceRangeFilter') {
      const filterSetState = filterSetStates.find(
        (fss) => fss.key === filter._key,
      )

      const minPrice = filterSetState?.values?.minPrice
      const maxPrice = filterSetState?.values?.maxPrice

      if (typeof minPrice !== 'number') {
        throw new Error('currentMinPrice must be a number')
      }

      if (typeof maxPrice !== 'number') {
        throw new Error('currentMaxPrice must be a number')
      }

      const priceRangeFilter: PriceRangeFilterConfiguration = {
        filterType: PRICE_RANGE_FILTER,
        key: filter._key || 'some-key',
        minPrice,
        maxPrice,
      }
      return [...acc, priceRangeFilter]
    } else if (filter.__typename === 'InventoryFilter') {
      console.log('inventoryFilter filterSetStates', filterSetStates)

      const filterSetState = filterSetStates.find(
        (fss) => fss.key === filter._key,
      )

      const label = filterSetState?.values?.label
      const applyFilter = filterSetState?.values?.applyFilter

      const inventoryFilter: InventoryFilterConfiguration = {
        filterType: INVENTORY_FILTER,
        key: filter._key || 'some-key',
        applyFilter,
        label,
      }
      return [...acc, inventoryFilter]
    }
    return acc
  }, [])
}

export const Filter = ({
  filters,
  applyFilters,
  applySort,
  productsCount,
  open: parentOpen,
}: FilterProps) => {
  const [open, setOpen] = useState(false)
  const [mobileDisplay, setMobileDisplay] = useState('filter')
  const [activeKey, setActiveKey] = useState('')

  const toggleOpen = () => setOpen(!open)

  useEffect(() => {
    setOpen(parentOpen ?? false)
  }, [parentOpen])

  const { filterSetStates, setValues, resetAll, resetSet, toggle } =
    useFilterState(definitely(filters))

  console.log('filterSetStates', filterSetStates)

  if (!filters || filterSetStates.length === 0) return null

  const handleSubmit = () => {
    const filterMatches = getCurrentFilters(filters, filterSetStates)
    applyFilters(filterMatches)
  }

  const handleReset = () => {
    resetAll()
    applyFilters(null)
    setOpen(false)
  }

  const isMobile = useMedia({
    maxWidth: `${theme.breakpoints?.md || '650'}px`,
  })

  const handleFilterClick = (key?: Maybe<string>) => {
    activeKey === key ? setActiveKey('') : setActiveKey(key ?? '')
  }

  useEffect(() => {
    const filterMatches = getCurrentFilters(filters, filterSetStates)
    applyFilters(filterMatches)
  }, [filterSetStates])

  return (
    <Wrapper>
      <Backdrop />
      {isMobile === true && open === false ? (
        <MobileToggleWrapper onClick={toggleOpen}>
          <FilterIcon />
          <Heading level={4} color="body.7">
            Filter + Sort
          </Heading>
        </MobileToggleWrapper>
      ) : (
        ''
      )}
      <Inner open={Boolean(isMobile === false || (isMobile === true && open))}>
        {isMobile === false ? <FilterIcon /> : ''}
        {isMobile === true ? (
          <MobileHeader>
            <MobileControls>
              <ControlTab onClick={() => setMobileDisplay('filter')}>
                <Heading
                  level={4}
                  color="body.7"
                  textDecoration={
                    mobileDisplay == 'filter' ? 'underline' : 'none'
                  }
                >
                  Filter
                </Heading>
              </ControlTab>{' '}
              <span>|</span>{' '}
              <ControlTab onClick={() => setMobileDisplay('sort')}>
                <Heading
                  level={4}
                  color="body.7"
                  textDecoration={
                    mobileDisplay == 'sort' ? 'underline' : 'none'
                  }
                >
                  Sort
                </Heading>
              </ControlTab>
            </MobileControls>
            <MobileCloseButtonWrapper onClick={toggleOpen}>
              <CloseButton />
            </MobileCloseButtonWrapper>
          </MobileHeader>
        ) : (
          ''
        )}
        <FilterSets
          hide={Boolean(isMobile === true && mobileDisplay === 'sort')}
        >
          {filters.map((filter) =>
            filter.__typename === 'FilterSet' ? (
              <FilterWrapper
                key={filter._key || 'some-key'}
                heading={filter.heading}
                type={filter.__typename}
                filter={filter}
                onClick={() => handleFilterClick(filter._key)}
                active={Boolean(activeKey === filter._key)}
              >
                <FilterSet
                  setKey={filter._key || 'some-key'}
                  filterSetState={filterSetStates.find(
                    (s) => s.key === filter._key,
                  )}
                  resetSet={resetSet(filter._key || 'some-key')}
                  toggleMatch={toggle(filter._key || 'some-key')}
                  filterSet={filter}
                  active={Boolean(activeKey === filter._key)}
                />
              </FilterWrapper>
            ) : filter.__typename === 'PriceRangeFilter' ? (
              <FilterWrapper
                heading="Price:"
                key={filter._key || 'some-key'}
                type={filter.__typename}
                filter={filter}
                onClick={() => handleFilterClick(filter._key)}
                active={Boolean(activeKey === filter._key)}
              >
                <PriceRangeFilter
                  setKey={filter._key || 'some-key'}
                  filterSetState={filterSetStates.find(
                    (s) => s.key === filter._key,
                  )}
                  setValues={setValues(filter._key || 'some-key')}
                  resetSet={resetSet(filter._key || 'some-key')}
                  priceRangeFilter={filter}
                  active={Boolean(activeKey === filter._key)}
                />
              </FilterWrapper>
            ) : filter.__typename === 'InventoryFilter' ? (
              <FilterWrapper
                heading="Ready to Ship"
                key={filter._key || 'some-key'}
                type={filter.__typename}
                filter={filter}
                onClick={() => handleFilterClick(filter._key)}
                active={Boolean(activeKey === filter._key)}
              >
                <InventoryFilter
                  setKey={filter._key || 'some-key'}
                  filterSetState={filterSetStates.find(
                    (s) => s.key === filter._key,
                  )}
                  setValues={setValues(filter._key || 'some-key')}
                  resetSet={resetSet(filter._key || 'some-key')}
                  inventoryFilter={filter}
                  active={Boolean(activeKey === filter._key)}
                />
              </FilterWrapper>
            ) : null,
          )}
          {isMobile === true ? (
            <MobileFooter>
              <Heading level={5} color="body.7">
                Results: {productsCount}
              </Heading>
              <Reset onClick={handleReset}>Reset</Reset>
            </MobileFooter>
          ) : (
            <Reset onClick={handleReset}>Reset</Reset>
          )}
        </FilterSets>
        <SortWrapper
          hide={Boolean(isMobile === true && mobileDisplay === 'filter')}
        >
          <SortSet applySort={applySort} />
        </SortWrapper>
      </Inner>
      {isMobile === false ? (
        <CountWrapper>
          <Heading level={5} color="body.7">
            Results: {productsCount}
          </Heading>
        </CountWrapper>
      ) : (
        ''
      )}
    </Wrapper>
  )
}
