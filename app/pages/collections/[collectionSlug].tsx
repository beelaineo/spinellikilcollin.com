import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ShopifyProduct, ShopifyCollection } from '../../src/types'
import { sanityQuery } from '../../src/services/sanity'
import { NotFound, ProductListing } from '../../src/views'
import {
  shopifyProductThumbnailFragment,
  richImageFragment,
  heroFragment,
  cloudinaryVideoFragment,
} from '../../src/graphql'
import { request } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const sanityCollectionQuery = `
*[
  _type == "shopifyCollection"
  && defined(shopifyId)
  && handle == $handle
] {
  _id,
  _type,
  _key,
  title,
  handle,
  shopifyId,
  hero {
    image {
  		asset->,
      ...,
    },
    mobileImage {
      ...,
    },
    ...,
  },
  products[]->{
    _id,
    _type,
    handle,
    minVariantPrice,
    maxVariantPrice,
    shopifyId,
    title,
    options[]{
      _key,
      _type,
      values[defined(swatch)],
      ...
    },
    sourceData {
      _type,
      handle,
      id,
      images,
      tags,
      title,
      tags,
      priceRange,
      variants {
        edges[]{
          cursor,
          node {
            _type,
            id,
            image,
            title,
            selectedOptions,
          },
        },
      },

    },
  },
  preferredVariantMatches,
  collectionBlocks[]{
    _key,
    format,
    body,
    ...
  },
}
`

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
      products {
        ...ShopifyProductThumbnailFragment
      }
      preferredVariantMatches
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
        cloudinaryVideo {
          ...CloudinaryVideoFragment
        }
      }
    }
  }
  ${richImageFragment}
  ${heroFragment}
  ${cloudinaryVideoFragment}
  ${shopifyProductThumbnailFragment}
`

export interface CollectionResult {
  Collection: ShopifyCollection
}

interface CollectionResponse {
  allShopifyCollection: ShopifyCollection[]
}

interface CollectionPageProps {
  collection: ShopifyCollection
}

const Collection = ({ collection }: CollectionPageProps) => {
  if (!collection) return <NotFound />
  return <ProductListing collection={collection} />
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params) return { props: { products: undefined, collection: undefined } }
  // const [collectionResponse, shopData] = await Promise.all([
  //   request<CollectionResponse>(collectionQuery, {
  //     handle: params.collectionSlug,
  //   }),
  //
  //   requestShopData(),
  // ])
  //
  const [collections, shopData] = await Promise.all([
    sanityQuery<ShopifyCollection[]>(sanityCollectionQuery, {
      handle: params.collectionSlug,
    }),

    requestShopData(),
  ])

  // const collection = collectionResponse?.length
  //   ? collectionResponse[0]
  //   : undefined

  return {
    props: {
      shopData,
      collection: collections[0] || null,
    },
    unstable_revalidate: 60,
  }
}

/**
 * Static Routes
 */

// const collectionHandlesQuery = gql`
//   query CollectionHandlesQuery {
//     allShopifyCollection {
//       _id
//       shopifyId
//       handle
//     }
//   }
// `

export const getStaticPaths: GetStaticPaths = async () => {
  // const result = await request<CollectionResponse>(collectionHandlesQuery)
  // const collections = definitely(result?.allShopifyCollection)
  // const paths = collections.map((collection) => ({
  //   params: {
  //     collectionSlug: collection.handle ? collection.handle : undefined,
  //   },
  // }))

  return {
    paths: [],
    fallback: true,
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}

export default Collection
