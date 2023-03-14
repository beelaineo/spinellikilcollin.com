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
      lqip
      blurHash
    }
  }
`
export const sanityFileAssetFragment = gql`
  fragment SanityFileAssetFragment on SanityFileAsset {
    __typename
    _id
    _type
    _key
    label
    extension
    path
    url
  }
`

export const sanityImageFragment = gql`
  fragment SanityImageFragment on Image {
    __typename
    _type
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
    _type
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
