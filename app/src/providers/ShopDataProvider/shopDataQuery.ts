import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { Menu, ProductInfoSettings } from '../../types'
import {
  productInfoFragment,
  internalLinkFragment,
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
  }
  ${productInfoFragment}
  ${internalLinkFragment}
  ${ctaFragment}
`

export interface ShopDataResponse {
  Menu: Menu
  ProductInfoSettings: ProductInfoSettings
}
