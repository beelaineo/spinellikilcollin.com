import { gql } from 'graphql-tag'
import { shopifyImageFragment, shopifyVariantImageFragment } from './shopify'
import {
  sanityImageFragment,
  sanityFileAssetFragment,
  richImageFragment,
} from './media'

export const seoFragment = gql`
  fragment SeoFragment on Seo {
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
      ...ShopifyVariantImageFragment
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
  ${shopifyVariantImageFragment}
`

export const shopifyProductVariantFragment = gql`
  fragment ShopifyProductVariantFragment on ShopifyProductVariant {
    __typename
    _key
    _type
    id
    isDeleted
    shopifyVariantID
    sourceData {
      ...ShopifySourceProductVariantFragment
    }
    title
  }
  ${shopifySourceProductVariantFragment}
`

export const productInfoFragment = gql`
  fragment ProductInfoFragment on ProductInfo {
    __typename
    _key
    _type
    title
    bodyRaw
    body_intlRaw
  }
`

export const internalLinkFragment = gql`
  fragment InternalLinkFragment on InternalLink {
    __typename
    _key
    _type
    queryParams {
      _key
      _type
      key
      value
    }
    document {
      __typename
      ... on About {
        __typename
        _key
        _type
        title
      }
      ... on Contact {
        __typename
        _key
        _type
        title
      }
      ... on Faq {
        __typename
        _type
        _key
        title
      }
      ... on Customize {
        __typename
        _id
        _key
        _type
        title
      }
      ... on JournalEntry {
        __typename
        _id
        _key
        _type
        title
        slug {
          current
        }
      }
      ... on JournalPage {
        __typename
        _type
        _id
        _key
        title
      }
      ... on Magazine {
        __typename
        _type
        _id
        _key
        title
      }
      ... on Page {
        __typename
        _type
        _id
        _key
        title
        slug {
          current
        }
      }
      ... on PaymentPlans {
        __typename
        _type
        _id
        _key
        title
      }
      ... on Product {
        __typename
        _type
        _id
        _key
        title
        handle
      }
      ... on Collection {
        __typename
        _type
        _id
        _key
        title
        handle
      }
      ... on TeamPage {
        __typename
        _id
        _key
        title
      }
    }
  }
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

export const priceRangeMinMaxFilterFragment = gql`
  fragment PriceRangeMinMaxFilterFragment on PriceRangeMinMaxFilter {
    __typename
    _key
    minPrice
    maxPrice
  }
`

export const inStockFilterFragment = gql`
  fragment InStockFilterFragment on InStockFilter {
    __typename
    _key
    label
  }
`

export const customFilterFragment = gql`
  fragment CustomFilterFragment on FilterOrFilterSetOrInStockFilterOrPriceRangeMinMaxFilter {
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
    ... on InStockFilter {
      __typename
      _key
      label
    }
    ... on PriceRangeMinMaxFilter {
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
    linkType
    link {
      ...InternalLinkFragment
    }
    link_external {
      ...ExternalLinkFragment
    }
  }
  ${internalLinkFragment}
  ${externalLinkFragment}
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
      minVariantPrice
      maxVariantPrice
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

export const shopifyProductDefFragment = gql`
  fragment ShopifyProductDefFragment on ShopifyProductDef {
    __typename
    id
    title
    handle
    vendor
    tags
    productType
    description
    descriptionHtml
    variants {
      ...ShopifyProductVariantFragment
    }
    priceRange {
      __typename
      minVariantPrice
      maxVariantPrice
    }
    images {
      ...ShopifyImageFragment
    }
  }
  ${shopifyImageFragment}
  ${shopifyProductVariantFragment}
`

export const productFragment = gql`
  fragment ProductFragment on Product {
    __typename
    _id
    _key
    title
    handle
    archived
    collections {
      __typename
      handle
      id
    }
    shopifyId
    store {
      ...ShopifyProductDefFragment
    }
    info {
      ...ProductInfoFragment
    }
    contentAfter {
      ...ImageTextBlockFragment
    }
  }
  ${productInfoFragment}
  ${shopifyProductDefFragment}
  ${imageTextBlockFragment}
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
    store {
      ...ShopifyProductDefFragment
    }
    info {
      ...ProductInfoFragment
    }
    contentAfter {
      ...ImageTextBlockFragment
    }
  }
  ${productInfoFragment}
  ${shopifyProductDefFragment}
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

export const shopifyCollectionDefFragment = gql`
  fragment ShopifyCollectionDefFragment on ShopifyCollectionDef {
    __typename
    title
    handle
    description
    descriptionHtml
    image {
      ...ShopifyImageFragment
    }
  }
  ${shopifyImageFragment}
`

export const collectionFragment = gql`
  fragment CollectionFragment on Collection {
    __typename
    _id
    _type
    _key
    title
    handle
    archived
    shopifyId
    products {
      ...ProductFragment
    }
  }
  ${productFragment}
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

export const productThumbnailFragment = gql`
  fragment ProductThumbnailFragment on Product {
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
    store {
      ...ShopifyProductDefFragment
    }
  }

  ${sanityImageFragment}
  ${shopifyProductDefFragment}
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
      ... on Collection {
        shopifyId
        handle
        title
      }
      ... on Product {
        ...ProductThumbnailFragment
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
  ${productThumbnailFragment}
`

export const carouselFragment = gql`
  fragment CarouselFragment on Carousel {
    __typename
    _key
    _type
    title
    subtitleRaw
    collection {
      ... on Collection {
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
          store {
            __typename
            id
            title
            handle
            tags
            priceRange {
              __typename
              minVariantPrice
              maxVariantPrice
            }
            productType
            images {
              ...ShopifyImageFragment
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
  ${shopifyImageFragment}
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
    textXL
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
