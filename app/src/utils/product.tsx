import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyProduct,
  ShopifyProductOptionValue,
  ShopifyProductOption,
  ShopifySourceProductVariant,
  ShopifyProductVariant,
  Maybe,
  ShopifyMoneyV2,
  Image,
} from '../types'
import { definitely } from './data'

export interface SelectedProductOption {
  name: string
  currentValue: string
}

export const isValidSwatchOption = (option: ShopifyProductOption): boolean =>
  definitely(option.values).every(({ swatch }) =>
    Boolean(swatch && swatch.asset),
  )

export const getSwatchOptions = (
  product: ShopifyProduct,
): ShopifyProductOption[] =>
  getValidProductOptions(product).filter((option) =>
    isValidSwatchOption(option),
  )

export const getSwatchImages = ({ values }: ShopifyProductOption): Image[] =>
  definitely(values)
    .map(({ swatch }) => swatch)
    .reduce<Image[]>((acc, o) => (o ? [...acc, o] : acc), [])

const optionHasVariant = (
  variants: ShopifySourceProductVariant[],
  optionName: string,
  optionValue: ShopifyProductOptionValue,
): boolean => {
  return variants.some((v) =>
    definitely(v.selectedOptions).some(
      (o) => o.name === optionName && o.value === optionValue.value,
    ),
  )
}

const optionHasAvailableVariant = (
  variants: ShopifySourceProductVariant[],
  optionName: string,
  optionValue: ShopifyProductOptionValue,
): boolean => {
  const availableVariants = variants.filter((v) => v.availableForSale === true)
  return availableVariants.some((v) =>
    definitely(v.selectedOptions).some(
      (o) => o.name === optionName && o.value === optionValue.value,
    ),
  )
}

export const getValidProductOptions = (
  product: ShopifyProduct,
): ShopifyProductOption[] => {
  const options = definitely(product.options)
  const [variants] = unwindEdges(product?.sourceData?.variants)

  return options.map((option) => {
    const optionName = option?.name
    if (!optionName) {
      throw new Error('Option name was not supplied')
    }
    const values = definitely(option.values).filter((value) =>
      optionHasAvailableVariant(variants, optionName, value),
    )
    return {
      ...option,
      values,
    }
  })
}

export const optionMatchesVariant = (
  optionName: string,
  option: ShopifyProductOptionValue,
  variant: ShopifyProductVariant | ShopifySourceProductVariant,
): boolean => {
  const selectedOptions =
    variant.__typename === 'ShopifyProductVariant'
      ? variant?.sourceData?.selectedOptions
      : variant?.selectedOptions

  return definitely(selectedOptions).some(
    (vso) => optionName === vso.name && option.value === vso.value,
  )
}

export const getSelectedOptionValues = (
  product: ShopifyProduct,
  variant: ShopifyProductVariant | ShopifySourceProductVariant,
): ShopifyProductOptionValue[] => {
  const source =
    variant.__typename === 'ShopifyProductVariant'
      ? variant.sourceData
      : variant

  const variantSelectedOptions = source?.selectedOptions
  if (!product.options || !variantSelectedOptions) return []

  const selectedOptionValues = definitely(product?.options).reduce<
    ShopifyProductOptionValue[]
  >((acc, currentOption) => {
    const currentOptionValues = definitely(currentOption?.values).filter((co) =>
      optionMatchesVariant(currentOption?.name || 'foo', co, variant),
    )
    return [...acc, ...currentOptionValues]
  }, [])
  return definitely(selectedOptionValues)
}

export const getAdditionalDescriptions = (
  selectedOptions: ShopifyProductOptionValue[],
) => {
  return definitely(
    selectedOptions.map(({ _key, descriptionRaw }) =>
      descriptionRaw ? { _key, descriptionRaw } : null,
    ),
  )
}

/**
 * Get the first variant that matches the selected option
 */
