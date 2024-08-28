import * as React from 'react'
import {actionTypes} from './shared'

export const textAction = {
  name: 'textAction',
  title: 'Action',
  type: 'object',
  description: 'Have the selected text launch an action when clicked',
  blockEditor: {
    icon: () => (
      <span role="img" aria-label="Link" style={{fontSize: '1em'}}>
        🚀
      </span>
    ),
  },
  fields: [
    {
      name: 'actionType',
      title: 'Action Type',
      type: 'string',
      options: {
        list: actionTypes,
      },
    },
  ],
  preview: {
    select: {
      actionType: 'actionType',
    },
    prepare: ({actionType}) => {
      return {
        title: actionType,
        subtitle: 'Action',
      }
    },
  },
}
