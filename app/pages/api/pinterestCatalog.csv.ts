import { NextApiHandler } from 'next'
import * as z from 'zod'
import { Parser as CSVParser } from 'json2csv'
import { unwindEdges } from '@good-idea/unwind-edges'
import { sanityClient } from '../../src/services/sanity'
import { ShopifyProduct, ShopifySourceProductVariant } from '../../src/types'
import {
  definitely,
  getVariantTitle,
  getSelectedOptionValues,
  sanityBlocksToPlainText,
} from '../../src/utils'

enum Availability {
  InStock = 'in stock',
  OutOfStock = 'out of stock',
  PreOrder = 'pre order',
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Unisex = 'unisex',
}

enum AgeGroup {
  Newborn = 'newborn',
  Infant = 'infant',
  Toddler = 'toddler',
  Kids = 'kids',
  Adult = 'adult',
}

enum SizeType {
  Regular = 'regular',
  Petite = 'petite',
  Plus = 'plus',
  BigAndtall = 'big_and_tall',
  Maternity = 'maternity',
}

enum TrueFalse {
  True = 'TRUE',
  False = 'FALSE',
}

enum Condition {
  New = 'new',
  Used = 'used',
  Refurbished = 'refurbished',
}

type GoogleProductCategory = string
type ProductType = string
type CountryCode = string

interface PinterestProduct {
  /*
   * Required Fields
   */

  /* The user-created unique ID that represents the product. Only Unicode characters are accepted. */
  id: string
  /* The name of the product. Must be the same name as the product from the landing page. Include the variant details, such as color and size. */
  title: string
  description: string
  link: string
  image_link: string
  /* The price of the product. The price should include currency in ISO-4217 if it is not US dollars. If the currency is not included, we default to US dollars. We accept currency after the numeric price value, with or without space. Currency should follow the standard ISO-4217 code. We do not accept 0 values for price. Do not use currency symbols */
  price: number
  /* The availability of the product. Must be one of the following values: ‘in stock’, ‘out of stock’, ‘preorder’ */
  availability: Availability

  /*
   * Optional Fields
   */

  /* The categorization of your product based on your custom product taxonomy. Subcategories must be sent separated by “ > “. The > must be wrapped by spaces. We do not recognize any other delimiters such as comma or pipe. */
  product_type?: ProductType

  /* The links to additional images for your product. Separate each additional image with comma. We recommend enclosing the whole string with quotes. Must begin with http:// or https://
   * Commas must be encoded or removed if they are part of the image link, as currently we are unable to process image links containing commas.
   * We will create a new pin for every additional image link sent. */
  additional_image_link?: string

  /* The mobile-optimized version of your landing page. Must begin with http:// or https:// */
  mobile_link?: string

  /* The price of the product. The price should include currency in ISO-4217 if it is not US dollars. If the currency is not included, we default to US dollars. We accept currency after the numeric price value, with or without space. Currency should follow the standard ISO-4217 code. We do not accept 0 values for price. Do not use currency symbols */
  sale_price?: number
  adwords_redirect?: string

  /*
   * Optional Product Identifier
   */

  /* The parent ID of the product. Required for products with multiple variants */
  item_group_id?: string
  /* The brand of the product. */
  brand?: string
  /* The unique universal product identifier. */
  gtin?: string
  /* mpn	Manufacturer Part Number are alpha-numeric codes created by the manufacturer of a product to uniquely identify it among all products from the same manufacturer. */
  mpn?: string

  /*
   * Optional product characteristics
   */

  /* The primary color of the product	*/
  color?: string

  /* The gender associated with the product. Must be one of the following values if sent: ‘male’, ‘female’, ‘unisex’	male */
  gender?: Gender
  /* The age group to apply a demographic range to the product. Must be the one of the following values: ‘newborn’, ‘infant’, ‘toddler’, ‘kids’, ‘adult’	newborn */
  age_group?: AgeGroup

