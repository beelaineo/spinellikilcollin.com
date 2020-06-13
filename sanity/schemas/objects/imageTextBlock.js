import { blocksToPlainText } from '../utils'

export const imageTextBlock = {
  name: 'imageTextBlock',
  type: 'object',
  title: 'Image + Text Block',
  fields: [
    {
      name: 'body',
      title: 'Text',
      type: 'richText',
      description: 'Tip: Use shift+return for a soft-wrapping line',
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    },
    {
      name: 'link',
      type: 'array',
      of: [{ type: 'internalLink' }, { type: 'externalLink' }],
    },
    {
      name: 'textPosition',
      title: 'text position',
      type: 'position',
    },
    {
      name: 'textColor',
      title: 'text color',
      type: 'colorPicker',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cloudinaryVideo',
      title: 'Cloudinary Video',
      type: 'cloudinaryVideo',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'richImage',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'colorPicker',
    },
    {
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'richImage',
    },
  ],
  preview: {
    select: {
      title: 'body',
      media: 'backgroundImage',
    },
    prepare: ({ title, media }) => {
      return {
        media,
        title: title && title.length ? blocksToPlainText(title) : '(no text)',
      }
    },
  },
}
