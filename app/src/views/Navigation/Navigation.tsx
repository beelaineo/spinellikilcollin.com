import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useState, useReducer } from 'react'
import { PageLink } from 'Components/PageLink'
import { path } from 'ramda'
import { useCheckout } from 'use-shopify'
import { useShopData } from '../../providers/ShopDataProvider'
import { CartSidebar, CloseButton, CartNav } from '../../components/Cart'
import { unwindEdges } from '../../utils/graphql'
import { Checkout } from '../Cart/Checkout'
import { Button } from '../ProductDetail/styled'
import { MenuLinkOrSubMenu } from '../../types/generated'
import { SubMenu } from './SubMenu'
import {
  Wrapper,
  Inner,
  NavSection,
  NavHeader,
  NavHeaderWrapper,
  SubmenuPane,
  Logo,
  ModalBackground,
  Loading,
  Hamburger,
  SideNavigation,
} from './styled'
import { IoIosCart } from 'react-icons/io'
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

const OPEN_SUBMENU = 'OPEN_SUBMENU'
const OPEN_CART = 'OPEN_CART'
const CLOSE_CART = 'CLOSE_CART'
const CLOSE_MENU = 'CLOSE_MENU'

interface Action {
  type:
    | typeof OPEN_SUBMENU
    | typeof OPEN_CART
    | typeof CLOSE_MENU
    | typeof CLOSE_CART
  [key: string]: any
}

function navReducer(currentState: NavState, action: Action): NavState {
  switch (action.type) {
    case OPEN_SUBMENU:
      return {
        ...currentState,
        currentSubmenuKey: action.menuKey,
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
  const [navState, toggleNav] = useState(false)

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

  const handleNav = () => {
    if (navState === true) {
      toggleNav(false)
    } else {
      toggleNav(true)
    }
  }

  const openMenu = (menuKey: string) => () =>
    dispatch({ type: OPEN_SUBMENU, menuKey })
  const closeMenu = () => dispatch({ type: CLOSE_MENU })

  /* Parsing */
  const menuItems = menu ? menu.menuItems : []
  const submenus = menuItems.filter((mi) => mi.__typename === 'SubMenu')
  const lineItems = checkout ? unwindEdges(checkout.lineItems)[0] : []
  const cartCount = loading ? null : lineItems.length || null

  return (
    <Wrapper>
      <Inner>
        <NavSection ready={ready}>
          {/* {menuItems.map((menuItem) =>
						menuItem.__typename === 'SubMenu' ? (
							<NavHeaderWrapper key={menuItem._key} onMouseEnter={openMenu(menuItem._key)}>
								<NavHeader transform="uppercase">{menuItem.title}</NavHeader>
							</NavHeaderWrapper>
						) : (
							<NavHeaderWrapper key={menuItem._key} onMouseEnter={closeMenu}>
								<NavHeader transform="uppercase">
									<PageLink link={menuItem.link} />
								</NavHeader>
							</NavHeaderWrapper>
						),
					)} */}
          <Hamburger onClick={handleNav} open={navState}>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
          <SideNavigation open={navState}>
            <NavigationInner />
          </SideNavigation>
        </NavSection>
        <NavSection ready={ready}>
          <Link to="/">
            <Logo src="/static/images/sk-logotype.svg" />
          </Link>
        </NavSection>
        <NavSection ready={ready} align="right">
          <NavHeaderWrapper>
            <NavHeader as="button" onClick={openCart}>
              <Loading loading={loading}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 512 512"
                    fill="black"
                  >
                    <path d="M423.6 288c17.6 0 36-13.8 40.8-30.8l46.4-162.5C515.7 77.8 505.2 64 487.6 64L160 64c0-35.3-28.7-64-64-64L0 0l0 64 96 0 0 272c0 26.5 21.5 48 48 48l304 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L160 320l0-32L423.6 288zM160 128l289.4 0 -27.4 96L160 224 160 128zM192 472c0 22-18 40-40 40l-16 0c-22 0-40-18-40-40l0-16c0-22 18-40 40-40l16 0c22 0 40 18 40 40L192 472zM480 472c0 22-18 40-40 40l-16 0c-22 0-40-18-40-40l0-16c0-22 18-40 40-40l16 0c22 0 40 18 40 40L480 472z" />
                  </svg>
                </div>
                <div>
                  {cartCount}
                  {cartCount === 1 ? ' item' : cartCount >= 2 ? ' items' : ''}
                </div>
              </Loading>
            </NavHeader>
          </NavHeaderWrapper>
        </NavSection>
        <SubmenuPane open={menuOpen} onMouseLeave={closeMenu}>
          {submenus.map((submenu) =>
            submenu.__typename === 'SubMenu' ? (
              <SubMenu
                key={submenu._key}
                submenu={submenu}
                active={currentSubmenuKey === submenu._key}
                justify="start"
              />
            ) : null,
          )}
        </SubmenuPane>
      </Inner>
      <ModalBackground open={cartOpen} onClick={closeCart} />
      <CartSidebar open={cartOpen}>
        <Checkout />
        <CloseButton onClick={closeCart}>close</CloseButton>
      </CartSidebar>
    </Wrapper>
  )
}
