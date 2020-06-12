import * as React from 'react'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useReducer } from 'react'
import { useCheckout } from 'use-shopify'
import { useCart } from '../../providers/CartProvider'
import { useShopData } from '../../providers/ShopDataProvider'
import { Checkout } from '../Cart/Checkout'
import { Heading } from '../../components/Text'
import Cart from '../../svg/Cart.svg'
import { useLockScroll } from '../LockScroll'
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

const { useEffect } = React

interface NavState {
  menuOpen: boolean
  currentSubmenuKey: string | void
}

const OPEN_MENU = 'OPEN_MENU'
const CLOSE_MENU = 'CLOSE_MENU'

interface Action {
  type: typeof OPEN_MENU | typeof CLOSE_MENU
}

function navReducer(currentState: NavState, action: Action): NavState {
  switch (action.type) {
    case OPEN_MENU:
      return {
        ...currentState,
        menuOpen: true,
      }

    case CLOSE_MENU:
      return {
        ...currentState,
        menuOpen: false,
      }
    default:
      throw new Error(`"${action.type}" is not a valid action type`)
  }
}

interface NavigationProps {
  router: NextRouter
}

export const Navigation = ({ router }: NavigationProps) => {
  /* State from Providers */
  const { loading, checkout } = useCheckout()
  const { menu } = useShopData()
  const { closeCart, openCart, open: cartOpen } = useCart()
  const { lockScroll, unlockScroll } = useLockScroll()

  /* State */
  const [state, dispatch] = useReducer(navReducer, {
    menuOpen: false,
    currentSubmenuKey: undefined,
  })

  const { menuOpen } = state

  /* Handlers */

  const openMenu = () => dispatch({ type: OPEN_MENU })
  const closeMenu = () => dispatch({ type: CLOSE_MENU })
  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu())
  const openCartHandler = () => openCart()

  /* Effects */

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu()
      closeCart()
    }
  }

  useEffect(() => {
    closeMenu()
  }, [router.asPath])

  useEffect(() => {
    if (menuOpen || cartOpen) {
      console.log('locking?')
      lockScroll()
      document.addEventListener('keyup', handleKeyup)
      return () => {
        document.removeEventListener('keyup', handleKeyup)
      }
    } else {
      unlockScroll()
    }
  }, [menuOpen, cartOpen])

  const closeAll = () => {
    closeCart()
    closeMenu()
  }

  /* Parsing */
  const lineItems = checkout ? unwindEdges(checkout.lineItems)[0] : []
  const cartCount = loading ? 0 : lineItems.length || 0

  const innerBorder = !/\/collections/.test(router.asPath)

  return (
    <>
      <NavInnerBackground
        onClick={closeAll}
        aria-hidden={!cartOpen && !menuOpen}
        open={menuOpen || cartOpen}
      />
      <SideNavigation open={menuOpen}>
        <NavigationInner closeMenu={closeMenu} menu={menu} />
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
