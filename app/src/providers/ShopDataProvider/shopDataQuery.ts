import { Collection } from 'use-shopify'
import gql from 'graphql-tag'
import { Paginated } from '@good-idea/unwind-edges'
import { Menu, ProductInfo } from '../../types/generated'
import {
  productInfoBlockFragment,
  pageLinkFragment,
  contentBlockFragment,
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
          label
          link {
            ...PageLinkFragment
          }
        }
        ... on SubMenu {
          _key
          _type
          title
          columns {
            ... on LinkGroup {
              _key
              _type
              title
              links {
                ...PageLinkFragment
              }
            }
          }
        }
      }
    }
    ProductInfo(id: "productInfo") {
      _id
      _type
      _key
      _createdAt
      globalBlocks {
        ...ProductInfoBlockFragment
      }
      ringBlocks {
        ...ProductInfoBlockFragment
      }
      earringBlocks {
        ...ProductInfoBlockFragment
      }
      braceletBlocks {
        ...ProductInfoBlockFragment
      }
      necklaceBlocks {
        ...ProductInfoBlockFragment
      }
      blocksByTag {
        _key
        _type
        tag
        infoBlocks {
          ...ProductInfoBlockFragment
        }
      }
    }
  }
  ${productInfoBlockFragment}
  ${pageLinkFragment}
`

export interface ShopDataResponse {
  Menu: Menu
  ProductInfo: ProductInfo
}
