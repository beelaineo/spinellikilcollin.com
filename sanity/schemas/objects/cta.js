import * as React from 'react'
import {BlockPreview} from '../components/BlockPreview'
import {actionTypes} from './shared'
import {getTypeText, getReferencedDocument, getShopifyThumbnail} from '../utils'

const getActionTitle = (action) => {
  const actionType = actionTypes.find(
    (a) => a.value === action || a.title === action,
  )
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
  if (values.link_external) {
    const subtitles = [`🔗 External Link: ${values.link_external.url}`].filter(
      Boolean,
    )

    return {
      title: label,
      subtitles,
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
  return {
    title: label || '(Untitled)',
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
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
          { title: 'Action', value: 'action' },
        ],
      },
    },
    {
      type: 'internalLink',
      name: 'link',
      title: 'Internal Link',
      hidden: ({ parent }) => parent.linkType !== 'internal',
    },
    {
      type: 'externalLink',
      name: 'link_external',
      title: 'External Link',
      hidden: ({ parent }) => parent.linkType !== 'external',
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
      hidden: ({ parent }) => parent.linkType !== 'action',
    },
    {
      name: 'bambuser',
      type: 'bambuserSettings',
      title: 'Bambuser Action settings',
      hidden: true,
    },
  ],

  preview: {
    select: {
      link: 'link',
      link_external: 'link_external',
      label: 'label',
      action: 'action',
    },
    component: (props) => (
      <BlockPreview {...props} getPreviewValues={getPreviewValues} />
    ),
  },
}
