import gql from 'graphql-tag'
import { ShopifyProduct } from '../../types'
import {
  imageTextBlockFragment,
  shopifyProductFragment,
  productInfoFragment,
  shopifyImageFragment,
  carouselFragment,
} from '../../graphql/fragments'

export const PRODUCT_QUERY = gql`
  query ProductQuery($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      tags
      productType
      collections(first: 5) {
        edges {
          node {
            title
            products(first: 8) {
              edges {
                cursor
                node {
                  id
                  title
                  handle
                  images(first: 2) {
                    edges {
                      cursor
                      node {
                        id
                        altText
                        originalSrc
                      }
                    }
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
                }
              }
            }
          }
        }
      }
      images(first: 50) {
        edges {
          node {
            id
            altText
            originalSrc
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            sku
            title
            image {
              id
              altText
              originalSrc
            }
          }
        }
      }
    }

    allShopifyProducts(where: { handle: $handle }) {
      ...ShopifyProductFragment
      related {
        ...CarouselFragment
      }
    }
  }
  ${productInfoFragment}
  ${shopifyProductFragment}
  ${imageTextBlockFragment}
  ${carouselFragment}
`

export interface ProductQueryResult {
  productByHandle: Product | void
  allShopifyProducts: [ShopifyProduct]
}
