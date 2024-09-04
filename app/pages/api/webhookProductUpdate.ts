import type { SanityClient } from '@sanity/client'
import { v5 as uuidv5 } from 'uuid'
import { request } from '../../src/graphql'

import {
  buildCollectionDocumentId,
  buildProductDocumentId,
  buildProductVariantDocumentId,
  commitProductDocuments,
} from './sanityOps'
import type {
  ShopifyDocumentCollection,
  ShopifyDocumentProduct,
  ShopifyDocumentProductVariant,
} from './storageTypes'

import {
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
  UUID_NAMESPACE_PRODUCT_IMAGE,
  UUID_NAMESPACE_COLLECTIONS,
  UUID_NAMESPACE_PRODUCT_VARIANT,
  UUID_NAMESPACE_PRODUCTS,
} from './constants'
import { ShopifyGraphQLProduct } from './webhookRequestTypes'
import { idFromGid } from './requestHelpers'
import { Maybe } from '../../src/types'
import { shopifyQuery } from '../../src/providers/AllProviders'
import { deleteProductDocuments } from './webhookSanityOps'

interface SanityReference {
  _key: string
  _ref: string
  _type: 'reference'
  _weak: boolean
}

interface Metafield {
  key: string
  value: string
  namespace: string
}

interface ProductNode {
  id: string
}

interface CollectionRef {
  id: string
  handle: string
  title: string
}
interface ProductCollectionsNode {
  id: string
  collections: {
    edges: Array<{
      node: CollectionRef
    }>
  }
}

interface ProductInventoryNode {
  id: string
  title: string
  availableForSale: boolean
  priceRange: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  totalInventory: number
}

interface ProductVariantNode {
  id: string
  subcategory: Maybe<Metafield>
  metal: Maybe<Metafield>
  style: Maybe<Metafield>
  stone: Maybe<Metafield>
}

interface ProductVariantImageNode {
  id: string
  image: {
    altText: string
    height: number
    id: `gid://shopify/ProductImage/${string}`
    url: string
    width: number
  }
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

interface VariantMetafieldsResponse {
  node: Maybe<ProductVariantNode>
}
interface VariantImageResponse {
  node: Maybe<ProductVariantImageNode>
}
interface ProductCollectionsResponse {
  product: Maybe<ProductCollectionsNode>
}
type ProductCollectionRefs = CollectionRef[]

// interface ProductMetafieldsResponse {
//   node: Maybe<ProductNode>
// }

interface ProductInventoryResponse {
  product: Maybe<ProductInventoryNode>
}

const productCollectionsQuery = `
query ProductCollectionsQuery($productId: ID!) {
  product(id: $productId) {
    id
    collections(first: 99) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
}
`

const variantMetafieldsQuery = `
query VariantMetafieldsQuery($variantId: ID!) {
  node(id: $variantId) {
    id
    ... on ProductVariant {
      subcategory: metafield(namespace: "filter", key: "subcategory") {
        key
        value
        namespace
      }
      metal: metafield(namespace: "filter", key: "metal") {
        key
        value
        namespace
      }
      style: metafield(namespace: "filter", key: "style") {
        key
        value
        namespace
      }
      stone: metafield(namespace: "filter", key: "stone") {
        key
        value
        namespace
      }
      excludeFromIndication: metafield(namespace: "variant", key: "excludeFromIndication") {
        key
        value
        namespace
      }
    }
  }
}
`

const variantImageQuery = `
query VariantImageQuery($variantId: ID!) {
  node(id: $variantId) {
    id
    ... on ProductVariant {
      image {
        altText
        height
        id
        url
        width
      }
    }
  }
}
`

const productInventoryQuery = `
query ProductInventoryQuery($productId: ID!) {
  product(id: $productId) {
    id
    title
    availableForSale
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
    totalInventory
  }
}
`

// This function fetches collections for a product.
async function fetchProductCollections(
  productId: string,
): Promise<ProductCollectionRefs> {
  const response = await shopifyQuery<ProductCollectionsResponse>(
    productCollectionsQuery,
    { productId },
  )

  if (!response || !response.product || !response.product.collections) {
    throw new Error(
      `No collections data returned for product: ${response?.product?.id}`,
    )
  }

  return response.product.collections.edges.map((edge) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
  }))
}

