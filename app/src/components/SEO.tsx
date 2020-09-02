import * as React from 'react'
import Head from 'next/head'
import {
  ShopifySourceImage,
  ShopifyProduct,
  RichImage,
  Image,
  Maybe,
  Seo,
} from '../types'

type ImageType = Image | RichImage | ShopifySourceImage

type DefaultSeo = {
  title?: string | null
  description?: string | null
  image?: ImageType
}

interface SEOProps {
  seo?: Maybe<Seo>
  defaultSeo: DefaultSeo
  path: string
  contentType?: string
  product?: ShopifyProduct
}

const BASE_URL = 'https://www.spinellikilcollin.com'

interface ProductSEOProps {
  product: ShopifyProduct
}

const ProductSEO = ({ product }: ProductSEOProps) => {
  const { minVariantPrice } = product
  const formattedPrice = minVariantPrice
    ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(minVariantPrice)
        .replace(/^\$/, '')
    : undefined

  const availability = product?.sourceData?.availableForSale ? 'instock' : 'oos'

  return (
    <>
      <meta property="og:availability" content={availability} />
      <meta property="product:price:amount" content={formattedPrice} />
      <meta property="product:price:currency" content="USD" />
      <meta property="og:price:amount" content={formattedPrice} />
      <meta property="og:price:currency" content="USD" />
    </>
  )
}

const getImageUrl = (image?: ImageType | null): string | undefined => {
  if (!image) return undefined
  if (image.__typename === 'Image' || image.__typename === 'RichImage') {
    return image?.asset?.url ?? undefined
  }
  if (image.__typename === 'ShopifySourceImage') {
    return image?.originalSrc ?? undefined
  }
  return undefined
}

export const SEO = ({
  path,
  seo,
  defaultSeo,
  contentType,
  product,
}: SEOProps) => {
  if (!defaultSeo.title) throw new Error('No default title was supplied')
  const { keywords, metaTitle, description, title, image } = {
    ...defaultSeo,
    ...seo,
  }
  const canonical = [BASE_URL, path].join('/')
  const imageUrl = getImageUrl(image)
  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description || undefined} />
      <meta name="keywords" content={keywords || undefined} />
      <meta property="og:title" content={metaTitle || title || undefined} />
      <meta property="og:description" content={description || undefined} />
      <meta property="og:image" content={imageUrl || undefined} />
      <meta property="og:image_secure_url" content={imageUrl || undefined} />
      <meta property="og:type" content={contentType || 'website'} />
      <meta property="og:url" content={canonical} />
      <meta name="robots" content="index, follow" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle || title || undefined} />
      <meta name="twitter:description" content={description || undefined} />
      <meta name="twitter:image" content={imageUrl || undefined} />
      <link rel="canonical" href={canonical} />
      {contentType === 'product' && product ? (
        <ProductSEO product={product} />
      ) : null}
    </Head>
  )
}
