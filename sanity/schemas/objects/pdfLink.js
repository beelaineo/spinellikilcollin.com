import * as React from 'react'

export const pdfLink = {
  title: '📄 PDF',
  description: 'Link to a PDF',
  name: 'pdfLink',
  type: 'object',
  blockEditor: {
    icon: () => (
      <span role="img" aria-label="PDF Link" style={{ fontSize: '1em' }}>
        📄
      </span>
    ),
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      accept: '.pdf',
    },
  ],
  preview: {
    select: {
      title: 'title',
      filename: 'pdf.asset.originalFilename',
    },
    prepare: ({ title, filename }) => {
      return {
        title: title,
        subtitle: filename,
      }
    },
  },
}
