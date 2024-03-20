import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  title: 'Homepage',
  type: 'document',
  name: 'homepage',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'hero'}, {type: 'carousel'}, {type: 'imageTextBlock'}],
    }),
    defineField({
      name: 'header_color',
      type: 'header_color',
      initialValue: 'dark',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage',
    }),
  },
})
