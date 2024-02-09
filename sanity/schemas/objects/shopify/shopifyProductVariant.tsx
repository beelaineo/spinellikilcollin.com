import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopifyProductVariant',
  title: 'Shopify Product Variant',
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
    // Shopify Variant ID
    defineField({
      name: 'shopifyVariantID',
      title: 'Shopify Variant ID',
      type: 'string',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    // Deleted
    defineField({
      name: 'isDeleted',
      title: 'Deleted from Shopify?',
      type: 'boolean',
    }),
    defineField({
      name: 'sourceData',
      title: 'Source Data',
      type: 'shopifySourceProductVariant',
    }),
    // defineField({
    //   name: 'store',
    //   title: 'Source Data',
    //   type: 'shopifyProductVariantStore',
    // }),
  ],
  readOnly: true,
  preview: {
    select: {
      title: 'title',
      subtitle: 'id',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle,
      }
    },
  },
})
