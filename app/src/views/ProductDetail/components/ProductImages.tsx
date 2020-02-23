import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled from '@xstyled/styled-components'
import {
  ShopifyProduct,
  ShopifySourceProductVariant,
  Image as ImageType,
} from '../../../types'
import { Image } from '../../../components/Image'
import { ProductGalleryWrapper } from '../styled'

interface ProductImagesProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
}

const MainImage = styled.div``

export const ProductImages = ({
  product,
  currentVariant,
}: ProductImagesProps) => {
  // @ts-ignore
  const [images] = unwindEdges<ImageType>(product?.sourceData?.images)
  if (!images.length) return null

  const currentImage = currentVariant?.image || images[0]
  return (
    <ProductGalleryWrapper>
      <MainImage>
        <Image ratio={0.8} image={currentImage} />
      </MainImage>
    </ProductGalleryWrapper>
  )
}
