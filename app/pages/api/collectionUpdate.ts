import type { SanityClient } from '@sanity/client'
import { v5 as uuidv5 } from 'uuid'

import {
  buildCollectionDocumentId,
  commitCollectionDocument,
} from './sanityOps'

import type { ShopifyDocumentCollection } from './storageTypes'
import {
  SHOPIFY_COLLECTION_DOCUMENT_TYPE,
  UUID_NAMESPACE_COLLECTIONS,
} from './constants'
import { DataSinkCollection } from './requestTypes'
import { idFromGid } from './requestHelpers'

export async function handleCollectionUpdate(
  client: SanityClient,
  collection: DataSinkCollection,
): Promise<{
  collectionDocument: ShopifyDocumentCollection
}> {
  const { handle, id, image, rules, sortOrder } = collection

  const sortOrderUpper = (sortOrder?.toUpperCase() || 'unknown').replace(
    '-',
    '_',
  )

  const shopifyId = idFromGid(collection.id)
  const collectionDocument: ShopifyDocumentCollection = {
    _id: buildCollectionDocumentId(shopifyId), // Shopify product ID
    _type: SHOPIFY_COLLECTION_DOCUMENT_TYPE,
    store: {
      ...collection,
      id: shopifyId,
      gid: id,
      isDeleted: false,
      imageUrl: image?.src,
      rules: rules?.map((rule) => ({
        _key: uuidv5(
          `shopify-collection-${collection.id}-${rule.column}-${rule.condition}-${rule.relation}`,
          UUID_NAMESPACE_COLLECTIONS,
        ),
        _type: 'object',
        column: rule.column?.toUpperCase() as Uppercase<string>,
        condition: rule.condition,
        relation: rule.relation?.toUpperCase() as Uppercase<string>,
      })),
      sortOrder: sortOrderUpper,
      slug: {
        _type: 'slug',
        current: handle,
      },
    },
  }

  await commitCollectionDocument(client, collectionDocument)

  return { collectionDocument }
}
