import { RichPageLink, ExternalLinkOrInternalLink } from '../types'

type LinkType = RichPageLink | ExternalLinkOrInternalLink

interface LinkInfo {
  href: string
  as?: string
}

export const getPageLinkLabel = (link: LinkType): string | void =>
  link.__typename === 'ExternalLink'
    ? undefined
    : link?.document?.title || undefined

export const getPageLinkUrl = (link: LinkType): LinkInfo => {
  // If it is an external link, return the URL
  if (link.__typename === 'ExternalLink') {
    if (!link.url) throw new Error('External link does not have a url')
    return { href: link.url }
  }
  // Otherwise, it is either a RichPageLink or InternalLink,
  // both of which will have a 'document'
  const { document } = link
  if (!document) throw new Error('This link is missing a document')
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
        href: '/contact',
      }

    case 'Page':
      if (!document.slug || !document.slug.current) {
        throw new Error('This page does not have a slug')
      }

      return {
        href: '/[pageSlug]',
        as: `/${document.slug.current}`,
      }

    default:
      throw new Error(
        // @ts-ignore
        `Unable do create a link URL for type "${document.__typename}"`,
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
