import * as React from 'react'
import gql from 'graphql-tag'
import { ShopifyProduct } from '../../src/types'
import { NotFound, ProductDetail } from '../../src/views'
import {
  productInfoFragment,
  imageTextBlockFragment,
  carouselFragment,
  shopifySourceProductVariantFragment,
  sanityImageFragment,
  richImageFragment,
  shopifySourceImageFragment,
} from '../../src/graphql'
import { PageContext } from '../_app'

interface ProductQueryResult {
  productByHandle: ShopifyProduct
  allShopifyProducts: [ShopifyProduct]
}

interface ProductProps {
  productData: ShopifyProduct
}

const productQuery = gql`
  query ProductsPageQuery($handle: String) {
    allShopifyProduct(where: { handle: { eq: $handle } }) {
      _id
      _key
      shopifyId
      title
      handle
      sourceData {
        id
        title
        handle
        tags
        productType
        description
        descriptionHtml
        options {
          _key
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants {
          edges {
            cursor
            node {
              ...ShopifySourceProductVariantFragment
            }
          }
        }
        images {
          edges {
            cursor
            node {
              ...ShopifySourceImageFragment
            }
          }
        }
      }
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
          gallery {
            ...RichImageFragment
          }
        }
      }
      variants {
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
  return <ProductDetail product={product} />
}

Product.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient, query } = ctx
  const variables = { handle: query.productSlug }
  const response = await apolloClient.query<Response>({
    query: productQuery,
    variables,
  })
  const products = response?.data?.allShopifyProduct

  const product = products.length ? products[0] : undefined
  return { product }
}

export default Product