export const getVariantBySelectedOption = (
  variants: ShopifySourceProductVariant[],
  currentOption: SelectedProductOption,
): ShopifySourceProductVariant | void =>
  variants.find((variant) => {
    const { selectedOptions } = variant
    return definitely(selectedOptions).some(
      (option) =>
        option.name === currentOption.name &&
        option.value === currentOption.currentValue,
    )
  })

/**
 * Get the first variant that matches the selected options
 */
export const getVariantBySelectedOptions = (
  variants: ShopifySourceProductVariant[],
  currentOptions: any[],
): ShopifySourceProductVariant | void =>
  variants.find((variant) => {
    console.log(currentOptions)
    if (!currentOptions) return
    const { selectedOptions } = variant
    return currentOptions.every((currentOption) =>
      selectedOptions?.find(
        (o) =>
          o?.name === currentOption.name &&
          o?.value === currentOption.currentValue,
      ),
    )
  })

export const getBestVariantByMatch = (
  variants: ShopifySourceProductVariant[],
  matches: string[],
): ShopifySourceProductVariant => {
  const bestVariant = variants.find((v) =>
    matches.some((m) => v?.title?.includes(m)),
  )
  return bestVariant || variants[0]
}

interface FilterProps {
  name: string
  value: string | boolean
}

export const getBestVariantByFilterMatch = (
  variants: ShopifySourceProductVariant[],
  filters: FilterProps[],
): ShopifySourceProductVariant => {
  const bestColorVariant = variants.find((v) => {
    const colorMatches = filters.some((m) => {
      const { name, value } = m
      let match: boolean | undefined = false
      switch (name) {
        case 'metal':
          let keywords: string[] = []
          switch (value) {
            case 's':
              keywords = ['Silver', 'silver', 'SG', 'Gris']
              break
            case 'yg':
              keywords = [
                'Yellow Gold',
                'yellow gold',
                'YG',
                'MX',
                'Nexus Gold',
                'Vela Gold',
                'Akoya Gold',
                'Vega Gold',
              ]
              break
            case 'rg':
              keywords = ['Rose Gold', 'rose gold', 'RG', 'Rose']
              break
            case 'wg':
              keywords = ['White Gold', 'white gold', 'WG', 'Blanc']
              break
            case 'bg':
              keywords = ['Black Gold', 'black gold', 'BG', 'Vega Gold']
              break
            case 'p':
              keywords = ['Platinum', 'platinum']
              break
            default:
              break
          }
          match = v?.selectedOptions?.some((o) =>
            keywords.some((word) => {
              if (o?.value?.includes(word)) {
                return true
              }
            }),
          )
          break
        default:
          break
      }
      return match
    })
    return colorMatches
  })

  const inStockVariants = variants.filter((v) => {
    const stockMatches = filters.some((m) => {
      const { name, value } = m
      let match: boolean | undefined = false
      switch (name) {
        case 'inventory':
          if (value === true) match = !v?.currentlyNotInStock
          break
        default:
          break
      }
      return match
    })
    return stockMatches
  })

  const bestInStockColorVariant = inStockVariants.find((v) => {
    const matchingPair = bestColorVariant?.selectedOptions?.filter(
      (o1) =>
        !v.selectedOptions?.some((o2) => {
          // console.log('matchingPair', o1, o2)
          if (o2?.name === 'Color') {
            return Boolean(o1?.value === o2?.value)
          } else {
            return false
          }
        }),
    )
    const variantMatchesColor = Boolean(
      matchingPair && matchingPair?.length > 0,
    )
    return variantMatchesColor
  })

  const bestInStockVariant = variants.find((v) => {
    const stockMatches = filters.some((m) => {
      const { name, value } = m
      let match: boolean | undefined = false
      switch (name) {
        case 'inventory':
          if (value === true) match = !v?.currentlyNotInStock
          break
        default:
          break
      }
      return match
    })
    return stockMatches
  })

  // console.log('bestInStockColorVariant:', bestInStockColorVariant)
  // console.log('bestInStockVariant:', bestInStockVariant)
  // console.log('bestColorVariant:', bestColorVariant)
  return (
    bestInStockColorVariant ||
    bestInStockVariant ||
    bestColorVariant ||
    variants[0]
  )
}

