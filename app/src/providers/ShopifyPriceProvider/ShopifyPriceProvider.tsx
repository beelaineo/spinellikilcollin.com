import * as React from 'react'
import {
  ProductQueryDataResponse,
  requestShopifyProductVariantPrices,
  requestShopifyProductPriceRange,
  requestShopifyCollectionProductsVariantPrices,
  requestShopifyProductVariantPricesFromArray,
  requestShopifyVariantPrice,
} from './shopifyPriceQuery'
import { useRouter } from 'next/router'
import { useCountry } from '../CountryProvider'
import { QueryFunction } from '../ShopifyProvider/types'
import { Maybe, ShopifyStorefrontMoneyV2 } from '../../types'
import { Money } from '../CurrencyProvider'
import {
  ShopifyStorefrontCollection,
  ShopifyStorefrontCountry,
  ShopifyStorefrontCountryCode,
  ShopifyStorefrontCurrencyCode,
  ShopifyStorefrontProduct,
} from '../../types/generated-shopify'
import { useSearch } from '../SearchProvider'

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
  price: ShopifyStorefrontMoneyV2 | Money | undefined
  compareAtPrice: Maybe<ShopifyStorefrontMoneyV2 | Money> | undefined
}

interface ShopifyPriceContextValue {
  ready: boolean
  currentCollectionPrices: ShopifyStorefrontCollection | null
  currentSearchResultPrices: ShopifyStorefrontProduct[] | null
  getPriceRangeById: (id: string) => PriceRange | null
  getVariantPriceById: (
    productId: string,
    variantId: string,
  ) => Promise<Price | null>
  getVariantPriceByCollection: (
    collectionHandle: string,
    variantId: string,
  ) => Price | null
  getVariantPriceBySearchResults: (variantId: string) => Price | null
  getProductPriceById: (productId: string) => Promise<Price | null>
  clearSearchResultPrices: () => void
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
  const { asPath, query: routerQuery } = router
  const { currentCountry } = useCountry()
  const { searchResults } = useSearch()

  const [currentCollectionHandle, setCurrentCollectionHandle] = useState<
    string | null
  >(null)
  const [currentCountryState, setCurrentCountryState] =
    useState<ShopifyStorefrontCountryCode | null>(null)
  const [currentCollectionPrices, setCurrentCollectionPrices] =
    useState<ShopifyStorefrontCollection | null>(null)
  const [currentSearchResultPrices, setCurrentSearchResultPrices] = useState<
    ShopifyStorefrontProduct[] | null
  >(null)

  useEffect(() => {
    if (!searchResults) return
    setCurrentCountryState(currentCountry)
    const productIds = searchResults.map((p) => p.shopifyId)
    console.log('SEARCH RESULT PRODUCT IDS:', productIds)
    requestShopifyProductVariantPricesFromArray({
      ids: productIds,
      countryCode: currentCountry,
    }).then((response) => {
      console.log('UPDATING COUNTRY SEARCH RESULTS PRICE TABLE', currentCountry)
      setCurrentSearchResultPrices(response)
    })
  }, [searchResults, currentCountry])

  useEffect(() => {
    if (asPath.includes('collections') == false) return
    if (
      currentCollectionHandle &&
      currentCollectionHandle == asPath.split('/')[2] &&
      currentCountryState &&
      currentCountryState == currentCountry &&
      router.query.collectionSlug
    )
      return
    const handle = routerQuery.collectionSlug
    if (!handle || typeof handle !== 'string') return
    setCurrentCollectionHandle(handle)
    setCurrentCountryState(currentCountry)
    requestShopifyCollectionProductsVariantPrices({
      handle,
      countryCode: currentCountry,
    }).then((response) => {
      // console.log('UPDATING COUNTRY PRICE TABLE', currentCountry)
      console.log('UPDATING COUNTRY COLLECTION PRICE TABLE', currentCountry)
      console.log('RESPONSE:', response)
      setCurrentCollectionPrices(response)
    })
  }, [asPath, currentCountry])

  const getVariantPriceByCollection = (
    collectionHandle: string,
    variantId: string,
  ): Price | null => {
    if (!collectionHandle) return null
    if (!currentCollectionPrices) return null

    const findVariant = currentCollectionPrices.products.edges
      .find((p) => {
        return p.node.variants.edges.find((v) => v.node.id == variantId)
      })
      ?.node.variants.edges.filter((v) => v.node.id == variantId)[0].node

    // console.log('FIND VARIANT:', findVariant)
    return {
      price: findVariant?.price,
      compareAtPrice: findVariant?.compareAtPrice,
    }
  }

  const getVariantPriceBySearchResults = (variantId: string): Price | null => {
    if (currentCountry == 'US') return null
    if (!currentSearchResultPrices) return null

    const findVariant = currentSearchResultPrices
      .find((p) => {
        return p.variants.edges.find((v) => v.node.id == variantId)
      })
      ?.variants.edges.filter((v) => v.node.id == variantId)[0].node

    return {
      price: findVariant?.price,
      compareAtPrice: findVariant?.compareAtPrice,
    }
  }

  const getProductPriceById = async (
    productId: string,
  ): Promise<Price | null> => {
    console.log('GETTING VARIANT PRICE BY SEARCH RESULTS', productId)

    const product = await requestShopifyProductPriceRange({
      id: productId,
      countryCode: currentCountry,
    })
    return {
      price: product?.priceRange.minVariantPrice,
      compareAtPrice:
        product?.compareAtPriceRange.minVariantPrice.amount == 0
          ? null
          : product?.compareAtPriceRange.minVariantPrice,
    }
  }

  const clearSearchResultPrices = () => {
    setCurrentSearchResultPrices(null)
  }

  const getPriceRangeById = (id: string): PriceRange | null => {
    if (!id) return null
    if (!currentCountry) return null

    requestShopifyProductPriceRange({ id, countryCode: currentCountry }).then(
      (response) => {
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
    const result = requestShopifyVariantPrice({
      variantId: variantId,
      countryCode: currentCountry,
    })

    console.log('variantId:', variantId)
    console.log('productId:', productId)
    console.log('currentCountry:', currentCountry)
    const variant = await result

    const variantPrice = {
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
    }
    return variantPrice
  }

  const value = {
    ready,
    getPriceRangeById,
    getVariantPriceById,
    getVariantPriceByCollection,
    getVariantPriceBySearchResults,
    getProductPriceById,
    currentCollectionPrices,
    currentSearchResultPrices,
    clearSearchResultPrices,
  }

  return (
    <ShopifyPriceContext.Provider value={value}>
      {children}
    </ShopifyPriceContext.Provider>
  )
}
