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
  shopifyCollectionFragment,
  shopifySourceProductFragment,
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
    allShopifyProduct(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
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
        ...ShopifyCollectionFragment
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
  ${shopifySourceProductFragment}
  ${shopifySourceProductVariantFragment}
  ${shopifySourceImageFragment}
  ${shopifyCollectionFragment}
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