  /* The material used to make the product.	*/
  material?: string

  /* Description of the pattern used for the product. */
  pattern?: string

  /* The size of the product */
  size?: string

  /* Additional description for the size. Must be one of the following values if sent: ‘regular’, ‘petite’, ‘plus’, ‘big_and_tall’, ‘maternity’	regular */
  size_type?: SizeType

  /* size_system	Indicates the country’s sizing system in which you are submitting your product */
  size_system?: CountryCode

  /**
   * Optional tax and shipping data
   */

  /* Each tax attribute group can consist of 4 sub-attributes: country:region:rate (required):tax_ship
   * All colons, even for blank values, are required.	country:region:rate(required):tax_ship
   * example: US:1025433:6.00:y */
  tax?: string

  /* Each delivery attribute group can consist of 4 sub-attributes: country, region, service, and price (required).
   * All colons, even for blank values, are required.	country:region:service:price(required)
   * examples: US:CA:Ground:0 US / US::Express:13.12 */
  shipping?: string

  /* The weight of the product. Ensure there is a space between the numeric string and the metric.	<numeric> <metric>
   * examples: "3 kg" "5 lbs" */
  shipping_weight?: string

  /* The width of the package needed to ship the product. Ensure there is a space between the numeric string and the metric.	<numeric> <metric>
   * example: "16 in" */
  shipping_width?: string

  /* The height of the package needed to ship the product. Ensure there is a space between the numeric string and the metric.	<numeric> <metric>
   * example: "16 in" */
  shipping_height?: string

  /**
   * Optional adult product flag
   */

  adult?: TrueFalse

  /**
   * Optional custom labels
   */

  /* Custom grouping of products.	Max 1000 characters.
   * Examples: "Best sellers" */
  custom_label_0?: string
  custom_label_1?: string
  custom_label_2?: string
  custom_label_3?: string
  custom_label_4?: string

  /**
   * Optional shopping ad fields
   */

  /* Allows advertisers to specify a separate URL that can be used to track traffic coming from Pinterest shopping ads. Must send full URL including tracking, do not send tracking parameters only. At this time we do not support impression tracking. Must begin with http:// or https:// */
  ad_link?: string

  /* The condition of the product. Must be one of the following values: ‘new’, ‘used’, ‘refurbished’ */
  condition?: Condition

  /* The categorization of the product based on the standardized Google Product Taxonomy. This is a set taxonomy. Both the text values and numeric codes are accepted.
   * full taxonomy: https://help.pinterest.com/sub/helpcenter/assets/Google_product_category_taxonomy_EN_US.xls
   * example: "Apparel & Accessories > Clothing > Shirts & Tops", 212 */
  google_product_category?: string
}

const pinterestProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  image_link: z.string().url(),
  price: z.number().positive(),
  availability: z.nativeEnum(Availability),
  /* Optional Fields */
  product_type: z.string().optional(),
  additional_image_link: z.string().optional(),
  mobile_link: z.string().url().optional(),
  sale_price: z.number().positive().optional(),
  adwords_redirect: z.string().url().optional(),
  item_group_id: z.string().optional(),
  brand: z.string().optional(),
  gtin: z.string().optional(),
  mpn: z.string().optional(),
  color: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  age_group: z.nativeEnum(AgeGroup).optional(),
  material: z.string().optional(),
  pattern: z.string().optional(),
  size: z.string().optional(),
  size_type: z.nativeEnum(SizeType).optional(),
  size_sytem: z.string().optional(),
  tax: z.string().optional(),
  shipping: z.string().optional(),
  shipping_weight: z.string().optional(),
  shipping_width: z.string().optional(),
  shipping_height: z.string().optional(),
  adult: z.nativeEnum(TrueFalse).optional(),
  custom_label_0: z.string().optional(),
  custom_label_1: z.string().optional(),
  custom_label_2: z.string().optional(),
  custom_label_3: z.string().optional(),
  custom_label_4: z.string().optional(),
  ad_link: z.string().optional(),
  condition: z.nativeEnum(Condition).optional(),
  google_product_category: z.string().optional(),
})

