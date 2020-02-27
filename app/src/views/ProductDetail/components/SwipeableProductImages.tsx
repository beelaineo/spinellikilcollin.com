import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled, { css } from '@xstyled/styled-components'
import {
  useCarousel,
  CarouselProvider,
  CarouselInner,
} from '../../../components/Carousel'
import { ShopifyProduct, ShopifySourceProductVariant } from '../../../types'
import { Image } from '../../../components/Image'

const { useEffect } = React

interface SwipeableProductImagesProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
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
  // @ts-ignore
  const unwoundVariants = productVariants ? unwindEdges(productVariants)[0] : []

  const variantImages = unwoundVariants.map((pv) => pv.image)

  useEffect(() => {
    if (!currentSlide === null) return
    // Get the current variant's number

    const currentVariantIndex = unwoundVariants.findIndex(
      (v) => v.id === currentVariant.id,
    )
    if (currentVariantIndex !== currentSlide) {
      setCurrentSlide(currentVariantIndex)
    }
  }, [currentSlide, currentVariant, unwoundVariants])

  return (
    <CarouselInner columnCount={1}>
      {variantImages.map((image) => (
        <Image key={image.id} ratio={0.8} image={image} />
      ))}
    </CarouselInner>
  )
}

export const SwipeableProductImages = (props: SwipeableProductImagesProps) => (
  <Wrapper>
    <GalleryPadding />
    <CarouselWrapper>
      <CarouselProvider>
        <SwipeableProductImagesMain {...props} />
      </CarouselProvider>
    </CarouselWrapper>
  </Wrapper>
)
