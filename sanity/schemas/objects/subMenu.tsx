import * as React from 'react'
import {groupBy, prop} from 'ramda'
import {IoIosListBox, IoIosLink} from 'react-icons/io'
import {BlockPreview} from '../../components/BlockPreview'
import {getReferencedDocument, getShopifyThumbnail} from '../utils'
import {actionTypes} from './shared'
import {PreviewValue, defineField, defineType} from 'sanity'

export const MenuLink = defineType({
  name: 'menuLink',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      initialValue: 'internal',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
          {title: 'Action', value: 'action'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'internalLink',
      name: 'link',
      title: 'Internal Link',
      hidden: ({parent}) => parent.linkType !== 'internal',
    }),
    defineField({
      type: 'externalLink',
      name: 'link_external',
      title: 'External Link',
      hidden: ({parent}) => parent.linkType !== 'external',
    }),
    defineField({
      name: 'action',
      title: 'Action',
      description:
        'Have this link launch an action instead of linking to a page. (If selected, this will override any linked document)',
      type: 'string',
      options: {
        list: actionTypes,
      },
      hidden: ({parent}) => parent.linkType !== 'action',
    }),
  ],
  preview: {
    select: {
      link: 'link',
      label: 'label',
      refDocument: 'link.document',
      link_external: 'link_external',
      action: 'action',
      linkType: 'linkType',
    },
    prepare({link, label, refDocument, link_external, action, linkType}): PreviewValue {
      if (!link && !link_external && !action) return {title: '[missing link]'}

      const src =
        refDocument._type === 'product' || refDocument._type === 'collection'
          ? getShopifyThumbnail(refDocument)
          : undefined

      const subtitles = [
        action ? `🔗 Action: ${action}` : null,
        link_external ? `🔗 External Link: ${link_external.url}` : null,
        refDocument.title ? `🔗${refDocument.title}` : null,
      ].filter(Boolean)

      return {
        title: label,
        subtitle: subtitles.join(', '),
        //@ts-ignore
        media: linkType !== 'internal' ? '🔗' : src ? <img alt={'thumb'} src={src} /> : undefined,
      }
    },
  },
})

export const subMenu = defineType({
  title: 'Submenu',
  name: 'subMenu',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Links & Submenus',
      name: 'links',
      type: 'array',
      of: [{type: 'cta'}, {type: 'subMenu'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    //@ts-ignore
    prepare({title, links}) {
      const subtitles =
        links && links.length ? `${links.length} Link${links.length === 1 ? '' : 's'}` : undefined
      return {
        title: title,
        subtitle: subtitles,
        media: IoIosListBox,
      }
    },
  },
})
