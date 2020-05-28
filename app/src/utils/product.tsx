import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyProductOptionValue,
  ShopifyProductOption,
  Maybe,
  Image,
} from '../types'
import { definitely } from '../utils'

export const getSwatchOptions = (
  options?: Maybe<Array<Maybe<ShopifyProductOption>>>,
): ShopifyProductOption[] =>
  definitely(options).filter(({ values }) =>
    definitely(values).every(({ swatch }) => Boolean(swatch && swatch.asset)),
  )

export const getSwatchImages = ({ values }: ShopifyProductOption): Image[] =>
  definitely(values)
    .map(({ swatch }) => swatch)
    .reduce<Image[]>((acc, o) => (o ? [...acc, o] : acc), [])

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
      definitely(variantSelectedOptions).some(
        (vso) => currentOption.name === vso.name && co.value === vso.value,
      ),
    )
    return [...acc, ...currentOptionValues]
  }, [])
  return definitely(selectedOptionValues)
}
