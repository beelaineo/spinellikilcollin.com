import * as React from 'react'
import { useRouter, NextRouter } from 'next/router'
import { useCart } from './CartProvider'
import { useLockScroll } from '../components/LockScroll'

const { useReducer, useEffect } = React

interface NavState {
  menuOpen: boolean
  colorTheme?: 'dark' | 'light'
  currentSubmenuKey: string | void
}

const OPEN_MENU = 'OPEN_MENU'
const CLOSE_MENU = 'CLOSE_MENU'
const SET_THEME = 'SET_THEME'

interface Action {
  type: typeof OPEN_MENU | typeof CLOSE_MENU | typeof SET_THEME
  payload?: 'dark' | 'light'
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
    case SET_THEME:
      return {
        ...currentState,
        colorTheme: action.payload,
      }
    default:
      throw new Error(`"${action.type}" is not a valid action type`)
  }
}

interface NavigationContextValue {
  cartOpen: boolean
  menuOpen: boolean
  colorTheme: 'dark' | 'light' | undefined
  setColorTheme: (colorTheme: 'dark' | 'light') => void
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
}

export const NavigationProvider = ({ children }: NavigationProps) => {
  /* State from Providers */
  const router = useRouter()
  const { closeCart, openCart, open: cartOpen } = useCart()
  const { lockScroll, unlockScroll } = useLockScroll()

  /* State */
  const [state, dispatch] = useReducer(navReducer, {
    menuOpen: false,
    colorTheme: 'dark',
    currentSubmenuKey: undefined,
  })

  const { menuOpen, colorTheme } = state

  /* Handlers */

  const openMenu = () => dispatch({ type: OPEN_MENU })
  const closeMenu = () => dispatch({ type: CLOSE_MENU })
  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu())
  const setColorTheme = (colorTheme: 'dark' | 'light') =>
    dispatch({ type: SET_THEME, payload: colorTheme })

  /* Effects */

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu()
      closeCart()
    }
  }

  useEffect(() => {
    closeMenu()
    // @ts-ignore
    if (typeof window !== 'undefined' && window?.HubSpotConversations?.widget) {
      // @ts-ignore
      window.HubSpotConversations.widget.refresh()
    }
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
    setColorTheme,
    colorTheme,
    router,
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
