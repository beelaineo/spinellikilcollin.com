import gql from 'graphql-tag'
import { richImageFragment } from './media'

export const shopifySourceImageFragment = gql`
  fragment ShopifySourceImageFragment on ShopifySourceImage {
    id
    altText
    originalSrc
    w100
    w300
    w800
    w1200
    w1600
  }
`

export const shopifySourceProductVariantFragment = gql`
  fragment ShopifySourceProductVariantFragment on ShopifySourceProductVariant {
    _key
    _type
    availableForSale
    id
    title
    image {
      ...ShopifySourceImageFragment
    }
    priceV2 {
      amount
      currencyCode
    }
    selectedOptions {
      _key
      name
      value
    }
  }
  ${shopifySourceImageFragment}
`

export const productInfoFragment = gql`
  fragment ProductInfoFragment on ProductInfo {
    _key
    _type
    title
    bodyRaw
  }
`

export const internalLinkFragment = gql`
  fragment InternalLinkFragment on InternalLink {
    _key
    _type
    document {
      ... on Contact {
        _type
        _key
        title
      }
      ... on Customize {
        _type
        _key
        title
      }
      ... on JournalEntry {
        _type
        _key
        title
        slug {
          current
        }
      }
      ... on JournalPage {
        _type
        _key
        title
      }

      ... on Magazine {
        _type
        _key
        title
      }

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

export const richPageLinkFragment = gql`
  fragment RichPageLinkFragment on RichPageLink {
    _key
    _type
    title
    captionRaw
    image {
      ...RichImageFragment
    }
    hoverImage {
      ...RichImageFragment
    }
  }
  ${richImageFragment}
`

export const ctaFragment = gql`
  fragment CTAFragment on Cta {
    _key
    _type
    label
    link {
      ...InternalLinkFragment
    }
  }
  ${internalLinkFragment}
`

export const externalLinkFragment = gql`
  fragment ExternalLinkFragment on ExternalLink {
    _key
    _type
    url
    newTab
  }
`

export const imageTextBlockFragment = gql`
  fragment ImageTextBlockFragment on ImageTextBlock {
    _key
    _type
    bodyRaw
    ctaText
    textPosition
    textColor
    layout
    backgroundImage {
      ...RichImageFragment
    }
    hoverImage {
      ...RichImageFragment
    }
    link {
      ... on InternalLink {
        ...InternalLinkFragment
      }
      ... on ExternalLink {
        ...ExternalLinkFragment
      }
    }
  }
  ${internalLinkFragment}
  ${externalLinkFragment}
  ${richImageFragment}
`

export const shopifySourceProductFragment = gql`
  fragment ShopifySourceProductFragment on ShopifySourceProduct {
    id
    title
    handle
    tags
    collections {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          handle
          id
        }
      }
    }
    variants {
      edges {
        cursor
        node {
          ...ShopifySourceProductVariantFragment
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images {
      edges {
        cursor
        node {
          id
          altText
          originalSrc
        }
      }
    }
  }
  ${shopifySourceProductVariantFragment}
`

export const shopifyProductFragment = gql`
  fragment ShopifyProductFragment on ShopifyProduct {
    _id
    _key
    title
    handle
    archived
    shopifyId
    sourceData {
      ...ShopifySourceProductFragment
    }
    info {
      ...ProductInfoFragment
    }
    contentAfter {
      ...ImageTextBlockFragment
    }
  }
  ${productInfoFragment}
  ${shopifySourceProductFragment}
  ${imageTextBlockFragment}
`

export const shopifyCollectionFragment = gql`
  fragment ShopifyCollectionFragment on ShopifyCollection {
    _id
    _type
    _key
    title
    handle
    archived
    shopifyId
    products {
      ...ShopifyProductFragment
    }
  }
  ${shopifyProductFragment}
`

export const carouselFragment = gql`
  fragment CarouselFragment on Carousel {
    _key
    _type
    title
    subtitleRaw
    collection {
      ...ShopifyCollectionFragment
    }
    items {
      ...RichPageLinkFragment
    }
  }
  ${shopifyCollectionFragment}
  ${richPageLinkFragment}
`

export const heroFragment = gql`
  fragment HeroFragment on Hero {
    _key
    _type
    bodyRaw
    textPosition
    textPositionMobile
    mobileImage {
      ...RichImageFragment
    }
    image {
      ...RichImageFragment
    }
  }
  ${richImageFragment}
`
