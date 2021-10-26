export const embedBlock = {
  name: 'embedBlock',
  type: 'object',
  title: 'iframe Embed',
  fields: [
    {
      name: 'title',
      title: 'Label',
      type: 'string',
      description: 'Descriptive title (for internal purposes)',
    },
    {
      name: 'url',
      type: 'url',
      title: 'iframe source URL',
      description: 'https://meetings.hubspot.com/MEETING_SLUG',
    },
    {
      name: 'layout',
      type: 'string',
      title: 'Layout',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Full Width', value: 'fullWidth' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
    },
    prepare: ({ title, layout }) => {
      title = title || 'Untitled'
      return {
        title: title,
        subtitle: layout,
      }
    },
  },
}
