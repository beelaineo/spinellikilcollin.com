import * as React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { CurrentProductProvider, useShopData } from '../providers'
import {
  ShopifySourceImage,
  Product,
  ShopifyProductVariant,
  RichImage,
  Image,
  Maybe,
  Seo,
  LegacySeo,
  ShopifyImage,
  ShopifyCollectionImage,
  ShopifyVariantImage,
} from '../types'
import { definitely, getProductIdLocationSearch } from '../utils'

type ImageType =
  | Image
  | RichImage
  | ShopifySourceImage
  | ShopifyImage
  | ShopifyCollectionImage
  | ShopifyVariantImage
  | null

type DefaultSeo = {
  title?: string | null
  description?: string | null
  image?: ImageType
}

interface SEOProps {
  seo?: Maybe<Seo | LegacySeo>
  defaultSeo: DefaultSeo
  path: string
  contentType?: string
  product?: Product
  hidden?: Maybe<boolean>
  currentVariant?: ShopifyProductVariant
}

const BASE_URL = 'https://www.spinellikilcollin.com'

interface HomeSEOProps {
  defaultSeo: DefaultSeo
  phone?: Maybe<string>
}
interface ContactSEOProps {
  defaultSeo: DefaultSeo
}

interface AboutSEOProps {
  defaultSeo: DefaultSeo
}

interface ProductSEOProps {
  product: Product
  defaultSeo: DefaultSeo
  currentVariant?: ShopifyProductVariant
}

const ContactSEO = ({ defaultSeo }: ContactSEOProps) => {
  const { description, image } = defaultSeo
  const ldJson = {
    '@type': 'ContactPage',
    '@context': 'http://schema.org',
    description: description,
    image: getImageUrl(image),
  }
  return (
    <Script
      id="contact-ldjson"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
    />
  )
}

const AboutSEO = ({ defaultSeo }: AboutSEOProps) => {
  const { description, image } = defaultSeo
  const ldJson = {
    '@type': 'aboutPage',
    '@context': 'http://schema.org',
    description: description,
    image: getImageUrl(image),
  }
  return (
    <Script
      id="about-ldjson"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
    />
  )
}

const HomeSEO = ({ defaultSeo, phone }: HomeSEOProps) => {
  const { description } = defaultSeo
  const ldJson = {
    '@type': 'Corporation',
    '@context': 'http://schema.org',
    name: 'Spinelli Kilcollin',
    description: description,
    telephone: phone ? phone : '',
  }
  return (
    <Script
      id="home-ldjson"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
    />
  )
}

const ProductSEO = ({
  product,
  currentVariant,
  defaultSeo,
}: ProductSEOProps) => {
  const minVariantPrice = product.store?.priceRange?.minVariantPrice
  const formattedPrice = minVariantPrice
    ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(minVariantPrice)
        .replace(/^\$/, '')
    : undefined

  const availability = product?.store?.availableForSale ? 'instock' : 'oos'
  let id, imageSrc
  const vendor = product?.store?.vendor
  const description = product?.store?.description
  const productType = product?.store?.productType
  const sku = currentVariant?.sourceData?.sku
  const variantPrice =
    currentVariant?.sourceData?.compareAtPriceV2?.amount !== 0
      ? currentVariant?.sourceData?.compareAtPriceV2?.amount
      : currentVariant?.sourceData?.priceV2?.amount

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
    brand: {
      name: 'Spinelli Kilcollin',
    },
    image: imageSrc ? imageSrc : '',
    productID: id,
    sku: sku ? sku : '',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: variantPrice,
      itemCondition: 'http://schema.org/NewCondition',
      availability: 'http://schema.org/InStock',
    },
  }

  return (
    <>
      <Head>
        <meta property="og:availability" content={availability} />
        <meta property="og:description" content={description || undefined} />
        <meta property="og:id" content={id || undefined} />
        <meta property="product:price:amount" content={formattedPrice} />
        <meta property="product:price:currency" content="USD" />
        <meta property="og:price:amount" content={formattedPrice} />
        <meta property="og:price:currency" content="USD" />
      </Head>
      <Script
        id="product-ldjson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
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
  currentVariant,
  hidden,
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
        {hidden === true ? (
          <meta name="robots" content="noindex" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle || title || undefined} />
        <meta name="twitter:description" content={description || undefined} />
        <meta name="twitter:image" content={imageUrl || undefined} />
        <link rel="canonical" href={canonical} />
      </Head>

      {contentType === 'homepage' ? (
        <HomeSEO defaultSeo={defaultSeo} phone={siteSettings?.phone} />
      ) : null}

      {contentType === 'about' ? <AboutSEO defaultSeo={defaultSeo} /> : null}

      {contentType === 'contact' ? (
        <ContactSEO defaultSeo={defaultSeo} />
      ) : null}

      {contentType === 'product' && product ? (
        <ProductSEO
          product={product}
          defaultSeo={defaultSeo}
          currentVariant={currentVariant}
        />
      ) : null}
    </>
  )
}
