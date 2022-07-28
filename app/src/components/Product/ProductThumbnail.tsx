import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyProduct,
  ShopifyProductOption,
  ShopifyProductOptionValue,
  ShopifySourceProductVariant,
  ShopifySourceImage,
  FilterConfiguration,
  Maybe,
} from '../../types'
import { Heading, Span } from '../Text'
import { Image } from '../Image'
import { TagBadges } from './TagBadges'
import { ProductSwatches, IsDisplayingSwatches } from './ProductSwatches'
import { Price } from '../Price'
import {
  getProductUri,
  getVariantBySelectedOptions,
  optionMatchesVariant,
  getBestVariantByMatch,
  getBestVariantByFilterMatch,
  definitely,
} from '../../utils'
import { useInViewport } from '../../hooks'
import { useAnalytics } from '../../providers'
import { ImageWrapper, ProductInfo, ProductThumb } from './styled'
import { variantFragment } from '../../graphql'
import styled, { css } from '@xstyled/styled-components'

const { useEffect, useState, useMemo, useRef } = React

interface ProductThumbnailProps {
  product: ShopifyProduct
  displayPrice?: boolean
  displayTags?: boolean
  displaySwatches?: boolean
  preload?: boolean
  headingLevel?: number
  preferredVariantMatches?: Maybe<string>[] | null
  currentFilter?: FilterConfiguration | null
  hideFilter?: boolean | null
  imageRatio?: number
  collectionId?: string | null
}

interface WithCurrentlyInStock {
  currentlyInStock?: boolean
}

const TitleHeading = styled(Heading)<WithCurrentlyInStock>`
  ${({ currentlyInStock }) => css``}
`

const InStockDot = styled('span')`
  display: inline-block;
  background-color: #00d009;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  margin-top: 6px;
  margin-left: -18px;
  border: 1px solid #f5f3f3;
  @media screen and (max-width: 960px) {
    margin-top: 4px;
  }
`
const PriceWrapper = styled('span')`
  ${({ theme }) => css`
    display: inline-block;
    width: 38px;
    text-align: left;
    ${theme.mediaQueries.mobile} {
      width: 24px;
    }
  `}
`

const uniqueImages = (
  variants: ShopifySourceProductVariant[],
): ShopifySourceImage[] =>
  variants.reduce<ShopifySourceImage[]>((acc, variant) => {
    const { image } = variant
    if (!image) return acc
    if (acc.find((i) => i?.originalSrc === image.originalSrc)) {
      return acc
    }
    return [...acc, image]
  }, [])

