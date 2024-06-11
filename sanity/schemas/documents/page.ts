import {defineField, defineType} from 'sanity'

export const page = defineType({
  title: 'Page',
  type: 'document',
  name: 'page',
  fieldsets: [
    {
      name: 'integrations',
      title: 'Integrations',
      options: {collapsed: true, collapsible: true},
    },
  ],
  fields: [
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
      name: 'hideTitle',
      title: 'Hide Title',
      type: 'boolean',
    }),
    defineField({
      name: 'hero',
      type: 'hero',
    }),
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      of: [{type: 'carousel'}, {type: 'imageTextBlock'}, {type: 'textBlock'}, {type: 'embedBlock'}],
    }),
    defineField({
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width',
      description: 'When on, padding above and below the content blocks will be removed',
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
})
