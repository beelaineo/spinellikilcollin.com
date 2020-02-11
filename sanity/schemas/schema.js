import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import { saneShopify } from '@sane-shopify/sanity-plugin'
import * as documents from './documents'
import * as objects from './objects'
import { product, productOptionValue } from './saneShopify/product'
import { collection } from './saneShopify/collection'

const saneShopifySchema = saneShopify({
  product,
  collection,
  productOptionValue,
})

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    ...Object.values(documents),
    ...Object.values(objects),
    ...saneShopifySchema,
  ]),
})
