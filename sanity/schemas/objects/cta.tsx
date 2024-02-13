import * as React from 'react'
import {BlockPreview} from '../../components/BlockPreview'
import {actionTypes} from './shared'
import {getTypeText, getReferencedDocument, getShopifyThumbnail} from '../utils'
import {PreviewValue, defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (Rule) => Rule.required().max(25),
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
        'Have this CTA launch an action instead of linking to a page. For launching Bambuser, make sure you fill out the Bambuser Settings below. (If selected, this will override any linked document)',
      type: 'string',
      options: {
        list: actionTypes,
      },
      hidden: ({parent}) => parent.linkType !== 'action',
    }),
    defineField({
      name: 'bambuser',
      type: 'bambuserSettings',
      title: 'Bambuser Action settings',
      hidden: true,
    }),
  ],

  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      refDocument: 'link.document',
      link_external: 'link_external',
      action: 'action',
    },
    prepare({label, linkType, refDocument, link_external, action}): any {
      if (!refDocument && !link_external && !action && !label) return {title: '[missing link]'}
      const src =
        refDocument?._type === 'product' || refDocument?._type === 'collection'
          ? getShopifyThumbnail(refDocument)
          : undefined
      // const src =
      //   refDocument._type === 'product' || refDocument._type === 'collection'
      //     ? getShopifyThumbnail(refDocument)
      //     : refDocument._type === 'shopifyProduct'
      //     ? refProductThumb + '&width=100'
      //     : refDocument._type === 'shopifyCollection'
      //     ? refCollectionThumb + '&width=100'
      //     : undefined

      const subtitles = [
        action ? `🔗 Action: ${action}` : null,
        link_external ? `🔗 External Link: ${link_external.url}` : null,
      ].filter(Boolean)

      return {
        title: label,
        subtitle: subtitles.join(', '),
        // //@ts-ignore
        media: linkType !== 'internal' ? '🔗' : src ? <img alt={'thumb'} src={src} /> : undefined,
      }
    },
  },
})
