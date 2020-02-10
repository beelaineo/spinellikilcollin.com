import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { Menu, ProductInfo } from '../../types'
import {
  productInfoFragment,
  internalLinkFragment,
  richPageLinkFragment,
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
            ...CTAFragment
          }
        }
        ... on SubMenu {
          _key
          _type
          title
          columns {
            ... on RichPageLink {
              ...RichPageLinkFragment
            }
            ... on LinkGroup {
              _key
              _type
              title
              links {
                ...InternalLinkFragment
              }
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
  ${richPageLinkFragment}
  ${ctaFragment}
`

export interface ShopDataResponse {
  Menu: Menu
  ProductInfo: ProductInfo
}
