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
      // variants: productVariantsDocuments.map((variant) => {
      //   return {
      //     _key: uuidv5(variant._id, UUID_NAMESPACE_PRODUCT_VARIANT),
      //     _type: 'reference',
      //     _ref: variant._id,
      //     _weak: true,
      //   }
      // }),
      variants: productVariantsDocuments.map((variant) => {
        return {
          _key: uuidv5(variant._id, UUID_NAMESPACE_PRODUCT_VARIANT),
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
            metafields: [
              {
                // query for metafields here
                namespace: 'sanity',
                key: 'variantId',
                value: 'value',
              },
            ],
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

  console.log(
    'Committing product documents',
    productDocument,
    productVariantsDocuments,
  )

  await commitProductDocuments(
    client,
    productDocument,
    productVariantsDocuments,
  )

  return { productDocument, productVariantsDocuments }
}