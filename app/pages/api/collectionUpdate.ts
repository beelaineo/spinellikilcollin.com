import type { SanityClient } from '@sanity/client'
import { v5 as uuidv5 } from 'uuid'

import {
  buildCollectionDocumentId,
  buildProductDocumentId,
  commitCollectionDocument,
} from './sanityOps'

import type {
  ShopifyDocumentCollection,
  ShopifyDocumentProduct,
} from './storageTypes'

import {
  SHOPIFY_COLLECTION_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  UUID_NAMESPACE_COLLECTIONS,
  UUID_NAMESPACE_PRODUCTS,
} from './constants'
import { DataSinkCollection } from './requestTypes'
import { idFromGid } from './requestHelpers'
import { Maybe } from '../../src/types'
import { shopifyQuery } from '../../src/providers/AllProviders'

interface SanityReference {
  _key: string
  _ref: string
  _type: 'reference'
  _weak: boolean
}
interface ProductRef {
  id: string
  handle: string
  title: string
}
interface CollectionProductsNode {
  id: string
  products: {
    edges: Array<{
      node: ProductRef
      cursor: string
    }>
    pageInfo: {
      hasNextPage: boolean
    }
  }
}

interface CollectionProductsResponse {
  collection: Maybe<CollectionProductsNode>
}
type CollectionProductsRefs = ProductRef[]

const collectionProductsQuery = `query CollectionProductsQuery($collectionId: ID!, $first: Int!, $after: String) {
  collection(id: $collectionId) {
    id
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          handle
          title
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}`

// Updated fetchCollectionProducts function to fetch all products in a collection
async function fetchCollectionProducts(
  collectionId: string,
  productsAccumulator: CollectionProductsRefs = [],
  afterCursor: string | null = null,
): Promise<CollectionProductsRefs> {
  const response = await shopifyQuery<CollectionProductsResponse>(
    collectionProductsQuery,
    {
      collectionId,
      first: 250,
      after: afterCursor,
    },
  )

  if (!response || !response.collection || !response.collection.products) {
    throw new Error('No products data returned')
  }

  // Accumulate products
  const newProducts = response.collection.products.edges.map((edge) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
  }))
  const allProducts = [...productsAccumulator, ...newProducts]

  // Check if there are more products to fetch
  if (response.collection.products.pageInfo.hasNextPage) {
    const nextCursor = response.collection.products.edges.slice(-1)[0].cursor
    return fetchCollectionProducts(collectionId, allProducts, nextCursor)
  }

  return allProducts
}

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

  // Fetch products
  const collectionProductsData = await fetchCollectionProducts(id)
  const collectionProducts: SanityReference[] = []

  if (collectionProductsData && collectionProductsData.length > 0) {
    collectionProductsData.forEach((product) => {
      collectionProducts.push({
        _key: uuidv5(product.id, UUID_NAMESPACE_PRODUCTS),
        _ref: buildProductDocumentId(idFromGid(product.id)),
        _type: 'reference',
        _weak: true,
      })
    })
  }

  const collectionDocument: ShopifyDocumentCollection = {
    _id: buildCollectionDocumentId(shopifyId), // Shopify product ID
    _type: SHOPIFY_COLLECTION_DOCUMENT_TYPE,
    handle: handle,
    products: collectionProducts,
    shopifyId: id,
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
    title: collection.title,
  }

  await commitCollectionDocument(client, collectionDocument)

  return { collectionDocument }
}
