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

export const productInfoFragment = /* GraphQL */ `
  fragment ProductInfoFragment on ProductInfo {
    _key
    _type
    title
    bodyRaw
  }
`

export const internalLinkFragment = /* GraphQL */ `
  fragment InternalLinkFragment on InternalLink {
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

export const richPageLinkFragment = /* GraphQL */ `
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

export const ctaFragment = /* GraphQL */ `
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

export const externalLinkFragment = /* GraphQL */ `
  fragment ExternalLinkFragment on ExternalLink {
    _key
    _type
    url
    newTab
  }
`

export const imageTextBlockFragment = /* GraphQL */ `
  fragment ImageTextBlockFragment on ImageTextBlock {
    _key
    _type
    bodyRaw
    ctaText
    textPosition
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

export const shopifyProductFragment = /* GraphQL */ `
  fragment ShopifyProductFragment on ShopifyProduct {
    _id
    _key
    title
    handle
    shopifyId
    sourceData {
      id
      title
      handle
      tags
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
    info {
      ...ProductInfoFragment
    }
    contentAfter {
      ...ImageTextBlockFragment
    }
  }
  ${productInfoFragment}
  ${imageTextBlockFragment}
`

export const shopifyCollectionFragment = /* GraphQL */ `
  fragment ShopifyCollectionFragment on ShopifyCollection {
    _id
    _type
    _key
    title
    handle
    shopifyId
    products {
      ...ShopifyProductFragment
    }
  }
  ${shopifyProductFragment}
`

export const carouselFragment = /* GraphQL */ `
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

export const heroFragment = /* GraphQL */ `
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
