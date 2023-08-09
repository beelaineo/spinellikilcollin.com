import * as React from 'react'
import { BlockPreview } from '../components/BlockPreview'
import {
  getImageThumbnail,
  getReferencedDocument,
  blocksToPlainText,
} from '../utils'

const getPreviewValues = async (values) => {
  const { title, image, link } = values

  const linkedDoc = link
    ? await getReferencedDocument(link.document._ref)
    : undefined

  const subtitles = [
    //
    linkedDoc ? `🔗 ${linkedDoc.title}` : undefined,
  ].filter(Boolean)

  const src = await getImageThumbnail(image)

  return {
    title,
    subtitles: subtitles.slice(0, 1),
    src,
  }
}

export const hero = {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fieldsets: [
    { name: 'display', title: 'Layout & Colors' },
    { name: 'image', title: 'Image' },
    { name: 'video', title: 'Video' },
  ],
  fields: [
    {
      name: 'heroLink',
      title: 'Link',
      type: 'internalLink',
    },
    {
      name: 'body',
      title: 'Text',
      type: 'richText',
    },
    {
      name: 'body_mobile',
      title: 'Text (Mobile)',
      description: 'Text substitute shown on mobile devices (optional)',
      type: 'richText',
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'array',
      of: [{ type: 'cta' }],
      validation: (Rule) => Rule.max(1),
    },

    /* Display Options */
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'number',
      hidden: true,
      fieldset: 'display',
      options: {
        list: [
          { title: '2:1', value: 0.5 },
          { title: '16:9', value: 0.5625 },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'header_color',
      type: 'header_color',
      initialValue: 'dark',
    },
    {
      name: 'layout',
      title: 'Layout Mode',
      description:
        'Change the layout and alignment mode of the hero elements (Default: Full Width)',
      type: 'string',
      fieldset: 'display',
      initialValue: 'full',
      options: {
        list: [
          { title: 'Full Width: Text over Image', value: 'full' },
          { title: 'Flex: Text / Image', value: 'flex-left' },
          { title: 'Flex: Image / Text', value: 'flex-right' },
        ],
      },
    },
    {
      name: 'textContainer',
      title: 'Text Container Size',
      description:
        'Limit the size of the text container. (Default: Full Width)',
      type: 'string',
      fieldset: 'display',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Half-left', value: 'half-left' },
          { title: 'Half-right', value: 'half-right' },
          { title: 'Half-top', value: 'half-left' },
          { title: 'Half-bottom', value: 'half-right' },
        ],
      },
    },
    {
      name: 'textXL',
      label: 'Text Oversized',
      type: 'boolean',
      description:
        'Extra-large heading text size for banners (for use with H1)',
    },
    {
      name: 'textPosition',
      title: 'Text Position',
      type: 'position',
      fieldset: 'display',
    },
    {
      name: 'textPositionMobile',
      title: 'Text Position (Mobile)',
      type: 'position',
      fieldset: 'display',
    },

    {
      name: 'textColor',
      title: 'Text Color',
      type: 'colorPicker',
      fieldset: 'display',
    },
    {
      name: 'textColorCustom',
      title: 'Text Color (custom)',
      type: 'color',
      fieldset: 'display',
      hidden: ({ parent }) => parent.textColor !== 'custom',
    },
    {
      name: 'textColorMobile',
      title: 'Text Color (mobile)',
      type: 'colorPicker',
      fieldset: 'display',
    },
    {
      name: 'textColorMobileCustom',
      title: 'Text Color (mobile, custom)',
      type: 'color',
      fieldset: 'display',
      hidden: ({ parent }) => parent.textColorMobile !== 'custom',
    },

    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'colorPicker',
      fieldset: 'display',
    },
    {
      name: 'backgroundColorCustom',
      title: 'Background Color (custom)',
      type: 'color',
      fieldset: 'display',
      hidden: ({ parent }) => parent.backgroundColor !== 'custom',
    },
    {
      name: 'mobileBackgroundColor',
      title: 'Background Color (mobile)',
      type: 'colorPicker',
      fieldset: 'display',
    },
    {
      name: 'mobileBackgroundColorCustom',
      title: 'Background Color (mobile, custom)',
      type: 'color',
      fieldset: 'display',
      hidden: ({ parent }) => parent.mobileBackgroundColor !== 'custom',
    },

    /* Video */
    {
      name: 'cloudinaryVideo',
      title: 'Cloudinary Video',
      type: 'cloudinaryVideo',
      fieldset: 'video',
    },
    {
      name: 'cloudinaryVideoMobile',
      title: 'Cloudinary Video (mobile)',
      type: 'cloudinaryVideo',
      fieldset: 'video',
    },
    /* Images */
    {
      name: 'image',
      title: 'Background Image',
      type: 'richImage',
      fieldset: 'image',
    },
    {
      name: 'mobileImage',
      title: 'Background Image (mobile)',
      type: 'richImage',
      fieldset: 'image',
    },
  ],
  preview: {
    select: {
      title: 'body',
      image: 'image',
      link: 'heroLink',
    },
    prepare: (values) => {
      return {
        ...values,
        title: blocksToPlainText(values.title),
      }
    },

    component: (props) => (
      <BlockPreview {...props} getPreviewValues={getPreviewValues} />
    ),
  },
}
