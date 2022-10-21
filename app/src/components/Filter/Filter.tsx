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
import { useRouter } from 'next/router'

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
  currentFilter: FilterConfiguration | null
  resetFilters: number
  hideFilter?: Maybe<boolean>
  minimalDisplay?: Maybe<boolean>
  open?: boolean
  scrollGridIntoView: () => void
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
      const activeMatchKeys = setState.activeMatchKeys
      if (activeMatchKeys.length === 0) return acc
      const filterMatches = definitely(filter.matches)
      const filterSingle: FilterSingleConfiguration = {
        filterType: FILTER_SINGLE,
        matches: filterMatches,
        key: filter._key || 'some-key',
      }
      return [...acc, filterSingle]
    }
    return acc
  }, [])
}

export const Filter = ({
  filters,
  applyFilters,
  applySort,
  resetFilters,
  hideFilter,
  scrollGridIntoView,
  minimalDisplay,
  productsCount,
  open: parentOpen,
}: FilterProps) => {
  const [open, setOpen] = useState(false)
  const [mobileDisplay, setMobileDisplay] = useState('filter')
  const [activeKey, setActiveKey] = useState('')

  const [filterQuery, setFilterQuery] = useState<{ [key: string]: any }>({})

  console.log('filterQuery', filterQuery)

  const toggleOpen = () => {
    setOpen(!open)
    setActiveKey('')
  }

  useEffect(() => {
    setOpen(parentOpen ?? false)
  }, [parentOpen])

  const router = useRouter()

  const updateQueryParam = (query) => {
    router.replace(
      {
        query: query,
      },
      '',
      { shallow: true },
    )
  }

  const {
    filterSetStates,
    setValues,
    resetAll,
    resetSet,
    toggle,
    toggleSingle,
  } = useFilterState(definitely(filters))

  useEffect(() => {
    handleReset()
  }, [resetFilters])

  const isMobile = useMedia({
    maxWidth: `960px`,
  })

  const handleFilterClick = (key?: Maybe<string>) => {
    activeKey === key ? setActiveKey('') : setActiveKey(key ?? '')
    scrollGridIntoView()
  }

  // const findMatchInnerKey = (items, type, match) => {
  //   const key = items
  //     ?.map((f) =>
  //       f?.filters?.map((g) =>
  //         g?.matches?.find((h) => h.type === type && h.match === match),
  //       ),
  //     )
  //     .flat()
  //     .filter((item) => item)[0]?._key

  //   return key
  // }

  const getFilterMatchByType = (type: any) => {
    if (!filters) return

    const filterMatches = getCurrentFilters(filters, filterSetStates)

    const matches = filterMatches
      .filter((f) => f.filterType === FILTER_MATCH_GROUP)
      //@ts-ignore
      .map((f) => f?.matches.filter((m) => m.type === type))
      .map((f) => f.map(({ match }) => match))
      .flat()
      .join(' ')

    return { [type]: matches }
  }

  const findMatchedKeys = (items, type, query) => {
    const matched = query?.[type]?.split(' ')

    const key = items
      ?.map((f) =>
        f?.filters?.map((g) => {
          const valid = g?.matches?.filter(
            (h) => h.type === type && matched?.includes(h.match),
          )
          if (valid) {
            return [...valid]
          }
        }),
      )
      .flat()
      .filter((item) => item)
      .map((item) => item.map(({ _key }) => _key))
      .flat()

    return key
  }

  useEffect(() => {
    if (!filters) return

    const filterMatches = getCurrentFilters(filters, filterSetStates)

    setFilterQuery({
      ...getFilterMatchByType('metal'),
      ...getFilterMatchByType('stone'),
    })

    applyFilters(filterMatches)
  }, [filterSetStates])

  useEffect(() => {
    if (!filterQuery.stone) return

    if (filterQuery.stone !== '') {
      updateQueryParam({ ...router.query, ...getFilterMatchByType('stone') })
    } else {
      const { stone, ...removeFromQuery } = router.query

      updateQueryParam({ ...removeFromQuery })
    }
  }, [filterQuery.stone])

  useEffect(() => {
    if (!filterQuery.metal) return

    if (filterQuery.metal !== '') {
      console.log('no match')
      updateQueryParam({ ...router.query, ...getFilterMatchByType('metal') })
    } else {
      console.log('match')

      const { metal, ...removeFromQuery } = router.query

      updateQueryParam({ ...removeFromQuery })
    }
  }, [filterQuery.metal])

  useEffect(() => {
    const metalKeys = findMatchedKeys(filters, 'metal', router.query)
    const stoneKeys = findMatchedKeys(filters, 'stone', router.query)

    console.log('metal matches from query:', metalKeys)
    console.log('stone matches from query:', stoneKeys)
  }, [router.query])

  if (!filters || filterSetStates.length === 0) return null

  const handleReset = () => {
    resetAll()
    applyFilters(null)
    setActiveKey('')
    scrollGridIntoView()
  }

  const limitedToggle = (matchKey: string) => {
    resetAll()
    toggle(matchKey || 'some-key')
    scrollGridIntoView()
  }

  if (hideFilter !== true) {
    return (
      <Wrapper minimalDisplay={minimalDisplay}>
        {!minimalDisplay ? <Backdrop /> : null}
        {isMobile === true && open === false && !minimalDisplay ? (
          <MobileToggleWrapper onClick={toggleOpen}>
            <Heading level={4} color="body.7" textDecoration="underline">
              Filter<MobileControlsDivider>+</MobileControlsDivider>Sort
            </Heading>
          </MobileToggleWrapper>
        ) : (
          ''
        )}
        <Inner
          open={Boolean(
            isMobile === false ||
              (isMobile === true && minimalDisplay) ||
              (isMobile === true && open),
          )}
          minimalDisplay={minimalDisplay}
        >
          {isMobile === false && !minimalDisplay ? (
            <Heading level={5} color="body.7" mr={2} lineHeight={1}>
              Filter by:
            </Heading>
          ) : (
            ''
          )}
          {isMobile === true && !minimalDisplay ? (
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
                  minimalDisplay={minimalDisplay}
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
                  minimalDisplay={minimalDisplay}
                >
                  <FilterSingle
                    setKey={filter._key || 'some-key'}
                    filterSetState={filterSetStates.find(
                      (s) => s.key === filter._key,
                    )}
                    resetSet={resetSet(filter._key || 'some-key')}
                    toggleMatch={
                      Boolean(
                        minimalDisplay == true &&
                          !filters.some((f) => f.__typename !== 'Filter'),
                      )
                        ? toggleSingle(filter._key || 'some-key')
                        : toggle(filter._key || 'some-key')
                    }
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
                  minimalDisplay={minimalDisplay}
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
                  minimalDisplay={minimalDisplay}
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
            {!minimalDisplay ? (
              isMobile === true ? (
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
              )
            ) : (
              ''
            )}
          </FilterSets>
          <SortWrapper
            hide={Boolean(
              (isMobile === true && mobileDisplay === 'filter') ||
                minimalDisplay,
            )}
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
