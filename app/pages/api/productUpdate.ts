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
  ShopifyDocumentProduct,
  ShopifyDocumentProductVariant,
} from './storageTypes'

import {
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
  UUID_NAMESPACE_PRODUCT_IMAGE,
  UUID_NAMESPACE_COLLECTIONS,
  UUID_NAMESPACE_PRODUCT_VARIANT,
} from './constants'
import { DataSinkProduct } from './requestTypes'
import { idFromGid } from './requestHelpers'
import { ShopifyStorefrontMetafield } from '../../src/types/generated-shopify'
import { Maybe, ShopifyProduct } from '../../src/types'
import { shopifyQuery } from '../../src/providers/AllProviders'

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
  excludeFromIndication: Maybe<Metafield>
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

interface ProductVariantNode {
  id: string
  subcategory: Maybe<Metafield>
  metal: Maybe<Metafield>
  style: Maybe<Metafield>
  stone: Maybe<Metafield>
  excludeFromIndication: Maybe<Metafield>
}

interface VariantMetafieldsResponse {
  node: Maybe<ProductVariantNode>
}
interface ProductCollectionsResponse {
  product: Maybe<ProductCollectionsNode>
}
type ProductCollectionRefs = CollectionRef[]

interface ProductMetafieldsResponse {
  node: Maybe<ProductNode>
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

const productMetafieldsQuery = `
query ProductMetafieldsQuery($productId: ID!) {
  node(id: $productId) {
    id
    ... on Product {
      excludeFromIndication: metafield(namespace: "product", key: "excludeFromIndication") {
        key
        value
        namespace
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

// This function fetches collections for a product.
async function fetchProductCollections(
  productId: string,
): Promise<ProductCollectionRefs> {
  const response = await shopifyQuery<ProductCollectionsResponse>(
    productCollectionsQuery,
    { productId },
  )

  if (!response || !response.product || !response.product.collections) {
    throw new Error('No collections data returned')
  }

  return response.product.collections.edges.map((edge) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
  }))
}

// This function fetches metafields for a product.
async function fetchProductMetafields(
  productId: string,
): Promise<ProductMetafieldsResponse> {
  const response = await shopifyQuery<ProductMetafieldsResponse>(
    productMetafieldsQuery,
    {
      productId,
    },
  )
  if (!response || !response.node) {
    throw new Error('No data returned')
  }
  return { node: response.node }
}

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
    throw new Error('No data returned')
  }
  return { node: response.node }
}

export async function handleProductUpdate(
  client: SanityClient,
  product: DataSinkProduct,
): Promise<{
  productDocument: ShopifyDocumentProduct
  productVariantsDocuments: ShopifyDocumentProductVariant[]
}> {
  const { handle, id, images, status, priceRange } = product

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
  const shopifyProductId = idFromGid(id)

  // Fetch collections
  const productCollectionsData = await fetchProductCollections(id)
  // Fetch metafields
  const productMetafieldsData = await fetchProductMetafields(id)

  const productCollections: SanityReference[] = []
  const productMetafields: Metafield[] = []

  if (productCollectionsData && productCollectionsData.length > 0) {
    productCollectionsData.forEach((collection) => {
      productCollections.push({
        _key: uuidv5(collection.id, UUID_NAMESPACE_COLLECTIONS),
        _ref: buildCollectionDocumentId(idFromGid(collection.id)),
        _type: 'reference',
        _weak: true,
      })
    })
  }

  if (productMetafieldsData.node?.excludeFromIndication) {
    productMetafields.push({
      key: productMetafieldsData.node.excludeFromIndication.key,
      namespace: 'product',
      value: productMetafieldsData.node.excludeFromIndication.value,
    })
  }

  const productVariantsDocuments = await Promise.all(
    variants.map<Promise<ShopifyDocumentProductVariant>>(async (variant) => {
      const variantId = idFromGid(variant.id)
      const metafieldsData = await fetchVariantMetafields(variant.id)

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
      if (metafieldsData.node?.excludeFromIndication) {
        metafields.push({
          key: metafieldsData.node.excludeFromIndication.key,
          namespace: 'variant',
          value: metafieldsData.node.excludeFromIndication.value,
        })
      }

      // console.log('productVariantsDocuments variant doc:', {
      //   _id: buildProductVariantDocumentId(variantId),
      //   _type: SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
      //   store: {
      //     ...variant,
      //     id: variantId,
      //     gid: `gid://shopify/ProductVariant/${variant.id}`,
      //     isDeleted: false,
      //     option1: variant.selectedOptions[0]?.value,
      //     option2: variant.selectedOptions[1]?.value,
      //     option3: variant.selectedOptions[2]?.value,
      //     selectedOptions: variant.selectedOptions,
      //     previewImageUrl: variant.image?.src,
      //     image: variant.image,
      //     price: Number(variant.price),
      //     compareAtPrice: variant.compareAtPrice ?? 0,
      //     productGid: variant.product.id,
      //     productId: idFromGid(variant.product.id),
      //     sku: variant.sku,
      //     status,
      //     updatedAt: variant.updatedAt,
      //     inventory: {
      //       management: (
      //         variant.inventoryManagement || 'not_managed'
      //       ).toUpperCase(),
      //       policy: (variant.inventoryPolicy || '').toUpperCase(),
      //       quantity: variant.inventoryQuantity ?? 0,
      //       isAvailable:
      //         variant.inventoryQuantity !== null &&
      //         variant.inventoryQuantity > 0,
      //     },
      //     metafields: metafields,
      //   },
      // })

