import * as React from 'react'
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
import { Button } from '../../components/Button'
import { getHeroImage, isValidHero, definitely } from '../../utils'
import { Wrapper, NoResultsWrapper } from './styled'
import { useShopData } from '../../providers/ShopDataProvider'
import { useInViewport, useSanityQuery } from '../../hooks'
import { buildQuery } from './filterQuery'
import { moreProductsQuery } from './sanityCollectionQuery'
import { SEO } from '../../components/SEO'

const { useRef, useEffect, useState } = React

interface ProductListingProps {
  collection: ShopifyCollection
}

type Item = ShopifyProduct | CollectionBlockType

interface FilterVariables {
  collectionId: string
}

interface PaginationArgs {
  handle: string
  productStart: number
  productEnd: number
}

const PAGE_SIZE = 12

export const ProductListing = ({ collection }: ProductListingProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [fetchMoreResults, setFetchMoreResults] = useState<ShopifyProduct[]>([])
  const { isInView } = useInViewport(bottomRef, '500px 0px')
  const { productListingSettings } = useShopData()
  const [sort, setSort] = useState<Sort>(Sort.Default)
  const [filterOpen, setFilterOpen] = useState(false)
  const {
    state: searchState,
    query: sanityQuery,
    reset: resetQueryResults,
  } = useSanityQuery<ShopifyProduct, FilterVariables>()
  const { state: fetchMoreState, query: fetchMoreQuery } = useSanityQuery<
    ShopifyCollection,
    PaginationArgs
  >()
  const filterResults = searchState.results
  const defaultFilter = productListingSettings?.defaultFilter
  const filters = definitely(defaultFilter)
  const {
    preferredVariantMatches,
    products,
    hero,
    seo,
    handle,
    collectionBlocks,
  } = collection
  const [fetchComplete, setFetchComplete] = useState(
    definitely(collection.products).length < PAGE_SIZE,
  )

  const openFilter = () => setFilterOpen(true)

  const allProducts = [
    ...definitely(products).slice(0, PAGE_SIZE),
    ...fetchMoreResults,
  ]

  const applySort = (sort: Sort) => {
    console.log(sort)
  }

  // If there are collection blocks, insert them in the array
  // of products by position
  const items = filterResults
    ? filterResults
    : collectionBlocks?.length
    ? definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
        if (!current?.position) return acc
        const index = current.position - 1
        return [...acc.slice(0, index), current, ...acc.slice(index)]
      }, definitely(allProducts))
    : definitely(allProducts)

  const fetchMore = async () => {
    if (!collection.handle) {
      throw new Error('The collection is missing a handle')
    }
    const productStart = allProducts.length
    const productEnd = allProducts.length + PAGE_SIZE
    const results = await fetchMoreQuery(moreProductsQuery, {
      handle: collection.handle,
      productStart,
      productEnd,
    })
    const newProducts = definitely(results[0].products)
    if (newProducts.length < PAGE_SIZE) setFetchComplete(true)
    setFetchMoreResults([...fetchMoreResults, ...newProducts])
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
      resetQueryResults()
      return
    }
    const query = buildQuery(filters)
    if (!collection._id) {
      throw new Error('No _id for this collection was supplied')
    }
    const params = {
      collectionId: collection._id,
    }
    sanityQuery(query, params)
  }

  if (!handle) throw new Error('No handle was fetched')
  const path = ['collections', handle].join('/')
  const firstProduct = definitely(collection.products)[0]
  const firstProductImage = firstProduct
    ? unwindEdges(firstProduct?.sourceData?.images)[0][0]
    : undefined
  const defaultSeo = {
    title: collection.title || '',
    image:
      getHeroImage(hero) || collection?.sourceData?.image || firstProductImage,
  }

  const validHero = isValidHero(hero)
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      {hero && validHero ? <HeroBlock hero={hero} /> : null}
      <Wrapper withHero={Boolean(hero && validHero)}>
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
            <ProductGrid
              preferredVariantMatches={preferredVariantMatches}
              items={items}
            />
            {!fetchComplete && filterResults === null ? (
              <Heading
                level={4}
                my={8}
                textAlign="center"
                fontStyle="italic"
                color="body.7"
              >
                Loading more products...
              </Heading>
            ) : null}
            <div key={items.length} ref={bottomRef} />
          </>
        )}
      </Wrapper>
    </>
  )
}
