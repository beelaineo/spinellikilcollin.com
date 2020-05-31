import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct } from '../../types'
import { Heading } from '../Text'
import { TagBadges } from './TagBadges'
import { ProductSwatches } from './ProductSwatches'
import { formatMoney } from '../../utils'
import { BackgroundImage, ProductInfo, ProductThumb } from './styled'

interface ProductThumbnail {
  product: ShopifyProduct
  displayPrice?: boolean
}

export const ProductThumbnail = ({
  product,
  displayPrice,
}: ProductThumbnail) => {
  const images = product.sourceData?.images
    ? unwindEdges(product.sourceData.images)[0]
    : []
  const imageSrc = images.length ? images[0].originalSrc : undefined
  const { minVariantPrice, maxVariantPrice } =
    product?.sourceData?.priceRange || {}
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
          <TagBadges product={product} />
          <ProductInfo>
            <Heading textAlign="center" level={3}>
              {product.title}
            </Heading>
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
          <ProductSwatches product={product} />
        </a>
      </Link>
    </ProductThumb>
  )
}
