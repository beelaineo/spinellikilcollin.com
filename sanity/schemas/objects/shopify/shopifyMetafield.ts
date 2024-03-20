import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopifyMetafield',
  title: 'Metafield',
  type: 'object',
  options: {
    columns: 2,
  },
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
    }),
    defineField({
      name: 'namespace',
      title: 'Namespace',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
  ],
})
