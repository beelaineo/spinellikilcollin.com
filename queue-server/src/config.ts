import dotenv from 'dotenv'
dotenv.config()

const REDIS_URL = process.env.REDIS_URL
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_AUTH_TOKEN = process.env.SANITY_AUTH_TOKEN
const SHOPIFY_SHOP_NAME = process.env.SHOPIFY_SHOP_NAME
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN
const SENTRY_DSN = process.env.SENTRY_DSN

if (!SANITY_PROJECT_ID || typeof SANITY_PROJECT_ID !== 'string') {
  throw new Error(`You must provide a ${SANITY_PROJECT_ID}`)
}
if (!SANITY_DATASET || typeof SANITY_DATASET !== 'string') {
  throw new Error(`You must provide a ${SANITY_DATASET}`)
}
if (!SANITY_AUTH_TOKEN || typeof SANITY_AUTH_TOKEN !== 'string') {
  throw new Error(`You must provide a ${SANITY_AUTH_TOKEN}`)
}
if (!SHOPIFY_SHOP_NAME || typeof SHOPIFY_SHOP_NAME !== 'string') {
  throw new Error(`You must provide a ${SHOPIFY_SHOP_NAME}`)
}
if (!SHOPIFY_STOREFRONT_TOKEN || typeof SHOPIFY_STOREFRONT_TOKEN !== 'string') {
  throw new Error(`You must provide a ${SHOPIFY_STOREFRONT_TOKEN}`)
}
if (!SENTRY_DSN || typeof SENTRY_DSN !== 'string') {
  throw new Error(`You must provide a ${SENTRY_DSN}`)
}

export const config = {
  REDIS_URL,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_AUTH_TOKEN,
  SHOPIFY_SHOP_NAME,
  SHOPIFY_STOREFRONT_TOKEN,
  SENTRY_DSN,
}
