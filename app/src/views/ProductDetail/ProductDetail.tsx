import * as React from 'react'
import styled from 'styled-components'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct } from '../../types'
import { useProductVariant, useCheckout } from 'use-shopify'
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
import { getInfoBlocksByType, getInfoBlocksByTag } from './utils'

interface Props {
  product: ShopifyProduct
}

export const ProductDetail = ({ product }: Props) => {
  /* get additional info blocks from Sanity */
  const { getProductInfoBlocks } = useShopData()
  const productInfoBlocks = getProductInfoBlocks(product)
  console.log(productInfoBlocks)
  const accordions = productInfoBlocks
  /* get product variant utils */
  const { currentVariant, selectVariant } = useProductVariant(
    product.sourceData,
  )

  const changeValueForOption = (optionName: string) => (newValue: string) => {
    // TODO: Move this over to use-shopify
    const previousOptions = currentVariant.selectedOptions
    if (!product.sourceData) {
      throw new Error('Product was loaded without sourceData')
    }
    // @ts-ignore
    const [variants] = unwindEdges(product.sourceData.variants)
    const newOptions = previousOptions.map(({ name, value }) => {
      if (name !== optionName) return { name, value }
      return { name, value: newValue }
    })
    const newVariant = variants.find((variant) => {
      const { selectedOptions } = variant

      const match = newOptions.every(({ name, value }) =>
        selectedOptions.some((so) => so.name === name && so.value === value),
      )
      return match
    })
    if (!newVariant) {
      console.warn('Could not select variant')
    }

    selectVariant(newVariant.id)
  }

  /* get checkout utils */
  const { addLineItem } = useCheckout()
  const { variants } = product

  /* get product image variants from Shopify */
  const images = product?.sourceData?.images
  const description = product?.sourceData?.description
  console.log(product?.sourceData)

  return (
    <Wrapper>
      <Column>
        <ProductDetails>
          <ProductImagesWrapper>
            <ProductImages currentVariant={currentVariant} product={product} />
          </ProductImagesWrapper>
          <ProductInfoWrapper>
            <ProductDetailHeader
              currentVariant={currentVariant}
              product={product}
            />
            <ProductVariantSelector
              // @ts-ignore
              variants={variants}
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
      {/* Shopify alt images will go here */}
      <ProductDetailFooter
        product={product}
        // @ts-ignore
        content={images}
      />
      {/* Related Products */}
      <ProductRelated product={product} />
      {/* This is currently  from sanity */}
      <ProductDetailFooter product={product} />
    </Wrapper>
  )
}
