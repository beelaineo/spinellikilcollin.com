import * as documents from './documents'
import * as objects from './objects'
import { product, productOptionValue } from './saneShopify/product'
import { collection } from './saneShopify/collection'

export default [
  ...Object.values(documents),
  ...Object.values(objects),
  product,
  collection,
  productOptionValue,
]
