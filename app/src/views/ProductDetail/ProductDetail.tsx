/* eslint-disable react/no-unknown-property */
import * as React from 'react'
import { useRouter } from 'next/router'
import {
  Maybe,
  Product,
  ShopifyProductVariant,
  ShopifyImage,
  ShopifyVariantImage,
} from '../../types'
import {
  getVariantTitle,
  parseHTML,
  definitely,
  getSelectedOptionValues,
  getProductUri,
  getAdditionalDescriptions,
  useProductVariant,
  useViewportSize,
  withTypenames,
} from '../../utils'
import {
  useShopify,
  useAnalytics,
  CurrentProductProvider,
} from '../../providers'
import { CloudinaryAnimation } from '../../components/CloudinaryVideo'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { Affirm } from '../../components/Affirm'
import { Heading } from '../../components/Text'
import { AppointmentsButton } from './components/AppointmentsButton'

import {
  ProductVariantSelector,
  BuyButton,
  ProductImages,
  ProductDetailHeader,
  ProductDetailFooter,
  ProductRelated,
  RingSizerButton,
  SizeConverterButton,
} from './components'
import { useShopData } from '../../providers/ShopDataProvider'
import { useCountry } from '../../providers/CountryProvider'
import { useModal } from '../../providers/ModalProvider'
import {
  ProductPageWrapper,
  AffirmWrapper,
  KlarnaWrapper,
  ProductDetails,
  ProductInfoWrapper,
  ProductImagesWrapper,
  ProductAccordionsWrapper,
  InfoWrapper,
  RingToolsWrapper,
} from './styled'
import { Accordion } from '../../components/Accordion'
import { SEO } from '../../components/SEO'
import { configureScope } from '@sentry/node'
import { variantFragment } from '../../graphql'
import styled, { css } from '@xstyled/styled-components'
import { sanityClient } from '../../services/sanity'
import { CustomizeButton } from './components/CustomizeButton'
import { Klarna } from '../../components/Klarna'

const { useEffect, useState } = React

const InStockDot = styled('span')`
  ${({ theme }) => css`
    display: inline-block;
    background-color: #00d009;
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 100%;
    border: 1px solid #f5f3f3;
  `}
`
interface WithHide {
  hide: boolean
}

const StockedLabelMobile = styled('div')<WithHide>`
  ${({ theme, hide }) => css`
    display: none;
    margin-bottom: 4;
    opacity: ${hide ? 0 : 1};
    transition: 250ms ease;
    font-size: ${theme.fontSizes[5]}px;
    ${theme.mediaQueries.tablet} {
      display: block;
    }
  `}
`

interface Props {
  product: Product
}
import { config } from '../../config'

const { SHOW_IN_STOCK_INDICATORS } = config

const showInStockIndicators = SHOW_IN_STOCK_INDICATORS === 'true'

