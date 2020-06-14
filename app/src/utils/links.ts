import {
  ShopifyProduct,
  ShopifySourceImage,
  ShopifyCollection,
  Page,
  About,
  Magazine,
  Customize,
  TeamPage,
  JournalPage,
  JournalEntry,
  Contact,
} from '../types'

export type Document =
  | ShopifyProduct
  | ShopifyCollection
  | Page
  | TeamPage
  | About
  | Magazine
  | Customize
  | JournalPage
  | JournalEntry
  | Contact

export interface LinkInfo {
  href: string
  as?: string
}

export const getPageLinkLabel = (
  document: Document | null | void,
): string | null | void => {
  if (!document) return null
  switch (document.__typename) {
    case 'ShopifyCollection':
    case 'ShopifyProduct':
    case 'Magazine':
    case 'Customize':
    case 'JournalPage':
    case 'JournalEntry':
    case 'Contact':
    case 'Page':
    case 'TeamPage':
      return document.title
    case 'About':
      return 'About'
    default:
      // @ts-ignore
      throw new Error(`Could not get label for type ${document.__typename}`)
  }
}

export const getPageLinkUrl = (document: Document): LinkInfo => {
  if (!document) throw new Error('No document was provided')
  switch (document.__typename) {
    case 'ShopifyCollection':
      return {
        href: `/collections/[collectionSlug]`,
        as: `/collections/${document.handle}`,
      }
    case 'ShopifyProduct':
      return {
        href: `/products/[productSlug]`,
        as: `/products/${document.handle}`,
      }

    case 'Magazine':
      return {
        href: '/925',
      }

    case 'Customize':
      return {
        href: '/customize',
      }

    case 'JournalPage':
      return {
        href: '/journal',
      }

    case 'JournalEntry':
      const slug = document?.slug?.current
      if (!slug) throw new Error(`Page "${document.title}" has no slug`)
      return {
        href: '/journal/[entrySlug]',
        as: `/journal/${slug}`,
      }

    case 'Contact':
      return {
        href: '/about/contact',
      }

    case 'Page':
      if (!document.slug || !document.slug.current) {
        throw new Error('This page does not have a slug')
      }

      return {
        href: '/about/[pageSlug]',
        as: `/about/${document.slug.current}`,
      }
    case 'TeamPage':
      return {
        href: '/about/team',
      }
    case 'About':
      return {
        href: '/about',
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
    return { href: '/products/[productSlug]', as: pathname }
  }
  if (/\/collections\/\w+/.test(pathname)) {
    return { href: '/collections/[collectionSlug]', as: pathname }
  }
  return { href: '/[pageSlug]', as: pathname }
}

export const getDocumentLinkImage = (
  // document?: PageOrShopifyCollectionOrShopifyProduct,
  document?: Document | null,
): ShopifySourceImage | void | null => {
  if (!document) return undefined
  switch (document.__typename) {
    case 'ShopifyCollection':
      return document?.sourceData?.image
    case 'ShopifyProduct':
      const imageEdges = document?.sourceData?.images?.edges
      if (!imageEdges || imageEdges.length === 0 || imageEdges[0] === null) {
        return undefined
      }
      return imageEdges[0].node
    case 'Page':
      return undefined
    default:
      // @ts-ignore
      throw new Error(`Cannot get image for type "${document.__typename}"`)
  }
}
