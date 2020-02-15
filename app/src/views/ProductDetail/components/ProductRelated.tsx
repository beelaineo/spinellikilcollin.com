import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct, ShopifyCollection } from '../../../types'
import { ProductRelatedWrapper, ProductRelatedInner } from '../styled'
import { Carousel } from '../../../components/Carousel'
import { Heading } from '../../../components/Text'
import { ProductThumbnail } from '../../../components/Product'
import { FlexContainer } from '../../../components/Layout'

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
      <FlexContainer center>
        <Heading
          level={5}
          margin="10px"
          textTransform="capitalize"
          textAlign="center"
        >
          More Like this
        </Heading>
        <Heading level={5} m={3} textTransform="capitalize" textAlign="center">
          {collection.title}
        </Heading>
      </FlexContainer>
      <ProductRelatedInner>
        <Carousel>
          {products.slice(0, 10).map((product) => {
            if (!product) return null
            const { title } = product
            // @ts-ignore
            const [images] = unwindEdges(product.sourceData.images)
            const productLink = `/products/${product.handle}`

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
