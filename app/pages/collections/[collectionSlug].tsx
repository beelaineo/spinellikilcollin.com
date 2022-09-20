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
  carouselFragment,
  imageTextBlockFragment,
  textBlockFragment,
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
      footer {
        ... on Carousel {
          __typename
          ...CarouselFragment
        }
        ... on ImageTextBlock {
          __typename
          ...ImageTextBlockFragment
        }
        ... on TextBlock {
          __typename
          ...TextBlockFragment
        }
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
  ${carouselFragment}
  ${imageTextBlockFragment}
  ${textBlockFragment}
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
  const token = query?.preview
  const preview = Boolean(query?.preview)
  console.log('collectionSlug collection', collection)
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
          />
        )
      return <ProductListing key={data._id || 'some-key'} collection={data} />
    } else {
      if (!collection) return <NotFound />
      return (
        <ProductListing
          key={collection._id || 'some-key'}
          collection={collection}
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
