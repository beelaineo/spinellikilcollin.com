import gql from 'graphql-tag'

export const sanityImageAssetFragment = gql`
  fragment SanityImageAssetFragment on SanityImageAsset {
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
    asset {
      ...SanityImageAssetFragment
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    crop {
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
    altText
    asset {
      ...SanityImageAssetFragment
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    crop {
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
