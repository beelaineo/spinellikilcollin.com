import * as React from 'react'
import { Variant } from 'use-shopify'
import { Product, Image } from '../../../types'
import { FlexContainer } from '../../../components/Layout'
import { ImageNav, MobileImageNav } from '../styled'

interface ProductMobileImagesNavProps {
  images: Image[]
}

export const ProductMobileImagesNav = ({
  images,
}: ProductMobileImagesNavProps) => {
  return (
    <MobileImageNav>
      <FlexContainer>
        {images.map((el) => (
          <ImageNav key={el.id} />
        ))}
      </FlexContainer>
    </MobileImageNav>
  )
}
