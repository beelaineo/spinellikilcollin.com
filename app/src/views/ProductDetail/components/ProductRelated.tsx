import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct, ShopifyCollection } from '../../../types'
import { ProductRelatedWrapper, ProductRelatedInner } from '../styled'
import { Carousel } from '../../../components/Carousel'
import { Header2, Header4 } from '../../../components/Text'
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
        <Header4
          active
          margin="10px"
          transform="capitalize"
          color="dark"
          align="center"
        >
          More Like this
        </Header4>
        <Header4
          margin="10px"
          transform="capitalize"
          color="dark"
          align="center"
        >
          {collection.title}
        </Header4>
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
