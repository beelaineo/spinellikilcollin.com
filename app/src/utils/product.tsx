import { ShopifyProductOption, Maybe, Image } from '../types'
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
