import * as React from 'react'
import {
  ProductQueryDataResponse,
  requestShopifyProductVariantPrices,
  requestShopifyProductPriceRange,
  requestShopifyCollectionProductsVariantPrices,
  requestShopifyProductVariantPricesFromArray,
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
  priceV2: ShopifyStorefrontMoneyV2 | undefined
  compareAtPriceV2: Maybe<ShopifyStorefrontMoneyV2> | undefined
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
      setCurrentCollectionPrices(response)
    })
  }, [asPath, currentCountry])

  const getVariantPriceByCollection = (
    collectionHandle: string,
    variantId: string,
  ): Price | null => {
    if (!collectionHandle) return null
    if (currentCountry == 'US') return null
    if (!currentCollectionPrices) return null

    const findVariant = currentCollectionPrices.products.edges
      .find((p) => {
        return p.node.variants.edges.find((v) => v.node.id == variantId)
      })
      ?.node.variants.edges.filter((v) => v.node.id == variantId)[0].node

    return {
      priceV2: findVariant?.priceV2,
      compareAtPriceV2: findVariant?.compareAtPriceV2,
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
      priceV2: findVariant?.priceV2,
      compareAtPriceV2: findVariant?.compareAtPriceV2,
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
      priceV2: product?.priceRange.minVariantPrice,
      compareAtPriceV2:
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
    const result = requestShopifyProductVariantPrices({
      id: productId,
      countryCode: currentCountry,
    })
    const product = await result
    const variants = product?.variants.edges
    const encodedVariantId = variantId.startsWith('gid')
      ? Buffer.from(variantId, 'binary').toString('base64')
      : variantId
    const decodedVariantId = Buffer.from(encodedVariantId, 'base64').toString()
    const currentVariant = variants.find(
      (v) => v.node.id == encodedVariantId || v.node.id == decodedVariantId,
    )
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
