import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Collection } from '../../types'
import { Carousel, Product } from './Carousel'
import { ProductThumbnail } from '../Product'

interface CollectionCarouselProps {
  collection: Collection
  /* */
}

const getProducts = (collection: Collection): Product[] => {
  const productNodes = collection?.products
  if (!productNodes) return []
  return productNodes
    .map((pNode) => pNode?.sourceData)
    .reduce(
      (acc, current) =>
        current !== undefined && current !== null ? [...acc, current] : acc,
      [],
    )
}

export const CollectionCarousel = ({ collection }: CollectionCarouselProps) => {
  console.log('CAROUSEL', collection)
  const products = getProducts(collection)
  console.log(products)
  if (!products || !products.length) return null

  return (
    <Carousel>
      {//
      // @ts-ignore no clue here
      products.map((product: Product | ShopifyProductSource) => {
        const key =
          product.__typename === 'Product'
            ? product.id
            : product._key || 'some-key'
        return <ProductThumbnail key={key} product={product} />
      })}
    </Carousel>
  )
}
