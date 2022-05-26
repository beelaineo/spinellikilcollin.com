/* eslint-disable prettier/prettier */
import * as React from 'react'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useShopify } from '../../providers/ShopifyProvider'
import { useNavigation } from '../../providers/NavigationProvider'
import { Heading } from '../../components/Text'
import Cart from '../../svg/Cart.svg'
import Logotype from '../../svg/Logotype.svg'
import { Checkout } from '../Cart/Checkout'
import { Hamburger } from '../Hamburger'
import { SearchButton } from './SearchButton'
import {
  Wrapper,
  Inner,
  CartBadge,
  CartButtonWrapper,
  SearchButtonWrapper,
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
    colorTheme,
  } = useNavigation()
  /* Parsing */
  const { loading, checkout } = useShopify()
  const lineItems = checkout ? unwindEdges(checkout.lineItems)[0] : []
  const cartCount = loading ? 0 : lineItems.length || 0

  const openCartHandler = () => openCart()

  const innerBorder = !/\/collections/.test(router.asPath)

  return (
    <>
      <NavInnerBackground onClick={closeAll} open={menuOpen || cartOpen} />
      <SideNavigation open={menuOpen}>
        <NavigationInner closeMenu={closeMenu} />
      </SideNavigation>

      <Wrapper>
        <Backdrop />
        <Inner withBorder={innerBorder} colorTheme={colorTheme}>
          <Hamburger
            onClick={toggleMenu}
            open={false}
            colorTheme={colorTheme}
          />

          <LogoWrapper colorTheme={colorTheme}>
            <Link href="/" as="/">
              <a>
                <Logotype />
              </a>
            </Link>
          </LogoWrapper>
          <ToolsWrapper>
            <CurrencySelector colorTheme={colorTheme} />
            <SearchButtonWrapper colorTheme={colorTheme}>
              <SearchButton />
            </SearchButtonWrapper>
            <CartButtonWrapper
              isLoading={loading}
              onClick={openCartHandler}
              colorTheme={colorTheme}
            >
              {cartCount ? (
                <CartBadge colorTheme={colorTheme}>
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
