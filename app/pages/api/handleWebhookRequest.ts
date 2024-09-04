import { createClient } from '@sanity/client'
import {
  RequestBody,
  RequestAction,
  ShopifyGraphQLProduct,
  ShopifyGraphQLCollection,
} from './webhookRequestTypes'
import { handleWebhookProductUpdate } from './webhookProductUpdate'
import { handleWebhookCollectionUpdate } from './webhookCollectionUpdate'

import {
  deleteCollectionDocuments,
  deleteProductDocuments,
} from './webhookSanityOps'

const sanityClient = createClient({
  apiVersion: '2024-01-01',
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

export async function handle(body: RequestBody, action: RequestAction) {
  // if (['create', 'update'].includes(body.action) && 'products' in body) {
  //   for (const product of body.products) {
  //     await handleProductUpdate(sanityClient, product)
  //   }
  // } else if (body.action === 'delete' && 'productIds' in body) {
  //   for (const productId of body.productIds) {
  //     await deleteProductDocuments(sanityClient, productId)
  //   }
  // } else if (
  //   ['create', 'update'].includes(body.action) &&
  //   'collections' in body
  // ) {
  //   for (const collection of body.collections) {
  //     await handleCollectionUpdate(sanityClient, collection)
  //   }
  // } else if (body.action === 'delete' && 'collectionIds' in body) {
  //   for (const collectionId of body.collectionIds) {
  //     await deleteCollectionDocuments(sanityClient, collectionId)
  //   }
  // }
  if (action === 'productCreate' || action === 'productUpdate') {
    await handleWebhookProductUpdate(
      sanityClient,
      body as ShopifyGraphQLProduct,
    )
  } else if (action === 'productDelete') {
    await deleteProductDocuments(sanityClient, body.id)
  } else if (action === 'collectionCreate' || action === 'collectionUpdate') {
    await handleWebhookCollectionUpdate(
      sanityClient,
      body as ShopifyGraphQLCollection,
    )
  } else if (action === 'collectionDelete') {
    await deleteCollectionDocuments(sanityClient, body.id)
  }
}
