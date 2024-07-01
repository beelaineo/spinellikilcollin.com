import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  Collection,
  Product,
  CollectionBlock as CollectionBlockType,
  Filter as FilterType,
  FilterSet as FilterSetType,
  InStockFilter as InStockFilterType,
  PriceRangeMinMaxFilter as PriceRangeMinMaxFilterType,
  FilterConfiguration,
  FilterMatch,
  PRICE_RANGE_FILTER,
  INVENTORY_FILTER,
  FILTER_MATCH_GROUP,
  FILTER_SINGLE,
  Document,
  FilterMatchGroup,
  Maybe,
} from '../../types'
import { ProductGrid } from '../../components/Product'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { ImageTextBlock } from '../../components/ContentBlock/ImageTextBlock'
import { Sort, Filter } from '../../components/Filter'
import { Heading } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { Button } from '../../components/Button'
import { getHeroImage, isValidHero, definitely, unique } from '../../utils'
import { useShopData } from '../../providers/ShopDataProvider'
import { useInViewport, useSanityQuery } from '../../hooks'
import { SEO } from '../../components/SEO'
import { Loading } from '../../components/Loading'
import styled, { css, Box } from '@xstyled/styled-components'
import {
  LoadingWrapper,
  ProductGridWrapper,
  Wrapper,
  NoResultsWrapper,
  FooterGrid,
} from './styled'
import { useSearch } from '../../providers'

const { useRef, useEffect, useState } = React

interface ShopifyProductListingProduct extends Product {
  filterData: {
    inStock: boolean
    metal: string[]
    stone: string[]
    style: string[]
    subcategory: string[]
    sizes: (string | undefined)[]
  }
}

interface ShopifyProductListingCollection extends Collection {
  products?: Maybe<Maybe<ShopifyProductListingProduct>[]> | undefined
}

interface ProductListingProps {
  collection: ShopifyProductListingCollection & { productsCount?: number }
  isHiddenByKeepAlive: boolean
}

type Item = ShopifyProductListingProduct | CollectionBlockType

interface FilterVariables {
  collectionId: string
}

type PaginationArgs = {
  collectionId: string
  handle: string
}

function isCollectionResult(
  r?: Collection[] | ShopifyProductListingProduct[],
): r is Collection[] {
  if (!r || !r[0]) return false
  return 'products' in r[0]
}

