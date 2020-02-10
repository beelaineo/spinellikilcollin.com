import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Product } from '../../types'
import { Header3, Header6 } from '../Text'
import {
  BackgroundImage,
  ProductInfo,
  ProductThumb,
  ProductContainer,
} from './styled'

interface ProductThumbnail {
  product: Product
}

export const ProductThumbnail = ({ product }: ProductThumbnail) => {
  const [images] = unwindEdges(product.images)
  const imageSrc = images.length ? images[0].originalSrc : undefined
  let { minVariantPrice, maxVariantPrice } = product.priceRange
  const tags = product.tags
  return (
    <ProductThumb>
      <Link href={`/products/${product.handle}`}>
        <a>
          <BackgroundImage key={product.id} imageSrc={imageSrc} />
          <ProductContainer>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => {
                if (index < 1) {
                  return <span>{tag}</span>
                }
              })}
          </ProductContainer>
          <ProductInfo>
            <Header3>{product.title}</Header3>
            {minVariantPrice !== undefined &&
            minVariantPrice.amount !== maxVariantPrice.amount ? (
              <Header3>
                | ${minVariantPrice.amount} - ${maxVariantPrice.amount}
              </Header3>
            ) : (
              <Header3>| ${maxVariantPrice.amount}</Header3>
            )}
          </ProductInfo>
        </a>
      </Link>
    </ProductThumb>
  )
}
