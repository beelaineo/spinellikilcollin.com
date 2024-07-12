import * as React from 'react'
import { gql } from 'graphql-tag'
import {
  Collection,
  Product,
  ShopifyCollection,
  ShopifySourceProductVariant,
} from '../../types'
import { Carousel } from './Carousel'
import { ProductThumbnail, ShopifyVariantThumbnail } from '../Product'
import { definitely, useViewportSize } from '../../utils'
import {
  useLazyRequest,
  shopifyImageFragment,
  shopifyVariantImageFragment,
} from '../../graphql'
import { Variant } from '../../providers/ShopifyProvider/types'
import { getRecentlyViewedProducts } from '../../utils/recentlyViewed'
import { shopifyQuery } from '../../providers/AllProviders'
const { useEffect, useState } = React

const getVariantsByIds = gql`
  query GetVariantsByIds($variantIds: [ID!]!) {
    nodes(ids: $variantIds) {
      ... on ProductVariant {
        id
        title
        price {
          amount
        }
        product {
          id
          title
          handle
        }
        image {
          __typename
          src
          altText
          height
          id
          width
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`

interface Response {
  nodes: ShopifySourceProductVariant[]
}
interface Variables {
  variantIds: string[]
}

interface RecentlyViewedCarouselProps {
  product?: Product
  currentVariant?: Variant
}

export const RecentlyViewedCarousel = ({
  product,
  currentVariant,
}: RecentlyViewedCarouselProps) => {
  const recentlyViewed = getRecentlyViewedProducts()
  const { width: viewportWidth } = useViewportSize()
  const [variants, setVariants] = useState<ShopifySourceProductVariant[]>([])

  const variantIds = recentlyViewed.map((item) => item.variantId)

  useEffect(() => {
    const fetchVariants = async () => {
      if (variantIds.length > 0) {
        const variables = { variantIds }
        const data: Response = await shopifyQuery(getVariantsByIds, variables)
        if (data?.nodes) {
          const fetchedVariants = data.nodes
          fetchedVariants.shift()
          if (fetchedVariants && fetchedVariants.length > 1) {
            setVariants(fetchedVariants)
          }
        }
      }
    }
    fetchVariants()
  }, [variantIds])

  if (!variants.length) return null

  const initialSlide = viewportWidth < 650 ? 1 : 0

  return (
    <Carousel initialSlide={initialSlide}>
      {definitely(variants).map((variant: any) => {
        console.log('variant test', variant)
        return (
          <ShopifyVariantThumbnail
            key={variant?.shopifyId || 'some-key'}
            preload
            variant={variant}
            headingLevel={5}
            carousel={true}
          />
        )
      })}
    </Carousel>
  )
}
