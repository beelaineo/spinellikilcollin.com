import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import gql from 'graphql-tag'

import {
  useShopify,
  UseCheckoutValues,
} from '../../../providers/ShopifyProvider'
import { Button } from '../../../components/Button'
import { Product, ShopifyProductVariant } from '../../../types'
import { Placeholder } from '../../../components/Placeholder'
import { useAnalytics, useCart, useModal } from '../../../providers'
import { useMedia } from '../../../hooks'
import { theme } from '../../../theme'
import { shopifyQuery } from '../../../providers/AllProviders'
import { ShopifyStorefrontProductVariant } from '../../../types/generated-shopify'

const { useEffect, useRef, useState } = React

interface Props extends Pick<UseCheckoutValues, 'addLineItem'> {
  product: Product
  currentVariant: ShopifyProductVariant
  quantity?: number
}

interface WithSticky {
  sticky: boolean
}

const BuyButtonEl = styled(Button)<WithSticky>`
  ${({ theme, sticky }) => css`
     {
      position: relative;

      &:focus-visible {
        ${theme.focus.left()}
      }

      ${theme.mediaQueries.tablet} {
        position: relative;

        position: ${sticky ? 'fixed' : 'inherit'};
        top: ${sticky ? '92px' : 'inherit'};
        z-index: 4;
        width: ${sticky ? 'calc(100% - 250px)' : 'inherit'};
        transition: width 0s;
      }
      ${theme.mediaQueries.mobile} {
        position: relative;

        top: ${sticky ? '85px' : 'inherit'};
        width: ${sticky ? 'calc(100% - 88px)' : 'inherit'};
      }
    }
  `}
`

const ButtonSpacer = styled.div`
  ${({ theme }) => css`
    display: block;
    height: 42px;
    width: 100%;
  `}
`

const shopifyVariantQuery = gql`
  query ShopifyVariantQuery($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        id
        availableForSale
      }
    }
  }
`

const PENDING = 'PENDING'
type IsInStockValue = typeof PENDING | true | false
const useVariantIsInStock = (
  variant: ShopifyProductVariant,
): IsInStockValue => {
  const [isInStock, setIsInStock] = useState<IsInStockValue>(PENDING)
  const currentVariantId = variant?.sourceData?.id
  if (!currentVariantId) {
    throw new Error(
      'A product variant without source data was supplied to BuyButton',
    )
  }
  useEffect(() => {
    const requestVariantData = async () => {
      setIsInStock(PENDING)
      const result = await shopifyQuery<{
        node: ShopifyStorefrontProductVariant
      }>(shopifyVariantQuery, {
        id: currentVariantId,
      })
      const variantIsAvailableForSale = result?.node.availableForSale
      setIsInStock(variantIsAvailableForSale)
    }
    requestVariantData()
  }, [currentVariantId])
  return isInStock
}

export const BuyButton = ({
  product,
  currentVariant,
  addLineItem,
  quantity,
}: Props) => {
  const { sendAddToCart } = useAnalytics()
  const { openCart } = useCart()
  const { loading } = useShopify()
  const { inquiryOnly } = product
  const { openCustomizationModal } = useModal()

  /**
   * Before enabling the buy button, query shopify directly to
   * see if the variant is in stock. Inventory data from Sanity can
   * sometimes be out of date.
   */
  const variantIsInStock = useVariantIsInStock(currentVariant)

  const [initialOffsetTop, setInitialOffsetTop] = useState(0)
  const [winScroll, setWinScroll] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(90)
  const [isSticky, setIsSticky] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  const isMobile = useMedia({
    maxWidth: `${theme.breakpoints?.sm || '480'}px`,
  })

  const listenToScroll = () => {
    setWinScroll(document.body.scrollTop || document.documentElement.scrollTop)
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [])

  useEffect(() => {
    const DOMRect = buttonRef?.current?.getBoundingClientRect()
    setInitialOffsetTop(DOMRect?.y || 600)
    // console.log('initialOffsetTop', initialOffsetTop)
    setHeaderHeight(isMobile ? 85 : 92)
  }, [buttonRef.current])

  useEffect(() => {
    const handleResize = () => {
      const ref = spacerRef || buttonRef
      const DOMRect = ref?.current?.getBoundingClientRect()
      setInitialOffsetTop(DOMRect?.y || 600)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // console.log('winScroll', winScroll)
    // console.log('initialOffsetTop', initialOffsetTop)
    if (initialOffsetTop > 0 && winScroll >= initialOffsetTop - headerHeight) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }, [winScroll])

  const buttonLabel = inquiryOnly ? 'Inquire' : 'Add to cart'
  const handleClick = async () => {
    if (!currentVariant || !currentVariant.shopifyVariantID) return
    if (inquiryOnly) {
      openCustomizationModal({
        currentProduct: product,
        currentVariant,
      })
    } else {
      sendAddToCart({
        product,
        variant: currentVariant,
        quantity: quantity || 1,
      })
      await addLineItem({
        variantId: currentVariant.shopifyVariantID,
        quantity: quantity || 1,
      })
      openCart('Product Added to Cart!')
    }
  }
  if (variantIsInStock === false) {
    return (
      <BuyButtonEl disabled={true} ref={buttonRef}>
        Out of Stock
      </BuyButtonEl>
    )
  }
  return (
    <>
      <BuyButtonEl
        disabled={loading || variantIsInStock === PENDING}
        onClick={handleClick}
        ref={buttonRef}
        sticky={false}
      >
        {buttonLabel}
      </BuyButtonEl>
      {/* {isSticky ? <ButtonSpacer ref={spacerRef} /> : null} */}
    </>
  )
}
