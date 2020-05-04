import * as React from 'react'
import { ShopifyCollection } from '../../types'
import { ProductGrid, Wrapper } from './styled'
import { ProductThumbnail } from '../../components/Product'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { ProductListingHeader } from './ProductListingHeader'
import { ProductListingFilter } from './ProductListingFilter'

interface ProductListingProps {
  collection: ShopifyCollection
}

export const ProductListing = ({ collection }: ProductListingProps) => {
  const products = collection.products
  const { hero } = collection
  return (
    <Wrapper>
      <ProductListingFilter collection={collection} />
      {hero ? <HeroBlock hero={hero} /> : null}

      <ProductListingHeader collection={collection} />
      <ProductGrid>
        {products
          ? products
              .filter((p) => p && p.archived !== true)
              .map((product) =>
                product ? (
                  <ProductThumbnail
                    displayPrice
                    key={product._id || 'some-key'}
                    product={product}
                  />
                ) : null,
              )
          : null}
      </ProductGrid>
    </Wrapper>
  )
}
