import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyProduct,
  ShopifySourceProductVariant,
  Image,
} from '../../../types'
import { Gallery } from '../../../components/Gallery'
import { ProductGalleryWrapper } from '../styled'
import { ProductMobileImagesNav } from './ProductMobileImagesNav'

interface ProductImagesProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
}

export const ProductImages = ({
  product,
  currentVariant,
}: ProductImagesProps) => {
  console.log(currentVariant)
  // @ts-ignore
  const [images] = unwindEdges<Image>(product?.sourceData?.images)
  if (!images.length) return null

  const currentImageId = currentVariant?.image?.id || images[0].id
  return (
    <ProductGalleryWrapper>
      <Gallery images={images} currentImageId={currentImageId} />
      <ProductMobileImagesNav images={images} />
    </ProductGalleryWrapper>
  )
}
