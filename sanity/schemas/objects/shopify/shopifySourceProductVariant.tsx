import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopifySourceProductVariant',
  title: 'Shopify',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'availableForSale',
      title: 'Available for sale',
      type: 'boolean',
    }),
    defineField({
      name: 'currentlyNotInStock',
      title: 'Currently not in stock',
      type: 'boolean',
    }),
    defineField({
      name: 'compareAtPriceV2',
      title: 'Compare at price',
      type: 'shopifyPrice',
    }),
    defineField({
      name: 'priceV2',
      title: 'Price',
      type: 'shopifyPrice',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      title: 'Shopify Variant Image',
      name: 'image',
      type: 'shopifyVariantImage',
    }),
    // Selected Options
    defineField({
      name: 'selectedOptions',
      title: 'Selected Options',
      type: 'array',
      of: [
        {
          type: 'shopifySourceSelectedOption',
        },
      ],
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'array',
      of: [
        {
          type: 'shopifyMetafield',
        },
      ],
    }),
    defineField({
      name: 'requiresShipping',
      title: 'Requires Shipping',
      type: 'boolean',
    }),
    // SKU
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    // Weight
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'number',
    }),
    defineField({
      name: 'weightUnit',
      title: 'Weight Unit',
      type: 'string',
    }),
    // Deleted
    // defineField({
    //   name: 'isDeleted',
    //   title: 'Deleted from Shopify?',
    //   type: 'boolean',
    // }),
  ],
  readOnly: true,
})
