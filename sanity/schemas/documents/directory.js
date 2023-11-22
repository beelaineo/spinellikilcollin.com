import * as React from 'react'
import { FaList } from 'react-icons/fa'

export const directory = {
  type: 'document',
  name: 'directory',
  title: 'Directory Page',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      label: 'Page URL',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
    },
    {
      name: 'pageLinks',
      title: 'Page Blocks',
      type: 'array',
      of: [{ type: 'pageLink' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => {
      return {
        media: <FaList />,
        title,
        // media: <span style={{ fontSize: '1.5rem' }}>{'🎫'}</span>,
      }
    },
  },
}
