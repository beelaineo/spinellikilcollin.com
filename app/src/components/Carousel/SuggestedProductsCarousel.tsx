import React, { useEffect, useState } from 'react'
import { gql } from 'graphql-tag'
import {
  Collection,
  Product,
  ShopifyProductVariant,
  ShopifySourceProductVariant,
} from '../../types'
import { Carousel } from './Carousel'
import { ProductThumbnail, VariantThumbnail } from '../Product'
import { definitely, getVariantTitle, useViewportSize } from '../../utils'
import {
  useLazyRequest,
  shopifyImageFragment,
  shopifyVariantImageFragment,
} from '../../graphql'
import { Maybe } from 'yup'

//if collection then collection else prroducttype, then dollars within a range?
const queryByCollection = gql`
  query CarouselSuggestedProductsQuery($collectionId: ID!) {
    allCollection(where: { _id: { eq: $collectionId } }) {
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
          productType
          variants {
            title
            __typename
            sourceData {
              __typename
              _key
              _type
              availableForSale
              currentlyNotInStock
              id
              title
              image {
                ...ShopifyVariantImageFragment
              }
              priceV2 {
                amount
              }
              selectedOptions {
                __typename
                name
                value
              }
              metafields {
                key
                value
              }
            }
          }
          images {
            ...ShopifyImageFragment
          }
        }
      }
    }
  }
  ${shopifyImageFragment}
  ${shopifyVariantImageFragment}
`

const queryByProductType = gql`
  query CarouselSuggestedProductsQuery($productType: ID!) {
    allProducts(where: { store: { productType: { eq: $productType } } }) {
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
        productType
        variants {
          title
          __typename
          sourceData {
            __typename
            _key
            _type
            availableForSale
            currentlyNotInStock
            id
            title
            image {
              ...ShopifyVariantImageFragment
            }
            priceV2 {
              amount
            }
            selectedOptions {
              __typename
              name
              value
            }
            metafields {
              key
              value
            }
          }
        }
        images {
          ...ShopifyImageFragment
        }
      }
    }
  }

  ${shopifyImageFragment}
  ${shopifyVariantImageFragment}
`

interface Response {
  allCollection: Collection[]
  allProducts: Collection[]
}
interface Variables {
  collectionId?: string | null | undefined
  productType?: string | null | undefined
}

interface SuggestedProductsCarouselProps {
  collection?: Collection | null
  product: Product
  currentVariant?: ShopifyProductVariant
}

export const SuggestedProductsCarousel = ({
  collection,
  currentVariant,
  product,
}: SuggestedProductsCarouselProps) => {
  const collectionProducts = collection?.products
  const { width: viewportWidth } = useViewportSize()

  const variables = collection?._id
    ? { collectionId: collection._id }
    : { productType: product?.store?.productType }

  console.log('productproduct', product, variables)

  const query = collection?._id ? queryByCollection : queryByProductType

  const [getCarousel, response] = useLazyRequest<Response, Variables>(
    query,
    variables,
  )
  const { data } = response

  useEffect(() => {
    if (Boolean(data)) return
    if (!variables.collectionId) return
    getCarousel(variables)
  }, [data])

  const fetchedCollection: any = collection?._id
    ? data?.allCollection[0]?.products
    : data?.allProducts[0]

  const products = definitely(fetchedCollection)

  const [variants, setVariants] = useState<
    Maybe<ShopifySourceProductVariant>[]
  >([])

  useEffect(() => {
    const variants = products?.map((p: any) => p?.store?.variants).flat()

    const unique =
      variants?.filter(
        (v) =>
          v?.sourceData?.availableForSale === true &&
          v?.sourceData?.selectedOptions?.find(
            (o) => o?.value == 'Not sure of my size',
          ),
      ) || []

    const sorted = unique.sort(
      (a, b) =>
        Math.abs(
          (a?.sourceData?.priceV2?.amount ?? 0) -
            (currentVariant?.sourceData?.priceV2?.amount ?? 0),
        ) -
        Math.abs(
          (b?.sourceData?.priceV2?.amount ?? 0) -
            (currentVariant?.sourceData?.priceV2?.amount ?? 0),
        ),
    )

    setVariants(sorted as Maybe<ShopifySourceProductVariant>[])
  }, [data, currentVariant])

  console.log('suggest products carousel', variants)
  if (!variants?.length) return null

  const initialSlide = viewportWidth < 650 ? 1 : 0
  return (
    <Carousel initialSlide={initialSlide}>
      {definitely(variants).map((variant: any) => {
        console.log('variant test', variant)
        return (
          <VariantThumbnail
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
