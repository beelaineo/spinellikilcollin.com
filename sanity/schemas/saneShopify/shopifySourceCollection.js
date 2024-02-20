import {defineField, defineType} from 'sanity'

export const shopifySourceCollection = defineType({
  title: 'Shopify source collection data',
  name: 'shopifySourceCollection',
  type: 'object',
  hidden: true,
  readOnly: true,
  fields: [
    defineField({name: 'id', type: 'string', hidden: true}),
    defineField({name: 'handle', type: 'string', hidden: true}),
    defineField({name: 'title', type: 'string', hidden: true}),
    defineField({name: 'image', type: 'shopifySourceImage', hidden: true}),
    defineField({name: 'description', type: 'text', hidden: true}),
    defineField({name: 'descriptionHtml', type: 'text', hidden: true}),
    defineField({name: 'updatedAt', type: 'date', hidden: true}),
    defineField({name: 'products', type: 'shopifySourceProductsConnection', hidden: true}),
  ],
})
