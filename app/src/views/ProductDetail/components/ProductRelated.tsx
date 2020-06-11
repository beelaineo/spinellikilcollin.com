import * as React from 'react'
import {
  Carousel as CarouselType,
  ShopifyCollection,
  ShopifyProduct,
} from '../../../types'
import { ProductRelatedWrapper, ProductRelatedInner } from '../styled'
import { ItemsCarousel, CollectionCarousel } from '../../../components/Carousel'
import { Heading } from '../../../components/Text'

interface ProductRelatedProps {
  product: ShopifyProduct
}

const getCarousel = (
  product: ShopifyProduct,
): CarouselType | ShopifyCollection | null => {
  const { related, collections } = product
  console.log(related, collections)

  if (related) {
    if (related.items) return related
    if (related.collection) return related.collection
  }
  if (collections && collections.length) return collections[0]
  return null
}

export const ProductRelated = ({ product }: ProductRelatedProps) => {
  const carousel = getCarousel(product)
  if (!carousel) return null
  return (
    <ProductRelatedWrapper>
      <Heading level={3} m={3} textTransform="capitalize" textAlign="center">
        {carousel.title || 'More like this'}
      </Heading>
      <ProductRelatedInner>
        {carousel.__typename === 'Carousel' && carousel.items ? (
          <ItemsCarousel items={carousel.items} />
        ) : carousel.__typename === 'ShopifyCollection' ? (
          <CollectionCarousel
            key={product._id || 'some-key'}
            collection={carousel}
          />
        ) : null}
      </ProductRelatedInner>
    </ProductRelatedWrapper>
  )
}
