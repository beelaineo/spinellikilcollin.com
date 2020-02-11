import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from 'urql'
import { ShopifyCollection } from '../../types'
import { ProductGrid } from './styled'
import { ProductThumbnail } from '../../components/Product'
import { ProductListingHeader } from './ProductListingHeader'
import { ProductListingFilter } from './ProductListingFilter'

interface ProductListingProps {
  collection: ShopifyCollection
}

export const ProductListing = ({ collection }: ProductListingProps) => {
  const products = collection.products
  return (
    <React.Fragment>
      <ProductListingFilter collection={collection} />
      <ProductListingHeader collection={collection} />
      <ProductGrid>
        {products
          ? products.map((product) =>
              product ? (
                <ProductThumbnail
                  key={product._key || 'some-key'}
                  product={product}
                />
              ) : null,
            )
          : null}
      </ProductGrid>
    </React.Fragment>
  )
}
