import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useProductVariant, useCheckout } from 'use-shopify'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'
import { parseHTML, definitely } from '../../utils'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import {
  ProductVariantSelector,
  BuyButton,
  ProductImages,
  ProductDetailHeader,
  ProductDetailFooter,
  ProductRelated,
} from './components'
import { useShopData } from '../../providers/ShopDataProvider'
import {
  Wrapper,
  ProductDetails,
  ProductInfoWrapper,
  ProductImagesWrapper,
  ProductAccordionsWrapper,
} from './styled'
import { Accordion } from '../../components/Accordion'

interface Props {
  product: ShopifyProduct
}

export const ProductDetail = ({ product }: Props) => {
  /* get additional info blocks from Sanity */
  const { getProductInfoBlocks } = useShopData()
  const productInfoBlocks = getProductInfoBlocks(product)
  const accordions = productInfoBlocks

  /* get product variant utils */
  if (!product.sourceData) return null
  if (!product.variants) return null
  const {
    currentVariant: currentVariantSource,
    selectVariant,
  } = useProductVariant(
    // @ts-ignore
    product.sourceData,
  )

  const currentVariant = product.variants.find(
    (v) => v && v.shopifyVariantID === currentVariantSource.id,
  )

  if (!currentVariant) return null

  const { addLineItem } = useCheckout()
  const { variants: maybeVariants } = product

  const variants = definitely(maybeVariants)

  /* get product image variants from Shopify */
  const description = parseHTML(product?.sourceData?.descriptionHtml)

  const changeValueForOption = (optionName: string) => (newValue: string) => {
    // TODO: Move this over to use-shopify
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

  return (
    <Wrapper>
      <Column>
        <ProductDetails>
          <ProductImagesWrapper>
            <ProductImages
              selectVariant={selectVariant}
              currentVariant={currentVariant}
              product={product}
            />
          </ProductImagesWrapper>
          <ProductDetailHeader
            currentVariant={currentVariant}
            product={product}
          />
          <ProductInfoWrapper>
            <ProductVariantSelector
              variants={variants}
              currentVariant={currentVariant}
              changeValueForOption={changeValueForOption}
              product={product}
            />
            <BuyButton
              addLineItem={addLineItem}
              currentVariant={currentVariant}
            />
            <ProductAccordionsWrapper>
              {description ? (
                <Accordion label="Description">{description}</Accordion>
              ) : null}
              {accordions
                ? accordions.map((a) => (
                    <Accordion key={a._key} label={a.title}>
                      <RichText body={a.bodyRaw} />
                    </Accordion>
                  ))
                : null}
            </ProductAccordionsWrapper>
          </ProductInfoWrapper>
        </ProductDetails>
      </Column>
      <ProductDetailFooter product={product} />
      <ProductRelated product={product} />
    </Wrapper>
  )
}
