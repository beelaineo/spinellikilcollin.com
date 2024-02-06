import React from 'react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo.shopify',
  title: 'SEO',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'placeholderString',
      // @ts-ignore
      description: (
        <>
          If empty, displays the default Shopify document title (<code>store.title</code>)
        </>
      ),
      options: {
        field: 'store.title',
      },
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines'),
    },
    defineField({
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'title for search results',
    }),
    {
      name: 'description',
      title: 'Description',
      type: 'seo.description',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    defineField({
      title: 'Keywords',
      name: 'keywords',
      type: 'string',
      description: 'Comma-separated SEO keywords',
    }),
  ],
})
