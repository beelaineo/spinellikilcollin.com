import * as React from 'react'
import {groupBy, prop} from 'ramda'
import {IoIosListBox, IoIosLink} from 'react-icons/io'
import {BlockPreview} from '../components/BlockPreview'
import {getReferencedDocument, getShopifyThumbnail} from '../utils'
import {actionTypes} from './shared'

const getPreviewValues = async (values) => {
  const {link, label, link_external, action, linkType} = values
  if (!link && !link_external && !action) return {title: 'Missing Link'}

  const linkedDoc = !(!link || !link.document || !link.document._ref)
    ? await getReferencedDocument(link.document._ref)
    : undefined

  const shopifyThumbnail =
    linkedDoc && (linkedDoc._type === 'shopifyProduct' || linkedDoc._type === 'shopifyCollection')
      ? getShopifyThumbnail(linkedDoc)
      : undefined

  const subtitles = [
    action ? `🔗 Action: ${action}` : null,
    link_external ? `🔗 External Link: ${link_external.url}` : null,
    linkedDoc ? `🔗${linkedDoc.title}` : null,
    linkedDoc && linkedDoc.archived === true
      ? `🛑 This collection is archived and will not be displayed on the site.`
      : undefined,
  ].filter(Boolean)

  return {
    title: label || linkedDoc.title,
    subtitles,
    src: shopifyThumbnail,
  }
}

export const MenuLink = {
  name: 'menuLink',
  type: 'object',
  title: 'Link',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
    },
    {
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      initialValue: 'internal',
      options: {
        required: true,
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
          {title: 'Action', value: 'action'},
        ],
      },
    },
    {
      type: 'internalLink',
      name: 'link',
      title: 'Internal Link',
      hidden: ({parent}) => parent.linkType !== 'internal',
    },
    {
      type: 'externalLink',
      name: 'link_external',
      title: 'External Link',
      hidden: ({parent}) => parent.linkType !== 'external',
    },
    {
      name: 'action',
      title: 'Action',
      description:
        'Have this link launch an action instead of linking to a page. (If selected, this will override any linked document)',
      type: 'string',
      options: {
        list: actionTypes,
      },
      hidden: ({parent}) => parent.linkType !== 'action',
    },
  ],
  preview: {
    select: {
      link: 'link',
      label: 'label',
      link_external: 'link_external',
      action: 'action',
      linkType: 'linkType',
    },
    prepare: (val) => val,
    component: (props) => <BlockPreview {...props} getPreviewValues={getPreviewValues} />,
  },
}

export const subMenu = {
  title: 'Submenu',
  name: 'subMenu',
  type: 'object',
  icon: IoIosListBox,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Links & Submenus',
      name: 'links',
      type: 'array',
      of: [{type: 'cta'}, {type: 'subMenu'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    prepare: ({title, links}) => {
      const byType = groupBy(prop('_type'), links || {})

      const {richPageLink: richPageLinks, linkGroup: linkGroups} = byType

      const subtitle = [
        richPageLinks && richPageLinks.length
          ? `${richPageLinks.length} Page Link${richPageLinks.length === 1 ? '' : 's'}`
          : undefined,
        linkGroups && linkGroups.length
          ? `${linkGroups.length} Link Group${linkGroups.length === 1 ? '' : 's'}`
          : undefined,
      ]
        .filter(Boolean)
        .join(' | ')
      return {
        title,
        subtitle,
      }
    },
  },
}
