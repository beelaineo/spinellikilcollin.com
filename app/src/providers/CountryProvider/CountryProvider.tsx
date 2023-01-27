import * as React from 'react'
import { Maybe, ShopifyMoneyV2, ShopifyStorefrontMoneyV2 } from '../../types'
import { ShopifyStorefrontCountryCode } from '../../types/generated-shopify'
import { roundTo, setCookie, getCookie } from '../../utils'
import { useCurrency } from '../CurrencyProvider'
import { useToast, ToastType } from '../ToastProvider'
import { useCountryState } from './reducer'

const { useEffect } = React
const COUNTRY_COOKIE = 'VIEWER_COUNTRY'

type Money =
  | Omit<ShopifyMoneyV2, '__typename'>
  | Omit<ShopifyStorefrontMoneyV2, '__typename'>

interface CountryContextValue {
  currentCountry: ShopifyStorefrontCountryCode
  loading: boolean
  updateCountry: (country: ShopifyStorefrontCountryCode) => Promise<void>
}

const CountryContext = React.createContext<CountryContextValue | undefined>(
  undefined,
)

export const CountryConsumer = CountryContext.Consumer

export const useCountry = () => {
  const ctx = React.useContext(CountryContext)
  if (!ctx)
    throw new Error('useCountryContext must be used within a CountryProvider')
  return ctx
}

interface CountryProps {
  children: React.ReactNode
}

export const CountryProvider = ({ children }: CountryProps) => {
  const {
    loading,
    currentCountry,
    error,
    message,
    updateCountry: updateCountryState,
    currency,
  } = useCountryState()

  const { createToast } = useToast()

  const { updateCurrency } = useCurrency()

  useEffect(() => {
    const viewerCountry = getCookie(COUNTRY_COOKIE)
    console.log('viewerCountry COOKIE', viewerCountry)
    if (viewerCountry && viewerCountry !== currentCountry) {
      updateCountryState(viewerCountry)
    }
  }, [])

  useEffect(() => {
    if (message) {
      createToast({ message, type: ToastType.Error })
    }
  }, [message])

  useEffect(() => {
    setCookie(COUNTRY_COOKIE, currentCountry)
  }, [currentCountry])

  useEffect(() => {
    updateCurrency(currency)
    console.log('CURRENCY', currency.toString())
    console.log('COUNTRY', currentCountry)
  }, [currency])

  const updateCountry = async (country: ShopifyStorefrontCountryCode) => {
    await updateCountryState(country)
  }

  const value = {
    loading,
    currentCountry,
    updateCountry,
  }
  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  )
}
