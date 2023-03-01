import * as React from 'react'
import {
  ProductQueryDataResponse,
  requestShopifyProductVariantPrices,
  requestShopifyProductPriceRange,
} from './shopifyPriceQuery'
import { useCountry } from '../CountryProvider'
import { QueryFunction } from '../ShopifyProvider/types'
import { Maybe, ShopifyStorefrontMoneyV2 } from '../../types'

const { useContext } = React

interface PriceRange {
  minVariantPrice: {
    amount: string
    currencyCode: string
  }
  maxVariantPrice: {
    amount: string
    currencyCode: string
  }
}

interface Price {
  priceV2: ShopifyStorefrontMoneyV2
  compareAtPriceV2: Maybe<ShopifyStorefrontMoneyV2> | undefined
}

interface ShopifyPriceContextValue {
  ready: boolean
  getPriceRangeById: (id: string) => PriceRange | null
  getVariantPriceById: (
    productId: string,
    variantId: string,
  ) => Promise<Price | null>
}

const ShopifyPriceContext = React.createContext<
  ShopifyPriceContextValue | undefined
>(undefined)

export const ShopifyPriceConsumer = ShopifyPriceContext.Consumer

export const useShopifyPrice = () => {
  const ctx = useContext(ShopifyPriceContext)
  if (!ctx)
    throw new Error(
      'useShopifyPriceContext must be used within a ShopifyPriceProvider',
    )
  return ctx
}

interface Props {
  children: React.ReactNode
  query: QueryFunction
}

export const ShopifyPriceProvider = ({ children, query }: Props) => {
  const ready = true
  const { currentCountry } = useCountry()

  const getPriceRangeById = (id: string): PriceRange | null => {
    if (!id) return null
    if (!currentCountry) return null

    requestShopifyProductPriceRange({ id, countryCode: currentCountry }).then(
      (response) => {
        console.log('requestShopifyProductPriceRange response:', response)
        return response
      },
    )
    return null
  }

  const getVariantPriceById = async (
    productId: string,
    variantId: string,
  ): Promise<Price | null> => {
    if (!productId || !variantId || !currentCountry) return null
    console.log('currentCountry in PriceProvider:', currentCountry)
    const result = requestShopifyProductVariantPrices({
      id: productId,
      countryCode: currentCountry,
    })
    console.log('requestShopifyProductVariantPrices response:', result)
    const product = await result
    const variants = product?.variants.edges
    const currentVariantId = Buffer.from(variantId, 'binary').toString('base64')
    const currentVariant = variants.find((v) => v.node.id == currentVariantId)
    console.log('getVariantPriceById currentVariant', currentVariant)
    if (!currentVariant) return null
    const variantPrice = {
      priceV2: currentVariant.node.priceV2,
      compareAtPriceV2: currentVariant.node.compareAtPriceV2,
    }
    return variantPrice
  }

  const value = {
    ready,
    getPriceRangeById,
    getVariantPriceById,
  }

  return (
    <ShopifyPriceContext.Provider value={value}>
      {children}
    </ShopifyPriceContext.Provider>
  )
}
