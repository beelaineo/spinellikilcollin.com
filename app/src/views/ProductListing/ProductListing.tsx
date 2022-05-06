import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyCollection,
  ShopifyProduct,
  CollectionBlock as CollectionBlockType,
  FilterConfiguration,
} from '../../types'
import { ProductGrid } from '../../components/Product'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { Sort, Filter } from '../../components/Filter'
import { Heading } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { Button } from '../../components/Button'
import { getHeroImage, isValidHero, definitely } from '../../utils'
import { useShopData } from '../../providers/ShopDataProvider'
import { useInViewport, useSanityQuery } from '../../hooks'
import { buildFilterQuery, moreProductsQuery } from './sanityCollectionQuery'
import { SEO } from '../../components/SEO'
import { Loading } from '../../components/Loading'
import { config } from '../../../src/config'
import styled, { css, Box } from '@xstyled/styled-components'
import {
  LoadingWrapper,
  ProductGridWrapper,
  Wrapper,
  NoResultsWrapper,
} from './styled'
import { CountryCodeSelector } from '../../components/Forms/CustomFields/PhoneField/CountryCodeSelector'

const { useRef, useEffect, useState } = React

interface ProductListingProps {
  collection: ShopifyCollection & { productsCount?: number }
  inStockFilter: boolean
  page?: number
}

type Item = ShopifyProduct | CollectionBlockType

interface FilterVariables {
  collectionId: string
}

type PaginationArgs = {
  collectionId: string
  handle: string
  productStart: number
  productEnd: number
}

const PAGE_SIZE = 12

function isCollectionResult(
  r?: ShopifyCollection[] | ShopifyProduct[],
): r is ShopifyCollection[] {
  if (!r || !r[0]) return false
  return 'products' in r[0]
}

