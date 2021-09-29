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

const productQuery = gql`
  query ProductsPageQuery($handle: String) {
    allShopifyProduct(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
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
}

interface ProductPageProps {
  product: ShopifyProduct
  preview: boolean
}

const getProductFromResponse = (response: Response) => {
  const products = response?.allShopifyProduct

  const product = products && products.length ? products[0] : null
  return product
}

const Product = ({ product, preview }: ProductPageProps) => {
  const data = useRefetch<ShopifyProduct, Response>(product, {
    query: productQuery,
    queryParams: { handle: product.handle },
    listenQuery: `*[_type == "shopifyProduct" && _id == $id]`,
    listenQueryParams: { id: product._id },
    parseResponse: getProductFromResponse,
    enabled: preview,
  })
  try {
    if (!data) return <NotFound />
    return <ProductDetail key={data._id || 'some-key'} product={data} />
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
    /** This is wrong, i forget how to get a query param like ?preview=abc in getStaticProps..
     *  GetStaticProps may not support it... in which case you could parse the window.location
     *  in the Product component above */
    // const { params, queryParams } = ctx
    const { params } = ctx
    // const preview = Boolean(queryParams?.preview)
    const preview = true
    if (!params?.productSlug) return { props: { product: undefined } }
    const handle = getParam(params.productSlug)
    const variables = { handle }

    const [response, shopData] = await Promise.all([
      request<Response>(productQuery, variables),
      requestShopData(),
    ])

    const product = getProductFromResponse(response)

    return { props: { product, shopData, preview }, revalidate: 60 }
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