export const ProductDetail = ({ product }: Props) => {
  const { openCustomizationModal } = useModal()
  const router = useRouter()
  const params = new URLSearchParams(router.asPath.replace(/^(.*)\?/, ''))
  const variantId = params.get('v')
  const useProductVariantOptions = variantId
    ? { initialVariant: variantId }
    : undefined
  /* get additional info blocks from Sanity */
  const { sendProductDetailView } = useAnalytics()
  const { currentCountry } = useCountry()
  const { getProductInfoBlocks, productInfoSettings } = useShopData()
  const productInfoBlocks = getProductInfoBlocks(product)
  const accordions = productInfoBlocks
  /* get product variant utils */
  if (!product.store) return null
  if (!product.store?.variants) return null
  const { currentVariant, selectVariant } = useProductVariant(
    product,
    useProductVariantOptions,
  )

  const { width: viewportWidth } = useViewportSize()
  const productType = product?.store?.productType
  const images = product?.store?.images || []
  const hidden = product?.hideFromSearch
  const leadTimeLabel = productInfoSettings?.leadTimeLabel

  const [isInquiryOnly, setIsInquiryOnly] = useState(false)

  // console.log('product', product)

  /* Add the variant ID as a query parameter */
  useEffect(() => {
    if (!currentVariant) throw new Error('Could not get current variant')
    sendProductDetailView({ product, variant: currentVariant })

    const newUri = getProductUri(product, {
      variant: currentVariant,
      currentPath: router.asPath,
    })
    if (!newUri) return
    const { pathname, search } = window.location
    const currentUri = [pathname, search].join('')
    if (currentUri === newUri) return
    router.replace(newUri, undefined, {
      scroll: false,
      shallow: true,
    })
  }, [currentVariant])

  useEffect(() => {
    const paramString = router.asPath.replace(/^(.*)\?/, '')
    const params = new URLSearchParams(paramString)
    const timeout = setTimeout(() => {
      if (params.get('customizeOpen') === 'true') {
        openCustomizationModal({
          currentProduct: product,
          currentVariant: currentVariant || undefined,
        })
      }
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  if (!currentVariant) return null

  const { addLineItem } = useShopify()

  const productWithInquiryOverride = {
    ...product,
    inquiryOnly: isInquiryOnly ? isInquiryOnly : product.inquiryOnly,
  }

  const { seo, handle } = product

  const { inquiryOnly } = productWithInquiryOverride

  const maybeVariants = product?.store?.variants
  const variants = definitely(maybeVariants)
  const { currentlyNotInStock } = currentVariant?.sourceData ?? {}
  const variantsInStock =
    variants?.filter(
      (v) =>
        v?.sourceData?.currentlyNotInStock === false &&
        !v?.sourceData?.selectedOptions?.find(
          (o) => o?.value == 'Not sure of my size',
        ) &&
        !v?.sourceData?.selectedOptions?.find((o) => o?.name == 'Carat'),
    ) || []

  const slugify = (text?: Maybe<string>) => {
    if (!text) return ''
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  const stockedVariants = product.store?.variants?.filter((variant) => {
    return (
      variant?.sourceData?.availableForSale === true &&
      variant?.sourceData?.currentlyNotInStock === false &&
      !variant?.sourceData?.selectedOptions?.find(
        (o) => o?.value == 'Not sure of my size',
      ) &&
      !variant?.sourceData?.selectedOptions?.find((o) => o?.name == 'Carat')
    )
  })

  const stockedColorOptions = stockedVariants
    ?.map((variant) => {
      return variant?.sourceData?.selectedOptions?.find(
        (option) => option?.name === 'Color',
      )
    })
    .map((option) => slugify(option?.value))

  const isSwatchCurrentlyInStock = (
    currentVariant,
    stockedOptions,
    stockedVariants,
  ): boolean => {
    if (
      currentVariant.sourceData?.selectedOptions?.find(
        (option) => option.name === 'Color',
      ) !== undefined
    ) {
      const color = slugify(
        currentVariant.sourceData.selectedOptions.find(
          (option) => option.name === 'Color',
        ).value,
      )
      // console.log('currentVariant', currentVariant)
      // console.log('stockedOptions', stockedOptions)
      // console.log('stockedVariants', stockedVariants)
      return stockedOptions.includes(color)
    } else {
      return Boolean(stockedVariants?.length > 0)
    }
  }

  /* get product image variants from Shopify */
  const description = parseHTML(product?.store?.descriptionHtml)
  const selectedOptions = getSelectedOptionValues(product, currentVariant)
  const optionDescriptions = getAdditionalDescriptions(selectedOptions)

  const optionsWithAnimation =
    selectedOptions.filter((option) => option.animation) || []

  interface VariantAnimation {
    __typename: 'CloudinaryVideo'
    videoId?: Maybe<string>
    enableAudio?: Maybe<boolean>
    enableControls?: Maybe<boolean>
    subtitle?: Maybe<string>
  }

  let variantHasAnimation = false
  const variantAnimation: VariantAnimation = {
    __typename: 'CloudinaryVideo',
  }

  if (optionsWithAnimation.length > 0) {
    variantHasAnimation = true
    variantAnimation.videoId = optionsWithAnimation[0].animation
  } else {
    variantHasAnimation = false
  }

  const [playing, setPlaying] = useState(false)
  const productImages = product.store?.images || []

  const posterImage = currentVariant?.sourceData?.image
    ? currentVariant.sourceData.image
    : productImages.length
    ? productImages[0]
    : undefined

  const changeValueForOption = (optionName: string) => (newValue: string) => {
    const previousOptions = currentVariant?.sourceData?.selectedOptions || []
    if (!product.store) {
      throw new Error('Product was loaded without store')
    }
    const variants = product.store.variants || []

    const newOptions = definitely(previousOptions).map(({ name, value }) => {
      if (name !== optionName) return { name, value }
      return { name, value: newValue }
    })

    const newVariant = variants.find((variant) => {
      const selectedOptions = variant?.sourceData?.selectedOptions
      if (!selectedOptions) return false

      const match = newOptions.every(({ name, value }) =>
        selectedOptions.some(
          (so) => so && so.name === name && so.value === value,
        ),
      )
      return match
    })

    // If a variant match is not found, find the best option based on the updated selection.
    // This can happen if a particular option does not exist, i.e.:
    // - Color: Black Gold, Size: 1
    // - Color: Black Gold, Size: 2
    // - Color: Yellow Gold, Size: 2
    //
    // If a user has currently selected BG/1, then changes the color option to "Yellow Gold",
    // YG/1 does not exist, so, default to YG/2
    const bestVariant = newVariant
      ? newVariant
      : variants.find((variant) => {
          const selectedOptions = variant?.sourceData?.selectedOptions

          if (!selectedOptions) return false
          const match = Boolean(
            selectedOptions.find(
              (so) => so && so.name === optionName && so.value === newValue,
            ),
          )
          return match
        })

    if (!bestVariant || !bestVariant.id) {
      throw new Error('No variant was found for these options')
    }
    selectVariant(bestVariant.id)
  }

  const sanityBooleanQuery = async <R = boolean,>(
    query: string,
    params?: Record<string, any>,
  ): Promise<R> => {
    const results = await sanityClient.fetch<R>(query, params || {})
    // @ts-ignore
    return withTypenames<R>(results)
  }

  const sanityQuery = async <R = string | null,>(
    query: string,
    params?: Record<string, any>,
  ): Promise<R> => {
    const results = await sanityClient.fetch<R>(query, params || {})
    // @ts-ignore
    return withTypenames<R>(results)
  }

  const defaultSeo = {
    title: getVariantTitle(product, currentVariant),
    image:
      currentVariant?.sourceData?.image ?? images.length
        ? (currentVariant?.sourceData?.image as ShopifyVariantImage)
        : images[0],
  }

  if (!handle) throw new Error('No handle fetched')
  const basePath = ['products', handle].join('/')
  const path = currentVariant?.shopifyVariantID
    ? basePath.concat('?v=').concat(currentVariant.shopifyVariantID)
    : basePath

  const weddingMatch = product.store?.tags?.some((tag) => tag === 'wedding')

  // console.log('currentVariant', currentVariant)

  return (
    <>
      <SEO
        seo={seo}
        defaultSeo={defaultSeo}
        path={path}
        contentType="product"
        product={product}
        currentVariant={currentVariant}
        hidden={hidden}
      />
      <CurrentProductProvider product={product} currentVariant={currentVariant}>
        <ProductPageWrapper tabIndex={-1}>
          <Column>
            <ProductDetails>
              <ProductImagesWrapper>
                {variantHasAnimation && variantAnimation?.videoId ? (
                  <CloudinaryAnimation
                    video={variantAnimation}
                    image={posterImage}
                    setPlaying={setPlaying}
                    screen="desktop"
                  />
                ) : null}
                <ProductImages
                  currentVariant={currentVariant}
                  product={product}
                  screen="desktop"
                  hide={Boolean(
                    variantHasAnimation && variantAnimation?.videoId,
                  )}
                />
              </ProductImagesWrapper>
              <InfoWrapper product={product}>
                <ProductDetailHeader
                  currentVariant={currentVariant}
                  currentCountry={currentCountry}
                  product={productWithInquiryOverride}
                />
                {variantHasAnimation && variantAnimation?.videoId ? (
                  <CloudinaryAnimation
                    video={variantAnimation}
                    image={posterImage}
                    setPlaying={setPlaying}
                    screen="mobile"
                  />
                ) : null}
                <ProductImages
                  currentVariant={currentVariant}
                  product={product}
                  screen="mobile"
                  hide={Boolean(
                    variantHasAnimation && variantAnimation?.videoId,
                  )}
                />
                <ProductInfoWrapper>
                  {variantsInStock?.length > 0 && showInStockIndicators ? (
                    <StockedLabelMobile
                      hide={
                        !isSwatchCurrentlyInStock(
                          currentVariant,
                          stockedColorOptions,
                          stockedVariants,
                        )
                      }
                    >
                      <Heading level={4} weight={1} as={'em'}>
                        <InStockDot />
                        {currentlyNotInStock !== true &&
                        !currentVariant.title?.includes('Not sure of my size')
                          ? 'In Stock'
                          : 'In Stock in Select Sizes'}
                      </Heading>
                    </StockedLabelMobile>
                  ) : null}
                  <ProductVariantSelector
                    variants={variants}
                    currentVariant={currentVariant}
                    changeValueForOption={changeValueForOption}
                    product={product}
                    setIsInquiryOnly={setIsInquiryOnly}
                  />
                  {productType === 'Ring' ? (
                    <RingToolsWrapper>
                      <RingSizerButton
                        product={product}
                        variant={currentVariant}
                      />
                      <SizeConverterButton
                        product={product}
                        variant={currentVariant}
                        addLineItem={addLineItem}
                      />
                      <AppointmentsButton />
                      <CustomizeButton
                        product={product}
                        variant={currentVariant}
                        wedding={weddingMatch}
                      />
                    </RingToolsWrapper>
                  ) : null}
                  <BuyButton
                    product={productWithInquiryOverride}
                    addLineItem={addLineItem}
                    currentVariant={currentVariant}
                  />
                  {inquiryOnly !== true &&
                  product.store?.productType !== 'Gift Card' &&
                  currentCountry === 'US' ? (
                    <>
                      <AffirmWrapper>
                        <style jsx global>{`
                          #klarnaPlacement::part(osm-cta) {
                            text-decoration: none;
                          }
                          #klarnaPlacement ::part(osm-message) {
                            font-family: 'Inferi', 'Georgia', serif;
                            font-weight: 200;
                            line-height: 18.2px;
                          }
                          #klarnaPlacement ::part(osm-cta) {
                            font-family: 'Inferi', 'Georgia', serif;
                            font-weight: 200;
                            line-height: 18.2px;
                          }
                        `}</style>
                        <Affirm price={currentVariant?.sourceData?.priceV2} />
                        <Klarna price={currentVariant?.sourceData?.priceV2} />
                      </AffirmWrapper>
                    </>
                  ) : null}

                  <ProductAccordionsWrapper>
                    {productType === 'Ring' ? (
                      <RingToolsWrapper>
                        <RingSizerButton
                          product={product}
                          variant={currentVariant}
                          mobile
                        />
                        <SizeConverterButton
                          product={product}
                          variant={currentVariant}
                          addLineItem={addLineItem}
                          mobile
                        />
                        {weddingMatch ? (
                          <>
                            <AppointmentsButton mobile />
                            <CustomizeButton
                              product={product}
                              variant={currentVariant}
                              mobile
                            />
                          </>
                        ) : null}
                      </RingToolsWrapper>
                    ) : null}
                    {description || optionDescriptions.length ? (
                      <Accordion label="Description">
                        {description ? description : null}
                        {optionDescriptions.length
                          ? optionDescriptions.map((description) => (
                              <RichText
                                key={description._key || 'some-key'}
                                body={description.descriptionRaw}
                              />
                            ))
                          : null}
                      </Accordion>
                    ) : null}
                    {accordions
                      ? accordions.map((a) =>
                          a.title ? (
                            <Accordion
                              key={a._key || 'some-key'}
                              label={a.title}
                            >
                              {a.title == 'Shipping' &&
                              currentCountry != 'US' ? (
                                <RichText body={a.body_intlRaw} />
                              ) : (
                                <RichText body={a.bodyRaw} />
                              )}
                            </Accordion>
                          ) : null,
                        )
                      : null}
                  </ProductAccordionsWrapper>
                </ProductInfoWrapper>
              </InfoWrapper>
            </ProductDetails>
          </Column>
        </ProductPageWrapper>
        <ProductDetailFooter product={product} />
        <ProductRelated product={product} />
      </CurrentProductProvider>
    </>
  )
}
