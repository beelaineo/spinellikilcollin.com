import * as React from 'react'
import { useRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct, ShopifySourceImage } from '../../types'
import {
  getVariantTitle,
  parseHTML,
  definitely,
  getSelectedOptionValues,
  getProductUri,
  getAdditionalDescriptions,
} from '../../utils'
import {
  useShopify,
  useAnalytics,
  CurrentProductProvider,
} from '../../providers'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { Affirm } from '../../components/Affirm'
import {
  ProductVariantSelector,
  BuyButton,
  ProductImages,
  ProductDetailHeader,
  ProductDetailFooter,
  ProductRelated,
  RingSizerButton,
} from './components'
import { useShopData } from '../../providers/ShopDataProvider'
import { useModal } from '../../providers/ModalProvider'
import { useProductVariant } from '../../utils'
import {
  ProductPageWrapper,
  AffirmWrapper,
  ProductDetails,
  ProductInfoWrapper,
  ProductImagesWrapper,
  ProductAccordionsWrapper,
  InfoWrapper,
} from './styled'
import { Accordion } from '../../components/Accordion'
import { SEO } from '../../components/SEO'

const { useEffect } = React

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
  const { getProductInfoBlocks } = useShopData()
  const productInfoBlocks = getProductInfoBlocks(product)
  const accordions = productInfoBlocks
  /* get product variant utils */
  if (!product.sourceData) return null
  if (!product.variants) return null
  const { currentVariant, selectVariant } = useProductVariant(
    product,
    useProductVariantOptions,
  )

  const productType = product?.sourceData?.productType
  const [images] = unwindEdges(product?.sourceData?.images)

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

  /* get product image variants from Shopify */
  const description = parseHTML(product?.sourceData?.descriptionHtml)
  const selectedOptions = getSelectedOptionValues(product, currentVariant)
  const optionDescriptions = getAdditionalDescriptions(selectedOptions)

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

  return (
    <>
      <SEO
        seo={seo}
        defaultSeo={defaultSeo}
        path={path}
        contentType="product"
        product={product}
      />
      <CurrentProductProvider product={product} currentVariant={currentVariant}>
        <ProductPageWrapper>
          <Column>
            <ProductDetails>
              <ProductImagesWrapper>
                <ProductImages
                  currentVariant={currentVariant}
                  product={product}
                  screen="desktop"
                />
              </ProductImagesWrapper>
              <InfoWrapper>
                <ProductDetailHeader
                  currentVariant={currentVariant}
                  product={product}
                />
                <ProductImages
                  currentVariant={currentVariant}
                  product={product}
                  screen="mobile"
                />

                <ProductInfoWrapper>
                  <ProductVariantSelector
                    variants={variants}
                    currentVariant={currentVariant}
                    changeValueForOption={changeValueForOption}
                    product={product}
                  />
                  <BuyButton
                    product={product}
                    addLineItem={addLineItem}
                    currentVariant={currentVariant}
                  />
                  {inquiryOnly !== true ? (
                    <AffirmWrapper>
                      <Affirm price={currentVariant?.sourceData?.priceV2} />
                    </AffirmWrapper>
                  ) : null}

                  <ProductAccordionsWrapper>
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
                    {productType === 'Ring' ? (
                      <RingSizerButton
                        product={product}
                        variant={currentVariant}
                        mobile
                      />
                    ) : null}
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
