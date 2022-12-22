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
  MobileControlsDivider,
  MobileFooter,
  DesktopFooter,
  SortWrapper,
  Reset,
} from './styled'
import { definitely } from '../../utils'
import { useFilterState } from './reducer'
import { FilterSetState } from './types'
import { Heading } from '../../components/Text'
import { FilterWrapper } from './FilterWrapper'
import { Backdrop } from '../Navigation/Backdrop'
import { Sort, SortSet } from './SortSet'
import { useMedia } from '../../hooks'
import { useRouter } from 'next/router'

const { useEffect, useState, useRef } = React

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
  const [isRouterLoaded, setIsRouterLoaded] = useState(false)
  const router = useRouter()

  const [filterQuery, setFilterQuery] = useState<{ [key: string]: any }>({})

  const useFirstRender = () => {
    const firstRender = useRef(true)
    useEffect(() => {
      firstRender.current = false
    }, [])
    return firstRender.current
  }
  const firstRender = useFirstRender()

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isRouterLoaded) return

    router.isReady && setIsRouterLoaded(true)
  }, [router.isReady])

  const toggleOpen = () => {
    setOpen(!open)
    setActiveKey('')
  }

  useEffect(() => {
    setOpen(parentOpen ?? false)
  }, [parentOpen])

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
    enable,
    disable,
  } = useFilterState(definitely(filters))

  useEffect(() => {
    handleReset()
  }, [resetFilters])

  const isMobile = useMedia({
    maxWidth: `960px`,
  })

  const handleFilterClick = (key?: Maybe<string>) => {
    activeKey === key ? setActiveKey('') : setActiveKey(key ?? '')
  }

  const getFilterMatchByType = (type: any) => {
    if (!filters) return

    const filterMatches = getCurrentFilters(filters, filterSetStates)

    const priceRange = filterMatches.find(
      (f) => f.filterType === PRICE_RANGE_FILTER,
    )

    //@ts-ignore
    const priceRangeMatches = [priceRange?.minPrice, priceRange?.maxPrice]
      .flat()
      .join(' ')

    const inventoryFilter = filterMatches.find(
      (f) => f.filterType === INVENTORY_FILTER,
      //@ts-ignore
    )?.applyFilter

    const filterSetMatches = filterMatches
      .filter((f) => f.filterType === FILTER_MATCH_GROUP)
      //@ts-ignore
      .map((f) => f?.matches.filter((m) => m.type === type))
      .map((f) => f.map(({ match }) => match))
      .flat()
      .join(' ')

    const priceInitialValues =
      //@ts-ignore
      filterSetStates?.find((s) => s?.key === priceRange?.key)?.initialValues ||
      {}

    if (
      type === 'price' &&
      priceRangeMatches !== Object.values(priceInitialValues).join(' ')
    ) {
      return { price: priceRangeMatches }
    } else if (type === 'instock' && inventoryFilter) {
      return { instock: inventoryFilter }
    } else {
      return { [type]: filterSetMatches }
    }
  }

  const useQueryUpdate = (type) => {
    const updateQueryByType = (type) => {
      if (!router.isReady) return

      if (filterQuery[type] !== '') {
        updateQueryParam({ ...router.query, ...getFilterMatchByType(type) })
      } else {
        delete router.query[type]
        updateQueryParam({ ...router.query })
      }
    }

    useEffect(() => {
      updateQueryByType(type)
    }, [filterQuery[type]])
  }

  useEffect(() => {
    if (!filters || filterSetStates.length === 0) return

    const filterMatches = getCurrentFilters(filters, filterSetStates)

    //@ts-ignore
    setFilterQuery({
      ...getFilterMatchByType('metal'),
      ...getFilterMatchByType('stone'),
      ...getFilterMatchByType('size'),
      ...getFilterMatchByType('style'),
      ...getFilterMatchByType('type'),
      ...getFilterMatchByType('tag'),
      ...getFilterMatchByType('subcategory'),
      ...getFilterMatchByType('instock'),
      ...getFilterMatchByType('price'),
    })

    applyFilters(filterMatches)
  }, [filterSetStates])

  useQueryUpdate('metal')
  useQueryUpdate('stone')
  useQueryUpdate('size')
  useQueryUpdate('style')
  useQueryUpdate('type')
  useQueryUpdate('tag')
  useQueryUpdate('subcategory')
  useQueryUpdate('instock')
  useQueryUpdate('price')

  useEffect(() => {
    if (isRouterLoaded) return

    const getFilterSetQueryType = (arr?: Array<any>, query?: Maybe<string>) =>
      arr?.filter((item) => item?.filters?.[0]?.matches?.[0]?.type === query)[0]

    const getFilterSetQueryMatches = (items, query) => {
      const matches = items?.filters
        ?.map((filter) => {
          const match = filter?.matches?.filter(
            (match) => match?.match === query,
          )
          return {
            filter,
            match,
          }
        })
        .filter((item) => item?.match?.length)[0]
      return matches?.filter
    }

    const findFilterSetKeys = (items, query) => {
      const { collectionSlug, instock, price, ...filteredQuery } = query

      const matches = Object.entries(filteredQuery)

      const getKeys = matches?.map((match, i) => {
        const type = getFilterSetQueryType(items, match[0])

        //@ts-ignore
        const matchArr = match[1]?.split(' ')

        const matchKeys = matchArr?.map((item) => {
          return {
            type: type?._key,
            match: getFilterSetQueryMatches(type, item)?._key,
          }
        })
        return matchKeys
      })

      return getKeys.flat()
    }

    const getInstockQuery = (items, query) => {
      const match = items?.find(
        (item) => item?.__typename === 'InventoryFilter',
      )

      return {
        key: match?._key,
        values: { applyFilter: Boolean(query?.instock), label: match?.label },
      }
    }

    const instockQuery = getInstockQuery(filters, router?.query)

    const filterSetMatchedKeys = findFilterSetKeys(filters, router.query)

    filterSetMatchedKeys.map((key) => {
      enable(key.type, key.match)
    })

    const updateFromValueFilter = (key, values) => {
      setValues(key)('', values)
    }

    updateFromValueFilter(instockQuery?.key, instockQuery?.values)
  }, [router.isReady])

  if (!filters || filterSetStates.length === 0) return null

  const handleReset = () => {
    resetAll()
    applyFilters(null)
    setActiveKey('')
    if (!firstRender) scrollGridIntoView()
    console.log('RESET by handleReset(), firstRender: ', firstRender)
  }

  if (hideFilter !== true) {
    return (
      <Wrapper minimalDisplay={minimalDisplay} ref={filterRef}>
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
                    scrollGridIntoView={scrollGridIntoView}
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
                    scrollGridIntoView={scrollGridIntoView}
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
                  {/* <InventoryFilter
                    setKey={filter._key || 'some-key'}
                    filterSetState={filterSetStates.find(
                      (s) => s.key === filter._key,
                    )}
                    setValues={setValues(filter._key || 'some-key')}
                    resetSet={resetSet(filter._key || 'some-key')}
                    scrollGridIntoView={scrollGridIntoView}
                    inventoryFilter={filter}
                    active={Boolean(activeKey === filter._key)}
                  /> */}
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
