import * as React from 'react'
import { NextRouter } from 'next/router'
import { useCart } from '../../providers/CartProvider'
import { useLockScroll } from '../LockScroll'

const { useReducer, useEffect } = React

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

interface NavigationContextValue {
  cartOpen: boolean
  menuOpen: boolean
  closeMenu: () => void
  toggleMenu: () => void
  openCart: () => void
  closeAll: () => void
  router: NextRouter
}

const NavigationContext = React.createContext<
  NavigationContextValue | undefined
>(undefined)

export const NavigationConsumer = NavigationContext.Consumer

export const useNavigation = () => {
  const ctx = React.useContext(NavigationContext)
  if (!ctx)
    throw new Error(
      'useNavigationContext must be used within a NavigationProvider',
    )
  return ctx
}

interface NavigationProps {
  children: React.ReactNode
  router: NextRouter
}

export const NavigationProvider = ({ children, router }: NavigationProps) => {
  /* State from Providers */
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

  const value = {
    cartOpen,
    menuOpen,
    closeMenu,
    toggleMenu,
    openCart,
    closeAll,
    router,
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
