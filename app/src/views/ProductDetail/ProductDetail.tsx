import * as React from 'react'
import { useQuery } from 'urql'
import { PRODUCT_QUERY, ProductQueryResult } from './query'
import {
  Product,
  ProductInfo,
  ProductInfoBlock,
  ShopifyProduct,
} from '../../types/generated'
import { useProductVariant, useCheckout, Variant } from 'use-shopify'
import { unwindEdges } from '../../utils/graphql'
import { NotFound } from '../NotFound'
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
import { RichText } from '../../components/RichText'
import { Accordion } from '../../components/Accordion'
import { getInfoBlocksByType, getInfoBlocksByTag } from './utils'
import { Header5, Header6 } from '../../components/Text'

interface Props {
  product: Product
  productExtra: ShopifyProduct
}

const ProductDetailMain = ({ product, productExtra }: Props) => {
  /* get additional info blocks from Sanity */
  const { info } = productExtra
  const { ready, productInfoBlocks } = useShopData()
  const accordions = productInfoBlocks
    ? [
        ...getInfoBlocksByType(product.productType, productInfoBlocks),
        ...getInfoBlocksByTag(product.tags, productInfoBlocks),
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
  const { currentVariant, selectVariant } = useProductVariant(product)

  /* get checkout utils */
  const { addItemToCheckout } = useCheckout()
  const [variants] = unwindEdges<Variant>(product.variants)

  /* get product image variants from Shopify */
  let { images } = product

  return (
    <Wrapper backgroundColor="#F5F3F4">
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
              variants={variants}
              currentVariant={currentVariant}
              selectVariant={selectVariant}
              product={product}
            />
            <NormalizeDiv margin="0 0 20px 0">
              <BuyButton
                addItemToCheckout={addItemToCheckout}
                currentVariant={currentVariant}
                quantity={quantity}
                width="100%"
              />
              {info
                ? info.map((a) => <Accordion key={a._key} content={a} />)
                : null}
            </NormalizeDiv>
          </ProductInfoWrapper>
        </ProductDetails>
      </Column>
      {/* Shopify alt images will go here */}
      <ProductDetailFooter product={product} content={images} />
      {/* Related Products */}
      <ProductRelated product={product} />
      {/* This is currently  from sanity */}
      <ProductDetailFooter product={product} content={productExtra} />
    </Wrapper>
  )
}

/**
 * View Wrapper
 */

interface ProductDetailProps {
  product: ShopifyProduct
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  return <ProductDetailMain product={product} />
}
