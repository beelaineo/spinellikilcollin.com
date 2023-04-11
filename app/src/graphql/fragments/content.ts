import { gql } from 'graphql-tag'
import {
  sanityImageFragment,
  sanityFileAssetFragment,
  richImageFragment,
} from './media'

export const seoFragment = gql`
  fragment SEOFragment on Seo {
    _key
    _type
    title
    metaTitle
    description
    image {
      ...SanityImageFragment
    }
  }
  ${sanityImageFragment}
`

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
    currentlyNotInStock
    id
    sku
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
    searchOnly
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

export const inventoryFilterFragment = gql`
  fragment InventoryFilterFragment on InventoryFilter {
    __typename
    _key
    label
  }
`

export const customFilterFragment = gql`
  fragment CustomFilterFragment on FilterOrFilterSetOrInventoryFilterOrPriceRangeFilter {
    ... on FilterSet {
      __typename
      _key
      heading
      searchOnly
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
    ... on InventoryFilter {
      __typename
      _key
      label
    }
    ... on PriceRangeFilter {
      __typename
      _key
      minPrice
      maxPrice
    }
  }
`

export const ctaFragment = gql`
  fragment CTAFragment on Cta {
    __typename
    _key
    _type
    action
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

export const pdfLinkFragment = gql`
  fragment PdfLinkFragment on PdfLink {
    __typename
    _key
    _type
    title
    pdf {
      asset {
        ...SanityFileAssetFragment
      }
    }
  }
  ${sanityFileAssetFragment}
`

export const cloudinaryVideoFragment = gql`
  fragment CloudinaryVideoFragment on CloudinaryVideo {
    __typename
    videoId
    enableAudio
  }
`

export const imageTextBlockFragment = gql`
  fragment ImageTextBlockFragment on ImageTextBlock {
    __typename
    _key
    _type
    bodyRaw
    body_mobileRaw
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
      ... on PdfLink {
        ...PdfLinkFragment
      }
    }
  }
  ${internalLinkFragment}
  ${externalLinkFragment}
  ${pdfLinkFragment}
  ${richImageFragment}
  ${cloudinaryVideoFragment}
`

export const textBlockFragment = gql`
  fragment TextBlockFragment on TextBlock {
    __typename
    _key
    _type
    bodyRaw
    body_mobileRaw
    alignment
    textColor
    layout
    backgroundImage {
      ...RichImageFragment
    }
  }
  ${richImageFragment}
`

export const stoneFragment = gql`
  fragment StoneFragment on Stone {
    _id
    _type
    _key
    gia_number
    gia_link
    carat
    cut
    color
    precision
    clarity
  }
`

export const shopifySourceProductFragment = gql`
  fragment ShopifySourceProductFragment on ShopifySourceProduct {
    __typename
    id
    title
    handle
    vendor
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
    minVariantPrice
    maxVariantPrice
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

export const shopifySourceCollectionFragment = gql`
  fragment ShopifySourceCollectionFragment on ShopifySourceCollection {
    __typename
    title
    handle
    description
    descriptionHtml
    image {
      ...ShopifySourceImageFragment
    }
    products {
      _key
      __typename
      pageInfo {
        _key
        __typename
        hasNextPage
        hasPreviousPage
      }
      edges {
        _key
        __typename
        cursor
        node {
          __typename
          _key
          handle
          id
        }
      }
    }
  }
  ${shopifySourceImageFragment}
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

export const collectionBlockFragment = gql`
  fragment CollectionBlockFragment on CollectionBlock {
    __typename
    _key
    position
    format
    bodyRaw
    body_mobileRaw
    textPosition
    textColor
    cloudinaryVideo {
      ...CloudinaryVideoFragment
    }
    backgroundImage {
      ...RichImageFragment
    }
    backgroundColor
  }
  ${cloudinaryVideoFragment}
  ${richImageFragment}
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
        animation
        stone {
          ...StoneFragment
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
  ${stoneFragment}
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
      products {
        __typename
        _id
        _key
        title
        hidden
        hideFromSearch
        handle
        archived
        shopifyId
        minVariantPrice
        maxVariantPrice
        sourceData {
          __typename
          id
          title
          handle
          tags
          productType
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
      }
    }
    items {
      ...RichPageLinkFragment
    }
  }
  ${richPageLinkFragment}
  ${shopifySourceImageFragment}
`

export const colorFragment = gql`
  fragment ColorFragment on Color {
    _key
    hex
    alpha
    hsl {
      h
      s
      l
      a
    }
    hsv {
      h
      s
      v
      a
    }
    rgb {
      r
      g
      b
      a
    }
  }
`

export const heroFragment = gql`
  fragment HeroFragment on Hero {
    __typename
    _key
    _type
    bodyRaw
    body_mobileRaw
    textColor
    textColorCustom {
      ...ColorFragment
    }
    textColorMobile
    textColorMobileCustom {
      ...ColorFragment
    }
    textContainer
    textPosition
    textPositionMobile
    backgroundColor
    backgroundColorCustom {
      ...ColorFragment
    }
    mobileBackgroundColor
    mobileBackgroundColorCustom {
      ...ColorFragment
    }
    aspectRatio
    layout
    header_color
    cta {
      ...CTAFragment
    }
    heroLink {
      ...InternalLinkFragment
    }
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
  ${internalLinkFragment}
  ${ctaFragment}
  ${colorFragment}
`
