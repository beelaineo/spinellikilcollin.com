import * as React from 'react'
import Head from 'next/head'
import { useShopData } from '../providers'
import {
  ShopifySourceImage,
  ShopifyProduct,
  RichImage,
  Image,
  Maybe,
  Seo,
} from '../types'
import { definitely, getProductIdLocationSearch } from '../utils'

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
  defaultSeo: DefaultSeo
}

const ProductSEO = ({ product, defaultSeo }: ProductSEOProps) => {
  const { minVariantPrice } = product
  const formattedPrice = minVariantPrice
    ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(minVariantPrice)
        .replace(/^\$/, '')
    : undefined

  const availability = product?.sourceData?.availableForSale ? 'instock' : 'oos'
  let id, imageSrc
  const description = product?.sourceData?.description
  const productType = product?.sourceData?.productType

  if (typeof window !== 'undefined' && window.location.search) {
    const productId = getProductIdLocationSearch(window.location.search)
    if (productId) {
      id = productId
    }
  }

  if (defaultSeo?.image) {
    const image = defaultSeo?.image as ShopifySourceImage
    imageSrc = image.w100
  }

  // This is used for Bambuser scraper
  const ldJson = {
    '@type': 'Product',
    '@context': 'http://schema.org/',
    name: defaultSeo.title,
    description: description,
    brand: { '@type': productType },
    image: imageSrc ? imageSrc : '',
  }

  return (
    <Head>
      <meta property="og:availability" content={availability} />
      <meta property="og:description" content={description || undefined} />
      <meta property="og:id" content={id || undefined} />
      <meta property="product:price:amount" content={formattedPrice} />
      <meta property="product:price:currency" content="USD" />
      <meta property="og:price:amount" content={formattedPrice} />
      <meta property="og:price:currency" content="USD" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </Head>
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

const omitNull = (obj: Record<string, any>) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) return acc
    return {
      ...acc,
      [key]: value,
    }
  }, {})

const mergeSeo = (
  values: Array<Partial<Seo> | DefaultSeo | null | undefined>,
): Partial<Seo> => {
  return definitely(values).reduce<Partial<Seo>>(
    (acc, v) => ({
      ...acc,
      ...omitNull(v),
    }),
    {},
  )
}

export const SEO = ({
  path,
  seo,
  defaultSeo,
  contentType,
  product,
}: SEOProps) => {
  if (!defaultSeo.title) throw new Error('No default title was supplied')
  const { siteSettings } = useShopData()
  if (!siteSettings) throw new Error('Site settings were not provided')
  const { seo: globalSeo } = siteSettings
  const { keywords, metaTitle, description, title, image } = mergeSeo([
    globalSeo,
    defaultSeo,
    seo,
  ])

  const canonical = [BASE_URL, path].join('/')
  const imageUrl = getImageUrl(image)
  return (
    <>
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
      </Head>

      {contentType === 'product' && product ? (
        <ProductSEO product={product} defaultSeo={defaultSeo} />
      ) : null}
    </>
  )
}
