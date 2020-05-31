import * as React from 'react'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'
import { ShopifyCollection } from '../../types'
import { Carousel } from './Carousel'
import { ProductThumbnail } from '../Product'
import { definitely } from '../../utils'
import { shopifyCollectionFragment } from '../../graphql'

const { useEffect } = React

const query = gql`
  query CarouselCollectionQuery($shopifyId: String!) {
    allShopifyCollection(where: { shopifyId: { eq: $shopifyId } }) {
      ...ShopifyCollectionFragment
    }
  }
  ${shopifyCollectionFragment}
`

interface Response {
  allShopifyCollection: ShopifyCollection[]
}
interface Variables {
  shopifyId: string | null | undefined
}

interface CollectionCarouselProps {
  collection: ShopifyCollection
}

export const CollectionCarousel = ({ collection }: CollectionCarouselProps) => {
  const collectionProducts = collection?.products
  const variables = {
    shopifyId: collection.shopifyId,
  }
  const [getCarousel, { data }] = useLazyQuery<Response, Variables>(query)

  useEffect(() => {
    if (!variables.shopifyId) return
    if (collectionProducts && collectionProducts.length) return
    getCarousel({ variables })
  }, [])

  const queryProducts = data?.allShopifyCollection[0]?.products

  const products = definitely(collectionProducts || queryProducts)

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
