export const textBlock = {
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  initialValue: {
    alignment: 'center',
    layout: 'normal',
  },
  fields: [
    {
      name: 'body',
      title: 'Text',
      type: 'richText',
      description: 'Tip: Use shift+return for a soft-wrapping line',
    },
    {
      name: 'textColor',
      title: 'text color',
      type: 'colorPicker',
    },
    {
      name: 'alignment',
      type: 'string',
      title: 'Text Alignment',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'Justify', value: 'justify' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
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
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'richImage',
    },
  ],
  preview: {
    select: {
      title: 'body.0',
    },
    prepare: ({ title }) => {
      title = title.children[0].text || '(no text)'
      return {
        title: title,
      }
    },
  },
}
