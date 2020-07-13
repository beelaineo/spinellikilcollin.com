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
  fields: [
    {
      name: 'body',
      title: 'Text',
      type: 'richText',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'internalLink',
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'number',
      hidden: true,
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
      name: 'textPosition',
      title: 'Text Position',
      type: 'position',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'colorPicker',
    },
    {
      name: 'cloudinaryVideo',
      title: 'Cloudinary Video',
      type: 'cloudinaryVideo',
    },
    {
      name: 'cloudinaryVideoMobile',
      title: 'Cloudinary Video (mobile)',
      type: 'cloudinaryVideo',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'richImage',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'colorPicker',
    },
    {
      name: 'mobileImage',
      title: 'Background Image (mobile)',
      type: 'richImage',
    },
    {
      name: 'mobileBackgroundColor',
      title: 'Background Color',
      type: 'colorPicker',
    },
    {
      name: 'textPositionMobile',
      title: 'Text Position (Mobile)',
      type: 'position',
    },
    {
      name: 'textColorMobile',
      title: 'Text Color (Mobile)',
      type: 'colorPicker',
    },
  ],
  preview: {
    select: {
      title: 'body',
      image: 'image',
      link: 'link',
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
