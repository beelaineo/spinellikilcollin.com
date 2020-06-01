import * as React from 'react'
import {
  ShopifyCollection,
  ShopifyProduct,
  CollectionBlock as CollectionBlockType,
  FilterMatch,
} from '../../types'
import { PageWrapper } from '../../components/Layout'
import { ProductThumbnail } from '../../components/Product'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { Filter } from '../../components/Filter'
import { ProductListingHeader } from './ProductListingHeader'
import { CollectionBlock } from './CollectionBlock'
import { definitely } from '../../utils'
import { ProductGrid, ProductGridItem } from './styled'
import { useShopData } from '../../providers/ShopDataProvider'

interface ProductListingProps {
  collection: ShopifyCollection
  products: ShopifyProduct[]
}

type Item = ShopifyProduct | CollectionBlockType

export const ProductListing = ({
  collection,
  products,
}: ProductListingProps) => {
  const { productListingSettings } = useShopData()
  const defaultFilter = productListingSettings?.defaultFilter
  const filters = definitely(defaultFilter)
  const { hero, collectionBlocks } = collection
  // If there are collection blocks, insert them in the array
  // of products by position
  const items = collectionBlocks?.length
    ? definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
        if (!current?.position) return acc
        const index = current.position - 1
        return [...acc.slice(0, index), current, ...acc.slice(index)]
      }, definitely(products))
    : definitely(products)
  const applyFilters = (filters: FilterMatch[][]) => {
    //
  }
  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <PageWrapper>
        {filters && filters.length ? (
          <Filter applyFilters={applyFilters} filters={filters} />
        ) : null}
        <ProductListingHeader collection={collection} />
        <ProductGrid>
          {items.map((item) => {
            switch (item.__typename) {
              case 'CollectionBlock':
                return (
                  <ProductGridItem
                    format={item.format}
                    key={item._key || 'some-key'}
                  >
                    <CollectionBlock collectionBlock={item} />
                  </ProductGridItem>
                )
              case 'ShopifyProduct':
                return (
                  <ProductGridItem key={item._id || 'some-key'}>
                    <ProductThumbnail product={item} />
                  </ProductGridItem>
                )
            }
          })}
        </ProductGrid>
      </PageWrapper>
    </>
  )
}
