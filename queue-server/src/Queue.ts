import Queue from 'bull'
import { createWebhooks } from '@sane-shopify/server'
import { JobData } from './types'
import { config } from './config'
import { Sentry } from './sentry'

const {
  REDIS_URL: redisUrl,
  SANITY_PROJECT_ID: projectId,
  SANITY_DATASET: dataset,
  SANITY_AUTH_TOKEN: authToken,
  SHOPIFY_SHOP_NAME: shopName,
  SHOPIFY_STOREFRONT_TOKEN: accessToken,
} = config

const handleError = (e: any) =>
  Sentry.captureException(e, { tags: { event: 'webhook-queue-error' } })

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

export const syncQueue = new Queue<JobData>('sync-queue', {
  redis: redisUrl || 'http://localhost:6379',
})

const webhooks = createWebhooks(webhookConfig)

syncQueue.process(async (job) => {
  switch (job.data.topic) {
    case 'orders/create':
      return webhooks.onOrderCreate(job.data.item)
    case 'products/update':
      return webhooks.onProductUpdate(job.data.item)
    default:
      throw new Error(`Oops no ${job.data.topic}`)
  }
})

export const createSyncJob = async (data: JobData) => {
  return syncQueue.add(data, {
    jobId: data.webhookId,
    attempts: 3,
    /* Set a timeout of 120 seconds */
    timeout: 120 * 1000,
  })
}
