import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopifyPrice',
  title: 'Price',
  type: 'object',
  options: {
    columns: 2,
  },
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'currencyCode',
      title: 'Currency code',
      type: 'string',
    }),
  ],
})
