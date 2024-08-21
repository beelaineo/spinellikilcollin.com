import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  Product,
  ShopifyProductOption,
  ProductOptionValue,
  ShopifyProductVariant,
  ShopifyImage,
  FilterConfiguration,
  Maybe,
  Scalars,
  ShopifyStorefrontMoneyV2,
  ShopifySourceSelectedOption,
  ProductOption,
  ShopifyVariantImage,
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
  withTypenames,
  getBestVariantBySort,
  getVariantTitle,
} from '../../utils'
import { useInViewport } from '../../hooks'
import { Money, useAnalytics } from '../../providers'
import {
  ImageWrapper,
  VideoWrapper,
  ProductInfo,
  ProductThumb,
  HoverArea,
  HoverThumbWrapper,
} from './styled'
import { CloudinaryAnimation } from '../CloudinaryVideo'
import { variantFragment } from '../../graphql'
import styled, { css } from '@xstyled/styled-components'
import { Sort } from '../Filter'
import { useShopData } from '../../providers/ShopDataProvider'
import { useShopifyPrice } from '../../providers/ShopifyPriceProvider'
import { useCountry } from '../../providers/CountryProvider'
import { sanityClient } from '../../services/sanity'
import { ShopifyStorefrontProductVariant } from '../../types/generated-shopify'

const { useEffect, useState, useMemo, useRef } = React

import { config } from '../../config'

const { SHOW_IN_STOCK_INDICATORS } = config

const showInStockIndicators = SHOW_IN_STOCK_INDICATORS === 'true'
interface ProductThumbnailProps {
  product: Product
  displayPrice?: boolean
  displayTags?: boolean
  displaySwatches?: boolean
  preload?: boolean
  headingLevel?: number
  preferredVariantMatches?: Maybe<string>[] | null
  currentFilter?: FilterConfiguration | null
  currentSort?: Sort | null
  hideFilter?: boolean | null
  imageRatio?: number
  collectionId?: string | null
  carousel?: boolean
  enableVariantTitle?: boolean
}

interface VariantAnimation {
  __typename: 'CloudinaryVideo'
  videoId?: Maybe<string>
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
  variants: ShopifyProductVariant[],
): ShopifyVariantImage[] =>
  variants.reduce<ShopifyVariantImage[]>((acc, variant) => {
    const image = variant?.sourceData?.image
    if (!image) return acc
    if (acc.find((i) => i?.url === image.url)) {
      return acc
    }
    return [...acc, image]
  }, [])

const sanityQuery = async <R = any | null,>(
  query: string,
  params?: Record<string, any>,
): Promise<R> => {
  const results = await sanityClient.fetch<R>(query, params || {})
  // @ts-ignore
  return withTypenames<R>(results)
}

// const getIncludedVariants = async (
//   product: Product,
// ): Promise<ShopifyStorefrontProductVariant[] | null> => {
//   const variants = await sanityQuery(
//     `*[_type == 'product' && handle == $handle][0].store.variants[sourceData.metafields[key == "excludeFromIndication"].value == "false"]`,
//     { handle: product?.handle },
//   )
//   return variants
// }

