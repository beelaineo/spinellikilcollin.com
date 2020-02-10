export const shopifyImageFragment = /* GraphQL */ `
  fragment ImageFragment on ShopifySourceImage {
    id
    altText
    originalSrc
  }
`

export const sanityImageFragment = /* GraphQL */ `
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

export const richImageFragment = /* GraphQL */ `
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