// Fetch a collection document from Sanity by its ID
async function fetchCollectionDocument(
  client: SanityClient,
  collectionId: string,
): Promise<ShopifyDocumentCollection> {
  const query = `*[_id == $collectionId][0]`
  const params = { collectionId }
  return await client.fetch(query, params)
}

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

// Update the collection document with the new product reference
async function updateRelatedCollectionProducts(
  client: SanityClient,
  collectionId: string,
) {
  // Fetch products
  const collectionProductsData = await fetchCollectionProducts(collectionId)
  const collectionProducts: SanityReference[] = []

  const sanityId = buildCollectionDocumentId(idFromGid(collectionId))

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

  // Commit the patch to the collection document
  await client.patch(sanityId).set({ products: collectionProducts }).commit()
}

// This function fetches metafields for a product.
// async function fetchProductMetafields(
//   productId: string,
// ): Promise<ProductMetafieldsResponse> {
//   const response = await shopifyQuery<ProductMetafieldsResponse>(
//     productMetafieldsQuery,
//     {
//       productId,
//     },
//   )
//   if (!response || !response.node) {
//     throw new Error('No data returned for fetchProductMetafields response')
//   }
//   return { node: response.node }
// }

// This function fetches metafields for a variant.
async function fetchVariantMetafields(
  variantId: string,
): Promise<VariantMetafieldsResponse> {
  const response = await shopifyQuery<VariantMetafieldsResponse>(
    variantMetafieldsQuery,
    {
      variantId,
    },
  )
  if (!response || !response.node) {
    throw new Error('No data returned for fetchVariantMetafields response')
  }
  return { node: response.node }
}

// This function fetches images for a variant.
async function fetchVariantImage(
  variantId: string,
): Promise<VariantImageResponse> {
  const response = await shopifyQuery<VariantImageResponse>(variantImageQuery, {
    variantId,
  })
  if (!response || !response.node) {
    throw new Error('No data returned')
  }
  // console.log(`fetched image for ${variantId}:`, response.node.image.url)
  return { node: response.node }
}

// This function fetches inventory data for a product.
async function fetchProductInventory(
  productId: string,
): Promise<ProductInventoryResponse> {
  const response = await shopifyQuery<ProductInventoryResponse>(
    productInventoryQuery,
    {
      productId,
    },
  )
  if (!response || !response.product) {
    throw new Error('No data returned for fetchProductInventory response')
  }
  return { product: response.product }
}