export const ProductThumbnail = ({
  product,
  displayPrice = false,
  displayTags = true,
  displaySwatches = true,
  headingLevel,
  preferredVariantMatches,
  currentFilter,
  currentSort,
  hideFilter,
  imageRatio,
  collectionId,
  carousel,
  enableVariantTitle,
}: ProductThumbnailProps) => {
  const router = useRouter()
  const { asPath } = useRouter()
  const { inquiryOnly } = product
  const containerRef = useRef<HTMLDivElement>(null)
  const { isInViewOnce } = useInViewport(containerRef)
  const { sendProductImpression, sendProductClick, sendCarouselClick } =
    useAnalytics()
  const { productInfoSettings, productListingSettings } = useShopData()
  const {
    getVariantPriceByCollection,
    currentCollectionPrices,
    getVariantPriceBySearchResults,
    currentSearchResultPrices,
    getProductPriceById,
  } = useShopifyPrice()
  const { currentCountry } = useCountry()

  const productImages = product.store?.images
  const variants = (product?.store?.variants || [])
    .flat()
    .filter(
      (variant): variant is ShopifyProductVariant =>
        variant !== null && variant !== undefined,
    )

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

  // console.log('initials', preferredVariantMatches, initialVariantSelections)

  // console.log('initialVariant:', initialVariant)

  const [currentVariant, setCurrentVariant] = useState<
    ShopifyProductVariant | undefined
  >(initialVariant)

  const [currentPrice, setCurrentPrice] = useState<
    null | ShopifyStorefrontMoneyV2 | Money
  >(null)

  const [currentCompareAtPrice, setCurrentCompareAtPrice] = useState<
    null | ShopifyStorefrontMoneyV2 | Money
  >(null)
  const [currentSwatchOption, setCurrentSwatchOption] = useState<
    Maybe<ProductOptionValue> | undefined
  >(undefined)

  const [variantAnimation, setVariantAnimation] = useState<
    VariantAnimation | undefined
  >(undefined)

  const [playing, setPlaying] = useState(false)

  const optionsArray = ['Color', 'Style', 'Material']

  const { getVariantPriceById } = useShopifyPrice()

  useEffect(() => {
    const initialSwatchValue =
      initialVariant?.sourceData?.selectedOptions?.filter((o) => {
        if (!o?.name) return false
        return optionsArray.includes(o?.name)
      })[0]?.value

    const colorOption = product.options?.filter(
      (option) => option?.name == 'Color',
    )
    const initialColorOption = colorOption?.[0]?.values?.filter(
      (o) => o?.value == initialSwatchValue,
    )[0]

    const styleOption = product.options?.filter(
      (option) => option?.name == 'Style',
    )

    const initialStyleOption = styleOption?.[0]?.values?.filter(
      (o) => o?.animation,
    )[0]

    const materialOption = product.options?.filter(
      (option) => option?.name == 'Material',
    )

    const initialMaterialOption = materialOption?.[0]?.values?.filter(
      (o) => o?.animation,
    )[0]

    const initialAnimation =
      initialColorOption?.animation ||
      initialStyleOption?.animation ||
      initialMaterialOption?.animation

    if (initialAnimation) {
      const variantAnimation: VariantAnimation = {
        __typename: 'CloudinaryVideo',
        videoId: initialAnimation,
      }
      setVariantAnimation(variantAnimation)
    } else {
      setVariantAnimation(undefined)
    }
    const collectionHandle = router.query.collectionSlug
    const currentVariantId = currentVariant?.id
    // if (collectionHandle && currentVariantId) {
    //   const variantPriceInfo = getVariantPriceByCollection(
    //     collectionHandle as string,
    //     currentVariantId,
    //   )
    //   console.log('VARIANT PRICE INFO:', variantPriceInfo)
    //   if (variantPriceInfo?.price) {
    //     setCurrentPrice(variantPriceInfo?.price)
    //   } else {
    //     setCurrentPrice(null)
    //   }
    //   if (variantPriceInfo?.compareAtPrice) {
    //     setCurrentCompareAtPrice(variantPriceInfo?.compareAtPrice)
    //   } else {
    //     setCurrentCompareAtPrice(null)
    //   }
    // }
    if (currentSearchResultPrices && currentVariantId) {
      const variantPriceInfo = getVariantPriceBySearchResults(currentVariantId)
      if (variantPriceInfo?.price) {
        setCurrentPrice(variantPriceInfo?.price)
      }
      if (variantPriceInfo?.compareAtPrice) {
        setCurrentCompareAtPrice(variantPriceInfo?.compareAtPrice)
      }
    }
    if (currentSearchResultPrices && !currentVariantId && product.shopifyId) {
      getProductPriceById(product?.shopifyId).then((price) => {
        // console.log('productPriceInfo', price)
        if (price?.price) {
          setCurrentPrice(price?.price)
        }
        if (price?.compareAtPrice) {
          setCurrentCompareAtPrice(price?.compareAtPrice)
        }
      })
    }
  }, [])

  useEffect(() => {
    const currentSwatchValue =
      currentVariant?.sourceData?.selectedOptions?.filter((o) => {
        if (!o?.name) return false
        return optionsArray.includes(o?.name)
      })[0]?.value

    const currentSwatchCaratValue =
      currentVariant?.sourceData?.selectedOptions?.filter(
        (o) => o?.name === 'Carat',
      )[0]?.value

    const currentSwatchStyleValue =
      currentVariant?.sourceData?.selectedOptions?.filter(
        (o) => o?.name === 'Style',
      )[0]?.value

    const currentSwatchMaterialValue =
      currentVariant?.sourceData?.selectedOptions?.filter(
        (o) => o?.name === 'Material',
      )[0]?.value

    const currentSwatchDefaultValue =
      currentVariant?.sourceData?.selectedOptions?.filter(
        (o) => o?.name === 'Title',
      )[0]?.value

    const colorOption = product.options?.filter(
      (option) => option?.name == 'Color',
    )
    const currentColorOption = colorOption?.[0]?.values?.filter(
      (o) => o?.value == currentSwatchValue,
    )[0]

    const styleOption = product.options?.filter(
      (option) => option?.name == 'Style',
    )

    const currentStyleOption = styleOption?.[0]?.values?.filter(
      (o) => o?.value == currentSwatchStyleValue,
    )[0]

    const materialOption = product.options?.filter(
      (option) => option?.name == 'Material',
    )

    const currentMaterialOption = materialOption?.[0]?.values?.filter(
      (o) => o?.value == currentSwatchMaterialValue,
    )[0]

    const caratOption = product.options?.filter(
      (option) => option?.name == 'Carat',
    )

    const currentCaratOption = caratOption?.[0]?.values?.filter(
      (o) => o?.value == currentSwatchCaratValue,
    )[0]

    const defaultOption = product.options?.filter(
      (option) => option?.name == 'Title',
    )

    const currentDefaultOption = defaultOption?.[0]?.values?.filter(
      (o) => o?.value == currentSwatchDefaultValue,
    )[0]

    setCurrentSwatchOption(
      currentColorOption ||
        currentCaratOption ||
        currentStyleOption ||
        currentMaterialOption ||
        currentDefaultOption,
    )

    const currentAnimation =
      currentColorOption?.animation ||
      currentStyleOption?.animation ||
      currentMaterialOption?.animation

    if (currentAnimation) {
      const variantAnimation: VariantAnimation = {
        __typename: 'CloudinaryVideo',
        videoId: currentAnimation,
      }
      setVariantAnimation(variantAnimation)
    } else {
      setVariantAnimation(undefined)
    }
  }, [currentVariant])

  useEffect(() => {
    if (!router.isReady) return

    const collectionHandle = router.query.collectionSlug
    const currentVariantId = currentVariant?.id
    if (!currentVariantId) return

    const variantPriceInfo = getVariantPriceByCollection(
      collectionHandle as string,
      currentVariantId,
    )

    if (variantPriceInfo?.price) {
      setCurrentPrice(variantPriceInfo?.price)
    } else {
      setCurrentPrice(null)
    }
    if (variantPriceInfo?.compareAtPrice) {
      setCurrentCompareAtPrice(variantPriceInfo?.compareAtPrice)
    } else {
      setCurrentCompareAtPrice(null)
    }
    const variantSearchPriceInfo =
      getVariantPriceBySearchResults(currentVariantId)
    if (variantSearchPriceInfo?.price) {
      setCurrentPrice(variantSearchPriceInfo?.price)
    }
    if (variantSearchPriceInfo?.compareAtPrice) {
      setCurrentCompareAtPrice(variantSearchPriceInfo?.compareAtPrice)
    }
    if (!currentVariantId && product.shopifyId) {
      getProductPriceById(product?.shopifyId).then((price) => {
        if (price?.price) {
          setCurrentPrice(price?.price)
          // console.log('SET PRICE TO PRODUCT PRICE (NO VARIANTS)', price)
        } else {
          setCurrentCompareAtPrice(null)
          // console.log('SET PRICE TO NULL (NO VARIANTS)')
        }
        if (price?.compareAtPrice) {
          setCurrentCompareAtPrice(price?.compareAtPrice)
        } else {
          setCurrentCompareAtPrice(null)
        }
      })
    }
  }, [
    currentVariant,
    currentCountry,
    router.isReady,
    product.shopifyId,
    getVariantPriceByCollection,
  ])

  const handleClick = () => {
    // @ts-ignore
    sendProductClick({ product, variant: currentVariant })
    if (carousel) sendCarouselClick()
  }
  const allImages = useMemo(() => uniqueImages(variants), [variants])

  useEffect(() => {
    if (!isInViewOnce) return
    // @ts-ignore
    sendProductImpression(product, currentVariant)
  }, [isInViewOnce, currentVariant])

  const productImage = currentVariant?.sourceData?.image
    ? currentVariant.sourceData?.image
    : productImages?.length
    ? productImages[0]
    : undefined

  const stopPropagation = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onSwatchHover =
    (option: ProductOption, value: ProductOptionValue) => () => {
      if (!value.value) return
      if (!currentVariant?.sourceData?.selectedOptions) return
      const currentOptions = currentVariant.sourceData?.selectedOptions
        .filter(
          (v) =>
            v?.name === 'Color' ||
            v?.name === 'Carat' ||
            v?.name === 'Style' ||
            v?.name === 'Material',
        )
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

      if (newVariant) setCurrentVariant(newVariant)
    }

  const isSwatchActive = (
    option: ProductOption,
    value: ProductOptionValue,
  ): boolean => {
    if (!currentVariant) return false

    const matches = optionMatchesVariant(
      option.name || 'foo',
      value,
      currentVariant,
    )
    return matches
  }

  useEffect(() => {
    if (!currentFilter && !currentSort) return
    if (hideFilter) return

    interface FilterProps {
      name: string
      value: string | boolean
    }

    const minVariantPrice = product?.store?.priceRange?.minVariantPrice || 0
    const maxVariantPrice = product?.store?.priceRange?.maxVariantPrice || 0

    if (currentFilter) {
      const defaultPriceRangeFilter =
        productListingSettings?.newDefaultFilter?.find(
          (f) => f?.__typename == 'PriceRangeMinMaxFilter',
        )
      //@ts-ignore
      const defaultMinPrice = defaultPriceRangeFilter?.minPrice
      //@ts-ignore
      const defaultMaxPrice = defaultPriceRangeFilter?.maxPrice

      const priceRangeFilter = currentFilter.find(
        (f) => f?.filterType == 'PRICE_RANGE_FILTER',
      )
      const inventoryFilter = currentFilter.find(
        (f) => f?.filterType == 'INVENTORY_FILTER',
      )
      const priceRangeFilterIsDefault =
        priceRangeFilter?.minPrice == defaultMinPrice &&
        priceRangeFilter?.maxPrice == defaultMaxPrice
          ? true
          : false
      // console.log(
      //   'current priceRangeFilterIsDefault',
      //   priceRangeFilterIsDefault,
      // )
      //@ts-ignore
      const inventoryFilterIsInactive = inventoryFilter?.applyFilter == false

      const isNotDefaultFilter = (filter) => {
        return Boolean(
          filter.filterType !== 'PRICE_RANGE_FILTER' &&
            filter.filterType !== 'INVENTORY_FILTER',
        )
      }

      const filtersAreDefault = !currentFilter.some((f) =>
        isNotDefaultFilter(f),
      )

      if (currentSort !== 'Featured' && priceRangeFilterIsDefault) {
        const filteredVariant = getBestVariantBySort(
          variants,
          currentSort,
          minVariantPrice,
          maxVariantPrice,
          initialVariant,
        )
        setCurrentVariant(filteredVariant)
      } else if (
        priceRangeFilterIsDefault &&
        inventoryFilterIsInactive &&
        filtersAreDefault &&
        initialVariant
      ) {
        setCurrentVariant(initialVariant)
      } else {
        //@ts-ignore
        const filters: FilterProps[] = currentFilter
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
                if (typeof type == 'string' && typeof match == 'string')
                  return { name: type, value: match }
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

        const minPrice = priceRangeFilterIsDefault
          ? null
          : priceRangeFilter?.minPrice
        const maxPrice = priceRangeFilterIsDefault
          ? null
          : priceRangeFilter?.maxPrice

        const filteredVariant = getBestVariantByFilterMatch(
          variants,
          filters,
          currentSort,
          minVariantPrice,
          maxVariantPrice,
          initialVariant,
          minPrice,
          maxPrice,
        )
        setCurrentVariant(filteredVariant)
      }
    }
  }, [currentFilter, currentSort])

  const stockedVariants = product.store?.variants?.filter((variant) => {
    return (
      variant?.sourceData?.availableForSale === true &&
      variant?.sourceData?.currentlyNotInStock === false &&
      !variant?.sourceData?.selectedOptions?.find(
        (o) => o?.value == 'Not sure of my size',
      ) &&
      !variant?.sourceData?.selectedOptions?.find((o) => o?.name == 'Carat')
    )
  })

  const sanityBooleanQuery = async <R = boolean,>(
    query: string,
    params?: Record<string, any>,
  ): Promise<R> => {
    const results = await sanityClient.fetch<R>(query, params || {})
    // @ts-ignore
    return withTypenames<R>(results)
  }

  const isProductCurrentlyInStock = (product: Product): boolean => {
    if (!product?.store || !showInStockIndicators) return false
    const isInStock =
      stockedVariants && stockedVariants.length > 0 ? true : false
    // console.log('isInStock:', isInStock)
    return isInStock
  }

  const altText = [product?.title, currentVariant?.title]
    .filter(Boolean)
    .join(' - ')

  const linkAs = getProductUri(product, {
    variant: currentVariant,
    currentPath: asPath,
  })

  const [imageHover, setImageHover] = useState(false)

  const variantTitle =
    currentVariant && getVariantTitle(product, currentVariant)

  const title = enableVariantTitle
    ? variantTitle
    : product?.title
    ? product.title
    : ' '

  return (
    <ProductThumb ref={containerRef}>
      <Link
        href="/products/[productSlug]"
        as={linkAs}
        draggable="false"
        aria-label={'Link to ' + product.title}
        onClick={handleClick}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {variantAnimation ? (
          <VideoWrapper
            $hide={!playing}
            carousel={carousel}
            $hover={imageHover}
          >
            <HoverThumbWrapper
              $hover={Boolean(imageHover && currentSwatchOption?.hover_image)}
            >
              <Image
                image={currentSwatchOption?.hover_image}
                ratio={imageRatio || 1}
                sizes="(min-width: 1200px) 30vw, (min-width: 1000px) 50vw, 90vw"
                preload
                altText={altText}
                preloadImages={allImages}
                objectFit="cover"
              />
            </HoverThumbWrapper>

            <CloudinaryAnimation
              video={variantAnimation}
              image={productImage}
              setPlaying={setPlaying}
              view={'list'}
            />
          </VideoWrapper>
        ) : null}
        <ImageWrapper $hide={Boolean(variantAnimation)} $hover={imageHover}>
          <HoverThumbWrapper
            $hover={Boolean(imageHover && currentSwatchOption?.hover_image)}
          >
            <Image
              image={currentSwatchOption?.hover_image}
              ratio={imageRatio || 1}
              sizes="(min-width: 1200px) 30vw, (min-width: 1000px) 50vw, 90vw"
              preload
              altText={altText}
              preloadImages={allImages}
            />
          </HoverThumbWrapper>
          <Image
            image={productImage}
            ratio={imageRatio || 1}
            sizes="(min-width: 1200px) 30vw, (min-width: 1000px) 50vw, 90vw"
            preload
            altText={altText}
            preloadImages={allImages}
            placeholder="shadow"
          />
        </ImageWrapper>
        <HoverArea
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        />

        <ProductInfo
          $hover={Boolean(imageHover && currentSwatchOption?.hover_image)}
          $displayGrid={Boolean(displayTags || displaySwatches)}
        >
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
              {title} |{' '}
              <PriceWrapper>
                <Price price={currentPrice} />
                <Span ml={2} color="body.6" textDecoration="line-through">
                  <Price price={currentVariant?.sourceData?.compareAtPriceV2} />
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
              {title}
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
      </Link>
    </ProductThumb>
  )
}
