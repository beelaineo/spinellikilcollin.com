import * as React from 'react'
import { ShopifyProduct } from '../../../types'
import { ProductRelatedWrapper, ProductRelatedInner } from '../styled'
import { Carousel } from '../../../components/Carousel'
import { Heading } from '../../../components/Text'
import { ProductThumbnail } from '../../../components/Product'

interface ProductRelatedProps {
  product: ShopifyProduct
}

export const ProductRelated = ({ product }: ProductRelatedProps) => {
  const { collections } = product
  if (collections === null || !collections || !collections.length) return null
  const collection = collections[0]
  if (!collection) return null

  const products = collection.products
  if (!products || !products.length) return null
  return (
    <ProductRelatedWrapper>
      <Heading level={3} m={3} textTransform="capitalize" textAlign="center">
        {collection.title}
      </Heading>
      <ProductRelatedInner>
        <Carousel>
          {products.slice(0, 10).map((product) => {
            if (!product) return null
            return (
              <ProductThumbnail
                key={product._key || 'some-key'}
                product={product}
              />
            )
          })}
        </Carousel>
      </ProductRelatedInner>
    </ProductRelatedWrapper>
  )
}