export async function handleWebhookProductUpdate(
  client: SanityClient,
  product: ShopifyGraphQLProduct,
): Promise<{
  productDocument: ShopifyDocumentProduct | null
}> {
  const { handle, id, admin_graphql_api_id, images, status } = product

  // Check if the product is no longer available for sale (removed or draft status)
  if (status === 'draft' || status === 'archived') {
    console.log(`Product ${handle} is marked as ${status}, deleting...`)
    await deleteProductDocuments(client, id)
    return { productDocument: null } // Early return to stop further execution
  }

  const slugify = (text?: Maybe<string>) => {
    if (!text) return ''
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  const variants = product.variants || []
  const firstImage = images?.[0]
  const shopifyProductId = id

  // Fetch collections
  const productCollectionsData = await fetchProductCollections(
    admin_graphql_api_id,
  )
  // Fetch metafields
  // const productMetafieldsData = await fetchProductMetafields(id)

  const productInventoryData = await fetchProductInventory(admin_graphql_api_id)

  const productCollections: SanityReference[] = []
  // const productMetafields: Metafield[] = []

  if (productCollectionsData && productCollectionsData.length > 0) {
    productCollectionsData.forEach((collection) => {
      updateRelatedCollectionProducts(client, collection.id)

      productCollections.push({
        _key: uuidv5(collection.id, UUID_NAMESPACE_COLLECTIONS),
        _ref: buildCollectionDocumentId(idFromGid(collection.id)),
        _type: 'reference',
        _weak: true,
      })
    })
  }

  // if (productMetafieldsData.node?.excludeFromIndication) {
  //   productMetafields.push({
  //     key: productMetafieldsData.node.excludeFromIndication.key,
  //     namespace: 'product',
  //     value: productMetafieldsData.node.excludeFromIndication.value,
  //   })
  // }

  const availableForSale =
    productInventoryData.product?.availableForSale ?? false

  const priceRange = {
    maxVariantPrice: parseFloat(
      productInventoryData.product?.priceRange.maxVariantPrice.amount ?? '0',
    ),
    minVariantPrice: parseFloat(
      productInventoryData.product?.priceRange.minVariantPrice.amount ?? '0',
    ),
  }

  const productVariantsDocuments = await Promise.all(
    variants.map<Promise<ShopifyDocumentProductVariant>>(async (variant) => {
      const variantId = variant.id
      const metafieldsData = await fetchVariantMetafields(
        variant.admin_graphql_api_id,
      )
      const variantImageData = await fetchVariantImage(
        variant.admin_graphql_api_id,
      )

      const metafields: Metafield[] = []
      if (metafieldsData.node?.subcategory) {
        metafields.push({
          key: metafieldsData.node.subcategory.key,
          namespace: 'filter',
          value: metafieldsData.node.subcategory.value,
        })
      }
      if (metafieldsData.node?.metal) {
        metafields.push({
          key: metafieldsData.node.metal.key,
          namespace: 'filter',
          value: metafieldsData.node.metal.value,
        })
      }
      if (metafieldsData.node?.style) {
        metafields.push({
          key: metafieldsData.node.style.key,
          namespace: 'filter',
          value: metafieldsData.node.style.value,
        })
      }
      if (metafieldsData.node?.stone) {
        metafields.push({
          key: metafieldsData.node.stone.key,
          namespace: 'filter',
          value: metafieldsData.node.stone.value,
        })
      }
      // if (metafieldsData.node?.excludeFromIndication) {
      //   metafields.push({
      //     key: metafieldsData.node.excludeFromIndication.key,
      //     namespace: 'variant',
      //     value: metafieldsData.node.excludeFromIndication.value,
      //   })
      // }

      // console.log('variantImageData:', variantImageData)

      const variantImage = variantImageData.node?.image

      // in the following const, we are returning an array of selected options on each variant, the option name is taken from the product options field, and the option value is from the variant's option fields
      // this is useful for filtering products by options

      const variantSelectedOptions = product.options.map((option, i) => {
        return {
          name: option.name,
          value: variant[`option${i + 1}`],
        }
      })

      return {
        _id: buildProductVariantDocumentId(variantId),
        _type: SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
        store: {
          ...variant,
          id: variantId,
          gid: `gid://shopify/ProductVariant/${variantId}`,
          isDeleted: false,
          option1: variant.option1,
          option2: variant.option2,
          option3: variant.option3,
          selectedOptions: variantSelectedOptions,
          previewImageUrl: variantImageData.node?.image?.url,
          image: variantImage
            ? {
                __typename: 'ShopifyVariantImage',
                altText: variantImage.altText,
                id: variantImage.id,
                url: variantImage.url,
                height: variantImage.height,
                width: variantImage.width,
              }
            : undefined,
          price: Number(variant.price),
          compareAtPrice: parseFloat(variant.compare_at_price) ?? 0,
          productGid: `gid://shopify/Product/${variant.product_id}`,
          productId: variant.product_id,
          sku: variant.sku,
          status,
          createdAt: variant.created_at,
          updatedAt: variant.updated_at,
          inventory: {
            management: (
              variant.inventory_management || 'not_managed'
            ).toUpperCase(),
            policy: (variant.inventory_policy || '').toUpperCase(),
            quantity: variant.inventory_quantity ?? 0,
            isAvailable:
              variant.inventory_quantity !== null &&
              variant.inventory_quantity > 0,
          },
          metafields: metafields,
        },
      }
    }),
  )

  const options: ShopifyDocumentProduct['store']['options'] =
    product.options?.map((option) => ({
      _type: 'productOption',
      _key: option.name,
      name: option.name,
      values: option.values ?? [],
    })) || []

  const productOptions: ShopifyDocumentProduct['options'] =
    product.options?.map((option) => ({
      _type: 'productOption',
      _key: `gid://shopify/ProductOption/${option.id}`,
      name: option.name,
      values:
        option.values.map((v) => {
          return {
            _key: slugify(v),
            _type: 'productOptionValue',
            value: v,
          }
        }) ?? [],
    })) || []

  // value
  // _key:libra-gris
  // _type:shopifyProductOptionValue

  // sanity connect definition (with store field)
  const productDocument: ShopifyDocumentProduct = {
    _id: buildProductDocumentId(shopifyProductId), // Shopify product ID
    _type: SHOPIFY_PRODUCT_DOCUMENT_TYPE,
    shopifyId: `gid://shopify/Product/${id}`,
    title: product.title,
    handle: product.handle,
    collections: productCollections,
    options: productOptions,
    store: {
      ...product,
      description: product.body_html.replace(/<[^>]+>/g, ''),
      descriptionHtml: product.body_html,
      id: shopifyProductId,
      availableForSale: availableForSale,
      gid: admin_graphql_api_id,
      isDeleted: false,
      ...(firstImage
        ? {
            previewImageUrl: firstImage.src,
          }
        : {}),
      productType: product.product_type,
      priceRange,
      totalInventory: productInventoryData.product?.totalInventory ?? 0,
      tracksInventory: true,
      slug: {
        _type: 'slug',
        current: handle,
      },
      tags: product.tags.split(',').map((tag) => tag.trim()),
      images: images?.map((image) => {
        return {
          ...image,
          _key: uuidv5(
            image.admin_graphql_api_id,
            UUID_NAMESPACE_PRODUCT_IMAGE,
          ),
          id: image.admin_graphql_api_id,
          altText: image.alt ?? '',
        }
      }),
      // metafields: productMetafields.map((metafield) => {
      //   return {
      //     __typename: 'Metafield',
      //     _key: metafield.key,
      //     id: metafield.key,
      //     key: metafield.key,
      //     namespace: metafield.namespace,
      //     value: metafield.value,
      //   }
      // }),
      options,
      createdAt: product.created_at,
      publishedAt: product.published_at,
      variants: productVariantsDocuments.map((variant) => {
        const variantId = idFromGid(variant.store.gid)
        return {
          _key: uuidv5(variant._id, UUID_NAMESPACE_PRODUCT_VARIANT),
          // _key: `shopifyProductVariant-${variant._id}`,
          _type: 'shopifyProductVariant',
          id: variant.store.gid,
          shopifyVariantID: variant.store.gid,
          sourceData: {
            __typename: 'ProductVariant',
            _type: 'shopifySourceProductVariant',
            availableForSale: Boolean(
              variant.store.inventory.policy == 'CONTINUE' ||
                (variant.store.inventory.quantity &&
                  variant.store.inventory.quantity > 0),
            ),
            compareAtPriceV2: {
              amount: variant.store.compareAtPrice,
              currencyCode: 'USD',
            },
            currentlyNotInStock: Boolean(
              variant.store.inventory.quantity &&
                variant.store.inventory.quantity > 0,
            )
              ? false
              : true,
            id: variant.store.gid,
            image: variant.store.image && {
              __typename: 'ShopifyVariantImage',
              altText: variant.store.image.altText,
              id: variant.store.image.id,
              url: variant.store.image.url,
              height: variant.store.image.height,
              width: variant.store.image.width,
            },
            inventory: {
              management: variant.store.inventory.management,
              policy: variant.store.inventory.policy,
              quantity: variant.store.inventory.quantity,
              isAvailable: variant.store.inventory.isAvailable,
            },
            isDeleted: variant.store.isDeleted,
            metafields: variant.store.metafields?.map((metafield) => {
              return {
                __typename: 'Metafield',
                _key: metafield.key,
                id: metafield.key,
                key: metafield.key,
                namespace: metafield.namespace,
                value: metafield.value,
              }
            }),
            priceV2: {
              amount: variant.store.price,
              currencyCode: 'USD',
            },
            productGid: variant.store.productGid,
            productId: variant.store.productId,
            requiresShipping: true,
            selectedOptions: variant.store.selectedOptions.map((option) => {
              return {
                _key:
                  option.name.replace(/ /g, '_') +
                  '_' +
                  option.value.replace(/ /g, '_'),
                _type: 'shopifySourceSelectedOption',
                name: option.name,
                value: option.value,
              }
            }),
            sku: variant.store.sku,
            status: variant.store.status,
            title: variant.store.title,
            updatedAt: variant.store.updatedAt,
          },
          store: variant.store,
          title: variant.store.title,
        }
      }),
    },
  }

  // type definition to match legacy shopify documents instead?

  console.log('Committing product documents', productDocument.title)
  console.log(
    'Committing product document collections:',
    productDocument.collections,
  )

  await commitProductDocuments(client, productDocument)

  return { productDocument }
}
