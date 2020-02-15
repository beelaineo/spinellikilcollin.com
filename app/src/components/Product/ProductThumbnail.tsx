import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct } from '../../types'
import { Heading } from '../Text'
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
            <Heading level={3}>{product.title}</Heading>
            {minVariantPrice &&
            maxVariantPrice &&
            minVariantPrice.amount !== maxVariantPrice.amount ? (
              <Heading level={3}>
                | ${minVariantPrice.amount} - ${maxVariantPrice.amount}
              </Heading>
            ) : maxVariantPrice ? (
              <Heading level={3}>| ${maxVariantPrice.amount}</Heading>
            ) : null}
          </ProductInfo>
        </a>
      </Link>
    </ProductThumb>
  )
}
