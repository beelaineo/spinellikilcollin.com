import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useReducer } from 'react'
import { useCheckout } from 'use-shopify'
import { useShopData } from '../../providers/ShopDataProvider'
import { useCart } from '../../providers/CartProvider'
import { CartSidebar, CloseButton } from '../../components/Cart'
import { Checkout } from '../Cart/Checkout'
import { Heading } from '../../components/Text'
import Cart from '../../svg/Cart.svg'
import {
  Wrapper,
  Inner,
  CartBadge,
  Logo,
  ModalBackground,
  CartButtonWrapper,
  Hamburger,
  SideNavigation,
} from './styled'
import { NavigationInner } from './NavigationInner'

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

export const Navigation = () => {
  /* State from Providers */
  const { loading, checkout } = useCheckout()
  const { menu } = useShopData()
  const { open: cartOpen, openCart, closeCart } = useCart()

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

        <Link href="/" as="/index">
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
      <ModalBackground open={cartOpen} onClick={closeCart} />
      <CartSidebar open={cartOpen}>
        <Checkout />
        <CloseButton onClick={closeCart}>close</CloseButton>
      </CartSidebar>
    </Wrapper>
  )
}
