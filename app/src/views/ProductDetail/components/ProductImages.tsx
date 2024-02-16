import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import {
  ShopifySourceImage,
  RichImage,
  ShopifyProductVariant,
  ShopifyProduct,
  Product,
  ShopifyImage,
  ShopifyVariantImage,
} from '../../../types'
import { Image } from '../../../components/Image'
import {
  useCarousel,
  CarouselProvider,
  CarouselInner,
} from '../../../components/Carousel'
import { ContentBlock } from '../../../components/ContentBlock'
import {
  ProductGalleryWrapper,
  Thumbnails,
  ThumbnailButton,
  MobileWrapper,
  MainImage,
  DesktopWrapper,
} from '../styled'
import { definitely } from '../../../utils'

const { useState, useEffect } = React

interface ProductGalleryCarouselProps {
  images: Array<ShopifySourceImage | RichImage>
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
}

export const ProductGalleryCarousel = ({
  currentVariant,
  images,
  product,
}: ProductGalleryCarouselProps) => {
  const { setCurrentSlide } = useCarousel()
  const { contentAfter } = product

  useEffect(() => {
    setCurrentSlide(0)
  }, [currentVariant])
  return (
    <CarouselInner single dots buttons={false} columnCount={1}>
      {images.map((image) => (
        <Image key={getKey(image)} ratio={1} image={image} sizes="90vw" />
      ))}
      {definitely(contentAfter).map((contentBlock) => (
        <ContentBlock
          key={contentBlock._key || 'some-key'}
          content={contentBlock}
        />
      ))}
    </CarouselInner>
  )
}

interface ProductImagesProps {
  product: Product
  currentVariant: ShopifyProductVariant
  screen: string
  hide?: boolean
}

const getKey = (
  image: ShopifySourceImage | RichImage | ShopifyImage | ShopifyVariantImage,
): string => {
  switch (image.__typename) {
    case 'ShopifyImage':
      return image.id || 'some-key-si'
    case 'ShopifyVariantImage':
      return image.id || 'some-key-si'
    case 'ShopifySourceImage':
      return image.id || 'some-key-ssi'
    case 'RichImage':
      return image?.asset?._id || 'some-key-ri'
    default:
      // @ts-ignore
      throw new Error(`Could not get key for image type ${image.__typename}`)
  }
}

export const ProductImages = ({
  product,
  currentVariant,
  screen,
  hide,
}: ProductImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // console.log('currentVariant', currentVariant)
  const variantImage = currentVariant?.sourceData?.image ?? null
  // const productImages = definitely(product?.gallery)
  const images = definitely([variantImage])

  // console.log('variantImage', variantImage)

  const changeMainImage = (index: number) => () => setCurrentImageIndex(index)

  if (!images.length) return null
  const mainImage = images[currentImageIndex]
  return screen === 'desktop' ? (
    <ProductGalleryWrapper hide={hide}>
      <DesktopWrapper>
        <MainImage>
          <Image ratio={1} image={mainImage} />
        </MainImage>
        {images.length > 1 ? (
          <Thumbnails>
            {images.map((image, index) => (
              <ThumbnailButton
                onClick={changeMainImage(index)}
                key={getKey(image)}
              >
                <Image key="some-key" ratio={1} image={image} sizes="120px" />
              </ThumbnailButton>
            ))}
          </Thumbnails>
        ) : null}
      </DesktopWrapper>
    </ProductGalleryWrapper>
  ) : screen === 'mobile' ? (
    <ProductGalleryWrapper product={product} hide={hide}>
      <MobileWrapper>
        <MainImage>
          <Image ratio={1} image={mainImage} />
        </MainImage>
      </MobileWrapper>
    </ProductGalleryWrapper>
  ) : null
}
