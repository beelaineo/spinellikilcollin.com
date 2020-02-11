import * as React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { ShopifyProduct } from '../../src/types'
import { NotFound, ProductDetail } from '../../src/views'
import { withApollo } from '../../src/graphql'
import {
  productInfoFragment,
  imageTextBlockFragment,
  carouselFragment,
  shopifySourceProductVariantFragment,
  shopifySourceImageFragment,
} from '../../src/graphql'

interface ProductQueryResult {
  productByHandle: ShopifyProduct
  allShopifyProducts: [ShopifyProduct]
}

interface ProductProps {
  productData: ShopifyProduct
}

function head<T>(arr: T[]): T | void {
  return arr ? arr[0] : undefined
}

const productQuery = gql`
  query ProductsPageQuery($handle: String) {
    allShopifyProducts(where: { handle: $handle }) {
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
      related {
        ...CarouselFragment
      }
    }
  }
  ${shopifySourceProductVariantFragment}
  ${shopifySourceImageFragment}
  ${productInfoFragment}
  ${carouselFragment}
  ${imageTextBlockFragment}
`

interface ProductPageProps {
  product: ShopifyProduct
}

const Product = ({ product }: ProductPageProps) => {
  if (!product) return <NotFound />
  return <ProductDetail product={product} />
}

Product.getInitialProps = async (ctx: any) => {
  const { apolloClient, query } = ctx
  const variables = { handle: query.productSlug }
  const response = await apolloClient.query({ query: productQuery, variables })
  const products = response?.data?.allShopifyProducts
  const product = products.length ? products[0] : undefined
  return { product }
}

export default withApollo(Product)
