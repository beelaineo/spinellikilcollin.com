import gql from 'graphql-tag'

export const sanityImageFragment = gql`
  fragment SanityImageFragment on SanityImageAsset {
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

export const richImageFragment = gql`
  fragment RichImageFragment on RichImage {
    altText
    asset {
      ...SanityImageFragment
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
  ${sanityImageFragment}
`