export const ProductListing = ({
  collection,
  inStockFilter,
  page,
}: ProductListingProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const initialPage = page || 1
  console.log('initialPage', initialPage)
  console.log(collection.products)
  const [productResults, setProductResults] = useState<ShopifyProduct[]>([
    ...definitely(collection.products).slice(0, PAGE_SIZE),
  ])
  const { isInView } = useInViewport(bottomRef, '500px 0px')
  const { productListingSettings } = useShopData()
  const [sort, setSort] = useState<Sort>(Sort.Default)
  const [loading, setLoading] = useState(false)
  const [resetFilters, doResetFilters] = useState(0)
  const [currentFilter, setCurrentFilter] =
    useState<FilterConfiguration | null>(null)
  const { state: fetchMoreState, query: fetchMoreQuery } = useSanityQuery<
    ShopifyCollection[] | ShopifyProduct[],
    PaginationArgs
  >()
  const {
    _id,
    preferredVariantMatches,
    hero,
    seo,
    handle,
    collectionBlocks,
    descriptionRaw,
    reduceColumnCount,
    lightTheme,
    hidden,
    hideFilter,
    overrideDefaultFilter,
  } = collection

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
    if (filter._type === 'inventoryFilter')
      filters.push(filters.splice(filters.indexOf(filter), 1)[0])
  })

  if (!handle) {
    throw new Error('The collection is missing a handle')
  }
  if (!_id) {
    throw new Error('The collection is missing an _id')
  }

  // console.log('collection', collection)
  // console.log('customFilter', customFilter)
  // console.log('currentFilter', currentFilter)
  const router = useRouter()
  // console.log('router params', router.query)

  const descriptionPrimary = descriptionRaw ? descriptionRaw.slice(0, 1) : null
  const description = descriptionRaw ? descriptionRaw.slice(1) : null

  const [fetchComplete, setFetchComplete] = useState(
    definitely(collection.products).length < PAGE_SIZE,
  )

  const [productsCount, setProductsCount] = useState(0)
  const [productStart, setProductStart] = useState(
    (initialPage - 1) * PAGE_SIZE,
  )

  useEffect(() => {
    setProductStart(PAGE_SIZE * (initialPage - 1))
  }, [])

  useEffect(() => {
    if (collection.productsCount) setProductsCount(collection.productsCount)
  }, [collection])

  const applySort = async (sort: Sort) => {
    fetchMore(true, sort)
  }

  useEffect(() => {
    fetchMore(true)
    console.log('fetchMore: productStart', productStart)
  }, [currentFilter])

  console.log('productStart', productStart)

  // If there are collection blocks, insert them in the array
  // of products by position
  const items = collectionBlocks?.length
    ? definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
        if (!current?.position) return acc
        const index = current.position - 1
        return [...acc.slice(0, index), current, ...acc.slice(index)]
      }, definitely(productResults))
    : definitely(productResults)

  const fetchMore = async (reset?: boolean, newSort?: Sort) => {
    if (reset) {
      setLoading(true)
      setFetchComplete(false)
    }
    const productStart = reset ? 0 : productResults.length
    const productEnd = reset ? PAGE_SIZE : productResults.length + PAGE_SIZE
    const sortBy = newSort || sort

    const query =
      (sortBy && sortBy !== Sort.Default) || currentFilter
        ? buildFilterQuery(currentFilter || [], sortBy)
        : moreProductsQuery

    const results = await fetchMoreQuery(query, {
      handle,
      productStart,
      productEnd,
      collectionId: _id,
    })

    const newProducts = isCollectionResult(results)
      ? definitely(results[0].products)
      : definitely(results)

    if (newProducts.length < PAGE_SIZE) setFetchComplete(true)

    //@ts-ignore
    if (newProducts[0]?.queryCount) setProductsCount(newProducts[0].queryCount)

    const URLParams = new URLSearchParams(window.location.search)

    if (reset) {
      setProductResults(newProducts)
      router.query.page = Math.ceil(productEnd / PAGE_SIZE).toString()

      // URLParams.set('page', Math.ceil(productEnd / PAGE_SIZE).toString())

      // const newRelativePathQuery =
      //   window.location.pathname + '?' + URLParams.toString()
      // history.pushState(null, '', newRelativePathQuery)
      // console.log('window.location.search', window.location.search)
    } else {
      setProductResults([...productResults, ...newProducts])
      router.query.page = Math.ceil(productEnd / PAGE_SIZE).toString()
      // URLParams.set('page', Math.ceil(productEnd / PAGE_SIZE).toString())

      // const newRelativePathQuery =
      //   window.location.pathname + '?' + URLParams.toString()
      // history.pushState(null, '', newRelativePathQuery)
      // console.log('window.location.search', window.location.search)
    }
    if (newSort) {
      setSort(newSort)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (fetchComplete || !isInView || fetchMoreState.loading) return
    // set a short timeout so it doesn't fetch twice
    const timeout = setTimeout(() => {
      fetchMore()
    }, 300)
    return () => clearTimeout(timeout)
  }, [isInView, fetchMoreState.loading, fetchComplete])

  useEffect(() => {
    if (loading === false) {
      setProductStart(productStart + 1)
    }
  }, [loading])

  // useEffect(() => {
  //   if (inStockFilter) {
  //     console.log('FILTERS', filters)
  //     console.log('CURRENT FILTERS', currentFilter)
  //     currentFilter?.map((f) => {
  //       if (f.filterType === 'INVENTORY_FILTER') {
  //         f.applyFilter = true
  //       }
  //     })
  //     console.log('CURRENT FILTERS MAPPED', currentFilter)
  //     setInitialFilterValues(currentFilter)
  //   }
  // }, [])

  const applyFilters = async (filters: null | FilterConfiguration) => {
    setCurrentFilter(filters)
  }

  if (!handle) throw new Error('No handle was fetched')
  const firstProduct = definitely(collection.products)[0]
  const firstProductImage = firstProduct
    ? unwindEdges(firstProduct?.sourceData?.images)[0][0]
    : undefined

  const path = ['collections', handle].join('/')
  const defaultSeo = {
    title: collection.title || '',
    description: collection.sourceData?.description,
    image:
      getHeroImage(hero) || collection?.sourceData?.image || firstProductImage,
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
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} hidden={hidden} />
      {hero && validHero ? <HeroBlock hero={hero} /> : null}
      <Wrapper
        handle={handle}
        withHero={Boolean(hero && validHero)}
        isLightTheme={Boolean(lightTheme)}
      >
        {filters && filters.length ? (
          <Filter
            applyFilters={applyFilters}
            applySort={applySort}
            filters={filters}
            currentFilter={currentFilter}
            productsCount={productsCount}
            resetFilters={resetFilters}
            hideFilter={hideFilter}
            inStockFilter={inStockFilter}
          />
        ) : null}
        {items.length === 0 && !loading ? (
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
            {loading && productStart > 1 ? (
              <LoadingWrapper>
                <Loading />
              </LoadingWrapper>
            ) : null}

            <ProductGridWrapper isLoading={loading}>
              <ProductGrid
                reduceColumnCount={reduceColumnCount}
                preferredVariantMatches={preferredVariantMatches}
                currentFilter={currentFilter}
                hideFilter={hideFilter}
                items={items}
                collectionId={_id}
              />
              {!fetchComplete ? (
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

              <div ref={bottomRef} />
            </ProductGridWrapper>
          </>
        )}
      </Wrapper>
    </>
  )
}
