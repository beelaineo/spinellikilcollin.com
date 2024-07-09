import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Product } from '../../src/types'
import { getParam, definitely } from '../../src/utils'
import { NotFound, ProductDetail } from '../../src/views'
import {
  productInfoFragment,
  imageTextBlockFragment,
  carouselFragment,
  shopifySourceProductVariantFragment,
  sanityImageFragment,
  richImageFragment,
  shopifyProductDefFragment,
  seoFragment,
  stoneFragment,
  request,
} from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'
import { Sentry } from '../../src/services/sentry'
import { useRefetch } from '../../src/hooks'

const productQueryInner = `
  __typename
  _id
  _key
  _type
  _updatedAt
  archived
  collections {
    __typename
    _id
    _key
    archived
    title
    handle
    shopifyId
  }
  handle
  hidden
  hideFromSearch
  inquiryOnly
  shopifyId
  store {
    ...ShopifyProductDefFragment
  }
  title
  options {
    __typename
    _key
    _type
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
      hover_image {
        ...SanityImageFragment
      }
      animation
      contentAfter
      stone {
        ...StoneFragment
      }
    }
  }
  info {
    ...ProductInfoFragment
  }
  contentAfter {
    ...ImageTextBlockFragment
  }
  related {
    ...CarouselFragment
  }
  seo {
    ...SeoFragment
  }
`

const productQueryById = gql`
  query ProductQuery($id: ID!) {
    Product(id: $id) {
      ${productQueryInner}
    }
  }
  ${shopifyProductDefFragment}
  ${shopifySourceProductVariantFragment}
  ${sanityImageFragment}
  ${richImageFragment}
  ${productInfoFragment}
  ${carouselFragment}
  ${imageTextBlockFragment}
  ${seoFragment}
  ${stoneFragment}
`

const productQueryByHandle = gql`
  query ProductsPageQuery($handle: String) {
    allProduct(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
      ${productQueryInner}
    }
  }
  ${shopifyProductDefFragment}
  ${shopifySourceProductVariantFragment}
  ${sanityImageFragment}
  ${richImageFragment}
  ${productInfoFragment}
  ${carouselFragment}
  ${imageTextBlockFragment}
  ${seoFragment}
`

interface Response {
  allProduct: Product[]
  Product: Product
}

interface ProductPageProps {
  product: Product
}

const getProductFromResponse = (response: Response) => {
  const products = response?.allProduct
  const product = products && products.length ? products[0] : null
  return product
}

const getProductFromPreviewResponse = (response: Response) => {
  const product = response?.Product
  return product
}

const ProductPage = ({ product }: ProductPageProps) => {
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null
  const token = params?.get('preview')
  const preview = Boolean(params?.get('preview'))

  const refetchConfig = {
    listenQuery: `*[_type == "Product" && _id == $id]`,
    listenQueryParams: { id: 'drafts.' + product?._id },
    refetchQuery: productQueryById,
    refetchQueryParams: { id: 'drafts.' + product?._id },
    parseResponse: getProductFromPreviewResponse,
    enabled: preview,
    token: token,
  }
  const data = useRefetch<Product, Response>(product, refetchConfig)

  try {
    if (preview === true) {
      if (!product) return <NotFound />

      if (!data)
        return (
          <ProductDetail key={product._id || 'some-key'} product={product} />
        )
      return <ProductDetail key={data._id || 'some-key'} product={data} />
    } else {
      if (!product) return <NotFound />
      return <ProductDetail key={product._id || 'some-key'} product={product} />
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
  if (!params?.productSlug) return { props: { product: undefined } }
  const handle = getParam(params.productSlug)
  const variables = { handle }

  try {
    const [response, shopData] = await Promise.all([
      request<Response>(productQueryByHandle, variables),
      requestShopData(),
    ])

    const product = getProductFromResponse(response)

    return { props: { product, shopData } }
  } catch (e) {
    Sentry.captureException(e, 'next_static_props_error', {
      route: 'products/[productSlug]',
      handle,
    })
    return { props: {} }
  }
}

/**
 * Static Paths
 */

const pageHandlesQuery = gql`
  query ProductHandlesQuery {
    allProduct {
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

  try {
    const result = await request<Response>(pageHandlesQuery)
    const products = result.allProduct

    const paths = products
      .filter((product) => product.handle)
      .map((product) => ({
        params: { productSlug: product.handle ?? undefined },
      }))

    return {
      paths,
      fallback: true,
    }
  } catch (e) {
    Sentry.captureException(e, 'next_static_paths_error', {
      route: 'products/[productSlug]',
    })
    return { paths: [], fallback: true }
  }
}

export default ProductPage
