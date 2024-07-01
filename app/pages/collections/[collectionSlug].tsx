import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Maybe, Collection, Product } from '../../src/types'
import { sanityQuery } from '../../src/services/sanity'
import { NotFound, ProductListing } from '../../src/views'
import {
  richImageFragment,
  shopifyCollectionDefFragment,
  productFragment,
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
import { keepAliveDropCache, withKeepAlive } from 'react-next-keep-alive'
import { usePrevious } from 'react-use'

const collectionQueryById = gql`
  query CollectionQuery($id: ID!) {
    Collection(id: $id) {
      __typename
      _id
      _key
      _rev
      shopifyId
      title
      handle
      archived
      store {
        ...ShopifyCollectionDefFragment
      }
      products {
        ...ProductFragment
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
      seo {
        ...SeoFragment
      }
    }
  }
  ${shopifyCollectionDefFragment}
  ${productFragment}
  ${customFilterFragment}
  ${heroFragment}
  ${collectionBlockFragment}
  ${richImageFragment}
  ${seoFragment}
  ${carouselFragment}
  ${imageTextBlockFragment}
  ${textBlockFragment}
`
interface ProductListingProduct extends Product {
  filterData: {
    inStock: boolean
    metal: string[]
    stone: string[]
    style: string[]
    subcategory: string[]
    sizes: (string | undefined)[]
  }
}

interface ProductListingCollection extends Collection {
  products?: Maybe<Maybe<ProductListingProduct>[]> | undefined
}

export interface CollectionResult {
  Collection: ProductListingCollection
}

interface CollectionResponse {
  allCollection: ProductListingCollection[]
}

interface CollectionPageProps {
  collection: ProductListingCollection
  useEffect: any
  isHiddenByKeepAlive: boolean
}

interface Response {
  Collection: ProductListingCollection
}

const getCollectionFromPreviewResponse = (response: Response) => {
  const collection = response?.Collection
  return collection
}

const CollectionPage = ({
  collection,
  useEffect,
  isHiddenByKeepAlive,
}: CollectionPageProps) => {
  const router = useRouter()

  const { query, isReady } = router

  const token = query?.preview
  const preview = Boolean(query?.preview)

  const [collectionState, setCollectionState] = React.useState<
    string | string[]
  >('')

  const prevCollection = usePrevious(collectionState)

  useEffect(() => {
    query.collectionSlug && setCollectionState(query.collectionSlug)
  }, [query])

  useEffect(() => {
    if (!collectionState || !collectionState.length) return

    const compareState =
      !prevCollection || !prevCollection.length
        ? collectionState
        : prevCollection

    if (collectionState !== compareState) {
      keepAliveDropCache('collection-page', true)
    }
  }, [collectionState, prevCollection])

  const refetchConfig = {
    listenQuery: `*[_type == "collection" && _id == $id]`,
    listenQueryParams: { id: 'drafts.' + collection?._id },
    refetchQuery: collectionQueryById,
    refetchQueryParams: { id: 'drafts.' + collection?._id },
    parseResponse: getCollectionFromPreviewResponse,
    enabled: preview,
    token: token,
  }

  const data = useRefetch<ProductListingCollection, Response>(
    collection,
    refetchConfig,
  )

  try {
    if (preview === true) {
      if (!collection) return <NotFound />
      console.log('preview data', data)
      if (!data)
        return (
          <ProductListing
            key={collection._id || 'some-key'}
            collection={collection}
            isHiddenByKeepAlive={isHiddenByKeepAlive}
          />
        )
      return (
        <ProductListing
          key={data._id || 'some-key'}
          collection={data}
          isHiddenByKeepAlive={isHiddenByKeepAlive}
        />
      )
    } else {
      if (!collection) return <NotFound />
      return (
        <ProductListing
          key={collection._id || 'some-key'}
          collection={collection}
          isHiddenByKeepAlive={isHiddenByKeepAlive}
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
    sanityQuery<Collection[]>(createSanityCollectionQuery(), {
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
  }
}

/**
 * Static Routes
 */

const collectionHandlesQuery = gql`
  query CollectionHandlesQuery {
    allCollection {
      _id
      _updatedAt
      shopifyId
      handle
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't pre-render pages
  // if (process.env.SKIP_BUILD_STATIC_GENERATION) {
  //   return {
  //     paths: [],
  //     fallback: 'blocking',
  //   }
  // }

  const result = await request<CollectionResponse>(collectionHandlesQuery)
  const collections = definitely(result?.allCollection)
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

export default withKeepAlive(
  //@ts-ignore
  CollectionPage,
  'collection-page',
  { keepScrollEnabled: false },
)
