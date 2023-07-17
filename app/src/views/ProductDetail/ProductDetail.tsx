import * as React from 'react'
import { useRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  Maybe,
  Scalars,
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceImage,
  ShopifySourceProductVariant,
} from '../../types'
import {
  getVariantTitle,
  parseHTML,
  definitely,
  getSelectedOptionValues,
  getProductUri,
  getAdditionalDescriptions,
  getStorefrontId,
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
import { useModal } from '../../providers/ModalProvider'
import {
  ProductPageWrapper,
  AffirmWrapper,
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
  product: ShopifyProduct
}

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
  const { getProductInfoBlocks, productInfoSettings } = useShopData()
  const productInfoBlocks = getProductInfoBlocks(product)
  const accordions = productInfoBlocks
  /* get product variant utils */
  if (!product.sourceData) return null
  if (!product.variants) return null
  const { currentVariant, selectVariant } = useProductVariant(
    product,
    useProductVariantOptions,
  )

  const { width: viewportWidth } = useViewportSize()
  const productType = product?.sourceData?.productType
  const [images] = unwindEdges(product?.sourceData?.images)
  const hidden = product?.hideFromSearch

  useEffect(() => {
    if (!currentVariant) throw new Error('Could not get current variant')
    sendProductDetailView({ product, variant: currentVariant })
  }, [currentVariant])

  /* Add the variant ID as a query parameter */
  useEffect(() => {
    if (!currentVariant) return
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
  const { inquiryOnly, seo, handle, variants: maybeVariants } = product

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

  const stockedVariants = product.sourceData?.variants?.edges?.filter(
    (variant) => {
      return (
        variant?.node?.availableForSale === true &&
        variant?.node?.currentlyNotInStock === false &&
        !variant?.node?.selectedOptions?.find(
          (o) => o?.value == 'Not sure of my size',
        ) &&
        !variant?.node?.selectedOptions?.find((o) => o?.name == 'Carat')
      )
    },
  )

  const stockedColorOptions = stockedVariants
    ?.map((variant) => {
      return variant?.node?.selectedOptions?.find(
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
      return stockedOptions.includes(color)
    } else {
      return Boolean(stockedVariants?.length > 0)
    }
  }

  /* get product image variants from Shopify */
  const description = parseHTML(product?.sourceData?.descriptionHtml)
  const selectedOptions = getSelectedOptionValues(product, currentVariant)
  const optionDescriptions = getAdditionalDescriptions(selectedOptions)

  const optionsWithAnimation =
    selectedOptions.filter((option) => option.animation) || []

  interface VariantAnimation {
    __typename: 'CloudinaryVideo'
    videoId?: Maybe<Scalars['String']>
    enableAudio?: Maybe<Scalars['Boolean']>
    enableControls?: Maybe<Scalars['Boolean']>
    subtitle?: Maybe<Scalars['String']>
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
  const [disableStockIndication, setDisableStockIndication] = useState(true)
  const [disableVariantStockIndication, setDisableVariantStockIndication] =
    useState(true)
  const productImages = product.sourceData?.images
    ? unwindEdges(product.sourceData.images)[0]
    : []

  const posterImage = currentVariant?.sourceData?.image
    ? currentVariant.sourceData.image
    : productImages.length
    ? productImages[0]
    : undefined

  const changeValueForOption = (optionName: string) => (newValue: string) => {
    const previousOptions = currentVariant?.sourceData?.selectedOptions || []
    if (!product.sourceData) {
      throw new Error('Product was loaded without sourceData')
    }
    const [variants] = unwindEdges(product.sourceData.variants)

    const newOptions = definitely(previousOptions).map(({ name, value }) => {
      if (name !== optionName) return { name, value }
      return { name, value: newValue }
    })

    const newVariant = variants.find((variant) => {
      const { selectedOptions } = variant
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
          const { selectedOptions } = variant

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

  const productIsExcluded = async (
    product: ShopifyProduct,
  ): Promise<boolean> => {
    const productIsExcluded = await sanityBooleanQuery(
      `*[_type == 'shopifyProduct' && handle == $handle][0].sourceData.metafields.edges[node.key == "excludeFromIndication"][0].node.value`,
      { handle: product?.handle },
    )
    return Boolean(productIsExcluded)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isExcludedFromStockIndication = (product: ShopifyProduct) => {
    const excludedProducts = productInfoSettings?.excludeFromStockIndication
    const handle = product?.handle
    const isInExcludedList = excludedProducts?.find((product) => {
      return product?.handle === handle
    })
    if (!isInExcludedList) {
      setDisableStockIndication(false)
      return
    }
    productIsExcluded(product).then((res: boolean) => {
      setDisableStockIndication(res)
    })
  }

  useEffect(() => {
    const variantIsExcluded = async (
      variant: ShopifyProductVariant,
      product: ShopifyProduct,
    ): Promise<boolean> => {
      const variantIsExcluded = await sanityQuery(
        `*[_type == 'shopifyProduct' && handle == $handle][0].variants[id == $id].sourceData.metafields.edges[node.key == "excludeFromIndication"][0].node.value`,
        { handle: product?.handle, id: variant?.sourceData?.id },
      )
      return Boolean(variantIsExcluded == 'true')
    }

    variantIsExcluded(currentVariant, product).then((res: boolean) => {
      setDisableVariantStockIndication(res)
    })
  }, [currentVariant, product])

  useEffect(() => {
    isExcludedFromStockIndication(product)
  }, [isExcludedFromStockIndication, disableStockIndication, product])

  const defaultSeo = {
    title: getVariantTitle(product, currentVariant),
    image:
      currentVariant?.sourceData?.image ?? images.length
        ? (currentVariant?.sourceData?.image as ShopifySourceImage)
        : images[0],
  }

  if (!handle) throw new Error('No handle fetched')
  const basePath = ['products', handle].join('/')
  const path = currentVariant?.shopifyVariantID
    ? basePath.concat('?v=').concat(currentVariant.shopifyVariantID)
    : basePath

  const weddingMatch = product.sourceData?.tags?.some(
    (tag) => tag === 'wedding',
  )

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
                  product={product}
                  disableStockIndication={disableStockIndication}
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
                  {variantsInStock?.length > 0 &&
                  disableStockIndication !== true ? (
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
                          ? 'Ready to Ship'
                          : 'Ready to Ship in Select Sizes'}
                      </Heading>
                    </StockedLabelMobile>
                  ) : null}
                  <ProductVariantSelector
                    variants={variants}
                    currentVariant={currentVariant}
                    changeValueForOption={changeValueForOption}
                    product={product}
                    disableStockIndication={disableStockIndication}
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
                    product={product}
                    addLineItem={addLineItem}
                    currentVariant={currentVariant}
                  />
                  {inquiryOnly !== true &&
                  product.sourceData?.productType !== 'Gift Card' ? (
                    <AffirmWrapper>
                      <Affirm price={currentVariant?.sourceData?.priceV2} />
                    </AffirmWrapper>
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
                              <RichText body={a.bodyRaw} />
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
