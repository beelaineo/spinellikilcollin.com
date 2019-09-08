import { Collection } from 'use-shopify'
import { shopifyImageFragment } from '../../graphql/fragments'

export const COLLECTION_QUERY = /* GraphQL */ `
  query CollectionQuery($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      image {
        ...ImageFragment
      }
      products(first: 200) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            title
            handle
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
            images(first: 2) {
              edges {
                cursor
                node {
                  ...ImageFragment
                }
              }
            }
          }
        }
      }
    }
  }

  ${shopifyImageFragment}
`

export interface CollectionResult {
  collectionByHandle: Collection
}
