import * as React from 'react'
import {defineField, defineType} from 'sanity'

export const pdfLink = defineType({
  title: '📄 PDF',
  description: 'Link to a PDF',
  name: 'pdfLink',
  type: 'object',
  blockEditor: {
    icon: () => (
      <span role="img" aria-label="PDF Link" style={{fontSize: '1em'}}>
        📄
      </span>
    ),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      accept: '.pdf',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      filename: 'pdf.asset.originalFilename',
    },
    prepare: ({title, filename}) => {
      return {
        title: title,
        subtitle: filename,
      }
    },
  },
})
