import * as React from 'react'
import {
  ProductQueryDataResponse,
  requestShopifyProductVariantPrices,
  requestShopifyProductPriceRange,
  requestShopifyCollectionProductsVariantPrices,
} from './shopifyPriceQuery'
import { useRouter } from 'next/router'
import { useCountry } from '../CountryProvider'
import { QueryFunction } from '../ShopifyProvider/types'
import { Maybe, ShopifyStorefrontMoneyV2 } from '../../types'
import {
  ShopifyStorefrontCollection,
  ShopifyStorefrontCountry,
  ShopifyStorefrontCountryCode,
  ShopifyStorefrontCurrencyCode,
  ShopifyStorefrontProduct,
} from '../../types/generated-shopify'

const { useContext, useState, useEffect } = React

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
  priceV2: ShopifyStorefrontMoneyV2 | undefined
  compareAtPriceV2: Maybe<ShopifyStorefrontMoneyV2> | undefined
}

interface ShopifyPriceContextValue {
  ready: boolean
  currentCollectionPrices: ShopifyStorefrontCollection | null
  getPriceRangeById: (id: string) => PriceRange | null
  getVariantPriceById: (
    productId: string,
    variantId: string,
  ) => Promise<Price | null>
  getVariantPriceByCollection: (
    collectionHandle: string,
    variantId: string,
  ) => Price | null
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
  const router = useRouter()
  const { asPath } = router
  const { currentCountry } = useCountry()
  const [currentCollectionHandle, setCurrentCollectionHandle] = useState<
    string | null
  >(null)
  const [currentCountryState, setCurrentCountryState] =
    useState<ShopifyStorefrontCountryCode | null>(null)
  const [currentCollectionPrices, setCurrentCollectionPrices] =
    useState<ShopifyStorefrontCollection | null>(null)

  useEffect(() => {
    if (asPath.includes('collections') == false) return
    if (
      currentCollectionHandle &&
      currentCollectionHandle == asPath.split('/')[2] &&
      currentCountryState &&
      currentCountryState == currentCountry
    )
      return
    const handle = asPath.split('/')[2]
    setCurrentCollectionHandle(handle)
    setCurrentCountryState(currentCountry)
    requestShopifyCollectionProductsVariantPrices({
      handle,
      countryCode: currentCountry,
    }).then((response) => {
      console.log('UPDATING COUNTRY PRICE TABLE', currentCountry)
      setCurrentCollectionPrices(response)
    })
  }, [asPath, currentCountry])

  useEffect(() => {
    console.log(
      'SET STATE OF CURRENT COLLECTION PRICES',
      currentCollectionPrices,
    )
  }, [currentCollectionPrices])

  const getVariantPriceByCollection = (
    collectionHandle: string,
    variantId: string,
  ): Price | null => {
    if (!collectionHandle) return null
    if (currentCountry == 'US') return null
    if (!currentCollectionPrices) return null
    console.log(
      'FIND LOCALIZED VARIANT PRICE IN COLLECTION AND RETURN IT',
      variantId,
      collectionHandle,
    )

    const findVariant = currentCollectionPrices.products.edges
      .find((p) => {
        return p.node.variants.edges.find((v) => v.node.id == variantId)
      })
      ?.node.variants.edges.filter((v) => v.node.id == variantId)[0].node

    console.log('FOUND THE VARIANT', findVariant)

    return {
      priceV2: findVariant?.priceV2,
      compareAtPriceV2: findVariant?.compareAtPriceV2,
    }
  }

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
    const currentVariantId = variantId.startsWith('gid')
      ? Buffer.from(variantId, 'binary').toString('base64')
      : variantId
    const currentVariant = variants.find(
      (v) => v.node.id == currentVariantId || v.node.id == variantId,
    )
    console.log('getVariantPriceById currentVariantId', currentVariantId)
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
    getVariantPriceByCollection,
    currentCollectionPrices,
  }

  return (
    <ShopifyPriceContext.Provider value={value}>
      {children}
    </ShopifyPriceContext.Provider>
  )
}
