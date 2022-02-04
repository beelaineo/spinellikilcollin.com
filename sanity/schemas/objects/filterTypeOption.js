import * as React from 'react'
import { groupBy, prop } from 'ramda'
import { IoIosListBox } from 'react-icons/io'

export const FilterTypeOption = {
  name: 'filterTypeOption',
  type: 'object',
  title: 'Type Option',
  icon: IoIosListBox,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      options: {
        required: true,
      },
    },
    {
      title: 'Type Option Value',
      name: 'value',
      type: 'string',
      description:
        'The value of the type option (corresponds to the Product Type that will be included in the filter, e.g. "Rings")',
      options: {
        required: true,
      },
    },
    {
      name: 'filterTypeOptionChildren',
      title: 'Filter Type Option Children',
      description:
        'Child type options that will be conditionally displayed when this filter type option is selected',
      type: 'array',
      of: [
        {
          type: 'filterTypeOptionChild',
        },
      ],
    },
  ],
}

export const filterTypeOptionChild = {
  title: 'Filter Type Option Child',
  name: 'filterTypeOptionChild',
  type: 'object',
  icon: IoIosListBox,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Type Option Value',
      name: 'value',
      type: 'string',
    },
  ],
}
