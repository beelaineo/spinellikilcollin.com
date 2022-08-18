import {
  Maybe,
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyProductOptionValue,
} from '../../types'
import { definitely } from '../../utils'

const DELIMITER = ' / '
const CURRENCY = 'USD'
const LOCALE = 'en-us'

const findVariant = (product: ShopifyProduct, key: string) => {
  console.log('product:', product)
  console.log('key:', key)
  const v = product?.variants?.find((variant) => {
    return variant?.title === key
  })
  if (!v) console.warn('could not find variant')
  return v
}

const findVariantById = (product: ShopifyProduct, key: string) => {
  return product?.variants?.find((variant) => {
    return variant?.shopifyVariantID === key
  })
}

const findOptionIndex = (
  options: Maybe<ShopifyProductOptionValue>[],
  key: string,
  caratOptions?: Maybe<ShopifyProductOptionValue>[],
  caratKey?: string,
): number => {
  if (caratOptions && caratKey) {
    console.log('FINDOPTIONINDEX OPTIONS ARRAY', options)
    console.log('FINDOPTIONINDEX KEY', key)
    console.log('FINDOPTIONINDEX CARAT OPTIONS ARRAY', caratOptions)
    console.log('FINDOPTIONINDEX CARAT KEY', caratKey)
    return caratOptions.findIndex((element) => {
      return element?.value === caratKey
    })
  } else {
    return options.findIndex((element) => {
      return element?.value === key
    })
  }
}

const hydrateSize = (
  product: ShopifyProduct,
  s: any,
  color: string | null = '',
  carat: string | null = '',
) => {
  const sizes = product?.options?.find((option) => {
    console.log('SIZES OPTION', option)
    return option?.name === 'Size'
  })
  const lengths = product?.options?.find((option) => {
    return option?.name === 'Length'
  })
  const titles = product?.options?.find((option) => {
    return option?.name === 'Title'
  })
  const carats = product?.options?.find((option) => {
    return option?.name === 'Carat'
  })

  console.log('CARAT', carat)
  console.log('COLOR', color)

  if (
    sizes &&
    sizes.values &&
    sizes.values.length > 0 &&
    carats &&
    carats.values &&
    carats.values.length > 0
  ) {
    console.log('CARATS', carats)
    console.log('SIZES', sizes)
    const variants = sizes?.values?.map((size) => {
      console.log('MAPPED SIZE', size)
      const key =
        color == 'No Color Option'
          ? `${size?.value}`
          : color && carat
          ? `${color}${DELIMITER}${carat}${DELIMITER}${size?.value}`
          : color
          ? `${color}${DELIMITER}${size?.value}`
          : `${size?.value}`

      const variant = findVariant(product, key)
      if (!variant) return
      if (
        variant &&
        variant.sourceData &&
        variant.sourceData.availableForSale
      ) {
        const price = variant.sourceData.priceV2
        console.log('S PRICE', price)
        return s()
          .name(size?.value)
          .price((pr) =>
            pr.currency(price?.currencyCode).current(price?.amount),
          )
          .sku(variant.shopifyVariantID)
      }
    })
    console.log('VARIANTS', variants)
    return variants
  } else if (sizes && sizes.values && sizes.values.length > 0) {
    const variants = sizes?.values?.map((size) => {
      const key =
        color == 'No Color Option'
          ? `${size?.value}`
          : color
          ? `${color}${DELIMITER}${size?.value}`
          : `${size?.value}`

      const variant = findVariant(product, key)
      if (
        variant &&
        variant.sourceData &&
        variant.sourceData.availableForSale
      ) {
        const price = variant.sourceData.priceV2
        return s()
          .name(size?.value)
          .price((pr) =>
            pr.currency(price?.currencyCode).current(price?.amount),
          )
          .sku(variant.shopifyVariantID)
      }
    })
    console.log('VARIANTS', variants)
  } else if (lengths && lengths.values && lengths.values.length > 0) {
    return lengths?.values?.map((length) => {
      const key =
        color == 'No Color Option'
          ? `${length?.value}`
          : color
          ? `${color}${DELIMITER}${length?.value}`
          : `${length?.value}`

      const variant = findVariant(product, key)
      if (
        variant &&
        variant.sourceData &&
        variant.sourceData.availableForSale
      ) {
        const price = variant.sourceData.priceV2
        return s()
          .name(length?.value)
          .price((pr) =>
            pr.currency(price?.currencyCode).current(price?.amount),
          )
          .sku(variant.shopifyVariantID)
      }
    })
  } else if (titles && titles.values && titles.values.length > 0) {
    return titles?.values?.map((title) => {
      const key =
        color == 'No Color Option'
          ? `${title?.value}`
          : color
          ? `${color}${DELIMITER}${title?.value}`
          : `${title?.value}`

      const variant = findVariant(product, key)
      if (
        variant &&
        variant.sourceData &&
        variant.sourceData.availableForSale
      ) {
        const price = variant.sourceData.priceV2
        return s()
          .name(title?.value)
          .price((pr) =>
            pr.currency(price?.currencyCode).current(price?.amount),
          )
          .sku(variant.shopifyVariantID)
      }
    })
  } else {
    const key = `${color}`
    const variant = findVariant(product, key)
    if (variant && variant.sourceData && variant.sourceData.availableForSale) {
      const price = variant.sourceData.priceV2
      return [
        s()
          .name(product.title)
          .price((pr) =>
            pr.currency(price?.currencyCode).current(price?.amount),
          )
          .sku(variant.shopifyVariantID),
      ]
    }
  }
}

