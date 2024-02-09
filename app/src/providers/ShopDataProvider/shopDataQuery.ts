import gql from 'graphql-tag'
import {
  Page,
  Menu,
  ProductInfoSettings,
  ProductListingSettings,
  SiteSettings,
  JournalEntry,
  ShopifyCollection,
  ShopifyProduct,
  Collection,
  Product,
} from '../../types'
import {
  productInfoFragment,
  internalLinkFragment,
  externalLinkFragment,
  ctaFragment,
  filterSetFragment,
  priceRangeMinMaxFilterFragment,
  inStockFilterFragment,
  seoFragment,
} from '../../graphql/fragments'
import { request } from '../../graphql'

export const SHOP_DATA_QUERY = /* GraphQL */ gql`
  {
    allPage {
      _id
      slug {
        current
      }
    }
    allJournalEntry {
      _id
      slug {
        current
      }
    }
    allCollection {
      _id
      handle
    }
    allProduct {
      _id
      handle
    }
    Menu(id: "menu-settings") {
      _id
      _type
      _key
      _createdAt
      menuItems {
        __typename
        ... on MenuLink {
          _key
          _type
          label
          linkType
          link {
            ...InternalLinkFragment
          }
          link_external {
            ...ExternalLinkFragment
          }
          action
        }
        ... on SubMenu {
          _key
          _type
          title
          links {
            __typename
            ... on Cta {
              ...CTAFragment
            }
            ... on SubMenu {
              _key
              _type
              title
              links {
                __typename
                ... on Cta {
                  ...CTAFragment
                }
                ... on SubMenu {
                  _key
                  _type
                  title
                  links {
                    __typename
                    ... on Cta {
                      ...CTAFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
      footerMenuItems {
        __typename
        ... on MenuLink {
          _key
          _type
          label
          linkType
          link {
            ...InternalLinkFragment
          }
          link_external {
            ...ExternalLinkFragment
          }
          action
        }
      }
    }
    ProductListingSettings(id: "productListingSettings") {
      _id
      _type
      newDefaultFilter {
        ... on FilterSet {
          ...FilterSetFragment
        }
        ... on PriceRangeMinMaxFilter {
          ...PriceRangeMinMaxFilterFragment
        }
        ... on InStockFilter {
          ...InStockFilterFragment
        }
      }
    }
    ProductInfoSettings(id: "productInfoSettings") {
      _id
      _type
      _key
      _createdAt
      globalInfo {
        ...ProductInfoFragment
      }
      infoByType {
        type
        info {
          ...ProductInfoFragment
        }
      }
      infoByTag {
        tag
        info {
          ...ProductInfoFragment
        }
      }
      tagBadges {
        _key
        tag
        label
      }
      excludeFromStockIndication {
        ... on Product {
          _id
          handle
        }
        ... on ShopifyProduct {
          _id
          handle
        }
      }
    }
    SiteSettings(id: "site-settings") {
      _id
      _type
      links {
        ... on ExternalLink {
          ...ExternalLinkFragment
        }
        ... on InternalLink {
          ...InternalLinkFragment
        }
      }
      seo {
        ...SEOFragment
      }
      phone
      mailerTitle
      mailerSubtitle
    }
  }
  ${seoFragment}
  ${productInfoFragment}
  ${internalLinkFragment}
  ${externalLinkFragment}
  ${ctaFragment}
  ${filterSetFragment}
  ${priceRangeMinMaxFilterFragment}
  ${inStockFilterFragment}
`

export interface ShopDataResponse {
  Menu: Menu
  ProductListingSettings: ProductListingSettings
  ProductInfoSettings: ProductInfoSettings
  SiteSettings: SiteSettings
  allPage: Page[]
  allJournalEntry: JournalEntry[]
  allCollection: Collection[]
  allProduct: Product[]
}

export const requestShopData = async () => {
  const response = await request<ShopDataResponse>(SHOP_DATA_QUERY)
  return response
}
