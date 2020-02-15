import * as React from 'react'
import { useQuery } from 'urql'
import { PRODUCT_QUERY, ProductQueryResult } from './query'
import { ShopifyProduct, ProductInfo, ShopifyProductVariant } from '../../types'
import { useProductVariant, useCheckout } from 'use-shopify'
import { Column } from '../../components/Layout'
import {
  ProductVariantSelector,
  BuyButton,
  ProductImages,
  ProductDetailHeader,
  ProductDetailFooter,
  ProductRelated,
  MobileProductHeader,
} from './components'
import { useShopData } from '../../providers/ShopDataProvider'
import { useCounter } from '../../utils/hooks'
import {
  Wrapper,
  ProductDetails,
  ProductInfoWrapper,
  ProductImagesWrapper,
  NormalizeDiv,
  ArrowDown,
} from './styled'
import { Accordion } from '../../components/Accordion'
import { getInfoBlocksByType, getInfoBlocksByTag } from './utils'

interface Props {
  product: ShopifyProduct
}

export const ProductDetail = ({ product }: Props) => {
  /* get additional info blocks from Sanity */
  const { ready, productInfoBlocks } = useShopData()
  const accordions = productInfoBlocks
    ? [
        ...getInfoBlocksByType(
          product?.sourceData?.productType || 'none',
          productInfoBlocks,
        ),
        // @ts-ignore
        ...getInfoBlocksByTag(product?.sourceData?.tags, productInfoBlocks),
      ]
    : []

  /* hook to manage quantity input */
  const {
    count: quantity,
    increment,
    decrement,
    setCount: setQuantity,
  } = useCounter(1, { min: 1 })
  /* get product variant utils */
  const { currentVariant, selectVariant } = useProductVariant(
    product.sourceData,
  )

  /* get checkout utils */
  const { addLineItem } = useCheckout()
  const { variants } = product

  /* get product image variants from Shopify */
  const images = product?.sourceData?.images

  return (
    <Wrapper>
      <Column>
        <ProductDetails>
          <ProductDetailHeader
            currentVariant={currentVariant}
            product={product}
            mobile={'visible'}
          />
          <ProductImagesWrapper>
            <ProductImages currentVariant={currentVariant} product={product} />
          </ProductImagesWrapper>
          <ProductInfoWrapper>
            <ProductDetailHeader
              currentVariant={currentVariant}
              product={product}
              mobile={'hidden'}
            />
            <ProductVariantSelector
              setQuantity={setQuantity}
              quantity={quantity}
              increment={increment}
              decrement={decrement}
              // @ts-ignore
              variants={variants}
              currentVariant={currentVariant}
              selectVariant={selectVariant}
              product={product}
            />
            <NormalizeDiv margin="0 0 20px 0">
              <BuyButton
                addLineItem={addLineItem}
                currentVariant={currentVariant}
                quantity={quantity}
              />
              {accordions
                ? accordions.map((a) => <Accordion key={a._key} content={a} />)
                : null}
            </NormalizeDiv>
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
