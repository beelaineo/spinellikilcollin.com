import React from 'react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo.page',
  title: 'SEO',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'placeholderString',
      //@ts-ignore
      description: (
        <>
          If empty, displays the document title (<code>title</code>)
        </>
      ),
      options: {field: 'title'},
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines'),
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
      type: 'seo.description',
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
})
