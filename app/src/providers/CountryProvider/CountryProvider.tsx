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

const getCountryNameFromCountryCode = async (
  country: ShopifyStorefrontCountryCode,
): Promise<string | undefined> => {
  const countryData = await import('../../data/countries.json')
  const flag = countryData.default
    .filter(
      (c) =>
        Boolean(c.countryCode) && Boolean(c.flagEmoji && Boolean(c.english)),
    )
    .find((c) => c.countryCode === country)?.flagEmoji
  const name = countryData.default
    .filter(
      (c) =>
        Boolean(c.countryCode) && Boolean(c.flagEmoji && Boolean(c.english)),
    )
    .find((c) => c.countryCode === country)?.english
  return `${flag} <em>${name}</em>`
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
    const geolocateCountry = getCookie('geolocate')
    const viewerCountry = getCookie(COUNTRY_COOKIE)
    console.log('geolocateCountry COOKIE', geolocateCountry)
    console.log('viewerCountry COOKIE', viewerCountry)
    if (viewerCountry && viewerCountry !== currentCountry) {
      console.log(
        'updating user country to viewer country preference (from browser cookie)',
      )
      updateCountryState(viewerCountry)
    } else if (geolocateCountry) {
      console.log(
        'updating user country to country based on browser geolocation',
      )
      updateCountryState(geolocateCountry)
      // create toast here
      const sendToast = async () => {
        const formattedCountry = await getCountryNameFromCountryCode(
          geolocateCountry,
        )
        // const toastMessage = `We've detected that you're in ${
        //   formattedCountry || 'Country Unknown'
        // }. If you'd like to change your country, please do so using the Country Selector in the top navigation bar.`

        const toastMessage = `Now shopping in  ${
          formattedCountry || 'Country Unknown'
        }.\n Use our country selector to change your currency.`

        createToast({
          message: toastMessage,
          type: ToastType.Currency,
        })
      }
      sendToast()
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
