import gql from 'graphql-tag'
import { Sentry } from '../../../src/services/sentry'
import {
  request,
  shopifySourceProductFragment,
  shopifySourceProductVariantFragment,
} from '../../graphql'
import { ShopifyProduct } from '../../../src/types'
import { BAMBUSER_MESSAGE_ID } from './constants'

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
    Sentry.captureException(e, 'shopify_query_error')
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
        event.data[BAMBUSER_MESSAGE_ID] &&
        event.data[BAMBUSER_MESSAGE_ID].indexOf('https://') > -1
      ) {
        callback(event.data[BAMBUSER_MESSAGE_ID])
      }
    },
    false,
  )
}

export const insideIframe = (): boolean => {
  return window !== window.parent
}
