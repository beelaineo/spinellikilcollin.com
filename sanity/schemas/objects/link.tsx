import * as React from 'react'
import {BlockPreview} from '../../components/BlockPreview'
import {PreviewValue, defineField, defineType} from 'sanity'
import {
  getTypeText,
  getReferencedDocument,
  getShopifyThumbnail,
  getLegacyShopifyThumbnail,
} from '../utils'

// const getPreviewValues = async (values: any) => {
//   const {document} = values

//   if (!document || !document._ref) {
//     return {title: '(empty)'}
//   }
//   const doc = await getReferencedDocument(document._ref)
//   const src =
//     doc && (doc._type === 'shopifyProduct' || doc._type === 'shopifyCollection')
//       ? getShopifyThumbnail(doc)
//       : undefined

//   const subtitles = [
//     `🔗 ${getTypeText(doc)}: ${doc.title}`,
//     doc && doc.archived === true
//       ? `🛑 This collection is archived and will not be displayed on the site.`
//       : undefined,
//   ].filter(Boolean)

//   return {
//     src,
//     title: doc.title,
//     subtitles,
//   }
// }
export const externalLink = defineType({
  title: 'External Link',
  type: 'object',
  name: 'externalLink',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'newTab',
      type: 'boolean',
      title: 'Open in New Tab',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      newTab: 'newTab',
    },
    prepare({url, newTab}: {url: string; newTab: boolean}): PreviewValue {
      return {
        title: url,
        subtitle: newTab ? '⧉ Opens in new tab' : undefined,
        media: '🔗',
      }
    },
  },
})

export const queryParam = {
  type: 'object',
  name: 'queryParam',
  title: 'Query Parameter',
  description: 'e.g. "stone=am" / "{KEY}={VALUE}"',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'KEY',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      type: 'string',
      title: 'VALUE',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      key: 'key',
      value: 'value',
    },
    prepare({key, value}: {key: string; value: string}) {
      return {
        title: `${key}=${value}`,
      }
    },
  },
}

export const internalLink = defineType({
  title: 'Page, Product, or Collection',
  description: 'Link to a Page, Product, or Collection',
  name: 'internalLink',
  type: 'object',
  fields: [
    defineField({
      name: 'document',
      title: 'Linked Page',
      type: 'reference',
      to: [
        {type: 'product'},
        {type: 'collection'},
        {type: 'shopifyProduct'},
        {type: 'shopifyCollection'},
        {type: 'journalPage'},
        {type: 'journalEntry'},
        {type: 'teamPage'},
        {type: 'magazine'},
        {type: 'contact'},
        {type: 'faq'},
        {type: 'customize'},
        {type: 'about'},
        {type: 'page'},
        {type: 'paymentPlans'},
      ],
    }),
    defineField({
      title: 'Route Query Parameters (optional)',
      name: 'queryParams',
      description: 'Add query parameter(s) to the link route.',
      type: 'array',
      of: [{type: 'queryParam'}],
    }),
  ],
  preview: {
    select: {
      document: 'document',
      type: 'document._type',
      productThumb: 'document.sourceData.images.edges.0.node.w100',
      collectionThumb: 'document.sourceData.image.w100',
      docTitle: 'document.title',
    },
    prepare({document, type, productThumb, collectionThumb, docTitle}) {
      // console.log('document', document)
      const src =
        type === 'product' || type === 'collection'
          ? getShopifyThumbnail(document)
          : type === 'shopifyProduct'
          ? productThumb
          : type === 'shopifyCollection'
          ? collectionThumb
          : undefined

      const subtitles = [
        `🔗 ${getTypeText(document)}: ${document.title}`,
        document && document.archived === true
          ? `🛑 This collection is archived and will not be displayed on the site.`
          : undefined,
      ].filter(Boolean)

      return {
        title: docTitle,
        subtitle: subtitles.join(', '),
        media: src || undefined,
      }
    },
  },
})

export const richPageLink = {
  title: 'Page, Product, or Collection',
  description: 'Link to a Page, Product, or Collection',
  name: 'richPageLink',
  type: 'object',
  fields: [
    {
      name: 'document',
      title: 'Linked Page',
      type: 'reference',
      to: [
        {type: 'shopifyProduct'},
        {type: 'shopifyCollection'},
        {type: 'product'},
        {type: 'collection'},
        {type: 'page'},
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'If left empty, the title of the linked page, product, or collection will be used.',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'array',
      description: '(captions will not appear in carousels)',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      description: 'If left empty, the image of the linked product or document will be used.',
      type: 'richImage',
    },
    {
      name: 'hoverImage',
      title: 'Hover Image',
      description: 'If left empty, the second image of the linked product will be used.',
      type: 'richImage',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'caption.0.children.0.text',
    },
  },
}
