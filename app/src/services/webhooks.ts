import { createNextWebhooks } from '@sane-shopify/server'
import { config } from '../config'
import { Sentry } from './sentry'

const {
  SANITY_PROJECT_ID: projectId,
  SANITY_DATASET: dataset,
  SANITY_READ_TOKEN: authToken,
  SHOPIFY_SHOP_NAME: shopName,
  SHOPIFY_STOREFRONT_TOKEN: accessToken,
} = config

if (!projectId) throw new Error('You must provide a sanity project ID')
if (!dataset) throw new Error('You must provide a sanity dataset')
if (!authToken) throw new Error('You must provide a sanity auth token')
if (!shopName) throw new Error('You must provide a shopify shop name')
if (!accessToken) throw new Error('You must provide a shopify access token')

const handleError = (err: Error) => {
  Sentry.captureException(err)
}

const webhookConfig = {
  secrets: {
    sanity: {
      projectId,
      dataset,
      authToken,
    },
    shopify: {
      shopName,
      accessToken,
    },
  },
  onError: handleError,
}

export const webhooks = createNextWebhooks(webhookConfig)
