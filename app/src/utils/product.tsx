import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyProductOptionValue,
  ShopifyProductOption,
  Maybe,
  Image,
} from '../types'
import { definitely } from '../utils'

export const isValidSwatchOption = (option: ShopifyProductOption): boolean =>
  definitely(option.values).every(({ swatch }) =>
    Boolean(swatch && swatch.asset),
  )

export const getSwatchOptions = (
  options?: Maybe<Array<Maybe<ShopifyProductOption>>>,
): ShopifyProductOption[] =>
  definitely(options).filter((option) => isValidSwatchOption(option))

export const getSwatchImages = ({ values }: ShopifyProductOption): Image[] =>
  definitely(values)
    .map(({ swatch }) => swatch)
    .reduce<Image[]>((acc, o) => (o ? [...acc, o] : acc), [])

export const optionMatchesVariant = (
  optionName: string,
  option: ShopifyProductOptionValue,
  variant: ShopifyProductVariant,
): boolean =>
  definitely(variant?.sourceData?.selectedOptions).some(
    (vso) => optionName === vso.name && option.value === vso.value,
  )

export const getSelectedOptionValues = (
  product: ShopifyProduct,
  variant: ShopifyProductVariant,
): ShopifyProductOptionValue[] => {
  const variantSelectedOptions = variant?.sourceData?.selectedOptions
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
