import {defineField, defineType} from 'sanity'

export const shopifySourceProduct = defineType({
  title: 'Shopify source data',
  name: 'shopifySourceProduct',
  type: 'object',
  hidden: true,
  readOnly: true,
  fields: [
    defineField({name: 'id', type: 'string'}),
    defineField({name: 'handle', type: 'string'}),
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'availableForSale', type: 'boolean'}),
    defineField({name: 'createdAt', type: 'date'}),
    defineField({name: 'publishedAt', type: 'date'}),
    defineField({name: 'updatedAt', type: 'date'}),
    defineField({name: 'compareAtPriceRange', type: 'shopifySourceProductPriceRange'}),
    defineField({name: 'priceRange', type: 'shopifySourceProductPriceRange'}),
    defineField({
      name: 'presentmentPriceRanges',
      type: 'shopifySourceProductPresentmentPriceRangeConnection',
    }),
    defineField({name: 'productType', type: 'string'}),
    defineField({name: 'tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'vendor', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'descriptionHtml', type: 'text'}),
    defineField({name: 'images', type: 'shopifySourceImages'}),
    defineField({name: 'options', type: 'array', of: [{type: 'shopifySourceProductOption'}]}),
    defineField({name: 'variants', type: 'shopifySourceProductVariantsConnection'}),
    defineField({name: 'collections', type: 'shopifySourceCollectionsConnection'}),
  ],
})