      return {
        _id: buildProductVariantDocumentId(variantId),
        _type: SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
        store: {
          ...variant,
          id: variantId,
          gid: `gid://shopify/ProductVariant/${variantId}`,
          isDeleted: false,
          option1: variant.selectedOptions[0]?.value,
          option2: variant.selectedOptions[1]?.value,
          option3: variant.selectedOptions[2]?.value,
          selectedOptions: variant.selectedOptions,
          previewImageUrl: variant.image?.src,
          image: variant.image,
          price: Number(variant.price),
          compareAtPrice: variant.compareAtPrice ?? 0,
          productGid: variant.product.id,
          productId: idFromGid(variant.product.id),
          sku: variant.sku,
          status,
          updatedAt: variant.updatedAt,
          inventory: {
            management: (
              variant.inventoryManagement || 'not_managed'
            ).toUpperCase(),
            policy: (variant.inventoryPolicy || '').toUpperCase(),
            quantity: variant.inventoryQuantity ?? 0,
            isAvailable:
              variant.inventoryQuantity !== null &&
              variant.inventoryQuantity > 0,
          },
          metafields: metafields,
        },
      }
    }),
  )

  const options: ShopifyDocumentProduct['store']['options'] =
    product.options.map((option) => ({
      _type: 'productOption',
      _key: option.id,
      name: option.name,
      values: option.values ?? [],
    })) || []

  const productOptions: ShopifyDocumentProduct['options'] =
    product.options.map((option) => ({
      _type: 'productOption',
      _key: option.id,
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
    shopifyId: id,
    collections: productCollections,
    options: productOptions,
    store: {
      ...product,
      description: product.descriptionHtml.replace(/<[^>]+>/g, ''),
      id: shopifyProductId,
      gid: id,
      isDeleted: false,
      ...(firstImage
        ? {
            previewImageUrl: firstImage.src,
          }
        : {}),
      priceRange,
      slug: {
        _type: 'slug',
        current: handle,
      },
      images: images?.map((image) => {
        return {
          ...image,
          _key: uuidv5(image.id, UUID_NAMESPACE_PRODUCT_IMAGE),
        }
      }),
      metafields: productMetafields.map((metafield) => {
        return {
          __typename: 'Metafield',
          _key: metafield.key,
          id: metafield.key,
          key: metafield.key,
          namespace: metafield.namespace,
          value: metafield.value,
        }
      }),
      options,
      publishedAt: product.publishedAt,
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
                variant.store.inventory.quantity < 1,
            ),
            id: variant.store.gid,
            image: variant.store.image && {
              __typename: 'Image',
              altText: variant.store.image.altText,
              id: variant.store.image.id,
              originalSrc: variant.store.image.src,
              height: variant.store.image.height,
              width: variant.store.image.width,
            },
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
            title: variant.store.title,
          },
          title: variant.store.title,
        }
      }),
    },
  }

  // type definition to match legacy shopify documents instead?

  // console.log('Committing product documents', productDocument)
  // console.log(
  //   'Committing product document collections:',
  //   productDocument.collections,
  // )

  await commitProductDocuments(
    client,
    productDocument,
    productVariantsDocuments,
  )

  return { productDocument, productVariantsDocuments }
}
