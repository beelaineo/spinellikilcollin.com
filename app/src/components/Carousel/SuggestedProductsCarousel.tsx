import React, { useEffect, useState } from 'react'
import { gql } from 'graphql-tag'
import { Collection, Product, ShopifyProductVariant } from '../../types'
import { Carousel } from './Carousel'
import { ProductThumbnail } from '../Product'
import { definitely, useViewportSize } from '../../utils'
import { useLazyRequest, shopifyVariantImageFragment } from '../../graphql'
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
        hideFromCollections
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
        }
      }
    }
  }
  ${shopifyVariantImageFragment}
`

const queryByProductType = gql`
  query CarouselSuggestedProductsQuery($productType: String!) {
    allProduct(
      where: {
        hideFromSearch: { neq: true }
        archived: { neq: true }
        hidden: { neq: true }
        hideFromCollections: { neq: true }
        store: { productType: { eq: $productType } }
      }
    ) {
      __typename
      _id
      _key
      title
      hidden
      hideFromSearch
      hideFromCollections
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
      }
    }
  }

  ${shopifyVariantImageFragment}
`

interface Response {
  allCollection: Collection[]
  allProduct: Collection[]
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
  const { width: viewportWidth } = useViewportSize()

  const variables = collection?._id
    ? { collectionId: collection._id }
    : { productType: product?.store?.productType }

  const carouselMaxLength = 40

  const query = collection?._id ? queryByCollection : queryByProductType

  const [getCarousel, response] = useLazyRequest<Response, Variables>(
    query,
    variables,
  )
  const { data } = response

  useEffect(() => {
    if (Boolean(data)) return
    if (!variables) return
    getCarousel(variables)
  }, [data])

  const fetchedCollection: any = collection?._id
    ? data?.allCollection[0]?.products
    : data?.allProduct

  const products = definitely(fetchedCollection)

  const [variants, setVariants] = useState<Maybe<ShopifyProductVariant>[]>([])

  const availableProducts =
    (products as Product[])?.filter(
      (p) =>
        p?.hideFromSearch !== true &&
        p?.archived !== true &&
        p?.hidden !== true &&
        p?.hideFromCollections !== true,
    ) || []

  useEffect(() => {
    function getNestedValue(obj, path) {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj)
    }

    function getUniqueEntries(array, path) {
      const seen = new Set()
      return array.filter((item) => {
        const value = getNestedValue(item, path)
        if (seen.has(value)) {
          return false
        } else {
          seen.add(value)
          return true
        }
      })
    }

    const variants = availableProducts
      ?.map((p: any) =>
        p?.store?.variants.map((v) => ({
          product: {
            title: p.title,
          },
          ...v,
        })),
      )
      .flat()

    const availableForSale =
      variants?.filter((v) => v?.sourceData?.availableForSale === true) || []

    const unique = getUniqueEntries(availableForSale, 'sourceData.image.id')

    const metafieldMatches = unique.map((v) => {
      return {
        price: v?.sourceData?.priceV2?.amount,
        metafields: v?.sourceData?.metafields
          .map((m) => {
            const val = m.key === 'style' && m.value === 'd' ? 'del' : m.value
            return val.split(',')
          })
          .flat(),
      }
    })

    const countMatches = (searchArray, nestedArrays) => {
      return nestedArrays.map((nestedArray, index) => {
        const matchedCount = nestedArray?.metafields.reduce((count, val) => {
          if (searchArray?.metafields?.includes(val)) {
            return count + 1
          } else {
            return count
          }
        }, 0)

        return {
          id: index + 1,
          matchedCount,
          price: nestedArrays[index]?.price,
        } // Using index + 1 as id for simplicity
      })
    }

    const currentVariantMetafields = {
      price: currentVariant?.sourceData?.priceV2?.amount,
      metafields: unique
        ?.filter((v: any) => v?.title === currentVariant?.title)[0]
        ?.sourceData?.metafields?.map((m) => {
          const val = m.key === 'style' && m.value === 'd' ? 'del' : m.value

          return val.split(',')
        })
        .flat(),
    }

    const matchedCounts = countMatches(
      currentVariantMetafields,
      metafieldMatches,
    )

    const sortedMetaIndices = matchedCounts.sort((a, b) => {
      if (a.matchedCount === b.matchedCount) {
        return (
          currentVariant?.sourceData?.priceV2?.amount &&
          Math.abs(a.price - currentVariant?.sourceData?.priceV2?.amount) -
            currentVariant?.sourceData?.priceV2?.amount &&
          Math.abs(b.price - currentVariant?.sourceData?.priceV2?.amount)
        ) // Sort by price descending
      }
      return b.matchedCount - a.matchedCount // Sort by matchedCount descending
    })

    const sortedMeta = sortedMetaIndices.map((v) => unique[v.id - 1])

    const variantsWithoutCurrent = sortedMeta?.filter(
      (v: any) => !v?.title.includes(product?.title),
    )

    const uniqueVariantSet = variantsWithoutCurrent.reduce((acc, current) => {
      const options = current.sourceData.selectedOptions

      const currentStyle = currentVariant?.sourceData?.selectedOptions?.find(
        (option) => option?.name === 'Style',
      )?.value
      const currentColor = currentVariant?.sourceData?.selectedOptions?.find(
        (option) => option?.name === 'Color',
      )?.value

      const style = options.find((option) => option.name === 'Style')?.value
      const color = options.find((option) => option.name === 'Color')?.value

      const uniqueCurrentKey = currentStyle || currentColor
      const uniqueKey = style || color

      if (uniqueKey !== uniqueCurrentKey && !acc.has(uniqueKey)) {
        acc.set(uniqueKey, current)
      }

      return acc
    }, new Map())

    const uniqueVariants = Array.from(uniqueVariantSet.values())

    setVariants(uniqueVariants as Maybe<ShopifyProductVariant>[])
  }, [data, currentVariant])

  const filteredProducts = variants
    .flatMap((variant: any) =>
      availableProducts.filter(
        (product) => variant?.product?.title === product.title,
      ),
    )
    .slice(0, carouselMaxLength)

  if (!variants?.length) return null

  const initialSlide = viewportWidth < 650 ? 1 : 0

  const preferredVariantMatches = variants
    .flatMap(
      (variant) =>
        variant?.sourceData?.selectedOptions &&
        variant?.sourceData?.selectedOptions.filter(
          (v) =>
            v?.name === 'Color' ||
            v?.name === 'Carat' ||
            v?.name === 'Style' ||
            v?.name === 'Material' ||
            (v?.name === 'Size' &&
              variant?.sourceData?.selectedOptions &&
              variant?.sourceData?.selectedOptions.length === 1),
        ),
    )
    .map((v) => (v?.name === 'Size' ? null : v?.value))

  return (
    <Carousel
      key={preferredVariantMatches[0] || 'a-key'}
      initialSlide={initialSlide}
    >
      {definitely(filteredProducts).map((product: any, index) => {
        return (
          <ProductThumbnail
            key={preferredVariantMatches[index] || 'some-key'}
            preload
            preferredVariantMatches={[preferredVariantMatches[index] || null]}
            product={product}
            displaySwatches={false}
            displayTags={false}
            headingLevel={5}
            carousel={true}
            enableVariantTitle
          />
        )
      })}
    </Carousel>
  )
}
