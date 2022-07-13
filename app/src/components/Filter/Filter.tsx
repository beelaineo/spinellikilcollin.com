import * as React from 'react'
import {
  Filter as FilterSingleType,
  FilterSet as FilterSetType,
  PriceRangeFilter as PriceRangeFilterType,
  InventoryFilter as InventoryFilterTypeSource,
  FilterConfiguration,
  PriceRangeFilterConfiguration,
  InventoryFilterConfiguration,
  FilterMatchGroup,
  FILTER_SINGLE,
  PRICE_RANGE_FILTER,
  INVENTORY_FILTER,
  FILTER_MATCH_GROUP,
  Maybe,
  FilterSingleConfiguration,
} from '../../types'
import { FilterSet } from './FilterSet'
import { FilterSingle } from './FilterSingle'
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
  MobileControlsDivider,
  MobileFooter,
  DesktopFooter,
  ButtonsWrapper,
  SortWrapper,
  Reset,
} from './styled'
import { definitely } from '../../utils'
import { useFilterState } from './reducer'
import { FilterSetState } from './types'
import { Button } from '../../components/Button'
import { Heading } from '../../components/Text'
import { PlusMinus } from '../../components/PlusMinus'
import { FilterWrapper } from './FilterWrapper'
import { Backdrop } from '../Navigation/Backdrop'
import { Sort, SortSet } from './SortSet'
import { useMedia } from '../../hooks'
import { theme } from '../../theme'

const { useEffect, useState } = React

interface InventoryFilterType extends InventoryFilterTypeSource {
  applyFilter?: boolean
}

type FilterValues = Record<string, any>

type FilterType =
  | FilterSingleType
  | FilterSetType
  | PriceRangeFilterType
  | InventoryFilterType

interface FilterProps {
  filters: FilterType[] | null
  applySort: (sort: Sort) => void
  applyFilters: (filterConfiguration: null | FilterConfiguration) => void
  productsCount: number
  inStockFilter: boolean
  currentFilter: FilterConfiguration | null
  resetFilters: number
  hideFilter?: Maybe<boolean>
  open?: boolean
}

const getCurrentFilters = (
  filters: FilterType[],
  filterSetStates: FilterSetState[],
): FilterConfiguration => {
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
    } else if (filter.__typename === 'Filter') {
      console.log('FilterSingle')
      console.log('filter:', filter)
      console.log('setState:', setState)
      console.log('acc:', acc)
      const activeMatchKeys = setState.activeMatchKeys
      if (activeMatchKeys.length === 0) return acc
      const filterMatches = definitely(filter.matches)
      const filterSingle: FilterSingleConfiguration = {
        filterType: FILTER_SINGLE,
        matches: filterMatches,
        key: filter._key || 'some-key',
      }
      console.log('return filterSingle', filterSingle)
      return [...acc, filterSingle]
    }
    return acc
  }, [])
}

export const Filter = ({
  filters,
  applyFilters,
  applySort,
  inStockFilter,
  resetFilters,
  hideFilter,
  productsCount,
  open: parentOpen,
}: FilterProps) => {
  const [open, setOpen] = useState(false)
  const [mobileDisplay, setMobileDisplay] = useState('filter')
  const [activeKey, setActiveKey] = useState('')

  const toggleOpen = () => {
    setOpen(!open)
    setActiveKey('')
  }

  useEffect(() => {
    setOpen(parentOpen ?? false)
  }, [parentOpen])

  const { filterSetStates, setValues, resetAll, resetSet, toggle } =
    useFilterState(definitely(filters))

  if (!filters || filterSetStates.length === 0) return null

  const handleSubmit = () => {
    const filterMatches = getCurrentFilters(filters, filterSetStates)
    applyFilters(filterMatches)
  }

  const handleReset = () => {
    resetAll()
    applyFilters(null)
    setActiveKey('')
  }

  useEffect(() => {
    handleReset()
  }, [resetFilters])

  const isMobile = useMedia({
    maxWidth: `960px`,
  })

  const handleFilterClick = (key?: Maybe<string>) => {
    activeKey === key ? setActiveKey('') : setActiveKey(key ?? '')
  }

  useEffect(() => {
    const filterMatches = getCurrentFilters(filters, filterSetStates)
    // console.log('filterMatches', filterMatches)
    applyFilters(filterMatches)
  }, [filterSetStates])

  if (hideFilter !== true) {
    return (
      <Wrapper>
        <Backdrop />
        {isMobile === true && open === false ? (
          <MobileToggleWrapper onClick={toggleOpen}>
            <Heading level={4} color="body.7" textDecoration="underline">
              Filter<MobileControlsDivider>+</MobileControlsDivider>Sort
            </Heading>
          </MobileToggleWrapper>
        ) : (
          ''
        )}
        <Inner
          open={Boolean(isMobile === false || (isMobile === true && open))}
        >
          {isMobile === false ? (
            <Heading level={5} color="body.7" mr={2} lineHeight={1}>
              Filter by:
            </Heading>
          ) : (
            ''
          )}
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
                <MobileControlsDivider>|</MobileControlsDivider>{' '}
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
                <CloseButton aria-label="Close filter" />
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
              ) : filter.__typename === 'Filter' ? (
                <FilterWrapper
                  heading={filter.label}
                  key={filter._key || 'some-key'}
                  type={filter.__typename}
                  filter={filter}
                  onClick={() => handleFilterClick(filter._key)}
                  active={Boolean(activeKey === filter._key)}
                >
                  <FilterSingle
                    setKey={filter._key || 'some-key'}
                    filterSetState={filterSetStates.find(
                      (s) => s.key === filter._key,
                    )}
                    resetSet={resetSet(filter._key || 'some-key')}
                    toggleMatch={toggle(filter._key || 'some-key')}
                    filterSingle={filter}
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
                    resetSet={resetSet(filter._key || 'some-key')}
                    setValues={setValues(filter._key || 'some-key')}
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
                    initiallyActive={inStockFilter}
                  />
                </FilterWrapper>
              ) : null,
            )}
            {isMobile === true ? (
              <MobileFooter>
                {productsCount > 0 ? (
                  <Heading level={5} color="body.7">
                    Results: {productsCount}
                  </Heading>
                ) : (
                  ''
                )}
                <Reset onClick={handleReset}>Reset</Reset>
              </MobileFooter>
            ) : (
              <DesktopFooter>
                {productsCount > 0 ? (
                  <Heading level={5} color="body.7" ml={2}>
                    Results: {productsCount}
                  </Heading>
                ) : (
                  ''
                )}
                <Reset onClick={handleReset}>Reset</Reset>
              </DesktopFooter>
            )}
          </FilterSets>
          <SortWrapper
            hide={Boolean(isMobile === true && mobileDisplay === 'filter')}
          >
            <SortSet applySort={applySort} />
          </SortWrapper>
        </Inner>
      </Wrapper>
    )
  } else {
    return null
  }
}