export const ProductListing = ({
  collection,
  isHiddenByKeepAlive,
}: ProductListingProps) => {
  const {
    _id,
    preferredVariantMatches,
    hero,
    seo,
    handle,
    collectionBlocks,
    descriptionRaw,
    footer,
    reduceColumnCount,
    lightTheme,
    hidden,
    hideFilter,
    overrideDefaultFilter,
    minimalDisplay,
  } = collection

  // console.log('collection', collection)
  const search = useSearch()

  const collectionProductsWithPrices = [...definitely(collection.products)].map(
    (product) => {
      const variants = product?.store?.variants

      const prices = variants?.map(
        (variant) =>
          variant?.sourceData?.priceV2 && variant.sourceData?.priceV2.amount,
      )

      return { ...product, prices: prices ? unique(prices) : [] }
    },
  )

  const [productResults, setProductResults] = useState<
    ShopifyProductListingProduct[]
  >([...definitely(collectionProductsWithPrices)])

  const [items, setItems] = useState<Item[]>(
    collectionBlocks?.length
      ? definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
          if (!current?.position) return acc
          const index = current.position - 1
          return [...acc.slice(0, index), current, ...acc.slice(index)]
        }, definitely(productResults))
      : definitely(productResults),
  )
  const collectionBlocksLength = collectionBlocks?.length || 0

  const gridRef = useRef<HTMLDivElement>(null)
  const { isInView } = useInViewport(gridRef, '500px 0px')

  const { productListingSettings, productInfoSettings } = useShopData()
  const [sort, setSort] = useState<Sort>(Sort.Default)
  const [selectedSizes, setSelectedSizes] = useState<(string | undefined)[]>([])
  const [loading, setLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const [resetFilters, doResetFilters] = useState(0)
  const [filters, setFilters] = useState<
    | (
        | FilterType
        | FilterSetType
        | InStockFilterType
        | PriceRangeMinMaxFilterType
      )[]
    | null
  >(null)
  const [currentFilters, setCurrentFilters] =
    useState<FilterConfiguration | null>(null)
  const { state: fetchMoreState, query: fetchMoreQuery } = useSanityQuery<
    Collection[] | ShopifyProductListingProduct[],
    PaginationArgs
  >()

  const priceRange = currentFilters?.filter(
    (f) => f.filterType === 'PRICE_RANGE_FILTER',
  )[0]

  if (!handle) {
    throw new Error('The collection is missing a handle')
  }
  if (!_id) {
    throw new Error('The collection is missing an _id')
  }

  useEffect(() => {
    const defaultFilter = productListingSettings?.newDefaultFilter
    const defaultFilters = definitely(defaultFilter).filter(
      (f) => !Boolean('searchOnly' in f && f.searchOnly),
    )
    const customFilter = collection?.customFilter
    const customFilters = definitely(customFilter).filter(
      (f) => !Boolean('searchOnly' in f && f.searchOnly),
    )
    const filters = overrideDefaultFilter
      ? [...customFilters]
      : [...customFilters, ...defaultFilters]

    filters.map((filter) => {
      if (filter._type === 'inStockFilter')
        filters.push(filters.splice(filters.indexOf(filter), 1)[0])
    })
    setFilters(filters)
    setIsReady(true)
  }, [])

  const descriptionPrimary = descriptionRaw ? descriptionRaw.slice(0, 1) : null
  const description = descriptionRaw ? descriptionRaw.slice(1) : null

  const [fetchComplete, setFetchComplete] = useState(true)

  const [productsCount, setProductsCount] = useState(productResults.length)

  const parseFilterMatch = (
    product: ShopifyProductListingProduct,
    filterMatch: FilterMatch,
  ) => {
    const { type, match } = filterMatch
    if (!match) return false
    switch (type) {
      case 'type':
        return product.store?.productType?.includes(match)
      case 'tag':
        return product.store?.tags?.includes(match)
      case 'title':
        return product.title == match
      case 'option':
        return product.options?.some((o) =>
          o?.values?.some((v) => v?.value == match),
        )
      case 'size':
        return product.options?.some((o) => {
          return Boolean(
            o?.name == 'Size' && o?.values?.some((v) => v?.value == match),
          )
        })
      case 'subcategory':
        return product.filterData.subcategory.includes(match)
      case 'metal':
        const flattenedMetal = product.filterData.metal.toString()
        return flattenedMetal.includes(match)
      // return product.filterData.metal.includes(match)
      case 'style':
        return product.filterData.style.includes(match)
      case 'stone':
        const flattenedStone = product.filterData.stone.toString()
        return flattenedStone.includes(match)
      // return product.filterData.stone.includes(match)
      default:
        throw new Error(`"${type}" is not a valid filter type`)
    }
  }

  const filterResults = (currentFilters: FilterConfiguration | null) => {
    if (currentFilters == null)
      return [...definitely(collectionProductsWithPrices)]
    const newResults: ShopifyProductListingProduct[] = [
      ...definitely(collectionProductsWithPrices),
    ].filter((p) => {
      return currentFilters.every((filterGroup) => {
        if (filterGroup.filterType === FILTER_MATCH_GROUP) {
          return filterGroup.matches.some((filterMatch) =>
            parseFilterMatch(p, filterMatch),
          )
        } else if (filterGroup.filterType === FILTER_SINGLE) {
          return filterGroup.matches.some((filterMatch) =>
            parseFilterMatch(p, filterMatch),
          )
        } else if (filterGroup.filterType === PRICE_RANGE_FILTER) {
          if (
            !p.store?.priceRange?.minVariantPrice ||
            !p.store?.priceRange?.maxVariantPrice
          )
            return false
          const { minPrice, maxPrice } = filterGroup

          if (
            p.store?.priceRange?.minVariantPrice ==
            p.store?.priceRange?.maxVariantPrice
          ) {
            return Boolean(
              p.store?.priceRange?.minVariantPrice >= minPrice &&
                p.store?.priceRange?.minVariantPrice <= maxPrice,
            )
          } else {
            return Boolean(
              p.prices.some(
                (price) => price && minPrice <= price && maxPrice >= price,
              ),
            )
          }
        } else if (filterGroup.filterType === INVENTORY_FILTER) {
          const { applyFilter } = filterGroup
          const handle = p.handle
          // const isInExcludedList = excludedProducts?.find((product) => {
          //   return product?.handle === handle
          // })
          return applyFilter ? p.filterData.inStock == true : true
        } else {
          throw new Error(`This kind of filter cannot be parsed`)
        }
      })
    })

    return newResults
  }

  useEffect(() => {
    setProductResults(filterResults(currentFilters))
    if (
      currentFilters?.some((filter) => {
        return (
          filter.filterType === 'FILTER_MATCH_GROUP' &&
          filter.matches.some((match) => match.type == 'size')
        )
      })
    ) {
      const getSelectedSizes: (string | undefined)[] = currentFilters
        .map((filter) => {
          if (
            filter.filterType === 'FILTER_MATCH_GROUP' &&
            filter.matches.some((match) => match.type == 'size')
          ) {
            return filter.matches.map((match) => {
              if (typeof match.match == 'string') return match.match
            })
          }
        })
        .flat()
        .filter((n) => n)
      setSelectedSizes(getSelectedSizes)
    } else {
      setSelectedSizes([])
    }
  }, [currentFilters])

  const updateItems = (products: ShopifyProductListingProduct[]) => {
    setItems(
      collectionBlocks?.length
        ? definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
            if (!current?.position) return acc
            const index = current.position - 1
            return [...acc.slice(0, index), current, ...acc.slice(index)]
          }, definitely(products))
        : definitely(products),
    )
  }

  useEffect(() => {
    setProductsCount(productResults.length)

    const sortBySelectedSizes = (results) => {
      const sorted = results.sort((a, b) =>
        // sort sortedProductResults by making products that have matching values in filterData.sizes with values selectedSizes array first, then sort by sortIndex
        selectedSizes.some((size) => a.filterData.sizes.includes(size)) &&
        selectedSizes.some((size) => b.filterData.sizes.includes(size))
          ? a.sortIndex && b.sortIndex
            ? a.sortIndex - b.sortIndex
            : 0
          : selectedSizes.some((size) => a.filterData.sizes.includes(size))
          ? -1
          : selectedSizes.some((size) => b.filterData.sizes.includes(size))
          ? 1
          : a.sortIndex && b.sortIndex
          ? a.sortIndex - b.sortIndex
          : 0,
      )
      return sorted
    }

    if (sort) {
      const sortedProductResults = productResults.map((p, sortIndex) => ({
        sortIndex,
        ...p,
      }))

      switch (sort) {
        case Sort.Default:
          sortedProductResults.sort((a, b) =>
            a.sortIndex && b.sortIndex ? a.sortIndex - b.sortIndex : 0,
          )
          if (selectedSizes && selectedSizes.length > 0) {
            const sortedBySelectedSizes =
              sortBySelectedSizes(sortedProductResults)
            updateItems(sortedBySelectedSizes)
          } else {
            updateItems(sortedProductResults)
          }
          break
        case Sort.PriceDesc:
          sortedProductResults.sort((a, b) =>
            // @ts-ignore
            b.prices && a.prices
              ? Math.max(
                  parseFloat(
                    // @ts-ignore
                    b.prices.filter(
                      (price) =>
                        // @ts-ignore
                        parseFloat(price) >= priceRange?.minPrice &&
                        // @ts-ignore
                        parseFloat(price) <= priceRange?.maxPrice,
                    ),
                  ),
                ) -
                Math.max(
                  parseFloat(
                    // @ts-ignore
                    a.prices.filter(
                      (price) =>
                        // @ts-ignore
                        parseFloat(price) >= priceRange?.minPrice &&
                        // @ts-ignore
                        parseFloat(price) <= priceRange?.maxPrice,
                    ),
                  ),
                )
              : 0,
          )
          if (selectedSizes && selectedSizes.length > 0) {
            const sortedBySelectedSizes =
              sortBySelectedSizes(sortedProductResults)
            updateItems(sortedBySelectedSizes)
          } else {
            updateItems(sortedProductResults)
          }
          break
        case Sort.PriceAsc:
          sortedProductResults.sort((a, b) =>
            // @ts-ignore
            b.prices && a.prices
              ? Math.min(
                  parseFloat(
                    // @ts-ignore
                    a.prices.filter(
                      (price) =>
                        // @ts-ignore
                        parseFloat(price) >= priceRange?.minPrice &&
                        // @ts-ignore
                        parseFloat(price) <= priceRange?.maxPrice,
                    ),
                  ),
                ) -
                Math.min(
                  parseFloat(
                    // @ts-ignore
                    b.prices.filter(
                      (price) =>
                        // @ts-ignore
                        parseFloat(price) >= priceRange?.minPrice &&
                        // @ts-ignore
                        parseFloat(price) <= priceRange?.maxPrice,
                    ),
                  ),
                )
              : 0,
          )
          if (selectedSizes && selectedSizes.length > 0) {
            const sortedBySelectedSizes =
              sortBySelectedSizes(sortedProductResults)
            updateItems(sortedBySelectedSizes)
          } else {
            updateItems(sortedProductResults)
          }
          break
      }
    } else {
      if (selectedSizes && selectedSizes.length > 0) {
        const sortedProductResults = productResults.map((p, sortIndex) => ({
          sortIndex,
          ...p,
        }))
        const sortedBySelectedSizes = sortBySelectedSizes(sortedProductResults)
        updateItems(sortedBySelectedSizes)
      } else {
        updateItems(productResults)
      }
    }
  }, [productResults, sort, selectedSizes])

  const scrollGridIntoView = () => {
    gridRef?.current?.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    })
  }

  const applyFilters = async (filters: null | FilterConfiguration) => {
    setCurrentFilters(filters)
  }

  const applySort = async (sort: Sort) => {
    setSort(sort)
    scrollGridIntoView()
  }

  if (!handle) throw new Error('No handle was fetched')
  const firstProduct = definitely(collection.products)[0]
  const firstProductImage = firstProduct?.store?.images
    ? firstProduct.store?.images[0]
    : undefined

  const path = ['collections', handle].join('/')
  const defaultSeo = {
    title: collection.title || '',
    description: collection?.store?.descriptionHtml,
    image: getHeroImage(hero) || collection?.store?.image || firstProductImage,
  }

  const validHero = isValidHero(hero)

  const DescriptionWrapper = styled.div`
    ${({ theme }) => css`
      display: grid;
      grid-template-columns: 50% 10% 1fr;
      grid-column-gap: 3;

      padding: 8 11;

      ${theme.mediaQueries.tablet} {
        padding: 4 8;
      }

      ${theme.mediaQueries.mobile} {
        padding: 4 5;
        display: flex;
        flex-direction: column;
      }
    `}
  `
  const TextWrapper = styled.div`
    ${({ theme }) => css`
      position: relative;
      z-index: 1;
      max-width: 800px;
      &:first-of-type p {
        font-size: 16px;
      }
      p {
        font-weight: 200;
        font-size: 13px;
      }
      ${theme.mediaQueries.mobile} {
        &:first-of-type p {
          font-size: 13px;
        }
        &:last-of-type {
          display: none;
        }
      }
    `}
  `
  return (
    <>
      {!isHiddenByKeepAlive ? (
        <SEO seo={seo} defaultSeo={defaultSeo} path={path} hidden={hidden} />
      ) : null}
      {hero && validHero ? (
        <HeroBlock hero={hero} minimalDisplay={minimalDisplay} />
      ) : null}
      <Wrapper
        handle={handle}
        withHero={Boolean(hero && validHero)}
        isLightTheme={Boolean(lightTheme)}
        tabIndex={-1}
        ref={gridRef}
        isReady={isReady}
      >
        {filters && filters.length ? (
          <Filter
            applyFilters={applyFilters}
            applySort={applySort}
            filters={filters}
            currentFilter={currentFilters}
            productsCount={productsCount}
            resetFilters={resetFilters}
            hideFilter={search.open || hideFilter}
            scrollGridIntoView={scrollGridIntoView}
            minimalDisplay={minimalDisplay}
          />
        ) : null}
        {items.length === collectionBlocksLength && !loading ? (
          <NoResultsWrapper>
            <Heading level={3} textAlign="center" fontStyle="italic">
              No products found
            </Heading>
            <Button
              textTransform="initial"
              onClick={() => doResetFilters((prev) => prev + 1)}
              level={3}
            >
              Click here to reset and try using fewer filters.
            </Button>
          </NoResultsWrapper>
        ) : (
          <>
            {loading ? (
              <LoadingWrapper>
                <Loading />
              </LoadingWrapper>
            ) : null}

            <ProductGridWrapper isLoading={loading}>
              <ProductGrid
                reduceColumnCount={reduceColumnCount}
                preferredVariantMatches={preferredVariantMatches}
                currentFilter={currentFilters}
                currentSort={sort}
                hideFilter={hideFilter}
                items={items}
                collectionId={_id}
              />
              {/* {!fetchComplete ? (
                <Box my={8}>
                  <Heading
                    level={4}
                    textAlign="center"
                    fontStyle="italic"
                    color="body.7"
                  >
                    {productStart > 1
                      ? 'Loading more products...'
                      : 'Loading products...'}
                  </Heading>
                  <Loading />
                </Box>
              ) : null} */}
              {footer && footer.length > 0 ? (
                <FooterGrid>
                  {definitely(footer).map((block) => {
                    switch (block.__typename) {
                      // case 'Carousel':
                      //   return <Carousel key={} />
                      case 'ImageTextBlock':
                        return (
                          <ImageTextBlock key={block._key} content={block} />
                        )
                      // case 'TextBlock':
                      //   return <TextBlock key={} />
                    }
                  })}
                </FooterGrid>
              ) : null}
              {descriptionPrimary ? (
                <DescriptionWrapper>
                  <TextWrapper>
                    <RichText body={descriptionPrimary} />
                  </TextWrapper>
                  <div></div>
                  <TextWrapper>
                    <RichText body={description} />
                  </TextWrapper>
                </DescriptionWrapper>
              ) : null}
            </ProductGridWrapper>
          </>
        )}
      </Wrapper>
    </>
  )
}