const fields = Object.keys(pinterestProductSchema.shape)

const csvParser = new CSVParser({ fields })

const productQuery = `
  *[
    (
      _type == "shopifyProduct"
    ) && defined(shopifyId)
  ]{
    _id,
    shopifyId,
    title,
    handle,
    minVariantPrice,
    maxVariantPrice,
    options[]{
      ...
    },
    sourceData {
      ...
    }
  }
`

const parsePriceString = (amount?: string | number | null): number => {
  if (!amount) throw new Error('You must provide an amount')

  return parseFloat(
    new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' })
      .format(typeof amount === 'string' ? parseFloat(amount) : amount)
      .replace(/^\$/, ''),
  )
}

const customLabelMap = new Map([
  ['under1k', 'Under 1k'],
  ['wedding', 'Wedding'],
])

const BASE_URL = 'https://www.spinellikilcollin.com'

const handler: NextApiHandler = async (req, res) => {
  const products = await sanityClient.fetch<ShopifyProduct[]>(productQuery)
  const nodes = products.reduce<PinterestProduct[]>((acc, product) => {
    const { shopifyId: productId, handle, sourceData } = product
    if (!sourceData)
      throw new Error("You must provide the product's sourceData")
    const { description, productType, tags } = sourceData
    const [variants] = unwindEdges(sourceData?.variants)
    const [productImages] = unwindEdges(sourceData?.images)

    const pinterestProducts = definitely(
      variants
        .reduce<ShopifySourceProductVariant[]>((acc, variant) => {
          /* Filter out variants that are already included (excluding size option) */
          const { selectedOptions } = variant
          if (!selectedOptions) return [...acc, variant]
          const optionsWithoutSize = definitely(
            selectedOptions.filter((o) => o?.name?.toLowerCase() !== 'size'),
          )
          const alreadyExists = acc.some((v) => {
            return definitely(v.selectedOptions).some((o) => {
              return optionsWithoutSize.find(
                (oo) => o.name === oo.name && o.value === oo.value,
              )
            })
          })
          if (alreadyExists) return acc
          return [...acc, variant]
        }, [])
        .map<PinterestProduct | null>((variant) => {
          const {
            id: variantId,
            title,
            availableForSale,
            priceV2,
            compareAtPriceV2,
            image,
          } = variant

          const link = [BASE_URL, 'products', `${handle}?v=${variantId}`].join(
            '/',
          )
          const variantImage = image ?? productImages[0]
          if (!variantImage) {
            console.error(
              `No image provided for ${handle} - ${title} (id: ${variantId})`,
            )
            return null
          }
          const image_link = variantImage.originalSrc
          const additional_image_link = productImages
            .filter((i) => i?.id !== variantImage.id)
            .map((i) => `'${i.originalSrc}'`)
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
              sanityBlocksToPlainText(so.description),
            ),
          )

          const fullDescription = definitely([
            description,
            ...optionDescriptions,
          ]).join('\n')

          const pinterestProduct: PinterestProduct = pinterestProductSchema.parse(
            {
              id: variantId,
              title: getVariantTitle(product, variant),
              description: fullDescription,
              link,
              image_link,
              price,
              availability: availableForSale
                ? Availability.InStock
                : Availability.OutOfStock,
              product_type: productType,
              additional_image_link,
              sale_price,
              item_group_id: productId,
              custom_label_0: customLabels[0],
              custom_label_1: customLabels[1],
              custom_label_2: customLabels[2],
              custom_label_3: customLabels[3],
              custom_label_4: customLabels[4],
            },
          )

          return pinterestProduct
        }),
    )

    return [...acc, ...pinterestProducts]
  }, [])

  const csv = csvParser.parse(nodes)
  return res.status(200).send(csv)
}

export default handler
