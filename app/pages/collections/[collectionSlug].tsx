import * as React from 'react'
import gql from 'graphql-tag'
import { ShopifyCollection } from '../../src/types'
import { NotFound, ProductListing } from '../../src/views'
import { shopifySourceImageFragment, heroFragment } from '../../src/graphql'

interface CollectionQueryResult {
  allShopifyCollections: [ShopifyCollection]
}

export const collectionQuery = gql`
  query CollectionPageQuery($handle: String) {
    allShopifyCollections(where: { handle: $handle }) {
      _id
      _type
      _key
      title
      handle
      shopifyId
      hero {
        ...HeroFragment
      }
      products {
        _id
        _key
        shopifyId
        title
        handle
        sourceData {
          id
          title
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            edges {
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

  ${heroFragment}
  ${shopifySourceImageFragment}
`

export interface CollectionResult {
  Collection: ShopifyCollection
}

interface CollectionPageProps {
  collection: ShopifyCollection
}

const Collection = ({ collection }: CollectionPageProps) => {
  if (!collection) return <NotFound />
  return <ProductListing collection={collection} />
}

Collection.getInitialProps = async (ctx: any) => {
  const { apolloClient, query } = ctx
  const variables = { handle: query.collectionSlug }
  const response = await apolloClient.query({
    query: collectionQuery,
    variables,
  })
  console.log(variables)
  console.log(response.data)

  const collections = response?.data?.allShopifyCollections
  const collection = collections.length ? collections[0] : undefined

  return { collection }
}

export default Collection
