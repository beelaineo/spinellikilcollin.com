import { createClient } from '@sanity/client'
import { RequestBody, RequestAction } from './webhookRequestTypes'
import { handleWebhookProductUpdate } from './webhookProductUpdate'
import {
  deleteCollectionDocuments,
  deleteProductDocuments,
} from './webhookSanityOps'
import { handleCollectionUpdate } from './collectionUpdate'

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
    await handleWebhookProductUpdate(sanityClient, body)
  } else if (action === 'productDelete') {
    await deleteProductDocuments(sanityClient, body.id)
  } else if (action === 'collectionCreate' || action === 'collectionUpdate') {
    // await handleCollectionUpdate(sanityClient, body)
  } else if (action === 'collectionDelete') {
    // await deleteCollectionDocuments(sanityClient, body.id)
  }
}
