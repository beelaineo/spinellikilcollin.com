import * as React from 'react'
import { BlockPreview } from '../components/BlockPreview'
import { actionTypes } from './shared'
import {
  getTypeText,
  getReferencedDocument,
  getShopifyThumbnail,
} from '../utils'

const getActionTitle = (action) => {
  const actionType = actionTypes.find((a) => a.value === action)
  if (!actionType) {
    throw new Error(`"${action}" is not a valid CTA action`)
  }
  return actionType.title
}

const getPreviewValues = async (values) => {
  const { action, label } = values

  if (action) {
    return {
      title: label,
      subtitles: [getActionTitle(action)],
    }
  }

  if (values.link) {
    const { document } = values.link
    if (!document || !document._ref) {
      return { title: '(empty)' }
    }
    const doc = await getReferencedDocument(document._ref)
    const src =
      doc &&
      (doc._type === 'shopifyProduct' || doc._type === 'shopifyCollection')
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
    },
    {
      name: 'action',
      title: 'Action',
      description:
        'Have this CTA launch an action instead of linking to a page. For launching Bambuser, make sure you fill out the Bambuser Settings below. (If selected, this will override any linked document)',
      type: 'string',
      options: {
        list: actionTypes,
      },
    },
    {
      name: 'bambuser',
      type: 'bambuserSettings',
      title: 'Bambuser Action settings',
    },
  ],

  preview: {
    select: {
      link: 'link',
      label: 'label',
      action: 'action',
    },
    component: (props) => (
      <BlockPreview {...props} getPreviewValues={getPreviewValues} />
    ),
  },
}
