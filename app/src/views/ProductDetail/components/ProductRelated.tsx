import * as React from 'react'
import Link from 'next/link'
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
  const linkAs =
    carousel.__typename === 'ShopifyCollection'
      ? `/collections/${carousel.handle}`
      : ''
  return (
    <ProductRelatedWrapper>
      {carousel.__typename === 'ShopifyCollection' ? (
        <Heading level={4} m={3} textTransform="capitalize" textAlign="center">
          <Link href="/collections/[collectionSlug]" as={linkAs}>
            {carousel.title || 'More like this'}
          </Link>
        </Heading>
      ) : (
        <Heading level={4} m={3} textTransform="capitalize" textAlign="center">
          {carousel.title || 'More like this'}
        </Heading>
      )}
      <ProductRelatedInner>
        {carousel.__typename === 'Carousel' &&
        carousel.items &&
        carousel.items.length ? (
          <ItemsCarousel items={carousel.items} />
        ) : carousel.__typename === 'Carousel' && carousel.collection ? (
          <CollectionCarousel collection={carousel.collection} />
        ) : carousel.__typename === 'ShopifyCollection' ? (
          <CollectionCarousel collection={carousel} />
        ) : null}
      </ProductRelatedInner>
    </ProductRelatedWrapper>
  )
}