export const ProductThumbnail = ({
  product,
  displayPrice,
  displayTags,
  displaySwatches,
  headingLevel,
  preferredVariantMatches,
  currentFilter,
  hideFilter,
  imageRatio,
  collectionId,
}: ProductThumbnailProps) => {
  const { asPath } = useRouter()
  const { inquiryOnly } = product
  const containerRef = useRef<HTMLDivElement>(null)
  const { isInViewOnce } = useInViewport(containerRef)
  const { sendProductImpression, sendProductClick } = useAnalytics()
  const productImages = product.sourceData?.images
    ? unwindEdges(product.sourceData.images)[0]
    : []
  const [variants] = unwindEdges(product?.sourceData?.variants)
  const variantsFull = product?.sourceData?.variants

  const mappedSelections = !product.initialVariantSelections
    ? false
    : product.initialVariantSelections.map((selection) => ({
        // @ts-ignore
        selectedCollection: selection?.selectedCollection?._ref,
        selectedVariant: selection?.selectedVariant,
      }))

  const initialVariantSelections = !mappedSelections
    ? false
    : mappedSelections
        .filter((selection) => {
          return selection.selectedCollection === collectionId
        })
        .map((s) => s.selectedVariant)

  const initialVariant = initialVariantSelections
    ? getBestVariantByMatch(variants, definitely(initialVariantSelections))
    : preferredVariantMatches
    ? getBestVariantByMatch(variants, definitely(preferredVariantMatches))
    : variants[0]

  const [currentVariant, setCurrentVariant] = useState<
    ShopifySourceProductVariant | undefined
  >(initialVariant)
  const handleClick = () => {
    // @ts-ignore
    sendProductClick({ product, variant: currentVariant })
  }
  const allImages = useMemo(() => uniqueImages(variants), [variants])
  useEffect(() => {
    if (!isInViewOnce) return
    // @ts-ignore
    sendProductImpression({ product, variant: currentVariant })
  }, [isInViewOnce, currentVariant])

  const productImage = currentVariant?.image
    ? currentVariant.image
    : productImages.length
    ? productImages[0]
    : undefined

  const stopPropagation = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onSwatchHover =
    (option: ShopifyProductOption, value: ShopifyProductOptionValue) => () => {
      if (!value.value) return
      if (!currentVariant?.selectedOptions) return
      const currentOptions = currentVariant.selectedOptions
        .filter((v) => v?.name === 'Color' || v?.name === 'Carat')
        .map((v) => {
          if (v?.name === option.name) {
            return {
              name: option.name || 'foo',
              currentValue: value.value,
            }
          } else {
            return {
              name: v?.name || 'foo',
              currentValue: v?.value,
            }
          }
        })
      const newVariant = getVariantBySelectedOptions(variants, currentOptions)
      console.log('newVariant', newVariant)
      if (newVariant) setCurrentVariant(newVariant)
    }

  const isSwatchActive = (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ): boolean => {
    if (!currentVariant) return false
    const matches = optionMatchesVariant(
      option.name || 'foo',
      value,
      currentVariant,
    )
    return matches
  }

  // console.log('currentFilter on productthumbnail', currentFilter)

  useEffect(() => {
    if (!currentFilter) return
    if (hideFilter) return
    // {
    //   "filterType": "PRICE_RANGE_FILTER",
    //   "key": "dda7b169dd63",
    //   "minPrice": 0,
    //   "maxPrice": 20000
    // }
    // {
    //   "filterType": "FILTER_MATCH_GROUP",
    //   "matches": [
    //       {
    //           "__typename": "FilterMatch",
    //           "_key": "2c29d6a35976",
    //           "type": "stone",
    //           "match": "d"
    //       }
    //   ]
    // }
    //   {
    //     "filterType": "INVENTORY_FILTER",
    //     "key": "1db172bb87b8",
    //     "applyFilter": true,
    //     "label": "Ready to Ship"
    // }

    interface FilterProps {
      name: string
      value: string | boolean
    }

    const filters = currentFilter
      .filter((filter) => filter.filterType !== 'PRICE_RANGE_FILTER')
      .map((filter, i) => {
        const { filterType } = filter
        if (
          filterType === 'FILTER_MATCH_GROUP' ||
          filterType === 'FILTER_SINGLE'
        ) {
          const { matches } = filter
          const newMatches = matches.map((matchGroup) => {
            const { type, match } = matchGroup
            return {
              name: type,
              value: match,
            }
          })
          return newMatches
        } else if (filterType === 'INVENTORY_FILTER') {
          const newFilter = {
            name: 'inventory',
            value: filter.applyFilter,
          }
          return newFilter
        }
      })
      .flat()
      .reverse()
    // console.log('new filters', filters)
    // console.log('variants', variantsFull)
    //@ts-ignore
    const filteredVariant = getBestVariantByFilterMatch(variants, filters)
    setCurrentVariant(filteredVariant)
  }, [currentFilter])

  const stockedVariants = product.sourceData?.variants?.edges?.filter(
    (variant) => {
      return (
        variant?.node?.availableForSale === true &&
        variant?.node?.currentlyNotInStock === false &&
        !variant?.node?.selectedOptions?.find((o) => o?.name == 'Carat')
      )
    },
  )

  const isProductCurrentlyInStock = (product: ShopifyProduct): boolean => {
    if (!product?.sourceData) return false

    const isInStock =
      stockedVariants && stockedVariants.length > 0 ? true : false
    return isInStock
  }

  const altText = [product?.title, currentVariant?.title]
    .filter(Boolean)
    .join(' - ')

  const linkAs = getProductUri(product, {
    variant: currentVariant,
    currentPath: asPath,
  })

  return (
    <ProductThumb ref={containerRef} onClick={handleClick}>
      <Link href="/products/[productSlug]" as={linkAs}>
        <a aria-label={'Link to ' + product.title}>
          <ImageWrapper>
            <Image
              image={productImage}
              ratio={imageRatio || 1}
              sizes="(min-width: 1200px) 30vw, (min-width: 1000px) 50vw, 90vw"
              preload
              altText={altText}
              preloadImages={allImages}
            />
          </ImageWrapper>

          <ProductInfo displayGrid={Boolean(displayTags || displaySwatches)}>
            {displayTags ? <TagBadges product={product} /> : <div />}
            {displayPrice && inquiryOnly != true ? (
              <TitleHeading
                level={headingLevel || 3}
                my={0}
                currentlyInStock={isProductCurrentlyInStock(product)}
              >
                {isProductCurrentlyInStock(product) &&
                !IsDisplayingSwatches(product) ? (
                  <InStockDot />
                ) : (
                  ''
                )}
                {product.title} |{' '}
                <PriceWrapper>
                  <Price
                    price={
                      currentVariant?.priceV2 ||
                      product?.sourceData?.priceRange?.minVariantPrice
                    }
                  />
                  <Span ml={2} color="body.6" textDecoration="line-through">
                    <Price price={currentVariant?.compareAtPriceV2} />
                  </Span>
                </PriceWrapper>
              </TitleHeading>
            ) : (
              <TitleHeading
                textAlign="center"
                my={0}
                level={headingLevel || 3}
                currentlyInStock={isProductCurrentlyInStock(product)}
              >
                {isProductCurrentlyInStock(product) &&
                !IsDisplayingSwatches(product) ? (
                  <InStockDot />
                ) : (
                  ''
                )}
                {product.title}
              </TitleHeading>
            )}
            {displaySwatches ? (
              <div onClick={stopPropagation}>
                <ProductSwatches
                  onSwatchHover={onSwatchHover}
                  isSwatchActive={isSwatchActive}
                  product={product}
                  stockedVariants={stockedVariants}
                />
              </div>
            ) : (
              <div />
            )}
          </ProductInfo>
        </a>
      </Link>
    </ProductThumb>
  )
}

ProductThumbnail.defaultProps = {
  displayPrice: false,
  displayTags: true,
  displaySwatches: true,
}
