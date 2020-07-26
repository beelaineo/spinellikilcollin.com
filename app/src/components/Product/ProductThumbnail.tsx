import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyProduct,
  ShopifyProductOption,
  ShopifyProductOptionValue,
  ShopifySourceProductVariant,
  ShopifySourceImage,
  Maybe,
} from '../../types'
import { Heading } from '../Text'
import { Image } from '../Image'
import { TagBadges } from './TagBadges'
import { ProductSwatches } from './ProductSwatches'
import { Price } from '../Price'
import {
  getVariantBySelectedOption,
  optionMatchesVariant,
  getBestVariantByMatch,
  definitely,
} from '../../utils'
import { ImageWrapper, ProductInfo, ProductThumb } from './styled'

const { useState, useMemo } = React

interface ProductThumbnailProps {
  product: ShopifyProduct
  displayPrice?: boolean
  displayTags?: boolean
  displaySwatches?: boolean
  preload?: boolean
  headingLevel?: number
  preferredVariantMatches?: Maybe<string>[] | null
  imageRatio?: number
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
}: ProductThumbnailProps) => {
  const productImages = product.sourceData?.images
    ? unwindEdges(product.sourceData.images)[0]
    : []
  const [variants] = unwindEdges(product?.sourceData?.variants)
  const initialVariant = preferredVariantMatches
    ? getBestVariantByMatch(variants, definitely(preferredVariantMatches))
    : variants[0]

  const [currentVariant, setCurrentVariant] = useState(initialVariant)

  const allImages = useMemo(() => uniqueImages(variants), [variants])

  const productImage = currentVariant?.image
    ? currentVariant.image
    : productImages.length
    ? productImages[0]
    : undefined

  const { minVariantPrice, maxVariantPrice } =
    product?.sourceData?.priceRange || {}

  const onSwatchHover = (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ) => () => {
    if (!value.value) return
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
    const matches = optionMatchesVariant(
      option.name || 'foo',
      value,
      currentVariant,
    )
    return matches
  }
  const altText = [product?.title, currentVariant?.title]
    .filter(Boolean)
    .join(' - ')

  const linkAs = `/products/${product.handle}?v=${currentVariant.id}`
  return (
    <ProductThumb>
      <Link href="/products/[productSlug]" as={linkAs}>
        <a>
          <ImageWrapper>
            <Image
              image={productImage}
              ratio={imageRatio || 1}
              sizes="(min-width: 600px) 90vw; (min-width: 780px) 50vw; 30vw"
              preload
              altText={altText}
              preloadImages={allImages}
            />
          </ImageWrapper>

          <ProductInfo displayGrid={Boolean(displayTags || displaySwatches)}>
            {displayTags ? <TagBadges product={product} /> : <div />}
            {displayPrice ? (
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
              <ProductSwatches
                onSwatchHover={onSwatchHover}
                isSwatchActive={isSwatchActive}
                product={product}
              />
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
