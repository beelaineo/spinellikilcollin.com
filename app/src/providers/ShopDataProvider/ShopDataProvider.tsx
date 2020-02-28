import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { SHOP_DATA_QUERY, ShopDataResponse } from './shopDataQuery'
import {
  Menu,
  Scalars,
  ShopifyProduct,
  ProductInfo,
  SiteSettings,
} from '../../types'
import { filterMaybes } from '../../utils'

const { useContext } = React

interface ShopDataContextValue {
  ready: boolean
  menu?: Menu
  getProductInfoBlocks: (product: ShopifyProduct) => DefinitelyProductInfo[]
  siteSettings?: SiteSettings
}

const ShopDataContext = React.createContext<ShopDataContextValue | undefined>(
  undefined,
)

export const ShopDataConsumer = ShopDataContext.Consumer

export const useShopData = () => {
  const ctx = useContext(ShopDataContext)
  if (!ctx)
    throw new Error('useShopDataContext must be used within a ShopDataProvider')
  return ctx
}

interface Props {
  children: React.ReactNode
}

interface Person {
  name: string
}

interface DefinitelyProductInfo {
  __typename: 'ProductInfo'
  _key: string
  _type: string
  title: string
  bodyRaw?: Scalars['JSON']
}

export const ShopDataProvider = ({ children }: Props) => {
  const response = useQuery<ShopDataResponse>(SHOP_DATA_QUERY)

  const ready = Boolean(response.data && !response.loading)
  const menu = ready ? response?.data?.Menu : undefined
  const siteSettings = ready ? response?.data?.SiteSettings : undefined
  const productInfoBlocks = ready
    ? response?.data?.ProductInfoSettings
    : undefined

  const getProductInfoBlocks = (
    product: ShopifyProduct,
  ): DefinitelyProductInfo[] => {
    if (!productInfoBlocks) return []
    const { globalInfo, infoByType, infoByTag } = productInfoBlocks
    const globalBlocks = globalInfo ? filterMaybes(globalInfo) : []
    const sourceTags = product?.sourceData?.tags
    const productType = product?.sourceData?.productType
    const productTags = sourceTags
      ? sourceTags.map((t) => (t ? t.toLowerCase() : ''))
      : []

    const tagBlocks =
      infoByTag && productTags
        ? infoByTag.reduce<ProductInfo[]>((acc, current) => {
            if (!current) return acc
            if (
              current.tag &&
              productTags.includes(current.tag.toLowerCase())
            ) {
              const { info } = current
              if (info) {
                const infos = filterMaybes(info)
                return [...acc, ...infos]
              }
            }
            return acc
          }, [])
        : []

    const typeBlocks =
      infoByType && productType
        ? infoByType.reduce<ProductInfo[]>((acc, current) => {
            if (!current) return acc
            if (
              current.type &&
              productType.toLowerCase() === current.type.toLowerCase()
            ) {
              const { info } = current
              if (info) {
                const infos = filterMaybes(info)
                return [...acc, ...infos]
              }
            }
            return acc
          }, [])
        : []

    const allBlocks = [...globalBlocks, ...tagBlocks, ...typeBlocks]
    const filteredBlocks = allBlocks.reduce<DefinitelyProductInfo[]>(
      (acc, block) => {
        const { _key, _type, title, bodyRaw, __typename } = block
        if (_key && _type && title && bodyRaw) {
          return [...acc, { __typename, _key, _type, title, bodyRaw }]
        }
        return acc
      },
      [],
    )
    return filteredBlocks
  }

  const value = {
    ready,
    menu,
    siteSettings,
    getProductInfoBlocks,
  }

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  )
}
