import * as React from 'react'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useCheckout } from 'use-shopify'
import { Checkout } from '../Cart/Checkout'
import { Heading } from '../../components/Text'
import Cart from '../../svg/Cart.svg'
import { Hamburger } from '../Hamburger'
import {
  Wrapper,
  Inner,
  CartBadge,
  Logo,
  CartButtonWrapper,
  SideNavigation,
  LogoWrapper,
  NavInnerBackground,
} from './styled'
import { NavigationInner } from './NavigationInner'
import { NavigationProvider, useNavigation } from './NavigationProvider'

const NavigationMain = () => {
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
        <Inner withBorder={innerBorder}>
          <div>
            <Hamburger onClick={toggleMenu} open={false} />
          </div>

          <LogoWrapper>
            <Link href="/index" as="/">
              <a>
                <Logo src="/static/images/sk-logotype.svg" />
              </a>
            </Link>
          </LogoWrapper>
          <CartButtonWrapper isLoading={loading} onClick={openCartHandler}>
            {cartCount ? (
              <CartBadge>
                <Heading m={0} fontFamily="sans" fontWeight={4} level={4}>
                  {cartCount}
                </Heading>
              </CartBadge>
            ) : null}
            <Cart />
          </CartButtonWrapper>
        </Inner>
      </Wrapper>
      <Checkout />
    </>
  )
}

interface NavigationProps {
  router: NextRouter
}

export const Navigation = ({ router }: NavigationProps) => (
  <NavigationProvider router={router}>
    <NavigationMain />
  </NavigationProvider>
)
