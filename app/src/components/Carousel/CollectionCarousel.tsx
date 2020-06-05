import * as React from 'react'
import gql from 'graphql-tag'
import { ShopifyCollection, ShopifyProduct } from '../../types'
import { Carousel } from './Carousel'
import { ProductThumbnail } from '../Product'
import { definitely } from '../../utils'
import { useLazyRequest, shopifyProductThumbnailFragment } from '../../graphql'

const { useEffect } = React

const query = gql`
  query CarouselCollectionQuery($collectionId: ID!) {
    allShopifyProduct(
      where: { _: { references: $collectionId }, archived: { neq: true } }
      limit: 10
    ) {
      ...ShopifyProductThumbnailFragment
    }
  }
  ${shopifyProductThumbnailFragment}
`

interface Response {
  allShopifyProduct: ShopifyProduct[]
}
interface Variables {
  collectionId: string | null | undefined
}

interface CollectionCarouselProps {
  collection: ShopifyCollection
}

export const CollectionCarousel = ({ collection }: CollectionCarouselProps) => {
  const collectionProducts = collection?.products
  const variables = {
    collectionId: collection._id,
  }
  const [getCarousel, response] = useLazyRequest<Response, Variables>(query)
  const { data } = response

  useEffect(() => {
    if (Boolean(data)) return
    if (!variables.collectionId) return
    if (collectionProducts && collectionProducts.length) return
    getCarousel(variables)
  }, [data])

  const products = definitely(collectionProducts || data?.allShopifyProduct)

  if (!products.length) return null

  return (
    <Carousel>
      {definitely(products)
        .filter((product) => product?.archived !== true)
        .map((product) => {
          return (
            <ProductThumbnail
              key={product._key || 'some-key'}
              product={product}
            />
          )
        })}
    </Carousel>
  )
}
