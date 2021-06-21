import gql from 'graphql-tag'

import { Sentry } from '../../../src/services/sentry'
import {
  request,
  shopifySourceProductFragment,
  shopifySourceProductVariantFragment,
} from '../../graphql'

import {
  ShopifyProduct,
  ShopifySourceProduct,
  ShopifyProductVariant,
  ShopifyProductOption,
  ShopifySourceProductVariant,
} from '../../../src/types'
const DELIMITER = ' / '

import { ShowType, INIT, READY, MESSAGE_ID } from './BambuserView'

interface Response {
  allShopifyProduct: ShopifyProduct[]
}

type mesgProps = (url: string) => void

export const queryByHandle = async (handle: string) => {
  const query = gql`
    query ProductsPageQuery($handle: String) {
      allShopifyProduct(
        where: { handle: { eq: $handle }, archived: { neq: true } }
      ) {
        __typename
        _id
        _key
        title
        shopifyId
        sourceData {
          ...ShopifySourceProductFragment
        }
        options {
          __typename
          name
          values {
            __typename
            _key
            _type
            value
          }
        }
        variants {
          __typename
          shopifyVariantID
          title
          sourceData {
            ...ShopifySourceProductVariantFragment
          }
        }
      }
    }
    ${shopifySourceProductFragment}
    ${shopifySourceProductVariantFragment}
  `

  try {
    const response = await request<Partial<Response>>(query, { handle })
    const products = response?.allShopifyProduct
    const product = products && products.length ? products[0] : null
    return product
  } catch (e) {
    Sentry.captureException(e)
    return null
  }
}

export const onMessage = (callback: mesgProps) => {
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin.indexOf(window.location.hostname) === -1) {
        return
      }
      if (
        event.data &&
        event.data[MESSAGE_ID] &&
        event.data[MESSAGE_ID].indexOf('https://') > -1
      ) {
        callback(event.data[MESSAGE_ID])
      }
    },
    false,
  )
}

export const insideIframe = (): boolean => {
  return window !== window.parent
}
