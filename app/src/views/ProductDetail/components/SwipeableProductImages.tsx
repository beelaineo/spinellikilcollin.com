import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled, { css } from '@xstyled/styled-components'
import {
  useCarousel,
  CarouselProvider,
  CarouselInner,
} from '../../../components/Carousel'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { Image } from '../../../components/Image'

const { useEffect } = React

interface SwipeableProductImagesProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
  selectVariant: (variantId: string) => void
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: none;
    position: relative;
    ${theme.mediaQueries.tablet} {
      display: block;
    }
  `}
`

const GalleryPadding = styled.div`
  width: 100%;
  padding-bottom: 100%;
`

const CarouselWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const SwipeableProductImagesMain = ({
  product,
  currentVariant,
}: SwipeableProductImagesProps) => {
  const { currentSlide, setCurrentSlide } = useCarousel()

  const productVariants = product?.sourceData?.variants
  const unwoundVariants = productVariants ? unwindEdges(productVariants)[0] : []

  const variantImages = unwoundVariants.map((pv) => pv.image)
  const currentVariantIndex = unwoundVariants.findIndex(
    (v) =>
      currentVariant.sourceData?.id && v.id === currentVariant.sourceData.id,
  )

  useEffect(() => {
    if (!currentSlide === null) return

    setCurrentSlide(currentVariantIndex)
  }, [currentVariantIndex])

  if (!variantImages || !variantImages.length) return null

  return (
    <CarouselInner columnCount={1}>
      {variantImages.map((image) =>
        image ? (
          <Image key={image.id || 'some-key'} ratio={0.8} image={image} />
        ) : null,
      )}
    </CarouselInner>
  )
}

export const SwipeableProductImages = (props: SwipeableProductImagesProps) => {
  const onSlideChange = (slide: number | null) => {
    if (!slide) return
    const variantEdges = props.product?.sourceData?.variants || null
    // @ts-ignore
    const [variants] = variantEdges ? unwindEdges(variantEdges) : []
    if (!variants) return null
    const newVariant = variants[slide]
    if (newVariant.id) props.selectVariant(newVariant.id)
  }
  return (
    <Wrapper>
      <GalleryPadding />
      <CarouselWrapper>
        <CarouselProvider onSlideChange={onSlideChange}>
          <SwipeableProductImagesMain {...props} />
        </CarouselProvider>
      </CarouselWrapper>
    </Wrapper>
  )
}
