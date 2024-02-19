import * as React from 'react'
import { Product, ShopifyProductVariant } from '../types'

interface CurrentProductContextValue {
  product: Product
  currentVariant: ShopifyProductVariant
}

const CurrentProductContext = React.createContext<
  CurrentProductContextValue | undefined
>(undefined)

export const CurrentProductConsumer = CurrentProductContext.Consumer

export const useCurrentProduct = () => {
  const ctx = React.useContext(CurrentProductContext)
  return ctx
}

interface CurrentProductProps {
  children: React.ReactNode
  product: Product
  currentVariant: ShopifyProductVariant
}

export const CurrentProductProvider = ({
  children,
  product,
  currentVariant,
}: CurrentProductProps) => {
  const value = {
    product,
    currentVariant,
  }

  return (
    <CurrentProductContext.Provider value={value}>
      {children}
    </CurrentProductContext.Provider>
  )
}
