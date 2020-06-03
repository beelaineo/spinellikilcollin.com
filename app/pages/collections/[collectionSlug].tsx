import * as React from 'react'
import gql from 'graphql-tag'
import { ShopifyProduct, ShopifyCollection } from '../../src/types'
import { NotFound, ProductListing } from '../../src/views'
import {
  shopifySourceImageFragment,
  sanityImageFragment,
  shopifySourceProductFragment,
  richImageFragment,
  heroFragment,
} from '../../src/graphql'
import { PageContext } from '../_app'

const collectionQuery = gql`
  query CollectionPageQuery($handle: String) {
    allShopifyCollection(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
      _id
      _type
      _key
      title
      handle
      shopifyId
      hero {
        ...HeroFragment
      }
      collectionBlocks {
        _key
        format
        bodyRaw
        position
        textColor
        backgroundColor
        backgroundImage {
          ...RichImageFragment
        }
      }
    }
  }
  ${richImageFragment}
  ${heroFragment}
`

const productsQuery = gql`
  query AllCollectionProducts($collectionId: ID) {
    allShopifyProduct(
      where: { _: { references: $collectionId }, archived: { neq: true } }
    ) {
      _id
      _key
      archived
      shopifyId
      title
      handle
      options {
        _key
        _type
        shopifyOptionId
        name
        values {
          _key
          _type
          value
          descriptionRaw
          swatch {
            ...SanityImageFragment
          }
        }
      }
      sourceData {
        ...ShopifySourceProductFragment
      }
    }
  }

  ${sanityImageFragment}
  ${shopifySourceImageFragment}
  ${shopifySourceProductFragment}
`

export interface CollectionResult {
  Collection: ShopifyCollection
}

interface CollectionResponse {
  allShopifyCollection: ShopifyCollection[]
}

interface ProductsResponse {
  allShopifyProduct: ShopifyProduct[]
}

interface CollectionPageProps {
  collection: ShopifyCollection
  products: ShopifyProduct[]
}

const Collection = ({ collection, products }: CollectionPageProps) => {
  if (!collection) return <NotFound />
  return <ProductListing collection={collection} products={products} />
}

Collection.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient, query } = ctx
  const collectionResponse = await apolloClient.query<CollectionResponse>({
    query: collectionQuery,
    variables: { handle: query.collectionSlug },
  })

  const collections = collectionResponse?.data?.allShopifyCollection
  const collection = collections.length ? collections[0] : undefined

  const productsResponse = collection
    ? await apolloClient.query<ProductsResponse>({
        query: productsQuery,
        variables: { collectionId: collection._id },
      })
    : undefined

  const products = productsResponse?.data?.allShopifyProduct || []

  return { collection, products }
}

export default Collection
