import {createClient} from '@sanity/client'

import {path} from 'ramda'

export const niceDate = (sourceDate: string | Date) => {
  const date = typeof sourceDate === 'string' ? new Date(sourceDate) : sourceDate
  return date.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getTypeText = (doc: any) => {
  if (!doc) return ''
  if (doc._type === 'shopifyProduct') return 'Product'
  if (doc._type === 'product') return 'Product'
  if (doc._type === 'shopifyCollection') return 'Collection'
  if (doc._type === 'collection') return 'Collection'
  if (doc._type === 'page') return 'Page'
  return 'Page'
}
const client = createClient({
  apiVersion: '2024-01-01',
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  // token: process.env.SANITY_AUTH_TOKEN, // Only if you want to update content with the client
  useCdn: false,
})

export const getReferencedDocument = async (ref: string) => client.getDocument(ref)

export const blocksToPlainText = (blocks: any, lineBreaks = false) =>
  blocks
    ? blocks
        .map((b: any) =>
          b._type !== 'block' || !b.children
            ? ''
            : b.children.map((child: any) => child.text).join('')
        )
        .join(lineBreaks ? '\n\n' : ' ')
    : undefined

export const getImageThumbnail = async (image: any) => {
  if (!image) return undefined
  const doc = await getReferencedDocument(image.asset._ref)
  return doc ? `${doc.url}?w=100&fit=max` : null
}

export const getShopifyThumbnail = (item: any) => {
  switch (item._type) {
    case 'product':
      return item.previewImageUrl + '&width=100'
    case 'collection':
      return item.store.imageUrl + '&width=100'
    default:
      throw new Error(`Cannot get thumbnail for type "${item._type}"`)
  }
}

export const getLegacyShopifyThumbnail = (item: any, type?: string) => {
  console.log('item', item, type)
  switch (item.sourceData?.__typename || type) {
    case 'Product' || 'shopifyProduct':
      return path(['sourceData', 'images', 'edges', '0', 'node', 'w100'], item)
    case 'Collection' || 'shopifyCollection':
      return path(['sourceData', 'image', 'w100'], item)
    default:
      throw new Error(`Cannot get thumbnail for type "${item.sourceData?.__typename || type}"`)
  }
}

export const getPageLinkThumbnail = async (pageLink: any) => {
  if (!pageLink || !pageLink.document || !pageLink.document._ref) return undefined
  const doc = await getReferencedDocument(pageLink.document._ref)
  if (!doc) return undefined
  if (doc._type === 'shopifyProduct' || doc._type === 'shopifyCollection')
    return getShopifyThumbnail(doc)
  return undefined
}
