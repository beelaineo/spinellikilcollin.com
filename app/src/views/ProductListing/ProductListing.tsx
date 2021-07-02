import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Box } from '@xstyled/styled-components'
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
import { Button } from '../../components/Button'
import { getHeroImage, isValidHero, definitely } from '../../utils'
import { useShopData } from '../../providers/ShopDataProvider'
import { useInViewport, useSanityQuery } from '../../hooks'
import { buildFilterQuery, moreProductsQuery } from './sanityCollectionQuery'
import { SEO } from '../../components/SEO'
import { Loading } from '../../components/Loading'
import BambuserView from '../Bambuser/BambuserView'
import { config } from '../../../src/config'
const { BAMBUSER_SLUG, BAMBUSER_AUTOPLAY } = config
import {
  LoadingWrapper,
  ProductGridWrapper,
  Wrapper,
  NoResultsWrapper,
} from './styled'

const { useRef, useEffect, useState } = React

interface ProductListingProps {
  collection: ShopifyCollection
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

export const ProductListing = ({ collection }: ProductListingProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [productResults, setProductResults] = useState<ShopifyProduct[]>([
    ...definitely(collection.products).slice(0, PAGE_SIZE),
  ])
  const { isInView } = useInViewport(bottomRef, '500px 0px')
  const { productListingSettings } = useShopData()
  const [sort, setSort] = useState<Sort>(Sort.Default)
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentFilter, setCurrentFilter] =
    useState<FilterConfiguration | null>(null)
  const { state: fetchMoreState, query: fetchMoreQuery } = useSanityQuery<
    ShopifyCollection[] | ShopifyProduct[],
    PaginationArgs
  >()
  const defaultFilter = productListingSettings?.defaultFilter
  const filters = definitely(defaultFilter).filter(
    (f) => !Boolean('searchOnly' in f && f.searchOnly),
  )
  const {
    _id,
    preferredVariantMatches,
    hero,
    seo,
    handle,
    collectionBlocks,
    reduceColumnCount,
  } = collection
  if (!handle) {
    throw new Error('The collection is missing a handle')
  }
  if (!_id) {
    throw new Error('The collection is missing an _id')
  }
  const [fetchComplete, setFetchComplete] = useState(
    definitely(collection.products).length < PAGE_SIZE,
  )

  const openFilter = () => setFilterOpen(true)

  const applySort = async (sort: Sort) => {
    fetchMore(true, sort)
  }

  useEffect(() => {
    if (!currentFilter) return
    fetchMore(true)
  }, [currentFilter])

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

    if (reset) {
      setProductResults(newProducts)
    } else {
      setProductResults([...productResults, ...newProducts])
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

  const applyFilters = async (filters: null | FilterConfiguration) => {
    if (!filters?.length) {
      return
    }
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

  let showBambuser = false
  let bambuserAutoPlay =
    BAMBUSER_AUTOPLAY && BAMBUSER_AUTOPLAY === 'true' ? true : false
  if (collection?.handle && BAMBUSER_SLUG) {
    if (collection?.handle.toLowerCase() === BAMBUSER_SLUG.toLowerCase()) {
      showBambuser = true
    }
  }
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      {showBambuser ? <BambuserView autoPlay={bambuserAutoPlay} /> : null}
      {hero && validHero ? <HeroBlock hero={hero} /> : null}
      <Wrapper handle={handle} withHero={Boolean(hero && validHero)}>
        {filters && filters.length ? (
          <Filter
            applyFilters={applyFilters}
            applySort={applySort}
            open={filterOpen}
            filters={filters}
          />
        ) : null}
        {items.length === 0 ? (
          <NoResultsWrapper>
            <Heading level={3} textAlign="center" fontStyle="italic">
              No products found
            </Heading>
            <Button textTransform="initial" onClick={openFilter} level={3}>
              Try using fewer filters
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
                items={items}
              />
              {!fetchComplete ? (
                <Box my={8}>
                  <Heading
                    level={4}
                    textAlign="center"
                    fontStyle="italic"
                    color="body.7"
                  >
                    Loading more products...
                  </Heading>
                  <Loading />
                </Box>
              ) : null}
              <div ref={bottomRef} />
            </ProductGridWrapper>
          </>
        )}
      </Wrapper>
    </>
  )
}
