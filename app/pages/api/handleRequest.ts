import { createClient } from '@sanity/client'
import { RequestBody } from './requestTypes'
import { handleProductUpdate } from './productUpdate'
import { deleteCollectionDocuments, deleteProductDocuments } from './sanityOps'
import { handleCollectionUpdate } from './collectionUpdate'

const sanityClient = createClient({
  apiVersion: '2024-01-01',
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

export async function handle(body: RequestBody) {
  console.log('HANDLING REQUEST BODY:', body)
  if (['create', 'update'].includes(body.action) && 'products' in body) {
    for (const product of body.products) {
      await handleProductUpdate(sanityClient, product)
    }
  } else if (body.action === 'delete' && 'productIds' in body) {
    for (const productId of body.productIds) {
      await deleteProductDocuments(sanityClient, productId)
    }
  } else if (
    ['create', 'update'].includes(body.action) &&
    'collections' in body
  ) {
    for (const collection of body.collections) {
      await handleCollectionUpdate(sanityClient, collection)
    }
  } else if (body.action === 'delete' && 'collectionIds' in body) {
    for (const collectionId of body.collectionIds) {
      await deleteCollectionDocuments(sanityClient, collectionId)
    }
  }
}
