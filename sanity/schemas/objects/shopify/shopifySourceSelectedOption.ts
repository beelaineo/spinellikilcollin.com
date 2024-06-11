import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopifySourceSelectedOption',
  title: 'Option',
  type: 'object',
  options: {
    columns: 2,
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
  ],
})
