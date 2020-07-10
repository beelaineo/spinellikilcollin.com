import * as React from 'react'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useCheckout } from 'use-shopify'
import { useNavigation } from '../../providers/NavigationProvider'
import { Heading } from '../../components/Text'
import Cart from '../../svg/Cart.svg'
import Logotype from '../../svg/Logotype.svg'
import { Checkout } from '../Cart/Checkout'
import { Hamburger } from '../Hamburger'
import {
  Wrapper,
  Inner,
  CartBadge,
  CartButtonWrapper,
  SideNavigation,
  LogoWrapper,
  NavInnerBackground,
  ToolsWrapper,
} from './styled'
import { Backdrop } from './Backdrop'
import { NavigationInner } from './NavigationInner'
import { CurrencySelector } from './CurrencySelector'

export const Navigation = () => {
  const {
    closeAll,
    cartOpen,
    menuOpen,
    closeMenu,
    toggleMenu,
    openCart,
    router,
  } = useNavigation()
  /* Parsing */
  const { loading, checkout } = useCheckout()
  const lineItems = checkout ? unwindEdges(checkout.lineItems)[0] : []
  const cartCount = loading ? 0 : lineItems.length || 0

  const openCartHandler = () => openCart()

  const innerBorder = !/\/collections/.test(router.asPath)

  return (
    <>
      <NavInnerBackground
        onClick={closeAll}
        aria-hidden={!cartOpen && !menuOpen}
        open={menuOpen || cartOpen}
      />
      <SideNavigation open={menuOpen}>
        <NavigationInner closeMenu={closeMenu} />
      </SideNavigation>

      <Wrapper>
        <Backdrop />
        <Inner withBorder={innerBorder}>
          <Hamburger onClick={toggleMenu} open={false} />

          <LogoWrapper>
            <Link href="/index" as="/">
              <a>
                <Logotype />
              </a>
            </Link>
          </LogoWrapper>
          <ToolsWrapper>
            <CurrencySelector />
            <CartButtonWrapper isLoading={loading} onClick={openCartHandler}>
              {cartCount ? (
                <CartBadge>
                  <Heading m={0} fontWeight={4} level={5}>
                    {cartCount}
                  </Heading>
                </CartBadge>
              ) : null}
              <Cart />
            </CartButtonWrapper>
          </ToolsWrapper>
        </Inner>
      </Wrapper>
      <Checkout />
    </>
  )
}

interface NavigationProps {
  router: NextRouter
}
