import * as React from 'react'
import {defineField, defineType} from 'sanity'

export const inStockFilter = defineType({
  name: 'inStockFilter',
  title: 'In Stock Filter',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Currently In Stock Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      label: 'label',
    },
    prepare: ({label}) => {
      return {
        title: 'In Stock Filter',
        subtitle: `${label}`,
      }
    },
  },
})
