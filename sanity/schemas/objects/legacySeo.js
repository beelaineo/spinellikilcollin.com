import {defineField, defineType} from 'sanity'

export const legacySeo = defineType({
  title: 'SEO & Accessibility',
  name: 'legacySeo',
  type: 'object',
  fields: [
    defineField({
      title: 'SEO: Page Title',
      name: 'title',
      type: 'string',
      description: 'title for the browser window',
    }),
    defineField({
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'title for search results',
    }),
    defineField({
      title: 'SEO: Description',
      name: 'description',
      type: 'text',
      description:
        'This is the description that will appear underneath the preview link when shared in Facebook. It should be less than 200 characters',
    }),
    defineField({
      title: 'SEO: Image',
      name: 'image',
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
})
