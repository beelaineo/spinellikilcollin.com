import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ShopifyProduct } from '../../src/types'
import { getParam, definitely } from '../../src/utils'
import { NotFound, ProductDetail } from '../../src/views'
import {
  productInfoFragment,
  imageTextBlockFragment,
  carouselFragment,
  shopifySourceProductVariantFragment,
  sanityImageFragment,
  richImageFragment,
  shopifySourceProductFragment,
  shopifySourceImageFragment,
  seoFragment,
  request,
} from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'
import { Sentry } from '../../src/services/sentry'
import { useRefetch } from '../../src/hooks'

const productQueryInner = `
  __typename
  _id
  _key
  shopifyId
  title
  handle
  archived
  hideFromSearch
  inquiryOnly
  minVariantPrice
  maxVariantPrice
  initialVariantSelections
  sourceData {
    ...ShopifySourceProductFragment
  }
  collections {
    __typename
    _id
    _key
    title
    handle
    shopifyId
  }
  options {
    __typename
    _key
    _type
    shopifyOptionId
    name
    values {
      __typename
      _key
      _type
      value
      descriptionRaw
      swatch {
        ...SanityImageFragment
      }
    }
  }
  variants {
    __typename
    _key
    _type
    shopifyVariantID
    title
    sourceData {
      ...ShopifySourceProductVariantFragment
    }
  }
  info {
    ...ProductInfoFragment
  }
  contentAfter {
    ...ImageTextBlockFragment
  }
  gallery {
    ...RichImageFragment
  }
  related {
    ...CarouselFragment
  }
  seo {
    ...SEOFragment
  }
`

const productQueryById = gql`
  query ShopifyProductQuery($id: ID!) {
    ShopifyProduct(id: $id) {
      ${productQueryInner}
    }
  }
  ${shopifySourceProductFragment}
  ${shopifySourceProductVariantFragment}
  ${shopifySourceImageFragment}
  ${sanityImageFragment}
  ${richImageFragment}
  ${productInfoFragment}
  ${carouselFragment}
  ${imageTextBlockFragment}
  ${seoFragment}
`

const productQueryByHandle = gql`
  query ProductsPageQuery($handle: String) {
    allShopifyProduct(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
      ${productQueryInner}
    }
  }
  ${shopifySourceProductFragment}
  ${shopifySourceProductVariantFragment}
  ${shopifySourceImageFragment}
  ${sanityImageFragment}
  ${richImageFragment}
  ${productInfoFragment}
  ${carouselFragment}
  ${imageTextBlockFragment}
  ${seoFragment}
`

interface Response {
  allShopifyProduct: ShopifyProduct[]
  ShopifyProduct: ShopifyProduct
}

interface ProductPageProps {
  product: ShopifyProduct
}

const getProductFromResponse = (response: Response) => {
  const products = response?.allShopifyProduct
  const product = products && products.length ? products[0] : null
  return product
}

const getProductFromPreviewResponse = (response: Response) => {
  const product = response?.ShopifyProduct
  return product
}

const Product = ({ product }: ProductPageProps) => {
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null
  const token = params?.get('preview')
  const preview = Boolean(params?.get('preview'))

  try {
    if (preview === true) {
      if (!product) return <NotFound />
      const refetchConfig = {
        listenQuery: `*[_type == "shopifyProduct" && _id == $id]`,
        listenQueryParams: { id: 'drafts.' + product._id },
        refetchQuery: productQueryById,
        refetchQueryParams: { id: 'drafts.' + product._id },
        parseResponse: getProductFromPreviewResponse,
        enabled: preview,
        token: token,
      }
      const data = useRefetch<ShopifyProduct, Response>(product, refetchConfig)

      if (!data) return <NotFound />
      return <ProductDetail key={data._id || 'some-key'} product={data} />
    } else {
      if (!product) return <NotFound />
      return <ProductDetail key={product._id || 'some-key'} product={product} />
    }
  } catch (e) {
    Sentry.captureException(e)
    return <NotFound />
  }
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const { params } = ctx
    if (!params?.productSlug) return { props: { product: undefined } }
    const handle = getParam(params.productSlug)
    const variables = { handle }

    const [response, shopData] = await Promise.all([
      request<Response>(productQueryByHandle, variables),
      requestShopData(),
    ])

    const product = getProductFromResponse(response)

    return { props: { product, shopData }, revalidate: 60 }
  } catch (e) {
    Sentry.captureException(e)
    return { props: {}, revalidate: 1 }
  }
}

/**
 * Static Paths
 */

const pageHandlesQuery = gql`
  query ProductHandlesQuery {
    allShopifyProduct {
      _id
      _updatedAt
      shopifyId
      handle
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const result = await request<Response>(pageHandlesQuery)
    const products = definitely(result?.allShopifyProduct)
    const paths = products.map((product) => ({
      params: {
        productSlug: product.handle ? product.handle : undefined,
        updatedAt: product?._updatedAt?.toString(),
      },
    }))

    return {
      paths,
      fallback: true,
    }
  } catch (e) {
    Sentry.captureException(e)
    return { paths: [], fallback: true }
  }
}

export default Product
