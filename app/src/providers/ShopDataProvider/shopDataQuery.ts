import gql from 'graphql-tag'
import { Menu, ProductInfoSettings, SiteSettings } from '../../types'
import {
  productInfoFragment,
  internalLinkFragment,
  externalLinkFragment,
  ctaFragment,
} from '../../graphql/fragments'

export const SHOP_DATA_QUERY = /* GraphQL */ gql`
  {
    Menu(id: "menu-settings") {
      _id
      _type
      _key
      _createdAt
      menuItems {
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
            ... on Cta {
              ...CTAFragment
            }
          }
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
`

export interface ShopDataResponse {
  Menu: Menu
  ProductInfoSettings: ProductInfoSettings
  SiteSettings: SiteSettings
}
