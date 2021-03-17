import * as React from 'react'
import {
  getReferencedDocument,
  getImageThumbnail,
  blocksToPlainText,
} from '../utils'
import { BlockPreview } from '../components/BlockPreview'

const getPreviewValues = async (values) => {
  const { body, ctaText, media, link } = values
  const getTitle = async () => {
    if (body && body.length) return blocksToPlainText(title)
    if (ctaText) return ctaText
    return undefined
  }
  const getLinkTitle = async () => {
    if (link && link.length) {
      const ref = link[0].document._ref
      const page = await getReferencedDocument(ref)
      if (page && page.title) return `🔗 ${page.title}`
    }
    return undefined
  }
  const [src, inferredTitle, linkTitle] = await Promise.all([
    getImageThumbnail(media),
    getTitle(),
    getLinkTitle(),
  ])

  const title = inferredTitle ? inferredTitle : linkTitle || '(no text)'
  const subtitles = title === linkTitle ? [] : [linkTitle]
  return {
    src,
    title,
    subtitles,
  }
}

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
      body: 'body',
      ctaText: 'ctaText',
      media: 'backgroundImage',
      link: 'link',
    },
    component: (props) => (
      <BlockPreview {...props} getPreviewValues={getPreviewValues} />
    ),
  },
}
