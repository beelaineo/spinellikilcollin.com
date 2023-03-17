/* eslint-disable import/no-named-as-default */
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import {
  ShopifyStorefrontCollection,
  ShopifyStorefrontCountryCode,
  ShopifyStorefrontProduct,
} from '../../types/generated-shopify'
import { config } from '../../config'

const {
  NEW_SHOPIFY_STOREFRONT_URL,
  SHOPIFY_STOREFRONT_URL,
  SHOPIFY_STOREFRONT_TOKEN,
} = config

const deduplicateFragments = (queryString?: string) =>
  queryString
    ? queryString
        .split(/\n\s+\n/)
        .map((group) => group.replace(/^([\n\s])+/, '').replace(/\n+$/, ''))
        .reduce<string[]>((acc, current) => {
          if (acc.includes(current)) return acc
          return [...acc, current]
        }, [])
        .join('\n\n')
    : ''

export const PRODUCT_VARIANT_PRICES_QUERY = /* GraphQL */ gql`
  query GetProductVariantPricesById($id: ID!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    product(id: $id) {
      title
      variants(first: 100) {
        __typename
        edges {
          __typename
          node {
            __typename
            availableForSale
            currentlyNotInStock
            id
            sku
            title
            compareAtPriceV2 {
              amount
              currencyCode
            }
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export const PRODUCT_PRICERANGE_QUERY = /* GraphQL */ gql`
  query GetProductPriceRangeById($id: ID!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    product(id: $id) {
      title
      compareAtPriceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`

export const PRODUCT_VARIANT_PRICES_FROM_ARRAY_QUERY = /* GraphQL */ gql`
  query getProductVariantPricesByIdArray(
    $ids: [ID!]!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    nodes(ids: $ids) {
      ... on Product {
        title
        variants(first: 100) {
          __typename
          edges {
            __typename
            node {
              __typename
              availableForSale
              currentlyNotInStock
              id
              sku
              title
              compareAtPriceV2 {
                amount
                currencyCode
              }
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`

export const COLLECTION_VARIANT_PRICES_QUERY = /* GraphQL */ gql`
  query localizedCollectionByHandle(
    $handle: String!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    collection(handle: $handle) {
      products(first: 250) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            variants(first: 100) {
              edges {
                node {
                  title
                  id
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  priceV2 {
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
  }
`

export interface ProductQueryInput {
  id: string
  countryCode: ShopifyStorefrontCountryCode
}

export interface ProductQueryDataResponse {
  data: {
    product: ShopifyStorefrontProduct
  }
}

export interface ProductArrayQueryDataResponse {
  data: {
    nodes: ShopifyStorefrontProduct[]
  }
}

export interface CollectionQueryDataResponse {
  data: {
    collection: ShopifyStorefrontCollection
  }
}

async function shopifyQuery<Response>(
  query: string | DocumentNode,
  variables?: Record<string, unknown>,
): Promise<Response> {
  const queryString =
    typeof query === 'string'
      ? query
      : deduplicateFragments(query?.loc?.source.body)
  const result = await fetch(NEW_SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: queryString, variables }),
  }).then((r) => r.json())
  return result
}

export const requestShopifyProductVariantPrices = async (
  variables?: Record<string, unknown>,
) => {
  const response = await shopifyQuery<ProductQueryDataResponse>(
    PRODUCT_VARIANT_PRICES_QUERY,
    variables,
  )
  const { product } = response.data
  console.log('fetch function results', response)
  return product
}

export const requestShopifyProductVariantPricesFromArray = async (
  variables?: Record<string, unknown>,
) => {
  const response = await shopifyQuery<ProductArrayQueryDataResponse>(
    PRODUCT_VARIANT_PRICES_FROM_ARRAY_QUERY,
    variables,
  )
  const { nodes } = response.data
  console.log('fetch function results array', response)
  return nodes
}

export const requestShopifyProductPriceRange = async (
  variables?: Record<string, unknown>,
) => {
  const response = await shopifyQuery<ProductQueryDataResponse>(
    PRODUCT_PRICERANGE_QUERY,
    variables,
  )
  const { product } = response.data
  return product
}

export const requestShopifyCollectionProductsVariantPrices = async (
  variables?: Record<string, unknown>,
) => {
  const response = await shopifyQuery<CollectionQueryDataResponse>(
    COLLECTION_VARIANT_PRICES_QUERY,
    variables,
  )
  console.log('fetch function results', response)
  const { collection } = response.data
  return collection
}
