import * as React from 'react'
import { useAnalytics } from '../../../providers'
import {
  useShopify,
  UseCheckoutValues,
} from '../../../providers/ShopifyProvider'
import { Button } from '../../../components/Button'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { Placeholder } from '../../../components/Placeholder'
import { useCart, useModal } from '../../../providers'
import { useMedia } from '../../../hooks'
import { theme } from '../../../theme'
const { useEffect, useRef, useState } = React
import styled, { css } from '@xstyled/styled-components'

interface Props extends Pick<UseCheckoutValues, 'addLineItem'> {
  product: ShopifyProduct
  currentVariant?: ShopifyProductVariant
  quantity?: number
}

interface WithSticky {
  sticky: boolean
}

const BuyButtonEl = styled(Button)<WithSticky>`
  ${({ theme, sticky }) => css`
    ${theme.mediaQueries.tablet} {
      position: ${sticky ? 'fixed' : 'inherit'};
      top: ${sticky ? '90px' : 'inherit'};
      z-index: 4;
      width: ${sticky ? 'calc(100% - 250px)' : 'inherit'};
      transition: width 0s;
    }
    ${theme.mediaQueries.mobile} {
      top: ${sticky ? '75px' : 'inherit'};
      width: ${sticky ? 'calc(100% - 88px)' : 'inherit'};
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

  const [initialOffsetTop, setInitialOffsetTop] = useState(0)
  const [winScroll, setWinScroll] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(90)
  const [isSticky, setIsSticky] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

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
    setHeaderHeight(isMobile ? 75 : 90)
  }, [buttonRef.current])

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
      sendAddToCart({ product, variant: currentVariant, quantity })
      await addLineItem({
        variantId: currentVariant.shopifyVariantID,
        quantity: quantity || 1,
      })
      openCart('Product Added to Cart!')
    }
  }
  if (currentVariant && !currentVariant?.sourceData?.availableForSale) {
    return <Placeholder>Out of stock</Placeholder>
  }
  return (
    <>
      <BuyButtonEl
        disabled={loading || Boolean(!currentVariant)}
        onClick={handleClick}
        ref={buttonRef}
        sticky={isSticky}
      >
        {buttonLabel}
      </BuyButtonEl>
      {isSticky ? <ButtonSpacer /> : null}
    </>
  )
}
