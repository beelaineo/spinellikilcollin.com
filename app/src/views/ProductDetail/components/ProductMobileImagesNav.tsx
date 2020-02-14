import * as React from 'react'
import { ShopifySourceImage } from '../../../types'
import { FlexContainer } from '../../../components/Layout'
import { ImageNav, MobileImageNav } from '../styled'

interface ProductMobileImagesNavProps {
  images: ShopifySourceImage[]
}

export const ProductMobileImagesNav = ({
  images,
}: ProductMobileImagesNavProps) => {
  return (
    <MobileImageNav>
      <FlexContainer>
        {images.map((el) => (
          <ImageNav key={el.id || 'some-key'} />
        ))}
      </FlexContainer>
    </MobileImageNav>
  )
}
