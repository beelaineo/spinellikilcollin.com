import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ShopifyProduct } from '../../src/types'
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
} from '../../src/graphql'
import { request } from '../../src/graphql'
import { definitely } from '../../src/utils'

interface ProductQueryResult {
  productByHandle: ShopifyProduct
  allShopifyProducts: [ShopifyProduct]
}

interface ProductProps {
  productData: ShopifyProduct
}

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
`

interface Response {
  allShopifyProduct: ShopifyProduct[]
}

interface ProductPageProps {
  product: ShopifyProduct
}

const Product = ({ product }: ProductPageProps) => {
  if (!product) return <NotFound />
  return <ProductDetail key={product._id || 'some-key'} product={product} />
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params) return { props: { product: undefined } }
  const variables = { handle: params.productSlug }
  const response = await request<Response>(productQuery, variables)
  const products = response?.allShopifyProduct

  const product = products && products.length ? products[0] : null
  return { props: { product } }
}

/**
 * Static Paths
 */
const pageHandlesQuery = gql`
  query ProductHandlesQuery {
    allShopifyProduct {
      _id
      shopifyId
      handle
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await request<Response>(pageHandlesQuery)
  const products = definitely(result?.allShopifyProduct)
  const paths = products.map((product) => ({
    params: { productSlug: product.handle ? product.handle : undefined },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Product
