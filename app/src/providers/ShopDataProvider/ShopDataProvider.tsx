import * as React from 'react'
import { ShopDataResponse } from './shopDataQuery'
import {
  Menu,
  Product,
  ProductInfo,
  ProductInfoSettings,
  ProductListingSettings,
  SiteSettings,
} from '../../types'
import { definitely, getPageLinkUrl, LinkInfo } from '../../utils'

const { useContext } = React

interface ShopDataContextValue {
  ready: boolean
  menu?: Menu
  getProductInfoBlocks: (product: Product) => ProductInfo[]
  siteSettings?: SiteSettings
  productInfoSettings?: ProductInfoSettings
  productListingSettings?: ProductListingSettings
  getLinkByRef: (ref: string) => LinkInfo | null
}

const ShopDataContext = React.createContext<ShopDataContextValue | undefined>(
  undefined,
)

export const ShopDataConsumer = ShopDataContext.Consumer

export const foo = 'bar'

export const useShopData = () => {
  const ctx = useContext(ShopDataContext)
  if (!ctx)
    throw new Error('useShopDataContext must be used within a ShopDataProvider')
  return ctx
}

interface Props {
  children: React.ReactNode
  shopData: ShopDataResponse
}

interface Person {
  name: string
}

export const ShopDataProvider = ({ children, shopData }: Props) => {
  const ready = true
  const menu = shopData?.Menu
  const siteSettings = shopData?.SiteSettings
  const productInfoSettings = shopData?.ProductInfoSettings
  const productListingSettings = shopData?.ProductListingSettings
  const allPages = shopData?.allPage || []
  const pagesMap = new Map(allPages.map((page) => [page._id, page]))
  const allJournalEntries = shopData?.allJournalEntry || []
  const journalMap = new Map(
    allJournalEntries.map((entry) => [entry._id, entry]),
  )
  const allCollections = shopData?.allCollection || []
  const collectionMap = new Map(
    allCollections.map((collection) => [collection._id, collection]),
  )
  const allProducts = shopData?.allProduct || []
  const productMap = new Map(
    allProducts.map((product) => [product._id, product]),
  )

  // Assuming allPages, allJournalEntries, etc. are Maps with _id as key
  const linkTypeHandlers = {
    customize: () => getPageLinkUrl({ __typename: 'Customize' }),
    journalPage: () => getPageLinkUrl({ __typename: 'JournalPage' }),
    paymentPlans: () => getPageLinkUrl({ __typename: 'PaymentPlans' }),
    magazine: () => getPageLinkUrl({ __typename: 'Magazine' }),
    contact: () => getPageLinkUrl({ __typename: 'Contact' }),
    customerCare: () => getPageLinkUrl({ __typename: 'CustomerCare' }),
    default: (ref) => {
      const page = pagesMap.get(ref)
      const journalEntry = journalMap.get(ref)
      const collection = collectionMap.get(ref)
      const product = productMap.get(ref)

      if (page) return getPageLinkUrl({ __typename: 'Page', slug: page.slug })
      if (journalEntry)
        return getPageLinkUrl({
          __typename: 'JournalEntry',
          slug: journalEntry.slug,
        })
      if (collection)
        return getPageLinkUrl({
          __typename: 'Collection',
          handle: collection.handle,
        })
      if (product)
        return getPageLinkUrl({
          __typename: 'Product',
          handle: product.handle,
        })

      return { href: `/id/${ref}` }
    },
  }

  const getLinkByRef = (ref: string): LinkInfo | null => {
    if (!ref) return null
    const handler = linkTypeHandlers[ref] || linkTypeHandlers['default']
    return handler(ref)
  }

  // const getLinkByRef = (ref: string): LinkInfo | null => {
  //   if (!ref) return null
  //   if (ref === 'customize') return getPageLinkUrl({ __typename: 'Customize' })
  //   if (ref === 'journalPage') {
  //     return getPageLinkUrl({ __typename: 'JournalPage' })
  //   }
  //   if (ref === 'paymentPlans') {
  //     return getPageLinkUrl({ __typename: 'PaymentPlans' })
  //   }
  //   if (ref === 'magazine') return getPageLinkUrl({ __typename: 'Magazine' })
  //   if (ref === 'contact') return getPageLinkUrl({ __typename: 'Contact' })
  //   console.log('allOPages', allPages)
  //   const page = allPages.find((page) => page._id === ref)
  //   const journalEntry = allJournalEntries.find((entry) => entry._id === ref)
  //   const collection = allCollections?.find(
  //     (collection) => collection._id === ref,
  //   )
  //   const product = allProducts?.find((product) => product._id === ref)
  //   if (page) return getPageLinkUrl({ __typename: 'Page', slug: page.slug })
  //   if (journalEntry)
  //     return getPageLinkUrl({
  //       __typename: 'JournalEntry',
  //       slug: journalEntry.slug,
  //     })
  //   if (collection)
  //     return getPageLinkUrl({
  //       __typename: 'ShopifyCollection',
  //       handle: collection.handle,
  //     })
  //   if (product)
  //     return getPageLinkUrl({
  //       __typename: 'ShopifyProduct',
  //       handle: product.handle,
  //     })
  //   return { href: `/id/${ref}` }
  //   return null
  // }

  const getProductInfoBlocks = (product: Product): ProductInfo[] => {
    const productBlocks = definitely(product.info)
    if (!productInfoSettings) return productBlocks
    const { globalInfo, infoByType, infoByTag } = productInfoSettings
    const globalBlocks = globalInfo ? definitely(globalInfo) : []
    const sourceTags = product?.store?.tags
    const productType = product?.store?.productType
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
                const infos = definitely(info)
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
                const infos = definitely(info)
                return [...acc, ...infos]
              }
            }
            return acc
          }, [])
        : []

    const allBlocks: ProductInfo[] = [
      ...productBlocks,
      ...globalBlocks,
      ...tagBlocks,
      ...typeBlocks,
    ]
    return allBlocks
  }

  const value = {
    ready,
    menu,
    siteSettings,
    productInfoSettings,
    productListingSettings,
    getProductInfoBlocks,
    getLinkByRef,
  }

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  )
}
