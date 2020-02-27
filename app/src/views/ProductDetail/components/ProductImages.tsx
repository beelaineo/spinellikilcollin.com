import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled, { css } from '@xstyled/styled-components'
import {
  ShopifyProduct,
  ShopifySourceProductVariant,
  Image as ImageType,
} from '../../../types'
import { Image } from '../../../components/Image'
import { ProductGalleryWrapper } from '../styled'
import { SwipeableProductImages } from './SwipeableProductImages'

interface ProductImagesProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
}

const MainImage = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      display: none;
    }
  `}
`

export const ProductImages = ({
  product,
  currentVariant,
}: ProductImagesProps) => {
  // @ts-ignore
  const [images] = unwindEdges<ImageType>(product?.sourceData?.images)
  if (!images.length) return null

  const mainImage = currentVariant?.image || images[0]
  return (
    <ProductGalleryWrapper>
      <MainImage>
        <Image ratio={0.8} image={mainImage} />
      </MainImage>
      <SwipeableProductImages
        product={product}
        currentVariant={currentVariant}
      />
    </ProductGalleryWrapper>
  )
}
