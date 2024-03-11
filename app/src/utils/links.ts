import {
  Product,
  ShopifySourceImage,
  Collection,
  Page,
  About,
  Magazine,
  Customize,
  TeamPage,
  JournalPage,
  JournalEntry,
  Contact,
  Faq,
  Appointments,
  PaymentPlans,
  ShopifyCollectionImage,
  ShopifyImage,
} from '../types'

import { getIdFromBase64 } from './shopify'

export type Document =
  | Product
  | Collection
  | Page
  | TeamPage
  | About
  | Magazine
  | Customize
  | JournalPage
  | JournalEntry
  | Contact
  | Faq
  | Appointments
  | PaymentPlans

export interface LinkInfo {
  href: string
  as?: string
}

export const getPageLinkLabel = (
  document: Document | null | void,
): string | null | void => {
  if (!document) return null
  switch (document.__typename) {
    case 'Collection':
    case 'Product':
    case 'Magazine':
    case 'Customize':
    case 'JournalPage':
    case 'JournalEntry':
    case 'Contact':
    case 'Page':
    case 'TeamPage':
    case 'Faq':
    case 'Appointments':
    case 'PaymentPlans':
      return document.title
    case 'About':
      return 'About'
    default:
      // @ts-ignore
      throw new Error(`Could not get label for type ${document.__typename}`)
  }
}

export const getPageLinkUrl = (
  document: Document,
  params?: Record<string, string | number | boolean>,
): LinkInfo => {
  const paramKeys = params
    ? Object.entries(params).map(([key, value]) => [key, value.toString()])
    : undefined
  const paramString = ['?', new URLSearchParams(paramKeys)]
    .join('')
    .replace(/^\?$/, '')
  if (!document) throw new Error('No document was provided')
  switch (document.__typename) {
    case 'Collection':
      return {
        href: `/collections/${document.handle}`.concat(paramString),
      }
    case 'Product':
      return {
        href: `/products/${document.handle}`.concat(paramString),
      }

    case 'Magazine':
      return {
        href: '/925'.concat(paramString),
      }

    case 'Customize':
      return {
        href: '/customize'.concat(paramString),
      }

    case 'JournalPage':
      return {
        href: '/journal'.concat(paramString),
      }

    case 'JournalEntry':
      const slug = document?.slug?.current
      if (!slug) throw new Error(`Page "${document.title}" has no slug`)
      return {
        href: `/journal/${slug}`.concat(paramString),
      }

    case 'Contact':
      return {
        href: '/about/contact'.concat(paramString),
      }

    case 'Faq':
      return {
        href: '/about/faq'.concat(paramString),
      }

    case 'Appointments':
      return {
        href: '/about/appointments'.concat(paramString),
      }

    case 'Page':
      if (!document.slug || !document.slug.current) {
        throw new Error('This page does not have a slug')
      }
      // console.log('PAGE document.slug.current', document.slug.current)
      return {
        href: `/about/${document.slug.current}`.concat(paramString),
      }
    case 'TeamPage':
      return {
        href: '/about/team'.concat(paramString),
      }
    case 'About':
      return {
        href: '/about'.concat(paramString),
      }
    case 'PaymentPlans':
      return {
        href: '/about/financing',
      }
    default:
      throw new Error(
        // @ts-ignore
        `Unable to create a link URL for type "${document.__typename}"`,
      )
  }
}

export const getLinkFromHref = (href: string): LinkInfo => {
  const { pathname } = new URL(href)
  if (/\/products\/\w+/.test(pathname)) {
    return { href: pathname }
  }
  if (/\/collections\/\w+/.test(pathname)) {
    return { href: pathname }
  }
  return { href: pathname }
}

export const getDocumentLinkImage = (
  // document?: PageOrShopifyCollectionOrShopifyProduct,
  document?: Document | null,
): ShopifySourceImage | ShopifyImage | ShopifyCollectionImage | void | null => {
  if (!document) return undefined
  switch (document.__typename) {
    case 'Collection':
      return document?.store?.image
    case 'Product':
      const images = document?.store?.images
      if (!images || images.length === 0 || images[0] === null) {
        return undefined
      }
      return images[0]
    case 'Page':
      return undefined
    default:
      // @ts-ignore
      throw new Error(`Cannot get image for type "${document.__typename}"`)
  }
}

export const getLocationSearchHash = (search: string): string => {
  let result: string = ''
  const searchString = search.split('?v=')
  if (searchString.length === 2) {
    result = decodeURIComponent(searchString[1])
  }
  return result
}

export const getLocationSearchVariantId = (search: string): string => {
  let result: string = ''
  const searchString = search.split('?v=')
  if (searchString.length === 2) {
    result = decodeURIComponent(searchString[1])
  }
  return Buffer.from(decodeURIComponent(result), 'base64').toString('utf-8')
}

export const getProductIdLocationSearch = (search: string): string => {
  let productId

  const searchString = search.split('?v=')
  if (searchString.length === 2) {
    const id = getIdFromBase64(searchString[1])

    if (id) {
      productId = id
    }
  }

  return productId
}
