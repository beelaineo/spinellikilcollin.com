import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct } from '../../types'
import { Heading } from '../Text'
import { formatMoney } from '../../utils'
import {
  BackgroundImage,
  ProductInfo,
  ProductThumb,
  ProductContainer,
} from './styled'

interface ProductThumbnail {
  product: ShopifyProduct
  displayPrice?: boolean
}

export const ProductThumbnail = ({
  product,
  displayPrice,
}: ProductThumbnail) => {
  // @ts-ignore
  const [images] = unwindEdges(product.sourceData.images)
  const imageSrc = images.length ? images[0].originalSrc : undefined
  const { minVariantPrice, maxVariantPrice } =
    product?.sourceData?.priceRange || {}
  const tags = product?.sourceData?.tags
  return (
    <ProductThumb>
      <Link href="/products/[productSlug]" as={`/products/${product.handle}`}>
        <a>
          {imageSrc ? (
            <BackgroundImage
              key={product._id || 'some-key'}
              imageSrc={imageSrc}
            />
          ) : null}
          <ProductContainer style={{ display: 'none' }}>
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
            {displayPrice ? (
              <>
                {minVariantPrice &&
                maxVariantPrice &&
                minVariantPrice.amount !== maxVariantPrice.amount ? (
                  <Heading level={3}>
                    | {formatMoney(minVariantPrice)} -{' '}
                    {formatMoney(maxVariantPrice)}
                  </Heading>
                ) : maxVariantPrice ? (
                  <Heading level={3}>| {formatMoney(maxVariantPrice)}</Heading>
                ) : null}
              </>
            ) : null}
          </ProductInfo>
        </a>
      </Link>
    </ProductThumb>
  )
}