const getImageUrls = (variant: ShopifyProductVariant): string[] => {
  const sourceDataImages = variant?.sourceData?.image
  return sourceDataImages ? definitely([sourceDataImages.w800]) : []
}

const hydrate = (product: ShopifyProduct, selectedIndex: number, v: any) => {
  const hydratedVariants: any[] = []

  const colors = product?.options?.find((option) => {
    return option?.name === 'Color'
  })

  const sizes = product?.options?.find((option) => {
    return option?.name === 'Size'
  })

  const lengths = product?.options?.find((option) => {
    return option?.name === 'Length'
  })

  const carats = product?.options?.find((option) => {
    return option?.name === 'Carat'
  })

  const titles = product?.options?.find((option) => {
    return option?.name === 'Title'
  })

  if (
    colors &&
    colors.values &&
    colors.values.length == 1 &&
    carats &&
    carats.values &&
    carats.values.length > 0
  ) {
    const sizeValue =
      sizes && sizes.values && sizes.values.length > 0
        ? sizes.values[0]?.value
        : ''
    const lengthValue =
      lengths && lengths.values && lengths.values.length > 0
        ? lengths.values[0]?.value
        : ''
    const titleValue =
      titles && titles.values && titles.values.length > 0
        ? titles.values[0]?.value
        : ''
    const colorValue = colors?.values[0]?.value
    const selected = carats.values.filter((_, index) => {
      if (index == selectedIndex) console.log('SELECTED _', _)
      return index === selectedIndex
    })
    const variants = selected.map((carat) => {
      const caratValue = carat?.value

      const key =
        carats && sizeValue
          ? `${colorValue}${DELIMITER}${caratValue}${DELIMITER}${sizeValue}`
          : carats && lengthValue
          ? `${colorValue}${DELIMITER}${caratValue}${DELIMITER}${lengthValue}`
          : carats && titleValue
          ? `${colorValue}${DELIMITER}${caratValue}${DELIMITER}${titleValue}`
          : `${colorValue}${DELIMITER}${caratValue}`

      console.log('hydrate() carat key', key)
      const variant = findVariant(product, key)
      console.log('VARIANT', variant)
      if (!variant) return

      const imageUrls = getImageUrls(variant)
      console.log('IMAGE URLS', imageUrls)

      const variable = v()
        .attributes((a) => a.colorName(colorValue))
        .imageUrls(imageUrls)
        .sku(variant.shopifyVariantID)
        .name(colorValue)
        .sizes((s) => hydrateSize(product, s, colorValue, caratValue))
      return variable
    })
    hydratedVariants.push(variants)
    console.log('HYDRATED VARIANTS', hydratedVariants)
    return variants
  } else if (colors && colors.values && colors.values.length > 0) {
    const sizeValue =
      sizes && sizes.values && sizes.values.length > 0
        ? sizes.values[0]?.value
        : ''
    const lengthValue =
      lengths && lengths.values && lengths.values.length > 0
        ? lengths.values[0]?.value
        : ''
    const titleValue =
      titles && titles.values && titles.values.length > 0
        ? titles.values[0]?.value
        : ''
    const selected = colors.values.filter((_, index) => {
      return index === selectedIndex
    })
    return selected.map((color) => {
      const colorValue = color?.value

      const key =
        colors && sizeValue
          ? `${colorValue}${DELIMITER}${sizeValue}`
          : colors && lengthValue
          ? `${colorValue}${DELIMITER}${lengthValue}`
          : colors && titleValue
          ? `${colorValue}${DELIMITER}${titleValue}`
          : `${colorValue}${sizeValue}`

      console.log('hydrate() color key', key)
      const variant = findVariant(product, key)
      if (!variant) return

      const imageUrls = getImageUrls(variant)
      return v()
        .attributes((a) => a.colorName(colorValue))
        .imageUrls(imageUrls)
        .sku(variant.shopifyVariantID)
        .name(colorValue)
        .sizes((s) => hydrateSize(product, s, colorValue))
    })
  } else {
    const key =
      sizes && sizes.values && sizes.values.length > 0
        ? sizes.values[0]?.value
        : lengths && lengths.values && lengths.values.length > 0
        ? lengths.values[0]?.value
        : titles && titles.values && titles.values.length > 0
        ? titles.values[0]?.value
        : ''

    if (!key) {
      console.warn('Could not get variant key')
      return
    }
    const variant = findVariant(product, key)
    if (!variant) return
    const imageUrls = getImageUrls(variant)
    const colorValue = 'No Color Option'

    if (sizes && sizes.values && sizes.values.length > 0) {
      return [
        v()
          .sku(variant.shopifyVariantID)
          .name(colorValue)
          .imageUrls(imageUrls)
          .sizes((s) => hydrateSize(product, s, colorValue)),
      ]
    } else if (lengths && lengths.values && lengths.values.length > 0) {
      return [
        v()
          .sku(variant.shopifyVariantID)
          .name(colorValue)
          .imageUrls(imageUrls)
          .sizes((s) => hydrateSize(product, s, colorValue)),
      ]
    } else {
      return [
        v()
          .sku(variant.shopifyVariantID)
          .name(colorValue)
          .imageUrls(imageUrls)
          .sizes((s) => hydrateSize(product, s, colorValue)),
      ]
    }
  }
}

