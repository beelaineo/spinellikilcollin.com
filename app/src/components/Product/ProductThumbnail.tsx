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
  Maybe,
  Scalars,
} from '../../types'
import { Heading } from '../Text'
import { Image } from '../Image'
import { TagBadges } from './TagBadges'
import { ProductSwatches } from './ProductSwatches'
import { Price } from '../Price'
import {
  getProductUri,
  getVariantBySelectedOption,
  optionMatchesVariant,
  getBestVariantByMatch,
  definitely,
} from '../../utils'
import { useInViewport } from '../../hooks'
import { useAnalytics } from '../../providers'
import { ImageWrapper, ProductInfo, ProductThumb } from './styled'
import { CloudinaryAnimation } from '../CloudinaryVideo'

const { useEffect, useState, useMemo, useRef } = React

interface ProductThumbnailProps {
  product: ShopifyProduct
  displayPrice?: boolean
  displayTags?: boolean
  displaySwatches?: boolean
  preload?: boolean
  headingLevel?: number
  preferredVariantMatches?: Maybe<string>[] | null
  imageRatio?: number
  collectionId?: string | null
}

interface VariantAnimation {
  __typename: 'CloudinaryVideo'
  videoId?: Maybe<Scalars['String']>
}

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

  const [variantAnimation, setVariantAnimation] = useState<
    VariantAnimation | undefined
  >(undefined)

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

  const { minVariantPrice, maxVariantPrice } =
    product?.sourceData?.priceRange || {}

  const stopPropagation = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onSwatchHover =
    (option: ShopifyProductOption, value: ShopifyProductOptionValue) => () => {
      if (!value.value) return

      console.log('value', value)
      console.log('option', option)

      if (value?.animation) {
        const variantAnimation: VariantAnimation = {
          __typename: 'CloudinaryVideo',
          videoId: value.animation,
        }
        setVariantAnimation(variantAnimation)
      } else {
        setVariantAnimation(undefined)
      }

      const currentSelection = {
        name: option.name || 'foo',
        currentValue: value.value,
      }

      const newVariant = getVariantBySelectedOption(variants, currentSelection)
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

  console.log('currentVariant', currentVariant)

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
        <a>
          <ImageWrapper>
            {variantAnimation ? (
              <CloudinaryAnimation video={variantAnimation} />
            ) : (
              <Image
                image={productImage}
                ratio={imageRatio || 1}
                sizes="(min-width: 1200px) 30vw, (min-width: 1000px) 50vw, 90vw"
                preload
                altText={altText}
                preloadImages={allImages}
              />
            )}
          </ImageWrapper>

          <ProductInfo displayGrid={Boolean(displayTags || displaySwatches)}>
            {displayTags ? <TagBadges product={product} /> : <div />}
            {displayPrice && inquiryOnly != true ? (
              <>
                {minVariantPrice &&
                maxVariantPrice &&
                minVariantPrice.amount !== maxVariantPrice.amount ? (
                  <Heading my={0} level={headingLevel || 3}>
                    {product.title} | <Price price={minVariantPrice} /> -{' '}
                    <Price price={maxVariantPrice} />
                  </Heading>
                ) : maxVariantPrice ? (
                  <Heading level={headingLevel || 3} my={0}>
                    {product.title} | <Price price={maxVariantPrice} />
                  </Heading>
                ) : null}
              </>
            ) : (
              <Heading textAlign="center" my={0} level={headingLevel || 3}>
                {product.title}
              </Heading>
            )}
            {displaySwatches ? (
              <div onClick={stopPropagation}>
                <ProductSwatches
                  onSwatchHover={onSwatchHover}
                  isSwatchActive={isSwatchActive}
                  product={product}
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
