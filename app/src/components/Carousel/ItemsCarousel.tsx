import * as React from 'react'
import { Carousel } from './Carousel'
import { Collection, Product, RichPageLink } from '../../types'
import { ProductThumbnail } from '../Product'
import { CollectionThumbnail } from '../Collection'

interface ItemsCarouselProps {
  items: Array<Collection | Product | RichPageLink>
}

export const ItemsCarousel = ({ items }: ItemsCarouselProps) => {
  return (
    <Carousel>
      {items.map((item) =>
        item.__typename === 'Product' ? (
          <ProductThumbnail key={item._id} product={item} />
        ) : item.__typename === 'Collection' ? (
          <CollectionThumbnail key={item._id} collection={item} />
        ) : null,
      )}
    </Carousel>
  )
}
