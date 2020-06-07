import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ShopifyProduct, ShopifyCollection } from '../../src/types'
import { NotFound, ProductListing } from '../../src/views'
import {
  shopifyProductThumbnailFragment,
  richImageFragment,
  heroFragment,
} from '../../src/graphql'
import { request } from '../../src/graphql'
import { definitely } from '../../src/utils'

const collectionQuery = gql`
  query CollectionPageQuery($handle: String) {
    allShopifyCollection(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
      __typename
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
        __typename
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
      ...ShopifyProductThumbnailFragment
    }
  }
  ${shopifyProductThumbnailFragment}
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

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params) return { props: { products: undefined, collection: undefined } }
  const collectionResponse = await request<CollectionResponse>(
    collectionQuery,
    { handle: params.collectionSlug },
  )

  const collections = collectionResponse?.allShopifyCollection
  const collection = collections?.length ? collections[0] : undefined

  const productsResponse = collection
    ? await request<ProductsResponse>(productsQuery, {
        collectionId: collection._id,
      })
    : undefined

  const products = productsResponse?.allShopifyProduct || []

  return {
    props: { products: products || null, collection: collection || null },
    unstable_revalidate: 60,
  }
}

/**
 * Static Routes
 */

const collectionHandlesQuery = gql`
  query CollectionHandlesQuery {
    allShopifyCollection {
      _id
      shopifyId
      handle
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await request<CollectionResponse>(collectionHandlesQuery)
  const collections = definitely(result?.allShopifyCollection)
  const paths = collections.map((collection) => ({
    params: {
      collectionSlug: collection.handle ? collection.handle : undefined,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Collection
