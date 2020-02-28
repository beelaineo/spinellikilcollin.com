import * as React from 'react'
import Link from 'next/link'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useReducer } from 'react'
import { useCheckout } from 'use-shopify'
import { useShopData } from '../../providers/ShopDataProvider'
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

interface MenuProps {
  activeMenu: null | string
  openMenu: (menuKey: null | string) => () => void
  closeMenu: () => void
}

interface NavState {
  cartOpen: boolean
  menuOpen: boolean
  currentSubmenuKey: string | void
}

const OPEN_CART = 'OPEN_CART'
const CLOSE_CART = 'CLOSE_CART'
const OPEN_MENU = 'OPEN_MENU'
const CLOSE_MENU = 'CLOSE_MENU'

interface Action {
  type:
    | typeof OPEN_MENU
    | typeof OPEN_CART
    | typeof CLOSE_MENU
    | typeof CLOSE_CART
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

    case OPEN_CART:
      return {
        ...currentState,
        cartOpen: true,
      }
    case CLOSE_CART:
      return {
        ...currentState,
        cartOpen: false,
      }
    default:
      throw new Error(`"${action.type}" is not a valid action type`)
  }
}

export const Navigation = () => {
  /* State from Providers */
  const { loading, checkout } = useCheckout()
  const { ready, menu } = useShopData()

  /* State */
  const [{ cartOpen, menuOpen, currentSubmenuKey }, dispatch] = useReducer(
    navReducer,
    {
      cartOpen: false,
      menuOpen: false,
      currentSubmenuKey: undefined,
    },
  )

  /* Handlers */
  const openCart = () => dispatch({ type: OPEN_CART })
  const closeCart = () => dispatch({ type: CLOSE_CART })

  const openMenu = () => dispatch({ type: OPEN_MENU })
  const closeMenu = () => dispatch({ type: CLOSE_MENU })
  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu())

  /* Parsing */
  const menuItems = menu?.menuItems || []
  const submenus = menuItems.filter((mi) => mi && mi.__typename === 'SubMenu')
  const lineItems = checkout ? unwindEdges(checkout.lineItems)[0] : []
  const cartCount = loading ? null : lineItems.length || null

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

        <Link href="/">
          <a>
            <Logo src="/static/images/sk-logotype.svg" />
          </a>
        </Link>
        <CartButtonWrapper isLoading={loading} onClick={openCart}>
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
