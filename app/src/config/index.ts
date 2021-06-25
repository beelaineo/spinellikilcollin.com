import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const { POSTMARK_KEY, ALGOLIA_ADMIN_KEY } = serverRuntimeConfig
const {
  EXCHANGE_RATE_API_KEY,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_READ_TOKEN,
  SHOPIFY_SHOP_NAME,
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_KEY,
  SENTRY_DSN,
  STOREFRONT_ENV,
  SHOPIFY_CHECKOUT_DOMAIN,
  FB_PIXEL_ID,
  FB_PRDOUCT_CATALOG_ID,
  BAMBUSER_SCRIPT,
  BAMBUSER_SHOWID,
  BAMBUSER_SLUG,
  BAMBUSER_AUTOPLAY,
} = publicRuntimeConfig

const ALGOLIA_API_KEY =
  typeof window === 'undefined' ? ALGOLIA_ADMIN_KEY : ALGOLIA_SEARCH_KEY

if (typeof window !== 'undefined' && ALGOLIA_ADMIN_KEY) {
  throw new Error('You must not provide the browser with the algolia admin key')
}
if (typeof window !== 'undefined' && POSTMARK_KEY) {
  throw new Error('You must not provide the browser with the postmark key')
}

if (!SANITY_PROJECT_ID)
  throw new Error('You must include a SANITY_PROJECT_ID variable')
if (!SANITY_DATASET)
  throw new Error('You must include a SANITY_DATASET variable')
if (!ALGOLIA_API_KEY) throw new Error('You must provide an algolia API Key')
if (!ALGOLIA_APP_ID) throw new Error('You must provide an algolia app ID')
if (!SENTRY_DSN) throw new Error('You must provide a sentry DSN')
if (!STOREFRONT_ENV) throw new Error('You must provide a storefront ENV')
if (!SHOPIFY_CHECKOUT_DOMAIN)
  throw new Error('You must provide a storefront checkout domain')
if (!FB_PIXEL_ID) throw new Error('You must provide a facbook pixel id')
if (!FB_PRDOUCT_CATALOG_ID)
  throw new Error('You must provide a facbook product catalog id')

if (!EXCHANGE_RATE_API_KEY)
  throw new Error('You must include a EXCHANGE_RATE_API_KEY variable')

if (!BAMBUSER_SCRIPT)
  throw new Error('You must provide a Bambuser API script url')

if (!BAMBUSER_SHOWID) throw new Error('You must provide a Bambuser show ID')

const SHOPIFY_STOREFRONT_TOKEN = '0d3e3d2a74d125f799cd78a72e6c0000'
const SHOPIFY_STOREFRONT_URL =
  'https://spinellikilcollin.myshopify.com/api/graphql'
const SANITY_GRAPHQL_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${SANITY_DATASET}/default`

export const config = {
  EXCHANGE_RATE_API_KEY,
  ALGOLIA_API_KEY,
  ALGOLIA_APP_ID,
  STOREFRONT_ENV,
  SHOPIFY_STOREFRONT_TOKEN,
  SHOPIFY_STOREFRONT_URL,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_READ_TOKEN,
  SANITY_GRAPHQL_URL,
  SHOPIFY_SHOP_NAME,
  POSTMARK_KEY,
  SENTRY_DSN,
  SHOPIFY_CHECKOUT_DOMAIN,
  FB_PIXEL_ID,
  FB_PRDOUCT_CATALOG_ID,
  BAMBUSER_SCRIPT,
  BAMBUSER_SHOWID,
  BAMBUSER_SLUG,
  BAMBUSER_AUTOPLAY,
}
