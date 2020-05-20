import * as React from 'react'

export const defaultExternalLink = {
  type: 'object',
  name: 'link',
  options: {
    editModal: 'popover',
  },
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'Url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'tel', 'mailto'],
          allowRelative: true,
        }),
    },
  ],
}

export const textAction = {
  name: 'textAction',
  title: 'Action',
  type: 'object',
  description: 'Have the selected text launch an action when clicked',
  blockEditor: {
    icon: () => (
      <span role="img" aria-label="Link" style={{ fontSize: '1em' }}>
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
        list: [
          { title: 'Open Cart', value: 'openCart' },
          {
            title: 'Launch Customization modal',
            value: 'launchCustomizationModal',
          },
        ],
      },
    },
  ],
}

export const richText = {
  name: 'richText',
  label: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          { name: 'link', type: 'link', title: 'External Link' },
          {
            name: 'internalLink',
            type: 'internalLink',
            title: 'Internal Link',
          },
          {
            name: 'action',
            type: 'textAction',
            title: 'Action',
          },
        ],
      },
    },
    { type: 'richImage' },
  ],
}
