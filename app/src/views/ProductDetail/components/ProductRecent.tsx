import * as React from 'react'
import Link from 'next/link'
import {
  Carousel as CarouselType,
  Collection,
  Product,
  ShopifyProductVariant,
} from '../../../types'
import { ProductRelatedWrapper, ProductRelatedInner } from '../styled'
import {
  ItemsCarousel,
  CollectionCarousel,
  SuggestedProductsCarousel,
} from '../../../components/Carousel'
import { Heading } from '../../../components/Text'
import { RecentlyViewedCarousel } from '../../../components/Carousel/RecentlyViewedCarousel'
import { Variant } from '../../../providers/ShopifyProvider/types'
import { getRecentlyViewedProducts } from '../../../utils/recentlyViewed'

interface ProductRecentProps {
  product?: Product
  currentVariant?: Variant
}

export const ProductRecent = ({
  product,
  currentVariant,
}: ProductRecentProps) => {
  const recentlyViewed = getRecentlyViewedProducts()

  if (!recentlyViewed.length || recentlyViewed.length < 2) return null

  return (
    <ProductRelatedWrapper>
      <Heading level={4} m={3} textTransform="capitalize" textAlign="center">
        Recently Viewed Styles
      </Heading>
      <ProductRelatedInner>
        <RecentlyViewedCarousel
          currentVariant={currentVariant}
          product={product}
        />
      </ProductRelatedInner>
    </ProductRelatedWrapper>
  )
}
