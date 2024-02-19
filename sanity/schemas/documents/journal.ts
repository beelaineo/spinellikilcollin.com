import {PreviewValue, defineField, defineType} from 'sanity'
import {niceDate} from '../utils'

export const journal = defineType({
  title: 'Journal Entry',
  type: 'document',
  name: 'journalEntry',
  fields: [
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'richImage',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      createdAt: '_createdAt',
      publishDate: 'publishDate',
      title: 'title',
      thumbnail: 'thumbnail',
    },
    prepare: ({title, publishDate, createdAt, thumbnail}) => ({
      title: title,
      subtitle: niceDate(publishDate || createdAt),
      media: thumbnail,
    }),
  },
  orderings: [
    {
      title: 'Publish Date',
      name: 'publishDateDesc',
      by: [
        {field: 'publishDate', direction: 'desc'},
        {field: '_createdAt', direction: 'desc'},
      ],
    },
  ],
})
