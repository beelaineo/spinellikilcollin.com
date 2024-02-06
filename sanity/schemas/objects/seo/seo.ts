import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'Defaults for every page',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'title for search results',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Best dimensions: 1200 x 600px',
    }),
    defineField({
      title: 'Keywords',
      name: 'keywords',
      type: 'string',
      description: 'Comma-separated SEO keywords',
    }),
  ],
  validation: (Rule) => Rule.required(),
})
