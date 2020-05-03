import { RichPageLink, ExternalLink, InternalLink } from '../types'

type LinkType = RichPageLink | ExternalLink | InternalLink

interface LinkInfo {
  href: string
  as?: string
}

export const getPageLinkLabel = (link: LinkType): string | void =>
  link.__typename === 'ExternalLink'
    ? undefined
    : link?.document?.title || undefined

export const getPageLinkUrl = (link: LinkType): LinkInfo | void => {
  // If it is an external link, return the URL
  if (link.__typename === 'ExternalLink') {
    return link.url ? { href: link.url } : undefined
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