// type Hook = {
//   (product: ShopifyProduct, handle: string, hash: string)
// }

export const setupProductData = (
  product: ShopifyProduct,
  handle: string,
  hash: string,
) => {
  const description =
    product?.sourceData && product?.sourceData?.description
      ? product.sourceData.description
      : ''

  let currency = product?.sourceData?.priceRange?.minVariantPrice?.currencyCode
  currency = currency ? currency : CURRENCY

  const shopifyId = product.shopifyId

  let index = 0
  let title = product.title
  let carat = ''
  const currentVariant = findVariantById(product, hash)

  const colors = product?.options?.find((option) => {
    return option?.name === 'Color'
  })

  const carats = product?.options?.find((option) => {
    return option?.name === 'Carat'
  })

  if (currentVariant) {
    const parts = currentVariant.title?.split(DELIMITER)

    if (colors && colors.values) {
      if (
        carats &&
        carats.values &&
        carats.values.length > 0 &&
        parts &&
        parts?.length > 0
      ) {
        title = parts[0].trim()
        carat = parts[1].trim()
        if (title) {
          index = findOptionIndex(colors.values, title, carats.values, carat)
        }
      } else if (parts && parts?.length > 0) {
        title = parts[0].trim()
        if (title) {
          index = findOptionIndex(colors.values, title)
        }
      }
      console.log('CURRENT VARIANT TITLE', title)
      console.log('CURRENT VARIANT CARAT', carat)
      console.log('CURRENT VARIANT INDEX', index)
      index = index > -1 ? index : 0
    }
  }

  return function (factory) {
    return factory
      .currency(currency)
      .locale(LOCALE)
      .product((p) =>
        p
          .defaultVariationIndex(0)
          .description(description)
          .name(title)
          .sku(shopifyId)
          .variations((v) => hydrate(product, index, v)),
      )
  }
}
