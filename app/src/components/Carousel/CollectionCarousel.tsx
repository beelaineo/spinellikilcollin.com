import * as React from 'react'
import { ShopifyCollection } from '../../types'
import { Carousel } from './Carousel'
import { ProductThumbnail } from '../Product'
import { definitely, useViewportSize } from '../../utils'

interface CollectionCarouselProps {
  collection: ShopifyCollection
}

export const CollectionCarousel = ({ collection }: CollectionCarouselProps) => {
  const products = collection?.products
  const { width: viewportWidth } = useViewportSize()

  if (!products?.length) return

  const initialSlide = viewportWidth < 650 ? 1 : 0
  return (
    <Carousel initialSlide={initialSlide}>
      {definitely(products)
        .filter(
          (product) =>
            product?.archived !== true &&
            product?.hidden !== true &&
            product?.hideFromSearch !== true,
        )
        .map((product) => {
          return (
            <ProductThumbnail
              key={product.shopifyId || 'some-key'}
              preload
              product={product}
              displaySwatches={false}
              displayTags={false}
              headingLevel={5}
              carousel={true}
            />
          )
        })}
    </Carousel>
  )
}
