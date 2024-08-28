import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopifyCollectionImage',
  title: 'Shopify Image',
  type: 'object',
  readOnly: true,
  fields: [
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'src',
      title: 'Source',
      type: 'string',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
    }),
  ],
})
