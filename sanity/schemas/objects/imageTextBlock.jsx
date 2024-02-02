import * as React from 'react'
import {BlockPreview} from '../../components/BlockPreview'
import {defineField, defineType} from 'sanity'

export const imageTextBlock = defineType({
  name: 'imageTextBlock',
  type: 'object',
  title: 'Image + Text Block',
  // components: {
  //   preview: BlockPreview,
  // },
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
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'array',
      of: [{type: 'internalLink'}, {type: 'externalLink'}, {type: 'pdfLink'}],
    }),
    defineField({
      name: 'textPosition',
      title: 'text position',
      type: 'position',
    }),
    defineField({
      name: 'textColor',
      title: 'text color',
      type: 'colorPicker',
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
      name: 'cloudinaryVideo',
      title: 'Cloudinary Video',
      type: 'cloudinaryVideo',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'richImage',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'colorPicker',
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'richImage',
    }),
  ],
  preview: {
    select: {
      body: 'body',
      ctaText: 'ctaText',
      media: 'backgroundImage',
      link: 'link',
    },
  },
})
