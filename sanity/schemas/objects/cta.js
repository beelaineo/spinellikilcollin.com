import * as React from 'react'
import { BlockPreview } from '../components/BlockPreview'
import {
  getTypeText,
  getReferencedDocument,
  getShopifyThumbnail,
} from '../utils'

const getPreviewValues = async (values) => {
  const { document } = values.link

  if (!document || !document._ref) {
    return { title: '(empty)' }
  }
  const doc = await getReferencedDocument(document._ref)
  const src =
    doc && (doc._type === 'shopifyProduct' || doc._type === 'shopifyCollection')
      ? getShopifyThumbnail(doc)
      : undefined

  const subtitles = [
    `🔗 ${getTypeText(doc)}: ${doc.title}`,
    doc && doc.archived === true
      ? `🛑 This collection is archived and will not be displayed on the site.`
      : undefined,
  ].filter(Boolean)

  return {
    src,
    title: doc.title,
    subtitles,
  }
}

export const cta = {
  name: 'cta',
  title: 'CTA Button',
  type: 'object',
  icon: () => (
    <span role="img" aria-label="Link" style={{ fontSize: '3em' }}>
      🔗
    </span>
  ),
  fields: [
    {
      name: 'label',
      type: 'string',
      label: 'Label',
      validation: (Rule) => Rule.required().max(25),
    },
    {
      type: 'internalLink',
      name: 'link',
      options: {
        required: true,
      },
    },
  ],

  preview: {
    select: {
      link: 'link',
      label: 'label',
    },
    component: (props) => (
      <BlockPreview {...props} getPreviewValues={getPreviewValues} />
    ),
  },
}
