import * as React from 'react'
import { gql } from 'graphql-tag'
import { ShopifyCollection } from '../../types'
import { Carousel } from './Carousel'
import { ProductThumbnail } from '../Product'
import { definitely, useViewportSize } from '../../utils'
import { useLazyRequest, shopifySourceImageFragment } from '../../graphql'
const { useEffect } = React

const query = gql`
  query CarouselCollectionQuery($collectionId: ID!) {
    allShopifyCollection(where: { _id: { eq: $collectionId } }) {
      __typename
      _id
      _type
      _key
      title
      handle
      archived
      shopifyId
      products {
        __typename
        _id
        _key
        title
        hidden
        hideFromSearch
        handle
        archived
        shopifyId
        minVariantPrice
        maxVariantPrice
        sourceData {
          __typename
          id
          title
          handle
          tags
          productType
          images {
            __typename
            edges {
              __typename
              cursor
              node {
                ...ShopifySourceImageFragment
              }
            }
          }
        }
      }
    }
  }
  ${shopifySourceImageFragment}
`

interface Response {
  allShopifyCollection: ShopifyCollection[]
}
interface Variables {
  collectionId: string | null | undefined
}

interface CollectionCarouselProps {
  collection: ShopifyCollection
}

export const CollectionCarousel = ({ collection }: CollectionCarouselProps) => {
  const collectionProducts = collection?.products
  const { width: viewportWidth } = useViewportSize()

  const variables = {
    collectionId: collection._id,
  }
  const [getCarousel, response] = useLazyRequest<Response, Variables>(
    query,
    variables,
  )
  const { data } = response

  useEffect(() => {
    if (Boolean(data)) return
    if (!variables.collectionId) return
    if (collectionProducts && collectionProducts.length) return
    getCarousel(variables)
  }, [data])

  const fetchedCollection = data?.allShopifyCollection[0]

  const products = collectionProducts
    ? collectionProducts
    : definitely(fetchedCollection?.products)

  if (!products?.length) return null

  const initialSlide = viewportWidth < 650 ? 1 : 0
  return (
    <Carousel initialSlide={initialSlide}>
      {definitely(products)
        .filter(
          (product: any) =>
            product?.archived !== true &&
            product?.hidden !== true &&
            product?.hideFromSearch !== true,
        )
        .map((product: any) => {
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