export const isValidPrice = (price: Maybe<ShopifyMoneyV2>): boolean => {
  if (!price || !price.amount || price.currencyCode === 'NONE') return false
  return true
}

export const getVariantTitle = (
  product: ShopifyProduct,
  variant: ShopifyProductVariant | ShopifySourceProductVariant,
): string | null | undefined => {
  if (product?.sourceData?.productType === 'Gift Card') return product?.title
  if (product?.variants?.length && product.variants.length < 2) {
    // If there is only one variant, its name will be "Default Title",
    // so we should return the product title instead.
    return product?.title
  }

  const source =
    variant.__typename === 'ShopifyProductVariant'
      ? variant.sourceData
      : variant

  // Parse the product title by combining the selected option
  // values, omitting the "Size" option
  const titleByOptions = source?.selectedOptions?.length
    ? definitely(source.selectedOptions)
        .map((option) => {
          if (option.name === 'Size') return null
          return option.value
        })
        .filter(Boolean)
        .join(' | ')
    : undefined

  if (titleByOptions?.length) return titleByOptions

  return product?.title
}

export const getProductGoogleCategory = (
  product: ShopifyProduct,
): number | undefined => {
  switch (product?.sourceData?.productType?.toLowerCase()) {
    case 'bracelets':
      return 191
    case 'earrings':
      return 194
    case 'necklace':
      return 196
    case 'ring':
      return 200
    case 'clothing':
      return 1604
    case 'candle':
      return 588
    case 'furniture':
      return 436
    case 'gift card':
      return 53
    case 'sunglasses':
      return 178
    default:
      return 188
  }
}

interface ProductUriOptions {
  variant?: ShopifySourceProductVariant | ShopifyProductVariant
  currentPath?: string
  params?: Record<string, string>
}

const getVariantId = (
  v?: ShopifySourceProductVariant | ShopifyProductVariant,
): string | null | void => {
  if (!v) return undefined
  if ('id' in v) return v.id
  if ('sourceData' in v) return v?.sourceData?.id
  return undefined
}

export const getProductUri = (
  product: ShopifyProduct,
  { variant, params, currentPath }: ProductUriOptions = {},
): string => {
  const matches = currentPath ? currentPath.match(/\?(.*)$/) : undefined
  const existingParams = matches && matches[1] ? matches[1] : undefined
  const newParams = new URLSearchParams(existingParams)
  const variantId = getVariantId(variant)
  newParams.delete('search')
  newParams.delete('v')
  if (variant && variantId) {
    newParams.set('v', variantId)
  }
  if (params) {
    Object.entries(params).forEach(([k, v]) => newParams.set(k, v))
  }
  const uri = `/products/${product.handle}?`
    .concat(newParams.toString())
    .replace(/\?$/, '')
  return uri
}

const btoa = (str: string) => Buffer.from(str).toString('base64')
const atob = (str: string) => Buffer.from(str, 'base64').toString('binary')

type NodeType = 'Product' | 'Collection' | 'Order' | 'ProductVariant'

/**
 * getStorefrontId
 *
 * gets a storefrontID from a numeric Shopify ID
 */
export const getStorefrontId = (
  restId: string | number,
  type: NodeType,
): string => btoa(['gid://shopify', type, restId.toString()].join('/'))

/**
 * getProductIdFromStorefrontId
 *
 * returns a numeric Shopify ID when given a storefrontId
 */
export const getProductIdFromStorefrontId = (storefrontId: string): string => {
  const converted = atob(storefrontId)
  if (!/gid:\/\/shopify\//.test(converted)) {
    throw new Error(`Converted ID "${converted}" is not a valid Shopify ID`)
  }
  // Strip out the gid://shopify/Product/ part of the ID
  return converted.replace(/gid:\/\/shopify\/\w+\/(.*)/, '$1')
}
