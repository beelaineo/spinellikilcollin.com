import * as React from 'react'
import { Product, Maybe } from '../../types'
import { Heading, P } from '../../components/Text'

import { definitely, parseHTML, useProductVariant } from '../../utils'
import { useShopData } from '../../providers/ShopDataProvider'

import styled, { css } from '@xstyled/styled-components'

import { Accordion } from '../../components/Accordion'
import { ImageGallery } from '../../components/ImageGallery'
import { addRecentlyViewedProduct } from '../../utils/recentlyViewed'
import { useAnalytics, useCountry, useShopify, useModal } from '../../providers'

const { useEffect, useState } = React

import { config } from '../../config'
import {
  BuyButton,
  ProductVariantSelector,
  ShippingStatus,
} from '../ProductDetail/components'
const { SHOW_IN_STOCK_INDICATORS } = config
const showInStockIndicators = SHOW_IN_STOCK_INDICATORS === 'true'

interface ShopifyProductListingProduct extends Product {
  filterData: {
    inStock: boolean
    metal: string[]
    stone: string[]
    style: string[]
    subcategory: string[]
    sizes: (string | undefined)[]
  }
}

interface HighValueProductListItemProps {
  product: ShopifyProductListingProduct
}

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

export const HighValueProductListItem = ({
  product,
}: HighValueProductListItemProps) => {
  const DescriptionWrapper = styled.div`
    ${({ theme }) => css`
      display: grid;
      grid-template-columns: 50% 10% 1fr;
      grid-column-gap: 3;

      padding: 8 11;

      ${theme.mediaQueries.tablet} {
        padding: 4 8;
      }

      ${theme.mediaQueries.mobile} {
        padding: 4 5;
        display: flex;
        flex-direction: column;
      }
    `}
  `
  const TextWrapper = styled.div`
    ${({ theme }) => css`
      position: relative;
      z-index: 1;
      max-width: 800px;
      &:first-of-type p {
        font-size: 16px;
      }
      p {
        font-weight: 200;
        font-size: 13px;
      }
      ${theme.mediaQueries.mobile} {
        &:first-of-type p {
          font-size: 13px;
        }
        &:last-of-type {
          display: none;
        }
      }
    `}
  `
  const description = parseHTML(product?.store?.descriptionHtml)
  const { sendProductDetailView } = useAnalytics()
  const { currentCountry } = useCountry()
  const { productInfoSettings } = useShopData()
  const { openHighValueCustomizationModal } = useModal()
  /* get product variant utils */
  if (!product.store) return null
  if (!product.store?.variants) return null

  const useProductVariantOptions = { initialVariant: 'first' }
  const { currentVariant, selectVariant } = useProductVariant(
    product,
    useProductVariantOptions,
  )

  const leadTimeLabel = productInfoSettings?.leadTimeLabel
  const [isInquiryOnly, setIsInquiryOnly] = useState(false)

  useEffect(() => {
    if (!currentVariant) throw new Error('Could not get current variant')
    sendProductDetailView({ product, variant: currentVariant })
    // console.log('currentVariant', currentVariant)
    // console.log('product', product)
    // add recently viewed products store hook here
    addRecentlyViewedProduct(product.shopifyId, currentVariant.id)
  }, [currentVariant])

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

  const productSizes = product?.options?.find(
    (option) => option?.name === 'Size',
  )
  const productSize = productSizes?.values?.[0]?.value ?? null

  const readyToShip = !currentVariant?.sourceData?.currentlyNotInStock

  const handleHighValueInquiryClick = () => {
    const variant = currentVariant || undefined
    openHighValueCustomizationModal({
      currentProduct: product,
      currentVariant: variant,
    })
  }

  return (
    <Accordion product={product}>
      <ImageGallery product={product} />
      <div className="pd-wrapper">
        {description ? (
          <div>
            <Heading level={5}>Description</Heading>
            {/* <RichText body={description} /> */}
            <div className="hv-description">{description}</div>
          </div>
        ) : null}
        <div className="pd-options">
          {productSize && productSizes?.values?.length == 1 ? (
            <Heading level={5}>
              Size: {productSize}
              {variantsInStock?.length > 0 && showInStockIndicators
                ? ' | In Stock'
                : ''}
            </Heading>
          ) : productSizes?.values &&
            productSize &&
            currentVariant &&
            productSizes.values.length > 1 ? (
            <ProductVariantSelector
              variants={variants}
              currentVariant={currentVariant}
              changeValueForOption={changeValueForOption}
              product={product}
              setIsInquiryOnly={setIsInquiryOnly}
            />
          ) : null}
          <Heading level={5} weight={2}>
            <ShippingStatus readyToShip={readyToShip} />
          </Heading>
        </div>
        <BuyButton
          product={productWithInquiryOverride}
          addLineItem={addLineItem}
          currentVariant={currentVariant || undefined}
          hideShippingStatus={true}
        />
        <P fontSize={5}>
          <button
            style={{ textDecoration: 'underline' }}
            onClick={handleHighValueInquiryClick}
          >
            Inquire about this piece
          </button>
        </P>
      </div>
    </Accordion>
  )
}
