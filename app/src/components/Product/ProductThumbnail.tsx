import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct } from '../../types'
import { Header3, Header6 } from '../Text'
import {
  BackgroundImage,
  ProductInfo,
  ProductThumb,
  ProductContainer,
} from './styled'

interface ProductThumbnail {
  product: ShopifyProduct
}

export const ProductThumbnail = ({ product }: ProductThumbnail) => {
  // @ts-ignore
  const [images] = unwindEdges(product.sourceData.images)
  const imageSrc = images.length ? images[0].originalSrc : undefined
  let { minVariantPrice, maxVariantPrice } =
    product?.sourceData?.priceRange || {}
  const tags = product?.sourceData?.tags
  return (
    <ProductThumb>
      <Link href={`/products/${product.handle}`}>
        <a>
          <BackgroundImage key={product._id} imageSrc={imageSrc} />
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
            {minVariantPrice &&
            maxVariantPrice &&
            minVariantPrice.amount !== maxVariantPrice.amount ? (
              <Header3>
                | ${minVariantPrice.amount} - ${maxVariantPrice.amount}
              </Header3>
            ) : maxVariantPrice ? (
              <Header3>| ${maxVariantPrice.amount}</Header3>
            ) : null}
          </ProductInfo>
        </a>
      </Link>
    </ProductThumb>
  )
}
