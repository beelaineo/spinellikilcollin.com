import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import { saneShopifyObjects } from '@sane-shopify/sanity-plugin'
import * as documents from './documents'
import * as objects from './objects'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    ...Object.values(documents),
    ...Object.values(objects),
    ...saneShopifyObjects,
  ]),
})
