import {Stack} from '@sanity/ui'
import {defineField, defineType} from 'sanity'

export const carousel = defineType({
  name: 'carousel',
  title: 'Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      description:
        'Create a carousel from a collection. If a collection is used, items linked to below be ignored.',
      to: [{type: 'collection'}, {type: 'shopifyCollection'}],
    }),
    defineField({
      name: 'items',
      title: 'Carousel Items',
      type: 'array',
      of: [{type: 'richPageLink'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
      collection: 'collection',
    },
    // @ts-ignore
    prepare({title, items, collection}) {
      return {
        title: title ? `Carousel: ${title}` : '🎠 Carousel',
        subtitle:
          items && items.length ? `${items.length} Items` : collection ? 'Collection' : undefined,
        media: <Stack>🎠</Stack>,
      }
    },
  },
})
