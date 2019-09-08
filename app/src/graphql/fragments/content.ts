import { backgroundImageFragment } from './media'

export const productInfoBlockFragment = /* GraphQL */ `
  fragment ProductInfoBlockFragment on ProductInfoBlock {
    _key
    _type
    title
    bodyRaw
  }
`

export const pageLinkFragment = /* GraphQL */ `
  fragment PageLinkFragment on PageLink {
    _key
    _type
    document {
      ... on Page {
        _type
        _key
        title
        slug {
          current
        }
      }
      ... on ShopifyProduct {
        _key
        _type
        title
        handle
      }
      ... on ShopifyCollection {
        _key
        _type
        title
        handle
      }
    }
  }
`

export const externalLinkFragment = /* GraphQL */ `
  fragment ExternalLinkFragment on ExternalLink {
    _key
    _type
    url
    newTab
  }
`

export const contentBlockFragment = /* GraphQL */ `
  fragment ContentBlockFragment on ContentBlock {
    _key
    _type
    bodyRaw
    ctaText
    textPosition
    layout
    backgroundImage {
      ...BackgroundImageFragment
    }
    hoverImage {
      ...BackgroundImageFragment
    }
    link {
      ... on PageLink {
        ...PageLinkFragment
      }
      ... on ExternalLink {
        ...ExternalLinkFragment
      }
    }
  }
  ${pageLinkFragment}
  ${externalLinkFragment}
  ${backgroundImageFragment}
`
