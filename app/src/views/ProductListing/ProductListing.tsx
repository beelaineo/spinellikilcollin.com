import * as React from 'react'
import {
  ShopifyCollection,
  ShopifyProduct,
  CollectionBlock as CollectionBlockType,
} from '../../types'
import { PageWrapper } from '../../components/Layout'
import { ProductThumbnail } from '../../components/Product'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { ProductListingHeader } from './ProductListingHeader'
import { ProductListingFilter } from './ProductListingFilter'
import { CollectionBlock } from './CollectionBlock'
import { definitely } from '../../utils'
import { ProductGrid, ProductGridItem } from './styled'

interface ProductListingProps {
  collection: ShopifyCollection
  products: ShopifyProduct[]
}

type Item = ShopifyProduct | CollectionBlockType

export const ProductListing = ({
  collection,
  products,
}: ProductListingProps) => {
  const { hero, collectionBlocks } = collection
  const items = definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
    if (!current?.position) return acc
    const index = current.position - 1
    return [...acc.slice(0, index), current, ...acc.slice(index)]
  }, definitely(products))
  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <PageWrapper>
        <ProductListingFilter collection={collection} />
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
