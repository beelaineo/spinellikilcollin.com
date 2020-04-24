import { RichPageLink, ExternalLink, InternalLink } from '../types'

type LinkType = RichPageLink | ExternalLink | InternalLink

export const getPageLinkLabel = (link: LinkType): string | void =>
  link.__typename === 'ExternalLink'
    ? undefined
    : link?.document?.title || undefined

export const getPageLinkUrl = (link: LinkType): string | void => {
  // If it is an external link, return the URL
  if (link.__typename === 'ExternalLink') {
    return link.url ? link.url : undefined
  }
  // Otherwise, it is either a RichPageLink or InternalLink,
  // both of which will have a 'document'
  const { document } = link
  if (!document) throw new Error('This link is missing a document')
  switch (document.__typename) {
    case 'ShopifyCollection':
      return `/collections/${document.handle}`
    case 'ShopifyProduct':
      return `/products/${document.handle}`
    case 'Page':
      if (!document.slug || !document.slug.current) {
        throw new Error('This page does not have a slug')
      }
      return `/${document.slug.current}`
    default:
      throw new Error(
        // @ts-ignore
        `Unable do create a link URL for type "${document.__typename}"`,
      )
  }
}
