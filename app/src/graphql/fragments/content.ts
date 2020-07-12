import gql from 'graphql-tag'
import { sanityImageFragment, richImageFragment } from './media'

export const shopifySourceImageFragment = gql`
  fragment ShopifySourceImageFragment on ShopifySourceImage {
    __typename
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
    __typename
    _key
    _type
    availableForSale
    id
    title
    image {
      ...ShopifySourceImageFragment
    }
    priceV2 {
      __typename
      amount
      currencyCode
    }
    compareAtPriceV2 {
      __typename
      amount
      currencyCode
    }
    selectedOptions {
      __typename
      _key
      name
      value
    }
  }
  ${shopifySourceImageFragment}
`

export const productInfoFragment = gql`
  fragment ProductInfoFragment on ProductInfo {
    __typename
    _key
    _type
    title
    bodyRaw
  }
`

export const internalLinkFragment = gql`
  fragment InternalLinkFragment on InternalLink {
    __typename
    _key
    _type
    document {
      __typename
      ... on Contact {
        _id
        _type
        _key
        title
      }
      ... on Customize {
        _id
        _type
        _key
        title
      }
      ... on JournalEntry {
        _id
        _type
        _key
        title
        slug {
          current
        }
      }
      ... on JournalPage {
        _id
        _type
        _key
        title
      }

      ... on Magazine {
        _id
        _type
        _key
        title
      }

      ... on Page {
        _id
        _type
        _key
        title
        slug {
          current
        }
      }
      ... on ShopifyProduct {
        _id
        _key
        _type
        title
        handle
      }
      ... on ShopifyCollection {
        _id
        _key
        _type
        title
        handle
      }
    }
  }
`

export const filterSetFragment = gql`
  fragment FilterSetFragment on FilterSet {
    __typename
    _key
    heading
    filters {
      __typename
      _key
      label
      matches {
        __typename
        _key
        type
        match
      }
    }
  }
`

export const priceRangeFilterFragment = gql`
  fragment PriceRangeFilterFragment on PriceRangeFilter {
    __typename
    _key
    minPrice
    maxPrice
  }
`

export const ctaFragment = gql`
  fragment CTAFragment on Cta {
    __typename
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
    __typename
    _key
    _type
    url
    newTab
  }
`

export const cloudinaryVideoFragment = gql`
  fragment CloudinaryVideoFragment on CloudinaryVideo {
    __typename
    videoId
  }
`

export const imageTextBlockFragment = gql`
  fragment ImageTextBlockFragment on ImageTextBlock {
    __typename
    _key
    _type
    bodyRaw
    ctaText
    textPosition
    textColor
    layout
    cloudinaryVideo {
      ...CloudinaryVideoFragment
    }
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
  ${cloudinaryVideoFragment}
`

export const shopifySourceProductFragment = gql`
  fragment ShopifySourceProductFragment on ShopifySourceProduct {
    __typename
    id
    title
    handle
    tags
    productType
    description
    descriptionHtml
    collections {
      __typename
      pageInfo {
        __typename
        hasNextPage
        hasPreviousPage
      }
      edges {
        __typename
        node {
          __typename
          handle
          id
        }
      }
    }
    variants {
      __typename
      edges {
        __typename
        cursor
        node {
          ...ShopifySourceProductVariantFragment
        }
      }
    }
    priceRange {
      __typename
      minVariantPrice {
        __typename
        amount
        currencyCode
      }
      maxVariantPrice {
        __typename
        amount
        currencyCode
      }
    }
    images {
      __typename
      edges {
        __typename
        cursor
        node {
          ...ShopifySourceImageFragment
        }
      }
    }
  }
  ${shopifySourceImageFragment}
  ${shopifySourceProductVariantFragment}
`

export const shopifyProductFragment = gql`
  fragment ShopifyProductFragment on ShopifyProduct {
    __typename
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
    __typename
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
export const shopifyProductThumbnailFragment = gql`
  fragment ShopifyProductThumbnailFragment on ShopifyProduct {
    __typename
    _id
    _key
    archived
    shopifyId
    title
    handle
    options {
      __typename
      _key
      _type
      shopifyOptionId
      name
      values {
        __typename
        _key
        _type
        value
        descriptionRaw
        swatch {
          ...SanityImageFragment
        }
      }
    }
    sourceData {
      ...ShopifySourceProductFragment
    }
  }

  ${sanityImageFragment}
  ${shopifySourceImageFragment}
  ${shopifySourceProductFragment}
`

export const richPageLinkFragment = gql`
  fragment RichPageLinkFragment on RichPageLink {
    __typename
    _key
    _type
    title
    captionRaw
    document {
      __typename
      ... on Page {
        title
        slug {
          current
        }
      }
      ... on ShopifyCollection {
        shopifyId
        handle
        title
      }
      ... on ShopifyProduct {
        ...ShopifyProductThumbnailFragment
      }
    }
    image {
      ...RichImageFragment
    }
    hoverImage {
      ...RichImageFragment
    }
  }
  ${richImageFragment}
  ${shopifyProductThumbnailFragment}
`

export const carouselFragment = gql`
  fragment CarouselFragment on Carousel {
    __typename
    _key
    _type
    title
    subtitleRaw
    collection {
      __typename
      _id
      _type
      _key
      title
      handle
      archived
      shopifyId
    }
    items {
      ...RichPageLinkFragment
    }
  }
  ${richPageLinkFragment}
`

export const heroFragment = gql`
  fragment HeroFragment on Hero {
    __typename
    _key
    _type
    bodyRaw
    textColor
    textPosition
    textPositionMobile
    aspectRatio
    mobileImage {
      ...RichImageFragment
    }
    image {
      ...RichImageFragment
    }
    cloudinaryVideo {
      ...CloudinaryVideoFragment
    }
    cloudinaryVideoMobile {
      ...CloudinaryVideoFragment
    }
  }
  ${cloudinaryVideoFragment}
  ${richImageFragment}
`
