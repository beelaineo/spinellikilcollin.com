import * as React from 'react'
import {
  ShopifyCollection,
  ShopifyProduct,
  CollectionBlock as CollectionBlockType,
  FilterConfiguration,
} from '../../types'
import { ProductThumbnail } from '../../components/Product'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { Filter } from '../../components/Filter'
import { CollectionBlock } from './CollectionBlock'
import { definitely } from '../../utils'
import { Wrapper, ProductGrid, ProductGridItem } from './styled'
import { useShopData } from '../../providers/ShopDataProvider'
import { useSanityQuery } from '../../hooks'
import { buildQuery } from './filterQuery'

interface ProductListingProps {
  collection: ShopifyCollection
  products: ShopifyProduct[]
}

type Item = ShopifyProduct | CollectionBlockType

interface FilterVariables {
  collectionId: string
}

export const ProductListing = ({
  collection,
  products,
}: ProductListingProps) => {
  const { productListingSettings } = useShopData()
  const { state, executeQuery, reset: resetQueryResults } = useSanityQuery<
    ShopifyProduct,
    FilterVariables
  >()
  const filterResults = state.results
  const defaultFilter = productListingSettings?.defaultFilter
  const filters = definitely(defaultFilter)
  const { hero, collectionBlocks } = collection

  // If there are collection blocks, insert them in the array
  // of products by position
  const items = filterResults
    ? filterResults
    : collectionBlocks?.length
    ? definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
        if (!current?.position) return acc
        const index = current.position - 1
        return [...acc.slice(0, index), current, ...acc.slice(index)]
      }, definitely(products))
    : definitely(products)

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
    executeQuery(query, params)
  }

  const displayPrice = Boolean(filterResults?.length)

  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <Wrapper>
        {filters && filters.length ? (
          <Filter applyFilters={applyFilters} filters={filters} />
        ) : null}
        <ProductGrid>
          {definitely(items).map((item) => {
            switch (item.__typename) {
              case 'CollectionBlock':
                return (
                  <ProductGridItem
                    format={item.format}
                    key={item._key || 'some-key'}
                  >
                    <CollectionBlock
                      format={item.format}
                      collectionBlock={item}
                    />
                  </ProductGridItem>
                )
              case 'ShopifyProduct':
                return (
                  <ProductGridItem key={item._id || 'some-key'}>
                    <ProductThumbnail
                      product={item}
                      displayPrice={displayPrice}
                    />
                  </ProductGridItem>
                )
            }
          })}
        </ProductGrid>
      </Wrapper>
    </>
  )
}
