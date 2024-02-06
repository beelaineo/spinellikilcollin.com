import {defineField, defineType} from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  initialValue: {
    alignment: 'center',
    layout: 'normal',
  },
  fields: [
    defineField({
      name: 'body',
      title: 'Text',
      type: 'richText',
      description: 'Tip: Use shift+return for a soft-wrapping line',
    }),
    defineField({
      name: 'body_mobile',
      title: 'Text (Mobile)',
      description: 'Text substitute shown on mobile devices (optional)',
      type: 'richText',
    }),
    defineField({
      name: 'textColor',
      title: 'text color',
      type: 'colorPicker',
    }),
    defineField({
      name: 'alignment',
      type: 'string',
      title: 'Text Alignment',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
          {title: 'Justify', value: 'justify'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Full Width', value: 'fullWidth'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'richImage',
    }),
  ],
  preview: {
    select: {
      body: 'body',
      backgroundImage: 'backgroundImage',
    },
    prepare: ({body, backgroundImage}) => {
      body = body[0].children[0].text || '(no text)'
      return {
        title: body,
        subtitle: 'text block',
        media: backgroundImage,
      }
    },
  },
})
