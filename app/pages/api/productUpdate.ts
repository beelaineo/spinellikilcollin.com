import type { SanityClient } from '@sanity/client'
import { v5 as uuidv5 } from 'uuid'

import {
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
  UUID_NAMESPACE_PRODUCT_VARIANT,
} from './constants'
import { DataSinkProduct } from './requestTypes'
import { idFromGid } from './requestHelpers'

export async function handleProductUpdate(
  client: SanityClient,
  product: DataSinkProduct,
): Promise<{
  productDocument: ShopifyDocumentProduct
  productVariantsDocuments: ShopifyDocumentProductVariant[]
}> {
  const { handle, id, images, status, priceRange } = product

  const variants = product.variants || []
  const firstImage = images?.[0]
  const shopifyProductId = idFromGid(id)

  const productVariantsDocuments = variants.map<ShopifyDocumentProductVariant>(
    (variant) => {
      const variantId = idFromGid(variant.id)
      return {
        _id: buildProductVariantDocumentId(variantId),
        _type: SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
        store: {
          ...variant,
          id: variantId,
          gid: `gid://shopify/ProductVariant/${variant.id}`,
          isDeleted: false,
          option1: variant.selectedOptions[0]?.value,
          option2: variant.selectedOptions[1]?.value,
          option3: variant.selectedOptions[2]?.value,
          previewImageUrl: variant.image?.src,
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
        },
      }
    },
  )

  const options: ShopifyDocumentProduct['store']['options'] =
    product.options.map((option) => ({
      _type: 'option',
      _key: option.id,
      name: option.name,
      values: option.values ?? [],
    })) || []

  // We assign _key values of product option name and values since they're guaranteed unique in Shopify
  const productDocument: ShopifyDocumentProduct = {
    _id: buildProductDocumentId(shopifyProductId), // Shopify product ID
    _type: SHOPIFY_PRODUCT_DOCUMENT_TYPE,
    shopifyId: id,
    store: {
      ...product,
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
      options,
      variants: productVariantsDocuments.map((variant) => {
        return {
          _key: uuidv5(variant._id, UUID_NAMESPACE_PRODUCT_VARIANT),
          _type: 'reference',
          _ref: variant._id,
          _weak: true,
        }
      }),
    },
  }

  await commitProductDocuments(
    client,
    productDocument,
    productVariantsDocuments,
  )

  return { productDocument, productVariantsDocuments }
}
