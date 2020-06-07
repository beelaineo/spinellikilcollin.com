import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import {
  ShopifySourceImage,
  RichImage,
  ShopifyProductVariant,
  ShopifyProduct,
} from '../../../types'
import { Image } from '../../../components/Image'
import { Carousel } from '../../../components/Carousel'
import {
  ProductGalleryWrapper,
  Thumbnails,
  ThumbnailButton,
  MobileWrapper,
  DesktopWrapper,
} from '../styled'
import { definitely } from '../../../utils'

const { useState } = React

interface ProductImagesProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
}

const MainImage = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      display: none;
    }
  `}
`

const getKey = (image: ShopifySourceImage | RichImage): string => {
  switch (image.__typename) {
    case 'ShopifySourceImage':
      return image.id || 'some-key'
    case 'RichImage':
      return image?.asset?._id || 'some-key'
    default:
      // @ts-ignore
      throw new Error(`Could not get key for image type ${image.__typename}`)
  }
}

export const ProductImages = ({
  product,
  currentVariant,
}: ProductImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const variantImage = currentVariant?.sourceData?.image ?? null
  const productImages = definitely(product?.gallery)
  const images = definitely([variantImage, ...productImages])

  const changeMainImage = (index: number) => () => setCurrentImageIndex(index)

  if (!images.length) return null
  const mainImage = images[currentImageIndex]
  return (
    <ProductGalleryWrapper>
      <DesktopWrapper>
        <MainImage>
          <Image ratio={0.8} image={mainImage} />
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
      <MobileWrapper>
        <Carousel dots buttons={false} columnCount={1}>
          {images.map((image) => (
            <Image key={getKey(image)} ratio={1} image={image} sizes="90vw" />
          ))}
        </Carousel>
      </MobileWrapper>
    </ProductGalleryWrapper>
  )
}
