import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct, ShopifyProductVariant, Image } from '../../../types'
import { Gallery } from '../../../components/Gallery'
import { ProductGalleryWrapper } from '../styled'
import { ProductMobileImagesNav } from './ProductMobileImagesNav'

interface ProductImagesProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
}

export const ProductImages = ({
  product,
  currentVariant,
}: ProductImagesProps) => {
  // @ts-ignore
  const [images] = unwindEdges<Image>(product?.sourceData?.images)

  return (
    <ProductGalleryWrapper>
      <Gallery
        images={images}
        currentImageId={currentVariant.sourceData.image.id}
      />
      <ProductMobileImagesNav images={images} />
    </ProductGalleryWrapper>
  )
}
