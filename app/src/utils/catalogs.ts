import * as z from 'zod'
import { unwindEdges } from '@good-idea/unwind-edges'
import { sanityClient } from '../services/sanity'
import { Product, ShopifyProductVariant } from '../types'
import {
  definitely,
  getVariantTitle,
  getSelectedOptionValues,
  getProductGoogleCategory,
  sanityBlocksToPlainText,
} from './index'

/**
 * Types
 */

export enum Availability {
  InStock = 'in stock',
  OutOfStock = 'out of stock',
  PreOrder = 'pre order',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Unisex = 'unisex',
}

export enum AgeGroup {
  Newborn = 'newborn',
  Infant = 'infant',
  Toddler = 'toddler',
  Kids = 'kids',
  Adult = 'adult',
}

export enum SizeType {
  Regular = 'regular',
  Petite = 'petite',
  Plus = 'plus',
  BigAndtall = 'big_and_tall',
  Maternity = 'maternity',
}

export enum TrueFalse {
  True = 'TRUE',
  False = 'FALSE',
}

export enum Condition {
  New = 'new',
  Used = 'used',
  Refurbished = 'refurbished',
}

type GoogleProductCategory = string
type ProductType = string
type CountryCode = string

export const productSchema = z.object({
  /* Required Fields */
  id: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  image_link: z.string().url(),
  price: z.string(),
  availability: z.nativeEnum(Availability),
  item_group_id: z.string(),
  brand: z.string(),

  /* Optional Fields */
  additional_image_link: z.string().optional(),
  mobile_link: z.string().url().optional(),
  sale_price: z.number().positive().optional(),
  product_type: z.string().optional(),
  google_product_category: z.number().optional(),
  gtin: z.string().optional(),
  mpn: z.string().optional(),
  condition: z.nativeEnum(Condition).optional(),
  age_group: z.nativeEnum(AgeGroup).optional(),
  color: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  material: z.string().optional(),
  pattern: z.string().optional(),
  size: z.string().optional(),
  size_type: z.nativeEnum(SizeType).optional(),
  size_sytem: z.string().optional(),
  custom_label_0: z.string().optional(),
  custom_label_1: z.string().optional(),
  custom_label_2: z.string().optional(),
  custom_label_3: z.string().optional(),
  custom_label_4: z.string().optional(),
  tax: z.string().optional(),
  adult: z.nativeEnum(TrueFalse).optional(),
  shipping: z.string().optional(),
  shipping_label: z.string().optional(),
  shipping_weight: z.string().optional(),
  shipping_width: z.string().optional(),
  shipping_height: z.string().optional(),
})

export type CatalogProduct = z.infer<typeof productSchema>

export const googleMerchantProductSchema = productSchema.extend({
  /* Optional Fields */
  availability_date: z.string().optional(),
  ads_redirect: z.string().url().optional(),
})

export type GoogleMerchantProduct = z.infer<typeof googleMerchantProductSchema>

export const pinterestProductSchema = productSchema.extend({
  /* Optional Fields */
  adwords_redirect: z.string().url().optional(),
  ad_link: z.string().optional(),
})

export type PinterestProduct = z.infer<typeof pinterestProductSchema>

/**
 * Queries
 **/

export const productQuery = `
  *[
    (
      _type == "product"
    ) && defined(shopifyId)
    && hidden != true
  ]{
    _id,
    shopifyId,
    title,
    handle,
    options[]{
      ...
    },
    store {
      ...,
      variants[]{
        title
      },
    }
  }
`

const customLabelMap = new Map([
  ['under1k', 'Under 1k'],
  ['wedding', 'Wedding'],
])

const BASE_URL = 'https://www.spinellikilcollin.com'

export const fetchProducts = async () => {
  const sanityProducts = await sanityClient.fetch<Product[]>(productQuery)
  const products = sanityProducts.reduce<CatalogProduct[]>((acc, product) => {
    const { shopifyId: productId, handle, store } = product
    if (!store) throw new Error("You must provide the product's store data")
    const { description, productType, tags } = store
    const variants = store?.variants ?? []
    const productImages = store?.images ?? []

    const products =
      variants &&
      definitely(
        variants
          .reduce<ShopifyProductVariant[]>((acc, variant) => {
            if (!variant) return acc
            /* Filter out variants that are already included (excluding size option) */
            const selectedOptions = variant.sourceData?.selectedOptions
            if (!selectedOptions) return [...acc, variant]
            const optionsWithoutSize = definitely(
              selectedOptions.filter((o) => o?.name?.toLowerCase() !== 'size'),
            )
            const alreadyExists =
              (acc.length && optionsWithoutSize.length === 0) ||
              acc.some((v) => {
                return definitely(v.sourceData?.selectedOptions).some((o) => {
                  return optionsWithoutSize.find(
                    (oo) => o.name === oo.name && o.value === oo.value,
                  )
                })
              })
            if (alreadyExists) return acc
            return [...acc, variant]
          }, [])
          .map<CatalogProduct | null>((variant) => {
            const { id: variantId, title, sourceData } = variant
            const availableForSale = sourceData?.availableForSale
            const priceV2 = sourceData?.priceV2
            const compareAtPriceV2 = sourceData?.compareAtPriceV2
            const image = sourceData?.image

            const link = [
              BASE_URL,
              'products',
              `${handle}?v=${variantId}`,
            ].join('/')
            const variantImage = image ?? productImages[0]
            if (!variantImage) {
              console.error(
                `No image provided for ${handle} - ${title} (id: ${variantId})`,
              )
              return null
            }
            const image_link =
              'originalSrc' in variantImage
                ? variantImage.originalSrc
                : 'src' in variantImage
                ? variantImage.src
                : null

            const additional_image_link = productImages
              .filter((i) => i?.id !== variantImage.id)
              .map((i) => `${i?.src}`)
              .join(', ')

            const price = parsePriceString(
              compareAtPriceV2?.amount ?? priceV2?.amount,
            )

            const sale_price = compareAtPriceV2
              ? parsePriceString(priceV2?.amount)
              : undefined

            const customLabels = definitely(
              definitely(tags).map((t) => customLabelMap.get(t)),
            )

            const selectedOptions = getSelectedOptionValues(product, variant)

            const optionDescriptions = definitely(
              selectedOptions.map((so) =>
                // @ts-ignore OK to ignore this, we are getting the description from Groq rather than GraphQL
                sanityBlocksToPlainText(so.description),
              ),
            )

            const fullDescription = definitely([
              description,
              ...optionDescriptions,
            ]).join('\n')

            const catalogProduct: CatalogProduct = productSchema.parse({
              id: variantId,
              title: getVariantTitle(product, variant),
              description: fullDescription,
              brand: 'Spinelli Kilcollin',
              link,
              image_link,
              price,
              availability: availableForSale
                ? Availability.InStock
                : Availability.OutOfStock,
              product_type: productType,
              condition: Condition.New,
              google_product_category: getProductGoogleCategory(product),
              additional_image_link,
              sale_price,
              item_group_id: productId,
              custom_label_0: customLabels[0],
              custom_label_1: customLabels[1],
              custom_label_2: customLabels[2],
              custom_label_3: customLabels[3],
              custom_label_4: customLabels[4],
            })

            return catalogProduct
          }),
      )

    return [...acc, ...products]
  }, [])
  return products
}

/**
 * Parsing
 */

export const parsePriceString = (amount?: string | number | null): string => {
  if (!amount) throw new Error('You must provide an amount')

  const parsed = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })
    .format(typeof amount === 'string' ? parseFloat(amount) : amount)
    .replace(/^\$/, '')
    .concat(' USD')

  return parsed
}
