import {PreviewValue, defineField, defineType} from 'sanity'

export const journalPage = defineType({
  title: 'Journal (Main Page)',
  type: 'document',
  name: 'journalPage',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
