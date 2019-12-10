import * as React from 'react'
import { Variant } from 'use-shopify'
import { Product, Image } from '../../../types'
import { FlexContainer } from '../../../components/Layout'
import { ImageNav, MobileImageNav } from '../styled'

interface ProductMobileImagesNavProps {
  content: content
}

export const ProductMobileImagesNav = ({
  content,
}: ProductMobileImagesNavProps) => {
  return (
    <MobileImageNav>
      <FlexContainer>
        {content.map((el) => (
          <ImageNav />
        ))}
      </FlexContainer>
    </MobileImageNav>
  )
}
