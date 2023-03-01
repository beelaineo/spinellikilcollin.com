/* eslint-disable import/no-named-as-default */
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import {
  ShopifyStorefrontCountryCode,
  ShopifyStorefrontProduct,
} from '../../types/generated-shopify'
import { config } from '../../config'

const { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } = config

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

export interface ProductQueryInput {
  id: string
  countryCode: ShopifyStorefrontCountryCode
}

export interface ProductQueryDataResponse {
  data: {
    product: ShopifyStorefrontProduct
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
  const result = await fetch(SHOPIFY_STOREFRONT_URL, {
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
