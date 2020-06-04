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
import {
  Wrapper,
  Inner,
  CartBadge,
  Logo,
  CartButtonWrapper,
  Hamburger,
  SideNavigation,
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
  [key: string]: any
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
  const { openCart } = useCart()

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

  useEffect(() => {
    closeMenu()
  }, [router.asPath])

  /* Parsing */
  const lineItems = checkout ? unwindEdges(checkout.lineItems)[0] : []
  const cartCount = loading ? 0 : lineItems.length || 0

  return (
    <Wrapper>
      <Inner>
        <div>
          <Hamburger onClick={toggleMenu} open={menuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
          <SideNavigation open={menuOpen}>
            <NavigationInner menu={menu} />
          </SideNavigation>
        </div>

        <Link href="/index" as="/">
          <a>
            <Logo src="/static/images/sk-logotype.svg" />
          </a>
        </Link>
        <CartButtonWrapper isLoading={loading} onClick={openCartHandler}>
          {cartCount ? (
            <CartBadge>
              <Heading level={4}>{cartCount}</Heading>
            </CartBadge>
          ) : null}
          <Cart />
        </CartButtonWrapper>
      </Inner>
      <Checkout />
    </Wrapper>
  )
}
