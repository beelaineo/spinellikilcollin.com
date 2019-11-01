import * as React from 'react'
import { Product, Collection } from '../../../types/generated'
import { unwindEdges } from '../../../utils/graphql'
import { ProductRelatedWrapper, ProductRelatedInner } from '../styled'
import { Carousel } from 'Components/Carousel'
import { Header2, Header4 } from 'Components/Text'
import { ProductThumbnail } from '../../ProductListing/ProductThumbnail'
import { FlexContainer } from '../../../components/Layout'

interface ProductRelatedProps {
  product: Product
}

export const ProductRelated = ({ product }: ProductRelatedProps) => {
  const [collections] = unwindEdges<Collection>(product.collections)
  if (!collections || !collections.length) return null
  const [products] = unwindEdges<Product>(collections[0].products)
  if (!products || !products.length) return null
  return (
    <ProductRelatedWrapper>
      <FlexContainer center="center">
        <Header4
          active
          margin="10px"
          transform="capitalize"
          size="small"
          color="dark"
          align="center"
        >
          More Like this
        </Header4>
        <Header4
          margin="10px"
          transform="capitalize"
          size="small"
          color="dark"
          align="center"
        >
          Best Selling {collections[0].title}
        </Header4>
      </FlexContainer>
      <ProductRelatedInner>
        <Carousel>
          {products.slice(0, 10).map((product) => {
            const { title } = product
            const [images] = unwindEdges(product.images)
            const productLink = `/products/${product.handle}`

            return <ProductThumbnail key={product.id} product={product} />
          })}
        </Carousel>
      </ProductRelatedInner>
    </ProductRelatedWrapper>
  )
}
