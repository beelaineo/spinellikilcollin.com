import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { ShopifyCollection } from '../../src/types'
import { sanityQuery } from '../../src/services/sanity'
import { NotFound, ProductListing } from '../../src/views'
import {
  richImageFragment,
  shopifySourceCollectionFragment,
  shopifyProductFragment,
  customFilterFragment,
  heroFragment,
  collectionBlockFragment,
  seoFragment,
  request,
} from '../../src/graphql'
import { getParam, definitely } from '../../src/utils'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'
import { createSanityCollectionQuery } from '../../src/views/ProductListing'
import { useRefetch } from '../../src/hooks'

const collectionQueryById = gql`
  query ShopifyCollectionQuery($id: ID!) {
    ShopifyCollection(id: $id) {
      __typename
      _id
      _key
      _rev
      shopifyId
      title
      handle
      archived
      sourceData {
        ...ShopifySourceCollectionFragment
      }
      products {
        ...ShopifyProductFragment
      }
      hidden
      reduceColumnCount
      lightTheme
      customFilter {
        ...CustomFilterFragment
      }
      hideFilter
      overrideDefaultFilter
      hero {
        ...HeroFragment
      }
      collectionBlocks {
        ...CollectionBlockFragment
      }
      descriptionRaw
      preferredVariantMatches
      bambuser {
        _key
        __typename
        slug
        liveSettings {
          _key
          __typename
          startDate
          endDate
          liveCTALabel
        }
      }
      seo {
        ...SEOFragment
      }
    }
  }
  ${shopifySourceCollectionFragment}
  ${shopifyProductFragment}
  ${customFilterFragment}
  ${heroFragment}
  ${collectionBlockFragment}
  ${richImageFragment}
  ${seoFragment}
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

interface Response {
  ShopifyCollection: ShopifyCollection
}

const getCollectionFromPreviewResponse = (response: Response) => {
  const collection = response?.ShopifyCollection
  return collection
}

const Collection = ({ collection }: CollectionPageProps) => {
  const { query } = useRouter()
  console.log('router query', query)
  console.log('collectionSlug query', query)
  const page = query?.page
  const inStock = query?.instock === 'true' ? true : false
  const token = query?.preview
  const preview = Boolean(query?.preview)

  try {
    if (preview === true) {
      if (!collection) return <NotFound />
      const refetchConfig = {
        listenQuery: `*[_type == "shopifyCollection" && _id == $id]`,
        listenQueryParams: { id: 'drafts.' + collection._id },
        refetchQuery: collectionQueryById,
        refetchQueryParams: { id: 'drafts.' + collection._id },
        parseResponse: getCollectionFromPreviewResponse,
        enabled: preview,
        token: token,
      }

      const data = useRefetch<ShopifyCollection, Response>(
        collection,
        refetchConfig,
      )

      if (!data)
        return (
          <ProductListing
            key={collection._id || 'some-key'}
            collection={collection}
            inStockFilter={inStock}
          />
        )
      return (
        <ProductListing
          key={data._id || 'some-key'}
          collection={data}
          inStockFilter={inStock}
        />
      )
    } else {
      if (!collection) return <NotFound />
      // console.log('inStock', inStock)
      return (
        <ProductListing
          key={collection._id || 'some-key'}
          collection={collection}
          inStockFilter={inStock}
        />
      )
    }
  } catch (e) {
    return <NotFound />
  }
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.collectionSlug)
    return { props: { products: undefined, collection: undefined } }
  const handle = getParam(params.collectionSlug)
  const responses = await Promise.all([
    sanityQuery<ShopifyCollection[]>(createSanityCollectionQuery(), {
      handle,
      productStart: 0,
      productEnd: 13,
      sort: null,
    }),

    requestShopData(),
  ])

  const [collections, shopData] = responses

  return {
    props: {
      shopData,
      params,
      collection: collections[0] || null,
    },
    revalidate: 60,
  }
}

/**
 * Static Routes
 */

const collectionHandlesQuery = gql`
  query CollectionHandlesQuery {
    allShopifyCollection {
      _id
      _updatedAt
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
      updatedAt: collection?._updatedAt?.toString(),
    },
  }))

  return {
    paths: paths,
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
