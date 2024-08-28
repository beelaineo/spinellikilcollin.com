import * as React from 'react'
import {
  ShopifyMoneyV2,
  ShopifyStorefrontMoneyV2,
  ShopifyPrice,
} from '../../types'
import { roundTo, setCookie, getCookie } from '../../utils'
import { useToast, ToastType } from '../ToastProvider'
import { useCurrencyState } from './reducer'

const { useEffect } = React
const CURRENCY_COOKIE = 'VIEWER_CURRENCY'

export type Money =
  | Omit<ShopifyMoneyV2, '__typename'>
  | Omit<ShopifyStorefrontMoneyV2, '__typename'>
  | Omit<ShopifyPrice, '__typename'>

interface CurrencyContextValue {
  currentCurrency: string
  loading: boolean
  updateCurrency: (currency: string) => Promise<void>
  getFormattedPrice: (
    price: Money,
    quantity?: number,
    style?: 'full' | 'pretty',
  ) => string
}

const CurrencyContext = React.createContext<CurrencyContextValue | undefined>(
  undefined,
)

export const CurrencyConsumer = CurrencyContext.Consumer

export const useCurrency = () => {
  const ctx = React.useContext(CurrencyContext)
  if (!ctx)
    throw new Error('useCurrencyContext must be used within a CurrencyProvider')
  return ctx
}

interface CurrencyProps {
  children: React.ReactNode
}

export const CurrencyProvider = ({ children }: CurrencyProps) => {
  const {
    loading,
    currentCurrency,
    error,
    message,
    updateCurrency: updateCurrencyState,
  } = useCurrencyState()

  const { createToast } = useToast()

  useEffect(() => {
    const viewerCurrency = getCookie(CURRENCY_COOKIE)
    if (viewerCurrency && viewerCurrency !== currentCurrency) {
      updateCurrencyState(viewerCurrency)
    }
  }, [])

  // useEffect(() => {
  //   if (message) {
  //     createToast({ message, type: ToastType.Error })
  //   }
  // }, [message])

  useEffect(() => {
    setCookie(CURRENCY_COOKIE, currentCurrency)
  }, [currentCurrency])

  const updateCurrency = async (currency: string) => {
    await updateCurrencyState(currency)
  }

  const getFormattedPrice = (
    price: Money,
    quantity = 1,
    style?: 'full' | 'pretty',
  ) => {
    const amount = price.amount
    const lang =
      typeof navigator !== 'undefined' ? navigator.language ?? 'en-US' : 'en-US'

    const currency =
      currentCurrency == price.currencyCode
        ? currentCurrency
        : price.currencyCode == null
        ? 'USD'
        : price.currencyCode
    const formattedPrice = new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: currency,
    }).format(amount)

    if (style === 'full') {
      return formattedPrice
    } else {
      return formattedPrice.slice(-2) == '00'
        ? formattedPrice.replace(/\.00$/, '')
        : formattedPrice
    }
  }

  const value = {
    loading,
    currentCurrency,
    updateCurrency,
    getFormattedPrice,
  }
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}
