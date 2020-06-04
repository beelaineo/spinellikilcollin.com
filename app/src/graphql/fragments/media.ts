import gql from 'graphql-tag'

export const sanityImageAssetFragment = gql`
  fragment SanityImageAssetFragment on SanityImageAsset {
    __typename
    _id
    _type
    _key
    label
    extension
    path
    url
    metadata {
      dimensions {
        height
        width
        aspectRatio
      }
    }
  }
`

export const sanityImageFragment = gql`
  fragment SanityImageFragment on Image {
    __typename
    asset {
      ...SanityImageAssetFragment
    }
    hotspot {
      __typename
      _key
      _type
      x
      y
      height
      width
    }
    crop {
      __typename
      _key
      _type
      top
      bottom
      left
      right
    }
  }
  ${sanityImageAssetFragment}
`

export const richImageFragment = gql`
  fragment RichImageFragment on RichImage {
    __typename
    altText
    asset {
      ...SanityImageAssetFragment
    }
    hotspot {
      __typename
      _key
      _type
      x
      y
      height
      width
    }
    crop {
      __typename
      _key
      _type
      top
      bottom
      left
      right
    }
  }
  ${sanityImageAssetFragment}
`
