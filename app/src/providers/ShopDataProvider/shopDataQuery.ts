import gql from 'graphql-tag'
import {
  Page,
  Menu,
  ProductInfoSettings,
  ProductListingSettings,
  SiteSettings,
} from '../../types'
import {
  productInfoFragment,
  internalLinkFragment,
  externalLinkFragment,
  ctaFragment,
  filterSetFragment,
  priceRangeFilterFragment,
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
          link {
            ...InternalLinkFragment
          }
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
    ProductListingSettings(id: "productListingSettings") {
      _id
      _type
      defaultFilter {
        ... on FilterSet {
          ...FilterSetFragment
        }
        ... on PriceRangeFilter {
          ...PriceRangeFilterFragment
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
      mailerTitle
      mailerSubtitle
    }
  }
  ${productInfoFragment}
  ${internalLinkFragment}
  ${externalLinkFragment}
  ${ctaFragment}
  ${filterSetFragment}
  ${priceRangeFilterFragment}
`

export interface ShopDataResponse {
  Menu: Menu
  ProductListingSettings: ProductListingSettings
  ProductInfoSettings: ProductInfoSettings
  SiteSettings: SiteSettings
  allPage: Page[]
}

export const requestShopData = async () => {
  const response = await request<ShopDataResponse>(SHOP_DATA_QUERY)
  return response
}
